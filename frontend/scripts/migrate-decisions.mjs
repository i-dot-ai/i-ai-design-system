// ONE-TIME migration: converts the hand-written decision-record pages
// (src/pages/decisions-record/<slug>.astro) into content-collection entries
// (src/content/decisions/<slug>/index.mdx), so decisions render the same way
// as components and styles (dynamic route + <Content />).
//
// The body is emitted as PLAIN MARKDOWN (headings, links, lists, blockquotes,
// images, tables). The govuk classes are re-applied automatically on render by
// the rehype-add-classes plugin (see astro.config.mjs), so authors/readers get
// govuk styling without any HTML in the body.
//
// The ONLY HTML that remains is the live component demo: an inline
//   <div class="component-container …">…</div>
// block is extracted to examples/demo-<n>.astro + examples/demo-<n>.html and
// replaced in the body with an <Example …/> tag (the same mechanism used by
// the components and styles sections). The .html file is the rendered preview.
//
// Frontmatter (number / title / status / dateProposed) is lifted out of the
// page's known header lines (h1, "Date proposed:" paragraph, status Tag).
//
// HTML -> Markdown conversion is done with turndown (already a devDependency),
// so it is deterministic — this script never paraphrases content.
//
// Run with:  node scripts/migrate-decisions.mjs
// Add --force to overwrite entries that already exist.

import { readdir, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FRONTEND_DIR = resolve(__dirname, "..");
const PAGES_DIR = resolve(FRONTEND_DIR, "src/pages/decisions-record");
const CONTENT_DIR = resolve(FRONTEND_DIR, "src/content/decisions");

const FORCE = process.argv.includes("--force");

// Pages that are NOT decision records (the section landing page and the new
// dynamic route file that this migration adds).
const EXCLUDED = new Set(["index", "[slug]"]);

const STATUS_MAP = {
    proposal: "proposal",
    accepted: "accepted",
    overridden: "overridden",
    rejected: "rejected",
};

// --- turndown setup -------------------------------------------------------

const turndown = new TurndownService({
    headingStyle: "atx",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    emDelimiter: "_",
});
turndown.use(gfm);

// <InsetText>…</InsetText> is a govuk component with no plain-markdown
// equivalent; represent it as a blockquote.
turndown.addRule("insetText", {
    filter: (node) => node.nodeName === "INSETTEXT",
    replacement: (content) =>
        "\n\n" +
        content
            .trim()
            .split("\n")
            .map((line) => (line ? `> ${line}` : ">"))
            .join("\n") +
        "\n\n",
});

// Images -> markdown ![alt](src) (drops the govuk-image class / figure wrapper).
turndown.addRule("figureImage", {
    filter: (node) => node.nodeName === "FIGURE",
    replacement: (_content, node) => {
        const img = node.querySelector("img");
        if (!img) return "";
        const alt = img.getAttribute("alt") ?? "";
        const src = img.getAttribute("src") ?? "";
        const caption = node.querySelector("figcaption");
        const capText = caption ? caption.textContent.trim() : "";
        return `\n\n![${alt}](${src})\n\n` + (capText ? `${capText}\n\n` : "");
    },
});

async function fileExists(path) {
    try {
        await stat(path);
        return true;
    } catch {
        return false;
    }
}

// Pull out the inner body of the single top-level <Layout> … </Layout>.
function extractLayoutBody(source) {
    const open = source.indexOf("<Layout>");
    const close = source.lastIndexOf("</Layout>");
    if (open === -1 || close === -1) return null;
    return source.slice(open + "<Layout>".length, close).replace(/^\n/, "").replace(/\s+$/, "");
}

function stripTags(html) {
    return html.replace(/<[^>]+>/g, "");
}

function decodeEntities(s) {
    return s
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
}

// --- header extraction (frontmatter) -------------------------------------

// "001 - Adapt the GOV.UK Design System" -> { number: 1, title: "Adapt the …" }
function parseHeading(body) {
    const m = body.match(/<h1[^>]*>\s*([\s\S]*?)\s*<\/h1>/);
    if (!m) return null;
    const raw = decodeEntities(stripTags(m[1]).trim());
    const nm = raw.match(/^0*(\d+)\s*[-–]\s*(.+)$/);
    if (nm) return { number: Number(nm[1]), title: nm[2].trim(), rawLine: m[0] };
    return { number: undefined, title: raw, rawLine: m[0] };
}

function parseDate(body) {
    const m = body.match(/<p[^>]*>\s*Date proposed:\s*<strong>\s*([\s\S]*?)\s*<\/strong>\s*<\/p>/);
    if (!m) return null;
    return { date: decodeEntities(m[1].trim()), rawLine: m[0] };
}

function parseStatus(body) {
    const m = body.match(/<Tag[^>]*>\s*([\s\S]*?)\s*<\/Tag>/);
    if (!m) return null;
    const label = decodeEntities(stripTags(m[1]).trim()).toLowerCase();
    const status = STATUS_MAP[label] ?? "proposal";
    return { status, tagMatch: m[0] };
}

function removeLine(body, snippet) {
    if (!snippet) return body;
    return body.replace(snippet, "");
}

// Strip an empty <ul>…</ul> / <li></li> left after removing a status tag.
function cleanupEmptyStatusList(body) {
    return body.replace(/<ul[^>]*>\s*(?:<li>\s*<\/li>\s*)*<\/ul>/g, "");
}

// --- live-demo extraction (<Example>) ------------------------------------

// Find <div class="component-container …">…</div> blocks (live demos) and
// return { body, demos: [{ index, inner }] } with each replaced by a marker.
function extractDemos(body) {
    const demos = [];
    const openRe = /<div class="component-container[^"]*"[^>]*>/g;
    let result = "";
    let lastIndex = 0;
    let m;
    while ((m = openRe.exec(body)) !== null) {
        const start = m.index;
        const afterOpen = openRe.lastIndex;
        let depth = 1;
        let i = afterOpen;
        const tagRe = /<\/?div\b[^>]*>/g;
        tagRe.lastIndex = afterOpen;
        let t;
        while (depth > 0 && (t = tagRe.exec(body)) !== null) {
            if (t[0].startsWith("</")) depth--;
            else depth++;
            i = tagRe.lastIndex;
        }
        const inner = body.slice(afterOpen, i - "</div>".length).trim();
        const index = demos.length + 1;
        demos.push({ index, inner });
        result += body.slice(lastIndex, start);
        // A unique placeholder that survives the HTML->Markdown conversion.
        // Avoid characters turndown escapes (e.g. underscores).
        result += `<p>DEMOPLACEHOLDER${index}DEMOPLACEHOLDER</p>`;
        lastIndex = i;
        openRe.lastIndex = i;
    }
    result += body.slice(lastIndex);
    return { body: result, demos };
}

// --- live-demo rendering --------------------------------------------------

// Map of design-system components used in demos to their example .astro import
// line and a renderer producing the equivalent rendered govuk HTML (the
// <Example> preview uses set:html and cannot execute Astro components).
// Deterministic: output mirrors each component's own source.
const COMPONENT_RENDERERS = {
    Button: {
        import: 'import Button from "@components/button/button.astro";',
        render(attrs, inner) {
            const variant = attrs.variant ?? "primary";
            const cls =
                {
                    primary: "govuk-button",
                    secondary: "govuk-button govuk-button--secondary",
                    warning: "govuk-button govuk-button--warning",
                    inverse: "govuk-button govuk-button--inverse",
                }[variant] ?? "govuk-button";
            return `<button class="${cls}" data-module="govuk-button">${inner}</button>`;
        },
    },
};

function parseAttrs(openTag) {
    const attrs = {};
    const re = /(\w[\w-]*)="([^"]*)"/g;
    let m;
    while ((m = re.exec(openTag)) !== null) attrs[m[1]] = m[2];
    return attrs;
}

// Turn a demo's inner Astro markup into rendered govuk HTML for the preview,
// and collect the imports its .astro file needs. Unknown components pass
// through verbatim.
function renderDemo(inner) {
    const importsNeeded = new Set();
    const html = inner.replace(
        /<([A-Z]\w*)((?:\s+\w[\w-]*="[^"]*")*)\s*>([\s\S]*?)<\/\1>/g,
        (whole, name, attrStr, children) => {
            const renderer = COMPONENT_RENDERERS[name];
            if (!renderer) return whole;
            importsNeeded.add(renderer.import);
            return renderer.render(parseAttrs(attrStr), children.trim());
        },
    );
    return { html, imports: [...importsNeeded] };
}

function dedent(text) {
    const lines = text.split("\n");
    const indents = lines
        .filter((l) => l.trim().length)
        .map((l) => l.match(/^\s*/)[0].length);
    const min = indents.length ? Math.min(...indents) : 0;
    return lines.map((l) => l.slice(min)).join("\n");
}

function renderExampleAstro(inner, imports) {
    const frontmatter = imports.length ? `---\n${imports.join("\n")}\n---\n\n` : "";
    return `${frontmatter}${dedent(inner).trim()}\n`;
}

// --- frontmatter ----------------------------------------------------------

function buildFrontmatter({ number, title, status, dateProposed }) {
    const lines = ["---"];
    if (typeof number === "number") lines.push(`number: ${number}`);
    lines.push(`title: ${yaml(title)}`);
    lines.push(`status: ${status}`);
    if (dateProposed) lines.push(`dateProposed: ${yaml(dateProposed)}`);
    lines.push("---");
    return lines.join("\n");
}

function yaml(value) {
    if (/[:#\-?{}\[\],&*!|>'"%@`]/.test(value) || /^\s|\s$/.test(value)) {
        return `"${value.replace(/"/g, '\\"')}"`;
    }
    return value;
}

// --- per-page migration ---------------------------------------------------

async function migrate(slug, source) {
    const rawBody = extractLayoutBody(source);
    if (rawBody === null) {
        console.log(`  skip (no <Layout> body): ${slug}`);
        return false;
    }

    let body = rawBody;

    // frontmatter (read from raw HTML header lines, then strip them)
    const heading = parseHeading(body);
    const date = parseDate(body);
    const status = parseStatus(body);
    if (heading) body = removeLine(body, heading.rawLine);
    if (date) body = removeLine(body, date.rawLine);
    if (status) body = removeLine(body, status.tagMatch);
    body = cleanupEmptyStatusList(body);

    // pull live demos out before converting to markdown
    const { body: markedBody, demos } = extractDemos(body);

    // HTML -> Markdown (deterministic, via turndown)
    let markdown = turndown.turndown(markedBody);

    // write demo example files and swap the placeholder for an <Example> tag
    const dir = resolve(CONTENT_DIR, slug);
    for (const demo of demos) {
        const { html, imports } = renderDemo(demo.inner);
        await mkdir(resolve(dir, "examples"), { recursive: true });
        const astroName = `demo-${demo.index}.astro`;
        const htmlName = `demo-${demo.index}.html`;
        await writeFile(
            resolve(dir, "examples", astroName),
            renderExampleAstro(demo.inner, imports),
            "utf8",
        );
        await writeFile(resolve(dir, "examples", htmlName), html + "\n", "utf8");
        const tag = `<Example collection="decisions" component="${slug}" astro="./examples/${astroName}" html="./examples/${htmlName}" />`;
        markdown = markdown.replace(`DEMOPLACEHOLDER${demo.index}DEMOPLACEHOLDER`, tag);
    }

    markdown = markdown.replace(/\n{3,}/g, "\n\n").trim();

    const fm = buildFrontmatter({
        number: heading?.number,
        title: heading?.title ?? slug,
        status: status?.status ?? "proposal",
        dateProposed: date?.date,
    });

    const mdx = `${fm}\n\n${markdown}\n`;
    await mkdir(dir, { recursive: true });
    await writeFile(resolve(dir, "index.mdx"), mdx, "utf8");
    console.log(
        `  wrote: src/content/decisions/${slug}/index.mdx` +
            (demos.length ? ` (+${demos.length} demo example${demos.length > 1 ? "s" : ""})` : ""),
    );
    return true;
}

async function main() {
    const entries = await readdir(PAGES_DIR, { withFileTypes: true });
    const pages = entries
        .filter((e) => e.isFile() && e.name.endsWith(".astro"))
        .map((e) => e.name.replace(/\.astro$/, ""))
        .filter((name) => !EXCLUDED.has(name))
        .sort();

    console.log(`Found ${pages.length} decision page(s): ${pages.join(", ")}`);

    let written = 0;
    let skipped = 0;
    for (const slug of pages) {
        const outPath = resolve(CONTENT_DIR, slug, "index.mdx");
        if (!FORCE && (await fileExists(outPath))) {
            console.log(`  skip (exists): ${slug}  — use --force to overwrite`);
            skipped++;
            continue;
        }
        const source = await readFile(resolve(PAGES_DIR, `${slug}.astro`), "utf8");
        if (await migrate(slug, source)) written++;
        else skipped++;
    }

    console.log(`\nDone. ${written} written, ${skipped} skipped.`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});

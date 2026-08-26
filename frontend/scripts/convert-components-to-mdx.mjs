/*
 * Deterministic converter: component page .astro -> folder-per-component content.
 *
 * For each frontend/src/pages/components/<slug>/index.astro it writes:
 *   src/content/components/_generated/<slug>/index.mdx      (prose + <Example> refs)
 *   src/content/components/_generated/<slug>/examples/<variant>.astro   (verbatim)
 *   src/content/components/_generated/<slug>/examples/<variant>.html    (verbatim)
 *
 * - Example code is written to REAL .astro/.html files, byte-verbatim from the
 *   source `code={`...`}` blocks (no YAML escaping).
 * - The index.mdx references them by relative path:
 *     <Example astro="./examples/default.astro" html="./examples/default.html" />
 * - Prose / headings / lists / tables / guidance are converted to Markdown via
 *   turndown (deterministic).
 *
 * Does NOT touch the .astro pages. Output goes to a _generated/ review tree.
 */

import {
    readFileSync,
    writeFileSync,
    mkdirSync,
    readdirSync,
    rmSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = join(__dirname, "../src/pages/components");
const OUT_DIR = join(__dirname, "../src/content/components/_generated");

const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "*",
});
td.use(gfm);

function normaliseTableComponents(html) {
    return html
        .replace(/<Table>/g, "<table>")
        .replace(/<\/Table>/g, "</table>")
        .replace(/<TableHead>/g, "<thead>")
        .replace(/<\/TableHead>/g, "</thead>")
        .replace(/<TableBody>/g, "<tbody>")
        .replace(/<\/TableBody>/g, "</tbody>")
        .replace(/<TableRow>/g, "<tr>")
        .replace(/<\/TableRow>/g, "</tr>")
        .replace(/<TableHeader[^>]*>/g, "<th>")
        .replace(/<\/TableHeader>/g, "</th>")
        .replace(/<TableCell[^>]*>/g, "<td>")
        .replace(/<\/TableCell>/g, "</td>");
}

function escapeCodeContents(html) {
    return html.replace(/<code>([\s\S]*?)<\/code>/g, (_, inner) => {
        const escaped = inner
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        return `<code>${escaped}</code>`;
    });
}

function proseToMd(html) {
    if (!html || !html.trim()) return "";
    return td
        .turndown(escapeCodeContents(normaliseTableComponents(html)))
        .trim();
}

function extractCodeBlocks(src) {
    const blocks = [];
    const marker = "code={`";
    let i = 0;
    while ((i = src.indexOf(marker, i)) !== -1) {
        const start = i + marker.length;
        const end = src.indexOf("`}", start);
        if (end === -1) break;
        const code = src.slice(start, end);
        const after = src.slice(end, end + 60);
        const langMatch = after.match(/lang="([^"]+)"/);
        blocks.push({ code, lang: langMatch ? langMatch[1] : "" });
        i = end + 2;
    }
    return blocks;
}

function layoutBody(src) {
    const open = src.indexOf("<Layout>");
    const close = src.lastIndexOf("</Layout>");
    return src.slice(open + "<Layout>".length, close);
}

function h1Name(body) {
    const m = body.match(/<h1 class="govuk-heading-xl">([\s\S]*?)<\/h1>/);
    return m ? m[1].trim() : "";
}

function indexOfShowCodeDetails(html, from) {
    let idx = html.indexOf("<Details>", from);
    while (idx !== -1) {
        if (html.slice(idx, idx + 120).includes("Show code")) return idx;
        idx = html.indexOf("<Details>", idx + 1);
    }
    return -1;
}

function extractBalancedDiv(html, openIdx) {
    const openTagEnd = html.indexOf(">", openIdx) + 1;
    const cls = html.slice(openIdx, openTagEnd);
    const variant = cls.includes("--inverse") ? "inverse" : "default";
    let depth = 1;
    const tagRe = /<(\/?)div\b[^>]*>/g;
    tagRe.lastIndex = openTagEnd;
    let t;
    while ((t = tagRe.exec(html)) !== null) {
        depth += t[1] === "/" ? -1 : 1;
        if (depth === 0)
            return { variant, endIndex: tagRe.lastIndex };
    }
    return { variant, endIndex: html.length };
}

function extractBalancedTag(html, openIdx, tag) {
    const openRe = new RegExp(`<(\\/?)${tag}\\b[^>]*>`, "g");
    openRe.lastIndex = openIdx;
    let depth = 0;
    let m;
    while ((m = openRe.exec(html)) !== null) {
        depth += m[1] === "/" ? -1 : 1;
        if (depth === 0) return { endIndex: openRe.lastIndex };
    }
    return { endIndex: html.length };
}

function extractGuidance(body) {
    const start = body.indexOf("GOVUK_GUIDANCE:START");
    if (start === -1) return null;
    const startClose = body.indexOf("-->", start) + 3;
    const end = body.indexOf("<!-- GOVUK_GUIDANCE:END", startClose);
    return body.slice(startClose, end).trim();
}

function findExampleIds(body) {
    const re = /<Tab href="#([^"]+?)-astro"/g;
    const ids = [];
    let m;
    while ((m = re.exec(body)) !== null) ids.push(m[1]);
    return ids;
}

/** Split body into ordered prose / demo / code tokens. */
function tokenize(body) {
    let work = body.replace(/<h1 class="govuk-heading-xl">[\s\S]*?<\/h1>/, "");
    const tokens = [];
    let i = 0;
    while (i < work.length) {
        const demoIdx = work.indexOf('<div class="component-container', i);
        const detailsIdx = indexOfShowCodeDetails(work, i);
        const candidates = [demoIdx, detailsIdx].filter((n) => n !== -1);
        if (candidates.length === 0) {
            tokens.push({ type: "prose", html: work.slice(i) });
            break;
        }
        const next = Math.min(...candidates);
        if (next > i) tokens.push({ type: "prose", html: work.slice(i, next) });
        if (next === demoIdx) {
            const demo = extractBalancedDiv(work, demoIdx);
            tokens.push({ type: "demo", variant: demo.variant });
            i = demo.endIndex;
        } else {
            const det = extractBalancedTag(work, detailsIdx, "Details");
            tokens.push({ type: "code" });
            i = det.endIndex;
        }
    }
    return tokens;
}

function convert(slug) {
    const src = readFileSync(join(PAGES_DIR, slug, "index.astro"), "utf8");
    let body = layoutBody(src);
    const name = h1Name(body);

    const guidanceHtml = extractGuidance(body);
    let afterGuidance = "";
    if (guidanceHtml !== null) {
        const gStart = body.indexOf("<!-- GOVUK_GUIDANCE:START");
        const endMarker = body.indexOf("<!-- GOVUK_GUIDANCE:END", gStart);
        const gEnd = body.indexOf("-->", endMarker) + 3;
        afterGuidance = body.slice(gEnd).trim();
        body = body.slice(0, gStart);
    }

    const ids = findExampleIds(src);
    const codeBlocks = extractCodeBlocks(src);

    // Pair snippets [astro, html] per example and collect files to write.
    const exampleFiles = [];
    const examples = ids.map((id, n) => {
        const astro = codeBlocks[n * 2];
        const html = codeBlocks[n * 2 + 1];
        const rec = { id, astro: null, html: null };
        if (astro && astro.lang === "astro") {
            rec.astro = `examples/${id}.astro`;
            exampleFiles.push({ path: rec.astro, code: astro.code });
        }
        if (html && html.lang === "html") {
            rec.html = `examples/${id}.html`;
            exampleFiles.push({ path: rec.html, code: html.code });
        }
        return rec;
    });

    const tokens = tokenize(body);
    let codeCounter = 0;
    const parts = [];
    let pendingVariant = null;
    for (const tk of tokens) {
        if (tk.type === "prose") {
            const md = proseToMd(tk.html);
            if (md) parts.push(md);
        } else if (tk.type === "demo") {
            pendingVariant = tk.variant;
        } else if (tk.type === "code") {
            const ex = examples[codeCounter];
            if (ex) {
                const attrs = [`component="${slug}"`];
                if (ex.astro) attrs.push(`astro="./${ex.astro}"`);
                if (ex.html) attrs.push(`html="./${ex.html}"`);
                if (pendingVariant === "inverse")
                    attrs.push(`variant="inverse"`);
                parts.push(`<Example ${attrs.join(" ")} />`);
            }
            pendingVariant = null;
            codeCounter++;
        }
    }

    if (guidanceHtml) parts.push(proseToMd(guidanceHtml));
    if (afterGuidance) parts.push(proseToMd(afterGuidance));

    const frontmatter = [
        "---",
        `name: ${name}`,
        `status: standard`,
        "---",
    ].join("\n");

    const mdx = [frontmatter, "", parts.join("\n\n"), ""].join("\n");
    return { mdx, exampleFiles };
}

function main() {
    // Fresh output tree.
    rmSync(OUT_DIR, { recursive: true, force: true });
    mkdirSync(OUT_DIR, { recursive: true });

    const slugs = readdirSync(PAGES_DIR, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .filter((s) => s !== "button" && s !== "radios");

    let ok = 0;
    for (const slug of slugs) {
        try {
            const { mdx, exampleFiles } = convert(slug);
            const dir = join(OUT_DIR, slug);
            mkdirSync(join(dir, "examples"), { recursive: true });
            writeFileSync(join(dir, "index.mdx"), mdx, "utf8");
            for (const f of exampleFiles) {
                writeFileSync(join(dir, f.path), f.code, "utf8");
            }
            ok++;
            console.log(`✓ ${slug} (${exampleFiles.length} example files)`);
        } catch (err) {
            console.error(`✗ ${slug}: ${err.message}`);
        }
    }
    console.log(`\nConverted ${ok}/${slugs.length} -> ${OUT_DIR}`);
}

main();

/*
 * Fidelity check for the component MDX conversion.
 *
 * Compares only the human-readable PROSE/GUIDANCE text between the original
 * page and the generated MDX. It deliberately ignores:
 *   - code snippets (moved to frontmatter; their text is not "prose")
 *   - <Code>/<Tabs> scaffolding and its attributes (lang=, theme=, Show code)
 *   - frontmatter and import lines added by the generator
 *   - demo markup (kept verbatim, so identical by construction)
 *
 * This isolates the risky part — the lossy HTML->Markdown of narrative text —
 * so we catch dropped or altered words without noise from structural changes.
 */

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = join(__dirname, "../src/pages/components");
const GEN_DIR = join(__dirname, "../src/content/components/_generated");

/** Remove everything that isn't narrative prose, then return sorted words. */
function proseWords(text, { isSource }) {
    let t = text;

    if (isSource) {
        // Drop the h1 (component name moves to frontmatter).
        t = t.replace(/<h1 class="govuk-heading-xl">[\s\S]*?<\/h1>/, " ");
        // Drop the whole <Code ... /> blocks (their code + attrs are not prose).
        t = t.replace(/code=\{`[\s\S]*?`\}/g, " ");
        t = t.replace(/lang="[^"]*"/g, " ").replace(/theme="[^"]*"/g, " ");
        // Drop tab scaffolding text.
        t = t.replace(/Show code/g, " ");
        t = t.replace(/<Tab\b[\s\S]*?<\/Tab>/g, " ");
    } else {
        // Generated: drop frontmatter block entirely (name + code snippets live there).
        t = t.replace(/^---[\s\S]*?\n---/m, " ");
        // Drop import lines.
        t = t.replace(/^import .*$/gm, " ");
        // Drop the <Example .../> and <CodeExample .../> tags.
        t = t.replace(/<Example[\s\S]*?\/>/g, " ");
        t = t.replace(/<CodeExample[\s\S]*?\/>/g, " ");
    }

    return t
        .replace(/<[^>]+>/g, " ") // strip tags
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/[#*`_>|]/g, " ") // md punctuation (keep - and / inside words? no)
        .replace(/[()[\]]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase()
        .split(" ")
        .filter((w) => w && w !== "-" && w !== "/")
        .sort();
}

function bodyOf(src) {
    const o = src.indexOf("<Layout>");
    const c = src.lastIndexOf("</Layout>");
    return o !== -1 && c !== -1 ? src.slice(o + 8, c) : src;
}

/** Multiset difference: words in A not accounted for in B. */
function diff(aWords, bWords) {
    const bCount = new Map();
    for (const w of bWords) bCount.set(w, (bCount.get(w) || 0) + 1);
    const missing = [];
    for (const w of aWords) {
        const n = bCount.get(w) || 0;
        if (n === 0) missing.push(w);
        else bCount.set(w, n - 1);
    }
    return missing;
}

function main() {
    const slugs = readdirSync(GEN_DIR, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);
    let anyFail = 0;
    for (const slug of slugs) {
        const srcPath = join(PAGES_DIR, slug, "index.astro");
        let src;
        try {
            src = readFileSync(srcPath, "utf8");
        } catch {
            console.log(`? ${slug}: no source page (skipped)`);
            continue;
        }
        // Prose comparison. The live demo markup is no longer inline in the
        // mdx (it renders from example files), so include the .html example
        // files on the generated side — their text corresponds to the source's
        // demo + code. (.astro examples are omitted to avoid double-counting the
        // same visible text.)
        const mdx = readFileSync(join(GEN_DIR, slug, "index.mdx"), "utf8");
        let htmlExamples = "";
        const exDir = join(GEN_DIR, slug, "examples");
        try {
            for (const f of readdirSync(exDir)) {
                if (f.endsWith(".html"))
                    htmlExamples += "\n" + readFileSync(join(exDir, f), "utf8");
            }
        } catch {
            /* no examples */
        }

        const srcWords = proseWords(bodyOf(src), { isSource: true });
        const genWords = proseWords(mdx + "\n" + htmlExamples, {
            isSource: false,
        });

        const missing = diff(srcWords, genWords); // in source, not in output
        const added = diff(genWords, srcWords); // in output, not in source

        if (missing.length === 0 && added.length === 0) {
            console.log(`✓ ${slug}`);
        } else {
            anyFail++;
            console.log(
                `✗ ${slug}: missing ${missing.length}, added ${added.length}`,
            );
            if (missing.length)
                console.log(`    missing: ${missing.slice(0, 20).join(" ")}`);
            if (added.length)
                console.log(`    added:   ${added.slice(0, 20).join(" ")}`);
        }
    }
    console.log(
        anyFail ? `\n${anyFail} file(s) differ — review above.` : "\nAll files match (visible text identical).",
    );
    process.exit(anyFail ? 1 : 0);
}

main();

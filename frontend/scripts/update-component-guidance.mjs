// UPDATE script: refreshes the "When to use" / "When not to use this component"
// guidance on the generated component pages.
//
// It only rewrites the region BETWEEN the guidance markers - the title, intro,
// example, and any manual edits you have made elsewhere on the page are left
// untouched. Components in EXCLUDED_COMPONENTS are skipped entirely, and any
// page WITHOUT the guidance markers is skipped (treat it as fully adapted).
//
// Run with:  node scripts/update-component-guidance.mjs
// Add --check to report what would change without writing.

import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import {
  PAGES_DIR,
  EXCLUDED_COMPONENTS,
} from "./govuk-components.config.mjs";
import {
  GUIDANCE_START,
  GUIDANCE_END,
  fetchGuidanceMarkdown,
  splitFrontmatter,
  extractSection,
  markdownToGovukHtml,
} from "./guidance-lib.mjs";

const CHECK_ONLY = process.argv.includes("--check");

function indent(html, spaces) {
  const pad = " ".repeat(spaces);
  return html
    .split("\n")
    .map((line) => (line.length ? pad + line : line))
    .join("\n");
}

function buildGuidanceHtml(sections) {
  const parts = [];
  if (sections.whenToUse) {
    parts.push('        <h2 class="govuk-heading-l">When to use this component</h2>');
    parts.push(indent(sections.whenToUse, 8));
  }
  if (sections.whenNotToUse) {
    parts.push('        <h2 class="govuk-heading-l">When not to use this component</h2>');
    parts.push(indent(sections.whenNotToUse, 8));
  }
  if (parts.length === 0) {
    parts.push(
      '        <p class="govuk-body">No "when to use" guidance was found for this component.</p>',
    );
  }
  return parts.join("\n");
}

async function listComponentPages() {
  const entries = await readdir(PAGES_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => !EXCLUDED_COMPONENTS.includes(name))
    .sort();
}

function replaceGuidance(source, newGuidance) {
  const startIdx = source.indexOf(GUIDANCE_START);
  const endIdx = source.indexOf(GUIDANCE_END);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) return null;

  const before = source.slice(0, startIdx + GUIDANCE_START.length);
  const after = source.slice(endIdx);
  return `${before}\n${newGuidance}\n        ${after}`;
}

async function main() {
  const names = await listComponentPages();
  console.log(`Checking ${names.length} component pages (excluding: ${EXCLUDED_COMPONENTS.join(", ")}).`);

  let updated = 0;
  let unchanged = 0;
  let skipped = 0;

  for (const name of names) {
    const pagePath = resolve(PAGES_DIR, name, "index.astro");
    let source;
    try {
      source = await readFile(pagePath, "utf8");
    } catch {
      console.log(`  skip (no page): ${name}`);
      skipped++;
      continue;
    }

    if (!source.includes(GUIDANCE_START) || !source.includes(GUIDANCE_END)) {
      console.log(`  skip (no guidance markers - treated as adapted): ${name}`);
      skipped++;
      continue;
    }

    const md = await fetchGuidanceMarkdown(name);
    if (!md) {
      console.log(`  skip (no GDS guidance page): ${name}`);
      skipped++;
      continue;
    }

    const { body } = splitFrontmatter(md);
    const sections = {
      whenToUse: markdownToGovukHtml(extractSection(body, "When to use this component")),
      whenNotToUse: markdownToGovukHtml(extractSection(body, "When not to use this component")),
    };

    const guidanceHtml = buildGuidanceHtml(sections);
    const next = replaceGuidance(source, guidanceHtml);
    if (next === null) {
      console.log(`  skip (malformed markers): ${name}`);
      skipped++;
      continue;
    }

    if (next === source) {
      unchanged++;
      continue;
    }

    if (CHECK_ONLY) {
      console.log(`  would update: ${name}`);
    } else {
      await writeFile(pagePath, next, "utf8");
      console.log(`  updated: ${name}`);
    }
    updated++;
  }

  console.log(
    `\nDone. ${updated} ${CHECK_ONLY ? "would be updated" : "updated"}, ${unchanged} unchanged, ${skipped} skipped.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

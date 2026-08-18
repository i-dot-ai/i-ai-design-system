// ONE-TIME generator: scaffolds a page per GOV.UK component.
//
// For each component (from the installed govuk-frontend package, minus the
// excluded list) this writes src/pages/components/<name>/index.astro with:
//   - the title and leading intro (fetched from the GOV.UK Design System)
//   - one rendered HTML example (the package's template-default.html)
//   - a guidance region (When to use / When not to use) between markers
//
// Run with:  node scripts/generate-component-pages.mjs
// Add --force to overwrite pages that already exist.

import { readdir, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { resolve } from "node:path";

import {
  GOVUK_COMPONENTS_DIR,
  PAGES_DIR,
  EXCLUDED_COMPONENTS,
  toTitleCase,
} from "./govuk-components.config.mjs";
import {
  GUIDANCE_START,
  GUIDANCE_END,
  fetchGuidanceMarkdown,
  splitFrontmatter,
  extractSection,
  markdownToGovukHtml,
} from "./guidance-lib.mjs";

const FORCE = process.argv.includes("--force");

async function listComponents() {
  const entries = await readdir(GOVUK_COMPONENTS_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => !EXCLUDED_COMPONENTS.includes(name))
    .sort();
}

async function readExample(componentName) {
  const path = resolve(GOVUK_COMPONENTS_DIR, componentName, "template-default.html");
  try {
    const html = await readFile(path, "utf8");
    return html.trim();
  } catch {
    return null;
  }
}

// Indent a raw HTML example so it nests cleanly inside the Astro template.
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
    parts.push('    <h2 class="govuk-heading-l">When to use this component</h2>');
    parts.push(indent(sections.whenToUse, 4));
  }
  if (sections.whenNotToUse) {
    parts.push('    <h2 class="govuk-heading-l">When not to use this component</h2>');
    parts.push(indent(sections.whenNotToUse, 4));
  }
  if (parts.length === 0) {
    parts.push(
      '    <p class="govuk-body">No "when to use" guidance was found for this component.</p>',
    );
  }
  return parts.join("\n");
}

function pageTemplate({ title, description, exampleHtml, guidanceHtml }) {
  return `---
import Layout from "@layouts/Layout.astro";
import ComponentsSideNav from "@layouts/ComponentsSideNav.astro";
---

<Layout>
  <div class="govuk-main-wrapper govuk-width-container">
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-one-third">
        <ComponentsSideNav />
      </div>
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">${escapeAttr(title)}</h1>
        <p class="govuk-body-l">${escapeAttr(description)}</p>

        <h2 class="govuk-heading-l">Example</h2>
${indent(exampleHtml, 8)}

        ${GUIDANCE_START}
${indent(guidanceHtml, 4)}
        ${GUIDANCE_END}
      </div>
    </div>
  </div>
</Layout>
`;
}

function escapeAttr(str) {
  return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function fileExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const components = await listComponents();
  console.log(`Found ${components.length} components (excluding: ${EXCLUDED_COMPONENTS.join(", ")}).`);

  let written = 0;
  let skipped = 0;

  for (const name of components) {
    const dir = resolve(PAGES_DIR, name);
    const pagePath = resolve(dir, "index.astro");

    if (!FORCE && (await fileExists(pagePath))) {
      console.log(`  skip (exists): ${name}  — use --force to overwrite`);
      skipped++;
      continue;
    }

    const md = await fetchGuidanceMarkdown(name);
    let title = toTitleCase(name);
    let description = "";
    let sections = {};

    if (md) {
      const { frontmatter, body } = splitFrontmatter(md);
      if (frontmatter.title) title = frontmatter.title;
      if (frontmatter.description) description = frontmatter.description;
      sections = {
        whenToUse: markdownToGovukHtml(extractSection(body, "When to use this component")),
        whenNotToUse: markdownToGovukHtml(extractSection(body, "When not to use this component")),
      };
    } else {
      console.log(`  (no GDS guidance page for "${name}", using fallback title)`);
    }

    const exampleHtml = (await readExample(name)) ?? `<!-- no template-default.html for ${name} -->`;

    const page = pageTemplate({
      title,
      description,
      exampleHtml,
      guidanceHtml: buildGuidanceHtml(sections),
    });

    await mkdir(dir, { recursive: true });
    await writeFile(pagePath, page, "utf8");
    console.log(`  wrote: src/pages/components/${name}/index.astro`);
    written++;
  }

  console.log(`\nDone. ${written} written, ${skipped} skipped.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

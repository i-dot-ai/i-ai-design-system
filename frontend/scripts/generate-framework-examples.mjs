#!/usr/bin/env node
// One-off generator: creates React, Svelte and Solid example snippets from the
// existing Astro examples, and rewrites the <Example> tags in each index.mdx to
// reference all five frameworks. Snippets are documentation source only (read as
// raw text by src/components/docs/example.astro); they are never compiled.

import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const COMPONENTS_DIR = join(__dirname, "..", "src", "content", "components");

const ASTRO_PKG = "@i-dot-ai-npm/component-library-astro";
const REACT_PKG = "@i-dot-ai-npm/component-library-react";
const SVELTE_PKG = "@i-dot-ai-npm/component-library-svelte";
const SOLID_PKG = "@i-dot-ai-npm/component-library-solid";

// kebab-case -> PascalCase, e.g. "select-option" -> "SelectOption"
function pascal(kebab) {
  return kebab
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

// Parse the astro file into { imports: [{local, dir, file}], body }
function parseAstro(src) {
  const fm = src.match(/^---\n([\s\S]*?)\n---\n?/);
  const frontmatter = fm ? fm[1] : "";
  const body = (fm ? src.slice(fm[0].length) : src).trim();

  const imports = [];
  const importRe =
    /import\s+(\w+)\s+from\s+["']@i-dot-ai-npm\/component-library-astro\/([^"']+?)\.astro["'];?/g;
  let m;
  while ((m = importRe.exec(frontmatter)) !== null) {
    const local = m[1];
    const path = m[2]; // e.g. "select/select-option"
    const parts = path.split("/");
    const dir = parts.slice(0, -1).join("/");
    const file = parts[parts.length - 1];
    imports.push({ local, dir, file });
  }
  return { imports, body };
}

function buildImports(imports, pkg, ext, casing) {
  return imports
    .map(({ local, dir, file }) => {
      const name = casing === "pascal" ? pascal(file) : file;
      const suffix = ext ? `.${ext}` : "";
      return `import ${local} from "${pkg}/${dir}/${name}${suffix}";`;
    })
    .join("\n");
}

// React: class-> className, for-> htmlFor. Drop inert slot="..." attributes.
function toReactBody(body) {
  return body
    .replace(/\bclass=/g, "className=")
    .replace(/\bfor=/g, "htmlFor=")
    .replace(/\s+slot="[^"]*"/g, "");
}

// Indent a block by n spaces (skip empty lines).
function indent(text, n) {
  const pad = " ".repeat(n);
  return text
    .split("\n")
    .map((l) => (l.trim() === "" ? "" : pad + l))
    .join("\n");
}

function makeReact(parsed) {
  const imports = buildImports(parsed.imports, REACT_PKG, "", "pascal");
  const body = toReactBody(parsed.body);
  return `${imports}\n\nexport default function Example() {\n  return (\n${indent(body, 4)}\n  );\n}\n`;
}

function makeSolid(parsed) {
  const imports = buildImports(parsed.imports, SOLID_PKG, "", "pascal");
  // Solid uses HTML-style attributes (class/for), same as the astro body.
  const body = parsed.body;
  return `${imports}\n\nexport default function Example() {\n  return (\n${indent(body, 4)}\n  );\n}\n`;
}

function makeSvelte(parsed) {
  const imports = buildImports(parsed.imports, SVELTE_PKG, "svelte", "pascal");
  const body = parsed.body;
  return `<script>\n${indent(imports, 2)}\n</script>\n\n${body}\n`;
}

function processComponent(compDir) {
  const examplesDir = join(compDir, "examples");
  if (!existsSync(examplesDir)) return null;

  const astroFiles = readdirSync(examplesDir).filter((f) => f.endsWith(".astro"));
  const variants = [];

  for (const astroFile of astroFiles) {
    const variant = basename(astroFile, ".astro");
    const src = readFileSync(join(examplesDir, astroFile), "utf8");
    const parsed = parseAstro(src);
    if (parsed.imports.length === 0) {
      // No component-library imports (e.g. raw HTML/SVG only) - skip framework
      // generation for this variant, leave html/astro as-is.
      variants.push({ variant, skipped: true });
      continue;
    }

    writeFileSync(join(examplesDir, `${variant}.react.tsx`), makeReact(parsed));
    writeFileSync(join(examplesDir, `${variant}.solid.tsx`), makeSolid(parsed));
    writeFileSync(join(examplesDir, `${variant}.svelte`), makeSvelte(parsed));
    variants.push({ variant, skipped: false });
  }

  return variants;
}

// Rewrite <Example .../> tags in index.mdx to include all five frameworks,
// ordered html, astro, react, svelte, solid.
function rewriteMdx(compDir, componentSlug, variants) {
  const mdxPath = join(compDir, "index.mdx");
  if (!existsSync(mdxPath)) return;
  let mdx = readFileSync(mdxPath, "utf8");

  const skippedSet = new Set(variants.filter((v) => v.skipped).map((v) => v.variant));

  // Match each self-closing <Example ... /> tag.
  mdx = mdx.replace(/<Example\b[^>]*\/>/g, (tag) => {
    const htmlM = tag.match(/html="([^"]+)"/);
    const astroM = tag.match(/astro="([^"]+)"/);
    const compM = tag.match(/component="([^"]+)"/);
    const variantAttrM = tag.match(/variant="([^"]+)"/);

    const component = compM ? compM[1] : componentSlug;
    // Derive the variant base from the astro or html path.
    const refPath = astroM?.[1] || htmlM?.[1];
    if (!refPath) return tag;
    const variantBase = basename(refPath).replace(/\.(astro|html)$/, "");

    // If this variant had no importable components, leave the tag untouched.
    if (skippedSet.has(variantBase)) return tag;

    const parts = [`<Example component="${component}"`];
    if (htmlM) parts.push(`html="./examples/${variantBase}.html"`);
    if (astroM) parts.push(`astro="./examples/${variantBase}.astro"`);
    parts.push(`react="./examples/${variantBase}.react.tsx"`);
    parts.push(`svelte="./examples/${variantBase}.svelte"`);
    parts.push(`solid="./examples/${variantBase}.solid.tsx"`);
    if (variantAttrM) parts.push(`variant="${variantAttrM[1]}"`);
    parts.push("/>");
    return parts.join(" ");
  });

  writeFileSync(mdxPath, mdx);
}

const entries = readdirSync(COMPONENTS_DIR).filter((name) => {
  const p = join(COMPONENTS_DIR, name);
  return statSync(p).isDirectory();
});

let total = 0;
const skippedReport = [];
for (const slug of entries) {
  const compDir = join(COMPONENTS_DIR, slug);
  const variants = processComponent(compDir);
  if (!variants) continue;
  rewriteMdx(compDir, slug, variants);
  const generated = variants.filter((v) => !v.skipped);
  total += generated.length;
  const skipped = variants.filter((v) => v.skipped);
  if (skipped.length) {
    skippedReport.push(`${slug}: ${skipped.map((s) => s.variant).join(", ")}`);
  }
  console.log(`${slug}: ${generated.length} variant(s) x3 frameworks`);
}

console.log(`\nTotal variants generated: ${total} (x3 = ${total * 3} files)`);
if (skippedReport.length) {
  console.log(`\nSkipped (no component-library imports):`);
  skippedReport.forEach((r) => console.log(`  ${r}`));
}

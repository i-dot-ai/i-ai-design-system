// Shared helpers for fetching and parsing GOV.UK Design System guidance.
//
// The guidance source is Markdown with Nunjucks macros mixed in. We only want
// the prose from the "When to use this component" and "When not to use this
// component" sections, so we extract those headings and clean the content.

import { GUIDANCE_RAW_BASE } from "./govuk-components.config.mjs";

// Markers written into each generated page. The update script replaces
// everything BETWEEN these two markers, leaving the rest of the page (title,
// intro, example, and any manual edits) untouched.
export const GUIDANCE_START = "<!-- GOVUK_GUIDANCE:START (auto-generated - edited content will be overwritten by scripts/update-component-guidance.mjs) -->";
export const GUIDANCE_END = "<!-- GOVUK_GUIDANCE:END -->";

// Fetch the raw index.md for a component from the design-system repo.
// Returns null if the component has no guidance page (404).
export async function fetchGuidanceMarkdown(componentName) {
  const url = `${GUIDANCE_RAW_BASE}/${componentName}/index.md`;
  const res = await fetch(url);
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch guidance for "${componentName}": ${res.status} ${res.statusText}`);
  }
  return res.text();
}

// Split off the YAML-ish frontmatter and return { frontmatter, body }.
export function splitFrontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: markdown };

  const frontmatter = {};
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) frontmatter[kv[1]] = kv[2].trim();
  }
  return { frontmatter, body: match[2] };
}

// Extract the prose under a given "## <heading>" until the next "## " heading.
// Returns the raw markdown block, or null if the heading isn't present.
export function extractSection(body, headingText) {
  const lines = body.split("\n");
  const headingRe = new RegExp(`^##\\s+${escapeRegExp(headingText)}\\s*$`, "i");
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (headingRe.test(lines[i])) {
      start = i + 1;
      break;
    }
  }
  if (start === -1) return null;

  let end = lines.length;
  for (let i = start; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i])) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join("\n").trim();
}

// Convert a cleaned markdown block into simple GOV.UK-styled HTML.
// Handles paragraphs, unordered lists, and inline links/bold. Strips any
// Nunjucks example macros. This is intentionally minimal - guidance prose only
// uses a small subset of markdown.
export function markdownToGovukHtml(markdown) {
  if (!markdown) return "";

  // Remove Nunjucks macro calls / imports entirely.
  const withoutMacros = markdown
    .split("\n")
    .filter((line) => !/^\s*{[{%].*[%}]}\s*$/.test(line))
    .join("\n");

  const blocks = withoutMacros.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  const html = [];

  for (const block of blocks) {
    const lines = block.split("\n");
    const isList = lines.every((l) => /^\s*[-*]\s+/.test(l));
    if (isList) {
      const items = lines
        .map((l) => l.replace(/^\s*[-*]\s+/, ""))
        .map((l) => `    <li>${inline(l)}</li>`)
        .join("\n");
      html.push(`  <ul class="govuk-list govuk-list--bullet">\n${items}\n  </ul>`);
    } else if (/^###\s+/.test(block)) {
      html.push(`  <h3 class="govuk-heading-s">${inline(block.replace(/^###\s+/, ""))}</h3>`);
    } else {
      html.push(`  <p class="govuk-body">${inline(block.replace(/\n/g, " "))}</p>`);
    }
  }

  return html.join("\n");
}

// Inline markdown: links and bold. Also rewrites relative GDS links to absolute.
function inline(text) {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label, href) => {
      const abs = href.startsWith("/") ? `https://design-system.service.gov.uk${href}` : href;
      return `<a class="govuk-link" href="${abs}">${label}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/&nbsp;/g, " ");
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Shared configuration for the GOV.UK component sync scripts.
//
// - `generate-component-pages.mjs` runs once to scaffold a page per component.
// - `update-component-guidance.mjs` refreshes the "When to use" / "When not to
//   use this component" guidance on those pages.
//
// Both read the component list from the locally installed `govuk-frontend`
// package, so the set of components always matches the version you have pinned
// in package.json. Bump the package and re-run the scripts to pick up changes.

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Repo paths.
export const FRONTEND_ROOT = resolve(__dirname, "..");
export const GOVUK_COMPONENTS_DIR = resolve(
  FRONTEND_ROOT,
  "node_modules/govuk-frontend/dist/govuk/components",
);
export const PAGES_DIR = resolve(FRONTEND_ROOT, "src/pages/components");

// Components to EXCLUDE entirely (no page is generated, and the update script
// never touches them).
//
// Add a component name here once you have created your own adapted version and
// no longer want the sync script to overwrite its guidance. The names must
// match the directory names under node_modules/govuk-frontend/.../components.
export const EXCLUDED_COMPONENTS = [
  "header", // GOV.UK branded header - not used in this design system
  "footer", // GOV.UK branded footer - not used in this design system
];

// Source of the narrative guidance ("When to use" etc). This lives in the
// design-system website repo, NOT the govuk-frontend package.
export const GUIDANCE_RAW_BASE =
  "https://raw.githubusercontent.com/alphagov/govuk-design-system/main/src/components";

// Turn a govuk-frontend component directory name into a human title fallback.
// e.g. "character-count" -> "Character count"
export function toTitleCase(name) {
  return name
    .split("-")
    .map((word, i) => (i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(" ");
}

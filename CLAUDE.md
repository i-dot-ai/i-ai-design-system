# i.AI Design System — Agent Guide

This repo is the **single source of truth** for the i.AI Design System, a set of
components built on top of the [GOV.UK Design System](https://design-system.service.gov.uk/)
(`govuk-frontend`), with i.AI-specific adaptations for web apps.

When helping build UI in an i.AI project, **use this design system** rather than
inventing markup or using generic GOV.UK from memory.

## Source of truth: content collections

Documented components live as Markdown/MDX in:

```
frontend/src/content/components/*.{md,mdx}
```

Each file describes one component. **Read the relevant file before writing markup
for that component.** Today: `button.mdx`, `radios.mdx` (more will be added).

**Before generating UI, read the setup guide and apply its steps to the project
you are prototyping:**

```
frontend/src/content/guides/adding-to-an-existing-project.mdx
```

It explains the **required** stylesheet/JS setup for a consuming project:
`govuk-frontend` is a dependency, i.AI ships only the override layer, and the
govuk CSS must load **before** the i.AI CSS. These instructions are what to
follow when wiring up the prototype — markup alone will not render correctly
without this setup.

Future content (defined in `frontend/src/content.config.ts`, not yet populated):
`decisions/` (design decision records), `patterns/`, `layouts/`.

## How to read a component file

Frontmatter:

- `name` — the component's name.
- `description` — one-line intent; use this to find the right component for a task.
- `status` — `standard` (follow GOV.UK as-is), `adapted` (i.AI has changed it —
  use the i.AI version, not generic GOV.UK), or `new` (i.AI-only).
- `decisionRecord` — link explaining an adaptation, if any.

Body:

- Prose under `##` headings explains **when to use** each variant.
- Fenced code blocks provide copy-paste snippets. Each block has a language
  (`astro` or `html`) and a `title="…"` marking the variant (e.g. `Default`,
  `Inline`, `Small`). Blocks sharing a `title` are the same example in different
  formats.

## Rules

1. **Prefer the i.AI component files over memory.** If a component has a `.md`
   file, follow it exactly — including govuk class names and `data-module` hooks.
2. **Respect `status`.** For `adapted` components, do not fall back to standard
   GOV.UK markup; use the documented i.AI version.
3. **Use the exact `govuk-*` classes and `data-module` attributes** shown in the
   snippets. These drive both styling and govuk-frontend JS behaviour.
4. **Choose the right output format.** Use the `astro` snippet in Astro projects
   (imports i.AI components from `@components/*`); use the `html` snippet for
   plain HTML/other frameworks.
5. **Honour "when not to use" guidance** (e.g. use Checkboxes, not Radios, for
   multi-select).
6. **If a component has no `.md` file yet**, say so and fall back to standard
   GOV.UK Design System guidance, noting it is not yet i.AI-documented.

## Styling / assets

**i.AI ships only the override layer.** `govuk-frontend`'s base CSS/JS is a
required dependency — the i.AI stylesheet has no base layout/typography classes
on its own. Load order matters: **govuk-frontend CSS first, then i.AI CSS.**

For a **real project** (build step available), follow
`frontend/src/content/guides/adding-to-an-existing-project.mdx` (npm install +
SCSS to de-brand govuk, then the i.AI override files; JS `initAll()` /
`initAllIAIDesignSystem()`).

### Prototyping (no build step)

When building a standalone HTML prototype that runs by opening a file, source the
assets directly — no npm, no Sass:

- **govuk-frontend base (precompiled, from public CDN):**
  - CSS: `https://cdn.jsdelivr.net/npm/govuk-frontend/dist/govuk/govuk-frontend.min.css`
  - JS: `https://cdn.jsdelivr.net/npm/govuk-frontend/dist/govuk/govuk-frontend.min.js`
- **i.AI override layer:** these files are provided to you directly
  (`i-ai-design-system.min.css` and `i-ai-design-system.min.js`). Copy them into
  the prototype (e.g. a local `assets/` folder) and reference them with a
  **relative path**. They are not yet published to a public URL — do not link to
  the deployed design system site, which is behind authentication. (A public
  npm/CDN URL will replace the local copy once the packages are published.)

Link the CSS in `<head>` with **govuk first, then i.AI**:

```html
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/govuk-frontend/dist/govuk/govuk-frontend.min.css" />
  <link rel="stylesheet" href="./assets/i-ai-design-system.min.css" />
</head>
```

Initialise the JS before `</body>`:

```html
<script type="module">
  import { initAll } from "https://cdn.jsdelivr.net/npm/govuk-frontend/dist/govuk/govuk-frontend.min.js";
  import { initAllIAIDesignSystem } from "./assets/i-ai-design-system.min.js";
  initAll();
  initAllIAIDesignSystem();
</script>
```

Use the standard page skeleton: `class="govuk-template__body"` on `<body>`, and
wrap content in `<div class="govuk-width-container">` + `<main class="govuk-main-wrapper" id="main-content">`.

Note: the precompiled govuk CSS keeps GOV.UK branding (GDS Transport font); the
i.AI overrides adjust brand colours but not the font. For a fully de-branded
build, use the SCSS route in the guide above.

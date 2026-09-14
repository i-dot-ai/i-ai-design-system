---
name: iai-prototype
description: The i.AI Design System — the house component library for i.AI / Incubator for AI services, built on GOV.UK Design System (govuk-frontend) with i.AI adaptations. Use this skill whenever building, prototyping, reviewing or styling any UI for an i.AI or GOV.UK service, whenever writing HTML or Astro markup for government pages, and whenever asked about buttons, radios, forms, inputs, tables, tags, navigation, page structure or accessibility in a government context — even if the user does not mention i.AI or the design system by name. Always read the live component files from the repo before writing markup; never work from generic GOV.UK Design System knowledge.
---

# i.AI Prototype

The i.AI Design System is a set of styles, patterns and components built on top of the
[GOV.UK Design System](https://design-system.service.gov.uk/) (`govuk-frontend`),
with i.AI-specific adaptations for web apps.

When helping build UI in an i.AI project, use this design system rather than
inventing markup or writing generic GOV.UK from memory. The adaptations are the
whole point — plausible-looking GOV.UK markup will pass casual review while
quietly undoing them.

## Output
You should use the html versions of components and work on a standalone html file only

### Prototyping with no build step

Inline the i.AI assets directly into the HTML file. Do not reference them with a
relative path like `./assets/i-ai-design-system.min.css` — a prototype is
usually viewed somewhere the sibling folder does not travel with it (a preview
pane, an artifact, a file pasted into a ticket), and it silently renders
unstyled. The files are in the `assets/` folder of this skill; read them and
paste the contents in.

CSS — paste into a `<style>` in `<head>`, after the govuk stylesheet link:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/govuk-frontend/dist/govuk/govuk-frontend.min.css" />
<style>/* i-ai-design-system.min.css, inlined — see i-dot-ai/i-ai-design-system */
  ...contents here...
</style>
```

JS — the i.AI file is an ES module exporting `initAllIAIDesignSystem`. Paste its
contents into a module script and call the export alongside govuk's `initAll`:

```html
<script type="module">
  import { initAll } from "https://cdn.jsdelivr.net/npm/govuk-frontend/dist/govuk/govuk-frontend.min.js";
  /* i-ai-design-system.min.js, inlined */
  ...contents here...
  initAll();
  initAllIAIDesignSystem();
</script>
```

`govuk-frontend` still loads from the CDN, so the prototype needs a network
connection. Only the i.AI layer is inlined.

Mark the inlined blocks with a comment as above. An inlined copy is a snapshot
and will not pick up design system updates — fine for a prototype, wrong for
anything longer-lived. For a real project, follow
`get-started/adding-to-an-existing-project.mdx` instead: npm install,
govuk SCSS, then the i.AI override files.

## Source of truth

Public repo: `github.com/i-dot-ai/i-ai-design-system`, branch `main`.

Fetch fresh each session. Do not rely on content fetched in an earlier
conversation.

### With a shell (preferred)

Pull the whole content directory once — 167 files, under 1MB — and read it
locally:

```sh
mkdir -p /tmp/iai-ds && cd /tmp/iai-ds
curl -sSL --fail "https://codeload.github.com/i-dot-ai/i-ai-design-system/tar.gz/refs/heads/main" \
  | tar xz --wildcards --strip-components=4 '*/frontend/src/content/*'
ls components/button/index.mdx   # must exist — if not, see "When a fetch fails"
```

`--wildcards` is GNU tar; on macOS drop that flag, wildcards are the default.

You get four directories:

- `components/<name>/index.mdx` and `components/<name>/examples/<variant>.{astro,html}`
- `styles/page-templates/` — page skeleton, read for any whole-page task
- `get-started/adding-to-an-existing-project.mdx` — setup
- `decisions/` — why a component was adapted

### Without a shell

Fetch individual files from this base:

```
https://raw.githubusercontent.com/i-dot-ai/i-ai-design-system/main/frontend/src/content
```

Paths below it are the same as above. Fetch only what the task needs.

Documented components are Markdown/MDX content collections at
`components/<component>/index.mdx`. Read the relevant file before writing markup
for that component. Fetch it fresh each session — do not rely on content fetched
in an earlier conversation. It isn't only components here though, you must use all the instructions and guidance there

Fetch only what the task needs. A task-list page needs `task-list`, `header` and
maybe `tag` — not all thirty-four.

## Before generating UI: read the setup guide

```
get-started/adding-to-an-existing-project.mdx
```

Read this for any prototyping or setup task and apply its steps to the project
you are building. `govuk-frontend` is a required dependency and i.AI ships only
the override layer, so the govuk CSS must load **before** the i.AI CSS. Markup
alone will not render correctly without this setup.

## Components

All thirty-four have an `index.mdx`:

accordion, back-link, breadcrumbs, button, card, character-count, checkboxes,
cookie-banner, date-input, details, error-message, error-summary, fieldset,
file-upload, header, hint, inset-text, label, notification-banner, pagination,
password-input, phase-banner, radios, select, service-navigation, skip-link,
summary-list, table, tabs, tag, task-list, text-input, textarea, toggle,
warning-text.

`card` is documented but has no examples directory.

## How to read a component file

**Frontmatter**

- `name` — the component's name.
- `status` — `standard` (follow GOV.UK as-is), `adapted` (i.AI has changed it —
  use the i.AI version, not generic GOV.UK), or `new` (i.AI-only).
- `decisionRecord` — link explaining an adaptation, if any.

**Body**

Prose under `##` headings explains when to use each variant, plus "when to use"
and "when not to use" sections.

Code is **not** inline in the MDX. Each variant appears as an `<Example />` tag
naming two sibling files:

```
<Example component="button" astro="./examples/default.astro" html="./examples/default.html" />
```

Fetch whichever you need from
`components/<component>/examples/<variant>.{astro,html}` — the `.html` for plain
HTML or non-Astro projects, the `.astro` for Astro projects. Resolve the paths
from the `<Example />` tag rather than guessing variant names: several
components deviate from `default` (`breadcrumbs` and `label` use `example`,
`character-count` uses `with-maximum-characters`).

## Rules

1. **Prefer the component files over memory.** If a component has an
   `index.mdx`, follow it exactly — including govuk class names and
   `data-module` hooks.
2. **Respect `status`.** For `adapted` components, do not fall back to standard
   GOV.UK markup. Currently only `button` is adapted; everything else is
   `standard`. Check rather than assume, since this changes.
3. **Use the exact `govuk-*` classes and `data-module` attributes** from the
   snippets. These drive both styling and govuk-frontend JS behaviour.
4. **Choose the right output format.** Astro snippet in Astro projects (imports
   from `@components/*`); HTML snippet for plain HTML or other frameworks.
5. **Honour "when not to use" guidance** — e.g. checkboxes, not radios, for
   multi-select.
6. **If a component has no file yet**, say so, fall back to standard GOV.UK
   Design System guidance, and note explicitly that it is not yet
   i.AI-documented.

Say which components and variants you used, so the person can check you against
the site.

## Other content

- `styles/page-structure.mdx` — how to structure i.AI apps. Read this for any
  whole-page or whole-app task, not just single components. i.AI apps are built
  for reuse, so the linear GOV.UK start-page flow often does not apply.
- `decisions/` - decision records for why there have been changes to the govuk frontend
- `patterns/` — defined in `content.config.ts` but not yet
  populated. Don't fetch until they contain files.

## Styling and assets

i.AI ships only the override layer. `govuk-frontend`'s base CSS/JS is a required
dependency — the i.AI stylesheet has no base layout or typography classes on its
own. **Load govuk-frontend CSS first, then i.AI CSS.**

For a real project with a build step, follow
`guides/adding-to-an-existing-project.mdx`: npm install, SCSS to de-brand govuk,
then the i.AI override files, then `initAll()` / `initAllIAIDesignSystem()`.

### Prototyping with no build step

For a standalone HTML prototype that runs by opening a file, source the assets
directly — no npm, no Sass.

govuk-frontend base, precompiled from a public CDN:

- CSS: `https://cdn.jsdelivr.net/npm/govuk-frontend/dist/govuk/govuk-frontend.min.css`
- JS: `https://cdn.jsdelivr.net/npm/govuk-frontend/dist/govuk/govuk-frontend.min.js`

i.AI override layer: `i-ai-design-system.min.css` and `i-ai-design-system.min.js`
are provided to you  in the assets folder of this skill. Copy them into the prototype (e.g. a local
`assets/` folder) and reference them with a **relative path**. They are not yet
published to a public URL. Do not link to the deployed design system site — it
is behind authentication and the link will fail. A public npm/CDN URL will
replace the local copy once the packages are published.

Link the CSS in `<head>`, govuk first:

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
wrap content in `<div class="govuk-width-container">` plus
`<main class="govuk-main-wrapper" id="main-content">`.

The precompiled govuk CSS keeps GOV.UK branding (GDS Transport font); the i.AI
overrides adjust brand colours but not the font. For a fully de-branded build,
use the SCSS route in the guide.

## When a fetch fails

If the repo is unreachable or a path 404s, say so plainly and stop. Do not fall
back on general GOV.UK knowledge and present it as house guidance — that failure
mode produces markup that looks right and passes review while losing the
adaptations. Offer to work from anything the user can paste in instead.
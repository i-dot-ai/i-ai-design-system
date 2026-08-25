import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/*
 * Content collections are the single source of truth for the i.AI Design
 * System's documented knowledge. They are consumed by:
 *   - the docs site (rendered pages)
 *   - AI agents (read directly today; via an MCP server in future)
 *   - the future @i-dot-ai-npm framework packages' docs
 *
 * MVP scope: only `components` is populated (button, radios). The other
 * collections are defined now so future content (decision records, patterns,
 * layout guidance) slots in without restructuring.
 */

const status = z.enum(["standard", "adapted", "new"]);

// A single documented example/variant of a component. `snippets` holds the
// copy-paste code per language; the docs site renders these in code tabs and a
// future MCP server serves the same strings to agents (single source of truth).
const example = z.object({
    id: z.string(),
    snippets: z.object({
        astro: z.string().optional(),
        html: z.string().optional(),
    }),
});

// Components: govuk-based building blocks. Body = Markdown/MDX guidance with
// live <Demo> examples; `examples` frontmatter holds the code snippets.
const components = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/components" }),
    schema: z.object({
        name: z.string(),
        // One-line intent, used for agent lookup / component listing.
        description: z.string(),
        // Tells consumers whether to trust generic GOV.UK guidance (`standard`)
        // or use the i.AI adaptation (`adapted`).
        status: status,
        // Optional link to the decision record explaining an adaptation.
        decisionRecord: z.string().optional(),
        // Code snippets per example, keyed by a stable id.
        examples: z.array(example).default([]),
    }),
});

// Design Decision Records (DDRs) — deferred content, schema ready.
const decisions = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/decisions" }),
    schema: z.object({
        number: z.number(),
        title: z.string(),
        status: z.enum(["proposal", "accepted", "superseded"]),
        dateProposed: z.string().optional(),
    }),
});

// Multi-component patterns — deferred content, schema ready.
const patterns = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/patterns" }),
    schema: z.object({
        name: z.string(),
        description: z.string(),
    }),
});

// Page-level layout guidance — deferred content, schema ready.
const layouts = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/layouts" }),
    schema: z.object({
        name: z.string(),
        description: z.string(),
    }),
});

// Guides — how-to documentation (e.g. getting started / project setup).
const guides = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/guides" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
    }),
});

export const collections = { components, decisions, patterns, layouts, guides };

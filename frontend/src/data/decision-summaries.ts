// The 10 top-level summary decisions that frame the detailed Design
// Decision Records. Each detailed record (in `src/content/decisions`) can
// reference one of these by number via its `parent` frontmatter field.
export const decisionSummaries = [
    {
        number: 1,
        text: "The I.AI brand is our corporate brand - we will not use it to brand the products we build.",
    },
    {
        number: 2,
        text: "We will use the GOV.UK Design System as the basis for all our product interfaces, extending it with the additional styles and components we need to build and brand them.",
    },
    {
        number: 3,
        text: "We will brand products that form part of a public service, or that are for use by public servants across the public sector, as GOV.UK.",
    },
    {
        number: 4,
        text: "We will brand products for use in a single department using that department's brand.",
    },
    {
        number: 5,
        text: "We will brand internal and experimental products using the departmental brand, with I.AI as the applied identity.",
    },
    {
        number: 6,
        text: "We will make it easy for products to swap themes and brand identities.",
    },
    {
        number: 7,
        text: "We will develop a flexible theme for our design system that can accommodate departmental branding.",
    },
    {
        number: 8,
        text: "We will publish guidance, code and tooling for our design system.",
    },
    {
        number: 9,
        text: "We will ensure our tooling is flexible enough to support a variety of workflows within I.AI.",
    },
    {
        number: 10,
        text: "We will design support and contribution models for our tooling that does not require a permanent team.",
    },
] as const;

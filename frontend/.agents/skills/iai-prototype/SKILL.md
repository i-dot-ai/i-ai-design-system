---
name: iai-prototype
description: Instructions on how to get the latest guidance and the expected output when prototyping products in i.AI
---

# i.AI Prototype

Before you start any job be sure to fetch the latest guidance to ensure that you are working from the latest advice.

## Content

The content for the i.AI design kit lives in markdown and example code files in the following folder

`https://github.com/i-dot-ai/i-ai-design-system/tree/main/frontend/src/content`

Pull the content from here before any job.

`content/get-started` page describes how to use the design kit.

## Output

You should output your prototypes in a single html file to be easily shared with other people.

This means you need to inline the govuk-frontend and the iai styles

The CDN links:
- govuk-frontend (jsDelivr, from npm):
https://cdn.jsdelivr.net/npm/govuk-frontend@6.5.0/dist/govuk/govuk-frontend.min.css
https://cdn.jsdelivr.net/npm/govuk-frontend@6.5.0/dist/govuk/govuk-frontend.min.js

- i.AI frontend (jsDelivr, from npm):
https://cdn.jsdelivr.net/npm/@i-dot-ai-npm/component-library-frontend@0.0.4/dist/i-ai-design-system.min.css
https://cdn.jsdelivr.net/npm/@i-dot-ai-npm/component-library-frontend@0.0.4/dist/i-ai-design-system.min.js

Implement like this in the head:

Used as <link> (order matters — i.AI after govuk):
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/govuk-frontend@6.5.0/dist/govuk/govuk-frontend.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@i-dot-ai-npm/component-library-frontend@0.0.4/dist/i-ai-design-system.min.css">

Use the plain html version of components.
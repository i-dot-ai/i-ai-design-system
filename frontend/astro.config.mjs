// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sentry from '@sentry/astro';
import mdx from '@astrojs/mdx';
import rehypeAddClasses from 'rehype-add-classes';
import tailwindcss from '@tailwindcss/vite';

const port = 4321;

/*
 * Inject GOV.UK / i.AI classes into HTML rendered from Markdown/MDX content
 * (src/content). Authors write plain Markdown; these classes make the output
 * match the hand-written govuk pages. Applies to both .md and .mdx.
 */
const govukClasses = {
  p: 'govuk-body',
  h2: 'govuk-heading-m',
  h3: 'govuk-heading-s',
  h4: 'govuk-heading-s',
  a: 'govuk-link',
  'ul,ol': 'govuk-list',
  table: 'govuk-table',
  thead: 'govuk-table__head',
  tbody: 'govuk-table__body',
  tr: 'govuk-table__row',
  th: 'govuk-table__header',
  td: 'govuk-table__cell',
};

// https://astro.build/config
export default defineConfig({
  server: { port: port, host: true },
  adapter: node({
    mode: 'standalone',
  }),
  output: 'static',
  markdown: {
    smartypants: false,
    rehypePlugins: [[rehypeAddClasses, govukClasses]],
  },
  integrations: [
    mdx(),
    // Uncomment if using Sentry
    /*
    sentry({
      environment: process.env.ENVIRONMENT,
      dsn: process.env.SENTRY_DSN?.replaceAll('"', ''),
      tracesSampleRate: 0,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 0,
      sourceMapsUploadOptions: {
        project: process.env.REPO',
        authToken: process.env.SENTRY_AUTH_TOKEN?.replaceAll('"', ''),
      },
    }),
    */
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

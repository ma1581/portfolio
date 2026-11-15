// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://portfolio-mohammed-anas.netlify.app',
  integrations: [sitemap()],
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
});

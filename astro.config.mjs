// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domínio oficial (usado em canonical, sitemap e Open Graph). A versão com www deve redirecionar (301) para cá.
const SITE_URL = 'https://ctechsmartsolutions.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/politica-de-privacidade'),
    }),
  ],
});

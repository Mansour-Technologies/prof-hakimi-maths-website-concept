// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mansour-technologies.github.io',
  base: '/prof-hakimi-maths-website-concept',
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
  vite: { build: { assetsInlineLimit: 0 } },
});

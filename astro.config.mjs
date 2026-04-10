import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: 'https://resume.rileyy.dev',
  output: 'server',
  adapter: cloudflare(),
  integrations: [svelte()],

  vite: {
    plugins: [tailwindcss()]
  }
});
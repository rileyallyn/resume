import svelte from "eslint-plugin-svelte";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import svelteparser from "svelte-eslint-parser";
import prettier from "eslint-config-prettier";

export default [
  {
    ignores: ["node_modules/", "dist/", ".astro/", ".wrangler/"]
  },
  {
    files: ["**/*.ts", "**/*.js", "**/*.svelte"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        extraFileExtensions: [".svelte"]
      }
    },
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
    }
  },
  ...svelte.configs["flat/recommended"],
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteparser,
      parserOptions: {
        parser: tsparser
      }
    }
  },
  prettier
];

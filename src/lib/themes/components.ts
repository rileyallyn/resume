// Maps theme keys to their Svelte renderer components. Imported only where the
// components actually render (e.g. index.astro), to keep Svelte out of API routes.
import type { ThemeKey } from "./registry";
import Classic from "./classic.svelte";
import Modern from "./modern.svelte";
import ModernTwoColumn from "./modern-two-column.svelte";

export const themeComponents: Record<ThemeKey, typeof Classic> = {
  classic: Classic,
  modern: Modern,
  "modern-two-column": ModernTwoColumn
};

// Theme metadata only. No Svelte component imports here so this module is safe
// to import from anywhere (API routes, editor UI) for validation and dropdowns.

export const DEFAULT_THEME = "classic";

export const themeMeta = {
  classic: {
    label: "Classic",
    description: "The original single-column layout"
  },
  modern: {
    label: "Modern",
    description: "Accent headings, roomier spacing"
  }
} as const;

export type ThemeKey = keyof typeof themeMeta;

export const themeOptions = Object.entries(themeMeta).map(([value, meta]) => ({
  value: value as ThemeKey,
  label: meta.label
}));

export function resolveTheme(key?: string | null): ThemeKey {
  return key && key in themeMeta ? (key as ThemeKey) : DEFAULT_THEME;
}

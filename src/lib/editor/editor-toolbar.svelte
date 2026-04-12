<script lang="ts">
  const { name, slug } = $props<{ name: string; slug: string }>();
</script>

<div
  class="sticky top-0 z-10 flex flex-col gap-4 border-b border-zinc-200/90 bg-white/90 px-5 py-4 backdrop-blur-md backdrop-saturate-150 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10 dark:border-zinc-800 dark:bg-zinc-900/90"
>
  <div class="min-w-0">
    <h2 class="text-balance text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
      {name}
    </h2>
    <p class="mt-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">/{slug}</p>
  </div>
  <div class="flex flex-wrap items-center gap-2 self-start">
    <a
      href={`/?branch=${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-800 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-900"
    >
      <span>Preview live</span>
      <svg class="h-3.5 w-3.5 text-zinc-400" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M2 10L10 2M10 2H4M10 2V8"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </a>
    <a
      href={`/?branch=${slug}&export=pdf`}
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-800 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-900"
      title="Opens the printable resume and your browser’s print dialog"
    >
      <span>Export PDF</span>
      <svg class="h-3.5 w-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m-1.29-2.91c-.66-.03-1.33-.06-2-.06-2.07 0-4.09.26-6 .76m6-12.48c-1.9.5-3.93.76-6 .76-2.07 0-4.09-.26-6-.76m12 12.48V6.75c0-1.036-.84-1.875-1.875-1.875h-8.25c-1.036 0-1.875.84-1.875 1.875v8.25c0 1.035.84 1.875 1.875 1.875Z"
        />
      </svg>
    </a>
  </div>
</div>

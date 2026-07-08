<script lang="ts">
  const {
    resume,
    isLoading = false,
    onSave
  } = $props<{
    resume: any;
    isLoading?: boolean;
    onSave: () => void;
  }>();
</script>

<article
  class="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-4 shadow-sm ring-1 ring-zinc-950/3 transition hover:border-zinc-300/90 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/40 dark:ring-white/4 dark:hover:border-zinc-700"
>
  <div class="space-y-4">
    <div class="flex items-center gap-3">
      <span
        class="h-px flex-1 bg-linear-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700"
        aria-hidden="true"
      ></span>
      <h3 class="shrink-0 text-sm font-semibold tracking-widest text-zinc-500 uppercase dark:text-zinc-400">Header</h3>
      <span
        class="h-px flex-1 bg-linear-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700"
        aria-hidden="true"
      ></span>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label
          class="mb-1 block text-[11px] font-semibold tracking-wide text-zinc-400 uppercase dark:text-zinc-500"
          for="header-full-name">Full name</label
        >
        <input
          id="header-full-name"
          bind:value={resume.full_name}
          class="w-full rounded-lg border border-transparent bg-white/80 px-2.5 py-2 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-zinc-950/5 transition placeholder:text-zinc-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-500/25 focus:outline-none dark:bg-zinc-900/80 dark:text-zinc-50 dark:ring-white/10 dark:focus:border-violet-600/50"
        />
      </div>

      <div>
        <label
          class="mb-1 block text-[11px] font-semibold tracking-wide text-zinc-400 uppercase dark:text-zinc-500"
          for="header-email">Email</label
        >
        <input
          id="header-email"
          type="email"
          bind:value={resume.email}
          class="w-full rounded-lg border border-transparent bg-white/80 px-2.5 py-2 text-sm text-zinc-700 shadow-sm ring-1 ring-zinc-950/5 transition focus:border-violet-300 focus:ring-2 focus:ring-violet-500/25 focus:outline-none dark:bg-zinc-900/80 dark:text-zinc-300 dark:ring-white/10"
        />
      </div>

      <div>
        <label
          class="mb-1 block text-[11px] font-semibold tracking-wide text-zinc-400 uppercase dark:text-zinc-500"
          for="header-website">Website</label
        >
        <input
          id="header-website"
          type="url"
          bind:value={resume.website_url}
          class="w-full rounded-lg border border-transparent bg-white/80 px-2.5 py-2 text-sm text-zinc-700 shadow-sm ring-1 ring-zinc-950/5 transition focus:border-violet-300 focus:ring-2 focus:ring-violet-500/25 focus:outline-none dark:bg-zinc-900/80 dark:text-zinc-300 dark:ring-white/10"
        />
      </div>

      <div>
        <label
          class="mb-1 block text-[11px] font-semibold tracking-wide text-zinc-400 uppercase dark:text-zinc-500"
          for="header-location">Location</label
        >
        <input
          id="header-location"
          bind:value={resume.location}
          class="w-full rounded-lg border border-transparent bg-white/80 px-2.5 py-2 text-sm text-zinc-700 shadow-sm ring-1 ring-zinc-950/5 transition focus:border-violet-300 focus:ring-2 focus:ring-violet-500/25 focus:outline-none dark:bg-zinc-900/80 dark:text-zinc-300 dark:ring-white/10"
        />
      </div>
    </div>

    <div>
      <label
        class="mb-1 block text-[11px] font-semibold tracking-wide text-zinc-400 uppercase dark:text-zinc-500"
        for="header-summary">Summary</label
      >
      <textarea
        id="header-summary"
        bind:value={resume.summary}
        rows="3"
        class="min-h-18 w-full resize-y rounded-xl border border-zinc-200/90 bg-white px-3 py-2.5 text-sm leading-relaxed text-zinc-800 shadow-inner shadow-zinc-950/4 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/25 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950/50 dark:text-zinc-200"
      ></textarea>
    </div>

    <div class="flex justify-end border-t border-zinc-200/70 pt-4 dark:border-zinc-800">
      <button
        type="button"
        onclick={onSave}
        class="rounded-xl bg-linear-to-b from-zinc-900 to-zinc-950 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-zinc-900/20 transition hover:from-zinc-800 hover:to-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 focus-visible:outline-none disabled:opacity-50 dark:from-zinc-100 dark:to-zinc-200 dark:text-zinc-900 dark:shadow-zinc-950/40 dark:hover:from-white dark:hover:to-zinc-100 dark:focus-visible:ring-zinc-300/50 dark:focus-visible:ring-offset-zinc-950"
        disabled={isLoading}
      >
        {isLoading ? "Saving…" : "Save changes"}
      </button>
    </div>
  </div>
</article>

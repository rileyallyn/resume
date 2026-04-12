<script lang="ts">
  const {
    item,
    isLoading = false,
    onTailor,
    onSave,
    onToggleVisibility
  } = $props<{
    item: any;
    isLoading?: boolean;
    onTailor: (bulletIndex: number) => void;
    onSave: () => void;
    onToggleVisibility: () => void;
  }>();
</script>

<article
  class="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-4 shadow-sm ring-1 ring-zinc-950/3 transition hover:border-zinc-300/90 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/40 dark:ring-white/4 dark:hover:border-zinc-700 {item.is_hidden ? 'opacity-60' : ''}"
>
  <div class="space-y-4">
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1">
        <label class="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500" for="title-{item.id}">Title</label>
        <input
          id="title-{item.id}"
          bind:value={item.title}
          class="w-full rounded-lg border border-transparent bg-white/80 px-2.5 py-2 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-zinc-950/5 transition placeholder:text-zinc-400 focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500/25 dark:bg-zinc-900/80 dark:text-zinc-50 dark:ring-white/10 dark:focus:border-violet-600/50"
        />
      </div>
      <button
        type="button"
        onclick={onToggleVisibility}
        class="mt-6 rounded-md p-1.5 text-zinc-400 hover:bg-white hover:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:text-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
        title={item.is_hidden ? "Show item" : "Hide item"}
        disabled={isLoading}
      >
        {#if item.is_hidden}
          <svg class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
        {:else}
          <svg class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        {/if}
      </button>
    </div>

    {#if item.subtitle !== undefined}
      <div>
        <label class="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500" for="subtitle-{item.id}">Subtitle / organization</label>
        <input
          id="subtitle-{item.id}"
          bind:value={item.subtitle}
          class="w-full rounded-lg border border-transparent bg-white/80 px-2.5 py-2 text-sm text-zinc-700 shadow-sm ring-1 ring-zinc-950/5 transition focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500/25 dark:bg-zinc-900/80 dark:text-zinc-300 dark:ring-white/10"
        />
      </div>
    {/if}

    <div>
      <label class="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500" for="dates-{item.id}">Date range</label>
      <input
        id="dates-{item.id}"
        bind:value={item.date_range}
        class="w-full rounded-lg border border-transparent bg-white/80 px-2.5 py-2 font-mono text-xs text-zinc-600 shadow-sm ring-1 ring-zinc-950/5 transition focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500/25 dark:bg-zinc-900/80 dark:text-zinc-400 dark:ring-white/10"
      />
    </div>

    <div class="space-y-3">
      <span class="block text-[11px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">Bullet points</span>
      <ul class="space-y-3" role="list">
        {#each item.content as bullet, i (i)}
          <li class="flex flex-col gap-2 sm:flex-row sm:items-stretch">
            <textarea
              bind:value={item.content[i]}
              class="min-h-18 flex-1 resize-y rounded-xl border border-zinc-200/90 bg-white px-3 py-2.5 text-sm leading-relaxed text-zinc-800 shadow-inner shadow-zinc-950/4 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/25 dark:border-zinc-700 dark:bg-zinc-950/50 dark:text-zinc-200"
              rows="2"
            ></textarea>
            <div class="flex shrink-0 flex-row gap-2 sm:w-28 sm:flex-col">
              <button
                type="button"
                onclick={() => onTailor(i)}
                class="flex-1 rounded-lg bg-violet-600 px-2 py-2 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 disabled:opacity-50 dark:focus-visible:ring-offset-zinc-950 sm:flex-none"
                disabled={isLoading}
              >
                Tailor
              </button>
              <button
                type="button"
                onclick={() => {
                  item.content = item.content.filter((_: string, idx: number) => idx !== i);
                }}
                class="flex-1 rounded-lg border border-red-200 bg-red-50 px-2 py-2 text-[10px] font-bold uppercase tracking-wide text-red-700 transition hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/60 dark:focus-visible:ring-offset-zinc-950 sm:flex-none"
              >
                Remove
              </button>
            </div>
          </li>
        {/each}
      </ul>
      <button
        type="button"
        onclick={() => (item.content = [...item.content, "New bullet point"])}
        class="text-xs font-semibold text-violet-700 underline-offset-4 transition hover:text-violet-600 hover:underline dark:text-violet-300 dark:hover:text-violet-200"
      >
        + Add bullet
      </button>
    </div>

    <div class="flex justify-end border-t border-zinc-200/70 pt-4 dark:border-zinc-800">
      <button
        type="button"
        onclick={onSave}
        class="rounded-xl bg-linear-to-b from-zinc-900 to-zinc-950 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-zinc-900/20 transition hover:from-zinc-800 hover:to-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 disabled:opacity-50 dark:from-zinc-100 dark:to-zinc-200 dark:text-zinc-900 dark:shadow-zinc-950/40 dark:hover:from-white dark:hover:to-zinc-100 dark:focus-visible:ring-zinc-300/50 dark:focus-visible:ring-offset-zinc-950"
        disabled={isLoading}
      >
        {isLoading ? "Saving…" : "Save changes"}
      </button>
    </div>
  </div>
</article>

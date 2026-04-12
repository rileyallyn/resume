<script lang="ts">
  const {
    resumes,
    selectedResumeId,
    disabled = false,
    onSelect,
    onBranch
  } = $props<{
    resumes: any[];
    selectedResumeId: string | number | null | undefined;
    disabled?: boolean;
    onSelect: (resume: any) => void;
    onBranch: (resume: any) => void;
  }>();
</script>

<aside
  class="flex max-h-52 min-h-0 w-full shrink-0 flex-col border-b border-zinc-200/90 bg-zinc-100/95 dark:border-zinc-800 dark:bg-zinc-900/95 md:h-full md:max-h-none md:w-52 md:border-r md:border-b-0"
  aria-label="Resume explorer"
>
  <div class="shrink-0 border-b border-zinc-200/80 px-3 py-2 dark:border-zinc-800">
    <p class="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Explorer</p>
    <p class="mt-0.5 text-xs font-medium text-zinc-800 dark:text-zinc-200">Resumes</p>
    <p class="text-[10px] text-zinc-500 dark:text-zinc-500">{resumes?.length ?? 0} open in workspace</p>
  </div>
  <ul class="min-h-0 flex-1 space-y-0.5 overflow-y-auto p-1.5" role="list">
    {#each resumes as resume}
      <li>
        <div
          class="flex min-w-0 items-stretch gap-0.5 rounded-md border border-transparent transition-colors {selectedResumeId === resume.id
            ? 'border-violet-500/35 bg-violet-500/10 dark:border-violet-500/25 dark:bg-violet-500/15'
            : 'hover:border-zinc-200/80 hover:bg-white/70 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/60'}"
        >
          <button
            type="button"
            onclick={() => onSelect(resume)}
            class="min-w-0 flex-1 truncate rounded-l px-2 py-2 text-left text-xs font-medium text-zinc-800 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500/50 disabled:opacity-50 dark:text-zinc-200 dark:hover:text-white"
            disabled={disabled}
            title="Open resume"
          >
            <span class="flex min-w-0 items-center gap-1.5">
              <svg class="h-3.5 w-3.5 shrink-0 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25a3.375 3.375 0 0 0-3.375 3.375V19.5A2.25 2.25 0 0 0 7.125 21.75h9.75a2.25 2.25 0 0 0 2.25-2.25v-5.25Z" />
              </svg>
              <span class="min-w-0 truncate">{resume.name}</span>
              {#if resume.is_base}
                <span class="shrink-0 rounded px-1 py-px text-[9px] font-bold uppercase tracking-wide text-violet-700 dark:text-violet-300">
                  base
                </span>
              {/if}
            </span>
          </button>
          <button
            type="button"
            onclick={() => onBranch(resume)}
            class="flex shrink-0 items-center justify-center rounded-r border-l border-zinc-200/80 px-2 text-zinc-500 transition hover:bg-white/80 hover:text-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500/40 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800/80 dark:hover:text-violet-400"
            disabled={disabled}
            title="Branch from this resume"
            aria-label="Branch from {resume.name}"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 5.314 9.566 5.314m0-10.628L16.783 3.28m0 17.44-9.566-5.314"
              />
            </svg>
          </button>
        </div>
      </li>
    {/each}
  </ul>
</aside>

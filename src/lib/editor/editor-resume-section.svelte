<script lang="ts">
  import EditorResumeItem from "./editor-resume-item.svelte";

  const { section, isLoading, onTailor, onSave, onToggleVisibility, onAddItem, onToggleItemVisibility } = $props<{
    section: any;
    isLoading: boolean;
    onTailor: (item: any, bulletIndex: number) => void;
    onSave: (item: any) => void;
    onToggleVisibility: (section: any) => void;
    onAddItem: (section: any) => void;
    onToggleItemVisibility: (item: any) => void;
  }>();
</script>

<section class="scroll-mt-24 {section.is_hidden ? 'opacity-60' : ''}">
  <div class="mb-5 flex items-center gap-3">
    <span class="h-px flex-1 bg-linear-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700" aria-hidden="true"></span>
    <div class="flex items-center gap-2">
      <h3 class="shrink-0 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        {section.title}
      </h3>
      <button
        onclick={() => onToggleVisibility(section)}
        class="rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
        title={section.is_hidden ? "Show section" : "Hide section"}
        disabled={isLoading}
      >
        {#if section.is_hidden}
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
        {:else}
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        {/if}
      </button>
    </div>
    <span class="h-px flex-1 bg-linear-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700" aria-hidden="true"></span>
  </div>

  <div class="space-y-5">
    {#each section.items as item (item.id)}
      <EditorResumeItem
        {item}
        {isLoading}
        onTailor={(i) => onTailor(item, i)}
        onSave={() => onSave(item)}
        onToggleVisibility={() => onToggleItemVisibility(item)}
      />
    {/each}

    {#if section.title === 'Education' || section.title === 'Experience'}
      <button
        type="button"
        onclick={() => onAddItem(section)}
        class="group flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-200 p-4 transition hover:border-violet-300 hover:bg-violet-50/50 dark:border-zinc-800 dark:hover:border-violet-500/30 dark:hover:bg-violet-500/5"
        disabled={isLoading}
      >
        <svg class="h-4 w-4 text-zinc-400 transition-colors group-hover:text-violet-500 dark:text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span class="text-xs font-bold uppercase tracking-wider text-zinc-500 transition-colors group-hover:text-violet-600 dark:text-zinc-400 dark:group-hover:text-violet-400">Add {section.title} item</span>
      </button>
    {/if}
  </div>
</section>

<script lang="ts">
  let { jobDescription = $bindable(""), selectedProvider = $bindable("google/gemini-3.5-flash") } = $props();

  // hardcoded available models for now
  const availableModels = [
    { id: "google/gemini-3.5-flash", name: "Gemini 3.5 Flash" },
    { id: "google/gemini-3.1-flash-lite", name: "Gemini 3.1 Flash Lite" },
    { id: "openai/gpt-5.6-sol", name: "GPT-5.6 Sol" },
    { id: "openai/gpt-5.6-luna", name: "GPT-5.6 Luna" },
    { id: "openai/gpt-5.6-terra", name: "GPT-5.6 Terra" },
    { id: "openai/gpt-5.5", name: "GPT-5.5" },
    { id: "anthropic/claude-fable-5", name: "Claude Fable 5" },
    { id: "anthropic/claude-sonnet-5", name: "Claude Sonnet 5" },
    { id: "anthropic/claude-opus-4.8", name: "Claude Opus 4.8" },
    { id: "openrouter/auto", name: "Auto" }
  ];
</script>

<section
  class="relative overflow-hidden rounded-2xl border border-violet-200/70 bg-linear-to-br from-violet-50/90 via-white to-fuchsia-50/40 p-5 shadow-sm ring-1 ring-violet-500/10 dark:border-violet-500/20 dark:from-violet-950/40 dark:via-zinc-900 dark:to-fuchsia-950/20 dark:ring-violet-500/20"
  aria-labelledby="ai-context-heading"
>
  <div
    class="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-600/15"
    aria-hidden="true"
  ></div>
  <div class="relative">
    <h3
      id="ai-context-heading"
      class="text-xs font-semibold tracking-widest text-violet-900/90 uppercase dark:text-violet-200/90"
    >
      AI tailoring
    </h3>
    <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
      Paste a job description so bullet tailoring stays on-target.
    </p>

    <div class="mt-5 space-y-4">
      <div>
        <label for="job-desc" class="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400"
          >Target job description</label
        >
        <textarea
          id="job-desc"
          bind:value={jobDescription}
          placeholder="Paste the role summary, requirements, and keywords you want to mirror…"
          rows="4"
          class="w-full resize-y rounded-xl border border-zinc-200/90 bg-white/90 px-3 py-2.5 text-sm text-zinc-900 shadow-inner shadow-zinc-950/5 placeholder:text-zinc-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950/60 dark:text-zinc-100 dark:placeholder:text-zinc-500"
        ></textarea>
      </div>
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <label for="provider-select" class="text-xs font-medium text-zinc-600 dark:text-zinc-400">Model provider</label>
        <select
          id="provider-select"
          bind:value={selectedProvider}
          class="w-full max-w-xs rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-800 shadow-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 focus:outline-none sm:w-auto dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
        >
          {#each availableModels as model (model.id)}
            <option value={model.id}>{model.name}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
</section>

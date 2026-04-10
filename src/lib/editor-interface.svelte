<script lang="ts">
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
  } from "$lib/components/ui/alert-dialog/index.js";

  const { initialResumes } = $props<{ initialResumes: any[] }>();
  let resumes = $state(initialResumes);
  let selectedResume = $state<any>(null);
  let isLoading = $state(false);
  let jobDescription = $state("");
  let selectedProvider = $state("openai");

  let alertOpen = $state(false);
  let alertMessage = $state("");

  let tailorConfirmOpen = $state(false);
  let tailorSuggestionText = $state("");
  let tailorPending = $state<{ item: any; bulletIndex: number } | null>(null);

  let branchOpen = $state(false);
  let branchName = $state("");
  let branchSlug = $state("");
  let branchTarget = $state<any>(null);

  function showAlert(message: string) {
    alertMessage = message;
    alertOpen = true;
  }

  function openBranchDialog(resume: any) {
    branchTarget = resume;
    branchName = "";
    branchSlug = "";
    branchOpen = true;
  }

  async function submitBranchFromDialog() {
    const resume = branchTarget;
    if (!resume) return;
    const name = branchName.trim();
    const slug = branchSlug.trim();
    if (!name || !slug) {
      showAlert("Enter both a name and a slug for the new branch.");
      return;
    }

    branchOpen = false;
    branchTarget = null;
    isLoading = true;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);

    try {
      const res = await fetch(`/api/resumes/${resume.id}/branch`, {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        const newResume = await res.json();
        resumes = [newResume, ...resumes];
      } else {
        showAlert(await res.text());
      }
    } finally {
      isLoading = false;
    }
  }

  function cancelBranchDialog() {
    branchOpen = false;
    branchTarget = null;
  }

  function applyTailorSuggestion() {
    const pending = tailorPending;
    if (!pending) return;
    pending.item.content[pending.bulletIndex] = tailorSuggestionText;
    tailorPending = null;
    tailorConfirmOpen = false;
    void saveItem(pending.item);
  }

  function cancelTailorConfirm() {
    tailorConfirmOpen = false;
    tailorPending = null;
  }

  async function selectResume(resume: any) {
    isLoading = true;
    try {
      const res = await fetch(`/api/resumes/${resume.id}`);
      if (res.ok) {
        selectedResume = await res.json();
      }
    } finally {
      isLoading = false;
    }
  }

  async function tailorItem(item: any, bulletIndex: number) {
    if (!jobDescription) {
      showAlert("Please paste a target job description first.");
      return;
    }

    isLoading = true;
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({
          content: item.content[bulletIndex],
          jobDescription,
          provider: selectedProvider
        })
      });

      if (res.ok) {
        const { text } = await res.json();
        tailorSuggestionText = text;
        tailorPending = { item, bulletIndex };
        tailorConfirmOpen = true;
      } else {
        showAlert(await res.text());
      }
    } finally {
      isLoading = false;
    }
  }

  async function saveItem(item: any) {
    isLoading = true;
    try {
      const { title, subtitle, date_range, content } = item;
      const res = await fetch(`/api/resumes/items/${item.id}`, {
        method: "POST",
        body: JSON.stringify({ title, subtitle, date_range, content })
      });
      if (!res.ok) {
        showAlert("Failed to save item: " + (await res.text()));
      }
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="flex min-h-0 w-full flex-1 flex-col">
  <div class="relative flex min-h-0 flex-1 flex-col md:flex-row">
    {#if isLoading}
      <div
        class="pointer-events-none absolute inset-0 z-20 bg-zinc-100/50 backdrop-blur-[1px] dark:bg-zinc-950/40"
        aria-hidden="true"
      ></div>
    {/if}

    <!-- Docked explorer (code-editor style) -->
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
              class="flex min-w-0 items-stretch gap-0.5 rounded-md border border-transparent transition-colors {selectedResume?.id === resume.id
                ? 'border-violet-500/35 bg-violet-500/10 dark:border-violet-500/25 dark:bg-violet-500/15'
                : 'hover:border-zinc-200/80 hover:bg-white/70 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/60'}"
            >
              <button
                type="button"
                onclick={() => selectResume(resume)}
                class="min-w-0 flex-1 truncate rounded-l px-2 py-2 text-left text-xs font-medium text-zinc-800 transition hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500/50 disabled:opacity-50 dark:text-zinc-200 dark:hover:text-white"
                disabled={isLoading}
                title="Open resume"
              >
                <span class="flex min-w-0 items-center gap-1.5">
                  <svg class="h-3.5 w-3.5 shrink-0 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25a3.375 3.375 0 0 0-3.375 3.375V19.5A2.25 2.25 0 0 0 7.125 21.75h9.75a2.25 2.25 0 0 0 2.25-2.25v-5.25Z" />
                  </svg>
                  <span class="min-w-0 truncate">{resume.name}</span>
                  {#if resume.is_base}
                    <span
                      class="shrink-0 rounded px-1 py-px text-[9px] font-bold uppercase tracking-wide text-violet-700 dark:text-violet-300"
                    >
                      base
                    </span>
                  {/if}
                </span>
              </button>
              <button
                type="button"
                onclick={() => openBranchDialog(resume)}
                class="flex shrink-0 items-center justify-center rounded-r border-l border-zinc-200/80 px-2 text-zinc-500 transition hover:bg-white/80 hover:text-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500/40 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800/80 dark:hover:text-violet-400"
                disabled={isLoading}
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

    <!-- Main editor pane -->
    <div class="min-h-0 min-w-0 flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950">
    {#if selectedResume}
      <div class="min-h-full {isLoading ? 'opacity-90' : ''}">
        <div
          class="sticky top-0 z-10 flex flex-col gap-4 border-b border-zinc-200/90 bg-white/90 px-5 py-4 backdrop-blur-md backdrop-saturate-150 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10 dark:border-zinc-800 dark:bg-zinc-900/90"
        >
          <div class="min-w-0">
            <h2 class="text-balance text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
              {selectedResume.name}
            </h2>
            <p class="mt-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">/{selectedResume.slug}</p>
          </div>
          <a
            href={`/?branch=${selectedResume.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-800 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-900"
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
        </div>

        <div class="space-y-8 px-5 py-6 sm:px-8 sm:py-8 lg:px-10 xl:px-12">
          <section
            class="relative overflow-hidden rounded-2xl border border-violet-200/70 bg-linear-to-br from-violet-50/90 via-white to-fuchsia-50/40 p-5 shadow-sm ring-1 ring-violet-500/10 dark:border-violet-500/20 dark:from-violet-950/40 dark:via-zinc-900 dark:to-fuchsia-950/20 dark:ring-violet-500/20"
            aria-labelledby="ai-context-heading"
          >
            <div class="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-600/15" aria-hidden="true"></div>
            <div class="relative">
              <h3 id="ai-context-heading" class="text-xs font-semibold uppercase tracking-widest text-violet-900/90 dark:text-violet-200/90">
                AI tailoring
              </h3>
              <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Paste a job description so bullet tailoring stays on-target.
              </p>

              <div class="mt-5 space-y-4">
                <div>
                  <label for="job-desc" class="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">Target job description</label>
                  <textarea
                    id="job-desc"
                    bind:value={jobDescription}
                    placeholder="Paste the role summary, requirements, and keywords you want to mirror…"
                    rows="4"
                    class="w-full resize-y rounded-xl border border-zinc-200/90 bg-white/90 px-3 py-2.5 text-sm text-zinc-900 shadow-inner shadow-zinc-950/5 placeholder:text-zinc-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 dark:border-zinc-700 dark:bg-zinc-950/60 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                  ></textarea>
                </div>
                <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <label for="provider-select" class="text-xs font-medium text-zinc-600 dark:text-zinc-400">Model provider</label>
                  <select
                    id="provider-select"
                    bind:value={selectedProvider}
                    class="w-full max-w-xs rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-800 shadow-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 sm:w-auto"
                  >
                    <option value="openai">OpenAI (GPT-4o)</option>
                    <option value="anthropic">Anthropic (Claude 3.5 Sonnet)</option>
                    <option value="google">Google (Gemini 1.5 Pro)</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <div class="space-y-10">
            {#each selectedResume.sections as section}
              <section class="scroll-mt-24">
                <div class="mb-5 flex items-center gap-3">
                  <span class="h-px flex-1 bg-linear-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700" aria-hidden="true"></span>
                  <h3 class="shrink-0 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    {section.title}
                  </h3>
                  <span class="h-px flex-1 bg-linear-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700" aria-hidden="true"></span>
                </div>

                <div class="space-y-5">
                  {#each section.items as item}
                    <article
                      class="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-4 shadow-sm ring-1 ring-zinc-950/3 transition hover:border-zinc-300/90 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/40 dark:ring-white/4 dark:hover:border-zinc-700"
                    >
                      <div class="space-y-4">
                        <div>
                          <label class="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500" for="title-{item.id}">Title</label>
                          <input
                            id="title-{item.id}"
                            bind:value={item.title}
                            class="w-full rounded-lg border border-transparent bg-white/80 px-2.5 py-2 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-zinc-950/5 transition placeholder:text-zinc-400 focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500/25 dark:bg-zinc-900/80 dark:text-zinc-50 dark:ring-white/10 dark:focus:border-violet-600/50"
                          />
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
                                    onclick={() => tailorItem(item, i)}
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
                            onclick={() => saveItem(item)}
                            class="rounded-xl bg-linear-to-b from-zinc-900 to-zinc-950 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-zinc-900/20 transition hover:from-zinc-800 hover:to-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 disabled:opacity-50 dark:from-zinc-100 dark:to-zinc-200 dark:text-zinc-900 dark:shadow-zinc-950/40 dark:hover:from-white dark:hover:to-zinc-100 dark:focus-visible:ring-zinc-300/50 dark:focus-visible:ring-offset-zinc-950"
                            disabled={isLoading}
                          >
                            {isLoading ? "Saving…" : "Save changes"}
                          </button>
                        </div>
                      </div>
                    </article>
                  {/each}
                </div>
              </section>
            {/each}
          </div>
        </div>
      </div>
    {:else}
      <div
        class="flex min-h-[min(24rem,calc(100dvh-14rem))] flex-col items-center justify-center gap-4 border-b border-dashed border-zinc-300/80 bg-zinc-50/80 px-6 py-12 text-center dark:border-zinc-800 dark:bg-zinc-950/50 md:min-h-[calc(100dvh-3.5rem)]"
        role="status"
      >
        <div
          class="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500/15 to-indigo-500/10 text-violet-600 dark:from-violet-500/20 dark:to-indigo-500/15 dark:text-violet-300"
          aria-hidden="true"
        >
          <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
        </div>
        <div>
          <p class="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Choose a resume to edit</p>
          <p class="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
            Pick one from the sidebar. You can branch from a base version anytime.
          </p>
        </div>
      </div>
    {/if}
    </div>
  </div>

  <!-- Simple message -->
  <AlertDialog bind:open={alertOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Notice</AlertDialogTitle>
        <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction class="w-full sm:w-auto" onclick={() => (alertOpen = false)}>OK</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  <!-- Apply AI suggestion -->
  <AlertDialog bind:open={tailorConfirmOpen}>
    <AlertDialogContent class="max-w-md sm:max-w-lg">
      <AlertDialogHeader>
        <AlertDialogTitle>Apply AI suggestion?</AlertDialogTitle>
        <AlertDialogDescription class="text-left">
          This will replace the bullet with the text below and save the item.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <blockquote
        class="max-h-48 overflow-y-auto rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200"
      >
        {tailorSuggestionText}
      </blockquote>
      <AlertDialogFooter>
        <AlertDialogCancel onclick={cancelTailorConfirm}>Cancel</AlertDialogCancel>
        <AlertDialogAction onclick={applyTailorSuggestion}>Apply and save</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  <!-- New branch -->
  <AlertDialog bind:open={branchOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>New branch</AlertDialogTitle>
        <AlertDialogDescription>
          Create a copy of <span class="font-medium text-foreground">{branchTarget?.name ?? "this resume"}</span> with a new name and URL slug.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div class="grid gap-3 py-1">
        <div class="grid gap-1.5">
          <label class="text-left text-xs font-medium text-zinc-600 dark:text-zinc-400" for="branch-dialog-name">Name</label>
          <input
            id="branch-dialog-name"
            bind:value={branchName}
            placeholder="e.g. Google SE"
            class="w-full rounded-md border border-zinc-200 bg-white px-2.5 py-2 text-sm text-zinc-900 shadow-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/25 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          />
        </div>
        <div class="grid gap-1.5">
          <label class="text-left text-xs font-medium text-zinc-600 dark:text-zinc-400" for="branch-dialog-slug">Slug</label>
          <input
            id="branch-dialog-slug"
            bind:value={branchSlug}
            placeholder="e.g. google-se"
            class="w-full rounded-md border border-zinc-200 bg-white px-2.5 py-2 font-mono text-sm text-zinc-900 shadow-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/25 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          />
        </div>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel onclick={cancelBranchDialog}>Cancel</AlertDialogCancel>
        <AlertDialogAction onclick={submitBranchFromDialog}>Create branch</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</div>

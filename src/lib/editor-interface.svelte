<script lang="ts">
  import { untrack } from "svelte";
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
  } from "$lib/components/ui/alert-dialog";
  import {
    EditorAiPanel,
    EditorEmptyState,
    EditorResumeExplorer,
    EditorResumeSection,
    EditorToolbar
  } from "$lib/editor";

  const { initialResumes } = $props<{ initialResumes: any[] }>();
  let resumes = $state(untrack(() => [...(initialResumes ?? [])]));
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

  async function toggleSectionVisibility(section: any) {
    isLoading = true;
    const newHiddenState = !section.is_hidden;
    try {
      const res = await fetch(`/api/resumes/sections/${section.id}`, {
        method: "POST",
        body: JSON.stringify({ is_hidden: newHiddenState })
      });
      if (res.ok) {
        section.is_hidden = newHiddenState;
      } else {
        showAlert("Failed to update section: " + (await res.text()));
      }
    } finally {
      isLoading = false;
    }
  }

  async function addItem(section: any) {
    isLoading = true;
    const maxOrder = section.items.reduce((max: number, item: any) => Math.max(max, item.display_order), -1);
    try {
      const res = await fetch("/api/resumes/items", {
        method: "POST",
        body: JSON.stringify({ section_id: section.id, display_order: maxOrder + 1 })
      });
      if (res.ok) {
        const newItem = await res.json();
        section.items = [...section.items, newItem];
      } else {
        showAlert("Failed to add item: " + (await res.text()));
      }
    } finally {
      isLoading = false;
    }
  }

  async function toggleItemVisibility(item: any) {
    isLoading = true;
    const newHiddenState = !item.is_hidden;
    try {
      const res = await fetch(`/api/resumes/items/${item.id}`, {
        method: "POST",
        body: JSON.stringify({ is_hidden: newHiddenState })
      });
      if (res.ok) {
        item.is_hidden = newHiddenState;
      } else {
        showAlert("Failed to update item: " + (await res.text()));
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

    <EditorResumeExplorer
      {resumes}
      selectedResumeId={selectedResume?.id}
      disabled={isLoading}
      onSelect={selectResume}
      onBranch={openBranchDialog}
    />

    <div class="min-h-0 min-w-0 flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-950">
      {#if selectedResume}
        <div class="min-h-full {isLoading ? 'opacity-90' : ''}">
          <EditorToolbar name={selectedResume.name} slug={selectedResume.slug} />

          <div class="space-y-8 px-5 py-6 sm:px-8 sm:py-8 lg:px-10 xl:px-12">
            <EditorAiPanel bind:jobDescription bind:selectedProvider />

            <div class="space-y-10">
              {#each selectedResume.sections as section}
                <EditorResumeSection
                  {section}
                  isLoading={isLoading}
                  onTailor={tailorItem}
                  onSave={saveItem}
                  onToggleVisibility={toggleSectionVisibility}
                  onAddItem={addItem}
                  onToggleItemVisibility={toggleItemVisibility}
                />
              {/each}
            </div>
          </div>
        </div>
      {:else}
        <EditorEmptyState />
      {/if}
    </div>
  </div>

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

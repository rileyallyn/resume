<script lang="ts">
  import { onMount } from "svelte";
  import type { Action } from "svelte/action";
  import { supabase } from "./supabase";

  const { user } = $props<{ user: any }>();
  let authed = $state(!!user);

  /** Move this node to `document.body` so `position: fixed` is viewport-relative (Astro islands can create stacking contexts). */
  const portal: Action<HTMLElement> = (node) => {
    document.body.append(node);
    return {
      destroy() {
        node.remove();
      }
    };
  };

  function exportPdf() {
    window.print();
  }

  function setResumeToolbarSpacer(active: boolean) {
    if (typeof document === "undefined") return;
    if (active) {
      document.documentElement.style.setProperty("--resume-export-toolbar", "3.75rem");
    } else {
      document.documentElement.style.removeProperty("--resume-export-toolbar");
    }
  }

  onMount(() => {
    // Set initial spacer if user is passed from server
    if (user) {
      setResumeToolbarSpacer(true);
    }

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("session change", session);
      authed = !!session;
      setResumeToolbarSpacer(!!session);
    });

    void supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("initial session check", session);
      // Only override if we don't have a user prop or if the session is different
      if (!user || (session && session.user.id !== user.id) || (!session && user)) {
        authed = !!session;
        setResumeToolbarSpacer(!!session);
      }

      const params = new URLSearchParams(window.location.search);
      if (params.get("export") === "pdf" && (session || user)) {
        params.delete("export");
        const qs = params.toString();
        const next = `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`;
        window.history.replaceState({}, "", next);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.print();
          });
        });
      }
    });

    return () => {
      subscription.unsubscribe();
      setResumeToolbarSpacer(false);
    };
  });
</script>

{#if authed}
  <div
    use:portal
    class="no-print pointer-events-none fixed inset-x-0 top-0 isolate z-[10000] pt-[env(safe-area-inset-top,0px)] print:hidden"
    role="toolbar"
    aria-label="Resume export"
  >
    <div
      class="pointer-events-auto flex w-full items-center justify-end gap-3 border-b border-zinc-200/90 bg-white/90 px-4 py-2.5 shadow-[0_4px_24px_rgb(0,0,0,0.08)] backdrop-blur-md sm:px-8 dark:border-zinc-700/90 dark:bg-zinc-950/90"
    >
      <button
        type="button"
        onclick={exportPdf}
        class="inline-flex shrink-0 items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:focus-visible:ring-offset-zinc-950"
      >
        <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m-1.29-2.91c-.66-.03-1.33-.06-2-.06-2.07 0-4.09.26-6 .76m6-12.48c-1.9.5-3.93.76-6 .76-2.07 0-4.09-.26-6-.76m12 12.48V6.75c0-1.036-.84-1.875-1.875-1.875h-8.25c-1.036 0-1.875.84-1.875 1.875v8.25c0 1.035.84 1.875 1.875 1.875Z"
          />
        </svg>
        Export PDF
      </button>
      <span class="hidden max-w-56 text-[10px] leading-snug text-zinc-500 sm:inline dark:text-zinc-400">
        Opens the print dialog — choose “Save as PDF”.
      </span>
    </div>
  </div>
{/if}

<script lang="ts">
  import { formatDateRange } from "./format-date-range";

  const { resume } = $props<{ resume: any }>();

  const sections = $derived((resume.sections ?? []).filter((s: any) => !s.is_hidden));
</script>

{#snippet heading(title: string)}
  <h2
    class="flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.18em] text-indigo-600 uppercase dark:text-indigo-400"
  >
    {title}
    <span class="h-px flex-1 bg-indigo-200 dark:bg-indigo-900"></span>
  </h2>
{/snippet}

<main class="container mx-auto flex h-full max-w-4xl flex-col gap-5 py-3 text-[0.875rem] leading-normal">
  <header class="flex flex-col gap-1">
    <h1 class="text-left font-sans text-4xl font-extrabold tracking-tight uppercase">
      {resume.full_name}
    </h1>
    <ol class="flex flex-col gap-x-1 text-left sm:flex-row sm:flex-wrap" id="comma-list">
      {#if resume.location}
        <li>{resume.location}</li>
      {/if}
      {#if resume.website_url}
        <li>
          <a href={resume.website_url}>{resume.website_url}</a>
        </li>
      {/if}
      {#if resume.email}
        <li>
          <a href={`mailto:${resume.email}`}>{resume.email}</a>
        </li>
      {/if}
    </ol>
    {#if resume.summary}
      <p class="text-gray-700 italic dark:text-gray-300">{resume.summary}</p>
    {/if}
  </header>

  {#each sections as section (section.id)}
    <section id={section.title.toLowerCase()} class="flex flex-col gap-2">
      {@render heading(section.title)}

      {#if section.title === "Skills"}
        <ol class="flex flex-col gap-2">
          {#each section.items.filter((i: any) => !i.is_hidden) as item (item.id)}
            <li class="flex flex-col gap-0.5 text-left sm:flex-row sm:gap-2">
              <h3 class="font-semibold whitespace-nowrap">{item.title}:</h3>
              <ul id="comma-list" class="flex list-none flex-row flex-wrap gap-x-1.5 text-gray-700 dark:text-gray-300">
                {#each item.content as skill (skill)}
                  <li>{skill}</li>
                {/each}
              </ul>
            </li>
          {/each}
        </ol>
      {:else if section.title === "Education"}
        <div class="flex flex-col gap-3 text-left">
          {#each section.items.filter((i: any) => !i.is_hidden) as item (item.id)}
            <div class="flex flex-col">
              <div class="flex flex-col font-semibold sm:flex-row sm:items-baseline sm:gap-2">
                {#if item.subtitle}<span>{item.subtitle}</span>{/if}
                {#if item.date_range}<span class="text-gray-500 dark:text-gray-400"
                    >{formatDateRange(item.date_range)}</span
                  >{/if}
              </div>
              {#if item.title}
                <p class="italic">{item.title}</p>
              {/if}
              {#if item.content && item.content.length > 0}
                <div class="mt-0.5">
                  <span class="font-semibold italic">Relevant Courses: </span>
                  <ul id="comma-list" class="inline">
                    {#each item.content as course (course)}
                      <li class="inline">{course}</li>
                    {/each}
                  </ul>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {:else if section.title === "Experience"}
        <div class="flex flex-col gap-4 text-left">
          {#each section.items.filter((i: any) => !i.is_hidden) as item (item.id)}
            <div class="flex break-inside-avoid flex-col" style="page-break-inside: avoid;">
              <div class="flex flex-col flex-wrap items-baseline gap-x-1 gap-y-0.5 sm:flex-row">
                <span class="font-semibold">
                  {#if item.title}{item.title}{/if}{#if item.title && item.subtitle}
                    &nbsp;&middot;&nbsp;
                  {/if}{#if item.subtitle}<span class="font-normal text-gray-700 dark:text-gray-300"
                      >{item.subtitle}</span
                    >{/if}
                </span>
                {#if item.date_range}<span class="text-gray-500 dark:text-gray-400"
                    >{#if item.title || item.subtitle}&nbsp;&middot;&nbsp;{/if}{formatDateRange(item.date_range)}</span
                  >{/if}
              </div>
              <ul class="mt-1 list-none space-y-1">
                {#each item.content as bullet (bullet)}
                  <li>• {bullet}</li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      {:else}
        <div class="flex flex-col gap-3 text-left">
          {#each section.items.filter((i: any) => !i.is_hidden) as item (item.id)}
            <div class="flex flex-col">
              <div class="flex flex-wrap items-baseline gap-x-1 gap-y-0.5 font-semibold">
                <span>{item.title || ""}</span>
                {#if item.date_range}<span class="text-gray-500 dark:text-gray-400"
                    >{#if item.title}&nbsp;&middot;&nbsp;{/if}{formatDateRange(item.date_range)}</span
                  >{/if}
              </div>
              {#if item.subtitle}
                <div class="italic">{item.subtitle}</div>
              {/if}
              <ul class="mt-1 list-none space-y-1">
                {#each item.content as bullet (bullet)}
                  <li>• {bullet}</li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      {/if}
    </section>
  {/each}
</main>

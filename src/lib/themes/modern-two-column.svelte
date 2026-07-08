<script lang="ts">
  const { resume } = $props<{ resume: any }>();

  const SIDEBAR_TITLES = ["Skills", "Education"];
  const sections = $derived((resume.sections ?? []).filter((s: any) => !s.is_hidden));
  const sidebarSections = $derived(sections.filter((s: any) => SIDEBAR_TITLES.includes(s.title)));
  const mainSections = $derived(sections.filter((s: any) => !SIDEBAR_TITLES.includes(s.title)));
</script>

{#snippet heading(title: string)}
  <h2
    class="flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.18em] text-indigo-600 uppercase dark:text-indigo-400"
  >
    {title}
    <span class="h-px flex-1 bg-indigo-200 dark:bg-indigo-900"></span>
  </h2>
{/snippet}

{#snippet sectionBlock(section: any)}
  <section id={section.title.toLowerCase()} class="flex flex-col gap-2">
    {@render heading(section.title)}

    {#if section.title === "Skills"}
      <ol class="flex flex-col gap-2">
        {#each section.items.filter((i: any) => !i.is_hidden) as item (item.id)}
          <li class="flex flex-col gap-0.5">
            <h3 class="font-semibold">{item.title}</h3>
            <ul id="comma-list" class="flex list-none flex-row flex-wrap gap-x-1.5 text-gray-700 dark:text-gray-300">
              {#each item.content as skill (skill)}
                <li>{skill}</li>
              {/each}
            </ul>
          </li>
        {/each}
      </ol>
    {:else if section.title === "Education"}
      <div class="flex flex-col gap-3">
        {#each section.items.filter((i: any) => !i.is_hidden) as item (item.id)}
          <div class="flex flex-col text-left">
            {#if item.subtitle}<span class="font-semibold">{item.subtitle}</span>{/if}
            {#if item.title}<span class="italic">{item.title}</span>{/if}
            {#if item.date_range}<span class="text-gray-500 dark:text-gray-400">{item.date_range}</span>{/if}
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
      <div class="flex flex-col gap-4">
        {#each section.items.filter((i: any) => !i.is_hidden) as item (item.id)}
          <div class="flex flex-col text-left">
            <div class="flex flex-col justify-between sm:flex-row sm:items-baseline">
              <span class="font-semibold">
                {#if item.title}{item.title}{/if}{#if item.title && item.subtitle}
                  &middot;
                {/if}{#if item.subtitle}<span class="font-normal text-gray-700 dark:text-gray-300">{item.subtitle}</span
                  >{/if}
              </span>
              {#if item.date_range}<span class="text-gray-500 dark:text-gray-400">{item.date_range}</span>{/if}
            </div>
            <ul class="mt-1 flex flex-col gap-1 pl-4">
              {#each item.content as bullet (bullet)}
                <li class="relative before:absolute before:-left-4 before:text-indigo-500 before:content-['\25AA']">
                  {bullet}
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    {:else}
      <div class="flex flex-col gap-3">
        {#each section.items.filter((i: any) => !i.is_hidden) as item (item.id)}
          <div class="flex flex-col text-left">
            <div class="flex justify-between font-semibold">
              <span>{item.title || ""}</span>
              <span class="text-gray-500 dark:text-gray-400">{item.date_range || ""}</span>
            </div>
            {#if item.subtitle}
              <div class="italic">{item.subtitle}</div>
            {/if}
            <ul class="mt-1 list-disc pl-5">
              {#each item.content as bullet (bullet)}
                <li>{bullet}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    {/if}
  </section>
{/snippet}

<main class="container mx-auto flex h-full max-w-4xl flex-col gap-5 py-3 text-[0.875rem] leading-normal">
  <header class="flex flex-col gap-1">
    <h1 class="text-left font-sans text-4xl font-extrabold tracking-tight uppercase">
      {resume.full_name}
    </h1>
    {#if resume.summary}
      <p class="text-gray-700 italic dark:text-gray-300">{resume.summary}</p>
    {/if}
  </header>

  <div class="flex flex-col gap-6 sm:flex-row sm:gap-8">
    <aside
      class="flex flex-col gap-5 sm:w-1/3 sm:shrink-0 sm:border-r sm:border-gray-200 sm:pr-7 dark:sm:border-gray-700"
    >
      <section class="flex flex-col gap-2">
        {@render heading("Contact")}
        <ul class="flex flex-col gap-1 break-words text-gray-700 dark:text-gray-300">
          {#if resume.location}<li>{resume.location}</li>{/if}
          {#if resume.website_url}
            <li><a href={resume.website_url}>{resume.website_url}</a></li>
          {/if}
          {#if resume.email}
            <li><a href={`mailto:${resume.email}`}>{resume.email}</a></li>
          {/if}
        </ul>
      </section>

      {#each sidebarSections as section (section.id)}
        {@render sectionBlock(section)}
      {/each}
    </aside>

    <div class="flex min-w-0 flex-1 flex-col gap-5">
      {#each mainSections as section (section.id)}
        {@render sectionBlock(section)}
      {/each}
    </div>
  </div>
</main>

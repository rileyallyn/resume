<script lang="ts">
  const { resume } = $props<{ resume: any }>();
</script>

<main class="container mx-auto flex h-full max-w-3xl flex-col gap-6 py-2">
  <header class="flex flex-col gap-2">
    <h1 class="text-left font-sans text-4xl font-extrabold tracking-tight uppercase">
      {resume.full_name}
    </h1>
    <ol class="flex flex-col gap-x-3 text-sm text-gray-600 sm:flex-row sm:flex-wrap dark:text-gray-300" id="dot-list">
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
      <p class="mt-1 text-left text-[0.95rem] leading-relaxed text-gray-700 italic dark:text-gray-300">
        {resume.summary}
      </p>
    {/if}
  </header>

  {#each resume.sections.filter((s: any) => !s.is_hidden) as section (section.id)}
    <section id={section.title.toLowerCase()} class="flex flex-col gap-3">
      <h2
        class="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase dark:text-indigo-400"
      >
        {section.title}
        <span class="h-px flex-1 bg-indigo-200 dark:bg-indigo-900"></span>
      </h2>

      {#if section.title === "Skills"}
        <ol class="flex flex-col gap-2">
          {#each section.items.filter((i: any) => !i.is_hidden) as item (item.id)}
            <li class="flex flex-col gap-1 sm:flex-row sm:gap-2">
              <h3 class="text-left font-semibold whitespace-nowrap">{item.title}:</h3>
              <ul id="comma-list" class="flex list-none flex-row flex-wrap gap-x-2 text-left">
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
              <div class="flex flex-col justify-between font-semibold sm:flex-row sm:items-baseline">
                {#if item.subtitle}<span>{item.subtitle}</span>{/if}
                {#if item.date_range}<span class="text-sm text-gray-500 dark:text-gray-400">{item.date_range}</span
                  >{/if}
              </div>
              {#if item.title}
                <p class="text-sm italic">{item.title}</p>
              {/if}
              {#if item.content && item.content.length > 0}
                <div class="mt-1">
                  <span class="text-sm font-semibold italic">Relevant Courses: </span>
                  <ul id="comma-list" class="inline flex-row flex-wrap gap-x-2 text-sm">
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
                  {/if}{#if item.subtitle}<span class="font-normal text-gray-700 dark:text-gray-300"
                      >{item.subtitle}</span
                    >{/if}
                </span>
                {#if item.date_range}<span class="text-sm text-gray-500 dark:text-gray-400">{item.date_range}</span
                  >{/if}
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
                <span class="text-sm text-gray-500 dark:text-gray-400">{item.date_range || ""}</span>
              </div>
              {#if item.subtitle}
                <div class="text-sm italic">{item.subtitle}</div>
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
  {/each}
</main>

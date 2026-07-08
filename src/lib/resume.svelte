<script lang="ts">
  import Section from "./section.svelte";

  const { resume } = $props<{ resume: any }>();
</script>

<main class="container mx-auto flex h-full max-w-4xl flex-col">
  <section id="heading" class="flex flex-col justify-center">
    <h1 class="title mx-auto p-1 text-center font-sans text-4xl font-bold">
      {resume.full_name}
    </h1>
    <div class="border-b-2 border-black dark:border-gray-500"></div>
    <ol class="mx-auto flex flex-col space-x-1 text-center sm:flex-row" id="pipe-list">
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
  </section>

  {#if resume.summary}
    <p class="mt-2 text-center">
      {resume.summary}
    </p>
  {/if}

  {#each resume.sections.filter((s) => !s.is_hidden) as section (section.id)}
    <Section id={section.title.toLowerCase()} title={section.title}>
      {#if section.title === "Skills"}
        <ol class="mt-2 flex flex-col gap-1">
          {#each section.items.filter((i) => !i.is_hidden) as item (item.id)}
            <li class="flex flex-col">
              <h3 class="text-md text-left font-bold">{item.title}:</h3>
              <ul
                id="comma-list"
                class="ml-5 flex list-disc flex-col pl-1 text-left sm:ml-0 sm:list-none sm:flex-row sm:space-x-1"
              >
                {#each item.content as skill (skill)}
                  <li>{skill}</li>
                {/each}
              </ul>
            </li>
          {/each}
        </ol>
      {:else if section.title === "Education"}
        {#each section.items.filter((i) => !i.is_hidden) as item (item.id)}
          <ol class="flex flex-col font-bold sm:flex-row sm:space-x-1">
            {#if item.subtitle}<li>{item.subtitle},</li>{/if}
            {#if item.date_range}<li>{item.date_range}</li>{/if}
          </ol>
          {#if item.title}
            <p class="text-md mt-1 text-left font-normal italic sm:mt-0">
              <span class="font-bold">{item.title}</span>
            </p>
          {/if}
          {#if item.content && item.content.length > 0}
            <div class="mt-1 text-left">
              <p class="font-bold italic">Relevant Courses:</p>
              <ul
                id="comma-list"
                class="ml-5 flex list-disc flex-col pl-1 text-left sm:ml-0 sm:list-none sm:flex-row sm:flex-wrap sm:space-x-1 sm:text-nowrap"
              >
                {#each item.content as course (course)}
                  <li class="">{course}</li>
                {/each}
              </ul>
            </div>
          {/if}
        {/each}
      {:else if section.title === "Experience"}
        <ol class="spacing-y-1 mt-1 flex flex-col text-left">
          {#each section.items.filter((i) => !i.is_hidden) as item (item.id)}
            <li>
              <ol class="inline-flex flex-row flex-wrap space-x-1 font-bold" id="pipe-list-bp">
                {#if item.title}<li>{item.title}</li>{/if}
                {#if item.subtitle}<li>{item.subtitle}</li>{/if}
                {#if item.date_range}<li>{item.date_range}</li>{/if}
              </ol>
              <ul class="p-1">
                {#each item.content as bullet (bullet)}
                  <li>
                    <p>- {bullet}</p>
                  </li>
                {/each}
              </ul>
            </li>
          {/each}
        </ol>
      {:else}
        <!-- Generic fallback for any other sections -->
        <ol class="mt-1 flex flex-col text-left">
          {#each section.items.filter((i) => !i.is_hidden) as item (item.id)}
            <li class="mb-2">
              <div class="flex justify-between font-bold">
                <span>{item.title || ""}</span>
                <span>{item.date_range || ""}</span>
              </div>
              {#if item.subtitle}
                <div class="italic">{item.subtitle}</div>
              {/if}
              <ul class="mt-1 list-disc pl-5">
                {#each item.content as bullet (bullet)}
                  <li>{bullet}</li>
                {/each}
              </ul>
            </li>
          {/each}
        </ol>
      {/if}
    </Section>
  {/each}
</main>

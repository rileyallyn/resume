<script lang="ts">
  import Section from "./section.svelte";
  
  const { resume } = $props<{ resume: any }>();
</script>

<main class="container flex flex-col h-full max-w-4xl mx-auto">
  <section id="heading" class="flex flex-col justify-center">
    <h1 class="p-1 mx-auto text-4xl font-bold text-center title font-sans">
      {resume.full_name}
    </h1>
    <div class="border-b-2 border-black dark:border-gray-500"></div>
    <ol
      class="flex flex-col mx-auto space-x-1 text-center sm:flex-row"
      id="pipe-list"
    >
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
    <p class="text-center mt-2">
      {resume.summary}
    </p>
  {/if}

  {#each resume.sections.filter(s => !s.is_hidden) as section (section.id)}
    <Section id={section.title.toLowerCase()} title={section.title}>
      {#if section.title === 'Skills'}
        <ol class="flex flex-col gap-1 mt-2">
          {#each section.items.filter(i => !i.is_hidden) as item (item.id)}
            <li class="flex flex-col">
              <h3 class="font-bold text-left text-md">{item.title}:</h3>
              <ul
                id="comma-list"
                class="flex flex-col pl-1 ml-5 text-left list-disc sm:list-none sm:space-x-1 sm:flex-row sm:ml-0"
              >
                {#each item.content as skill (skill)}
                  <li>{skill}</li>
                {/each}
              </ul>
            </li>
          {/each}
        </ol>
      {:else if section.title === 'Education'}
        {#each section.items.filter(i => !i.is_hidden) as item (item.id)}
          <ol class="flex flex-col font-bold sm:flex-row sm:space-x-1" id="pipe-list">
            {#if item.subtitle}<li>{item.subtitle}</li>{/if}
            {#if item.date_range}<li>{item.date_range}</li>{/if}
          </ol>
          {#if item.title}
            <p class="mt-1 italic font-normal text-left text-md sm:mt-0">
              <span class="font-bold">{item.title}</span>
            </p>
          {/if}
          {#if item.content && item.content.length > 0}
            <div class="mt-1 text-left">
              <p class="italic font-bold">Relevant Courses:</p>
              <ul
                id="comma-list"
                class="flex flex-col pl-1 ml-5 text-left list-disc sm:list-none sm:space-x-1 sm:flex-row sm:ml-0 sm:text-nowrap sm:flex-wrap"
              >
                {#each item.content as course (course)}
                  <li class="">{course}</li>
                {/each}
              </ul>
            </div>
          {/if}
        {/each}
      {:else if section.title === 'Experience'}
        <ol class="flex flex-col mt-1 text-left spacing-y-1">
          {#each section.items.filter(i => !i.is_hidden) as item (item.id)}
            <li>
              <ol
                class="inline-flex flex-row flex-wrap space-x-1 font-bold"
                id="pipe-list-bp"
              >
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
        <ol class="flex flex-col mt-1 text-left">
          {#each section.items.filter(i => !i.is_hidden) as item (item.id)}
            <li class="mb-2">
              <div class="flex justify-between font-bold">
                <span>{item.title || ''}</span>
                <span>{item.date_range || ''}</span>
              </div>
              {#if item.subtitle}
                <div class="italic">{item.subtitle}</div>
              {/if}
              <ul class="list-disc pl-5 mt-1">
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

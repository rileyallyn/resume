<script lang="ts">
  import Section from "./section.svelte";
</script>

<main class="container flex flex-col h-full max-w-3xl mx-auto">
  <section id="heading" class="flex flex-col justify-center">
    <h1 class="p-1 mx-auto text-4xl font-bold text-center title font-sans">
      Riley Smith
    </h1>
    <div class="border-b-2 border-black dark:border-gray-500" />
    <ol
      class="flex flex-col mx-auto space-x-1 text-center sm:flex-row"
      id="pipe-list"
    >
      <li>College Place, WA</li>
      <li>
        <a href="https://allyn.dev">https://allyn.dev</a>
      </li>
      <li>
        <a href="mailto:riley.smith@wallawalla.edu"
          >riley.smith@wallawalla.edu
        </a>
      </li>
    </ol>
  </section>
  <Section id="statement" title="Professional Statement">
    <p class="text-left">
      As a software developer, my primary motivation is to create software that
      is accessible for everyone. Striving to build applications that are not
      only user-friendly, but scalable.
    </p>
  </Section>
  <Section id="skills" title="Skills">
    <ol class="flex flex-col gap-1 mt-2">
      <li class="flex flex-col">
        <h3 class="font-bold text-left text-md">Technologies:</h3>
        <ul
          id="comma-list"
          class="flex flex-col pl-1 ml-5 text-left list-disc sm:list-none sm:space-x-1 sm:flex-row sm:ml-0"
        >
          <li>JavaScript</li>
          <li>TypeScript</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>React.JS</li>
          <li>Next.JS</li>
          <li>Svelte</li>
          <li>SvelteKit</li>
          <li>GoLang</li>
          <li>Rust</li>
        </ul>
      </li>
      <li class="flex flex-col">
        <h3 class="font-bold text-left text-md">Software:</h3>
        <ul
          id="comma-list"
          class="flex flex-col pl-1 ml-5 text-left list-disc sm:list-none sm:space-x-1 sm:flex-row sm:ml-0"
        >
          <li>Adobe Suite (Premiere Pro, Photoshop, Lightroom)</li>
          <li>Visual Studio</li>
          <li>Visual Studio Code</li>
          <li>JetBrains Suite</li>
        </ul>
      </li>
    </ol>
  </Section>
  <Section id="education" title="Education">
    <ol
      class="flex flex-col text-lg font-bold sm:flex-row sm:space-x-1"
      id="pipe-list"
    >
      <li>Walla Walla University</li>
      <li>College Place, WA</li>
      <li>Expected Graduation: June 2026</li>
    </ol>
    <p class="mt-1 italic font-normal text-left text-md sm:mt-0">
      Bachelor of Science, Computer Science | GPA: 3.5
    </p>
    <div class="mt-1 text-left">
      <p class="italic font-bold">Relevant Courses:</p>
      <ul>
        <li class="">- Fundamentals of Programming I & II</li>
        <li class="">- Sequential and Parallel Data Structures & Algorithms</li>
        <li class="">- Computer Organization & Assembly Language</li>
      </ul>
    </div>
  </Section>
  <Section id="experience" title="Experience">
    <ol class="flex flex-col mt-1 text-left spacing-y-1">
      <li>
        <ol
          class="inline-flex flex-row flex-wrap space-x-1 font-bold"
          id="pipe-list-bp"
        >
          <li>Webhead</li>
          <li>ASWWU</li>
          <li>May 2024 - Current</li>
        </ol>
        <ul class="p-1">
          <li>
            <p>
              - Maintained the ASWWU WordPress website, ensuring it was
              accessible and responsive.
            </p>
            <p>
              - Maintained the ASWWU 'Mask', which is a custom built student
              directory, made using the Angular framework.
            </p>
          </li>
        </ul>
      </li>
      <li>
        <ol
          class="inline-flex flex-row flex-wrap space-x-1 font-bold"
          id="pipe-list-bp"
        >
          <li>Founder, Lead Software Developer</li>
          <li>Velvox Labs</li>
          <li>October 2022 - April 2024</li>
        </ol>
        <ul class="p-1">
          <li>
            <p>
              - Delivered an interactive web application using Next.JS & Sanity
              CMS for a client
            </p>
            <p>
              - Built an application using the Discord API in GoLang, serving
              thousands of users per day. Providing content moderation and
              analytics for communities.
            </p>
          </li>
        </ul>
      </li>
      <li>
        <ol
          class="inline-flex flex-row flex-wrap space-x-1 font-bold"
          id="pipe-list-bp"
        >
          <li>Senior Live Sound Engineer</li>
          <li>Walla Walla University</li>
          <li>September 2022 - Current</li>
        </ol>
        <ul class="p-1">
          <li>
            <p>
              - Successfully assisted in planning and producing a concert-level
              event, utilizing strong communication skills, and an attention to
              detail to ensure a seamless and unforgettable experience for
              attendees
            </p>
            <p>
              - Ran Live Sound for various events across the different campus
              venues
            </p>
            <p>
              - Trained employees in projection, audio, and lighting across
              different venues
            </p>
          </li>
        </ul>
      </li>
      <li>
        <ol
          class="inline-flex flex-row flex-wrap space-x-1 font-bold"
          id="pipe-list-bp"
        >
          <li>Video Producer, A/V Support</li>
          <li>Pine Springs Ranch</li>
          <li>Summers 2022,2023,2024</li>
          <li>Mountain Center, CA</li>
        </ol>
        <ul class="p-1">
          <li>
            <p>- Produced weekly 'recap' videos for the summer camp</p>
            <p>
              - Supported the nightly drama programs with audio and visual
              features
            </p>
            <p>
              - Created content for the Summer Camps social media which had a
              cumulative engagement of over 10k views
            </p>
          </li>
        </ul>
      </li>
      <!-- <li>
        <ol
          class="inline-flex flex-row flex-wrap space-x-1 font-bold" 
          id="pipe-list-bp"
        >
          <li>System Administrator, Webmaster, A/V Support</li>
          <li>Mesa Grande Academy</li>
          <li>2019-2022</li>
          <li>Calimesa, CA</li>
        </ol>
        <ul class="p-1">
          <li>
            <p>
              - Helped to maintain the on premise servers (Active Directory)
            </p>
            <p>- Decreased loading times for the landing page by 20%</p>
            <p>- Oversaw the upgrade from Windows 7 to Windows 10</p>
          </li>
        </ul>
      </li> -->
    </ol>
  </Section>
</main>

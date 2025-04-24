<script lang="ts">
  import Section from "./section.svelte";
</script>

<main class="container flex flex-col h-full max-w-3xl mx-auto">
  <section id="heading" class="flex flex-col justify-center">
    <h1 class="p-1 mx-auto text-4xl font-bold text-center title font-sans">
      Riley Smith
    </h1>
    <div class="border-b-2 border-black dark:border-gray-500"></div>
    <ol
      class="flex flex-col mx-auto space-x-1 text-center sm:flex-row"
      id="pipe-list"
    >
      <li>Yucaipa, CA/College Place, WA</li>
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

  <p class="text-center mt-2">
    Motivation is to create software that is accessible for everyone. Striving
    to build applications that are not only user-friendly, but scalable.
  </p>
  <Section id="skills" title="Skills">
    <ol class="flex flex-col gap-1 mt-2">
      <li class="flex flex-col">
        <h3 class="font-bold text-left text-md">Technologies:</h3>
        <ul
          id="comma-list"
          class="flex flex-col pl-1 ml-5 text-left list-disc sm:list-none sm:space-x-1 sm:flex-row sm:ml-0"
        >
          <li>JavaScript/TypeScript</li>
          <li>HTML/CSS</li>
          <li>React.JS/Next.JS</li>
          <li>Svelte</li>
          <li>Golang</li>
          <li>Python</li>
          <li>Full Stack Development</li>
          <li>DevOps</li>
        </ul>
      </li>
      <li class="flex flex-col">
        <h3 class="font-bold text-left text-md">Software:</h3>
        <ul
          id="comma-list"
          class="flex flex-col pl-1 ml-5 text-left list-disc sm:list-none sm:space-x-1 sm:flex-row sm:ml-0"
        >
          <li>Visual Studio</li>
          <li>Visual Studio Code</li>
          <li>JetBrains Suite</li>
          <li>Docker/Containerization</li>
          <li>Node.JS</li>
          <li>Git/GitHub</li>
          <li>Linux</li>
        </ul>
      </li>
    </ol>
  </Section>
  <Section id="education" title="Education">
    <ol class="flex flex-col font-bold sm:flex-row sm:space-x-1" id="pipe-list">
      <li>Walla Walla University</li>
      <li>College Place, WA</li>
      <li>Expected Graduation: June 2026</li>
    </ol>
    <p class="mt-1 italic font-normal text-left text-md sm:mt-0">
      <span class="font-bold">Bachelor of Science, Computer Science</span>
    </p>
    <div class="mt-1 text-left">
      <p class="italic font-bold">Relevant Courses:</p>
      <ul
        id="comma-list"
        class="flex flex-col pl-1 ml-5 text-left list-disc sm:list-none sm:space-x-1 sm:flex-row sm:ml-0 sm:text-nowrap sm:flex-wrap"
      >
        <li class="">Fundamentals of Programming I & II</li>
        <li class="">Sequential and Parallel Data Structures & Algorithms</li>
        <li class="">Computer Organization & Assembly Language</li>
        <li class="">Compilers & Languages</li>
        <li class="">Data Communication & Computer Networks</li>
        <li class="">Operating Systems</li>
        <li class="">DevOps</li>
        <li class="">Modern Cybersecurity</li>
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
              - Maintain the ASWWU WordPress website, ensuring it was accessible
              and responsive.
            </p>
            <p>
              - Maintain the ASWWU 'Mask', which is a custom built student
              directory, made using the Angular framework. Oversaw the upgrade
              from Angular v7 to v19
            </p>
          </li>
        </ul>
      </li>
      <li>
        <ol
          class="inline-flex flex-row flex-wrap space-x-1 font-bold"
          id="pipe-list-bp"
        >
          <li>Director of Audio/Visual</li>
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
              - Train and schedule a team of ~15 team members to work sound
              events on campus. This includes weekly assemblies, and
              miscellaneous high production events.
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
          <li>Video Producer, A/V Support</li>
          <li>Pine Springs Ranch</li>
          <li>Summers 2022-2024</li>
          <li>Mountain Center, CA</li>
        </ol>
        <ul class="p-1">
          <li>
            <!-- <p>- Produced weekly 'recap' videos for the summer camp</p> -->
            <p>
              - Created content for the Summer Camps social media which had a
              cumulative engagement of over 10k views
            </p>
            <p>
              - Supported the nightly drama programs with audio and visual
              features
            </p>
          </li>
        </ul>
      </li>
      <li>
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
              - Assisted in maintaining the on premise servers Windows 2016
              Active Directory, and Windows 10 workstations.
            </p>
            <p>- Oversaw the upgrade from Windows 7 to Windows 10</p>
            <p>
              - Decreased loading times for the WordPress website by 20% by
              caching static assets
            </p>
          </li>
        </ul>
      </li>
    </ol>
  </Section>
</main>

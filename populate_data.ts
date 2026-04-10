import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function populate() {
  console.log('Populating data...')

  // Insert Resume
  const { data: resume, error: resumeError } = await supabase
    .from('resumes')
    .insert([
      {
        name: 'Main',
        slug: 'main',
        is_base: true,
        full_name: 'Riley Smith',
        location: 'Yucaipa, CA | College Place, WA',
        website_url: 'https://allyn.dev',
        email: 'riley@rileysmith.me',
        summary: 'Motivation is to create software that is accessible for everyone. Striving to build applications that are not only user-friendly, but scalable.'
      }
    ])
    .select()
    .single()

  if (resumeError) {
    console.error('Error inserting resume:', resumeError)
    return
  }

  const resumeId = resume.id

  // Sections
  const sections = [
    { title: 'Skills', display_order: 1 },
    { title: 'Education', display_order: 2 },
    { title: 'Experience', display_order: 3 }
  ]

  for (const sectionData of sections) {
    const { data: section, error: sectionError } = await supabase
      .from('resume_sections')
      .insert([{ ...sectionData, resume_id: resumeId }])
      .select()
      .single()

    if (sectionError) {
      console.error(`Error inserting section ${sectionData.title}:`, sectionError)
      continue
    }

    // Items for each section
    if (sectionData.title === 'Skills') {
      await supabase.from('resume_items').insert([
        {
          section_id: section.id,
          title: 'Technologies',
          content: [
            'Full Stack Development',
            'Object-Oriented Programming',
            'React/Next.JS',
            'HTML/CSS',
            'TypeScript',
            'Python',
            'SQL/NoSQL'
          ],
          display_order: 1
        },
        {
          section_id: section.id,
          title: 'Software',
          content: [
            'Visual Studio',
            'Visual Studio Code',
            'JetBrains Suite',
            'Docker/Containerization',
            'Node.JS',
            'Git/GitHub',
            'Linux'
          ],
          display_order: 2
        }
      ])
    } else if (sectionData.title === 'Education') {
      await supabase.from('resume_items').insert([
        {
          section_id: section.id,
          title: 'Bachelor of Science, Computer Science',
          subtitle: 'Walla Walla University',
          date_range: 'Expected Graduation: June 2026',
          content: [
            'Fundamentals of Programming I & II',
            'Sequential and Parallel Data Structures & Algorithms',
            'Computer Organization & Assembly Language',
            'Compilers & Languages',
            'Data Communication & Computer Networks',
            'Operating Systems',
            'DevOps',
            'Modern Cybersecurity'
          ],
          display_order: 1
        }
      ])
    } else if (sectionData.title === 'Experience') {
      await supabase.from('resume_items').insert([
        {
          section_id: section.id,
          title: 'Information Systems Intern',
          subtitle: 'Loma Linda University',
          date_range: 'June 2025 - September 2025',
          content: [
            'Contributed to the development of a full-stack continuing education platform, utilizing Laravel and Vue.js for administrative and user-facing modules. Standardized API consumption with Axios and engineered 10+ accessible UI components, enhancing user experience and backend integration.',
            'Wrote custom scripts in PHP and Python to handle large-scale data migration and traceability.',
            'Communicated across the organization to ensure platform features were meeting the needs of various stakeholders.'
          ],
          display_order: 1
        },
        {
          section_id: section.id,
          title: 'ASWWU Webhead',
          subtitle: 'Walla Walla University',
          date_range: 'May 2024 - Current',
          content: [
            'Maintain the student association WordPress homepage to ensure accessibility and responsiveness by regular updates and optimization of plugins.',
            'Maintained the university-wide student and faculty directory, "The Mask," built with Angular. Led the upgrade of the application from Angular v7 to v19.',
            'Separated the business and data logic of the Python backend to modules in order to improve maintainability and testability.'
          ],
          display_order: 2
        },
        {
          section_id: section.id,
          title: 'Director of Live Production',
          subtitle: 'Walla Walla University',
          date_range: 'September 2022 - Current',
          content: [
            'Successfully planned and produced a concert-level event, utilizing strong communication skills, and an attention to detail to ensure a seamless and unforgettable experience for attendees.',
            'Train and schedule a team of ~25 team members to work live sound/lighting events on campus. This includes weekly assemblies, and miscellaneous higher-production events.'
          ],
          display_order: 3
        },
        {
          section_id: section.id,
          title: 'Founder, Lead Software Developer',
          subtitle: 'Velvox Labs',
          date_range: 'October 2022 - April 2024',
          content: [
            'Delivered an interactive web application using Next.JS/React & Sanity CMS for a client',
            'Built an application using the Discord API in GoLang, serving thousands of users per day. Providing content moderation and analytics for communities.'
          ],
          display_order: 4
        }
      ])
    }
  }

  console.log('Done populating data.')
}

populate()

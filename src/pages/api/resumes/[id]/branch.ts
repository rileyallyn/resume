import type { APIRoute } from "astro"
import { createSupabaseServerClient } from "../../../../lib/supabase-server"

export const POST: APIRoute = async ({ params, request, cookies }) => {
  const { id } = params
  const supabase = createSupabaseServerClient({ request, cookies })

  // Check auth
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return new Response("Unauthorized", { status: 401 })

  const formData = await request.formData()
  const newName = formData.get("name")?.toString()
  const newSlug = formData.get("slug")?.toString()

  if (!newName || !newSlug) {
    return new Response("Name and slug are required", { status: 400 })
  }

  // 1. Fetch source resume
  const { data: sourceResume, error: fetchError } = await supabase
    .from("resumes")
    .select(`*, sections:resume_sections(*, items:resume_items(*))`)
    .eq("id", id)
    .single()

  if (fetchError || !sourceResume) {
    return new Response("Source resume not found", { status: 404 })
  }

  // 2. Insert new resume
  const { data: newResume, error: resumeError } = await supabase
    .from("resumes")
    .insert([{
      name: newName,
      slug: newSlug,
      is_base: false,
      full_name: sourceResume.full_name,
      location: sourceResume.location,
      website_url: sourceResume.website_url,
      email: sourceResume.email,
      summary: sourceResume.summary
    }])
    .select()
    .single()

  if (resumeError) return new Response(resumeError.message, { status: 500 })

  // 3. Duplicate sections and items
  for (const section of sourceResume.sections) {
    const { data: newSection, error: sectionError } = await supabase
      .from("resume_sections")
      .insert([{
        resume_id: newResume.id,
        title: section.title,
        display_order: section.display_order
      }])
      .select()
      .single()

    if (sectionError) continue

    const itemsToInsert = section.items.map(item => ({
      section_id: newSection.id,
      title: item.title,
      subtitle: item.subtitle,
      date_range: item.date_range,
      content: item.content,
      display_order: item.display_order
    }))

    await supabase.from("resume_items").insert(itemsToInsert)
  }

  return new Response(JSON.stringify(newResume), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  })
}

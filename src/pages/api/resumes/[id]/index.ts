import type { APIRoute } from "astro"
import { createSupabaseServerClient } from "../../../../lib/supabase-server"

export const GET: APIRoute = async ({ params, request, cookies }) => {
  const { id } = params
  const supabase = createSupabaseServerClient({ request, cookies })

  // Check auth
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return new Response("Unauthorized", { status: 401 })

  const { data: resume, error } = await supabase
    .from("resumes")
    .select(`
      *,
      sections:resume_sections(
        *,
        items:resume_items(*)
      )
    `)
    .eq("id", id)
    .single()

  if (error || !resume) {
    return new Response("Not found", { status: 404 })
  }

  // Sort
  resume.sections.sort((a: any, b: any) => a.display_order - b.display_order)
  resume.sections.forEach((section: any) => {
    section.items.sort((a: any, b: any) => a.display_order - b.display_order)
  })

  return new Response(JSON.stringify(resume), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  })
}

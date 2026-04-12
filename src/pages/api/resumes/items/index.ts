import type { APIRoute } from "astro"
import { createSupabaseServerClient } from "../../../../lib/supabase-server"

export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = createSupabaseServerClient({ request, cookies })

  // Check auth
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return new Response("Unauthorized", { status: 401 })

  const { section_id, display_order } = await request.json()

  if (!section_id) {
    return new Response("section_id is required", { status: 400 })
  }

  const { data: newItem, error } = await supabase
    .from("resume_items")
    .insert([{
      section_id,
      title: "New Item",
      subtitle: "Organization",
      date_range: "Dates",
      content: ["New bullet point"],
      display_order: display_order ?? 0
    }])
    .select()
    .single()

  if (error) return new Response(error.message, { status: 500 })

  return new Response(JSON.stringify(newItem), {
    status: 201,
    headers: { "Content-Type": "application/json" }
  })
}

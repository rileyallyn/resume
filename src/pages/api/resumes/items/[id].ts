import type { APIRoute } from "astro"
import { createSupabaseServerClient } from "../../../../lib/supabase-server"

export const POST: APIRoute = async ({ params, request, cookies }) => {
  const { id } = params
  const supabase = createSupabaseServerClient({ request, cookies })

  // Check auth
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return new Response("Unauthorized", { status: 401 })

  const updates = await request.json()

  const { error } = await supabase
    .from("resume_items")
    .update(updates)
    .eq("id", id)

  if (error) return new Response(error.message, { status: 500 })

  return new Response("OK", { status: 200 })
}

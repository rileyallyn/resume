import type { APIRoute } from "astro"
import { createSupabaseServerClient } from "../../../lib/supabase-server"

export const GET: APIRoute = async ({ url, cookies, request, redirect }) => {
  const code = url.searchParams.get("code")

  if (code) {
    const supabase = createSupabaseServerClient({ request, cookies })
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return redirect("/editor")
    }
  }

  // Return the user to an error page with some instructions
  return redirect("/login?error=oauth_failed")
}

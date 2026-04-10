import type { APIRoute } from "astro"
import { createSupabaseServerClient } from "../../../lib/supabase-server"

export const POST: APIRoute = async ({ request, cookies, redirect, url }) => {
  const formData = await request.formData()
  const provider = formData.get("provider")?.toString()
  
  const supabase = createSupabaseServerClient({ request, cookies })

  if (provider === "github") {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${url.origin}/api/auth/callback`,
      },
    })

    if (error) {
      return new Response(error.message, { status: 500 })
    }

    return redirect(data.url)
  }

  // Fallback to email/password
  const email = formData.get("email")?.toString()
  const password = formData.get("password")?.toString()

  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 })
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return new Response(error.message, { status: 401 })
  }

  return redirect("/editor")
}

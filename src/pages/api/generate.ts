import type { APIRoute } from "astro"
import { createSupabaseServerClient } from "../../lib/supabase-server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { anthropic } from "@ai-sdk/anthropic"
import { google } from "@ai-sdk/google"

export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = createSupabaseServerClient({ request, cookies })

  // Check auth
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return new Response("Unauthorized", { status: 401 })

  const { content, jobDescription, provider } = await request.json()

  if (!content || !jobDescription) {
    return new Response("Content and job description are required", { status: 400 })
  }

  let model;
  if (provider === "anthropic") {
    model = anthropic("claude-3-5-sonnet-20240620")
  } else if (provider === "google") {
    model = google("gemini-1.5-pro")
  } else {
    model = openai("gpt-4o")
  }

  try {
    const { text } = await generateText({
      model,
      prompt: `You are an expert resume writer. Rewrite the following resume bullet point to better align with the provided job description. 
      Keep the length similar. Focus on relevant keywords and achievements.
      
      Resume Bullet Point: "${content}"
      
      Job Description: "${jobDescription}"
      
      Return ONLY the rewritten bullet point text, no other commentary.`,
    })

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    })
  } catch (error: any) {
    return new Response(error.message, { status: 500 })
  }
}

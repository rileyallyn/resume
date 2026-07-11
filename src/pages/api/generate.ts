import type { APIRoute } from "astro";
import { OpenRouter } from "@openrouter/sdk";
import { createSupabaseServerClient } from "../../lib/supabase-server";

export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = createSupabaseServerClient({ request, cookies });

  // Check auth
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { content, jobDescription, provider } = (await request.json()) as {
    content: string;
    jobDescription: string;
    provider: string;
  };

  if (!content || !jobDescription) {
    return new Response("Content and job description are required", { status: 400 });
  }

  if (!provider) {
    return new Response("Model provider is required", { status: 400 });
  }

  const openRouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY || "",
    httpReferer: "https://resume.rileyy.dev",
    appTitle: "Resume Builder"
  });

  try {
    const result = await openRouter.chat.send({
      chatRequest: {
        model: provider,
        messages: [
          {
            role: "user",
            content: `You are an expert resume writer. Rewrite the following resume bullet point to better align with the provided job description. 
      Keep the length similar. Focus on relevant keywords and achievements.
      
      Resume Bullet Point: "${content}"
      
      Job Description: "${jobDescription}"
      
      Return ONLY the rewritten bullet point text, no other commentary.`
          }
        ]
      }
    });

    const text = typeof result.choices[0]?.message.content === "string" ? result.choices[0].message.content.trim() : "";

    if (!text) {
      return new Response("No text returned from model", { status: 502 });
    }

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
};

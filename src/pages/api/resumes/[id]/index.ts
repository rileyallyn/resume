import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "../../../../lib/supabase-server";
import { resolveTheme } from "../../../../lib/themes/registry";

export const GET: APIRoute = async ({ params, request, cookies }) => {
  const { id } = params;
  const supabase = createSupabaseServerClient({ request, cookies });

  // Check auth
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { data: resume, error } = await supabase
    .from("resumes")
    .select(
      `
      *,
      sections:resume_sections(
        *,
        items:resume_items(*)
      )
    `
    )
    .eq("id", id)
    .single();

  if (error || !resume) {
    return new Response("Not found", { status: 404 });
  }

  // Sort
  resume.sections.sort((a: any, b: any) => a.display_order - b.display_order);
  resume.sections.forEach((section: any) => {
    section.items.sort((a: any, b: any) => a.display_order - b.display_order);
  });

  return new Response(JSON.stringify(resume), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

export const POST: APIRoute = async ({ params, request, cookies }) => {
  const { id } = params;
  const supabase = createSupabaseServerClient({ request, cookies });

  // Check auth
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const body = await request.json();
  const allowed = ["full_name", "location", "website_url", "email", "summary", "theme"];
  const updates = Object.fromEntries(Object.entries(body).filter(([k]) => allowed.includes(k)));

  // Normalize the theme to a known key so an unknown value can't be persisted.
  if ("theme" in updates) {
    updates.theme = resolveTheme(updates.theme as string);
  }

  const { error } = await supabase.from("resumes").update(updates).eq("id", id);

  if (error) return new Response(error.message, { status: 500 });

  return new Response("OK", { status: 200 });
};

export const DELETE: APIRoute = async ({ params, request, cookies }) => {
  const { id } = params;
  const supabase = createSupabaseServerClient({ request, cookies });

  // Check auth
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { error } = await supabase.from("resumes").delete().eq("id", id);

  if (error) return new Response(error.message, { status: 500 });

  return new Response("OK", { status: 200 });
};

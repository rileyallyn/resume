import type { APIRoute } from "astro";
import { createSupabaseServerClient } from "../../../../../lib/supabase-server";

export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = createSupabaseServerClient({ request, cookies });

  // Check auth
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { itemIds } = await request.json();

  if (!itemIds || !Array.isArray(itemIds)) {
    return new Response("itemIds array is required", { status: 400 });
  }

  // Update display_order for each item
  const updates = itemIds.map((itemId, index) => ({
    id: itemId,
    display_order: index
  }));

  const { error } = await supabase.from("resume_items").upsert(updates);

  if (error) return new Response(error.message, { status: 500 });

  return new Response("OK", { status: 200 });
};

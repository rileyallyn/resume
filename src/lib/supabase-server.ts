import { createServerClient, parseCookieHeader } from '@supabase/ssr'

export function createSupabaseServerClient(context: { request: Request, cookies: any }) {
  return createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_PUBLISH_KEY,
    {
      cookies: {
        getAll: () => {
          return parseCookieHeader(context.request.headers.get('Cookie') ?? '') as { name: string; value: string }[]
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            context.cookies.set(name, value, options)
          )
        },
      },
    }
  )
}

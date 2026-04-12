import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_PUBLISH_KEY

console.log('Initializing Supabase client with URL:', supabaseUrl)

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

// Create a singleton instance of the Supabase client
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null

export const createClientSupabaseClient = () => {
  if (supabaseInstance) return supabaseInstance

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  // Create a new client if one doesn't exist
  supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      storageKey: "ductwarriors-supabase-auth",
    },
  })

  return supabaseInstance
}

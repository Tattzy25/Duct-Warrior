import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Create a singleton client for client-side usage
let clientSupabaseInstance: ReturnType<typeof createClient<Database>> | null = null

export const createClientSupabaseClient = () => {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    throw new Error("createClientSupabaseClient should only be called in browser environments")
  }

  if (clientSupabaseInstance) {
    return clientSupabaseInstance
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and anon key must be defined")
  }

  // Add a custom storage key to avoid conflicts
  clientSupabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      storageKey: "ductwarriors-supabase-auth",
      persistSession: true,
      autoRefreshToken: true,
      debug: process.env.NODE_ENV === "development",
    },
  })

  return clientSupabaseInstance
}

// Reset function for testing purposes
export const resetClientSupabaseClient = () => {
  clientSupabaseInstance = null
}

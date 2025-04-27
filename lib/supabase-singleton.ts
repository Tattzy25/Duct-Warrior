import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

// Global variable to store the client instance
// Using a symbol as a key to avoid conflicts
const GLOBAL_KEY = Symbol.for("app.supabase.client")

interface GlobalWithSupabase {
  [GLOBAL_KEY]: ReturnType<typeof createClient<Database>> | undefined
}

// Ensure the global object has our type
declare const global: GlobalWithSupabase

// For client-side usage
export function getSupabaseClient() {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    throw new Error("getSupabaseClient should only be called in browser environments")
  }

  // Create a global container if it doesn't exist
  const globalWithSupabase = window as unknown as GlobalWithSupabase

  if (!globalWithSupabase[GLOBAL_KEY]) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    console.log("[SUPABASE] Creating new client instance")

    globalWithSupabase[GLOBAL_KEY] = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        storageKey: "ductwarriors-supabase-auth",
      },
    })
  }

  return globalWithSupabase[GLOBAL_KEY]!
}

// For server-side usage with admin privileges
let serverSupabaseInstance: ReturnType<typeof createClient<Database>> | null = null

export function getServerSupabaseClient() {
  if (typeof window !== "undefined") {
    throw new Error("getServerSupabaseClient should only be called in server environments")
  }

  if (!serverSupabaseInstance) {
    const supabaseUrl = process.env.SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    serverSupabaseInstance = createClient<Database>(supabaseUrl, supabaseKey)
  }

  return serverSupabaseInstance
}

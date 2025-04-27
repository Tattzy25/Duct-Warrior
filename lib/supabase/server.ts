import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/database"

export function createServerSupabaseClient() {
  const cookieStore = cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: { path: string; maxAge: number; domain?: string }) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // Handle cookie setting errors
          console.error("Error setting cookie:", error)
        }
      },
      remove(name: string, options: { path: string; domain?: string }) {
        try {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 })
        } catch (error) {
          // Handle cookie removal errors
          console.error("Error removing cookie:", error)
        }
      },
    },
  })
}

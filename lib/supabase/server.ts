import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

export function createServerSupabaseClient() {
  const cookieStore = cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and anon key must be defined")
  }

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(
        name: string,
        value: string,
        options: { path: string; maxAge: number; domain?: string; sameSite?: string; secure?: boolean },
      ) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // This can happen in middleware or other contexts where cookies are read-only
          console.warn("Warning: Could not set cookie", error)
        }
      },
      remove(name: string, options: { path: string; domain?: string; sameSite?: string; secure?: boolean }) {
        try {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 })
        } catch (error) {
          console.warn("Warning: Could not remove cookie", error)
        }
      },
    },
  })
}

"use client"

import { useEffect } from "react"

export function SupabaseCleanup() {
  useEffect(() => {
    if (typeof window === "undefined") return

    // Only run in development
    if (process.env.NODE_ENV !== "development") return

    console.log("[SUPABASE CLEANUP] Running cleanup...")

    // Clear any localStorage items that might be related to Supabase
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (
        key &&
        (key.includes("supabase") ||
          key.includes("gotrue") ||
          key.includes("sb-") ||
          key.includes("ductwarriors-supabase"))
      ) {
        keysToRemove.push(key)
      }
    }

    // Remove the keys
    keysToRemove.forEach((key) => {
      console.log(`[SUPABASE CLEANUP] Removing localStorage key: ${key}`)
      localStorage.removeItem(key)
    })

    // Clear any global variables that might be related to Supabase
    const globalKeys = Object.keys(window).filter((key) => key.includes("supabase") || key.includes("GoTrue"))

    globalKeys.forEach((key) => {
      console.log(`[SUPABASE CLEANUP] Removing global key: ${key}`)
      try {
        // @ts-ignore
        delete window[key]
      } catch (e) {
        console.error(`[SUPABASE CLEANUP] Failed to delete global key: ${key}`, e)
      }
    })

    console.log("[SUPABASE CLEANUP] Cleanup complete")

    // Force a page reload after cleanup
    if (keysToRemove.length > 0 || globalKeys.length > 0) {
      console.log("[SUPABASE CLEANUP] Reloading page to apply changes...")
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  }, [])

  return null
}

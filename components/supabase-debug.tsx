"use client"

import { useEffect } from "react"

export function SupabaseDebug() {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== "development") {
      return () => {} // Return an empty cleanup function to satisfy the hook's requirements
    }

    // Track Supabase client instances
    const originalCreateClient = (window as any).createClient || (() => {})
    let instanceCount = 0

    // Override the createClient function to track instances
    ;(window as any).createClient = function (...args: any[]) {
      instanceCount++
      console.log(`[DEBUG] Supabase client instance created. Total: ${instanceCount}`)
      console.trace("Supabase client creation stack trace:")
      return originalCreateClient.apply(this, args)
    }

    return () => {
      // Restore original function
      ;(window as any).createClient = originalCreateClient
    }
  }, [])

  return null
}

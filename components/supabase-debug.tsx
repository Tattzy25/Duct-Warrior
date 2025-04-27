"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase-singleton"

export function SupabaseDebug() {
  const [instanceCount, setInstanceCount] = useState(0)
  const [instanceIds, setInstanceIds] = useState<string[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return

    // Add a unique ID to each client for tracking
    const addInstanceId = () => {
      const client = getSupabaseClient() as any

      // If this client doesn't have an ID yet, add one
      if (!client._instanceId) {
        client._instanceId = Math.random().toString(36).substring(2, 9)
      }

      return client._instanceId
    }

    // Create multiple clients to test our singleton
    const id1 = addInstanceId()
    const id2 = addInstanceId()
    const id3 = addInstanceId()

    // If our singleton is working, all IDs should be the same
    const uniqueIds = Array.from(new Set([id1, id2, id3]))
    setInstanceIds(uniqueIds)
    setInstanceCount(uniqueIds.length)

    // Log to console for debugging
    console.log("[SUPABASE DEBUG] Instance IDs:", uniqueIds)

    // Check for any global GoTrueClient instances
    const globalKeys = Object.keys(window).filter((key) => key.includes("supabase") || key.includes("GoTrue"))

    if (globalKeys.length > 0) {
      console.log("[SUPABASE DEBUG] Found global keys:", globalKeys)
    }
  }, [])

  if (instanceCount <= 1) return null

  return (
    <div className="fixed bottom-4 right-4 bg-red-600 text-white p-2 rounded text-xs z-50">
      <p>⚠️ Multiple Supabase instances: {instanceCount}</p>
      <p>IDs: {instanceIds.join(", ")}</p>
    </div>
  )
}

import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { AnalyticsEvent } from "@/lib/analytics"

export async function POST(request: Request) {
  try {
    const { events } = (await request.json()) as { events: AnalyticsEvent[] }

    if (!events || !Array.isArray(events) || events.length === 0) {
      return NextResponse.json({ error: "No events provided" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Insert events into analytics table
    const { error } = await supabase.from("analytics_events").insert(
      events.map((event) => ({
        event_type: event.event_type,
        timestamp: event.timestamp,
        url: event.url,
        user_id: event.user_id || null,
        session_id: event.session_id,
        properties: event.properties || {},
      })),
    )

    if (error) {
      console.error("Error storing analytics events:", error)
      return NextResponse.json({ error: "Failed to store analytics events" }, { status: 500 })
    }

    return NextResponse.json({ success: true, count: events.length })
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json({ error: "Failed to process analytics request" }, { status: 500 })
  }
}

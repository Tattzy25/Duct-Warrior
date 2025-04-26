import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName } = await request.json()

    const apiKey = process.env.MAILERLITE_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "MailerLite API key not configured" }, { status: 500 })
    }

    // Add subscriber to MailerLite
    const response = await fetch("https://api.mailerlite.com/api/v2/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MailerLite-ApiKey": apiKey,
      },
      body: JSON.stringify({
        email,
        name: firstName,
        fields: {
          last_name: lastName,
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("MailerLite API error:", errorData)
      return NextResponse.json({ error: "Failed to subscribe to newsletter" }, { status: 500 })
    }

    const data = await response.json()

    // Store subscriber in database
    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("email_subscribers").upsert(
      {
        email,
        first_name: firstName,
        last_name: lastName,
        subscribed: true,
        mailer_id: data.id,
      },
      { onConflict: "email" },
    )

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to record subscription" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter!",
    })
  } catch (error) {
    console.error("MailerLite API error:", error)
    return NextResponse.json({ error: "Failed to process subscription" }, { status: 500 })
  }
}

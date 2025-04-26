import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, serviceType, message } = await request.json()

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Insert estimate request
    const { data, error } = await supabase
      .from("estimates")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        service_type: serviceType,
        message,
        status: "pending",
      })
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save estimate request" }, { status: 500 })
    }

    // Also add to email subscribers if not already there
    await supabase.from("email_subscribers").upsert(
      {
        email,
        first_name: firstName,
        last_name: lastName,
        subscribed: true,
      },
      { onConflict: "email" },
    )

    return NextResponse.json({
      success: true,
      message: "Estimate request submitted successfully",
      id: data[0].id,
    })
  } catch (error) {
    console.error("Error processing estimate request:", error)
    return NextResponse.json({ error: "Failed to process estimate request" }, { status: 500 })
  }
}

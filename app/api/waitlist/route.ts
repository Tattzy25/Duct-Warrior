import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const userId = formData.get("userId") as string | null

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all required fields",
        },
        { status: 400 },
      )
    }

    const supabase = createServerSupabaseClient()

    // Check if email already exists in waitlist
    const { data: existingEntry } = await supabase.from("waitlist").select("id, position").eq("email", email).single()

    if (existingEntry) {
      return NextResponse.json({
        success: false,
        message: "This email is already on our waitlist",
        position: existingEntry.position,
      })
    }

    // Get the highest current position
    const { data: highestPosition } = await supabase
      .from("waitlist")
      .select("position")
      .order("position", { ascending: false })
      .limit(1)
      .single()

    const newPosition = highestPosition ? highestPosition.position + 1 : 1344

    // Insert new waitlist entry
    const { data, error } = await supabase
      .from("waitlist")
      .insert({
        user_id: userId || null,
        name: `${firstName} ${lastName}`,
        email,
        position: newPosition,
      })
      .select()

    if (error) throw error

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
      message: "Successfully joined the waitlist!",
      position: newPosition,
      id: data[0].id,
    })
  } catch (error: any) {
    console.error("Error in waitlist API:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "An error occurred while processing your request",
      },
      { status: 500 },
    )
  }
}

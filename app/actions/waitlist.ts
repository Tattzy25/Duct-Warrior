"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function joinWaitlist(formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const userId = formData.get("userId") as string | null

    if (!firstName || !lastName || !email) {
      return {
        success: false,
        message: "Please provide all required fields",
      }
    }

    const supabase = createServerSupabaseClient()

    // Check if email already exists in waitlist
    const { data: existingEntry } = await supabase.from("waitlist").select("id, position").eq("email", email).single()

    if (existingEntry) {
      return {
        success: false,
        message: "This email is already on our waitlist",
        position: existingEntry.position,
      }
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

    revalidatePath("/")
    revalidatePath("/waitlist")

    return {
      success: true,
      message: "Successfully joined the waitlist!",
      position: newPosition,
      id: data[0].id,
    }
  } catch (error) {
    console.error("Error joining waitlist:", error)
    return {
      success: false,
      message: "Failed to join waitlist. Please try again.",
    }
  }
}

export async function bumpWaitlistPosition(
  waitlistId: string,
  positionsToMove: number,
  paymentId: string,
  amountPaid: number,
) {
  try {
    const supabase = createServerSupabaseClient()

    // Get current position
    const { data: waitlistEntry } = await supabase
      .from("waitlist")
      .select("position, user_id")
      .eq("id", waitlistId)
      .single()

    if (!waitlistEntry) {
      return {
        success: false,
        message: "Waitlist entry not found",
      }
    }

    // Calculate new position
    const newPosition = Math.max(1, waitlistEntry.position - positionsToMove)

    // Call the stored procedure to handle the transaction
    const { error } = await supabase.rpc("bump_waitlist_position", {
      p_waitlist_id: waitlistId,
      p_new_position: newPosition,
      p_payment_id: paymentId,
      p_amount_paid: amountPaid,
      p_positions_moved: positionsToMove,
    })

    if (error) {
      console.error("Error calling bump_waitlist_position:", error)
      throw error
    }

    revalidatePath("/")
    revalidatePath("/waitlist")

    return {
      success: true,
      message: "Position successfully bumped!",
      newPosition,
    }
  } catch (error) {
    console.error("Error bumping position:", error)
    return {
      success: false,
      message: "Failed to bump position. Please try again.",
    }
  }
}

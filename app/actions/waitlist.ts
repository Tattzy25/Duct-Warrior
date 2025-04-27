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
    const { data: existingEntry, error: lookupError } = await supabase
      .from("waitlist")
      .select("id, position")
      .eq("email", email)
      .single()

    if (lookupError && lookupError.code !== "PGRST116") {
      // PGRST116 is "no rows returned" which is expected if the email is not found
      console.error("Error checking existing waitlist entry:", lookupError)
      throw new Error("Error checking waitlist status")
    }

    if (existingEntry) {
      return {
        success: false,
        message: "This email is already on our waitlist",
        position: existingEntry.position,
      }
    }

    // Get the highest current position
    const { data: highestPosition, error: positionError } = await supabase
      .from("waitlist")
      .select("position")
      .order("position", { ascending: false })
      .limit(1)
      .single()

    if (positionError && positionError.code !== "PGRST116") {
      console.error("Error getting highest position:", positionError)
    }

    const newPosition = highestPosition ? highestPosition.position + 1 : 1344

    // Start a transaction
    const { error: transactionError } = await supabase.rpc("begin_transaction")
    if (transactionError) {
      console.error("Error starting transaction:", transactionError)
      throw new Error("Database error. Please try again.")
    }

    try {
      // Insert new waitlist entry
      const { data, error: insertError } = await supabase
        .from("waitlist")
        .insert({
          user_id: userId || null,
          name: `${firstName} ${lastName}`,
          email,
          position: newPosition,
        })
        .select()

      if (insertError) {
        console.error("Error inserting waitlist entry:", insertError)
        throw new Error("Failed to join waitlist. Please try again.")
      }

      // Also add to email subscribers if not already there
      const { error: emailError } = await supabase.from("email_subscribers").upsert(
        {
          email,
          first_name: firstName,
          last_name: lastName,
          subscribed: true,
        },
        { onConflict: "email" },
      )

      if (emailError) {
        console.error("Error adding to email subscribers:", emailError)
        // Continue anyway since this is not critical
      }

      // Update the waitlist counter
      const { error: counterError } = await supabase
        .from("waitlist_counter")
        .update({
          total_count: newPosition + 1,
          last_updated: new Date().toISOString(),
        })
        .eq("id", 1)

      if (counterError) {
        console.error("Error updating waitlist counter:", counterError)
        // Not critical, continue
      }

      // Commit the transaction
      const { error: commitError } = await supabase.rpc("commit_transaction")
      if (commitError) {
        console.error("Error committing transaction:", commitError)
        throw new Error("Database error. Please try again.")
      }

      revalidatePath("/")
      revalidatePath("/waitlist")
      revalidatePath("/dashboard")

      return {
        success: true,
        message: "Successfully joined the waitlist!",
        position: newPosition,
        id: data[0].id,
      }
    } catch (error) {
      // Rollback the transaction on error
      await supabase.rpc("rollback_transaction")
      throw error
    }
  } catch (error: any) {
    console.error("Error joining waitlist:", error)
    return {
      success: false,
      message: error.message || "Failed to join waitlist. Please try again.",
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
    const { data: waitlistEntry, error: lookupError } = await supabase
      .from("waitlist")
      .select("position, user_id")
      .eq("id", waitlistId)
      .single()

    if (lookupError) {
      console.error("Error getting waitlist entry:", lookupError)
      throw new Error("Waitlist entry not found")
    }

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
    revalidatePath("/dashboard")

    return {
      success: true,
      message: "Position successfully bumped!",
      newPosition,
    }
  } catch (error: any) {
    console.error("Error bumping position:", error)
    return {
      success: false,
      message: error.message || "Failed to bump position. Please try again.",
    }
  }
}

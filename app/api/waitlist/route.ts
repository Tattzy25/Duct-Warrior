import { type NextRequest, NextResponse } from "next/server"
import { joinWaitlist } from "@/app/actions/waitlist"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const result = await joinWaitlist(formData)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in waitlist API:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request",
      },
      { status: 500 },
    )
  }
}

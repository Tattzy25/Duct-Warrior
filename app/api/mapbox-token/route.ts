import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message: "This endpoint is deprecated. We now use a static map.",
  })
}

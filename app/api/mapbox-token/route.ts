import { NextResponse } from "next/server"

export async function GET() {
  // Get the token from environment variables
  const token = process.env.MAPBOX_TOKEN

  if (!token) {
    console.error("MAPBOX_TOKEN environment variable is not set")
    return NextResponse.json({ error: "Mapbox token not configured" }, { status: 500 })
  }

  // Return the token
  return NextResponse.json({ token })
}

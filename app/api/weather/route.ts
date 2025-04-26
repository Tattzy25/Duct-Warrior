import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const city = url.searchParams.get("city") || "McKinney"
    const state = url.searchParams.get("state") || "TX"

    const apiKey = process.env.OPENWEATHER_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "OpenWeather API key not configured" }, { status: 500 })
    }

    const supabase = createServerSupabaseClient()

    // Check cache first (data less than 30 minutes old)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString()

    const { data: cachedData } = await supabase
      .from("weather_cache")
      .select("*")
      .eq("city", city)
      .eq("state", state)
      .gt("fetched_at", thirtyMinutesAgo)
      .order("fetched_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    if (cachedData) {
      return NextResponse.json({
        success: true,
        data: cachedData.data,
        cached: true,
      })
    }

    // Fetch from OpenWeather API
    const locationQuery = state ? `${city},${state},US` : city
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${locationQuery}&appid=${apiKey}&units=imperial`,
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("OpenWeather API error:", errorData)
      return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
    }

    const weatherData = await response.json()

    // Cache the data
    await supabase.from("weather_cache").insert({
      city,
      state,
      data: weatherData,
      fetched_at: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      data: weatherData,
      cached: false,
    })
  } catch (error) {
    console.error("OpenWeather API error:", error)
    return NextResponse.json({ error: "Failed to process weather request" }, { status: 500 })
  }
}

"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, Sun, Wind, Snowflake, Droplets, Thermometer } from "lucide-react"

interface WeatherData {
  main: {
    temp: number
    feels_like: number
    humidity: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  wind: {
    speed: number
  }
  name: string
}

export default function WeatherWidget({ city = "McKinney", state = "TX" }) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/weather?city=${city}&state=${state}`)

        if (!response.ok) {
          throw new Error("Failed to fetch weather data")
        }

        const result = await response.json()
        setWeather(result.data)
      } catch (err) {
        console.error("Error fetching weather:", err)
        setError("Unable to load weather data")
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city, state])

  const getWeatherIcon = (weatherId: number) => {
    // Weather condition codes: https://openweathermap.org/weather-conditions
    if (weatherId >= 200 && weatherId < 600) {
      return <CloudRain className="h-10 w-10 text-blue-500" />
    } else if (weatherId >= 600 && weatherId < 700) {
      return <Snowflake className="h-10 w-10 text-blue-200" />
    } else if (weatherId >= 700 && weatherId < 800) {
      return <Wind className="h-10 w-10 text-gray-400" />
    } else if (weatherId === 800) {
      return <Sun className="h-10 w-10 text-yellow-500" />
    } else {
      return <Cloud className="h-10 w-10 text-gray-400" />
    }
  }

  if (loading) {
    return (
      <div className="bg-texas-cream rounded-xl p-6 shadow-md flex items-center justify-center h-40">
        <div className="animate-pulse text-texas-blue">Loading weather...</div>
      </div>
    )
  }

  if (error || !weather) {
    return (
      <div className="bg-texas-cream rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-bold text-texas-blue mb-2">Weather</h3>
        <p className="text-red-500">{error || "Unable to load weather data"}</p>
      </div>
    )
  }

  return (
    <div className="bg-texas-cream rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-bold text-texas-blue mb-2">Local Weather</h3>
      <div className="flex items-center">
        <div className="mr-4">{weather.weather[0] && getWeatherIcon(weather.weather[0].id)}</div>
        <div>
          <div className="text-3xl font-bold text-texas-blue">{Math.round(weather.main.temp)}°F</div>
          <div className="text-gray-700">{weather.name}</div>
          <div className="text-gray-600 text-sm capitalize">{weather.weather[0]?.description}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-700">
        <div className="flex items-center">
          <Thermometer className="h-4 w-4 text-texas-orange mr-1" />
          <span>Feels like: {Math.round(weather.main.feels_like)}°F</span>
        </div>
        <div className="flex items-center">
          <Droplets className="h-4 w-4 text-texas-orange mr-1" />
          <span>Humidity: {weather.main.humidity}%</span>
        </div>
        <div className="flex items-center">
          <Wind className="h-4 w-4 text-texas-orange mr-1" />
          <span>Wind: {Math.round(weather.wind.speed)} mph</span>
        </div>
      </div>
    </div>
  )
}

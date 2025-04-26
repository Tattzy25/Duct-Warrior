"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"

interface WeatherData {
  name: string
  main: {
    temp: number
    temp_min: number
    temp_max: number
  }
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
}

export default function WeatherCard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/weather?city=McKinney&state=TX")
        if (!response.ok) {
          throw new Error("Failed to fetch weather data")
        }
        const data = await response.json()
        if (data.success && data.data) {
          setWeatherData(data.data)
        } else {
          throw new Error(data.error || "Failed to fetch weather data")
        }
      } catch (err: any) {
        console.error("Error fetching weather:", err)
        setError(err.message || "Failed to fetch weather data")
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
    // Refresh weather data every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  if (loading) {
    return (
      <div className="cardContainer">
        <div className="card">Loading weather...</div>
      </div>
    )
  }

  if (error || !weatherData) {
    return null // Don't show anything if there's an error
  }

  // Convert temperature from Kelvin to Fahrenheit if needed
  const temp = Math.round(weatherData.main.temp)
  const minTemp = Math.round(weatherData.main.temp_min)
  const maxTemp = Math.round(weatherData.main.temp_max)
  const weatherMain = weatherData.weather[0]?.main || "Clear"
  const weatherDesc = weatherData.weather[0]?.description || "Clear skies"
  const weatherIcon = weatherData.weather[0]?.icon || "01d"

  // Map OpenWeather icon codes to descriptive weather conditions
  const getWeatherCondition = (icon: string) => {
    const iconPrefix = icon.substring(0, 2)
    switch (iconPrefix) {
      case "01":
        return "CLEAR SKY"
      case "02":
        return "FEW CLOUDS"
      case "03":
        return "SCATTERED CLOUDS"
      case "04":
        return "BROKEN CLOUDS"
      case "09":
        return "SHOWER RAIN"
      case "10":
        return "RAIN"
      case "11":
        return "THUNDERSTORM"
      case "13":
        return "SNOW"
      case "50":
        return "MIST"
      default:
        return weatherMain.toUpperCase()
    }
  }

  // Get icon URL from OpenWeather
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`

  return (
    <div className="cardContainer">
      <div className="card">
        <p className="city">{weatherData.name.toUpperCase()}</p>
        <p className="weather">{getWeatherCondition(weatherIcon)}</p>
        <svg
          className="weather"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          width="50px"
          height="50px"
          viewBox="0 0 100 100"
          xmlSpace="preserve"
        >
          <image id="image0" width="100" height="100" x="0" y="0" href={iconUrl}></image>
        </svg>
        <p className="temp">{temp}°</p>
        <div className="minmaxContainer">
          <div className="min">
            <p className="minHeading">Min</p>
            <p className="minTemp">{minTemp}°</p>
          </div>
          <div className="max">
            <p className="maxHeading">Max</p>
            <p className="maxTemp">{maxTemp}°</p>
          </div>
        </div>
      </div>
    </div>
  )
}

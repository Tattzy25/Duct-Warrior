"use client"

import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

export default function MapSection() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    // Replace with your Mapbox access token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "your-mapbox-token"

    if (map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-96.6389, 33.1972], // McKinney, TX coordinates
      zoom: 10,
    })

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl())

    // Add marker for business location
    new mapboxgl.Marker({ color: "#FF7A00" })
      .setLngLat([-96.6389, 33.1972])
      .setPopup(new mapboxgl.Popup().setHTML("<h3>DUCTWARRIORS</h3><p>McKinney, TX</p>"))
      .addTo(map.current)

    // Add service area overlay
    map.current.on("load", () => {
      if (!map.current) return

      map.current.addSource("service-area", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-96.8389, 33.3972], // Expanded area around McKinney
                [-96.4389, 33.3972],
                [-96.4389, 32.9972],
                [-96.8389, 32.9972],
                [-96.8389, 33.3972],
              ],
            ],
          },
        },
      })

      map.current.addLayer({
        id: "service-area-fill",
        type: "fill",
        source: "service-area",
        layout: {},
        paint: {
          "fill-color": "#FF7A00",
          "fill-opacity": 0.2,
        },
      })

      map.current.addLayer({
        id: "service-area-outline",
        type: "line",
        source: "service-area",
        layout: {},
        paint: {
          "line-color": "#FF7A00",
          "line-width": 2,
        },
      })
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  return (
    <section className="py-20 bg-texas-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display text-texas-blue">Our Service Area</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-700">
            Proudly serving McKinney, TX and surrounding areas including Frisco, Plano, Allen, and more.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div ref={mapContainer} className="h-[500px] w-full" />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-texas-blue mb-4">McKinney Office</h3>
            <p className="text-gray-700">
              123 Main Street
              <br />
              McKinney, TX 75070
            </p>
            <p className="mt-4 text-gray-700">
              <strong>Phone:</strong> (123) 456-7890
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-texas-blue mb-4">Service Hours</h3>
            <ul className="text-gray-700 space-y-2">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>9:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-texas-blue mb-4">Service Areas</h3>
            <ul className="text-gray-700 space-y-2">
              <li>McKinney</li>
              <li>Frisco</li>
              <li>Plano</li>
              <li>Allen</li>
              <li>Richardson</li>
              <li>And surrounding areas</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

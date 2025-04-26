"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClientSupabaseClient } from "@/lib/supabase/client"
import type { Database } from "@/types/supabase"

type Service = Database["public"]["Tables"]["services"]["Row"]

interface ServiceRequestFormProps {
  userId?: string
}

export default function ServiceRequestForm({ userId }: ServiceRequestFormProps) {
  const [services, setServices] = useState<Service[]>([])
  const [formData, setFormData] = useState({
    serviceId: "",
    preferredDate: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState("")

  useEffect(() => {
    const fetchServices = async () => {
      const supabase = createClientSupabaseClient()
      const { data, error } = await supabase.from("services").select("*")

      if (error) {
        console.error("Error fetching services:", error)
        return
      }

      if (data) {
        setServices(data)
      }
    }

    fetchServices()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError("")
    setFormSuccess("")

    try {
      const supabase = createClientSupabaseClient()

      if (!userId) {
        setFormError("You must be logged in to submit a service request. Please sign in and try again.")
        return
      }

      const { error } = await supabase.from("service_requests").insert({
        user_id: userId,
        service_id: formData.serviceId,
        preferred_date: formData.preferredDate,
        notes: formData.notes,
        status: "pending",
      })

      if (error) throw error

      setFormSuccess("Service request submitted successfully!")
      setFormData({
        serviceId: "",
        preferredDate: "",
        notes: "",
      })
    } catch (error) {
      console.error("Error submitting service request:", error)
      setFormError("Failed to submit service request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-bold text-texas-blue mb-4">Request a Service</h3>

      {formError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{formError}</div>
      )}

      {formSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {formSuccess}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Service Type</label>
          <select
            name="serviceId"
            value={formData.serviceId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-texas-orange"
            required
          >
            <option value="">Select a Service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} - ${service.price}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Preferred Date</label>
          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-texas-orange"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-texas-orange"
            placeholder="Any special instructions or concerns..."
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !userId}
          className="bg-texas-orange hover:bg-texas-blue text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
        {!userId && <p className="text-sm text-red-600 mt-2">Please sign in to submit a service request.</p>}
      </form>
    </div>
  )
}

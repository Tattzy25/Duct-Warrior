"use client"

import { useState, useEffect } from "react"
import { createClientSupabaseClient } from "@/lib/supabase/client"
import { useAuth } from "@/context/auth-context"
import { Check, X } from "lucide-react"

export default function AIDashboardPage() {
  const { user } = useAuth()
  const [aiAppointments, setAiAppointments] = useState<any[]>([])
  const [aiWaitlistEntries, setAiWaitlistEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("appointments")

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      // Check if user is admin
      if (!user.email?.includes("admin")) {
        return
      }

      setLoading(true)
      const supabase = createClientSupabaseClient()

      // Fetch AI-created appointments
      const { data: appointmentsData } = await supabase
        .from("service_requests")
        .select("*, services(*)")
        .eq("notes", "Scheduled via Duct Daddy AI")
        .order("created_at", { ascending: false })

      if (appointmentsData) {
        setAiAppointments(appointmentsData)
      }

      // Fetch recent waitlist entries (assuming the most recent ones might be from AI)
      const { data: waitlistData } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20)

      if (waitlistData) {
        setAiWaitlistEntries(waitlistData)
      }

      setLoading(false)
    }

    fetchData()
  }, [user])

  const handleApproveAppointment = async (id: string) => {
    const supabase = createClientSupabaseClient()

    await supabase.from("service_requests").update({ status: "approved" }).eq("id", id)

    // Refresh the list
    setAiAppointments(
      aiAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "approved" } : appointment,
      ),
    )
  }

  const handleRejectAppointment = async (id: string) => {
    const supabase = createClientSupabaseClient()

    await supabase.from("service_requests").update({ status: "rejected" }).eq("id", id)

    // Refresh the list
    setAiAppointments(
      aiAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "rejected" } : appointment,
      ),
    )
  }

  if (!user || !user.email?.includes("admin")) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-100 text-red-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold">Access Denied</h2>
          <p>You do not have permission to view this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-texas-blue mb-8">Duct Daddy AI Dashboard</h1>

      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "appointments"
                ? "border-b-2 border-texas-orange text-texas-blue"
                : "text-gray-500 hover:text-texas-blue"
            }`}
            onClick={() => setActiveTab("appointments")}
          >
            AI Appointments
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "waitlist"
                ? "border-b-2 border-texas-orange text-texas-blue"
                : "text-gray-500 hover:text-texas-blue"
            }`}
            onClick={() => setActiveTab("waitlist")}
          >
            Recent Waitlist Entries
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-texas-blue"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      ) : (
        <>
          {activeTab === "appointments" && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Requested
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Preferred Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {aiAppointments.length > 0 ? (
                      aiAppointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(appointment.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {appointment.services?.name || "Unknown Service"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {appointment.preferred_date
                              ? new Date(appointment.preferred_date).toLocaleDateString()
                              : "Not specified"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                appointment.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : appointment.status === "rejected"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {appointment.status === "pending" && (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleApproveAppointment(appointment.id)}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  <Check className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => handleRejectAppointment(appointment.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <X className="h-5 w-5" />
                                </button>
                              </div>
                            )}
                            {appointment.status !== "pending" && <span className="text-gray-400">Processed</span>}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          No AI-created appointments found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "waitlist" && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Added
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {aiWaitlistEntries.length > 0 ? (
                      aiWaitlistEntries.map((entry) => (
                        <tr key={entry.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(entry.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{entry.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{entry.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{entry.phone || "Not provided"}</td>
                          <td className="px-6 py-4 whitespace-nowrap">#{entry.position}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          No waitlist entries found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

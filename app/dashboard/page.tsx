"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Clock, FileText, Home, Settings, User, LogOut, Bell } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase/client"
import { useAuth } from "@/context/auth-context"
import ServiceRequestForm from "@/components/service-request-form"
import type { Database } from "@/types/supabase"

type Service = Database["public"]["Tables"]["services"]["Row"]
type ServiceRequest = Database["public"]["Tables"]["service_requests"]["Row"]
type Appointment = Database["public"]["Tables"]["appointments"]["Row"]
type WaitlistEntry = Database["public"]["Tables"]["waitlist"]["Row"]

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [services, setServices] = useState<Service[]>([])
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [waitlistEntry, setWaitlistEntry] = useState<WaitlistEntry | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      setLoading(true)
      const supabase = createClientSupabaseClient()

      // Fetch services
      const { data: servicesData } = await supabase.from("services").select("*")
      if (servicesData) {
        setServices(servicesData)
      }

      // Fetch service requests for the authenticated user
      const { data: requestsData } = await supabase
        .from("service_requests")
        .select("*, services(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (requestsData) {
        setServiceRequests(requestsData)
      }

      // Fetch appointments for the authenticated user
      const { data: appointmentsData } = await supabase
        .from("appointments")
        .select("*, services(*)")
        .eq("user_id", user.id)
        .order("appointment_date", { ascending: true })

      if (appointmentsData) {
        setAppointments(appointmentsData)
      }

      // Fetch waitlist entry for the authenticated user
      const { data: waitlistData } = await supabase.from("waitlist").select("*").eq("user_id", user.id).single()

      if (waitlistData) {
        setWaitlistEntry(waitlistData)
      }

      setLoading(false)
    }

    fetchData()
  }, [user])

  if (!user) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-texas-blue mb-4">Please Sign In</h2>
          <p className="text-gray-700 mb-6">You need to be signed in to view your dashboard.</p>
          <Link
            href="/auth/signin"
            className="bg-texas-orange hover:bg-texas-blue text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-64 bg-texas-blue text-white p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold">Customer Dashboard</h2>
                <p className="text-gray-300 text-sm">
                  Hey {user.user_metadata.first_name || "there"}, ready to breathe easier? 🌬️
                </p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "overview" ? "bg-texas-orange" : "hover:bg-texas-blue-700"
                  }`}
                >
                  <Home className="h-5 w-5" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab("appointments")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "appointments" ? "bg-texas-orange" : "hover:bg-texas-blue-700"
                  }`}
                >
                  <Calendar className="h-5 w-5" />
                  <span>Appointments</span>
                </button>

                <button
                  onClick={() => setActiveTab("services")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "services" ? "bg-texas-orange" : "hover:bg-texas-blue-700"
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  <span>Service History</span>
                </button>

                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "profile" ? "bg-texas-orange" : "hover:bg-texas-blue-700"
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "settings" ? "bg-texas-orange" : "hover:bg-texas-blue-700"
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>

                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors hover:bg-texas-blue-700"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {activeTab === "overview" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-texas-blue">Your Clean Air Command Center 💪</h2>
                    <div className="relative">
                      <Bell className="h-6 w-6 text-gray-500 cursor-pointer hover:text-texas-orange transition-colors" />
                      <span className="absolute -top-1 -right-1 bg-texas-orange text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {appointments.length > 0 ? appointments.length : 0}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-texas-cream rounded-xl p-6 shadow-md">
                      <h3 className="text-lg font-bold text-texas-blue mb-2">Your Next Air Quality Mission</h3>
                      {appointments.length > 0 ? (
                        <>
                          <div className="flex items-center text-gray-700 mb-1">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{new Date(appointments[0].appointment_date || "").toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{new Date(appointments[0].appointment_date || "").toLocaleTimeString()}</span>
                          </div>
                          <div className="mt-4">
                            <span className="bg-texas-orange text-white text-sm py-1 px-3 rounded-full">
                              {appointments[0].services?.name || "Service"}
                            </span>
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-700">No upcoming appointments</p>
                      )}
                    </div>

                    <div className="bg-texas-cream rounded-xl p-6 shadow-md">
                      <h3 className="text-lg font-bold text-texas-blue mb-2">Your Battle Position</h3>
                      {waitlistEntry ? (
                        <>
                          <p className="text-3xl font-bold text-texas-orange">#{waitlistEntry.position}</p>
                          <div className="mt-4">
                            <Link
                              href="/#waitlist"
                              className="bg-texas-orange hover:bg-texas-blue text-white text-sm py-1 px-3 rounded-full transition-colors"
                            >
                              Bump Position
                            </Link>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-gray-700">Not on waitlist</p>
                          <div className="mt-4">
                            <Link
                              href="/#waitlist"
                              className="bg-texas-orange hover:bg-texas-blue text-white text-sm py-1 px-3 rounded-full transition-colors"
                            >
                              Join Waitlist
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {waitlistEntry && (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                      <div className="bg-texas-blue p-4">
                        <h3 className="text-lg font-bold text-white">Waitlist Status</h3>
                      </div>
                      <div className="p-4">
                        <div className="text-center mb-4">
                          <div className="text-4xl font-bold text-texas-orange">#{waitlistEntry.position}</div>
                          <p className="text-gray-600 text-sm">Your current position</p>
                        </div>
                        <Link
                          href="/waitlist"
                          className="w-full bg-texas-orange hover:bg-texas-orange/80 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center justify-center"
                        >
                          <span>View Waitlist Dashboard</span>
                        </Link>
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-xl p-6 shadow-md mb-8">
                    <h3 className="text-lg font-bold text-texas-blue mb-4">Your Victory History</h3>
                    {loading ? (
                      <div className="text-center py-4">Loading service history...</div>
                    ) : serviceRequests.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 text-gray-700">Date</th>
                              <th className="text-left py-3 px-4 text-gray-700">Service</th>
                              <th className="text-left py-3 px-4 text-gray-700">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {serviceRequests.slice(0, 3).map((request) => (
                              <tr key={request.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{new Date(request.created_at || "").toLocaleDateString()}</td>
                                <td className="py-3 px-4">{request.services?.name || "Unknown Service"}</td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`bg-${request.status === "completed" ? "green" : request.status === "pending" ? "yellow" : "blue"}-100 text-${request.status === "completed" ? "green" : request.status === "pending" ? "yellow" : "blue"}-800 text-xs py-1 px-2 rounded-full`}
                                  >
                                    {request.status?.charAt(0).toUpperCase() + request.status?.slice(1) || "Unknown"}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-700 py-4">
                        No battles fought yet! Ready to start your clean air journey?
                      </p>
                    )}
                  </div>

                  <ServiceRequestForm userId={user.id} />
                </div>
              )}

              {activeTab === "appointments" && (
                <div>
                  <h2 className="text-2xl font-bold text-texas-blue mb-6">Your Appointments</h2>
                  {loading ? (
                    <div className="text-center py-4">Loading appointments...</div>
                  ) : appointments.length > 0 ? (
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 text-gray-700">Date</th>
                              <th className="text-left py-3 px-4 text-gray-700">Time</th>
                              <th className="text-left py-3 px-4 text-gray-700">Service</th>
                              <th className="text-left py-3 px-4 text-gray-700">Status</th>
                              <th className="text-left py-3 px-4 text-gray-700">Technician</th>
                            </tr>
                          </thead>
                          <tbody>
                            {appointments.map((appointment) => (
                              <tr key={appointment.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">
                                  {new Date(appointment.appointment_date || "").toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4">
                                  {new Date(appointment.appointment_date || "").toLocaleTimeString()}
                                </td>
                                <td className="py-3 px-4">{appointment.services?.name || "Unknown Service"}</td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`bg-${appointment.status === "completed" ? "green" : appointment.status === "pending" ? "yellow" : "blue"}-100 text-${appointment.status === "completed" ? "green" : appointment.status === "pending" ? "yellow" : "blue"}-800 text-xs py-1 px-2 rounded-full`}
                                  >
                                    {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1) ||
                                      "Unknown"}
                                  </span>
                                </td>
                                <td className="py-3 px-4">{appointment.technician || "Not assigned"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <p className="text-gray-700">No appointments scheduled</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "services" && (
                <div>
                  <h2 className="text-2xl font-bold text-texas-blue mb-6">Service History</h2>
                  {loading ? (
                    <div className="text-center py-4">Loading service history...</div>
                  ) : serviceRequests.length > 0 ? (
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 text-gray-700">Date</th>
                              <th className="text-left py-3 px-4 text-gray-700">Service</th>
                              <th className="text-left py-3 px-4 text-gray-700">Preferred Date</th>
                              <th className="text-left py-3 px-4 text-gray-700">Status</th>
                              <th className="text-left py-3 px-4 text-gray-700">Notes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {serviceRequests.map((request) => (
                              <tr key={request.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{new Date(request.created_at || "").toLocaleDateString()}</td>
                                <td className="py-3 px-4">{request.services?.name || "Unknown Service"}</td>
                                <td className="py-3 px-4">
                                  {request.preferred_date
                                    ? new Date(request.preferred_date).toLocaleDateString()
                                    : "Not specified"}
                                </td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`bg-${request.status === "completed" ? "green" : request.status === "pending" ? "yellow" : "blue"}-100 text-${request.status === "completed" ? "green" : request.status === "pending" ? "yellow" : "blue"}-800 text-xs py-1 px-2 rounded-full`}
                                  >
                                    {request.status?.charAt(0).toUpperCase() + request.status?.slice(1) || "Unknown"}
                                  </span>
                                </td>
                                <td className="py-3 px-4">{request.notes || "No notes"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl p-6 shadow-md">
                      <p className="text-gray-700">No service history available</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "profile" && (
                <div>
                  <h2 className="text-2xl font-bold text-texas-blue mb-6">Your Profile</h2>
                  <ProfileForm user={user} />
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h2 className="text-2xl font-bold text-texas-blue mb-6">Account Settings</h2>
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-texas-blue mb-4">Notification Preferences</h3>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input type="checkbox" id="email-notifications" className="mr-2" defaultChecked />
                            <label htmlFor="email-notifications">Email Notifications</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="sms-notifications" className="mr-2" defaultChecked />
                            <label htmlFor="sms-notifications">SMS Notifications</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="marketing-emails" className="mr-2" defaultChecked />
                            <label htmlFor="marketing-emails">Marketing Emails</label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-texas-blue mb-4">Change Password</h3>
                        <ChangePasswordForm />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileForm({ user }: { user: any }) {
  const [formData, setFormData] = useState({
    firstName: user.user_metadata.first_name || "",
    lastName: user.user_metadata.last_name || "",
    email: user.email || "",
    phone: user.user_metadata.phone || "",
    address: user.user_metadata.address || "",
    city: user.user_metadata.city || "",
    state: user.user_metadata.state || "",
    zip: user.user_metadata.zip || "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setSuccess("")

    try {
      const supabase = createClientSupabaseClient()

      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          full_name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
        },
      })

      if (error) {
        throw error
      }

      setSuccess("Profile updated successfully!")
    } catch (err: any) {
      setError(err.message || "Failed to update profile")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-texas-orange"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-texas-orange"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
          />
          <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
        </div>
        <div>
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-texas-orange"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-texas-orange"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-texas-orange"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-texas-orange"
            />
          </div>
          <div>
            <label htmlFor="zip" className="block text-gray-700 font-medium mb-2">
              ZIP
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-texas-orange"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-texas-orange hover:bg-texas-blue text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  )
}

function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setSuccess("")

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match")
      setIsSubmitting(false)
      return
    }

    try {
      const supabase = createClientSupabaseClient()

      // First, sign in with the current password to verify it
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: supabase.auth.getUser().then(({ data }) => data.user?.email || ""),
        password: formData.currentPassword,
      })

      if (signInError) {
        throw new Error("Current password is incorrect")
      }

      // Then update the password
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword,
      })

      if (error) {
        throw error
      }

      setSuccess("Password updated successfully!")
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (err: any) {
      setError(err.message || "Failed to update password")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">{success}</div>
      )}

      <div>
        <label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-2">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-texas-orange"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
          New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-texas-orange"
            required
            minLength={8}
          />
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-texas-orange"
            required
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          className="mr-2"
        />
        <label htmlFor="showPassword">Show passwords</label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-texas-orange hover:bg-texas-blue text-white font-bold py-2 px-6 rounded-lg transition-colors"
      >
        {isSubmitting ? "Updating..." : "Update Password"}
      </button>
    </form>
  )
}

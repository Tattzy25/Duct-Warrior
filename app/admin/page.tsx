"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Users,
  Calendar,
  BarChart2,
  Settings,
  FileText,
  Home,
  LogOut,
  Bell,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [expandedCustomer, setExpandedCustomer] = useState<number | null>(null)

  const customers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(214) 555-1234",
      plan: "Premium",
      nextService: "Oct 15, 2023",
      waitlistPosition: 1344,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(214) 555-5678",
      plan: "Basic",
      nextService: "Oct 18, 2023",
      waitlistPosition: 1356,
    },
    {
      id: 3,
      name: "Michael Williams",
      email: "michael.w@example.com",
      phone: "(214) 555-9012",
      plan: "Elite",
      nextService: "Oct 12, 2023",
      waitlistPosition: 1320,
    },
  ]

  const appointments = [
    {
      id: 1,
      customer: "John Smith",
      service: "Air Duct Cleaning",
      date: "Oct 15, 2023",
      time: "10:00 AM - 12:00 PM",
      status: "Scheduled",
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      service: "Dryer Vent Cleaning",
      date: "Oct 18, 2023",
      time: "1:00 PM - 3:00 PM",
      status: "Scheduled",
    },
    {
      id: 3,
      customer: "Michael Williams",
      service: "HVAC Maintenance",
      date: "Oct 12, 2023",
      time: "9:00 AM - 11:00 AM",
      status: "Scheduled",
    },
    {
      id: 4,
      customer: "Lisa Brown",
      service: "Chimney Sweeping",
      date: "Oct 20, 2023",
      time: "2:00 PM - 4:00 PM",
      status: "Scheduled",
    },
  ]

  const toggleCustomerDetails = (id: number) => {
    if (expandedCustomer === id) {
      setExpandedCustomer(null)
    } else {
      setExpandedCustomer(id)
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-64 bg-texas-blue text-white p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                <p className="text-gray-300 text-sm">DUCTWARRIORS Management</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "dashboard" ? "bg-texas-orange" : "hover:bg-texas-blue-700"
                  }`}
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => setActiveTab("customers")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "customers" ? "bg-texas-orange" : "hover:bg-texas-blue-700"
                  }`}
                >
                  <Users className="h-5 w-5" />
                  <span>Customers</span>
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
                  onClick={() => setActiveTab("reports")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "reports" ? "bg-texas-orange" : "hover:bg-texas-blue-700"
                  }`}
                >
                  <BarChart2 className="h-5 w-5" />
                  <span>Reports</span>
                </button>

                <button
                  onClick={() => setActiveTab("services")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "services" ? "bg-texas-orange" : "hover:bg-texas-blue-700"
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  <span>Services</span>
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

                <Link
                  href="/"
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors hover:bg-texas-blue-700"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Link>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {activeTab === "dashboard" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-texas-blue">Admin Dashboard</h2>
                    <div className="relative">
                      <Bell className="h-6 w-6 text-gray-500 cursor-pointer hover:text-texas-orange transition-colors" />
                      <span className="absolute -top-1 -right-1 bg-texas-orange text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        5
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-texas-cream rounded-xl p-6 shadow-md">
                      <h3 className="text-lg font-bold text-texas-blue mb-2">Total Customers</h3>
                      <p className="text-3xl font-bold text-texas-orange">1,245</p>
                    </div>

                    <div className="bg-texas-cream rounded-xl p-6 shadow-md">
                      <h3 className="text-lg font-bold text-texas-blue mb-2">Appointments Today</h3>
                      <p className="text-3xl font-bold text-texas-orange">8</p>
                    </div>

                    <div className="bg-texas-cream rounded-xl p-6 shadow-md">
                      <h3 className="text-lg font-bold text-texas-blue mb-2">Waitlist Total</h3>
                      <p className="text-3xl font-bold text-texas-orange">342</p>
                    </div>

                    <div className="bg-texas-cream rounded-xl p-6 shadow-md">
                      <h3 className="text-lg font-bold text-texas-blue mb-2">Monthly Revenue</h3>
                      <p className="text-3xl font-bold text-texas-orange">$24,850</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-texas-blue">Upcoming Appointments</h3>
                      <button
                        onClick={() => setActiveTab("appointments")}
                        className="text-texas-blue hover:text-texas-orange transition-colors text-sm font-bold"
                      >
                        View All
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 text-gray-700">Customer</th>
                            <th className="text-left py-3 px-4 text-gray-700">Service</th>
                            <th className="text-left py-3 px-4 text-gray-700">Date</th>
                            <th className="text-left py-3 px-4 text-gray-700">Time</th>
                            <th className="text-left py-3 px-4 text-gray-700">Status</th>
                            <th className="text-left py-3 px-4 text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointments.map((appointment) => (
                            <tr key={appointment.id} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4">{appointment.customer}</td>
                              <td className="py-3 px-4">{appointment.service}</td>
                              <td className="py-3 px-4">{appointment.date}</td>
                              <td className="py-3 px-4">{appointment.time}</td>
                              <td className="py-3 px-4">
                                <span className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded-full">
                                  {appointment.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex space-x-2">
                                  <button className="text-blue-600 hover:text-blue-800">
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-800">
                                    <Trash className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-texas-blue">Recent Customers</h3>
                      <button
                        onClick={() => setActiveTab("customers")}
                        className="text-texas-blue hover:text-texas-orange transition-colors text-sm font-bold"
                      >
                        View All
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 text-gray-700">Name</th>
                            <th className="text-left py-3 px-4 text-gray-700">Email</th>
                            <th className="text-left py-3 px-4 text-gray-700">Plan</th>
                            <th className="text-left py-3 px-4 text-gray-700">Next Service</th>
                            <th className="text-left py-3 px-4 text-gray-700">Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customers.map((customer) => (
                            <>
                              <tr key={customer.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{customer.name}</td>
                                <td className="py-3 px-4">{customer.email}</td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`text-xs py-1 px-2 rounded-full ${
                                      customer.plan === "Elite"
                                        ? "bg-purple-100 text-purple-800"
                                        : customer.plan === "Premium"
                                          ? "bg-blue-100 text-blue-800"
                                          : "bg-green-100 text-green-800"
                                    }`}
                                  >
                                    {customer.plan}
                                  </span>
                                </td>
                                <td className="py-3 px-4">{customer.nextService}</td>
                                <td className="py-3 px-4">
                                  <button
                                    onClick={() => toggleCustomerDetails(customer.id)}
                                    className="text-texas-blue hover:text-texas-orange transition-colors"
                                  >
                                    {expandedCustomer === customer.id ? (
                                      <ChevronUp className="h-5 w-5" />
                                    ) : (
                                      <ChevronDown className="h-5 w-5" />
                                    )}
                                  </button>
                                </td>
                              </tr>
                              {expandedCustomer === customer.id && (
                                <tr className="bg-gray-50">
                                  <td colSpan={5} className="py-4 px-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-sm text-gray-600">
                                          <strong>Phone:</strong> {customer.phone}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                          <strong>Waitlist Position:</strong> #{customer.waitlistPosition}
                                        </p>
                                      </div>
                                      <div className="flex justify-end space-x-2">
                                        <button className="bg-texas-blue text-white px-3 py-1 rounded-lg text-sm hover:bg-texas-orange transition-colors">
                                          Edit
                                        </button>
                                        <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition-colors">
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "customers" && (
                <div>
                  <h2 className="text-2xl font-bold text-texas-blue mb-6">Customer Management</h2>
                  {/* Customers content here */}
                </div>
              )}

              {activeTab === "appointments" && (
                <div>
                  <h2 className="text-2xl font-bold text-texas-blue mb-6">Appointment Schedule</h2>
                  {/* Appointments content here */}
                </div>
              )}

              {activeTab === "reports" && (
                <div>
                  <h2 className="text-2xl font-bold text-texas-blue mb-6">Reports & Analytics</h2>
                  {/* Reports content here */}
                </div>
              )}

              {activeTab === "services" && (
                <div>
                  <h2 className="text-2xl font-bold text-texas-blue mb-6">Service Management</h2>
                  {/* Services content here */}
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h2 className="text-2xl font-bold text-texas-blue mb-6">System Settings</h2>
                  {/* Settings content here */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

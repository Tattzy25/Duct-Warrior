"use client"

import type React from "react"

import { useState } from "react"
import { ArrowUp, Clock, Users, Zap, Award, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface PublicWaitlistProps {
  totalPeople: number
  recentChanges: any[]
  isAuthenticated: boolean
  userId?: string
}

export default function PublicWaitlist({ totalPeople, recentChanges, isAuthenticated, userId }: PublicWaitlistProps) {
  // No more random number generation - use the server-provided count
  const [showJoinForm, setShowJoinForm] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [position, setPosition] = useState<number | null>(null)

  // Removed the useEffect that randomly increased the count

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
      const form = new FormData()
      form.append("firstName", formData.firstName)
      form.append("lastName", formData.lastName)
      form.append("email", formData.email)
      if (userId) {
        form.append("userId", userId)
      }

      const response = await fetch("/api/waitlist", {
        method: "POST",
        body: form,
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(data.message)
        setPosition(data.position)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
        })
      } else {
        setError(data.message)
        if (data.position) {
          setPosition(data.position)
        }
      }
    } catch (error: any) {
      console.error("Waitlist submission error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Waitlist Counter */}
        <div className="bg-texas-blue p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Current Waitlist Size</h2>
          <div className="flex justify-center items-center">
            <motion.div
              key="waitlist-count"
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-7xl md:text-8xl font-bold text-texas-orange"
            >
              {totalPeople}
            </motion.div>
          </div>
          <p className="text-white mt-2">
            <Users className="inline mr-2 h-5 w-5" />
            <span className="font-medium">Warriors waiting for premium service</span>
          </p>
          <p className="text-white/80 text-sm mt-1">
            <Clock className="inline mr-1 h-4 w-4" />
            Join now to secure your spot!
          </p>
        </div>

        {/* Rest of the component remains the same */}
        {/* Join Waitlist CTA */}
        <div className="p-6">
          {position ? (
            <div className="bg-green-50 p-6 rounded-xl mb-6 text-center">
              <h3 className="text-xl font-bold text-texas-blue">Your Position: #{position}</h3>
              <p className="text-gray-700 mt-2 mb-4">
                You're already on our waitlist! Check back regularly for updates on your position.
              </p>
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="bg-texas-blue hover:bg-texas-blue/80 text-white font-bold py-3 px-6 rounded-full inline-flex items-center"
                >
                  View Dashboard <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              ) : (
                <Link
                  href="/auth/signin?redirect=/waitlist"
                  className="bg-texas-blue hover:bg-texas-blue/80 text-white font-bold py-3 px-6 rounded-full inline-flex items-center"
                >
                  Sign In to Track Position <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              )}
            </div>
          ) : showJoinForm ? (
            <div className="bg-gray-50 p-6 rounded-xl mb-6">
              <h3 className="text-xl font-bold text-texas-blue mb-4">Join Our Waitlist</h3>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-texas-blue focus:border-texas-blue"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-texas-blue focus:border-texas-blue"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-texas-blue focus:border-texas-blue"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-texas-orange hover:bg-texas-orange/80 text-white font-bold py-3 px-6 rounded-full transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Joining..." : "Join Waitlist"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowJoinForm(false)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-texas-orange/10 to-texas-orange/20 p-6 rounded-xl mb-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-texas-blue flex items-center">
                    <Zap className="mr-2 h-6 w-6 text-texas-orange" /> Join Our Waitlist
                  </h3>
                  <p className="text-gray-700 mt-1">Secure your spot for our premium services!</p>
                </div>
                <button
                  onClick={() => setShowJoinForm(true)}
                  className="mt-4 md:mt-0 bg-texas-orange hover:bg-texas-orange/80 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center"
                >
                  <Users className="mr-2 h-5 w-5" /> Join Now
                </button>
              </div>
            </div>
          )}

          {/* How It Works */}
          <div className="mb-6">
            <h3 className="font-bold text-texas-blue mb-4 text-xl">How Our Waitlist Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-texas-orange font-bold text-2xl mb-2">1</div>
                <h4 className="font-bold text-texas-blue mb-1">Join the Waitlist</h4>
                <p className="text-sm text-gray-600">Sign up with your name and email to secure your position.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-texas-orange font-bold text-2xl mb-2">2</div>
                <h4 className="font-bold text-texas-blue mb-1">Track Your Position</h4>
                <p className="text-sm text-gray-600">Create an account to monitor your place in line.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-texas-orange font-bold text-2xl mb-2">3</div>
                <h4 className="font-bold text-texas-blue mb-1">Get Fast-Tracked</h4>
                <p className="text-sm text-gray-600">Optionally pay to move up the line and get service faster.</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="font-bold text-texas-blue mb-3 flex items-center">
              <Award className="mr-2 h-5 w-5" /> Recent Fast Tracks
            </h3>
            {recentChanges && recentChanges.length > 0 ? (
              <ul className="space-y-2">
                {recentChanges.map((change, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-center">
                    <ArrowUp className="mr-2 h-4 w-4 text-texas-orange" />
                    Someone moved up {change.positions_moved} positions{" "}
                    {formatDistanceToNow(new Date(change.created_at), { addSuffix: true })}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

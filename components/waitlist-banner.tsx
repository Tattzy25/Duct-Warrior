"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowUp, Shield, Award } from "lucide-react"
import { joinWaitlist } from "@/app/actions/waitlist"
import { useAuth } from "@/context/auth-context"
import { createClientSupabaseClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function WaitlistBanner() {
  const router = useRouter()
  const { user, signUp } = useAuth()
  const [position, setPosition] = useState(1344)
  const [peopleAfterYou, setPeopleAfterYou] = useState(87)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showBumpModal, setShowBumpModal] = useState(false)
  const [bumpAmount, setBumpAmount] = useState(20)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState("")
  const [waitlistId, setWaitlistId] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is on waitlist
    const checkWaitlist = async () => {
      if (user) {
        const supabase = createClientSupabaseClient()
        const { data } = await supabase.from("waitlist").select("id, position").eq("user_id", user.id).single()

        if (data) {
          setIsLoggedIn(true)
          setPosition(data.position)
          setWaitlistId(data.id)
        }
      }
    }

    checkWaitlist()

    // Increase position randomly every 10-15 seconds for visual effect
    const interval = setInterval(
      () => {
        const increase = Math.floor(Math.random() * 5) + 1
        setPeopleAfterYou((prev) => prev + increase)
      },
      Math.floor(Math.random() * 5000) + 10000,
    )

    return () => clearInterval(interval)
  }, [user])

  useEffect(() => {
    // Pre-fill form with user data if available
    if (user) {
      setFormData({
        firstName: user.user_metadata.first_name || "",
        lastName: user.user_metadata.last_name || "",
        email: user.email || "",
      })
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError("")
    setFormSuccess("")

    try {
      // If user is not logged in, create an account
      if (!user) {
        // Generate a random password
        const randomPassword =
          Math.random().toString(36).slice(-10) + Math.random().toString(36).toUpperCase().slice(-2) + "!1"

        // Create user account
        const { error: signUpError } = await signUp(formData.email, randomPassword, {
          first_name: formData.firstName,
          last_name: formData.lastName,
          full_name: `${formData.firstName} ${formData.lastName}`,
        })

        if (signUpError) {
          throw new Error(signUpError.message)
        }
      }

      const formDataObj = new FormData()
      formDataObj.append("firstName", formData.firstName)
      formDataObj.append("lastName", formData.lastName)
      formDataObj.append("email", formData.email)

      if (user) {
        formDataObj.append("userId", user.id)
      }

      const result = await joinWaitlist(formDataObj)

      if (result.success) {
        setFormSuccess(result.message)
        setIsLoggedIn(true)
        setShowLoginModal(false)
        if (result.position) {
          setPosition(result.position)
        }
        if (result.id) {
          setWaitlistId(result.id)
        }

        // Redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        setFormError(result.message)
        if (result.position) {
          setPosition(result.position)
        }
      }
    } catch (error: any) {
      setFormError(error.message || "An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBumpSpot = async () => {
    if (!waitlistId) {
      setFormError("You need to be on the waitlist to bump your position")
      return
    }

    setIsSubmitting(true)
    setFormError("")
    setFormSuccess("")

    try {
      // Create a PayPal payment
      const response = await fetch("/api/paypal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          amount: getBumpPrice(),
          description: `Bump waitlist position by ${bumpAmount} spots`,
          returnUrl: `${window.location.origin}/payment/success?waitlistId=${waitlistId}&positions=${bumpAmount}`,
          cancelUrl: `${window.location.origin}/payment/cancel`,
        }),
      })

      const data = await response.json()

      if (data.success && data.approvalUrl) {
        // Redirect to PayPal for payment
        window.location.href = data.approvalUrl
      } else {
        setFormError("Failed to create payment. Please try again.")
      }
    } catch (error) {
      console.error("Error creating payment:", error)
      setFormError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getBumpPrice = () => {
    switch (bumpAmount) {
      case 20:
        return 25
      case 50:
        return 45
      case 100:
        return 80
      default:
        return 25
    }
  }

  return (
    <div className="waitlist-banner w-full bg-gradient-to-r from-texas-blue to-texas-blue-700" id="waitlist">
      <div className="container mx-auto px-4 py-5 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <span className="font-bold text-xl text-white">
              <Shield className="inline-block mr-2 h-5 w-5" /> Your Battle Position:
            </span>
            <span className="text-3xl font-bold text-texas-orange">#{position}</span>
            <span className="ml-2 text-sm font-medium text-white">({peopleAfterYou} warriors behind you)</span>
            <span className="ml-2 bg-white text-texas-orange px-2 py-1 rounded-full text-sm font-bold">
              30% OFF for Waitlist Warriors!
            </span>
          </div>

          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            {!isLoggedIn ? (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-texas-orange hover:bg-texas-orange/80 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center"
              >
                <Award className="mr-2 h-5 w-5" /> Join the Battle
              </button>
            ) : (
              <button
                onClick={() => setShowBumpModal(true)}
                className="bg-white hover:bg-gray-100 text-texas-blue font-bold py-3 px-6 rounded-full transition-colors flex items-center"
              >
                <ArrowUp className="mr-1 h-4 w-4" /> Advance Your Position
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Join Waitlist Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold text-texas-blue mb-4">Join Our Clean Air Battalion</h3>
            <p className="mb-4 text-gray-700">
              Sign up to reserve your spot in our elite waitlist and get 30% OFF your next service!
            </p>

            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {formError}
              </div>
            )}

            {formSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                {formSuccess}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-texas-orange"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-texas-orange"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-texas-orange"
                />
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-texas-orange hover:bg-texas-blue text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Join the Battle"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bump Position Modal */}
      {showBumpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold text-texas-blue mb-4">Advance Your Battle Position</h3>
            <p className="mb-4 text-gray-700">
              Gain tactical advantage! Move ahead in our waitlist and get your service faster.
            </p>

            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {formError}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Select Your Advance Strategy</label>
              <select
                value={bumpAmount}
                onChange={(e) => setBumpAmount(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-texas-orange"
              >
                <option value={20}>Tactical Advance: 20 spots - $25</option>
                <option value={50}>Strategic Advance: 50 spots - $45</option>
                <option value={100}>Elite Advance: 100 spots - $80</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleBumpSpot}
                disabled={isSubmitting}
                className="bg-texas-orange hover:bg-texas-blue text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Execute Advance"}
              </button>
              <button
                onClick={() => setShowBumpModal(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

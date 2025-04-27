"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { joinWaitlist } from "@/app/actions/waitlist"

export default function WaitlistBanner() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [position, setPosition] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const result = await joinWaitlist({ email, firstName, lastName })

      if (result.success) {
        setSuccess(true)
        setPosition(result.position)
        setEmail("")
        setFirstName("")
        setLastName("")
      } else {
        setError(result.error || "Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full py-8 bg-texas-orange">
      <div className="container mx-auto px-4">
        <div className="rounded-[50px] py-8 px-8 bg-[#ff7b1c] shadow-[10px_10px_20px_#d95600,-10px_-10px_20px_#ff9633] mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Join 347+ Texans on our Waitlist</h2>
              <p className="text-white mt-2">Get priority scheduling and exclusive offers</p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/waitlist"
                className="bg-gradient-to-r from-theme-accent to-theme-accent-end hover:opacity-90 text-theme-text font-bold py-3 px-6 rounded-full text-lg transition-all flex items-center"
              >
                Learn More
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-theme-accent to-theme-accent-end hover:opacity-90 text-theme-text font-bold py-3 px-6 rounded-full text-lg transition-all flex items-center"
              >
                Join Now <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#ff7b1c] shadow-[10px_10px_20px_#d95600,-10px_-10px_20px_#ff9633] rounded-[50px] p-8 max-w-md w-full relative">
            <button
              onClick={() => {
                setIsOpen(false)
                setSuccess(false)
                setError("")
              }}
              className="absolute top-4 right-6 text-white text-2xl font-bold"
            >
              ×
            </button>

            {success ? (
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold text-white mb-4">You're on the List!</h3>
                {position && <p className="text-white mb-4">Your position on our waitlist is secured.</p>}
                <p className="text-white mb-6">We'll notify you when it's your turn for service.</p>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setSuccess(false)
                  }}
                  className="bg-gradient-to-r from-theme-accent to-theme-accent-end hover:opacity-90 text-theme-text font-bold py-3 px-6 rounded-full text-lg transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Join Our Waitlist</h3>

                {error && (
                  <div className="bg-red-900/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-4">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="firstName" className="block text-white font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-orange-100/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-white/70"
                      placeholder="Your first name"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="lastName" className="block text-white font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-orange-100/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-white/70"
                      placeholder="Your last name"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="email" className="block text-white font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-orange-100/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-white/70"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-theme-accent to-theme-accent-end hover:opacity-90 text-theme-text font-bold py-3 px-6 rounded-full text-lg transition-all flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Join Waitlist"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

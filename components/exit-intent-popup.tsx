"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const hasShownPopup = useRef(false)

  useEffect(() => {
    // Check if we've already shown the popup in this session
    const popupShown = sessionStorage.getItem("exitPopupShown")
    if (popupShown) {
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves through the top of the page
      if (e.clientY <= 0 && !hasShownPopup.current) {
        setIsVisible(true)
        hasShownPopup.current = true
        sessionStorage.setItem("exitPopupShown", "true")

        // Track this event
        if (window.trackEvent) {
          window.trackEvent("exit_intent_triggered")
        }
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        setIsVisible(false)
      }
    }

    // Add event listeners
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("keydown", handleKeyDown)

    // Clean up
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isVisible])

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsVisible(false)
      }
    }

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isVisible])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("Please enter your email address")
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      // Track this event
      if (window.trackEvent) {
        window.trackEvent("exit_popup_submit", { email })
      }

      // Submit to MailerLite
      const response = await fetch("/api/mailerlite/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          tags: ["exit-intent", "discount-offer"],
          fields: {
            source: "exit-intent-popup",
            discount_offered: "15%",
          },
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to subscribe")
      }

      setSuccess(true)

      // Hide popup after 3 seconds
      setTimeout(() => {
        setIsVisible(false)
      }, 3000)
    } catch (err: any) {
      console.error("Subscription error:", err)
      setError(err.message || "Failed to subscribe. Please try again.")

      // Track error
      if (window.trackEvent) {
        window.trackEvent("exit_popup_error", { error: err.message })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div ref={popupRef} className="bg-white rounded-lg shadow-xl max-w-md w-full relative overflow-hidden">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>

        {/* Orange header */}
        <div className="bg-[#ff7a00] p-4 text-white text-center">
          <h2 className="text-2xl font-bold">Wait! Don't Miss Out!</h2>
          <p className="text-white/90 mt-1">Get 15% off your first service</p>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-6">
              <div className="text-green-600 text-5xl mb-4">✓</div>
              <h3 className="text-xl font-bold mb-2">Thank You!</h3>
              <p className="text-gray-600">Your discount code has been sent to your email.</p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-4">
                Join our newsletter to receive your exclusive discount code and stay updated on our latest services and
                promotions.
              </p>

              {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7a00]"
                    placeholder="Your name"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7a00]"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#ff7a00] text-white py-2 px-4 rounded-md font-medium hover:bg-[#e66f00] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Subscribing..." : "Get My 15% Discount"}
                </button>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

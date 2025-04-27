"use client"

import { useState, useEffect } from "react"
import { ArrowUp, Clock, Users, Zap, Award } from "lucide-react"
import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"

interface WaitlistDashboardProps {
  waitlistEntry: any
  peopleAhead: number
  recentChanges: any[]
  userId: string
}

export default function WaitlistDashboard({
  waitlistEntry,
  peopleAhead: initialPeopleAhead,
  recentChanges,
  userId,
}: WaitlistDashboardProps) {
  const [position, setPosition] = useState(waitlistEntry?.position || 0)
  const [peopleAhead, setPeopleAhead] = useState(initialPeopleAhead)
  const [showFastTrackModal, setShowFastTrackModal] = useState(false)
  const [fastTrackAmount, setFastTrackAmount] = useState(20)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [totalPeople, setTotalPeople] = useState(position + Math.floor(Math.random() * 50) + 30)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly increase total people in line (for visual effect)
      setTotalPeople((prev) => prev + Math.floor(Math.random() * 3) + 1)

      // Occasionally decrease people ahead (simulate others leaving)
      if (Math.random() > 0.7 && peopleAhead > 0) {
        setPeopleAhead((prev) => Math.max(0, prev - 1))
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const handleFastTrack = async () => {
    setIsProcessing(true)
    setError("")
    setSuccessMessage("")

    try {
      // Create a PayPal payment
      const response = await fetch("/api/paypal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          amount: getFastTrackPrice(),
          description: `Fast Track: Jump ${fastTrackAmount} positions in waitlist`,
          returnUrl: `${window.location.origin}/payment/success?waitlistId=${waitlistEntry.id}&positions=${fastTrackAmount}`,
          cancelUrl: `${window.location.origin}/payment/cancel`,
        }),
      })

      const data = await response.json()

      if (data.success && data.approvalUrl) {
        // Redirect to PayPal for payment
        window.location.href = data.approvalUrl
      } else {
        setError("Failed to create payment. Please try again.")
      }
    } catch (error) {
      console.error("Error creating payment:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const getFastTrackPrice = () => {
    switch (fastTrackAmount) {
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

  if (!waitlistEntry) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-texas-blue mb-4">You're not on the waitlist yet!</h2>
        <p className="mb-6">Join our waitlist to secure your spot for our premium services.</p>
        <a
          href="/#waitlist"
          className="bg-texas-orange hover:bg-texas-orange/80 text-white font-bold py-3 px-6 rounded-full inline-flex items-center"
        >
          <Users className="mr-2 h-5 w-5" /> Join Waitlist
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Position Display */}
        <div className="bg-texas-blue p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Your Current Position</h2>
          <div className="flex justify-center items-center">
            <motion.div
              key={position}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-7xl md:text-8xl font-bold text-texas-orange"
            >
              #{position}
            </motion.div>
          </div>
          <p className="text-white mt-2">
            <Users className="inline mr-2 h-5 w-5" />
            <span className="font-medium">{peopleAhead} people ahead of you</span>
          </p>
          <p className="text-white/80 text-sm mt-1">
            <Clock className="inline mr-1 h-4 w-4" />
            Joined {formatDistanceToNow(new Date(waitlistEntry.created_at), { addSuffix: true })}
          </p>
        </div>

        {/* Stats & Fast Track */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-texas-blue mb-2 flex items-center">
                <Users className="mr-2 h-5 w-5" /> Total Warriors Waiting
              </h3>
              <div className="text-4xl font-bold text-texas-blue">{totalPeople}</div>
              <p className="text-sm text-gray-600 mt-1">Growing every day!</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-texas-blue mb-2 flex items-center">
                <Zap className="mr-2 h-5 w-5" /> Estimated Wait Time
              </h3>
              <div className="text-4xl font-bold text-texas-blue">{Math.ceil(position / 10)} days</div>
              <p className="text-sm text-gray-600 mt-1">Based on current service rate</p>
            </div>
          </div>

          {/* Fast Track Button */}
          <div className="bg-gradient-to-r from-texas-orange/10 to-texas-orange/20 p-6 rounded-xl mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-texas-blue flex items-center">
                  <Zap className="mr-2 h-6 w-6 text-texas-orange" /> Fast Track Your Position
                </h3>
                <p className="text-gray-700 mt-1">Jump ahead in line and get your service faster!</p>
              </div>
              <button
                onClick={() => setShowFastTrackModal(true)}
                className="mt-4 md:mt-0 bg-texas-orange hover:bg-texas-orange/80 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center"
              >
                <ArrowUp className="mr-2 h-5 w-5" /> Fast Track Now
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="font-bold text-texas-blue mb-3 flex items-center">
              <Award className="mr-2 h-5 w-5" /> Recent Fast Tracks
            </h3>
            {recentChanges.length > 0 ? (
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

      {/* Fast Track Modal */}
      {showFastTrackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold text-texas-blue mb-4">Fast Track Your Position</h3>
            <p className="mb-4 text-gray-700">Choose how many positions you want to advance in our waitlist.</p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                {successMessage}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Select Your Fast Track Option</label>
              <div className="space-y-3">
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${fastTrackAmount === 20 ? "border-texas-orange bg-texas-orange/10" : "border-gray-200 hover:border-texas-orange/50"}`}
                  onClick={() => setFastTrackAmount(20)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-texas-blue">Basic Fast Track</div>
                      <div className="text-sm text-gray-600">Jump ahead 20 positions</div>
                    </div>
                    <div className="text-xl font-bold text-texas-orange">$25</div>
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${fastTrackAmount === 50 ? "border-texas-orange bg-texas-orange/10" : "border-gray-200 hover:border-texas-orange/50"}`}
                  onClick={() => setFastTrackAmount(50)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-texas-blue">Premium Fast Track</div>
                      <div className="text-sm text-gray-600">Jump ahead 50 positions</div>
                    </div>
                    <div className="text-xl font-bold text-texas-orange">$45</div>
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${fastTrackAmount === 100 ? "border-texas-orange bg-texas-orange/10" : "border-gray-200 hover:border-texas-orange/50"}`}
                  onClick={() => setFastTrackAmount(100)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-texas-blue">Elite Fast Track</div>
                      <div className="text-sm text-gray-600">Jump ahead 100 positions</div>
                    </div>
                    <div className="text-xl font-bold text-texas-orange">$80</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleFastTrack}
                disabled={isProcessing}
                className="bg-texas-orange hover:bg-texas-blue text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" /> Fast Track Now
                  </>
                )}
              </button>
              <button
                onClick={() => setShowFastTrackModal(false)}
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

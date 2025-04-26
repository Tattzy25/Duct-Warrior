"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"
import { bumpWaitlistPosition } from "@/app/actions/waitlist"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(true)
  const [error, setError] = useState("")
  const [newPosition, setNewPosition] = useState<number | null>(null)

  useEffect(() => {
    const processPayment = async () => {
      try {
        const waitlistId = searchParams?.get("waitlistId")
        const positions = searchParams?.get("positions")
        const paymentId = searchParams?.get("paymentId")

        if (!waitlistId || !positions || !paymentId) {
          setError("Missing required payment information")
          setIsProcessing(false)
          return
        }

        // Calculate amount based on positions
        let amountPaid = 0
        const positionsNum = Number.parseInt(positions)

        if (positionsNum === 25) amountPaid = 25
        else if (positionsNum === 50) amountPaid = 45
        else if (positionsNum === 100) amountPaid = 80
        else amountPaid = positionsNum // Fallback

        const result = await bumpWaitlistPosition(waitlistId, positionsNum, paymentId, amountPaid)

        if (result.success) {
          setNewPosition(result.newPosition)
        } else {
          setError(result.message)
        }
      } catch (err) {
        console.error("Error processing payment:", err)
        setError("Failed to process payment. Please contact support.")
      } finally {
        setIsProcessing(false)
      }
    }

    processPayment()
  }, [searchParams, router])

  return (
    <div className="bg-texas-cream min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 text-center">
          {isProcessing ? (
            <div>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-texas-orange mx-auto mb-6"></div>
              <h1 className="text-2xl font-bold text-texas-blue mb-4">Processing Your Payment</h1>
              <p className="text-gray-700">Please wait while we process your payment...</p>
            </div>
          ) : error ? (
            <div>
              <div className="bg-red-100 text-red-700 p-4 rounded-full inline-block mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-texas-blue mb-4">Payment Error</h1>
              <p className="text-gray-700 mb-6">{error}</p>
              <Link
                href="/dashboard"
                className="bg-texas-orange hover:bg-texas-blue text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center"
              >
                Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          ) : (
            <div>
              <div className="text-green-500 mb-6">
                <CheckCircle className="h-16 w-16 mx-auto" />
              </div>
              <h1 className="text-2xl font-bold text-texas-blue mb-4">Payment Successful!</h1>
              <p className="text-gray-700 mb-2">Your waitlist position has been successfully bumped!</p>
              {newPosition && (
                <p className="text-xl font-bold text-texas-orange mb-6">Your new position: #{newPosition}</p>
              )}
              <div className="space-y-4">
                <Link
                  href="/dashboard"
                  className="bg-texas-orange hover:bg-texas-blue text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center"
                >
                  Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <div>
                  <Link href="/" className="text-texas-blue hover:text-texas-orange font-medium transition-colors">
                    Return to Home
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

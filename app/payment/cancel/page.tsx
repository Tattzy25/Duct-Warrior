"use client"

import Link from "next/link"
import { XCircle, ArrowRight } from "lucide-react"

export default function PaymentCancelPage() {
  return (
    <div className="bg-texas-cream min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="text-red-500 mb-6">
            <XCircle className="h-16 w-16 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-texas-blue mb-4">Payment Cancelled</h1>
          <p className="text-gray-700 mb-6">
            Your payment has been cancelled. No charges have been made to your account.
          </p>
          <div className="space-y-4">
            <Link
              href="/#waitlist"
              className="bg-texas-orange hover:bg-texas-blue text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center"
            >
              Try Again <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <div>
              <Link href="/" className="text-texas-blue hover:text-texas-orange font-medium transition-colors">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { bumpWaitlistPosition } from "@/app/actions/waitlist"
import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Payment Successful - Duct Warriors",
  description: "Your payment was successful. Thank you for your purchase!",
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/signin")
  }

  const paymentId = searchParams.paymentId as string
  const waitlistId = searchParams.waitlistId as string
  const positions = searchParams.positions ? Number.parseInt(searchParams.positions as string) : 0

  // Verify the payment exists and belongs to the user
  const { data: payment } = await supabase
    .from("payments")
    .select("*")
    .eq("payment_id", paymentId)
    .eq("user_id", session.user.id)
    .single()

  if (!payment && paymentId) {
    // Payment not found, redirect to home
    redirect("/")
  }

  // If this is a waitlist bump payment, process it
  if (waitlistId && positions > 0 && paymentId) {
    // Get the amount paid from the payment record
    const amountPaid = payment?.amount || 0

    // Process the waitlist bump
    await bumpWaitlistPosition(waitlistId, positions, paymentId, amountPaid)

    // Get the updated waitlist position
    const { data: updatedWaitlist } = await supabase.from("waitlist").select("position").eq("id", waitlistId).single()

    return (
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-texas-blue p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-white">Payment Successful!</h1>
            <p className="text-white/80 mt-2">Thank you for your Fast Track purchase</p>
          </div>

          <div className="p-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-texas-blue mb-2">Your Position Has Been Updated!</h2>
              <p className="text-gray-600 mb-4">You've successfully moved up {positions} positions in our waitlist.</p>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <p className="text-gray-600 mb-2">Your new position:</p>
                <div className="text-5xl font-bold text-texas-orange">#{updatedWaitlist?.position || "Updated"}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/waitlist"
                className="bg-texas-blue hover:bg-texas-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                View Waitlist Dashboard
              </Link>
              <Link
                href="/"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <ArrowRight className="mr-2 h-5 w-5" /> Return Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Generic payment success page
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-texas-blue p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-white">Payment Successful!</h1>
          <p className="text-white/80 mt-2">Thank you for your purchase</p>
        </div>

        <div className="p-8 text-center">
          <p className="text-gray-600 mb-6">
            Your payment has been processed successfully. You will receive a confirmation email shortly.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dashboard"
              className="bg-texas-blue hover:bg-texas-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              <ArrowRight className="mr-2 h-5 w-5" /> Return Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

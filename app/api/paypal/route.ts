import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { userId, amount, description, returnUrl, cancelUrl } = await request.json()

    // PayPal API credentials
    const clientId = process.env.PAYPAL_CLIENT_ID
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: "PayPal credentials not configured" }, { status: 500 })
    }

    // Get access token
    const authResponse = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    })

    const authData = await authResponse.json()

    if (!authResponse.ok) {
      return NextResponse.json({ error: "Failed to authenticate with PayPal" }, { status: 500 })
    }

    // Create order
    const orderResponse = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData.access_token}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount.toString(),
            },
            description,
          },
        ],
        application_context: {
          return_url: returnUrl,
          cancel_url: cancelUrl,
        },
      }),
    })

    const orderData = await orderResponse.json()

    if (!orderResponse.ok) {
      return NextResponse.json({ error: "Failed to create PayPal order" }, { status: 500 })
    }

    // Store payment info in database
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("payments")
      .insert({
        user_id: userId,
        payment_id: orderData.id,
        amount,
        status: "pending",
        payment_method: "paypal",
        description,
      })
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to record payment" }, { status: 500 })
    }

    // Return the PayPal approval URL
    const approvalUrl = orderData.links.find((link: any) => link.rel === "approve").href

    return NextResponse.json({
      success: true,
      paymentId: data[0].id,
      approvalUrl,
    })
  } catch (error) {
    console.error("PayPal API error:", error)
    return NextResponse.json({ error: "Failed to process payment" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const paymentId = url.searchParams.get("paymentId")
    const payerId = url.searchParams.get("PayerID")

    if (!paymentId || !payerId) {
      return NextResponse.json({ error: "Missing payment information" }, { status: 400 })
    }

    // PayPal API credentials
    const clientId = process.env.PAYPAL_CLIENT_ID
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET

    // Get access token
    const authResponse = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    })

    const authData = await authResponse.json()

    // Execute payment
    const captureResponse = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${paymentId}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData.access_token}`,
      },
    })

    const captureData = await captureResponse.json()

    if (!captureResponse.ok) {
      return NextResponse.json({ error: "Failed to capture payment" }, { status: 500 })
    }

    // Update payment status in database
    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("payments").update({ status: "completed" }).eq("payment_id", paymentId)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to update payment status" }, { status: 500 })
    }

    return NextResponse.redirect(new URL("/payment/success", request.url))
  } catch (error) {
    console.error("PayPal API error:", error)
    return NextResponse.redirect(new URL("/payment/error", request.url))
  }
}

import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

// Define the system prompt for Duct Daddy AI
const systemPrompt = `You are Duct Daddy AI, the helpful assistant for DUCTWARRIORS, a professional air duct cleaning company in McKinney, TX. 

Your capabilities:
1. Answer questions about DUCTWARRIORS services (air duct cleaning, attic insulation, chimney sweeping, dryer vent services, fireplace services)
2. Help users schedule appointments
3. Add users to the waitlist
4. Assist with account management (sign in, sign up, password reset)
5. Help users manage and sign up for subscription packages

When users want to:
- Schedule an appointment: Ask for their preferred service, date, time, and contact information. Then create the appointment in the system.
- Join the waitlist: Collect their name, email, and phone number, then add them to the waitlist.
- Sign up for a subscription: Explain the available packages and help them select one.

Important guidelines:
- Be friendly, professional, and helpful.
- If you don't know something, admit it and offer to connect them with a human representative.
- Don't make up information about pricing or services.
- Pricing for services: Air Duct Cleaning ($299), Attic Insulation ($1200), Chimney Sweeping ($189), Dryer Vent Cleaning ($149), Fireplace Services ($249)
- Subscription packages: Basic ($99/month), Premium ($149/month), Ultimate ($199/month)
- For technical issues or complex questions, suggest contacting customer support at support@ductwarriors.com or (123) 456-7890.

Remember, you're representing DUCTWARRIORS, so maintain a professional tone while being conversational and helpful.`

// Cache for common responses to improve performance
const responseCache = new Map()
const CACHE_TTL = 1000 * 60 * 60 // 1 hour

export async function POST(req: NextRequest) {
  try {
    const { messages, userId } = await req.json()

    // Create a new server-side Supabase client for each request
    const supabase = createServerSupabaseClient()

    // Get the last user message
    const lastUserMessage = messages.filter((m: any) => m.role === "user").pop()

    // Check cache for common questions
    const cacheKey = lastUserMessage?.content.toLowerCase().trim()
    if (cacheKey && responseCache.has(cacheKey)) {
      const cachedResponse = responseCache.get(cacheKey)
      if (cachedResponse.timestamp > Date.now() - CACHE_TTL) {
        console.log("Using cached response for:", cacheKey)
        return NextResponse.json({ role: "assistant", content: cachedResponse.text })
      } else {
        // Remove expired cache entry
        responseCache.delete(cacheKey)
      }
    }

    // Try primary model first (Llama 4)
    try {
      console.log("Attempting to use primary model: meta-llama/llama-4-scout-17b-16e-instruct")
      const { text: aiResponse } = await generateText({
        model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
        messages,
        system: systemPrompt,
        maxTokens: 1000,
        temperature: 0.7,
      })

      // Check if we need to perform any actions based on the conversation
      const actionNeeded = detectAction(lastUserMessage?.content, aiResponse)

      // Perform the necessary actions
      if (actionNeeded) {
        await performAction(actionNeeded, lastUserMessage?.content, aiResponse, userId, supabase)
      }

      // Cache the response for common questions
      if (cacheKey && aiResponse.length > 0) {
        responseCache.set(cacheKey, {
          text: aiResponse,
          timestamp: Date.now(),
        })
      }

      // Log successful response
      console.log("Primary model response successful")

      return NextResponse.json({ role: "assistant", content: aiResponse })
    } catch (primaryError) {
      // Log the primary model error
      console.error("Primary model error:", primaryError)

      // Fall back to GPT-4o
      console.log("Falling back to GPT-4o")
      try {
        const { text: fallbackResponse } = await generateText({
          model: openai("gpt-4o"),
          messages,
          system: systemPrompt,
          maxTokens: 1000,
          temperature: 0.7,
        })

        // Check if we need to perform any actions based on the conversation
        const actionNeeded = detectAction(lastUserMessage?.content, fallbackResponse)

        // Perform the necessary actions
        if (actionNeeded) {
          await performAction(actionNeeded, lastUserMessage?.content, fallbackResponse, userId, supabase)
        }

        // Cache the response for common questions
        if (cacheKey && fallbackResponse.length > 0) {
          responseCache.set(cacheKey, {
            text: fallbackResponse,
            timestamp: Date.now(),
          })
        }

        // Log successful fallback
        console.log("Fallback to GPT-4o successful")

        return NextResponse.json({ role: "assistant", content: fallbackResponse })
      } catch (fallbackError) {
        // Both models failed, log the error
        console.error("Fallback model error:", fallbackError)

        // Return a generic response
        return NextResponse.json({
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment or contact our support team at support@ductwarriors.com if you need immediate assistance.",
        })
      }
    }
  } catch (error: any) {
    console.error("Error in Duct Daddy AI:", error)
    return NextResponse.json({
      role: "assistant",
      content:
        "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment or contact our support team at support@ductwarriors.com if you need immediate assistance.",
    })
  }
}

// Helper function to detect if an action is needed
function detectAction(userMessage: string, aiResponse: string): string | null {
  if (!userMessage) return null

  userMessage = userMessage.toLowerCase()
  aiResponse = aiResponse.toLowerCase()

  // Check for appointment scheduling intent
  if (
    (userMessage.includes("schedule") ||
      userMessage.includes("appointment") ||
      userMessage.includes("book") ||
      userMessage.includes("set up") ||
      userMessage.includes("reserve")) &&
    (aiResponse.includes("schedule") ||
      aiResponse.includes("appointment") ||
      aiResponse.includes("book") ||
      aiResponse.includes("date") ||
      aiResponse.includes("time"))
  ) {
    return "schedule_appointment"
  }

  // Check for waitlist intent
  if (
    (userMessage.includes("waitlist") ||
      userMessage.includes("wait list") ||
      userMessage.includes("join") ||
      userMessage.includes("sign up") ||
      userMessage.includes("add me")) &&
    (aiResponse.includes("waitlist") ||
      aiResponse.includes("wait list") ||
      aiResponse.includes("position") ||
      aiResponse.includes("sign up"))
  ) {
    return "join_waitlist"
  }

  // Check for subscription intent
  if (
    (userMessage.includes("subscription") ||
      userMessage.includes("package") ||
      userMessage.includes("plan") ||
      userMessage.includes("monthly") ||
      userMessage.includes("service plan")) &&
    (aiResponse.includes("subscription") ||
      aiResponse.includes("package") ||
      aiResponse.includes("plan") ||
      aiResponse.includes("monthly") ||
      aiResponse.includes("basic") ||
      aiResponse.includes("premium") ||
      aiResponse.includes("ultimate"))
  ) {
    return "subscription"
  }

  return null
}

// Helper function to perform actions based on detected intent
async function performAction(
  action: string,
  userMessage: string,
  aiResponse: string,
  userId: string | null,
  supabase: any,
) {
  try {
    switch (action) {
      case "schedule_appointment":
        // Extract appointment details from the conversation
        const appointmentDetails = extractAppointmentDetails(userMessage, aiResponse)
        if (appointmentDetails && appointmentDetails.service && appointmentDetails.date) {
          // Get service ID
          const { data: serviceData } = await supabase
            .from("services")
            .select("id")
            .eq("name", appointmentDetails.service)
            .single()

          if (serviceData) {
            // Create appointment request
            await supabase.from("service_requests").insert({
              user_id: userId || "guest-user",
              service_id: serviceData.id,
              preferred_date: appointmentDetails.date,
              preferred_time: appointmentDetails.time || "morning",
              notes: appointmentDetails.notes || "Scheduled via Duct Daddy AI",
              status: "pending",
              contact_email: appointmentDetails.email,
              contact_phone: appointmentDetails.phone,
            })
            console.log("Appointment scheduled successfully")
          }
        }
        break

      case "join_waitlist":
        // Extract waitlist details from the conversation
        const waitlistDetails = extractWaitlistDetails(userMessage, aiResponse)
        if (waitlistDetails && waitlistDetails.email) {
          // Get the highest current position
          const { data: highestPosition } = await supabase
            .from("waitlist")
            .select("position")
            .order("position", { ascending: false })
            .limit(1)
            .single()

          const newPosition = highestPosition ? highestPosition.position + 1 : 1344

          // Add to waitlist
          await supabase.from("waitlist").insert({
            user_id: userId || null,
            name: waitlistDetails.name || "AI Waitlist Entry",
            email: waitlistDetails.email,
            phone: waitlistDetails.phone || null,
            position: newPosition,
          })

          // Also add to email subscribers
          await supabase.from("email_subscribers").upsert(
            {
              email: waitlistDetails.email,
              first_name: waitlistDetails.firstName || "",
              last_name: waitlistDetails.lastName || "",
              subscribed: true,
            },
            { onConflict: "email" },
          )
          console.log("User added to waitlist successfully")
        }
        break

      case "subscription":
        // Extract subscription details
        const subscriptionDetails = extractSubscriptionDetails(userMessage, aiResponse)
        if (subscriptionDetails && subscriptionDetails.plan) {
          // Log subscription interest with more details
          console.log("Subscription interest detected:", {
            plan: subscriptionDetails.plan,
            userId: userId,
            email: subscriptionDetails.email,
            phone: subscriptionDetails.phone,
          })

          // In a real implementation, you would create a subscription record
          // and possibly initiate a payment flow
        }
        break

      default:
        break
    }
  } catch (error) {
    console.error(`Error performing action ${action}:`, error)
  }
}

// Helper functions remain the same
function extractAppointmentDetails(userMessage: string, aiResponse: string) {
  // Implementation remains the same
  const combinedText = `${userMessage.toLowerCase()} ${aiResponse.toLowerCase()}`

  // Service extraction - more comprehensive
  const services = {
    "air duct cleaning": ["air duct", "duct cleaning", "clean ducts", "clean air ducts", "air ducts"],
    "attic insulation": ["attic", "insulation", "insulate", "attic insulation"],
    "chimney sweeping": ["chimney", "sweep", "chimney sweep", "chimney cleaning", "clean chimney"],
    "dryer vent cleaning": ["dryer", "vent", "dryer vent", "clean dryer", "dryer vent cleaning"],
    "fireplace services": ["fireplace", "fire place", "fireplace service", "fireplace cleaning"],
  }

  let service = null
  for (const [serviceName, keywords] of Object.entries(services)) {
    if (keywords.some((keyword) => combinedText.includes(keyword))) {
      service = serviceName
      break
    }
  }

  // Date extraction - multiple formats
  let date = null

  // Format: MM/DD/YYYY or MM-DD-YYYY
  const standardDateRegex = /(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})/
  const standardDateMatch = combinedText.match(standardDateRegex)

  // Format: Month Day, Year (e.g., January 15, 2023)
  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ]
  const textDateRegex = new RegExp(
    `(${monthNames.join("|")})\\s+(\\d{1,2})(?:st|nd|rd|th)?(?:\\s*,?\\s*(\\d{4}))?`,
    "i",
  )
  const textDateMatch = combinedText.match(textDateRegex)

  // Format: Day of week (e.g., next Monday, this Friday)
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  const dayOfWeekRegex = new RegExp(`(this|next)\\s+(${daysOfWeek.join("|")})`, "i")
  const dayOfWeekMatch = combinedText.match(dayOfWeekRegex)

  // Format: Relative dates (e.g., tomorrow, next week)
  const relativeDateRegex = /(tomorrow|next week|in a week|in \d+ days)/i
  const relativeDateMatch = combinedText.match(relativeDateRegex)

  if (standardDateMatch) {
    // Format as YYYY-MM-DD
    const month = standardDateMatch[1].padStart(2, "0")
    const day = standardDateMatch[2].padStart(2, "0")
    const year = standardDateMatch[3].length === 2 ? `20${standardDateMatch[3]}` : standardDateMatch[3]
    date = `${year}-${month}-${day}`
  } else if (textDateMatch) {
    const month = monthNames.indexOf(textDateMatch[1].toLowerCase()) + 1
    const day = Number.parseInt(textDateMatch[2])
    const year = textDateMatch[3] ? Number.parseInt(textDateMatch[3]) : new Date().getFullYear()
    date = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
  } else if (dayOfWeekMatch) {
    const today = new Date()
    const targetDay = daysOfWeek.indexOf(dayOfWeekMatch[2].toLowerCase())
    const currentDay = today.getDay() // 0 = Sunday, 1 = Monday, etc.

    let daysToAdd = targetDay - currentDay
    if (daysToAdd <= 0) daysToAdd += 7 // If target day is today or earlier in the week, go to next week
    if (dayOfWeekMatch[1].toLowerCase() === "next") daysToAdd += 7 // If "next" is specified, add another week

    const targetDate = new Date(today)
    targetDate.setDate(today.getDate() + daysToAdd)
    date = targetDate.toISOString().split("T")[0]
  } else if (relativeDateMatch) {
    const today = new Date()
    let daysToAdd = 0

    if (relativeDateMatch[0].toLowerCase() === "tomorrow") {
      daysToAdd = 1
    } else if (
      relativeDateMatch[0].toLowerCase() === "next week" ||
      relativeDateMatch[0].toLowerCase() === "in a week"
    ) {
      daysToAdd = 7
    } else {
      // Extract number from "in X days"
      const daysMatch = relativeDateMatch[0].match(/in (\d+) days/)
      if (daysMatch) {
        daysToAdd = Number.parseInt(daysMatch[1])
      }
    }

    const targetDate = new Date(today)
    targetDate.setDate(today.getDate() + daysToAdd)
    date = targetDate.toISOString().split("T")[0]
  } else {
    // Default to a week from now if no date found
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    date = nextWeek.toISOString().split("T")[0]
  }

  // Time preference extraction
  let time = null
  if (combinedText.includes("morning")) {
    time = "morning"
  } else if (combinedText.includes("afternoon")) {
    time = "afternoon"
  } else if (combinedText.includes("evening")) {
    time = "evening"
  }

  // Extract specific times (e.g., 3:00 PM, 10am)
  const timeRegex = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i
  const timeMatch = combinedText.match(timeRegex)
  if (timeMatch) {
    const hour = Number.parseInt(timeMatch[1])
    const minute = timeMatch[2] ? timeMatch[2] : "00"
    const period = timeMatch[3].toLowerCase()
    time = `${hour}:${minute} ${period}`
  }

  // Extract contact information
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
  const emailMatch = combinedText.match(emailRegex)

  const phoneRegex = /\b(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})\b/
  const phoneMatch = combinedText.match(phoneRegex)

  return {
    service,
    date,
    time,
    notes: userMessage,
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
  }
}

function extractWaitlistDetails(userMessage: string, aiResponse: string) {
  // Implementation remains the same
  const combinedText = `${userMessage.toLowerCase()} ${aiResponse.toLowerCase()}`

  // Extract email using a simple regex
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
  const emailMatch = combinedText.match(emailRegex)

  // Extract phone using a simple regex
  const phoneRegex = /\b(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})\b/
  const phoneMatch = combinedText.match(phoneRegex)

  // Extract name - more comprehensive approach
  let name = null
  let firstName = null
  let lastName = null

  // Common name patterns
  const namePatterns = [
    /my name is ([A-Za-z\s]+)/i,
    /name:?\s+([A-Za-z\s]+)/i,
    /i am ([A-Za-z\s]+)/i,
    /this is ([A-Za-z\s]+)/i,
    /([A-Za-z\s]+) here/i,
  ]

  for (const pattern of namePatterns) {
    const match = combinedText.match(pattern)
    if (match) {
      name = match[1].trim()
      break
    }
  }

  // If we found a name, try to split into first and last
  if (name) {
    const nameParts = name.split(/\s+/)
    if (nameParts.length >= 1) {
      firstName = nameParts[0]
      if (nameParts.length >= 2) {
        lastName = nameParts.slice(1).join(" ")
      }
    }
  }

  return {
    name,
    firstName,
    lastName,
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
  }
}

function extractSubscriptionDetails(userMessage: string, aiResponse: string) {
  // Implementation remains the same
  const combinedText = `${userMessage.toLowerCase()} ${aiResponse.toLowerCase()}`

  // Extract subscription plan
  let plan = null
  if (combinedText.includes("basic") || combinedText.includes("$99")) {
    plan = "basic"
  } else if (combinedText.includes("premium") || combinedText.includes("$149")) {
    plan = "premium"
  } else if (combinedText.includes("ultimate") || combinedText.includes("$199")) {
    plan = "ultimate"
  }

  // Extract contact information
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
  const emailMatch = combinedText.match(emailRegex)

  const phoneRegex = /\b(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})\b/
  const phoneMatch = combinedText.match(phoneRegex)

  return {
    plan,
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
  }
}

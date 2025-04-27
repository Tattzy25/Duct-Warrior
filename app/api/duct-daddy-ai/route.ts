import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

// Constants
const CACHE_TTL = 1000 * 60 * 60 // 1 hour
const DEFAULT_WAITLIST_POSITION = 1344
const SUPPORT_EMAIL = "support@ductwarriors.com"
const MAX_RETRY_ATTEMPTS = 3

// Types
type Message = {
  role: string
  content: string
}

type CacheEntry = {
  text: string
  timestamp: number
}

type AppointmentDetails = {
  service: string | null
  date: string | null
  time: string | null
  notes: string | null
  email: string | null
  phone: string | null
}

type WaitlistDetails = {
  name: string | null
  firstName: string | null
  lastName: string | null
  email: string | null
  phone: string | null
}

type SubscriptionDetails = {
  plan: string | null
  email: string | null
  phone: string | null
}

type ActionType = "schedule_appointment" | "join_waitlist" | "subscription" | null

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
- For technical issues or complex questions, suggest contacting customer support at ${SUPPORT_EMAIL} or (123) 456-7890.

Remember, you're representing DUCTWARRIORS, so maintain a professional tone while being conversational and helpful.`

// Cache for common responses to improve performance
const responseCache = new Map<string, CacheEntry>()

export async function POST(req: NextRequest) {
  try {
    // Input validation
    if (!req.body) {
      return createErrorResponse("Invalid request: Missing request body")
    }

    let requestData: { messages: Message[]; userId: string | null }
    try {
      requestData = await req.json()
    } catch (error) {
      return createErrorResponse("Invalid request: Could not parse JSON body")
    }

    const { messages, userId } = requestData

    if (!Array.isArray(messages) || messages.length === 0) {
      return createErrorResponse("Invalid request: Messages array is empty or invalid")
    }

    // Create a new server-side Supabase client for each request
    const supabase = createServerSupabaseClient()

    // Get the last user message
    const lastUserMessage = messages.filter((m) => m.role === "user").pop()

    if (!lastUserMessage || !lastUserMessage.content) {
      return createErrorResponse("Invalid request: No user message found")
    }

    // Check cache for common questions
    const cacheKey = lastUserMessage.content.toLowerCase().trim()
    const cachedResponse = checkCache(cacheKey)
    if (cachedResponse) {
      console.log("Using cached response for:", cacheKey)
      return NextResponse.json({ role: "assistant", content: cachedResponse })
    }

    // Try primary model first (Llama 4)
    try {
      console.log("Attempting to use primary model: meta-llama/llama-4-scout-17b-16e-instruct")
      const aiResponse = await generateAIResponse(messages, "primary")

      // Process the response
      await processAIResponse(aiResponse, lastUserMessage.content, userId, supabase, cacheKey)

      // Return the response
      return NextResponse.json({ role: "assistant", content: aiResponse })
    } catch (primaryError) {
      // Log the primary model error
      console.error("Primary model error:", primaryError)

      // Fall back to GPT-4o
      try {
        console.log("Falling back to GPT-4o")
        const fallbackResponse = await generateAIResponse(messages, "fallback")

        // Process the response
        await processAIResponse(fallbackResponse, lastUserMessage.content, userId, supabase, cacheKey)

        // Return the response
        return NextResponse.json({ role: "assistant", content: fallbackResponse })
      } catch (fallbackError) {
        // Both models failed, log the error
        console.error("Fallback model error:", fallbackError)

        // Return a generic response
        return createErrorResponse(
          `I'm sorry, I'm having trouble processing your request right now. Please try again in a moment or contact our support team at ${SUPPORT_EMAIL} if you need immediate assistance.`,
        )
      }
    }
  } catch (error: any) {
    console.error("Error in Duct Daddy AI:", error)
    return createErrorResponse(
      `I'm sorry, I'm having trouble processing your request right now. Please try again in a moment or contact our support team at ${SUPPORT_EMAIL} if you need immediate assistance.`,
    )
  }
}

/**
 * Creates a standardized error response
 */
function createErrorResponse(message: string): NextResponse {
  console.error(`Error response: ${message}`)
  return NextResponse.json({
    role: "assistant",
    content: message,
  })
}

/**
 * Checks if a response is cached and still valid
 */
function checkCache(cacheKey: string): string | null {
  if (cacheKey && responseCache.has(cacheKey)) {
    const cachedResponse = responseCache.get(cacheKey)
    if (cachedResponse && cachedResponse.timestamp > Date.now() - CACHE_TTL) {
      return cachedResponse.text
    } else {
      // Remove expired cache entry
      responseCache.delete(cacheKey)
    }
  }
  return null
}

/**
 * Generates a response from the AI model
 */
async function generateAIResponse(messages: Message[], modelType: "primary" | "fallback"): Promise<string> {
  const modelConfig = {
    primary: {
      model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
      name: "Llama 4",
    },
    fallback: {
      model: openai("gpt-4o"),
      name: "GPT-4o",
    },
  }

  const config = modelConfig[modelType]
  console.log(`Generating response with ${config.name}...`)

  const { text } = await generateText({
    model: config.model,
    messages,
    system: systemPrompt,
    maxTokens: 1000,
    temperature: 0.7,
  })

  console.log(`${config.name} response generated successfully`)
  return text
}

/**
 * Processes the AI response, detects actions, and caches the response
 */
async function processAIResponse(
  aiResponse: string,
  userMessage: string,
  userId: string | null,
  supabase: any,
  cacheKey: string,
): Promise<void> {
  // Check if we need to perform any actions based on the conversation
  const actionNeeded = detectAction(userMessage, aiResponse)

  // Perform the necessary actions
  if (actionNeeded) {
    await performAction(actionNeeded, userMessage, aiResponse, userId, supabase)
  }

  // Cache the response for common questions
  if (cacheKey && aiResponse.length > 0) {
    responseCache.set(cacheKey, {
      text: aiResponse,
      timestamp: Date.now(),
    })
  }
}

/**
 * Detects if an action is needed based on the conversation
 */
function detectAction(userMessage: string, aiResponse: string): ActionType {
  if (!userMessage || !aiResponse) return null

  const userMessageLower = userMessage.toLowerCase()
  const aiResponseLower = aiResponse.toLowerCase()

  // Check for appointment scheduling intent
  if (isAppointmentIntent(userMessageLower, aiResponseLower)) {
    return "schedule_appointment"
  }

  // Check for waitlist intent
  if (isWaitlistIntent(userMessageLower, aiResponseLower)) {
    return "join_waitlist"
  }

  // Check for subscription intent
  if (isSubscriptionIntent(userMessageLower, aiResponseLower)) {
    return "subscription"
  }

  return null
}

/**
 * Checks if the conversation indicates an appointment scheduling intent
 */
function isAppointmentIntent(userMessage: string, aiResponse: string): boolean {
  const appointmentKeywords = ["schedule", "appointment", "book", "set up", "reserve"]
  const responseKeywords = ["schedule", "appointment", "book", "date", "time"]

  return (
    appointmentKeywords.some((keyword) => userMessage.includes(keyword)) &&
    responseKeywords.some((keyword) => aiResponse.includes(keyword))
  )
}

/**
 * Checks if the conversation indicates a waitlist intent
 */
function isWaitlistIntent(userMessage: string, aiResponse: string): boolean {
  const waitlistKeywords = ["waitlist", "wait list", "join", "sign up", "add me"]
  const responseKeywords = ["waitlist", "wait list", "position", "sign up"]

  return (
    waitlistKeywords.some((keyword) => userMessage.includes(keyword)) &&
    responseKeywords.some((keyword) => aiResponse.includes(keyword))
  )
}

/**
 * Checks if the conversation indicates a subscription intent
 */
function isSubscriptionIntent(userMessage: string, aiResponse: string): boolean {
  const subscriptionKeywords = ["subscription", "package", "plan", "monthly", "service plan"]
  const responseKeywords = ["subscription", "package", "plan", "monthly", "basic", "premium", "ultimate"]

  return (
    subscriptionKeywords.some((keyword) => userMessage.includes(keyword)) &&
    responseKeywords.some((keyword) => aiResponse.includes(keyword))
  )
}

/**
 * Performs actions based on detected intent
 */
async function performAction(
  action: ActionType,
  userMessage: string,
  aiResponse: string,
  userId: string | null,
  supabase: any,
): Promise<void> {
  try {
    switch (action) {
      case "schedule_appointment":
        await handleAppointmentScheduling(userMessage, aiResponse, userId, supabase)
        break

      case "join_waitlist":
        await handleWaitlistJoin(userMessage, aiResponse, userId, supabase)
        break

      case "subscription":
        await handleSubscription(userMessage, aiResponse, userId, supabase)
        break

      default:
        break
    }
  } catch (error) {
    console.error(`Error performing action ${action}:`, error)
  }
}

/**
 * Handles appointment scheduling
 */
async function handleAppointmentScheduling(
  userMessage: string,
  aiResponse: string,
  userId: string | null,
  supabase: any,
): Promise<void> {
  // Extract appointment details from the conversation
  const appointmentDetails = extractAppointmentDetails(userMessage, aiResponse)

  if (!appointmentDetails || !appointmentDetails.service || !appointmentDetails.date) {
    console.log("Insufficient appointment details extracted")
    return
  }

  try {
    // Get service ID
    const { data: serviceData, error: serviceError } = await supabase
      .from("services")
      .select("id")
      .eq("name", appointmentDetails.service)
      .single()

    if (serviceError || !serviceData) {
      console.error("Error fetching service:", serviceError)
      return
    }

    // Create appointment request
    const { error: insertError } = await supabase.from("service_requests").insert({
      user_id: userId || "guest-user",
      service_id: serviceData.id,
      preferred_date: appointmentDetails.date,
      preferred_time: appointmentDetails.time || "morning",
      notes: appointmentDetails.notes || "Scheduled via Duct Daddy AI",
      status: "pending",
      contact_email: appointmentDetails.email,
      contact_phone: appointmentDetails.phone,
    })

    if (insertError) {
      console.error("Error creating appointment:", insertError)
      return
    }

    console.log("Appointment scheduled successfully")
  } catch (error) {
    console.error("Error in appointment scheduling:", error)
  }
}

/**
 * Handles waitlist join
 */
async function handleWaitlistJoin(
  userMessage: string,
  aiResponse: string,
  userId: string | null,
  supabase: any,
): Promise<void> {
  // Extract waitlist details from the conversation
  const waitlistDetails = extractWaitlistDetails(userMessage, aiResponse)

  if (!waitlistDetails || !waitlistDetails.email) {
    console.log("Insufficient waitlist details extracted")
    return
  }

  try {
    // Get the highest current position
    const { data: highestPosition, error: positionError } = await supabase
      .from("waitlist")
      .select("position")
      .order("position", { ascending: false })
      .limit(1)
      .single()

    if (positionError && positionError.code !== "PGRST116") {
      console.error("Error fetching highest position:", positionError)
    }

    const newPosition = highestPosition ? highestPosition.position + 1 : DEFAULT_WAITLIST_POSITION

    // Add to waitlist
    const { error: waitlistError } = await supabase.from("waitlist").insert({
      user_id: userId || null,
      name: waitlistDetails.name || "AI Waitlist Entry",
      email: waitlistDetails.email,
      phone: waitlistDetails.phone || null,
      position: newPosition,
    })

    if (waitlistError) {
      console.error("Error adding to waitlist:", waitlistError)
      return
    }

    // Also add to email subscribers
    const { error: subscriberError } = await supabase.from("email_subscribers").upsert(
      {
        email: waitlistDetails.email,
        first_name: waitlistDetails.firstName || "",
        last_name: waitlistDetails.lastName || "",
        subscribed: true,
      },
      { onConflict: "email" },
    )

    if (subscriberError) {
      console.error("Error adding to email subscribers:", subscriberError)
    }

    console.log("User added to waitlist successfully")
  } catch (error) {
    console.error("Error in waitlist join:", error)
  }
}

/**
 * Handles subscription
 */
async function handleSubscription(
  userMessage: string,
  aiResponse: string,
  userId: string | null,
  supabase: any,
): Promise<void> {
  // Extract subscription details
  const subscriptionDetails = extractSubscriptionDetails(userMessage, aiResponse)

  if (!subscriptionDetails || !subscriptionDetails.plan) {
    console.log("Insufficient subscription details extracted")
    return
  }

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

/**
 * Extracts appointment details from conversation
 */
function extractAppointmentDetails(userMessage: string, aiResponse: string): AppointmentDetails {
  const combinedText = `${userMessage.toLowerCase()} ${aiResponse.toLowerCase()}`

  return {
    service: extractService(combinedText),
    date: extractDate(combinedText),
    time: extractTime(combinedText),
    notes: userMessage,
    email: extractEmail(combinedText),
    phone: extractPhone(combinedText),
  }
}

/**
 * Extracts service type from text
 */
function extractService(text: string): string | null {
  const services = {
    "air duct cleaning": ["air duct", "duct cleaning", "clean ducts", "clean air ducts", "air ducts"],
    "attic insulation": ["attic", "insulation", "insulate", "attic insulation"],
    "chimney sweeping": ["chimney", "sweep", "chimney sweep", "chimney cleaning", "clean chimney"],
    "dryer vent cleaning": ["dryer", "vent", "dryer vent", "clean dryer", "dryer vent cleaning"],
    "fireplace services": ["fireplace", "fire place", "fireplace service", "fireplace cleaning"],
  }

  for (const [serviceName, keywords] of Object.entries(services)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      return serviceName
    }
  }

  return null
}

/**
 * Extracts date from text
 */
function extractDate(text: string): string | null {
  // Format: MM/DD/YYYY or MM-DD-YYYY
  const standardDateRegex = /(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})/
  const standardDateMatch = text.match(standardDateRegex)

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
  const textDateMatch = text.match(textDateRegex)

  // Format: Day of week (e.g., next Monday, this Friday)
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  const dayOfWeekRegex = new RegExp(`(this|next)\\s+(${daysOfWeek.join("|")})`, "i")
  const dayOfWeekMatch = text.match(dayOfWeekRegex)

  // Format: Relative dates (e.g., tomorrow, next week)
  const relativeDateRegex = /(tomorrow|next week|in a week|in \d+ days)/i
  const relativeDateMatch = text.match(relativeDateRegex)

  if (standardDateMatch) {
    // Format as YYYY-MM-DD
    const month = standardDateMatch[1].padStart(2, "0")
    const day = standardDateMatch[2].padStart(2, "0")
    const year = standardDateMatch[3].length === 2 ? `20${standardDateMatch[3]}` : standardDateMatch[3]
    return `${year}-${month}-${day}`
  }

  if (textDateMatch) {
    const month = monthNames.indexOf(textDateMatch[1].toLowerCase()) + 1
    const day = Number.parseInt(textDateMatch[2])
    const year = textDateMatch[3] ? Number.parseInt(textDateMatch[3]) : new Date().getFullYear()
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
  }

  if (dayOfWeekMatch) {
    return calculateDateFromDayOfWeek(dayOfWeekMatch[1].toLowerCase(), dayOfWeekMatch[2].toLowerCase())
  }

  if (relativeDateMatch) {
    return calculateRelativeDate(relativeDateMatch[0].toLowerCase())
  }

  // Default to a week from now if no date found
  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 7)
  return nextWeek.toISOString().split("T")[0]
}

/**
 * Calculates date from day of week reference
 */
function calculateDateFromDayOfWeek(qualifier: string, dayName: string): string {
  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const today = new Date()
  const targetDay = daysOfWeek.indexOf(dayName)
  const currentDay = today.getDay() // 0 = Sunday, 1 = Monday, etc.

  let daysToAdd = targetDay - currentDay
  if (daysToAdd <= 0) daysToAdd += 7 // If target day is today or earlier in the week, go to next week
  if (qualifier === "next") daysToAdd += 7 // If "next" is specified, add another week

  const targetDate = new Date(today)
  targetDate.setDate(today.getDate() + daysToAdd)
  return targetDate.toISOString().split("T")[0]
}

/**
 * Calculates date from relative reference
 */
function calculateRelativeDate(relativeDate: string): string {
  const today = new Date()
  let daysToAdd = 0

  if (relativeDate === "tomorrow") {
    daysToAdd = 1
  } else if (relativeDate === "next week" || relativeDate === "in a week") {
    daysToAdd = 7
  } else {
    // Extract number from "in X days"
    const daysMatch = relativeDate.match(/in (\d+) days/)
    if (daysMatch) {
      daysToAdd = Number.parseInt(daysMatch[1])
    }
  }

  const targetDate = new Date(today)
  targetDate.setDate(today.getDate() + daysToAdd)
  return targetDate.toISOString().split("T")[0]
}

/**
 * Extracts time from text
 */
function extractTime(text: string): string | null {
  if (text.includes("morning")) {
    return "morning"
  } else if (text.includes("afternoon")) {
    return "afternoon"
  } else if (text.includes("evening")) {
    return "evening"
  }

  // Extract specific times (e.g., 3:00 PM, 10am)
  const timeRegex = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i
  const timeMatch = text.match(timeRegex)
  if (timeMatch) {
    const hour = Number.parseInt(timeMatch[1])
    const minute = timeMatch[2] ? timeMatch[2] : "00"
    const period = timeMatch[3].toLowerCase()
    return `${hour}:${minute} ${period}`
  }

  return null
}

/**
 * Extracts email from text
 */
function extractEmail(text: string): string | null {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
  const emailMatch = text.match(emailRegex)
  return emailMatch ? emailMatch[0] : null
}

/**
 * Extracts phone from text
 */
function extractPhone(text: string): string | null {
  const phoneRegex = /\b(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})\b/
  const phoneMatch = text.match(phoneRegex)
  return phoneMatch ? phoneMatch[0] : null
}

/**
 * Extracts waitlist details from conversation
 */
function extractWaitlistDetails(userMessage: string, aiResponse: string): WaitlistDetails {
  const combinedText = `${userMessage.toLowerCase()} ${aiResponse.toLowerCase()}`

  // Extract name
  const name = extractName(combinedText)
  const { firstName, lastName } = splitName(name)

  return {
    name,
    firstName,
    lastName,
    email: extractEmail(combinedText),
    phone: extractPhone(combinedText),
  }
}

/**
 * Extracts name from text
 */
function extractName(text: string): string | null {
  // Common name patterns
  const namePatterns = [
    /my name is ([A-Za-z\s]+)/i,
    /name:?\s+([A-Za-z\s]+)/i,
    /i am ([A-Za-z\s]+)/i,
    /this is ([A-Za-z\s]+)/i,
    /([A-Za-z\s]+) here/i,
  ]

  for (const pattern of namePatterns) {
    const match = text.match(pattern)
    if (match) {
      return match[1].trim()
    }
  }

  return null
}

/**
 * Splits full name into first and last name
 */
function splitName(name: string | null): { firstName: string | null; lastName: string | null } {
  if (!name) {
    return { firstName: null, lastName: null }
  }

  const nameParts = name.split(/\s+/)
  if (nameParts.length >= 1) {
    const firstName = nameParts[0]
    const lastName = nameParts.length >= 2 ? nameParts.slice(1).join(" ") : null
    return { firstName, lastName }
  }

  return { firstName: null, lastName: null }
}

/**
 * Extracts subscription details from conversation
 */
function extractSubscriptionDetails(userMessage: string, aiResponse: string): SubscriptionDetails {
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

  return {
    plan,
    email: extractEmail(combinedText),
    phone: extractPhone(combinedText),
  }
}

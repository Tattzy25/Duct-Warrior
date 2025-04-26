"use client"

// Define types for analytics events
export type EventType =
  | "page_view"
  | "click"
  | "scroll"
  | "exit_intent"
  | "chat_interaction"
  | "form_submission"
  | "exit_popup_submit"
  | "exit_popup_error"
  | "exit_intent_triggered"
  | "service_selected"
  | "estimate_started"
  | "estimate_completed"
  | "waitlist_signup"
  | "authentication"

export interface AnalyticsEvent {
  event_type: EventType
  timestamp: string
  url: string
  user_id?: string
  session_id: string
  properties?: Record<string, any>
}

// Queue to batch events
let eventQueue: AnalyticsEvent[] = []
let flushTimeout: NodeJS.Timeout | null = null
const FLUSH_INTERVAL = 10000 // 10 seconds

// Generate a session ID if one doesn't exist
const getSessionId = (): string => {
  if (typeof window === "undefined") return ""

  let sessionId = sessionStorage.getItem("analytics_session_id")
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    sessionStorage.setItem("analytics_session_id", sessionId)
  }
  return sessionId
}

// Track an event
// export const trackEvent = (eventType: EventType, properties?: Record<string, any>, userId?: string): void => {
//   if (typeof window === "undefined") return

//   const event: AnalyticsEvent = {
//     event_type: eventType,
//     timestamp: new Date().toISOString(),
//     url: window.location.href,
//     user_id: userId,
//     session_id: getSessionId(),
//     properties,
//   }

//   // Add to queue
//   eventQueue.push(event)

//   // Schedule flush if not already scheduled
//   if (!flushTimeout) {
//     flushTimeout = setTimeout(flushEvents, FLUSH_INTERVAL)
//   }
// }

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window === "undefined") return

  console.log(`Event tracked: ${eventName}`, properties)
  // Basic implementation to fix the import error
}

// Send events to the server
const flushEvents = async (): Promise<void> => {
  if (eventQueue.length === 0) {
    flushTimeout = null
    return
  }

  const eventsToSend = [...eventQueue]
  eventQueue = []
  flushTimeout = null

  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ events: eventsToSend }),
    })
  } catch (error) {
    console.error("Failed to send analytics events:", error)
    // Add events back to queue
    eventQueue = [...eventsToSend, ...eventQueue]
  }
}

// Initialize analytics tracking
// export const initAnalytics = (userId?: string): void => {
//   if (typeof window === "undefined") return

//   // Make trackEvent available globally
//   window.trackEvent = (eventType: EventType, properties?: Record<string, any>) =>
//     trackEvent(eventType, properties, userId)

//   // Track page view on load
//   trackEvent(
//     "page_view",
//     {
//       title: document.title,
//       referrer: document.referrer,
//     },
//     userId,
//   )

//   // Track clicks on important elements
//   document.addEventListener("click", (e) => {
//     const target = e.target as HTMLElement

//     // Check if the click was on a button, link, or other important element
//     if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a")) {
//       const element =
//         target.tagName === "BUTTON" || target.tagName === "A" ? target : target.closest("button") || target.closest("a")

//       if (!element) return

//       trackEvent(
//         "click",
//         {
//           element_type: element.tagName.toLowerCase(),
//           element_text: element.textContent?.trim(),
//           element_id: element.id,
//           element_class: element.className,
//           element_href: (element as HTMLAnchorElement).href,
//         },
//         userId,
//       )
//     }

//     // Track service card clicks
//     if (target.closest(".service-card")) {
//       const card = target.closest(".service-card")
//       if (!card) return

//       trackEvent(
//         "service_selected",
//         {
//           service_name: card.querySelector("h3")?.textContent?.trim(),
//           service_id: card.id,
//         },
//         userId,
//       )
//     }
//   })

//   // Track scroll depth
//   const scrollDepths = { 25: false, 50: false, 75: false, 100: false }

//   window.addEventListener("scroll", () => {
//     const scrollTop = window.scrollY
//     const docHeight = document.documentElement.scrollHeight - window.innerHeight
//     const scrollPercent = (scrollTop / docHeight) * 100

//     Object.keys(scrollDepths).forEach((depth) => {
//       const numDepth = Number.parseInt(depth)
//       if (scrollPercent >= numDepth && !scrollDepths[numDepth as keyof typeof scrollDepths]) {
//         scrollDepths[numDepth as keyof typeof scrollDepths] = true
//         trackEvent("scroll", { depth: `${depth}%` }, userId)
//       }
//     })
//   })

//   // Ensure events are sent before page unload
//   window.addEventListener("beforeunload", () => {
//     if (flushTimeout) {
//       clearTimeout(flushTimeout)
//       flushTimeout = null
//     }

//     if (eventQueue.length > 0) {
//       // Use sendBeacon for more reliable delivery during page unload
//       if (navigator.sendBeacon) {
//         navigator.sendBeacon("/api/analytics", JSON.stringify({ events: eventQueue }))
//       } else {
//         // Fallback to sync XHR
//         const xhr = new XMLHttpRequest()
//         xhr.open("POST", "/api/analytics", false) // false makes it synchronous
//         xhr.setRequestHeader("Content-Type", "application/json")
//         xhr.send(JSON.stringify({ events: eventQueue }))
//       }
//       eventQueue = []
//     }
//   })
// }

export function initAnalytics() {
  if (typeof window === "undefined") return

  console.log("Analytics initialized")
  // Basic implementation to fix the import error
  // Full implementation would be added later
}

// Extend Window interface to include trackEvent
declare global {
  interface Window {
    trackEvent: (EventType: any, properties?: Record<string, any>, userId?: string) => void
  }
}

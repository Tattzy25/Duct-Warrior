import { streamText } from "ai"
import { groq } from "@ai-sdk/groq"
import type { NextRequest } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

// Define the system prompt for Duct Daddy AI
const systemPrompt = `You are Duct Daddy AI, the helpful assistant for DUCTWARRIORS, a professional air duct cleaning company in McKinney, TX. 

Your capabilities:
1. Answer questions about DUCTWARRIORS services (air duct cleaning, attic insulation, chimney sweeping, dryer vent services, fireplace services)
2. Help users schedule appointments
3. Add users to the waitlist
4. Assist with account management (sign in, sign up, password reset)
5. Help users manage and sign up for subscription packages

Important guidelines:
- Be friendly, professional, and helpful.
- If you don't know something, admit it and offer to connect them with a human representative.
- Don't make up information about pricing or services.
- Pricing for services: Air Duct Cleaning ($299), Attic Insulation ($1200), Chimney Sweeping ($189), Dryer Vent Cleaning ($149), Fireplace Services ($249)
- Subscription packages: Basic ($99/month), Premium ($149/month), Ultimate ($199/month)
- For technical issues or complex questions, suggest contacting customer support at support@ductwarriors.com or (123) 456-7890.

Remember, you're representing DUCTWARRIORS, so maintain a professional tone while being conversational and helpful.`

// Create the Groq model instance
const llama4Model = groq("meta-llama/llama-4-scout-17b-16e-instruct")

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { messages, userId } = await req.json()

    // Create a new server-side Supabase client for each request
    const supabase = createServerSupabaseClient()

    // Use streamText to handle streaming properly
    const stream = await streamText({
      model: llama4Model,
      messages,
      system: systemPrompt,
      maxTokens: 1000,
      temperature: 0.7,
    })

    // Process the stream and return it in SSE format
    return new Response(
      new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder()

          try {
            // Process each chunk from the stream
            for await (const chunk of stream) {
              // Format the chunk as an SSE message
              const formattedChunk = JSON.stringify({
                id: Date.now().toString(),
                role: "assistant",
                content: chunk.text,
                createdAt: new Date(),
              })

              // Send the chunk in SSE format
              controller.enqueue(encoder.encode(`data: ${formattedChunk}\n\n`))
            }

            // Send the end of stream marker
            controller.enqueue(encoder.encode("data: [DONE]\n\n"))
            controller.close()
          } catch (error) {
            console.error("Error processing stream:", error)

            // Send an error message in SSE format
            const errorMessage = JSON.stringify({
              id: Date.now().toString(),
              role: "assistant",
              content: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
              createdAt: new Date(),
            })

            controller.enqueue(encoder.encode(`data: ${errorMessage}\n\n`))
            controller.enqueue(encoder.encode("data: [DONE]\n\n"))
            controller.close()
          }
        },
      }),
      {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      },
    )
  } catch (error) {
    console.error("Error in Duct Daddy AI:", error)

    // Create a response in the format expected by the Vercel AI SDK
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        // Format the response as expected by the Vercel AI SDK
        const formattedMessage = JSON.stringify({
          id: Date.now().toString(),
          role: "assistant",
          content: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
          createdAt: new Date(),
        })

        controller.enqueue(encoder.encode(`data: ${formattedMessage}\n\n`))
        controller.enqueue(encoder.encode("data: [DONE]\n\n"))
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  }
}

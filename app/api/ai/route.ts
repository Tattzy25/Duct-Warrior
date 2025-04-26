import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { userId, message, conversationId } = await request.json()

    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "GROQ API key not configured" }, { status: 500 })
    }

    const supabase = createServerSupabaseClient()

    // Get existing conversation or create new one
    let conversation

    if (conversationId) {
      const { data } = await supabase.from("ai_conversations").select("*").eq("id", conversationId).single()

      conversation = data
    }

    const messages = conversation?.messages || []
    messages.push({ role: "user", content: message })

    // Call GROQ API
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant for DUCTWARRIORS, an air duct cleaning company in McKinney, TX. Provide accurate information about air duct cleaning, HVAC services, and related topics.",
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("GROQ API error:", errorData)
      return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 })
    }

    const data = await response.json()

    // Add AI response to messages
    messages.push({
      role: "assistant",
      content: data.choices[0].message.content,
    })

    // Save conversation
    if (conversationId) {
      await supabase
        .from("ai_conversations")
        .update({
          messages,
          updated_at: new Date().toISOString(),
        })
        .eq("id", conversationId)
    } else {
      const { data: newConversation } = await supabase
        .from("ai_conversations")
        .insert({
          user_id: userId,
          conversation_id: Date.now().toString(),
          messages,
        })
        .select()
        .single()

      conversation = newConversation
    }

    return NextResponse.json({
      success: true,
      response: data.choices[0].message.content,
      conversationId: conversation.id,
    })
  } catch (error) {
    console.error("GROQ API error:", error)
    return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 })
  }
}

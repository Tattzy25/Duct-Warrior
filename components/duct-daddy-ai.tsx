"use client"

import type React from "react"

import { useChat } from "ai/react"
import { useState, useRef, useEffect } from "react"
import { Bot, Send, User, X, Loader2, Maximize, Minimize, RefreshCw } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function DuctDaddyAI() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload } = useChat({
    api: "/api/duct-daddy-ai",
    initialMessages: [
      {
        id: "welcome-message",
        role: "assistant",
        content: `Hi there! I'm Duct Daddy AI, your DUCTWARRIORS assistant. I can help you with:
        
• Answering questions about our services
• Scheduling appointments
• Adding you to our waitlist
• Managing your account
• Setting up service subscriptions

How can I help you today?`,
      },
    ],
    body: {
      userId: user?.id || null,
    },
    onError: (error) => {
      console.error("Chat error:", error)
    },
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom()
      inputRef.current?.focus()
    }
  }, [messages, isOpen, isMinimized])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      setRetryCount(0) // Reset retry count on new message
      handleSubmit(e)
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1)
    reload()
  }

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-texas-orange text-white rounded-full p-4 shadow-lg hover:bg-texas-blue transition-colors z-50"
          aria-label="Open chat with Duct Daddy AI"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 bg-white rounded-xl shadow-2xl z-50 transition-all duration-300 overflow-hidden ${
            isMinimized ? "w-72 h-16" : "w-96 h-[600px] max-h-[80vh]"
          }`}
        >
          {/* Chat header */}
          <div className="bg-texas-blue text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Bot className="h-6 w-6 mr-2" />
              <h3 className="font-bold">Duct Daddy AI</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={toggleMinimize} className="text-white hover:text-gray-200" aria-label="Minimize chat">
                {isMinimized ? <Maximize size={18} /> : <Minimize size={18} />}
              </button>
              <button onClick={toggleChat} className="text-white hover:text-gray-200" aria-label="Close chat">
                <X size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-8rem)]">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-texas-orange text-white rounded-tr-none"
                          : "bg-gray-100 text-gray-800 rounded-tl-none"
                      }`}
                    >
                      <div className="flex items-start">
                        {message.role !== "user" && <Bot className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />}
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        {message.role === "user" && <User className="h-5 w-5 ml-2 mt-1 flex-shrink-0" />}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-none max-w-[80%] p-3">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-5 w-5" />
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="flex justify-center">
                    <div className="bg-red-100 text-red-800 rounded-lg p-3 text-sm">
                      <p>Error: {error.message || "Something went wrong."}</p>
                      {retryCount < 3 && (
                        <button
                          onClick={handleRetry}
                          className="flex items-center mt-2 text-texas-blue hover:text-texas-orange"
                        >
                          <RefreshCw className="h-4 w-4 mr-1" /> Retry
                        </button>
                      )}
                      {retryCount >= 3 && (
                        <p className="mt-2 text-xs">
                          Please try again later or contact support at support@ductwarriors.com
                        </p>
                      )}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat input */}
              <form onSubmit={handleFormSubmit} className="border-t p-4">
                <div className="flex items-end">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask Duct Daddy AI..."
                    className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-texas-orange resize-none"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        if (input.trim()) {
                          handleSubmit(e as any)
                        }
                      }
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-texas-orange text-white px-4 py-2 rounded-r-lg disabled:opacity-50 h-[38px]"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  )
}

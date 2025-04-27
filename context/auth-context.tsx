"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase-singleton"
import type { Session, User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signUp: (
    email: string,
    password: string,
    metadata?: { [key: string]: any },
  ) => Promise<{
    error: any | null
    data: any | null
  }>
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: any | null
    data: any | null
  }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{
    error: any | null
    data: any | null
  }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return

    const supabase = getSupabaseClient()

    const setData = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()
        if (error) throw error
        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error("Error loading user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    setData()

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event)
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)

      // Force a router refresh to update server components
      router.refresh()
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router])

  const signUp = async (email: string, password: string, metadata?: { [key: string]: any }) => {
    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      })

      return { data, error }
    } catch (error) {
      console.error("Error signing up:", error)
      return { data: null, error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (!error) {
        // Manually update state to ensure immediate UI update
        setSession(data.session)
        setUser(data.user)

        // Navigate to dashboard after successful sign in
        router.push("/dashboard")
      }

      return { data, error }
    } catch (error) {
      console.error("Error signing in:", error)
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      const supabase = getSupabaseClient()
      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      return { data, error }
    } catch (error) {
      console.error("Error resetting password:", error)
      return { data: null, error }
    }
  }

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

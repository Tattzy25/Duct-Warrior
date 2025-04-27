"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientSupabaseClient } from "@/lib/supabase/client"
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

// Create the Supabase client outside of the component to ensure it's only created once
let supabase: ReturnType<typeof createClientSupabaseClient> | null = null

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Initialize the Supabase client once
  useEffect(() => {
    // Only initialize in the browser
    if (typeof window !== "undefined" && !supabase) {
      supabase = createClientSupabaseClient()
    }
  }, [])

  useEffect(() => {
    const setData = async () => {
      try {
        if (!supabase) {
          supabase = createClientSupabaseClient()
        }

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

    // Only set up the listener if supabase is available
    if (supabase) {
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
    }
  }, [router])

  const signUp = async (email: string, password: string, metadata?: { [key: string]: any }) => {
    try {
      if (!supabase) {
        supabase = createClientSupabaseClient()
      }

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
      if (!supabase) {
        supabase = createClientSupabaseClient()
      }

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
      if (!supabase) {
        supabase = createClientSupabaseClient()
      }

      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      if (!supabase) {
        supabase = createClientSupabaseClient()
      }

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

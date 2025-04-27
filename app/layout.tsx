import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { AuthProvider } from "@/context/auth-context"
import DuctDaddyAI from "@/components/duct-daddy-ai"
import { SupabaseDebug } from "@/components/supabase-debug"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "DUCTWARRIORS | Professional Air Duct Cleaning Services",
  description:
    "DUCTWARRIORS provides professional air duct cleaning, attic insulation, and HVAC services in McKinney, TX and surrounding areas.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${openSans.variable} font-sans`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
          <DuctDaddyAI />
          {process.env.NODE_ENV === "development" && <SupabaseDebug />}
        </AuthProvider>
      </body>
    </html>
  )
}

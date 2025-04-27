"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, User, LogIn } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-12 w-48">
              <Image src="/images/texas.svg" alt="DUCTWARRIORS Logo" fill style={{ objectFit: "contain" }} priority />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/waitlist">Waitlist</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+1234567890" className="text-texas-blue hover:text-texas-orange font-bold transition-colors">
              (123) 456-7890
            </a>
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 bg-texas-blue text-white hover:bg-texas-orange px-4 py-2 rounded-full font-bold transition-colors">
                  <User size={18} />
                  <span>Account</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-gray-800 hover:bg-texas-cream hover:text-texas-blue transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-texas-cream hover:text-texas-blue transition-colors"
                  >
                    Profile
                  </Link>
                  {user.email?.includes("admin") && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-gray-800 hover:bg-texas-cream hover:text-texas-blue transition-colors"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-texas-cream hover:text-texas-blue transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="flex items-center space-x-2 bg-texas-orange text-white hover:bg-texas-blue px-4 py-2 rounded-full font-bold transition-colors"
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-texas-blue" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/services" onClick={() => setIsMenuOpen(false)}>
                Services
              </MobileNavLink>
              <MobileNavLink href="/pricing" onClick={() => setIsMenuOpen(false)}>
                Pricing
              </MobileNavLink>
              <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </MobileNavLink>
              <MobileNavLink href="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </MobileNavLink>
              <MobileNavLink href="/waitlist" onClick={() => setIsMenuOpen(false)}>
                Waitlist
              </MobileNavLink>
              <div className="pt-4 border-t border-gray-200">
                <a
                  href="tel:+1234567890"
                  className="block text-texas-blue hover:text-texas-orange font-bold py-2 transition-colors"
                >
                  (123) 456-7890
                </a>
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block bg-texas-blue text-white hover:bg-texas-orange px-6 py-2 rounded-full font-bold transition-colors text-center mt-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block bg-texas-blue text-white hover:bg-texas-orange px-6 py-2 rounded-full font-bold transition-colors text-center mt-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        signOut()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full bg-red-600 text-white hover:bg-red-700 px-6 py-2 rounded-full font-bold transition-colors text-center mt-4"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="block bg-texas-orange text-white hover:bg-texas-blue px-6 py-2 rounded-full font-bold transition-colors text-center mt-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-texas-blue hover:text-texas-orange font-medium transition-colors">
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="block text-texas-blue hover:text-texas-orange font-medium py-2 transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

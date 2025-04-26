import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create a new middleware client for each request
  const supabase = createMiddlewareClient({
    req,
    res,
    options: {
      auth: {
        storageKey: "ductwarriors-supabase-auth", // Use the same storage key
      },
    },
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the user is authenticated
  const isAuthenticated = !!session

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/profile", "/admin"]

  // Check if the route is protected and user is not authenticated
  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  if (isProtectedRoute && !isAuthenticated) {
    // Redirect to login page
    const redirectUrl = new URL("/auth/signin", req.url)
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*"],
}

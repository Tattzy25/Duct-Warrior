import type { Metadata } from "next"
import WaitlistDashboard from "@/components/waitlist-dashboard"
import PublicWaitlist from "@/components/public-waitlist"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Waitlist - Duct Warriors",
  description: "Check your position in the Duct Warriors waitlist and get faster service with Fast Track.",
}

export default async function WaitlistPage() {
  const supabase = createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Get total count of people in waitlist
  const { count: totalPeople } = await supabase.from("waitlist").select("*", { count: "exact", head: true })

  // Get recent position changes (for animation effect)
  const { data: recentChanges } = await supabase
    .from("waitlist_bumps")
    .select("positions_moved, created_at")
    .order("created_at", { ascending: false })
    .limit(10)

  // If user is authenticated, get their waitlist position
  let waitlistEntry = null
  let peopleAhead = 0

  if (session) {
    const { data: entry } = await supabase
      .from("waitlist")
      .select("id, position, created_at")
      .eq("user_id", session.user.id)
      .single()

    if (entry) {
      waitlistEntry = entry

      // Get count of people ahead
      const { count: ahead } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true })
        .lt("position", entry.position)

      peopleAhead = ahead || 0
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-texas-blue mb-8 text-center">Duct Warriors Waitlist</h1>

      {session && waitlistEntry ? (
        // Show personalized dashboard for authenticated users on the waitlist
        <WaitlistDashboard
          waitlistEntry={waitlistEntry}
          peopleAhead={peopleAhead}
          recentChanges={recentChanges || []}
          userId={session.user.id}
        />
      ) : (
        // Show public waitlist view for unauthenticated users or those not on waitlist
        <PublicWaitlist
          totalPeople={totalPeople || 0}
          recentChanges={recentChanges || []}
          isAuthenticated={!!session}
          userId={session?.user?.id}
        />
      )}
    </main>
  )
}

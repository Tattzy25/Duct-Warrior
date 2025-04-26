"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export function DebugTools() {
  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  const clearStorage = () => {
    // Clear localStorage
    localStorage.clear()

    // Clear sessionStorage
    sessionStorage.clear()

    // Show success message
    toast({
      title: "Storage cleared",
      description: "localStorage and sessionStorage have been cleared. Refreshing page...",
    })

    // Refresh the page after a short delay
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button variant="destructive" size="sm" onClick={clearStorage} className="text-xs">
        🧹 Clear Storage
      </Button>
    </div>
  )
}

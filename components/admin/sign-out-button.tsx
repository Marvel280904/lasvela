"use client"

import { LogOut } from "lucide-react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export function SignOutButton() {
  const router = useRouter()

  const handleLogout = () => {
    // Hapus semua token
    Cookies.remove("admin_token")
    Cookies.remove("admin_refresh_token")
    
    // Hard refresh ke login page
    window.location.href = "/admin/login"
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-primary hover:text-primary/80 flex items-center gap-2"
    >
      <LogOut className="h-4 w-4 md:hidden" />
      <span>Sign Out</span>
    </button>
  )
}
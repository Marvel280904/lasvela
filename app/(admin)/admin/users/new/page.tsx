"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { UserForm } from "@/components/user-form"

// Helper untuk decode token di client side
function decodeToken(token: string) {
  try {
    const payload = token.split(".")[1]
    if (!payload) return null
    const decoded = JSON.parse(atob(payload))
    return {
      id: decoded.id || decoded.userId,
      name: decoded.name || "Admin",
      email: decoded.email || "",
      role: decoded.role || "admin",
    }
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

export default function NewUserPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Get current user from token
  useEffect(() => {
    const token = Cookies.get("admin_token")
    if (token) {
      const decoded = decodeToken(token)
      if (decoded) {
        setCurrentUser(decoded)
      } else {
        router.push("/admin/login")
      }
    } else {
      router.push("/admin/login")
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  if (!currentUser) {
    return null
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New User</h1>
      <UserForm currentUserRole={currentUser.role} />
    </div>
  )
}
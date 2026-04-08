"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { use } from "react"
import Cookies from "js-cookie"
import apiClient from "@/lib/axiosClient"
import { UserForm } from "@/components/user-form"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

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

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params menggunakan React.use()
  const { id } = use(params)
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)

  // Get current user from token
  useEffect(() => {
    const token = Cookies.get("admin_token")
    if (token) {
      const decoded = decodeToken(token)
      if (decoded) {
        setCurrentUser(decoded)
      } else {
        // Jika token invalid, redirect ke login
        router.push("/admin/login")
      }
    } else {
      // Jika tidak ada token, redirect ke login
      router.push("/admin/login")
    }
  }, [router])

  // Fetch target user
  useEffect(() => {
    if (!currentUser) return // Tunggu sampai currentUser tersedia

    const fetchUser = async () => {
      try {
        const userResponse = await apiClient.get(`/api/users/admin/${id}`)
        console.log('ini test', userResponse)
        setUser(userResponse.data.data)
      } catch (error) {
        console.error("Error fetching user:", error)
        router.push("/admin/users")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id, router, currentUser])

  // Handle delete user
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this user?")) return

    try {
      const response = await apiClient.delete(`/api/users/admin/${id}`)
      
      if (response.data.success) {
        toast.success("Success", {
          description: "User deleted successfully",
        })
        router.push("/admin/users")
        router.refresh()
      } else {
        toast.error("Error", {
          description: response.data.message || "Failed to delete user",
        })
      }
    } catch (error: any) {
      console.error("Error deleting user:", error)
      toast.error("Error", {
        description: error.response?.data?.message || "Failed to delete user",
      })
    }
  }

  if (loading || !currentUser) {
    return <div className="p-8 text-center">Loading...</div>
  }

  if (!user) {
    return <div className="p-8 text-center">User not found</div>
  }

  // Check permissions
  const isSuperAdmin = currentUser.role === "super_admin"
  const isEditingSelf = currentUser.id === user.id
  const isEditingAdmin = user.role === "admin" || user.role === "super_admin"

  // Only super admins can edit other admin users
  if (isEditingAdmin && !isSuperAdmin && !isEditingSelf) {
    router.push("/admin/users")
    return null
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit User: {user.name}</h1>

        {/* Delete button - only show if not editing self and has permission */}
        {!isEditingSelf && (isSuperAdmin || (!isEditingAdmin && currentUser.role === "admin")) && (
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Delete User
          </Button>
        )}
      </div>

      <UserForm
        initialData={{
          id: user.id,
          name: user.name,
          email: user.email,
          // password: user.password,
          role: user.role,
        }}
        currentUserRole={currentUser.role}
        isEditing
      />
    </div>
  )
}
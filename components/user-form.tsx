"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import apiClient from "@/lib/axiosClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { UserRole } from "@/lib/db/schema"

interface UserFormProps {
  initialData?: {
    id: string
    name: string
    email: string
    role: UserRole
  }
  currentUserRole: string
  isEditing?: boolean
}

export function UserForm({ initialData, currentUserRole, isEditing = false }: UserFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "editor" as UserRole
  })

  // Initialize form with initial data
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "", // Password kosong untuk edit
        role: initialData.role || "editor"
      })
    }
  }, [initialData])

  // console.log("User ID dari props:", initialData?.id)

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.email.trim()) {
        toast.error("Error", {
          description: "Name and email are required",
        })
        setIsSubmitting(false)
        return
      }

      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role,
        password: formData.password.trim() // Selalu kirim, boleh kosong jika tidak diubah
      }
      
      // console.log("📤 Data untuk API:", userData)

      // Kirim ke API
      if (isEditing && initialData?.id) {
        // Update existing user
        const updateData: any = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          role: formData.role
        }

        // Only tambahkan password jika user input new passwd
        if (formData.password.trim()) {
          updateData.password = formData.password.trim()
          console.log("🔑 Password baru akan diupdate")
        } else {
          console.log("🔑 Password TIDAK diupdate (tetap pakai password lama)")
          // Tidak kirim field password sama sekali jika kosong
        }

        // console.log("📤 Data untuk UPDATE API:", updateData)

        const response = await apiClient.put(`/api/users/admin/${initialData.id}`, updateData)
        
        if (response.data.success) {
          toast.success("Success", {
            description: "User updated successfully",
          })
          router.push("/admin/users")
          router.refresh()
        } else {
          toast.error("Error", {
            description: response.data.message || "Failed to update user",
          })
        }
      } else {
        // Create new user - password wajib diisi
        if (!formData.password.trim() || formData.password.length < 8) {
          toast.error("Error", {
            description: "Password must be at least 8 characters for new users",
          })
          setIsSubmitting(false)
          return
        }

        const response = await apiClient.post("/api/users/admin", userData)
        
        if (response.data.success) {
          toast.success("Success", {
            description: "User created successfully",
          })
          router.push("/admin/users")
          router.refresh()
        } else {
          toast.error("Error", {
            description: response.data.message || "Failed to create user",
          })
        }
      }
    } catch (error: any) {
      console.error("❌ API Error:", error)
      toast.error("Error", {
        description: error.response?.data?.message || "An error occurred",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Determine if user can edit roles
  const canEditRoles = currentUserRole === "super_admin"
  
  // Available roles based on current user's role
  const availableRoles = canEditRoles 
    ? ["super_admin", "admin", "editor", "customer"] 
    : ["editor", "customer"]

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter full name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="user@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">
            Password {isEditing}
          </Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder={isEditing ? "New password (leave empty to keep current)" : "Minimum 8 characters"}
            minLength={isEditing ? 0 : 8}
          />
          {!isEditing && (
            <p className="text-xs text-muted-foreground">Password must be at least 8 characters</p>
          )}
          {isEditing && (
            <p className="text-xs text-muted-foreground">Leave empty to keep current password</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <select
            id="role"
            disabled={!canEditRoles}
            value={formData.role}
            onChange={(e) => handleInputChange("role", e.target.value as UserRole)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select a role</option>
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role === "super_admin" && "Super Admin"}
                {role === "admin" && "Admin"}
                {role === "editor" && "Editor"}
                {role === "customer" && "Customer"}
              </option>
            ))}
          </select>
          {!canEditRoles && (
            <p className="text-xs text-muted-foreground">
              You cannot change user roles. Only super admins can change roles.
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push("/admin/users")}
        >
          Cancel
        </Button>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? (
            <>Saving...</>
          ) : isEditing ? (
            "Update User"
          ) : (
            "Create User"
          )}
        </Button>
      </div>
    </form>
  )
}
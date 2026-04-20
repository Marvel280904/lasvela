"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import apiClient from "@/lib/axiosClient"

// Define the form schema
const roomFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
})

type RoomFormData = z.infer<typeof roomFormSchema>

interface RoomFormProps {
  initialData?: RoomFormData & { id?: string }
  isEditing?: boolean
}

export function RoomForm({ initialData, isEditing = false }: RoomFormProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const form = useForm<RoomFormData>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
    },
  })

  const onSubmit = async (data: RoomFormData) => {
    setIsSubmitting(true)
    setFormError(null)

    try {
      const payload = {
        name: data.name,
        slug: data.slug,
      }

      let response
      if (isEditing && initialData?.id) {
        // Update parent category
        response = await apiClient.put(`/api/parent-categories/admin/${initialData.id}`, payload)
      } else {
        // Create parent category
        response = await apiClient.post("/api/parent-categories/admin", payload)
      }

      if (response.data.success) {
        toast.success(isEditing ? "Room updated" : "Room created", {
          description: `Your room has been ${isEditing ? 'updated' : 'created'} successfully.`,
        })
        router.push("/admin/rooms")
        router.refresh()
      } else {
        throw new Error(response.data.message || `Failed to ${isEditing ? 'update' : 'create'} room`)
      }
    } catch (error: any) {
      console.error("Room form submission error:", error)
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          "An unexpected error occurred. Please try again."
      setFormError(errorMessage)
      toast.error("Error", { description: errorMessage })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!initialData?.id) return

    if (!confirm("Are you sure you want to delete this room? This action cannot be undone.")) return

    setIsDeleting(true)
    try {
      const response = await apiClient.delete(`/api/parent-categories/admin/${initialData.id}`)
      
      if (response.data.success) {
        toast.success("Room deleted", {
          description: "Your room has been deleted successfully.",
        })
        router.push("/admin/rooms")
        router.refresh()
      } else {
        throw new Error(response.data.message || "Failed to delete room")
      }
    } catch (error: any) {
      console.error("Delete error:", error)
      const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           error.message || 
                           "An unexpected error occurred. Please try again."
      toast.error("Error", { description: errorMessage })
    } finally {
      setIsDeleting(false)
    }
  }

  const generateSlug = () => {
    const name = form.getValues("name")
    if (name) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
      form.setValue("slug", slug)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {formError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{formError}</span>
        </div>
      )}

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Room Name (Parent Category)</Label>
              <Input
                id="name"
                placeholder="e.g. Living Room"
                {...form.register("name")}
                onBlur={() => {
                  if (!isEditing && !form.getValues("slug")) {
                    generateSlug()
                  }
                }}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="slug">Slug</Label>
                <Button type="button" variant="outline" size="sm" onClick={generateSlug} className="h-8">
                  Generate
                </Button>
              </div>
              <Input id="slug" placeholder="e.g. living-room" {...form.register("slug")} />
              {form.formState.errors.slug && (
                <p className="text-sm text-red-500">{form.formState.errors.slug.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/rooms")}>
          Cancel
        </Button>

        <div className="flex space-x-2">
          {isEditing && (
            <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting || isSubmitting}>
              {isDeleting ? "Deleting..." : "Delete Room"}
            </Button>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEditing ? "Update Room" : "Create Room"}
          </Button>
        </div>
      </div>
    </form>
  )
}

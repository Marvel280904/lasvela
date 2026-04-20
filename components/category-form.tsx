"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { toast } from "sonner"
import apiClient from "@/lib/axiosClient"
// import { deleteCategory } from "@/app/actions/category-actions"

// Define the form schema
const categoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  parentId: z.string().optional().nullable(),
})

// Define the CategoryFormData type
interface CategoryFormData {
  name: string
  slug: string
  parentId?: string | null
  id?: string
}

interface CategoryFormProps {
  initialData?: CategoryFormData
  isEditing?: boolean
}

export function CategoryForm({ initialData, isEditing = false }: CategoryFormProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [parentCategories, setParentCategories] = useState<{ id: string, name: string }[]>([])

  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const response = await apiClient.get("/api/parent-categories")
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          setParentCategories(response.data.data)
        } else if (Array.isArray(response.data)) {
          setParentCategories(response.data)
        }
      } catch (error) {
        console.error("Error fetching parent categories:", error)
      }
    }

    fetchParentCategories()
  }, [])

  useEffect(() => {
    console.log("CategoryForm initialData:", initialData)
  }, [initialData])

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      parentId: initialData?.parentId || null,
    },
  })

  // Handle form submission untuk CREATE dan UPDATE
  const onSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true)
    setFormError(null)

    try {
      if (isEditing && initialData?.id) {
        // --- LOGIKA UPDATE ---
        console.log(`Updating category with ID: ${initialData.id}`)
        
        // Siapkan Payload untuk update sesuai API spec
        const payload = {
          name: data.name,
          slug: data.slug,
          parentId: data.parentId || null,
        }

        console.log("Sending UPDATE payload to /api/categories/admin/{id}:", payload)

        // Panggil API PUT /api/categories/admin/{id}
        const response = await apiClient.put(`/api/categories/admin/${initialData.id}`, payload)
        console.log("UPDATE API Response:", response.data)

        if (response.data.success) {
          toast.success("Category updated", {
            description: "Your category has been updated successfully.",
          })
          router.push("/admin/categories")
          router.refresh()
        } else {
          throw new Error(response.data.message || "Failed to update category")
        }
      } else {
        // --- LOGIKA CREATE ---
        console.log("Creating new category via API endpoint")
        
        // Siapkan Payload untuk create
        const payload = {
          name: data.name,
          slug: data.slug,
          parentId: data.parentId || null,
        }

        console.log("Sending CREATE payload to /api/categories/admin:", payload)

        // Panggil API POST /api/categories/admin
        const response = await apiClient.post("/api/categories/admin", payload)
        console.log("CREATE API Response:", response.data)

        if (response.data.success) {
          toast.success("Category created", {
            description: "Your category has been created successfully.",
          })
          router.push("/admin/categories")
          router.refresh()
        } else {
          throw new Error(response.data.message || "Failed to create category")
        }
      }
    } catch (error: any) {
      console.error("Form submission error:", error)
      
      // Handle Error dari Axios
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          "An unexpected error occurred. Please try again."
      
      setFormError(errorMessage)
      toast.error("Error", {
        description: errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle category deletion
  const handleDelete = async () => {
    if (!initialData?.id) return

    setIsDeleting(true)

    try {
      console.log(`Deleting category with ID: ${initialData.id}`)
      
      // Gunakan apiClient.delete() untuk konsisten dengan API lainnya
      const response = await apiClient.delete(`/api/categories/admin/${initialData.id}`)
      
      console.log("DELETE API Response:", response.data)

      if (response.data.success) {
        toast.success("Category deleted", {
          description: "Your category has been deleted successfully.",
        })
        router.push("/admin/categories")
        router.refresh()
      } else {
        toast.error("Error", {
          description: response.data.message || "Failed to delete category",
        })
      }
    } catch (error: any) {
      console.error("Delete error:", error)
      
      // Handle error lebih detail
      const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           error.message || 
                           "An unexpected error occurred. Please try again."
      
      toast.error("Error", {
        description: errorMessage,
      })
      
      // Debug lebih lanjut
      console.error("Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
      })
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
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                {...form.register("name")}
                // error={form.formState.errors.name?.message}
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
                <Label htmlFor="slug">
                  Slug
                  <span className="text-xs text-muted-foreground ml-2">(used in URL, e.g., "living-room")</span>
                </Label>
                <Button type="button" variant="outline" size="sm" onClick={generateSlug} className="h-8">
                  Generate
                </Button>
              </div>
              <Input id="slug" {...form.register("slug")} 
                // error={form.formState.errors.slug?.message}
              />
              {form.formState.errors.slug && (
                <p className="text-sm text-red-500">{form.formState.errors.slug.message}</p>
              )}
            </div>

             <div className="space-y-2">
              <Label htmlFor="parentId">Parent Room</Label>
              <Select 
                onValueChange={(value) => form.setValue("parentId", value === "none" ? null : value)}
                defaultValue={initialData?.parentId || undefined}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a room" />
                </SelectTrigger>
                <SelectContent>
                  {parentCategories.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/categories")}>
          Cancel
        </Button>

        <div className="flex space-x-2">
          {isEditing && (
            <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting || isSubmitting}>
              {isDeleting ? "Deleting..." : "Delete Category"}
            </Button>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEditing ? "Update Category" : "Create Category"}
          </Button>
        </div>
      </div>
    </form>
  )
}
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import apiClient from "@/lib/axiosClient"
import { X } from "lucide-react"
import { RichTextEditor } from "@/components/ui/rich-text-editor"

const articleFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  thumbnailImage: z.string().optional(),
  tags: z.array(z.string()),
  author: z.string().optional(),
  isPublished: z.boolean(),
})

type ArticleFormData = z.infer<typeof articleFormSchema>

interface ArticleFormProps {
  initialData?: ArticleFormData & { id?: string }
  isEditing?: boolean
  onSuccess?: () => void
}

export function ArticleForm({ initialData, isEditing = false, onSuccess }: ArticleFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  
  const [tagsList, setTagsList] = useState<string[]>(initialData?.tags || [])
  const [currentTag, setCurrentTag] = useState("")

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      content: initialData?.content || "",
      excerpt: initialData?.excerpt || "",
      metaTitle: initialData?.metaTitle || "",
      metaDescription: initialData?.metaDescription || "",
      thumbnailImage: initialData?.thumbnailImage || "",
      tags: initialData?.tags || [],
      author: initialData?.author || "",
      isPublished: initialData?.isPublished ?? true,
    },
  })

  const onSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true)
    setFormError(null)

    try {
      const payload = {
        ...data,
        thumbnailImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      }

      let response
      if (isEditing && initialData?.id) {
        response = await apiClient.put(`/api/articles/admin/${initialData.id}`, payload)
      } else {
        response = await apiClient.post("/api/articles/admin", payload)
      }

      if (response.data.success) {
        toast.success(isEditing ? "Article updated" : "Article created", {
          description: isEditing ? "Your article has been updated successfully." : "Your article has been created successfully.",
        })
        
        if (!isEditing) {
           form.reset()
           setTagsList([])
        }
        
        if (onSuccess) {
          onSuccess()
        } else {
          router.push("/admin/articles")
          router.refresh()
        }
      } else {
        throw new Error(response.data.message || (isEditing ? "Failed to update article" : "Failed to create article"))
      }
    } catch (error: any) {
      console.error("Form submission error:", error)
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

  const handleDelete = async () => {
    if (!initialData?.id) return

    setIsDeleting(true)
    try {
      const response = await apiClient.delete(`/api/articles/admin/${initialData.id}`)

      if (response.data.success) {
        toast.success("Article deleted", {
          description: "Your article has been deleted successfully.",
        })
        if (onSuccess) {
           onSuccess()
        } else {
           router.push("/admin/articles")
           router.refresh()
        }
      } else {
        toast.error("Error", {
          description: response.data.message || "Failed to delete article",
        })
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
    const title = form.getValues("title")
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
      form.setValue("slug", slug)
    }
  }

  const addTag = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (currentTag.trim() && !tagsList.includes(currentTag.trim())) {
      const newTags = [...tagsList, currentTag.trim()]
      setTagsList(newTags)
      form.setValue("tags", newTags)
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    const newTags = tagsList.filter(tag => tag !== tagToRemove)
    setTagsList(newTags)
    form.setValue("tags", newTags)
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
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Article Title</Label>
              <Input
                id="title"
                {...form.register("title")}
                onBlur={() => {
                  if (!form.getValues("slug")) {
                    generateSlug()
                  }
                }}
              />
              {form.formState.errors.title && (
                <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
              )}
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="slug">Slug</Label>
                <Button type="button" variant="outline" size="sm" onClick={generateSlug} className="h-8">
                  Generate
                </Button>
              </div>
              <Input id="slug" {...form.register("slug")} />
              {form.formState.errors.slug && (
                <p className="text-sm text-red-500">{form.formState.errors.slug.message}</p>
              )}
            </div>
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input id="author" {...form.register("author")} />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Controller
              name="content"
              control={form.control}
              render={({ field }) => (
                <RichTextEditor 
                  value={field.value} 
                  onChange={field.onChange} 
                  placeholder="Start writing your article..." 
                />
              )}
            />
            {form.formState.errors.content && (
              <p className="text-sm text-red-500">{form.formState.errors.content.message}</p>
            )}
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea 
              id="excerpt" 
              className="resize-none" 
              rows={3} 
              {...form.register("excerpt")} 
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input 
                value={currentTag} 
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addTag(e)
                  }
                }}
                placeholder="Add a tag..."
              />
              <Button type="button" onClick={addTag} variant="secondary">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tagsList.map(tag => (
                <div key={tag} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <span>{tag}</span>
                  <button type="button" onClick={() => removeTag(tag)} className="text-gray-500 hover:text-red-500">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <hr className="my-4" />

          {/* SEO Meta */}
          <h3 className="text-lg font-medium">SEO Meta Information</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input id="metaTitle" {...form.register("metaTitle")} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea 
                id="metaDescription" 
                rows={3} 
                {...form.register("metaDescription")} 
              />
            </div>
          </div>

          {/* Is Published */}
          <div className="flex items-center justify-between border p-4 rounded-lg">
            <div className="space-y-0.5">
              <Label className="text-base text-gray-900">Published Status</Label>
              <p className="text-sm text-gray-500">Is this article published to the public?</p>
            </div>
            <Switch
              checked={form.watch("isPublished")}
              onCheckedChange={(checked) => form.setValue("isPublished", checked)}
            />
          </div>

        </CardContent>
      </Card>

      <div className="flex justify-between items-center mt-8">
        <Button type="button" variant="outline" onClick={() => {
          if (onSuccess) {
             onSuccess()
          } else {
             router.push("/admin/articles")
          }
        }}>
          Cancel
        </Button>

        <div className="flex gap-3">
          {isEditing && (
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDelete} 
              disabled={isDeleting || isSubmitting}
            >
              {isDeleting ? "Deleting..." : "Delete Article"}
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEditing ? "Update Article" : "Create Article"}
          </Button>
        </div>
      </div>
    </form>
  )
}

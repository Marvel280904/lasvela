"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Trash2, Plus, X, AlertTriangle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { ImageModal } from "@/components/image-modal"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { ProductFormData, ProductVariant, MaterialOption, DimensionOption, AddOnOption, VariantCombination } from "@/lib/db/schema"
import apiClient from "@/lib/axiosClient"

// Define the form schema
const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  categoryId: z.string().min(1, "Category ID is required"),
  price: z.number().min(0, "Price must be 0 or greater"),
  description: z.string().min(1, "Description is required"),
  features: z.array(z.string()),
  images: z.array(z.string()),
  careInstructions: z.array(z.string()).optional(),
  deliveryTime: z.string().optional(),
  warranty: z.string().optional(),
  inStock: z.boolean().default(true),
  isWeeklyBestSeller: z.boolean().default(false),
  isVisible: z.boolean().default(true),
  thumbnailImage: z.string().optional(),
})

interface ProductFormProps {
  initialData?: ProductFormData
  isEditing?: boolean
}

const PLACEHOLDER_IMAGE_URL = "https://assets-xyzap.sgp1.cdn.digitaloceanspaces.com/essen/products/placeholder.png"

export function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [confirmSlug, setConfirmSlug] = useState("")
  const [deleteError, setDeleteError] = useState<string | null>(null)

  // State untuk form data
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    categoryId: "",
    // price: 0,
    description: "",
    features: [""],
    images: [""],
    careInstructions: [""],
    deliveryTime: "",
    warranty: "",
    inStock: true,
    isWeeklyBestSeller: false,
    isVisible: true,
    thumbnailImage: "",
  })

  // State untuk variants
  const [variants, setVariants] = useState({
    materials: [] as MaterialOption[],
    dimensions: [] as DimensionOption[],
    combinations: [] as VariantCombination[],
    addOns: [] as AddOnOption[],
  })

  // State untuk images
  const [selectedImageModal, setSelectedImageModal] = useState<{
    isOpen: boolean
    images: string[]
    currentIndex: number
    productName: string
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
    productName: "",
  })

  // Initialize form
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      category: initialData?.category || "",
      categoryId: initialData?.categoryId || "",
      // price: initialData?.price || 0,
      description: initialData?.description || "",
      features: initialData?.features || [""],
      images: initialData?.images || [""],
      careInstructions: initialData?.careInstructions || [""],
      deliveryTime: initialData?.deliveryTime || "",
      warranty: initialData?.warranty || "",
      inStock: initialData?.inStock ?? true,
      isWeeklyBestSeller: initialData?.isWeeklyBestSeller ?? false,
      isVisible: initialData?.isVisible ?? true,
      thumbnailImage: initialData?.thumbnailImage || "",
    },
  })

  // Load initial data
  useEffect(() => {
    if (initialData) {
      // Set form data
      const data = {
        name: initialData.name || "",
        slug: initialData.slug || "",
        category: initialData.category || "",
        categoryId: initialData.categoryId || "",
        // price: initialData.price || 0,
        description: initialData.description || "",
        features: initialData.features || [""],
        images: initialData.images || [""],
        careInstructions: initialData.careInstructions || [""],
        deliveryTime: initialData.deliveryTime || "",
        warranty: initialData.warranty || "",
        inStock: initialData.inStock ?? true,
        isWeeklyBestSeller: initialData.isWeeklyBestSeller ?? false,
        isVisible: initialData.isVisible ?? true,
        thumbnailImage: initialData.thumbnailImage || "",
      }
      setFormData(data)

      // Set variants
      if (initialData.variants && initialData.variants.length > 0) {
        const variant = initialData.variants[0]
        setVariants({
          materials: variant.materials || [],
          dimensions: variant.dimensions || [],
          combinations: variant.combinations || [],
          addOns: variant.addOns || [],
        })
      }
    }
  }, [initialData])

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/api/categories")
        if (response.data.success) {
          setCategories(response.data.data)
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }
    fetchCategories()
  }, [])

  // Handle input changes
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    form.setValue(field as any, value)
  }

  // Handle array field changes
  const handleArrayChange = (field: string, index: number, value: string) => {
    const newArray = [...formData[field as keyof typeof formData] as string[]]
    newArray[index] = value
    handleInputChange(field, newArray)
  }

  const addArrayField = (field: string) => {
    const current = formData[field as keyof typeof formData] as string[]
    handleInputChange(field, [...current, ""])
  }

  const removeArrayField = (field: string, index: number) => {
    const current = formData[field as keyof typeof formData] as string[]
    if (current.length > 1) {
      const newArray = current.filter((_, i) => i !== index)
      handleInputChange(field, newArray)
    }
  }

  // Handle variant changes
  const handleMaterialChange = (index: number, field: keyof MaterialOption, value: string) => {
    const newMaterials = [...variants.materials]
    newMaterials[index] = { ...newMaterials[index], [field]: value }
    setVariants(prev => ({ ...prev, materials: newMaterials }))
  }

  const addMaterial = () => {
    setVariants(prev => ({
      ...prev,
      materials: [...prev.materials, { name: "", description: "" }]
    }))
  }

  const removeMaterial = (index: number) => {
    const newMaterials = variants.materials.filter((_, i) => i !== index)
    setVariants(prev => ({ ...prev, materials: newMaterials }))
  }

  const handleDimensionChange = (index: number, field: keyof DimensionOption, value: string) => {
    const newDimensions = [...variants.dimensions]
    newDimensions[index] = { ...newDimensions[index], [field]: value }
    setVariants(prev => ({ ...prev, dimensions: newDimensions }))
  }

  const addDimension = () => {
    setVariants(prev => ({
      ...prev,
      dimensions: [...prev.dimensions, { value: "", description: "" }]
    }))
  }

  const removeDimension = (index: number) => {
    const newDimensions = variants.dimensions.filter((_, i) => i !== index)
    setVariants(prev => ({ ...prev, dimensions: newDimensions }))
  }

  const handleCombinationChange = (materialName: string, dimensionValue: string, field: keyof VariantCombination, value: any) => {
    const newCombinations = [...variants.combinations]
    const index = newCombinations.findIndex(
      c => c.materialName === materialName && c.dimensionValue === dimensionValue
    )

    if (index >= 0) {
      newCombinations[index] = { ...newCombinations[index], [field]: value }
    } else {
      newCombinations.push({
        materialName,
        dimensionValue,
        price: 0,
        inStock: true,
        [field]: value
      } as VariantCombination)
    }

    setVariants(prev => ({ ...prev, combinations: newCombinations }))
  }

  const handleAddOnChange = (index: number, field: keyof AddOnOption, value: any) => {
    const newAddOns = [...variants.addOns]
    newAddOns[index] = { 
      ...newAddOns[index], 
      [field]: value,
      // Pastikan id tetap ada jika field bukan id
      ...(field !== 'id' && { id: newAddOns[index].id || `temp-${Date.now()}` })
    }
    setVariants(prev => ({ ...prev, addOns: newAddOns }))
  }

  const addAddOn = () => {
    setVariants(prev => ({
      ...prev,
      addOns: [...prev.addOns, { 
        id: `temp-${Date.now()}`, // Tambah id temporary
        name: "", 
        price: 0, 
        selected: false 
      }]
    }))
  }

  const removeAddOn = (index: number) => {
    const newAddOns = variants.addOns.filter((_, i) => i !== index)
    setVariants(prev => ({ ...prev, addOns: newAddOns }))
  }

  // Handle image upload
  const handleMultiImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    const uploadPromises = Array.from(files).map(async (file) => {
      try {
        // Validasi file size (max 20MB)
        if (file.size > 20 * 1024 * 1024) {
          toast.error("File Too Large", {
            description: `${file.name} exceeds 20MB limit`,
          })
          return null
        }

        // Validasi file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        if (!validTypes.includes(file.type)) {
          toast.error("Invalid File Type", {
            description: `${file.name} must be JPEG, PNG, GIF, or WEBP`,
          })
          return null
        }

        // Buat FormData dengan field "file" seperti yang dibutuhkan API
        const formData = new FormData()
        formData.append("file", file) // Field "file" sesuai dengan API spec

        // Progress tracking
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: 0
        }))

        // Gunakan apiClient dengan header yang tepat
        const response = await apiClient.post("/api/upload", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          // Optional: Tambahkan progress tracking jika diperlukan
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              setUploadProgress(prev => ({
                ...prev,
                [file.name]: progress
              }))
            }
          }
        })

        // Reset progress setelah upload selesai
        setUploadProgress(prev => {
          const newProgress = { ...prev }
          delete newProgress[file.name]
          return newProgress
        })

        // Handle response sesuai dengan format API baru
        if (response.data) {
          console.log("📥 Full API response:", response.data)
          
          // Format 1: {success: true, data: {imageUrl: "..."}}
          if (response.data.success && response.data.data) {
            const data = response.data.data
            
            // Cek berbagai kemungkinan field untuk URL
            if (data.imageUrl) {
              console.log("✅ Found imageUrl:", data.imageUrl)
              return data.imageUrl
            } else if (data.url) {
              console.log("✅ Found url:", data.url)
              return data.url
            } else if (data.location) {
              console.log("✅ Found location:", data.location)
              return data.location
            } else if (data.path) {
              console.log("✅ Found path:", data.path)
              // Jika path relatif, konversi ke URL lengkap
              return `https://assets-xyzap.sgp1.cdn.digitaloceanspaces.com/${data.path}`
            } else if (typeof data === "string") {
              console.log("✅ Data is direct URL string:", data)
              return data
            } else {
              // Debug: log untuk melihat struktur data
              console.log("🔍 Data keys:", Object.keys(data))
              console.log("🔍 Data values:", data)
              
              // Coba cari URL di semua field
              const allValues = Object.values(data)
              const urlValue = allValues.find(val => 
                typeof val === "string" && 
                (val.startsWith("http") || val.includes("digitaloceanspaces.com"))
              )
              
              if (urlValue) {
                console.log("✅ Found URL in data fields:", urlValue)
                return urlValue as string
              }
              
              toast.error("Upload Failed", {
                description: "Could not find image URL in response",
              })
              return null
            }
          } 
          // Format 2: {imageUrl: "..."} langsung
          else if (response.data.imageUrl) {
            console.log("✅ Direct imageUrl:", response.data.imageUrl)
            return response.data.imageUrl
          }
          // Format 3: {url: "..."} langsung  
          else if (response.data.url) {
            console.log("✅ Direct url:", response.data.url)
            return response.data.url
          }
          else {
            console.error("❌ Unhandled response format:", response.data)
            toast.error("Upload Failed", {
              description: "Unexpected response format",
            })
            return null
          }
        }
      } catch (error: any) {
        console.error("Image upload error:", error)
        
        // Reset progress pada error
        setUploadProgress(prev => {
          const newProgress = { ...prev }
          delete newProgress[file.name]
          return newProgress
        })

        toast.error("Upload Failed", {
          description: error.response?.data?.message || `Failed to upload ${file.name}`,
        })
        return null
      }
    })

    try {
      const uploadedImages = await Promise.all(uploadPromises)
      const validImages = uploadedImages.filter((img) => img !== null) as string[]

      if (validImages.length > 0) {
        const currentImages = formData.images
        
        // Remove placeholder jika hanya ada placeholder
        const imagesToUpdate = 
          currentImages.length === 1 && 
          (currentImages[0].includes("placeholder") || currentImages[0] === PLACEHOLDER_IMAGE_URL)
            ? []
            : currentImages

        const updatedImages = [...imagesToUpdate, ...validImages]
        handleInputChange("images", updatedImages)

        toast.success("Images Uploaded", {
          description: `${validImages.length} image(s) uploaded successfully`,
        })
      }
    } catch (error) {
      console.error("Multi-image upload error:", error)
      toast.error("Upload Error", {
        description: "Failed to process uploaded images",
      })
    } finally {
      setIsUploading(false)
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Kumpulkan semua data dari form
      const allFormData = {
        ...formData,
        // Filter array fields untuk hapus string kosong
        features: formData.features.filter(f => f.trim() !== ""),
        images: formData.images.filter(img => img.trim() !== ""),
        careInstructions: formData.careInstructions.filter(ci => ci.trim() !== ""),
      }

      // Buat data untuk dikirim ke API
      const apiData: any = {
        name: allFormData.name,
        slug: allFormData.slug,
        category: allFormData.category,
        categoryId: allFormData.categoryId,
        description: allFormData.description,
        features: allFormData.features,
        images: allFormData.images,
        inStock: allFormData.inStock,
        isVisible: allFormData.isVisible,
        isWeeklyBestSeller: allFormData.isWeeklyBestSeller,
        variants: [{
          materials: variants.materials.map(material => ({
            name: material.name,
            description: material.description || undefined,
            image: material.image || undefined
          })),
          dimensions: variants.dimensions.map(dimension => ({
            value: dimension.value,
            description: dimension.description || undefined
          })),
          combinations: variants.combinations.map(combination => ({
            materialName: combination.materialName,
            dimensionValue: combination.dimensionValue,
            price: combination.price,
            inStock: combination.inStock
          })),
          addOns: variants.addOns.map(addon => ({
            id: addon.id || undefined,
            name: addon.name,
            description: addon.description || undefined,
            price: addon.price
          }))
        }]
      }

      // Tambahkan field optional jika ada
      if (allFormData.careInstructions.length > 0) {
        apiData.careInstructions = allFormData.careInstructions
      }

      if (allFormData.deliveryTime) {
        apiData.deliveryTime = allFormData.deliveryTime
      }

      if (allFormData.warranty) {
        apiData.warranty = allFormData.warranty
      }

      if (allFormData.thumbnailImage) {
        apiData.thumbnailImage = allFormData.thumbnailImage
      }


      console.log("📤 Data yang akan dikirim ke API:", apiData)

      // 3. Kirim ke API
      if (isEditing && initialData?.id) {
        // Update product
        const response = await apiClient.put(`/api/products/admin/${initialData.id}`, apiData)
        
        if (response.data.success) {
          toast.success("Success", {
            description: "Product updated successfully",
          })
          router.push("/admin/products")
          router.refresh()
        } else {
          toast.error("Error", {
            description: response.data.message || "Failed to update product",
          })
        }
      } else {
        // Create new product
        const response = await apiClient.post("/api/products/admin", apiData)
        
        if (response.data.success) {
          toast.success("Success", {
            description: "Product created successfully",
          })
          router.push("/admin/products")
          router.refresh()
        } else {
          toast.error("Error", {
            description: response.data.message || "Failed to create product",
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

  // Handle delete
  const handleDelete = async () => {
    if (!initialData?.id) return

    // Check slug confirmation
    if (confirmSlug !== initialData.slug) {
      setDeleteError("The slug you entered does not match the product slug.")
      return
    }

    try {
      const response = await apiClient.delete(`/api/products/admin/${initialData.id}`)
      
      if (response.data.success) {
        toast.success("Success", {
          description: "Product deleted successfully",
        })
        router.push("/admin/products")
        router.refresh()
      } else {
        setDeleteError(response.data.message)
        toast.error("Error", {
          description: response.data.message,
        })
      }
    } catch (error: any) {
      setDeleteError(error.response?.data?.message || "An error occurred")
      toast.error("Error", {
        description: error.response?.data?.message || "An error occurred",
      })
    }
  }

  // Generate slug from name
  const generateSlug = () => {
    const name = formData.name
    if (name) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
      handleInputChange("slug", slug)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Tabs defaultValue="basic">
        <TabsList className="w-full border-b rounded-none justify-start">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Warranty</TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="basic" className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                onBlur={() => {
                  if (!isEditing && !formData.slug) {
                    generateSlug()
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="slug">
                  Slug
                  <span className="text-xs text-muted-foreground ml-2">(used in URL)</span>
                </Label>
                <Button type="button" variant="outline" size="sm" onClick={generateSlug} className="h-8">
                  Generate
                </Button>
              </div>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="w-full p-2 border rounded-md"
                value={formData.category}
                onChange={(e) => {
                  const selectedCategory = categories.find((c) => c.name === e.target.value)
                  handleInputChange("category", e.target.value)
                  handleInputChange("categoryId", selectedCategory?.id || "")
                }}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="price">Base Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value) || 0)}
              />
            </div> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="isWeeklyBestSeller">Weekly Best Seller</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isWeeklyBestSeller"
                  checked={formData.isWeeklyBestSeller}
                  onCheckedChange={(checked) => handleInputChange("isWeeklyBestSeller", checked)}
                />
                <Label htmlFor="isWeeklyBestSeller" className="text-sm text-muted-foreground">
                  Feature as weekly best seller
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="isVisible">Product Visibility</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isVisible"
                  checked={formData.isVisible}
                  onCheckedChange={(checked) => handleInputChange("isVisible", checked)}
                />
                <Label htmlFor="isVisible" className="text-sm text-muted-foreground">
                  {formData.isVisible ? "Visible" : "Hidden"}
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={5}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="inStock">In Stock</Label>
              <Switch
                id="inStock"
                checked={formData.inStock}
                onCheckedChange={(checked) => handleInputChange("inStock", checked)}
              />
            </div>
          </div>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6 py-4">
          {/* Features */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Features</h3>
                  <Button type="button" variant="outline" size="sm" onClick={() => addArrayField("features")}>
                    Add Feature
                  </Button>
                </div>

                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleArrayChange("features", index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayField("features", index)}
                      disabled={formData.features.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Care Instructions */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Care Instructions</h3>
                  <Button type="button" variant="outline" size="sm" onClick={() => addArrayField("careInstructions")}>
                    Add Instruction
                  </Button>
                </div>

                {formData.careInstructions.map((instruction, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={instruction}
                      onChange={(e) => handleArrayChange("careInstructions", index, e.target.value)}
                      placeholder={`Instruction ${index + 1}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayField("careInstructions", index)}
                      disabled={formData.careInstructions.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Images Tab */}
        <TabsContent value="images" className="space-y-6 py-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Product Images</h3>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    id="image-upload"
                    onChange={handleMultiImageUpload}
                    disabled={isUploading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("image-upload")?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : "Upload Images"}
                  </Button>
                </div>
                
                {/* Upload Progress */}
                {isUploading && Object.keys(uploadProgress).length > 0 && (
                  <div className="mt-2 space-y-2">
                    {Object.entries(uploadProgress).map(([key, progress]) => (
                      <div key={key} className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div
                        className="aspect-square relative border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors"
                        onClick={() => {
                          setSelectedImageModal({
                            isOpen: true,
                            images: formData.images,
                            currentIndex: index,
                            productName: formData.name || "Product",
                          })
                        }}
                      >
                        <img
                          src="/images/img-default.png"
                          alt={`Product image ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                        {/* Thumbnail indicator */}
                        {formData.thumbnailImage === image && (
                          <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs">
                            Thumbnail
                          </div>
                        )}
                        {/* Choose Thumbnail Button */}
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleInputChange("thumbnailImage", image)
                            toast.success("Thumbnail Selected", {
                              description: "This image has been set as the product thumbnail.",
                            })
                          }}
                        >
                          Set as Thumbnail
                        </Button>
                        {/* Remove Image Button */}
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation()
                            const updatedImages = formData.images.filter((_, i) => i !== index)
                            handleInputChange("images", updatedImages.length > 0 ? updatedImages : [PLACEHOLDER_IMAGE_URL])

                            // If this was the thumbnail, reset the thumbnail
                            if (formData.thumbnailImage === image) {
                              handleInputChange("thumbnailImage", updatedImages.length > 0 ? updatedImages[0] : "")
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {/* Image URL display */}
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {image.includes("digitaloceanspaces.com/essen")
                          ? `DO Spaces: ${image.split("/essen/").pop()}`
                          : image.includes("digitaloceanspaces.com")
                            ? `DO Spaces: ${image.split("/").pop()}`
                            : image}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  Images are automatically uploaded to DigitalOcean Spaces. For best results, use images with a 1:1
                  aspect ratio.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Variants Tab */}
        <TabsContent value="variants" className="space-y-6 py-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Materials */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Materials</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addMaterial}>
                      <Plus className="h-4 w-4 mr-1" /> Add Material
                    </Button>
                  </div>

                  {variants.materials.map((material, index) => (
                    <div key={index} className="border p-4 rounded-md space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Material {index + 1}</h4>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeMaterial(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label>Material Name</Label>
                          <Input
                            value={material.name}
                            onChange={(e) => handleMaterialChange(index, "name", e.target.value)}
                            placeholder="e.g., Fabric"
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Input
                            value={material.description || ""}
                            onChange={(e) => handleMaterialChange(index, "description", e.target.value)}
                            placeholder="Optional"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dimensions */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Dimensions</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addDimension}>
                      <Plus className="h-4 w-4 mr-1" /> Add Dimension
                    </Button>
                  </div>

                  {variants.dimensions.map((dimension, index) => (
                    <div key={index} className="border p-4 rounded-md space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Dimension {index + 1}</h4>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeDimension(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label>Dimension Value</Label>
                          <Input
                            value={dimension.value}
                            onChange={(e) => handleDimensionChange(index, "value", e.target.value)}
                            placeholder="e.g., 2600mm"
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Input
                            value={dimension.description || ""}
                            onChange={(e) => handleDimensionChange(index, "description", e.target.value)}
                            placeholder="Optional"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Matrix */}
                {variants.materials.length > 0 && variants.dimensions.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Pricing Matrix</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border">
                        <thead>
                          <tr>
                            <th className="border p-2 bg-gray-100"></th>
                            {variants.dimensions.map((dim, i) => (
                              <th key={i} className="border p-2 bg-gray-100 text-center">
                                {dim.value}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {variants.materials.map((material, i) => (
                            <tr key={i}>
                              <td className="border p-2 font-medium bg-gray-50">{material.name}</td>
                              {variants.dimensions.map((dimension, j) => {
                                const combination = variants.combinations.find(
                                  c => c.materialName === material.name && c.dimensionValue === dimension.value
                                )
                                return (
                                  <td key={j} className="border p-2">
                                    <div className="space-y-2">
                                      <Input
                                        type="number"
                                        placeholder="Price"
                                        value={combination?.price || 0}
                                        onChange={(e) => handleCombinationChange(
                                          material.name,
                                          dimension.value,
                                          "price",
                                          Number.parseFloat(e.target.value) || 0
                                        )}
                                      />
                                      <div className="flex items-center">
                                        <Checkbox
                                          checked={combination?.inStock ?? true}
                                          onCheckedChange={(checked) => handleCombinationChange(
                                            material.name,
                                            dimension.value,
                                            "inStock",
                                            checked === true
                                          )}
                                        />
                                        <Label className="ml-2 text-sm">In Stock</Label>
                                      </div>
                                    </div>
                                  </td>
                                )
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Add-ons */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Add-ons</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addAddOn}>
                      <Plus className="h-4 w-4 mr-1" /> Add Add-on
                    </Button>
                  </div>

                  {variants.addOns.map((addon, index) => (
                    <div key={index} className="border p-4 rounded-md space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Add-on {index + 1}</h4>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeAddOn(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label>Name</Label>
                          <Input
                            value={addon.name}
                            onChange={(e) => handleAddOnChange(index, "name", e.target.value)}
                            placeholder="e.g., Metal Frame"
                          />
                        </div>
                        <div>
                          <Label>Price ($)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={addon.price}
                            onChange={(e) => handleAddOnChange(index, "price", Number.parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipping & Warranty Tab */}
        <TabsContent value="shipping" className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="deliveryTime">Delivery Time</Label>
              <Input
                id="deliveryTime"
                value={formData.deliveryTime}
                onChange={(e) => handleInputChange("deliveryTime", e.target.value)}
                placeholder="e.g., 2-3 weeks"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="warranty">Warranty</Label>
              <Input
                id="warranty"
                value={formData.warranty}
                onChange={(e) => handleInputChange("warranty", e.target.value)}
                placeholder="e.g., 2-year warranty"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
          Cancel
        </Button>

        <div className="flex space-x-2">
          {isEditing && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete Product
            </Button>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEditing ? "Update Product" : "Create Product"}
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> Confirm Product Deletion
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the product
              <span className="font-semibold"> {initialData?.name}</span>.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="confirm-slug">
                Type the product slug: <span className="font-bold">{initialData?.slug}</span>
              </Label>
              <Input
                id="confirm-slug"
                value={confirmSlug}
                onChange={(e) => setConfirmSlug(e.target.value)}
                placeholder={initialData?.slug}
                className={deleteError ? "border-red-500" : ""}
              />
              {deleteError && <p className="text-sm text-red-500">{deleteError}</p>}
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={confirmSlug !== initialData?.slug}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ImageModal
        isOpen={selectedImageModal.isOpen}
        onClose={() => setSelectedImageModal((prev) => ({ ...prev, isOpen: false }))}
        images={selectedImageModal.images}
        currentIndex={selectedImageModal.currentIndex}
        productName={selectedImageModal.productName}
      />
    </form>
  )
}
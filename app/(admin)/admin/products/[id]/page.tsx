"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ProductForm } from "@/components/product-form"
import type { Product } from "@/lib/db/schema"
import apiClient from "@/lib/axiosClient"

export default function EditProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const id = params.id as string
        console.log('Fetching product with ID:', id)
        
        // Gunakan apiClient (Otomatis handle Token)
        const response = await apiClient.get(`/api/products/admin/${id}`)
        
        if (response.data && response.data.success) {
            console.log('Fetched Product Data:', response.data.data)
            setProduct(response.data.data)
        } else {
            throw new Error(response.data.message || "Failed to fetch product")
        }

      } catch (err: any) {
        console.error("Error fetching product:", err)
        setError(err.message || "An unexpected error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  if (loading) {
    return <div className="p-8 text-center">Loading product...</div>
  }

  if (error || !product) {
    return (
        <div className="p-8 text-center text-red-500">
            Error: {error || "Product not found"}
        </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 font-jakarta">Edit Product: {product.name}</h1>
      <ProductForm initialData={product} isEditing />
    </div>
  )
}
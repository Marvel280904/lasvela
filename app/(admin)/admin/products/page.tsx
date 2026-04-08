"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Plus, Search, FileUp, ChevronLeft, ChevronRight } from "lucide-react"
import apiClient from "@/lib/axiosClient"
import type { Product } from "@/lib/db/schema"

// Pagination component for admin
function AdminPagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const getVisiblePages = () => {
    if (totalPages <= 7) return pages
    if (currentPage <= 4) {
      return [...pages.slice(0, 5), "...", totalPages]
    }
    if (currentPage >= totalPages - 3) {
      return [1, "...", ...pages.slice(totalPages - 5)]
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-2">
      <Button variant="outline" size="icon" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getVisiblePages().map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="px-3 py-2">
            ...
          </span>
        ) : (
          <Button
            key={`page-${page}`}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page as number)}
            className="min-w-[2.5rem]"
          >
            {page}
          </Button>
        ),
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // State untuk menyimpan SEMUA data master 
  const [allProducts, setAllProducts] = useState<Product[]>([]) 
  // State untuk menyimpan data yang ditampilkan (setelah filter & paginate)
  const [products, setProducts] = useState<Product[]>([])
  
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [totalProducts, setTotalProducts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 9

  // Get current page and search from URL
  useEffect(() => {
    const page = searchParams.get("page")
    const search = searchParams.get("search")

    if (page) {
      setCurrentPage(Number.parseInt(page))
    }
    if (search) {
      setSearchTerm(search)
    }
  }, [searchParams])

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (term.trim()) {
        params.set("search", term)
        params.set("page", "1")
      } else {
        params.delete("search")
        params.set("page", "1")
      }
      router.push(`/admin/products?${params.toString()}`)
    }, 300),
    [searchParams, router],
  )

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    debouncedSearch(value)
  }

  // FETCH DATA
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true)
        // Hit API Internal
        const response = await apiClient.get("/api/products/admin/all?limit=1000")
        
        if (response.data && response.data.success) {
            // Filter data valid saja (id tidak null)
            const validData = (response.data.data || []).filter((p: any) => p && p.id);
            setAllProducts(validData)
        }
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllProducts()
  }, []) // Empty dependency array = run once on mount

  // LOGIC CLIENT-SIDE FILTERING & PAGINATION
  // Setiap kali allProducts, searchTerm, atau currentPage berubah, hitung ulang apa yang ditampilkan
  useEffect(() => {
    let result = allProducts

    // Filter Search
    if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase()
        result = result.filter(product => 
            product.name.toLowerCase().includes(lowerTerm) || 
            product.category.toLowerCase().includes(lowerTerm)
        )
    }

    setTotalProducts(result.length)

    // Pagination Slice
    const startIndex = (currentPage - 1) * productsPerPage
    const endIndex = startIndex + productsPerPage
    const paginatedResult = result.slice(startIndex, endIndex)

    setProducts(paginatedResult)

  }, [allProducts, searchTerm, currentPage])


  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / productsPerPage) || 1

  // Handle page change
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`/admin/products?${params.toString()}`)
    setCurrentPage(page)
  }

  return (
    <div className="container mx-auto py-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-4xl font-bold">Products</h1>
        <div className="flex flex-col sm:flex-row gap-2">

          {/* <Button asChild variant="outline" className="flex items-center gap-2">
            <Link href="/admin/products/import">
              <FileUp className="h-4 w-4" />
              Import Products
            </Link>
          </Button> */}
          
          <Button asChild className="flex items-center gap-2">
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Product Management</CardTitle>
          <CardDescription>Manage your product catalog. Add, edit, or remove products from your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 rounded-[1rem]"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-muted-foreground mt-2">
              {totalProducts > 0
                ? `Found ${totalProducts} product${totalProducts === 1 ? "" : "s"} matching "${searchTerm}"`
                : `No products found matching "${searchTerm}"`}
            </p>
          )}
        </CardContent>
      </Card>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg" />
              <CardContent className="p-4">
                <div className="h-6 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No products found</h2>
          <p className="text-muted-foreground mb-6">
            {searchTerm ? `No products match your search for "${searchTerm}"` : "You haven't added any products yet"}
          </p>
          {searchTerm ? (
            <Button variant="outline" onClick={() => handleSearchChange("")}>
              Clear Search
            </Button>
          ) : (
            <Button asChild>
              <Link href="/admin/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video relative overflow-hidden bg-gray-100">
                  <img
                    src={product.thumbnailImage || product.images?.[0] || "/placeholder.svg?height=400&width=600"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                  {product.isWeeklyBestSeller && (
                    <Badge className="absolute top-2 right-2 bg-yellow-500">Best Seller</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-1 line-clamp-1">{product.name}</h2>
                  <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                  <p className="text-sm line-clamp-2 mb-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Badge variant={product.inStock ? "default" : "outline"} className="capitalize">
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                      <Badge variant={product.isVisible !== false ? "default" : "secondary"} className="capitalize">
                        {product.isVisible !== false ? "Visible" : "Hidden"}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/admin/products/${product.id}`)}
                      className="flex items-center"
                    >
                      <Pencil className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Product count and pagination */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing {(currentPage - 1) * productsPerPage + 1} to{" "}
            {Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts} products
            {searchTerm && ` matching "${searchTerm}"`}
          </div>

          {totalPages > 1 && (
            <AdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </>
      )}
    </div>
  )
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout
  return function(this: any, ...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  } as any
}
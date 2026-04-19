import apiClient from "@/lib/axiosClient"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ArticleListClient } from "./ArticleListClient"

export const dynamic = "force-dynamic"

interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  thumbnailImage: string
  images: string[]
  isPublished: boolean
  createdAt: string
}

export default async function ArticlesPage() {
  const cookieStore = await cookies()
  const tokenCookie = cookieStore.get("admin_token")
  const token = tokenCookie?.value

  if (!token) {
    redirect("/admin/login")
  }

  let articles: Article[] = []

  try {
    const response = await apiClient.get("/api/articles/admin?limit=100", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    if (response.data?.success && Array.isArray(response.data.data)) {
      articles = response.data.data
    } else if (Array.isArray(response.data)) {
      articles = response.data
    } else {
      console.error("Invalid API response format for articles:", response.data)
    }
  } catch (error) {
    console.error("Error loading articles:", error)
  }

  return (
    <div className="container max-w-7xl mx-auto">

      {articles.length === 0 ? (
        <div className="bg-white p-10 mt-6 text-center rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No articles found. Create your first article to get started.</p>
        </div>
      ) : (
        <ArticleListClient articles={articles} />
      )}
    </div>
  )
}

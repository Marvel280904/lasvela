import { notFound, redirect } from "next/navigation"
import { cookies } from "next/headers"
import { ArticleForm } from "@/components/article-form"
import apiClient from "@/lib/axiosClient"

interface ArticleEditPageProps {
  params: {
    id: string
  }
}

export const dynamic = "force-dynamic"

export default async function ArticleEditPage({ params }: ArticleEditPageProps) {
  const cookieStore = await cookies()
  const tokenCookie = cookieStore.get("admin_token")
  const token = tokenCookie?.value

  if (!token) {
    redirect("/admin/login")
  }

  const resolvedParams = await params
  const articleId = resolvedParams.id

  let article = null

  try {
    const response = await apiClient.get(`/api/articles/${articleId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.data && response.data.data) {
        article = response.data.data
    } else if (response.data) {
        article = response.data
    }
  } catch (error: any) {
    console.error(`Error fetching article with id ${articleId}:`, error.message)
    if (error.response && error.response.status === 404) {
        notFound()
    }
  }

  if (!article) {
    notFound()
  }

  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Edit Article: {article.title}</h1>
      <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
        <ArticleForm initialData={article} isEditing />
      </div>
    </div>
  )
}

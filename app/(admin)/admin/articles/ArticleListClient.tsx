"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Clock, ArrowRight, Search } from "lucide-react"
import { AddArticleDialog } from "@/components/add-article-dialog"

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

interface ArticleListClientProps {
  articles: Article[]
}

export function ArticleListClient({ articles }: ArticleListClientProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">Articles</h1>
        <div className="flex items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search by title..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <AddArticleDialog />
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <div className="bg-white p-10 mt-6 text-center rounded-[2px] border border-dashed border-gray-300">
          <p className="text-gray-500">
            {searchTerm ? "No articles match your search." : "No articles found."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
             <div 
               key={article.id} 
               className="border border-gray-200 bg-[#FAF9F6] rounded-[2px] overflow-hidden flex flex-col shadow-sm"
             >
               {/* Image Container */}
               <div className="relative h-60 w-full overflow-hidden shrink-0">
                 <img 
                   src={article.thumbnailImage || (article.images && article.images[0]) || 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&q=80'} 
                   alt={article.title}
                   className="absolute inset-0 w-full h-full object-cover"
                 />
                 <Badge 
                   variant={article.isPublished ? "default" : "secondary"} 
                   className="absolute top-3 right-3 bg-white/90 text-black border-none shadow-sm capitalize font-medium"
                 >
                   {article.isPublished ? 'Published' : 'Draft'}
                 </Badge>
               </div>
               
               {/* Content Container */}
               <div className="p-6 flex-1 flex flex-col bg-white border border-gray-200 m-2 rounded-[2px]">
                 <h2 className="text-[1.35rem] font-medium uppercase mb-3 text-gray-900 tracking-wide line-clamp-2">
                   {article.title}
                 </h2>
                 <p className="text-[0.9rem] leading-relaxed text-gray-600 line-clamp-3 mb-8 flex-1 font-light">
                   {article.excerpt}
                 </p>
                 
                 {/* Footer */}
                 <div className="flex items-center justify-between mt-auto pt-2">
                   <div className="flex items-center text-[0.85rem] text-gray-600 font-medium">
                     <Clock className="w-[14px] h-[14px] mr-1.5" />
                     {new Date(article.createdAt).toLocaleDateString('en-GB', { 
                       day: '2-digit', 
                       month: 'long', 
                       year: 'numeric' 
                     })}
                   </div>
                   <Button 
                     className="bg-[#2C3E50] hover:bg-[#1E2B38] text-white text-sm px-4 py-2 h-auto font-medium" 
                     size="sm"
                     asChild
                   >
                     <Link href={`/admin/articles/${article.id}`}>
                       Edit
                     </Link>
                   </Button>
                 </div>
               </div>
             </div>
          ))}
        </div>
      )}
    </div>
  )
}

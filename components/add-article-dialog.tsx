"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { ArticleForm } from "@/components/article-form"

export function AddArticleDialog() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Article
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Article</DialogTitle>
        </DialogHeader>
        <ArticleForm onSuccess={() => {
          setOpen(false)
          router.refresh()
        }} />
      </DialogContent>
    </Dialog>
  )
}

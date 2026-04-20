"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import { useRef } from "react"
import apiClient from "@/lib/axiosClient"
import { toast } from "sonner"
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Strikethrough, 
  Code, 
  Heading2, 
  Heading3, 
  Heading4, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  AlignCenter, 
  AlignJustify, 
  AlignLeft, 
  AlignRight,
  Link as LinkIcon,
  ImagePlus
} from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate if it's an image
    if (!file.type.startsWith('image/')) {
        toast.error("Invalid file type", { description: "Please select an image file." })
        return
    }

    const formData = new FormData()
    formData.append("file", file)

    const toastId = toast.loading("Uploading image...")

    try {
      const response = await apiClient.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.data.success) {
        const imageUrl = response.data.data.imageUrl
        editor.chain().focus().setImage({ src: imageUrl }).run()
        toast.success("Image uploaded successfully", { id: toastId })
      } else {
        throw new Error(response.data.message || "Upload failed")
      }
    } catch (error: any) {
      console.error("Image upload error:", error)
      toast.error("Upload failed", { 
        id: toastId,
        description: error.response?.data?.message || error.message || "Failed to upload image" 
      })
    } finally {
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }
  }

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50/50">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn("h-8 w-8 p-0", editor.isActive("bold") && "bg-gray-200")}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn("h-8 w-8 p-0", editor.isActive("italic") && "bg-gray-200")}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={cn("h-8 w-8 p-0", editor.isActive("underline") && "bg-gray-200")}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={cn("h-8 w-8 p-0", editor.isActive("strike") && "bg-gray-200")}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={cn("h-8 w-8 p-0", editor.isActive("code") && "bg-gray-200")}
      >
        <Code className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-200 mx-1 self-center" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn("h-8 w-8 p-0", editor.isActive("heading", { level: 2 }) && "bg-gray-200")}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn("h-8 w-8 p-0", editor.isActive("heading", { level: 3 }) && "bg-gray-200")}
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={cn("h-8 w-8 p-0", editor.isActive("heading", { level: 4 }) && "bg-gray-200")}
      >
        <Heading4 className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-200 mx-1 self-center" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={cn("h-8 w-8 p-0", editor.isActive({ textAlign: 'left' }) && "bg-gray-200")}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={cn("h-8 w-8 p-0", editor.isActive({ textAlign: 'center' }) && "bg-gray-200")}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={cn("h-8 w-8 p-0", editor.isActive({ textAlign: 'right' }) && "bg-gray-200")}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={cn("h-8 w-8 p-0", editor.isActive({ textAlign: 'justify' }) && "bg-gray-200")}
      >
        <AlignJustify className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-200 mx-1 self-center" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn("h-8 w-8 p-0", editor.isActive("bulletList") && "bg-gray-200")}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn("h-8 w-8 p-0", editor.isActive("orderedList") && "bg-gray-200")}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn("h-8 w-8 p-0", editor.isActive("blockquote") && "bg-gray-200")}
      >
        <Quote className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-200 mx-1 self-center" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={addLink}
        className={cn("h-8 w-8 p-0", editor.isActive("link") && "bg-gray-200")}
      >
        <LinkIcon className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        className="h-8 w-8 p-0"
      >
        <ImagePlus className="h-4 w-4" />
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="flex-grow" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="h-8 w-8 p-0"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="h-8 w-8 p-0"
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  )
}

export const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        link: false,
        underline: false,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg border shadow-sm max-w-full h-auto my-4',
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[250px] p-4",
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    immediatelyRender: false,
  })

  // Update content if value changes externally (e.g. initial load)
  if (editor && value !== editor.getHTML() && editor.isFocused === false) {
    editor.commands.setContent(value)
  }

  return (
    <div className="w-full border rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror {
          outline: none;
        }
        .ProseMirror h2 { font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem; }
        .ProseMirror h3 { font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem; }
        .ProseMirror h4 { font-size: 1.1rem; font-weight: bold; margin-bottom: 0.5rem; }
        .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; }
        .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; }
        
        .ProseMirror img[style*="text-align: center"] {
          margin-left: auto !important;
          margin-right: auto !important;
          display: block !important;
        }
        .ProseMirror img[style*="text-align: right"] {
          margin-left: auto !important;
          margin-right: 0 !important;
          display: block !important;
        }
        .ProseMirror img[style*="text-align: left"] {
          margin-left: 0 !important;
          margin-right: auto !important;
          display: block !important;
        }
      `}</style>
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import apiClient from "@/lib/axiosClient"

// Definisikan tipe data category
interface Category {
  id: string
  name: string
  slug: string
  parentId?: string | null
  parentName?: string | null
}


export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  let categories: Category[] = [];
  let parentCategories: { id: string, name: string }[] = [];

  try {
    const [catResponse, parentResponse] = await Promise.all([
      apiClient.get("/api/categories"),
      apiClient.get("/api/parent-categories")
    ]);
    
    // Parse Categories
    if (Array.isArray(catResponse.data)) {
      categories = catResponse.data;
    } else if (catResponse.data && Array.isArray(catResponse.data.data)) {
      categories = catResponse.data.data;
    } 

    // Parse Parent Categories
    if (Array.isArray(parentResponse.data)) {
      parentCategories = parentResponse.data;
    } else if (parentResponse.data && Array.isArray(parentResponse.data.data)) {
      parentCategories = parentResponse.data.data;
    }

    // Map parentId to parentName
    categories = categories.map(category => ({
      ...category,
      parentName: parentCategories.find(p => p.id === category.parentId)?.name || null
    }));
    
    console.log(`Successfully parsed ${categories.length} categories with parent names.`);

  } catch (error) {
    console.error("Error loading categories or parents:", error);
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button asChild>
          <Link href="/admin/categories/new" className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Category
          </Link>
        </Button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent Room</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Pastikan categories adalah array sebelum dicek length-nya */}
              {Array.isArray(categories) && categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                    No categories found. Create your first category to get started.
                  </td>
                </tr>
              ) : (
                // Gunakan optional chaining (?.) atau pastikan array aman
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{category.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.slug}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.parentName || <span className="text-gray-300 italic">None</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/categories/${category.id}`}>Edit</Link>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
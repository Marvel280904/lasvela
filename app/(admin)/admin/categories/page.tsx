import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import apiClient from "@/lib/axiosClient"

// Definisikan tipe data category
interface Category {
  id: string
  name: string
  slug: string
}

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  let categories: Category[] = [];

  try {
    const response = await apiClient.get("/api/categories");
    
    // DEBUGGING: Cek di terminal server (bukan browser console) apa outputnya
    console.log("Full API Response Data:", JSON.stringify(response.data, null, 2));

    // Cek apakah response.data adalah Array?
    if (Array.isArray(response.data)) {
      categories = response.data;
    } 
    // Cek apakah response.data memiliki properti 'data' yang berisi Array?
    else if (response.data && Array.isArray(response.data.data)) {
      categories = response.data.data;
    } 
    // Jika format lain, biarkan array kosong dan log error
    else {
      console.error("Struktur response API tidak dikenali (bukan array).");
    }
    
    console.log(`Successfully parsed ${categories.length} categories.`);

  } catch (error) {
    console.error("Error loading categories:", error);
    // categories tetap [] (array kosong) agar tidak crash saat .map
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
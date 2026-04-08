import { notFound } from "next/navigation"
import { CategoryForm } from "@/components/category-form"
import apiClient from "@/lib/axiosClient"

interface CategoryEditPageProps {
  params: {
    id: string
  }
}

// Memastikan halaman ini tidak di-cache statis agar data selalu fresh saat diedit
export const dynamic = "force-dynamic";

export default async function CategoryEditPage({ params }: CategoryEditPageProps) {
  const resolvedParams = await params;
  const categoryId = resolvedParams.id;

  let category = null;

  try {
    // Panggil API untuk get detail category berdasarkan ID
    const response = await apiClient.get(`/api/categories/${categoryId}`);

    // Cek apakah data langsung di response.data atau di response.data.data
    if (response.data && response.data.data) {
        category = response.data.data;
    } else if (response.data) {
        category = response.data;
    }

  } catch (error: any) {
    console.error(`Error fetching category with id ${categoryId}:`, error.message);
    // Jika error 404 atau data tidak ditemukan, biarkan category null
    if (error.response && error.response.status === 404) {
        notFound();
    }
  }

  // Jika setelah fetch category tetap null/undefined, lempar ke 404
  if (!category) {
    notFound();
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Category: {category.name}</h1>
      <CategoryForm initialData={category} isEditing />
    </div>
  )
}
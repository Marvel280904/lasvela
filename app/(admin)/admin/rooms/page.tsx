import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import apiClient from "@/lib/axiosClient"

interface Room {
  id: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

export const dynamic = "force-dynamic";

export default async function RoomsPage() {
  let rooms: Room[] = [];

  try {
    const response = await apiClient.get("/api/parent-categories");
    
    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      rooms = response.data.data;
    } else if (Array.isArray(response.data)) {
      rooms = response.data;
    } else {
      console.error("Unrecognized API response structure for rooms.");
    }
    
    console.log(`Successfully parsed ${rooms.length} rooms.`);

  } catch (error) {
    console.error("Error loading rooms:", error);
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Rooms (Parent Categories)</h1>
        <Button asChild>
          <Link href="/admin/rooms/new" className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Room
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
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                    No rooms found. Create your first room to get started.
                  </td>
                </tr>
              ) : (
                rooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{room.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.slug}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/rooms/${room.slug}`}>Edit</Link>
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

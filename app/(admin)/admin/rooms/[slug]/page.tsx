import { notFound } from "next/navigation"
import { RoomForm } from "@/components/room-form"
import apiClient from "@/lib/axiosClient"

interface RoomEditPageProps {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = "force-dynamic";

export default async function RoomEditPage({ params }: RoomEditPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let room = null;

  try {
    // Panggil API untuk get detail parent-category berdasarkan slug sesuai permintaan user
    const response = await apiClient.get(`/api/parent-categories/slug/${slug}`);

    if (response.data && response.data.success && response.data.data) {
        room = response.data.data;
    } else if (response.data && response.data.data) {
       // Just in case structure is slightly different
       room = response.data.data;
    } else if (response.data) {
        room = response.data;
    }

  } catch (error: any) {
    console.error(`Error fetching room with slug ${slug}:`, error.message);
    if (error.response && error.response.status === 404) {
        notFound();
    }
  }

  if (!room) {
    notFound();
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Room: {room.name}</h1>
      <RoomForm initialData={room} isEditing />
    </div>
  )
}

import Link from "next/link"
import { cookies } from "next/headers" // Import untuk baca cookie di server
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { UserPlus } from "lucide-react"
import apiClient from "@/lib/axiosClient"

interface User {
  id: string
  name: string
  email: string
  role: string
  lastLogin?: string | null
  createdAt: string
}

// Paksa render ulang tiap request agar data selalu baru
export const dynamic = "force-dynamic";

export default async function UsersPage() {
  // 1. GANTI LOGIC AUTH: Baca token langsung dari Cookie Server
  // getServerSession mungkin gagal jika NextAuth tidak sinkron dengan custom backend cookie
  const cookieStore = await cookies()
  const tokenCookie = cookieStore.get("admin_token")
  const token = tokenCookie?.value

  // Jika tidak ada token, anggap Unauthorized dan redirect ke login
  if (!token) {
    redirect("/admin/login") 
    // Atau return <div>Unauthorized</div> jika tidak ingin auto-redirect
  }

  let users: User[] = [];
  
  try {
    // 2. REQUEST DENGAN HEADER MANUAL
    // Kita harus inject header Authorization manual di sini karena 
    // interceptor 'js-cookie' di axiosClient TIDAK jalan di Server Side.
    const response = await apiClient.get("/api/users/admin", {
      headers: {
        Authorization: `Bearer ${token}` // Suntikkan token dari cookie server
      },
      params: {
        excludeSuperAdmins: "false" 
      }
    });

    if (Array.isArray(response.data)) {
      users = response.data;
    } else if (response.data && Array.isArray(response.data.data)) {
      users = response.data.data;
    } else if (response.data && Array.isArray(response.data.users)) {
      users = response.data.users;
    }
    
    console.log(`Fetched ${users.length} users.`);

  } catch (error) {
    console.error("Failed to fetch users:", error);
    // Jika error 401 (Token expired/invalid), bisa redirect manual
    // tapi kita biarkan tabel kosong dulu agar page tidak crash
  }

  const formatRole = (role: string) => {
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <Link href="/admin/users/new">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </Link>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden md:table-cell">Last Login</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === "super_admin"
                          ? "bg-red-100 text-red-800"
                          : user.role === "admin"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {formatRole(user.role)}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.lastLogin ? format(new Date(user.lastLogin), "MMM d, yyyy") : "Never"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(new Date(user.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/users/${user.id}`} className="text-primary hover:underline">
                      Edit
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
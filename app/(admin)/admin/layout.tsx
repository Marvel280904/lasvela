import type React from "react"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

// Helper Decode Token
function getUserFromToken(token: string) {
  try {
    const payload = token.split(".")[1]
    if (!payload) return null
    const decoded = JSON.parse(Buffer.from(payload, "base64").toString())
    return {
      name: decoded.name || "Admin",
      email: decoded.email || "admin@lasvela.sg",
      role: decoded.role || "admin",
    }
  } catch (error) {
    return null
  }
}

// Tambahkan 'async' 
export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Tambahkan 'await'
  const cookieStore = await cookies() 
  const token = cookieStore.get("admin_token")?.value

  if (!token) {
    redirect("/admin/login")
  }

  const user = getUserFromToken(token)

  if (!user) {
    redirect("/admin/login")
  }

  // Role Check (Optional logic)
  const isAuthorized = ["super_admin", "admin", "editor"].includes(user.role)
  if (!isAuthorized) {
     // redirect("/") 
  }

  return (
    <div className="min-h-screen bg-gray-50 flex font-jakarta">
      
      {/* Sidebar Component */}
      <AdminSidebar userRole={user.role} />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col md:pl-64 transition-all duration-300">
        
        {/* Header Component */}
        <AdminHeader userEmail={user.email} userName={user.name} />

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
      </div>
    </div>
  )
}
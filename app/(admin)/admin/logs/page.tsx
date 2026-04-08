import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ActivityLogTable } from "@/components/activity-log-table"
import apiClient from "@/lib/axiosClient"

// Definisikan tipe data Log sesuai dengan API response
interface ActivityLog {
  id: string
  userId: string
  userEmail: string
  action: string
  details: string
  ipAddress: string
  userAgent: string
  timestamp: string
  entityId?: string
  entityType?: string
}

export const dynamic = "force-dynamic"

export default async function ActivityLogsPage() {
  // 1. Ambil Token dari Cookie (ASYNC)
  const cookieStore = await cookies() // <-- TAMBAHKAN 'await' DI SINI
  const tokenCookie = cookieStore.get("admin_token")
  const token = tokenCookie?.value

  // Jika tidak ada token, redirect ke login
  if (!token) {
    redirect("/admin/login")
  }

  let logs: ActivityLog[] = []

  try {
    // 2. Fetch Data dari API Logs
    const response = await apiClient.get("/api/logs/admin?limit=50", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    console.log("API Response:", response.data)

    // 3. Parsing Data berdasarkan format yang diharapkan
    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      logs = response.data.data.map((log: any) => ({
        id: log.id || "",
        userId: log.userId || "",
        userEmail: log.userEmail || "",
        action: log.action || "",
        details: log.details || "",
        ipAddress: log.ipAddress || "",
        userAgent: log.userAgent || "",
        timestamp: log.timestamp || log.createdAt || new Date().toISOString(),
        entityId: log.entityId,
        entityType: log.entityType,
      }))
    } else if (Array.isArray(response.data)) {
      // Jika API langsung mengembalikan array
      logs = response.data.map((log: any) => ({
        id: log.id || "",
        userId: log.userId || "",
        userEmail: log.userEmail || "",
        action: log.action || "",
        details: log.details || "",
        ipAddress: log.ipAddress || "",
        userAgent: log.userAgent || "",
        timestamp: log.timestamp || log.createdAt || new Date().toISOString(),
        entityId: log.entityId,
        entityType: log.entityType,
      }))
    } else if (response.data && Array.isArray(response.data.logs)) {
      logs = response.data.logs.map((log: any) => ({
        id: log.id || "",
        userId: log.userId || "",
        userEmail: log.userEmail || "",
        action: log.action || "",
        details: log.details || "",
        ipAddress: log.ipAddress || "",
        userAgent: log.userAgent || "",
        timestamp: log.timestamp || log.createdAt || new Date().toISOString(),
        entityId: log.entityId,
        entityType: log.entityType,
      }))
    }

    console.log(`Fetched ${logs.length} logs successfully.`)
    console.log("First log:", logs[0])

  } catch (error: any) {
    console.error("Failed to fetch logs:", error)
    console.error("Error details:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    })

    // 4. Handle Super Admin Check
    if (error.response?.status === 403) {
      redirect("/admin")
    }
    
    if (error.response?.status === 401) {
      redirect("/admin/login")
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Activity Logs</h1>
      <p className="text-muted-foreground mb-6">
        View all activity logs for the admin panel. This includes user logins, product changes, and user management
        actions.
      </p>

      {/* Kirim data logs ke ActivityLogTable */}
      <ActivityLogTable data={logs} />
    </div>
  )
}
// components/activity-log-table.tsx
"use client"

import { useState, useMemo } from "react"
import { format, isAfter, isBefore, startOfDay, endOfDay } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/old-pagination"
import { Badge } from "@/components/ui/badge"

// tipe data sesuai dengan API response
export interface ActivityLog {
  id: string
  userId: string
  userEmail: string
  action: string
  details: string
  ipAddress: string
  userAgent?: string
  timestamp: string
  entityId?: string
  entityType?: string
}

interface ActivityLogTableProps {
  data: ActivityLog[]
}

// Helper untuk format teks action
function formatAction(action: string): string {
  if (!action) return "Unknown Action"

  // Mapping untuk action yang umum
  const actionMap: Record<string, string> = {
    "login": "Login",
    "logout": "Logout",
    "create_user": "Create User",
    "update_user": "Update User",
    "delete_user": "Delete User",
    "create_product": "Create Product",
    "update_product": "Update Product",
    "delete_product": "Delete Product",
    "view_users": "View Users",
    "view_products": "View Products",
    "view_logs": "View Logs",
  }

  // Jika ada mapping, gunakan mapping
  if (actionMap[action]) {
    return actionMap[action]
  }

  // Fallback: format dari snake_case ke Title Case
  return action
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// Helper untuk badge color berdasarkan action type
function getActionBadgeColor(action: string): string {
  if (action.includes("create")) return "bg-green-100 text-green-800 border-green-200"
  if (action.includes("update")) return "bg-blue-100 text-blue-800 border-blue-200"
  if (action.includes("delete")) return "bg-red-100 text-red-800 border-red-200"
  if (action === "login") return "bg-purple-100 text-purple-800 border-purple-200"
  if (action === "logout") return "bg-gray-100 text-gray-800 border-gray-200"
  if (action.includes("view")) return "bg-amber-100 text-amber-800 border-amber-200"
  return "bg-gray-100 text-gray-800 border-gray-200"
}

export function ActivityLogTable({ data = [] }: ActivityLogTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // State untuk filter
  const [filters, setFilters] = useState({
    action: "all",
    search: "",
    fromDate: "",
    toDate: "",
  })

  // Get unique actions for filter dropdown
  const uniqueActions = useMemo(() => {
    const actions = [...new Set(data.map(log => log.action))]
    return actions.sort()
  }, [data])

  // LOGIKA UTAMA: Filter data secara Client-Side
  const filteredLogs = useMemo(() => {
    return data.filter((log) => {
      // 1. Filter by Action
      if (filters.action !== "all" && log.action !== filters.action) {
        return false
      }

      // 2. Filter by Search (EMAIL ONLY - tidak termasuk details)
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesEmail = log.userEmail.toLowerCase().includes(searchLower)
        
        // Hanya cek email, TIDAK cek details atau userId
        if (!matchesEmail) {
          return false
        }
      }

      // 3. Filter by Date
      const logDate = new Date(log.timestamp)
      
      if (filters.fromDate) {
        const from = startOfDay(new Date(filters.fromDate))
        if (isBefore(logDate, from)) return false
      }

      if (filters.toDate) {
        const to = endOfDay(new Date(filters.toDate))
        if (isAfter(logDate, to)) return false
      }

      return true
    })
  }, [data, filters])

  // LOGIKA PAGINATION: Slice data yang sudah difilter
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Reset ke halaman 1 jika filter berubah
  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setFilters({
      action: "all",
      search: "",
      fromDate: "",
      toDate: "",
    })
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="bg-muted/40 p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-semibold">Filter Logs</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Action Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium block">Action</label>
            <Select
              value={filters.action}
              onValueChange={(value) => handleFilterChange("action", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                {uniqueActions.map((action) => (
                  <SelectItem key={action} value={action}>
                    {formatAction(action)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Filter - EMAIL ONLY */}
          <div className="space-y-2">
            <label className="text-sm font-medium block">Search Email</label>
            <Input
              placeholder="Search email..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full"
            />
          </div>

          {/* Date Filters */}
          <div className="space-y-2">
            <label className="text-sm font-medium block">From Date</label>
            <Input
              type="date"
              value={filters.fromDate}
              onChange={(e) => handleFilterChange("fromDate", e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">To Date</label>
            <Input
              type="date"
              value={filters.toDate}
              onChange={(e) => handleFilterChange("toDate", e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="outline" onClick={resetFilters} className="h-9 px-4">
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center px-1">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-semibold">{paginatedLogs.length}</span> of{" "}
          <span className="font-semibold">{filteredLogs.length}</span> logs (Total loaded:{" "}
          <span className="font-semibold">{data.length}</span>)
        </div>
      </div>

      {/* Logs Table - FULL WIDTH */}
      <div className="border rounded-lg overflow-hidden w-full">
        <div className="w-full overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[15%] min-w-[150px] font-semibold">Timestamp</TableHead>
                <TableHead className="w-[20%] min-w-[180px] font-semibold">User</TableHead>
                <TableHead className="w-[10%] min-w-[100px] font-semibold">Action</TableHead>
                <TableHead className="w-[20%] min-w-[200px] font-semibold">IP Address</TableHead>
                <TableHead className="w-[35%] min-w-[250px] font-semibold">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="text-muted-foreground">
                        {data.length === 0 ? "No logs loaded from API." : "No logs match your filters."}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-muted/30 border-b">
                    {/* Timestamp */}
                    <TableCell className="whitespace-nowrap py-4">
                      <div className="font-medium">{format(new Date(log.timestamp), "MMM d, yyyy")}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {format(new Date(log.timestamp), "HH:mm:ss")}
                      </div>
                    </TableCell>

                    {/* User Email */}
                    <TableCell className="py-4">
                      <div className="font-medium truncate max-w-[180px]" title={log.userEmail}>
                        {log.userEmail}
                      </div>
                    </TableCell>

                    {/* Action */}
                    <TableCell className="py-4">
                      <Badge 
                        variant="outline" 
                        className={`${getActionBadgeColor(log.action)} border text-xs font-medium px-2 py-1`}
                      >
                        {formatAction(log.action)}
                      </Badge>
                    </TableCell>

                    {/* IP Address + User Agent */}
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <div className="font-jakarta text-sm font-medium">
                          {log.ipAddress}
                        </div>
                        {log.userAgent && (
                          <div 
                            className="text-xs font-jakarta text-muted-foreground truncate max-w-[180px] font-mono"
                            title={log.userAgent}
                          >
                            {log.userAgent}
                          </div>
                        )}
                      </div>
                    </TableCell>

                    {/* Details */}
                    <TableCell className="py-4">
                      <div 
                        className="text-sm truncate max-w-[350px]" 
                        title={log.details}
                      >
                        {log.details}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} 
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-muted"}
                  size="sm"
                />
              </PaginationItem>

              {/* Page Indicator */}
              <PaginationItem>
                <div className="flex items-center px-4 h-9">
                  <span className="text-sm">
                    Page <span className="font-semibold">{currentPage}</span> of{" "}
                    <span className="font-semibold">{totalPages}</span>
                  </span>
                </div>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-muted"}
                  size="sm"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingBag,
  FolderTree,
  Users,
  Activity,
  Package,
  Settings
} from "lucide-react"

interface AdminSidebarProps {
  userRole?: string
}

export function AdminSidebar({ userRole }: AdminSidebarProps) {
  const pathname = usePathname()

  const isSuperAdmin = userRole === "super_admin"
  const isAdmin = userRole === "admin" || isSuperAdmin

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      allowed: true
    },
    {
      label: "Products",
      href: "/admin/products",
      icon: ShoppingBag,
      allowed: true
    },
    {
      label: "Categories",
      href: "/admin/categories",
      icon: FolderTree,
      allowed: true
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: Users,
      allowed: isAdmin
    },
    {
      label: "Activity Logs",
      href: "/admin/logs",
      icon: Activity,
      allowed: isSuperAdmin
    },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed inset-y-0 z-50">
      {/* Logo Section */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="flex items-center gap-2 text-blue-600">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <Package className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">LASVELA Admin</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          if (!item.allowed) return null
          
          // Logic active state (exact match untuk root, startsWith untuk sub-pages)
          const isActive = item.href === "/admin" 
            ? pathname === "/admin"
            : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group relative",
                isActive 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-gray-500 hover:bg-blue-50 hover:text-blue-700"
              )}
            >
              {/* Active Indicator Line */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />
              )}

              <item.icon className={cn("w-5 h-5", isActive ? "text-blue-600" : "text-gray-400 group-hover:text-blue-700")} />
              {item.label}
            </Link>
          )
        })}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-gray-100">
        <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Role</p>
            <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-md capitalize">
              {userRole?.replace("_", " ")}
            </span>
        </div>
      </div>
    </aside>
  )
}
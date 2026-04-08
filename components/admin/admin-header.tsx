"use client"

import { Search, Bell, User } from "lucide-react"
import { SignOutButton } from "@/components/admin/sign-out-button"

interface AdminHeaderProps {
  userEmail?: string
  userName?: string
}

export function AdminHeader({ userEmail, userName }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40 px-6 flex items-center justify-between">
      {/* Left: Search Bar */}
      <div className="flex-1 max-w-lg hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-[1rem] text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 text-gray-600 placeholder:text-gray-800"
          />
        </div>
      </div>

      {/* Mobile Title (Visible only on mobile) */}
      <h1 className="text-lg font-bold text-gray-800 md:hidden">ESSEN</h1>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Notification 
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        */}

        {/* Divider */}
        <div className="h-7 w-px bg-gray-400 hidden md:block" />

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-gray-700">{userName}</p>
            <p className="text-xs text-gray-400">{userEmail}</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md">
             <User className="w-5 h-5" />
          </div>
          
          {/* Sign Out (Integrated) */}
          <div className="ml-2">
             <SignOutButton />
          </div>
        </div>
      </div>
    </header>
  )
}
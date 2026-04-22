"use client"

import { cn } from "@/lib/utils"

interface TabItem {
  value: string
  label: string
}

interface CustomTabProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (value: string) => void
  className?: string
}

export function CustomTab({ tabs, activeTab, onChange, className }: CustomTabProps) {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              "px-6 py-4 text-left text-lg font-be-vietnam font-medium transition-all duration-300 rounded-full",
              isActive
                ? "bg-[#2c3e50] text-white shadow-md font-medium" // Active State
                : "bg-white text-black hover:bg-gray-200" // Inactive State
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { CustomTab } from "@/components/ui/custom-tab"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { UseTerms } from "./use-terms"
import { Warranty } from "./warranty"
import { ReturnPolicy } from "./return-policy"
import { FreeStorage } from "./free-storage"
import { FAQ } from "./faq"
import { DisposalService } from "./disposal-service"
import { DeliveryInformation } from "./delivery-information"
import { CancellationPolicy } from "./cancellation-policy"

export function TermsContainer() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("terms")
  
  // 2. Buat Ref untuk menandai container utama
  const containerRef = useRef<HTMLDivElement>(null)

  const tabs = [
    { value: "terms", label: "Use Terms" },
    { value: "warranty", label: "Warranty" },
    { value: "faq", label: "FAQ" },
    { value: "delivery", label: "Delivery Information" },
    { value: "return", label: "Return Policy" },
    { value: "cancellation", label: "Cancellation Policy" },
    { value: "disposal", label: "Disposal Service" },
    { value: "storage", label: "Free Storage" },
  ]

  useEffect(() => {
    const tabParam = searchParams.get("tab")
    if (tabParam) {
      const isValidTab = tabs.some(t => t.value === tabParam)
      if (isValidTab) {
        setActiveTab(tabParam)
        
        // LOGIC AUTO SCROLL
        // Jika ada parameter tab di URL, scroll ke containerRef
        if (containerRef.current) {
            setTimeout(() => {
                containerRef.current?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start'
                })
            }, 100)
        }
      }
    }
  }, [searchParams])

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "terms": return <UseTerms />
      case "warranty": return <Warranty />
      case "faq": return <FAQ />
      case "delivery": return <DeliveryInformation />
      case "return": return <ReturnPolicy />
      case "cancellation": return <CancellationPolicy />
      case "disposal": return <DisposalService />
      case "storage": return <FreeStorage />
      default: return <UseTerms />
    }
  }

  return (
    <div 
        ref={containerRef}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start scroll-mt-32" 
    >
      
      {/* Left Side: Navigation */}
      <div className="lg:col-span-3 lg:sticky lg:top-32">
        <ScrollAnimation animation="fade-in slide-in-from-left-8">
          
          <CustomTab 
            tabs={tabs} 
            activeTab={activeTab} 
            onChange={(value) => {
                setActiveTab(value)
            }} 
          />
        </ScrollAnimation>
      </div>

      {/* Right Side: Content Container */}
      <div className="lg:col-span-9 bg-white min-h-[600px] p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-sm">
        <ScrollAnimation animation="fade-in slide-in-from-bottom-8" key={activeTab}>
          <div className="max-w-5xl mx-auto">
            {renderContent()}
          </div>
        </ScrollAnimation>
      </div>

    </div>
  )
}
"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  animation?: string
  duration?: string
  delay?: string
  style?: React.CSSProperties
}

export function ScrollAnimation({
  children,
  className,
  animation = "fade-in slide-in-from-bottom-10",
  duration = "duration-700",
  delay = "delay-0",
  style,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={style} 
      className={cn(
        "transition-all ease-out",
        isVisible 
          ? `opacity-100 animate-in ${animation} ${duration} ${delay} fill-mode-forwards` 
          : "opacity-0 translate-y-8",
        className
      )}
    >
      {children}
    </div>
  )
}
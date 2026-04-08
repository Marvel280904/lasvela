"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  currentIndex?: number
  productName: string
}

export function ImageModal({ isOpen, onClose, images, currentIndex = 0, productName }: ImageModalProps) {
  const [activeIndex, setActiveIndex] = useState(currentIndex)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 })
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate panning constraints
  const calculateConstraints = useCallback(() => {
    if (!imageRef.current || !containerRef.current || scale <= 1) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 }
    }

    const containerRect = containerRef.current.getBoundingClientRect()
    const imageRect = imageRef.current.getBoundingClientRect()

    // Get the actual displayed image dimensions (after object-contain scaling)
    const imageNaturalWidth = imageRef.current.naturalWidth
    const imageNaturalHeight = imageRef.current.naturalHeight
    const containerWidth = containerRect.width
    const containerHeight = containerRect.height

    // Calculate the scale factor applied by object-contain
    const scaleToFit = Math.min(containerWidth / imageNaturalWidth, containerHeight / imageNaturalHeight)

    // Actual displayed dimensions before zoom
    const displayedWidth = imageNaturalWidth * scaleToFit
    const displayedHeight = imageNaturalHeight * scaleToFit

    // Dimensions after zoom
    const scaledWidth = displayedWidth * scale
    const scaledHeight = displayedHeight * scale

    // Calculate maximum pan distances
    const maxPanX = Math.max(0, (scaledWidth - containerWidth) / 2)
    const maxPanY = Math.max(0, (scaledHeight - containerHeight) / 2)

    return {
      minX: -maxPanX,
      maxX: maxPanX,
      minY: -maxPanY,
      maxY: maxPanY,
    }
  }, [scale, imageDimensions, containerDimensions])

  // Constrain position within bounds
  const constrainPosition = useCallback(
    (newPosition: { x: number; y: number }) => {
      const constraints = calculateConstraints()

      return {
        x: Math.max(constraints.minX, Math.min(constraints.maxX, newPosition.x)),
        y: Math.max(constraints.minY, Math.min(constraints.maxY, newPosition.y)),
      }
    },
    [calculateConstraints],
  )

  // Update container dimensions on resize
  useEffect(() => {
    const updateContainerDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setContainerDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateContainerDimensions()
    window.addEventListener("resize", updateContainerDimensions)
    return () => window.removeEventListener("resize", updateContainerDimensions)
  }, [isOpen])

  // Reset zoom and position when image changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(currentIndex)
      setScale(1)
      setPosition({ x: 0, y: 0 })
      setImageLoaded(false)
    }
  }, [isOpen, currentIndex])

  // Reset zoom and position when changing images
  useEffect(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
    setImageLoaded(false)
  }, [activeIndex])

  // Constrain position when scale changes
  useEffect(() => {
    if (scale > 1) {
      setPosition((prev) => constrainPosition(prev))
    } else {
      setPosition({ x: 0, y: 0 })
    }
  }, [scale, constrainPosition, imageDimensions, containerDimensions])

  // Zoom functions
  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(5, prev + 0.25))
  }, [])

  const zoomOut = useCallback(() => {
    setScale((prev) => Math.max(0.25, prev - 0.25))
  }, [])

  const resetZoom = useCallback(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  // Mouse wheel zoom with proper event handling
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setScale((prev) => {
      const newScale = Math.max(0.25, Math.min(5, prev + delta))
      return newScale
    })
  }, [])

  // Mouse drag to pan with constraints
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (scale > 1) {
        e.preventDefault()
        setIsDragging(true)
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
      }
    },
    [scale, position],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging && scale > 1) {
        e.preventDefault()
        const newPosition = {
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        }

        // Apply constraints to the new position
        const constrainedPosition = constrainPosition(newPosition)
        setPosition(constrainedPosition)
      }
    },
    [isDragging, dragStart, scale, constrainPosition],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Navigation functions
  const goToPrevious = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

  const handleClose = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
    setImageLoaded(false)
    onClose()
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          goToPrevious()
          break
        case "ArrowRight":
          e.preventDefault()
          goToNext()
          break
        case "Escape":
          e.preventDefault()
          handleClose()
          break
        case "r":
        case "R":
          e.preventDefault()
          resetZoom()
          break
        case "+":
        case "=":
          e.preventDefault()
          zoomIn()
          break
        case "-":
          e.preventDefault()
          zoomOut()
          break
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, zoomIn, zoomOut, resetZoom])

  const handleImageLoad = () => {
    setImageLoaded(true)
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl w-[95vw] h-[85vh] p-0 overflow-hidden">
        <div className="relative w-full h-full bg-black rounded-lg">
          {/* Header with controls */}
          <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-3 bg-gradient-to-b from-black/80 to-transparent rounded-t-lg">
            <div className="flex items-center gap-3 text-white">
              <span className="text-sm font-medium">
                {activeIndex + 1} / {images.length}
              </span>
              <span className="text-sm">{Math.round(scale * 100)}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={zoomOut}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
                disabled={scale <= 0.25}
              >
                <ZoomOut className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetZoom}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <RotateCcw className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={zoomIn}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
                disabled={scale >= 5}
              >
                <ZoomIn className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
                onClick={handleClose}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Main image container */}
          <div className="absolute inset-0 pt-12 pb-20">
            <div
              ref={containerRef}
              className="w-full h-full flex items-center justify-center relative overflow-hidden"
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{
                cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
              }}
            >
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
              <img
                ref={imageRef}
                src={images[activeIndex] || "/placeholder.svg"}
                alt={`${productName} - Image ${activeIndex + 1}`}
                className="max-w-full max-h-full object-contain select-none transition-transform duration-200"
                style={{
                  transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                  transformOrigin: "center center",
                  opacity: imageLoaded ? 1 : 0,
                }}
                draggable={false}
                onLoad={handleImageLoad}
                onError={() => setImageLoaded(true)}
              />
            </div>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-40 text-white hover:bg-white/20 bg-black/30 h-10 w-10"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-40 text-white hover:bg-white/20 bg-black/30 h-10 w-10"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>

          {/* Thumbnails - Fixed at bottom */}
          {images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 z-40 p-3 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <div className="flex justify-center gap-2 overflow-x-auto">
                <div className="flex gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`flex-shrink-0 w-12 h-12 rounded border-2 overflow-hidden transition-all ${
                        index === activeIndex
                          ? "border-white shadow-lg scale-110"
                          : "border-white/30 hover:border-white/60 hover:scale-105"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Instructions overlay */}
          <div className="absolute bottom-16 left-3 z-40 text-white/70 text-xs bg-black/50 p-2 rounded max-w-48">
            <div>🖱️ Wheel: Zoom</div>
            <div>🖱️ Drag: Pan (constrained)</div>
            <div>⌨️ ←→: Navigate</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

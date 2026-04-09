"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export const LightboxModal = ({ imgUrl, onClose }: { imgUrl: string, onClose: () => void }) => {
  // STATE ZOOM & DRAG
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })

  // Reset zoom saat ganti gambar
  useEffect(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [imgUrl])

  // Disable scroll body saat zoom
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "unset" }
  }, [])

  // LOGIC ZOOM
  const handleWheel = (e: React.WheelEvent) => {
    // Zoom Speed
    const zoomIntensity = 0.1
    // Arah scroll: ke atas (negatif) = zoom in, ke bawah (positif) = zoom out
    const direction = e.deltaY < 0 ? 1 : -1
    
    // Hitung scale baru (batasi min 1, max 4)
    const newScale = Math.min(Math.max(1, scale + direction * zoomIntensity), 4)
    
    setScale(newScale)

    // Jika zoom balik ke 1, reset posisi ke tengah
    if (newScale === 1) {
      setPosition({ x: 0, y: 0 })
    }
  }

  // LOGIC DRAG
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault() // prevent standard html drag actions
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // MANUAL ZOOM BUTTONS
  const zoomIn = () => setScale(s => Math.min(s + 0.5, 4))
  const zoomOut = () => {
    setScale(s => {
        const newS = Math.max(s - 0.5, 1)
        if (newS === 1) setPosition({x: 0, y: 0})
        return newS
    })
  }

  return (
    <div className="fixed inset-0 z-[999] bg-[#F8F5EA]/95 backdrop-blur-sm flex flex-col overscroll-none pb-4">
      {/* Top Bar Navigation */}
      <div className="w-full p-4 flex justify-between items-center z-50">
        <div className="flex space-x-2 items-center">
            <button onClick={zoomIn} className="w-8 h-8 flex items-center justify-center bg-white text-[#2c3e50] shadow-sm rounded-sm font-semibold text-lg hover:bg-gray-50 transition-colors">+</button>
            <button onClick={zoomOut} className="w-8 h-8 flex items-center justify-center bg-white text-[#2c3e50] shadow-sm rounded-sm font-semibold text-lg hover:bg-gray-50 transition-colors">-</button>
            <p className="font-be-vietnam text-[8px] md:text-xs tracking-widest text-[#2c3e50] uppercase px-4 py-2 bg-white rounded-full shadow-sm ml-4 border">
              Scroll to Zoom &bull; Drag to Pan
            </p>
        </div>
        <button 
          onClick={onClose}
          className="bg-white p-3 rounded-full text-[#2c3e50] hover:bg-red-50 hover:text-red-600 transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Interactive Container */}
      <div 
         className={`flex-1 w-full overflow-hidden flex items-center justify-center ${scale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'}`}
         onWheel={handleWheel}
         onMouseDown={handleMouseDown}
         onMouseMove={handleMouseMove}
         onMouseUp={handleMouseUp}
         onMouseLeave={handleMouseUp}
      >
        <div
          style={{
             transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
             transition: isDragging ? 'none' : 'transform 0.15s ease-out'
          }}
          className="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center select-none"
        >
           <img src={imgUrl} draggable={false} className="max-h-[85vh] max-w-[90vw] object-contain select-none shadow-2xl rounded-sm" />
        </div>
      </div>
    </div>
  )
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export const Accordion = ({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-300/60 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center bg-transparent border-none focus:outline-none"
      >
        <h4 className="font-michroma text-sm font-semibold tracking-wide text-[#2c3e50]">{title}</h4>
        {isOpen ? <ChevronUp className="w-4 h-4 text-[#2c3e50]/70" /> : <ChevronDown className="w-4 h-4 text-[#2c3e50]/70" />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 text-sm font-be-vietnam text-[#2c3e50]/80">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

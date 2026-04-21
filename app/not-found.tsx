"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FCF9EE] flex items-center justify-center px-6 selection:bg-[#2C3E50] selection:text-white">
      <div className="max-w-xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative p-12 md:p-20 bg-white border border-[#2C3E50]/5 shadow-2xl rounded-2xl overflow-hidden"
        >
          {/* Decorative Corner Element */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#2C3E50]/20 -mr-12 -mt-12 rotate-45" />
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-michroma font-bold text-[#2C3E50] leading-tight">
                Page Not Found
              </h1>
              <p className="text-[#2C3E50]/60 font-be-vietnam text-base md:text-lg max-w-sm mx-auto leading-relaxed">
                The page you're looking for doesn't exist.
              </p>
            </div>

            <div className="pt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#2C3E50] text-[#FCF9EE] rounded-2xl font-bold font-be-vietnam tracking-[0.2em] text-sm hover:bg-[#34495e] transition-all duration-300 shadow-xl shadow-[#2c3e50]/10 group"
              >
                <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>BACK TO HOME</span>
              </Link>
            </div>
          </div>

        </motion.div>
      </div>
    </main>
  );
}

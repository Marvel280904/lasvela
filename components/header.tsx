"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "PRODUCT", href: "/product" },
  { name: "SHOWROOM", href: "/showroom" },
  { name: "ABOUT", href: "/about" },
  { name: "ARTICLES", href: "/articles" },
  { name: "CONTACT", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#2c3e50]/95 backdrop-blur-sm shadow-xl py-3" : "bg-[#2c3e50] py-3"
      }`}
    >
      <div className="container max-w-8xl mx-auto px-6 lg:px-17 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative h-12 w-32 md:h-14 md:w-40">
          <Image
            src="/logo/logo.png"
            alt="Lasvela Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-12">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white text-[11px] font-michroma tracking-[0.2em] hover:text-gray-400 transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          <button className="text-white hover:text-gray-400 transition-colors relative">
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
          </button>
          
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#2c3e50] border-t border-white/5 shadow-2xl"
          >
            <nav className="flex flex-col py-8 px-6 space-y-6">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-white text-xs font-michroma tracking-[0.3em] block py-2 border-b border-white/5"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

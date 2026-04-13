"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { fetchAllProductsFromApi } from "@/lib/product-service";
import type { Product } from "@/lib/db/schema";

export default function WeeklyBestSeller() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const res = await fetchAllProductsFromApi();
        const filtered = (res.data || []).filter((p: any) => p.isWeeklyBestSeller === true);
        
        const mapped = filtered.map((p: any) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          category: p.category,
          thumbnailImage: p.thumbnailImage || (p.images && p.images[0]) || "/images/placeholder.jpg"
        }));
        
        setProducts(mapped as Product[]);
      } catch (err) {
        console.error("Failed to fetch weekly best sellers:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <section className="bg-[#FCF9EE] py-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#2c3e50]" />
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="bg-[#FCF9EE] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-michroma font-bold text-[#2C3E50] tracking-wider uppercase">
              Weekly Best Sellers
            </h2>
            <p className="text-[#2C3E50]/70 font-be-vietnam text-sm md:text-base max-w-lg lg:max-w-2xl">
              Discover the most-loved products our customers can't stop choosing this week.
            </p>
          </motion.div>

          <div className="hidden md:flex space-x-4">
             <button 
                onClick={() => scroll("left")}
                className="p-3 border border-[#2c3e50]/20 hover:bg-[#2c3e50] hover:text-white transition-all duration-300 rounded-sm cursor-pointer"
             >
                <ArrowLeft className="w-5 h-5" />
             </button>
             <button 
                onClick={() => scroll("right")}
                className="p-3 border border-[#2c3e50]/20 hover:bg-[#2c3e50] hover:text-white transition-all duration-300 rounded-sm cursor-pointer"
             >
                <ArrowRight className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex space-x-6 md:space-x-8 overflow-x-auto custom-scrollbar scrollbar-hide pb-8 snap-x snap-mandatory"
        >
          {products.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="min-w-[85%] md:min-w-[45%] lg:min-w-[32%] snap-start group"
            >
              <Link href={`/product/${p.slug}`} className="block space-y-6">
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-white shadow-sm border border-[#2c3e50]/5">
                   <img 
                    src={p.thumbnailImage} 
                    alt={p.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                </div>
                <div className="space-y-1">
                   <h3 className="font-michroma font-bold text-[#2C3E50] text-lg lg:text-xl tracking-tight uppercase line-clamp-1">
                      {p.name}
                   </h3>
                   <p className="text-[#2C3E50]/60 font-be-vietnam text-sm">
                      ({p.category})
                   </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

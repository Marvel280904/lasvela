"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { fetchAllProductsFromApi } from "@/lib/product-service";
import type { Product } from "@/lib/db/schema";
import { CategoryFilter } from "@/components/category-filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Recommendation");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch Products on Mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const res = await fetchAllProductsFromApi();
        const allRawData = res.data || [];
        
        const mappedData: Product[] = allRawData.map((item: any) => {
          let minPrice = Number(item.price) || 0;
          if (item.variants?.[0]?.combinations?.[0]?.price) {
             minPrice = Number(item.variants[0].combinations[0].price);
          }
          
          return {
            ...item,
            name: item.name || "Unnamed Product",
            category: item.category || "General",
            price: minPrice,      
            images: item.images || ["/placeholder.jpg"],
            isWeeklyBestSeller: item.isWeeklyBestSeller || false
          };
        });

        setAllProducts(mappedData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Compute Displayed Products
  const displayedProducts = useMemo(() => {
    let result = [...allProducts];

    // 1. Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // 2. Filter by search term
    if (searchTerm.trim() !== '') {
      const lowerReq = searchTerm.toLowerCase();
      result = result.filter(
        p => 
          p.name.toLowerCase().includes(lowerReq) ||
          p.category.toLowerCase().includes(lowerReq)
      );
    }

    // 3. Sort logic
    result.sort((a, b) => {
      if (sortBy === "Recommendation") {
        const aBest = a.isWeeklyBestSeller ? 1 : 0;
        const bBest = b.isWeeklyBestSeller ? 1 : 0;
        return bBest - aBest; // Push best sellers to the top
      }
      if (sortBy === "Lowest Price") {
        return (a.price || 0) - (b.price || 0);
      }
      if (sortBy === "Highest Price") {
        return (b.price || 0) - (a.price || 0);
      }
      return 0;
    });

    return result;
  }, [allProducts, searchTerm, sortBy, selectedCategories]);

  return (
    <main className="min-h-screen bg-[#F8F5EA] px-6 md:px-12 xl:px-24 pt-32 pb-24 font-be-vietnam selection:bg-[#2C3E50] selection:text-white">
      <div className="container max-w-8xl mx-auto">
        
        {/* Top Controls Section */}
        <div className="space-y-6 mb-12">
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-8xl"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" strokeWidth={1.5} />
            <input 
              type="text" 
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F0EDE1] border-none rounded-xl py-4 pl-14 pr-6 text-[#2C3E50] text-sm md:text-base focus:ring-2 focus:ring-[#2C3E50]/20 outline-none placeholder:text-gray-400/80 transition-all shadow-inner"
            />
          </motion.div>

          {/* Filters Row */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px] md:w-[240px] bg-[#F0EDE1] border-none rounded-lg h-12 text-[#2C3E50] text-xs md:text-sm font-medium shadow-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-[#F0EDE1] text-[#2C3E50] border-[#EFECE1]">
                <SelectItem value="Recommendation">Sort by: Recommendation</SelectItem>
                <SelectItem value="Lowest Price">Sort by: Lowest Price</SelectItem>
                <SelectItem value="Highest Price">Sort by: Highest Price</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Toggle */}
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="bg-[#F0EDE1] border-none rounded-lg h-12 px-4 md:px-6 flex items-center gap-3 text-[#2C3E50] text-xs md:text-sm font-medium hover:bg-[#e7e3d6] transition-colors shadow-sm"
            >
              Category
              <SlidersHorizontal className="w-4 h-4 ml-2" />
            </button>
            
            <AnimatePresence>
              {selectedCategories.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-[#2C3E50] text-[#F8F5EA] text-xs px-3 py-1.5 rounded-full flex items-center"
                >
                  {selectedCategories.length} Selected
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#2C3E50]" />
            <p className="mt-4 text-[#2C3E50]/70 font-be-vietnam animate-pulse">Loading products...</p>
          </div>
        ) : displayedProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-[#F0EDE1] rounded-2xl border border-white/60"
          >
            <h2 className="text-2xl font-bold text-[#2C3E50] mb-2 font-michroma">No Results Found</h2>
            <p className="text-gray-500 mb-6">We couldn't find any products matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategories([]);
              }}
              className="bg-[#2C3E50] text-[#F8F5EA] px-8 py-3 rounded-md text-sm font-semibold tracking-wider hover:bg-[#34495e] transition-colors"
            >
              CLEAR FILTERS
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            <AnimatePresence>
              {displayedProducts.map((p, idx) => {
                const imageUrl = p.thumbnailImage || (p.images && p.images.length > 0 ? p.images[0] : '/placeholder.svg');
                
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3) }}
                    key={p.id}
                    className="group"
                  >
                    <Link href={`/product/${p.slug}`} className="bg-[#F4F1E1] rounded-sm p-4 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative block cursor-pointer">
                      
                      {/* Best Seller Badge */}
                      {p.isWeeklyBestSeller && (
                        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm shadow-sm text-[#2C3E50] text-[10px] font-michroma px-2.5 py-1 rounded-sm z-10 font-bold border border-[#2C3E50]/10 tracking-widest">
                          BEST SELLER
                        </div>
                      )}

                      {/* Product Image */}
                      <div className="w-full aspect-[4/3] relative mb-6 rounded-sm overflow-hidden bg-transparent flex items-center justify-center p-2">
                        <img 
                          src={imageUrl} 
                          alt={p.name}
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col gap-0.5 pr-4">
                          <h3 className="font-bold text-[#2C3E50] text-[15px] leading-tight line-clamp-1">{p.name}</h3>
                          <p className="text-xs text-[#2C3E50]/60 font-medium">{p.category}</p>
                        </div>
                        
                        <p className="text-[15px] font-bold text-[#2C3E50] tracking-tight shrink-0">
                          ${p.price ? p.price.toFixed(2) : "0.00"}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Slide-out Category Filter */}
      <CategoryFilter 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedCategories={selectedCategories}
        onApply={(cats) => setSelectedCategories(cats)}
      />
    </main>
  );
}

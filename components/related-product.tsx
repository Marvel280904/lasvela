"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAllProductsFromApi } from "@/lib/product-service";
import type { Product } from "@/lib/db/schema";

interface RelatedProductsProps {
  currentCategory: string;
  excludeSlug: string;
}

export function RelatedProducts({ currentCategory, excludeSlug }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        setLoading(true);
        // Call Global Service
        const res = await fetchAllProductsFromApi();
        const allRawData = res.data || [];
        
        // Filter (Exclude produk yang sedang dilihat, dan hanya ambil yg category-nya sama)
        let filteredData = allRawData.filter((p: any) => 
            p.slug !== excludeSlug && 
            p.category === currentCategory
        );

        if (filteredData.length === 0) {
            setRelatedProducts([]);
            return;
        }

        // Shuffle n ambil 4 product saja
        const selectedRaw = filteredData
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);

        // Mapping Data
        const mappedProducts: Product[] = selectedRaw.map((item: any) => {
            // harga Varian Pertama
            const simplePrice = Number(item.variants?.[0]?.combinations?.[0]?.price) || Number(item.price) || 0;

            return {
                ...item,
                id: item.id || `related-${Math.random()}`,
                name: item.name || "Product",
                slug: item.slug,
                category: item.category || "General",
                price: simplePrice,
                images: item.images || [],
                thumbnailImage: item.thumbnailImage,
                isWeeklyBestSeller: item.isWeeklyBestSeller || false
            };
        });

        setRelatedProducts(mappedProducts as Product[]);
      } catch (err) {
        console.error("Failed to load related products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRelated();
  }, [currentCategory, excludeSlug]);

  if (loading || relatedProducts.length === 0) return null;

  return (
    <section className="bg-[#FCF9EE] px-6 md:px-12 xl:px-24 border-t border-[#2c3e50]/20 py-16 md:py-24">
      <div className="max-w-8xl mx-auto">
        <h3 className="font-michroma text-3xl md:text-4xl font-bold tracking-wide text-[#2c3e50] mb-10">
          Related Products
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {relatedProducts.map((p, idx) => {
              const imageUrl = p.thumbnailImage || (p.images && p.images.length > 0 ? p.images[0] : '/placeholder.jpg');
              
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: Math.min(idx * 0.1, 0.4) }}
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
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2, ZoomIn } from "lucide-react";
import apiClient from "@/lib/axiosClient";
import type { Product, VariantCombination } from "@/lib/db/schema";
import { useParams } from "next/navigation";
import { Accordion } from "@/components/custom-accordion";
import { LightboxModal } from "@/components/image-interaction";
import { RelatedProducts } from "@/components/related-product";
import { useCartStore } from "@/lib/store/useCartStore";

interface ProductDetailClientProps {
  initialProduct: Product;
}

export default function ProductDetailClient({ initialProduct }: ProductDetailClientProps) {
  const params = useParams();
  const slug = params.slug as string;
  const { addItem } = useCartStore();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product>(initialProduct);
  
  // UI Display States
  const [activeImage, setActiveImage] = useState<string>(
    initialProduct.images?.[0] || initialProduct.thumbnailImage || ""
  );
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Variant States
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [selectedDimension, setSelectedDimension] = useState<string>("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Setup initial default selected variations
  useEffect(() => {
    const variantGroup = initialProduct.variants?.[0];
    if (variantGroup) {
      if (variantGroup.materials?.length > 0) setSelectedMaterial(variantGroup.materials[0].name);
      if (variantGroup.dimensions?.length > 0) setSelectedDimension(variantGroup.dimensions[0].value);
    }
  }, [initialProduct]);

  // Handle re-fetching if slug changes or just use initialProduct
  useEffect(() => {
    if (initialProduct.slug !== slug) {
       // Optional: Re-fetch if needed, but usually Next.js handles navigation well
    }
  }, [slug, initialProduct]);

  if (!product) return null;

  // --- Calculations for Final Pricing and Stock Checks ---
  const variantGroup = product.variants?.[0] || null;
  
  let matchingCombination: VariantCombination | undefined;
  if (variantGroup && variantGroup.combinations?.length > 0 && selectedMaterial && selectedDimension) {
    matchingCombination = variantGroup.combinations.find(
      c => c.materialName === selectedMaterial && c.dimensionValue === selectedDimension
    );
  }

  const isGlobalStockTrue = product.inStock !== false;
  let finalCombinationStock = true;
  if (matchingCombination) {
    finalCombinationStock = matchingCombination.inStock;
  }
  const isCurrentlyInStock = isGlobalStockTrue && finalCombinationStock;

  let addOnsTotal = 0;
  selectedAddOns.forEach(addOnName => {
    const matchedAddOn = variantGroup?.addOns?.find(a => a.name === addOnName);
    if (matchedAddOn) addOnsTotal += matchedAddOn.price;
  });

  const finalPrice = (matchingCombination?.price || product.price || 0) + addOnsTotal;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      image: activeImage,
      price: finalPrice,
      material: selectedMaterial,
      dimension: selectedDimension,
      addOns: selectedAddOns
    });
  };

  const featuresList = (product.features || []).filter(f => f.trim() !== "");
  const careList = (product.careInstructions || []).filter(c => c.trim() !== "");

  return (
    <div className="min-h-screen bg-[#FCF9EE] text-[#2c3e50] font-be-vietnam selection:bg-[#2C3E50] selection:text-white">
      <AnimatePresence>
        {isLightboxOpen && <LightboxModal imgUrl={activeImage} onClose={() => setIsLightboxOpen(false)} />}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-[#2c3e50] pt-24 pb-8 px-6 md:px-12 xl:px-24 w-full text-white shadow-md"
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between text-[11px] font-michroma tracking-widest uppercase">
          <div className="flex space-x-2 text-white/60">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href="/product" className="hover:text-white transition">Product</Link>
            <span>/</span>
            <span className="text-white relative top-px">{product.name}</span>
          </div>

          <Link href="/product" className="hidden sm:flex items-center space-x-2 text-white/80 hover:text-white transition group relative cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Products</span>
          </Link>
        </div>
      </motion.div>

      <main className="max-w-8xl mx-auto px-6 md:px-12 xl:px-24 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col space-y-4 md:space-y-6"
          >
            <div 
              className="w-full aspect-[4/3] bg-[#2C3E50]/5 relative flex items-center justify-center p-8 group overflow-hidden border border-[#2c3e50]/10 rounded-sm cursor-zoom-in"
              onClick={() => setIsLightboxOpen(true)}
            >
              <div className="absolute inset-0 z-0 bg-[#2C3E50]/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="flex items-center space-x-2 text-white font-be-vietnam text-sm tracking-wider">
                     <ZoomIn className="w-4 h-4"/> <span>Click to Expand</span>
                  </span>
              </div>
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply origin-center group-hover:scale-[1.01] transition-transform duration-500 rounded-sm shadow-2xl z-10" 
              />
            </div>

            {product.images && product.images.length > 0 && (
              <div className="flex flex-row overflow-x-auto overflow-y-hidden custom-scrollbar pb-4 gap-3 md:gap-4 w-full snap-x">
                {product.images.map((img, idx) => {
                  const isActive = activeImage === img;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative aspect-square w-24 sm:w-28 shrink-0 rounded-sm overflow-hidden border-2 transition-all duration-300 snap-start
                        ${isActive ? 'border-[#2C3E50] opacity-100' : 'border-transparent opacity-50 hover:opacity-100 hover:border-[#2C3E50]/30'}
                        bg-[#2C3E50]/5
                      `}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} thumb ${idx}`}
                        className="w-full h-full object-contain p-2 mix-blend-multiply" 
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col pt-2 lg:pt-0"
          >
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-michroma font-bold text-[#2C3E50] leading-tight mb-2">
                {product.name}
              </h1>
              <p className="text-[#2c3e50]/70 font-be-vietnam tracking-wide text-lg lg:text-xl font-light">
                {product.category}
              </p>
            </div>

            <div className="space-y-0.5">
              {variantGroup && variantGroup.materials?.length > 0 && (
                <Accordion title="Materials" defaultOpen={true}>
                  <div className="flex flex-wrap gap-4 py-2">
                    {variantGroup.materials.map(mat => {
                      const isActive = selectedMaterial === mat.name;
                      return (
                         <button
                           key={mat.name}
                           onClick={() => setSelectedMaterial(mat.name)}
                           className={`px-5 py-2.5 rounded-sm border text-xs font-semibold tracking-wider uppercase transition-all duration-300
                             ${isActive 
                               ? 'bg-[#2C3E50] border-[#2C3E50] text-[#F8F5EA] shadow-md' 
                               : 'bg-transparent border-[#2C3E50]/30 text-[#2C3E50]/80 hover:border-[#2C3E50]'
                              }
                           `}
                         >
                           {mat.name}
                         </button>
                      )
                    })}
                  </div>
                </Accordion>
              )}

              {variantGroup && variantGroup.dimensions?.length > 0 && (
                <Accordion title="Dimensions" defaultOpen={true}>
                  <div className="flex flex-wrap gap-3 py-2">
                    {variantGroup.dimensions.map(dim => {
                       const isActive = selectedDimension === dim.value;
                       return (
                         <button
                           key={dim.value}
                           onClick={() => setSelectedDimension(dim.value)}
                           className={`px-5 py-2.5 rounded-sm border text-xs font-semibold tracking-wider uppercase transition-all duration-300
                             ${isActive 
                               ? 'bg-[#2C3E50] border-[#2C3E50] text-[#F8F5EA] shadow-md' 
                               : 'bg-transparent border-[#2C3E50]/30 text-[#2C3E50]/80 hover:border-[#2C3E50]'
                              }
                           `}
                         >
                           {dim.value}
                         </button>
                       )
                    })}
                  </div>
                </Accordion>
              )}

              {variantGroup && variantGroup.addOns?.length > 0 && (
                <Accordion title="Add-Ons">
                  <div className="space-y-3 py-2">
                    {variantGroup.addOns.map(addon => {
                       const isActive = selectedAddOns.includes(addon.name);
                       return (
                         <label key={addon.name} className="flex items-center justify-between cursor-pointer group">
                           <div className="flex items-center space-x-3">
                             <div className={`w-4 h-4 border flex items-center justify-center rounded-sm transition-colors
                                ${isActive ? 'bg-[#2c3e50] border-[#2c3e50]' : 'bg-transparent border-[#2c3e50]/40 group-hover:border-[#2c3e50]'}
                             `}>
                               {isActive && <div className="bg-[#F8F5EA] rounded-sm" />}
                             </div>
                             <span className="font-be-vietnam text-sm group-hover:text-[#2c3e50] text-[#2c3e50]/80 transition-colors">
                               {addon.name}
                             </span>
                           </div>
                           <span className="font-semibold text-sm tracking-wide text-[#2c3e50]">
                             +${addon.price.toFixed(2)}
                           </span>
                           <input 
                             type="checkbox" className="hidden" 
                             checked={isActive}
                             onChange={() => {
                               if (isActive) setSelectedAddOns(prev => prev.filter(a => a !== addon.name));
                               else setSelectedAddOns(prev => [...prev, addon.name]);
                             }}
                           />
                         </label>
                       )
                    })}
                  </div>
                </Accordion>
              )}

              {featuresList.length > 0 && (
                 <Accordion title="More Details">
                   <ul className="list-disc list-inside space-y-1.5 py-1 marker:text-[#2C3E50]/40">
                      {featuresList.map((f, i) => <li key={i}>{f}</li>)}
                   </ul>
                 </Accordion>
              )}

              {careList.length > 0 && (
                 <Accordion title="Material & Care">
                   <ul className="list-disc list-inside space-y-1.5 py-1 marker:text-[#2C3E50]/40">
                      {careList.map((c, i) => <li key={i}>{c}</li>)}
                   </ul>
                 </Accordion>
              )}

              {(product.deliveryTime || product.warranty) && (
                 <Accordion title="Delivery & Warranty">
                   <div className="space-y-2 py-1">
                      {product.deliveryTime && <p><span className="font-semibold">Delivery Time:</span> {product.deliveryTime}</p>}
                      {product.warranty && <p><span className="font-semibold">Warranty:</span> {product.warranty}</p>}
                   </div>
                 </Accordion>
              )}
            </div>

            <div className="mt-auto pt-10 flex items-center justify-between gap-6">
              <div className="flex flex-col items-start min-w-max">
                 <h2 className="text-4xl xl:text-5xl font-michroma font-bold text-[#2C3E50] tracking-wider mb-1">
                   ${finalPrice.toFixed(0)}
                 </h2>
                 {isCurrentlyInStock === false && (
                    <p className="text-red-500 font-be-vietnam text-xs font-semibold tracking-widest uppercase animate-pulse drop-shadow-sm">
                      (Product Out of Stock)
                    </p>
                 )}
              </div>
              
              <button 
                onClick={handleAddToCart}
                disabled={!isCurrentlyInStock}
                className={`flex-1 max-w-sm py-4 md:py-5 px-6 font-be-vietnam tracking-[0.2em] uppercase text-sm xl:text-lg font-bold shadow-xl transition-all duration-300
                  ${isCurrentlyInStock 
                    ? 'bg-[#2C3E50] text-[#F8F5EA] hover:bg-[#34495e] hover:shadow-2xl hover:-translate-y-1' 
                    : 'bg-[#2C3E50]/20 text-[#2c3e50]/40 cursor-not-allowed shadow-none'}  
                `}
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="border-t border-[#2c3e50]/10 bg-[#F8F5EA] px-6 md:px-12 xl:px-24"
      >
        <div className="max-w-8xl mx-auto py-16">
          <div className="flex flex-col lg:flex-row items-start">
            <div className="w-full lg:w-1/4 mb-6 lg:mb-0 flex items-center space-x-3 text-[#2c3e50]">
              <span className="font-bold text-lg md:text-xl">&gt;</span>
              <h3 className="font-michroma text-lg md:text-xl font-bold tracking-wide">
                Description
              </h3>
            </div>
            <div className="hidden lg:block w-[1px] h-auto min-h-full self-stretch bg-[#2c3e50]/20 mx-10"></div>
            <div className="lg:hidden w-full h-[1px] bg-[#2c3e50]/20 mb-8 mt-4"></div>
            <div className="w-full lg:w-[60%]">
              <p className="font-be-vietnam text-[#2c3e50]/80 leading-relaxed md:leading-loose text-sm md:text-base text-justify md:text-left">
                {product.description || "No description provided."}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <RelatedProducts currentCategory={product.category} excludeSlug={product.slug} />
    </div>
  );
}

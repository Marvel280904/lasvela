"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Trash2, Plus, Minus, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store/useCartStore";
import { fetchAllProductsFromApi } from "@/lib/product-service";
import type { Product } from "@/lib/db/schema";
import { useRouter } from "next/navigation";

export function ModalCart() {
  const { isCartOpen, closeCart, items, updateQuantity, removeItem, getTotalItems, getTotalPrice } = useCartStore();
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const router = useRouter();

  // Handle Hydration issue for Persist Zustand state
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      fetchRandomProducts();
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  const fetchRandomProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await fetchAllProductsFromApi();
      const allData = res.data || [];
      
      const shuffled = allData.sort(() => 0.5 - Math.random()).slice(0, 4);
      
      const mappedProducts = shuffled.map((item: any) => {
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
        };
      });

      setRandomProducts(mappedProducts as Product[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleCheckoutClick = () => {
    closeCart();
    router.push("/cart");
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#2c3e50]/40 backdrop-blur-sm z-[100]"
            onClick={closeCart}
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#FCF9EE] z-[101] shadow-2xl flex flex-col font-be-vietnam text-[#2c3e50] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#2c3e50] text-[#FCF9EE] p-5 flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-3">
                <span className="font-be-vietnam text-sm tracking-wide flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  You have added {getTotalItems()} product{getTotalItems() !== 1 && 's'} to your shopping cart
                </span>
              </div>
              <button onClick={closeCart} className="bg-[#FCF9EE] text-[#2c3e50] p-1 rounded-full hover:bg-gray-200 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 bg-white overflow-y-auto overflow-x-hidden custom-scrollbar">
              
              {/* Table Header (hidden if empty) */}
              {items.length > 0 ? (
                <div className="px-6 pt-6 flex flex-col">
                  <div className="hidden md:flex justify-between border-b pb-2 text-sm font-semibold tracking-wide mb-4">
                     <div className="w-[55%]"></div>
                     <div className="w-[25%] text-center">Quantity</div>
                     <div className="w-[20%] text-right">Subtotal</div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                          className="flex flex-col md:flex-row md:justify-between md:items-center py-6 border-b border-[#2c3e50]/10 last:border-0 gap-4"
                        >
                          {/* Left: Product Info */}
                          <div className="flex space-x-4 w-full md:w-[60%]">
                            <div className="w-24 h-24 bg-white border border-[#2c3e50]/20 rounded-sm p-1 shrink-0">
                               <img src={item.image || '/placeholder.jpg'} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <div className="flex flex-col text-sm pt-1">
                               <h4 className="font-michroma font-bold text-[#2c3e50] text-base md:text-[15px]">{item.name}</h4>
                               <p className="text-[#2c3e50]/70 text-xs mt-1 font-semibold uppercase tracking-wider">Type: <span className="font-normal normal-case">{item.category}</span></p>
                               {item.material && <p className="text-[#2c3e50]/70 text-xs mt-1">Material: <span className="font-semibold">{item.material}</span></p>}
                               {item.dimension && <p className="text-[#2c3e50]/70 text-xs mt-0.5">Dimension: <span className="font-semibold">{item.dimension}</span></p>}
                               {item.addOns && item.addOns.length > 0 && (
                                   <p className="text-[#2c3e50]/70 text-xs mt-0.5">Add-ons: <span className="font-semibold">{item.addOns.join(', ')}</span></p>
                               )}
                            </div>
                          </div>

                          {/* Right: Actions Container */}
                          <div className="flex items-end justify-between md:items-center w-full md:w-[40%]">
                            {/* Quantity Selector */}
                            <div className="md:w-[42.8%] md:flex md:justify-center">
                              <div className="flex items-center border border-[#2c3e50]/30 rounded-sm bg-white overflow-hidden p-1 shadow-sm h-11 w-28 md:w-32 justify-between px-2">
                                <button 
                                   onClick={() => {
                                     if(item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
                                   }} 
                                   className="w-8 h-8 md:w-6 md:h-6 flex items-center justify-center text-[#2c3e50] hover:bg-[#2c3e50]/10 transition"
                                >
                                   <Minus className="w-4 h-4 md:w-3.5 h-3.5" />
                                </button>
                                <span className="text-base md:text-sm font-semibold">{item.quantity}</span>
                                <button 
                                   onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                                   className="w-8 h-8 md:w-6 md:h-6 flex items-center justify-center text-[#2c3e50] hover:bg-[#2c3e50]/10 transition"
                                >
                                   <Plus className="w-4 h-4 md:w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Price & Remove Button */}
                            <div className="md:w-[57.2%] flex flex-col items-end">
                               <button onClick={() => removeItem(item.id)} className="text-[#2c3e50] hover:text-red-500 transition mb-2 hidden md:block">
                                  <Trash2 className="w-4 h-4" strokeWidth={2}/>
                               </button>
                               
                               <div className="flex flex-row items-center gap-3">
                                  <div className="flex flex-col items-end">
                                    <span className="text-[10px] uppercase font-semibold text-[#2c3e50]/60 leading-none block md:hidden">Total</span>
                                    <span className="font-michroma font-bold text-md md:text-lg leading-none mt-1 md:mt-0">${(item.price * item.quantity).toFixed(0)}</span>
                                  </div>
                                  <button onClick={() => removeItem(item.id)} className="text-[#2c3e50] hover:text-red-500 transition md:hidden">
                                     <Trash2 className="w-5 h-5" strokeWidth={2}/>
                                  </button>
                               </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col md:flex-row gap-4 mt-6 pb-6 border-b border-[#2c3e50]/20">
                     <Link href="/product" className="w-full py-4 border border-[#2c3e50] text-[#2c3e50] text-sm font-semibold hover:bg-[#2c3e50]/5 transition flex items-center justify-center space-x-2 rounded-md">
                      <button onClick={closeCart}>
                          <span className="text-lg">&#8592;</span> <span>Continue Shopping</span>
                      </button>
                     </Link>
                     <button onClick={handleCheckoutClick} className="w-full py-4 bg-[#2c3e50] text-[#FCF9EE] text-sm font-semibold shadow-md hover:bg-[#34495e] transition flex items-center justify-center space-x-2 rounded-md">
                        <span>Go to Shopping Cart</span> <span className="text-lg">&#8594;</span>
                     </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 px-6">
                   <div className="w-16 h-16 opacity-30 mb-4">
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                   </div>
                   <p className="text-[#2c3e50]/60 mb-6 font-semibold">Your cart is currently empty.</p>
                   <Link href="/product">
                      <button onClick={closeCart} className="px-6 py-2.5 bg-[#2c3e50] text-[#FCF9EE] text-sm hover:bg-[#34495e] transition shadow-md">
                        Start Shopping
                      </button>
                   </Link>
                </div>
              )}

              {/* Complete Your Home */}
              <div className="px-6 py-8 bg-white/50 mt-4">
                 <h3 className="font-michroma text-xl font-bold text-[#2c3e50] mb-6">Complete Your Home</h3>
                 {loadingProducts ? (
                   <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-[#2c3e50]" /></div>
                 ) : (
                   <div className="grid grid-cols-2 gap-4">
                     {randomProducts.map(p => {
                       const imageUrl = p.thumbnailImage || (p.images && p.images.length > 0 ? p.images[0] : '/placeholder.jpg');
                       return (
                         <div key={p.id} className="border border-[#2c3e50]/10 p-3 bg-white hover:shadow-lg group flex flex-col">
                            <Link href={`/product/${p.slug}`} className="block flex-1 mb-3" onClick={closeCart}>
                              <div className="w-full aspect-square flex items-center justify-center overflow-hidden mb-3 p-2 bg-[#2c3e50]/5">
                                 <img src={imageUrl} alt={p.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition" />
                              </div>
                            <div className="flex items-center justify-between mt-auto">
                               <div className="flex flex-col gap-0.5 pr-2 overflow-hidden">
                                  <h4 className="text-[#2c3e50] font-bold text-[13px] leading-tight truncate">{p.name}</h4>
                                  <p className="text-[#2c3e50]/60 text-[10px] font-medium">{p.category}</p>
                               </div>
                               <span className="font-bold text-[12px] text-[#2c3e50] shrink-0">${p.price?.toFixed(0)}</span>
                            </div>
                            </Link>
                         </div>
                       )
                     })}
                   </div>
                 )}
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

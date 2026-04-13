"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store/useCartStore";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalItems, getTotalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] bg-[#FCF9EE] flex flex-col items-center justify-center font-be-vietnam text-[#2c3e50]">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="flex flex-col items-center"
        >
          {/* Cart Icon Empty State */}
          <div className="mb-6 relative">
             <ShoppingCart className="w-24 h-24 text-[#2c3e50]/40" strokeWidth={1} />
             <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="text-[#2c3e50]/40 mx-auto">
                   <path d="M5 15 Q20 5 35 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="transparent"/>
                </svg>
             </div>
          </div>
          <p className="text-[#2c3e50]/60 text-lg mb-8 font-light">Oops... looks like your cart is still empty...</p>
          <Link
            href="/product"
            className="px-8 py-3 bg-[#2c3e50] text-[#FCF9EE] text-sm font-semibold rounded-sm hover:bg-[#34495e] transition shadow-md"
          >
            Continue to Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF9EE] px-6 md:px-12 xl:px-24 font-be-vietnam text-[#2c3e50] pt-32 pb-20">
      <div className="max-w-8xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-michroma font-bold text-[#2C3E50] mb-3">Your cart.</h1>
          <p className="text-xl font-medium tracking-wide text-[#2c3e50]/80">{getTotalItems()} items in your cart.</p>
        </div>

        {/* Cart List section */}
        <div className="w-full bg-[#FCF9EE]">
          {/* List Header */}
          <div className="hidden md:flex justify-between border-b border-[#2c3e50]/20 pb-4 mb-8 text-lg font-bold">
            <div className="w-[65%]"></div>
            <div className="w-[15%] text-center">Quantity</div>
            <div className="w-[20%] text-right">Subtotal</div>
          </div>

          <div className="flex flex-col space-y-8">
             <AnimatePresence>
               {items.map((item) => (
                 <motion.div
                   key={item.id}
                   layout
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   className="flex flex-col md:flex-row md:justify-between md:items-center pb-8 border-b border-[#2c3e50]/10 last:border-0 gap-6"
                 >
                    {/* Product Info */}
                    <div className="w-full md:w-[65%] flex space-x-6">
                       <div className="w-24 h-24 md:w-32 md:h-32 bg-white border border-[#2c3e50]/20 rounded-sm p-2 shrink-0">
                          <img src={item.image || '/placeholder.jpg'} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                       </div>
                       <div className="flex flex-col justify-center text-sm md:text-base">
                          <h4 className="font-michroma font-bold text-[#2c3e50] text-lg md:text-xl mb-1">{item.name}</h4>
                          <p className="text-[#2c3e50]/70 font-semibold mt-1 text-xs md:text-sm uppercase tracking-wider">Type: <span className="font-normal normal-case">{item.category}</span></p>
                          {item.material && <p className="text-[#2c3e50]/70 mt-1 text-xs md:text-sm">Material: <span className="font-semibold">{item.material}</span></p>}
                          {item.dimension && <p className="text-[#2c3e50]/70 mt-0.5 text-xs md:text-sm">Dimension: <span className="font-semibold">{item.dimension}</span></p>}
                          {item.addOns && item.addOns.length > 0 && (
                              <p className="text-[#2c3e50]/70 mt-0.5 text-xs md:text-sm">Add-ons: <span className="font-semibold">{item.addOns.join(', ')}</span></p>
                          )}
                       </div>
                    </div>

                    {/* Actions: Quantity & Price */}
                    <div className="flex items-end justify-between md:items-center w-full md:w-[35%]">
                       {/* Quantity Selector */}
                       <div className="md:w-[42.8%] md:flex md:justify-center">
                          <div className="flex items-center border border-[#2c3e50]/40 rounded-sm bg-transparent overflow-hidden p-1 shadow-sm h-11 w-28 md:w-32 justify-between px-2">
                            <button 
                               onClick={() => {
                                 if(item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
                               }} 
                               className="w-8 h-8 flex items-center justify-center text-[#2c3e50] hover:bg-[#2c3e50]/10 transition rounded-sm cursor-pointer"
                            >
                               <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-base font-bold">{item.quantity}</span>
                            <button 
                               onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                               className="w-8 h-8 flex items-center justify-center text-[#2c3e50] hover:bg-[#2c3e50]/10 transition rounded-sm cursor-pointer"
                            >
                               <Plus className="w-4 h-4" />
                            </button>
                          </div>
                       </div>

                       {/* Subtotal and Remove */}
                       <div className="md:w-[57.2%] flex flex-col items-end">
                          <button onClick={() => removeItem(item.id)} className="text-[#2c3e50] hover:text-red-500 transition mb-3 hidden md:block">
                             <Trash2 className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
                          </button>
                          
                          <div className="flex flex-row items-center gap-3">
                             <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase font-semibold text-[#2c3e50]/60 leading-none block md:hidden">Total</span>
                                <span className="font-michroma font-bold text-md md:text-xl tracking-tight leading-none mt-1 md:mt-0">${(item.price * item.quantity).toFixed(0)}</span>
                             </div>
                             <button onClick={() => removeItem(item.id)} className="text-[#2c3e50] hover:text-red-500 transition md:hidden">
                                <Trash2 className="w-5 h-5" strokeWidth={2} />
                             </button>
                          </div>
                       </div>
                    </div>
                 </motion.div>
               ))}
             </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Fixed Footer for Checkout Container */}
      <div className="bg-[#FCF9EE] border-t border-[#2c3e50]/20 mt-12 pt-12">
         <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-end space-x-4 mb-6 md:mb-0">
               <span className="text-xl font-bold text-[#2c3e50]/80">Total</span>
               <span className="font-michroma font-bold text-2xl lg:text-3xl tracking-tight text-[#2c3e50]">${getTotalPrice().toFixed(0)}</span>
            </div>
            
            <Link 
              href="/checkout"
              className="w-full md:w-auto px-12 py-4 bg-[#2C3E50] text-[#F8F5EA] text-sm md:text-base font-semibold tracking-wider hover:bg-[#34495e] transition shadow-xl rounded-md flex justify-center items-center space-x-3 group"
            >
               <span>Checkout</span>
               <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
               </svg>
            </Link>
         </div>
      </div>

    </div>
  );
}

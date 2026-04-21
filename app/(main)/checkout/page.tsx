"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, ChevronRight, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/lib/store/useCartStore";
import apiClient from "@/lib/axiosClient";
import { processCheckoutAndPayment } from "@/lib/order-payment";

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cartItems } = useCartStore();
  const [totals, setTotals] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Form States
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    email: ""
  });

  const [shippingAddress, setShippingAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "Singapore",
    state: ""
  });

  const [notes, setNotes] = useState("");

  const handlePayment = async () => {
    if (isProcessingPayment || isCalculating) return;

    setIsProcessingPayment(true);
    try {
      const payload = {
        customerEmail: customerInfo.email,
        customerName: customerInfo.fullName,
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          selectedMaterial: item.material || "",
          selectedDimension: item.dimension || "",
          selectedAddOnNames: item.addOns || []
        })),
        shippingAddress: {
          ...shippingAddress,
          fullName: customerInfo.fullName,
          phone: `+65${customerInfo.phone}` // Prefix with SG code as shown in UI
        },
        notes: notes
      };

      await processCheckoutAndPayment(payload);
    } catch (error: any) {
      console.error("Gagal memproses pembayaran:", error);
      toast.error(error.message || "There was an error processing your payment. Please try again.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // CALCULATE API logic
  useEffect(() => {
    const calculateTotals = async () => {
      if (cartItems.length === 0) {
        setIsCalculating(false);
        return;
      }

      setIsCalculating(true);
      try {
        // Construct payload
        const payload = {
          items: cartItems.map(item => {
            return {
              productId: item.id,
              quantity: item.quantity,
              selectedMaterial: item.material || "",
              selectedDimension: item.dimension || "",
              selectedAddOnNames: item.addOns || []
            }
          })
        };

        const response = await apiClient.post('/api/orders/calculate', payload);
        //console.log("Respond Calculate:", response)
        if (response.data && response.data.success) {
          setTotals(response.data.data);
        }
      } catch (error) {
        console.error("Gagal menghitung total order:", error);
      } finally {
        setIsCalculating(false);
      }
    };

    calculateTotals();
  }, [cartItems]);

  if (cartItems.length === 0 && !isCalculating) {
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
    <main className="min-h-full bg-[#FCF9EE] pt-32 pb-24 px-6 md:px-12 xl:px-24">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10">
          {/* LEFT COLUMN: FORMS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-6 xl:col-span-7 space-y-16"
          >
            <div>
              {/* Back Button */}
              <Link 
                href="/product" 
                className="inline-flex items-center space-x-2 text-[#2c3e50]/80 hover:text-[#2c3e50] transition mb-8 uppercase text-xs font-bold tracking-widest font-be-vietnam"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Shopping</span>
              </Link>

              {/* Page Title */}
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-5xl font-michroma font-bold text-[#2c3e50] mb-12"
              >
                Checkout
              </motion.h1>
            </div>

            {/* 1. Customer Information */}
            <section className="space-y-8">
              <h2 className="text-xl font-bold font-michroma text-[#2C3E50] border-b border-[#2c3e50]/50 pb-2">
                1. Customer Information
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-sm font-medium font-be-vietnam text-[#2c3e50]">Full Name</label>
                    <input 
                    type="text" 
                    placeholder="Enter full name"
                    value={customerInfo.fullName}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                    className="w-full p-4 bg-white border border-[#2c3e50]/10 rounded-[0.5rem] focus:outline-none focus:ring-1 focus:ring-[#2c3e50]/20 font-be-vietnam text-sm"
                   />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium font-be-vietnam text-[#2c3e50]">Phone</label>
                    <div className="flex">
                      <div className="bg-[#2c3e50]/5 border border-[#2c3e50]/10 border-r-0 rounded-l-[0.5rem] p-4 text-xs font-bold font-be-vietnam text-[#2c3e50] min-w-[80px] flex items-center justify-center">
                        SG +65
                      </div>
                      <input 
                        type="text" 
                        placeholder="822-1234-5678"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className="w-full p-4 bg-white border border-[#2c3e50]/10 rounded-r-[0.5rem] focus:outline-none focus:ring-1 focus:ring-[#2c3e50]/20 font-be-vietnam text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium font-be-vietnam text-[#2c3e50]">Email</label>
                    <input 
                      type="email" 
                      placeholder="example@gmail.com"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="w-full p-4 bg-white border border-[#2c3e50]/10 rounded-[0.5rem] focus:outline-none focus:ring-1 focus:ring-[#2c3e50]/20 font-be-vietnam text-sm"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Shipping Address */}
            <section className="space-y-8">
              <h2 className="text-xl font-bold font-michroma text-[#2c3e50] border-b border-[#2c3e50]/50 pb-2">
                2. Shipping Address
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium font-be-vietnam text-[#2c3e50]">Address Line 1</label>
                    <input 
                      type="text" 
                      placeholder="Enter Address"
                      value={shippingAddress.addressLine1}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                      className="w-full p-4 bg-white border border-[#2c3e50]/10 rounded-[0.5rem] focus:outline-none focus:ring-1 focus:ring-[#2c3e50]/20 font-be-vietnam text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium font-be-vietnam text-[#2c3e50]">Address Line 2</label>
                    <input 
                      type="text" 
                      placeholder="Address..."
                      value={shippingAddress.addressLine2}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })}
                      className="w-full p-4 bg-white border border-[#2c3e50]/10 rounded-[0.5rem] focus:outline-none focus:ring-1 focus:ring-[#2c3e50]/20 font-be-vietnam text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium font-be-vietnam text-[#2c3e50]">City*</label>
                    <input 
                      type="text" 
                      placeholder="Singapore"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full p-4 bg-white border border-[#2c3e50]/10 rounded-[0.5rem] focus:outline-none focus:ring-1 focus:ring-[#2c3e50]/20 font-be-vietnam text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium font-be-vietnam text-[#2c3e50]">Postal Code*</label>
                    <input 
                      type="text" 
                      placeholder="123456"
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                      className="w-full p-4 bg-white border border-[#2c3e50]/10 rounded-[0.5rem] focus:outline-none focus:ring-1 focus:ring-[#2c3e50]/20 font-be-vietnam text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-medium font-be-vietnam text-[#2c3e50]">Order Notes (Optional)</label>
                   <textarea 
                    rows={4}
                    placeholder="Any special instructions for your order..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-4 bg-white border border-[#2c3e50]/10 rounded-[0.5rem] focus:outline-none focus:ring-1 focus:ring-[#2c3e50]/20 font-be-vietnam text-sm resize-none"
                   />
                </div>
              </div>
            </section>
          </motion.div>

          {/* RIGHT COLUMN: ORDER SUMMARY (STICKY) */}
          <div className="lg:col-span-6 xl:col-span-5 relative">
            <div className="sticky top-32 space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 md:p-8 lg:p-6 border border-[#2c3e50]/5 shadow-xl shadow-[#2c3e50]/30"
              >
                <h2 className="text-2xl md:text-3xl font-bold font-michroma text-[#2c3e50] mb-10">Order</h2>
                
                {/* Order Items List */}
                <div className="space-y-8 mb-8 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 md:gap-6 items-start">
                      <div className="w-24 h-24 flex-shrink-0 bg-[#f8f5ea] rounded-[0.5rem] overflow-hidden border border-[#2c3e50]/5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <h4 className="text-[xs] md:text-sm font-bold font-michroma text-[#2c3e50]  tracking-tight leading-tight line-clamp-2">
                          {item.name}
                        </h4>
                        <div className="text-[9px] md:text-[10px] font-be-vietnam text-[#2c3e50]/60 space-y-0.5 font-medium">
                          <p>TYPE: {item.category}</p>
                          <p>MAT: {item.material}</p>
                          <p>DIM: {item.dimension}</p>
                          <p>QTY: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-xs md:text-sm font-bold font-michroma text-[#2c3e50] whitespace-nowrap">
                         ${(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Summary Breakdown */}
                <div className="space-y-5 py-6 border-y border-[#2c3e50]">
                  <div className="flex justify-between items-center text-xl font-medium text-[#2C3E50]/90">
                    <span className="font-michroma">Subtotal</span>
                    <span className="font-be-vietnam">
                      {isCalculating ? <Loader2 className="w-4 h-4 animate-spin" /> : `$${(totals?.subtotal || 0).toLocaleString()}`}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xl font-medium text-[#2C3E50]/90">
                      <span className="font-michroma">Shipping</span>
                      <span className="font-be-vietnam">
                        {isCalculating ? <Loader2 className="w-4 h-4 animate-spin" /> : `$${(totals?.shipping || 0).toLocaleString()}`}
                      </span>
                    </div>
                    {((totals?.subtotal || 0) < 500) && (
                      <p className="text-[10px] text-green-600 font-be-vietnam italic text-right font-medium">
                        Delivery Fee (free for orders over $500)
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-xl font-medium text-[#2C3E50]/90">
                    <span className="font-michroma">Tax</span>
                    <span className="font-be-vietnam">
                      {isCalculating ? <Loader2 className="w-4 h-4 animate-spin" /> : `$${(totals?.tax || 0).toLocaleString()}`}
                    </span>
                  </div>
                </div>

                {/* Gran Total */}
                <div className="flex justify-between items-center text-xl font-bold mb-10 pt-6">
                   <span className="font-michroma text-[#2c3e50]">TOTAL</span>
                   <span className="font-be-vietnam text-[#2C3E50]">
                      {isCalculating ? <Loader2 className="w-6 h-6 animate-spin" /> : `$${(totals?.total || 0).toLocaleString()}`}
                   </span>
                </div>

                {/* CTA Button */}
                <button 
                   onClick={handlePayment}
                   disabled={isCalculating || isProcessingPayment}
                   className="w-full py-5 bg-[#2c3e50] text-[#FCF9EE] rounded-2xl font-bold font-be-vietnam tracking-[0.2em] text-sm hover:bg-[#34495e] transition-all duration-300 shadow-xl shadow-[#2c3e50]/10 flex items-center justify-center space-x-3 group disabled:opacity-50"
                >
                   {isProcessingPayment ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                   ) : (
                      <>
                        <span>PROCEED TO PAYMENT</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </>
                   )}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

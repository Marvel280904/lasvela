"use client";

import { TermsContainer } from "@/components/terms/terms-container";
import { Suspense } from "react";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-[#FCF9EE]">
      {/* Hero Section */}
      <section className="relative bg-[#2c3e50] pt-30 pb-8 px-6 md:px-12 xl:px-24 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 opacity-10"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] -mr-64 -mt-64" />
        </motion.div>

        <div className="relative z-10 max-w-8xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-4xl font-michroma font-bold text-white tracking-wider uppercase mb-6"
          >
            Terms & Conditions
          </motion.h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 px-6 md:px-12 xl:px-24">
        <div className="max-w-8xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-slate max-w-none mb-16"
          >
            <p className="font-be-vietnam text-lg md:text-xl text-[#2c3e50] leading-relaxed">
              LASVELA reserves the right to cancel or terminate any sales order at its discretion, 
              even if the order has already been confirmed and paid for by the customer, with or 
              without prior notice. LASVELA will not be held liable for any such cancellations or 
              terminations. In such cases, a full refund will be provided to the customer. Unless 
              specified otherwise, all quoted prices include goods and service tax. Both online and 
              in-store purchases are subject to the same warranty, exchange, and return policies.
            </p>
            <div className="mt-10">
              <h2 className="font-michroma text-xl font-bold text-[#2c3e50] mb-4 uppercase tracking-tight">Disclaimers</h2>
              <p className="font-be-vietnam text-lg text-[#2c3e50]/80 leading-relaxed">
                All products sold are not designed by LASVELA unless otherwise specified.
              </p>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="mt-16">
            <h2 className="font-michroma text-2xl font-bold text-[#2c3e50] mb-12 uppercase tracking-tight">Terms Information</h2>
            <Suspense fallback={<div className="py-12 text-center font-michroma text-[#2c3e50]">Loading Terms...</div>}>
              <TermsContainer />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

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
            Privacy Policy
          </motion.h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-6 md:px-12 xl:px-24">
        <div className="max-w-8xl mx-auto">
          <motion.div {...fadeIn} className="prose prose-slate max-w-none">
            <p className="font-be-vietnam text-lg md:text-xl text-[#2c3e50] mb-12 leading-relaxed">
              This privacy policy has been created by <span className="font-bold">LASVELA</span> to ensure the responsible use of our website and to safeguard
              the information shared by our stakeholders while navigating through our online furniture store, in
              compliance with the Personal Data Protection Act (PDPA).
            </p>

            <div className="space-y-16">
              <section>
                <h2 className="font-michroma text-2xl font-bold text-[#2c3e50] mb-6 uppercase tracking-tight">Information We Collect</h2>
                <p className="font-be-vietnam text-[#2c3e50]/80 mb-6 leading-relaxed">
                  As an online furniture store, LASVELA requires certain details from customers and site visitors to facilitate
                  purchases and address inquiries. Providing this information helps us confirm and validate transactions while
                  enhancing our online services. The types of data we collect include:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                  {["Personal details", "Contact information", "Delivery address", "Email address", "Type of residential property"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 font-be-vietnam text-[#2c3e50]/80">
                      <div className="w-2 h-2 rounded-full bg-[#2c3e50]/30" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-michroma text-2xl font-bold text-[#2c3e50] mb-6 uppercase tracking-tight">Purpose of Collection</h2>
                <p className="font-be-vietnam text-[#2c3e50]/80 mb-6 leading-relaxed">
                  The personal information gathered from customers and visitors is used for the following functions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    "Processing orders", "Handling payment and billing", "Managing credit-related information", 
                    "Completing deliveries", "Providing customer support", "Improving our website & services", 
                    "Product updates & marketing"
                  ].map((item, idx) => (
                    <div key={idx} className="border-b border-[#2c3e50]/20 pb-2 font-be-vietnam text-[#2c3e50]/80">
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white pb-6 px-6 md:px-10 shadow-sm rounded-2xl border border-[#2c3e50]/5">
                <h3 className="font-michroma text-2xl font-bold text-[#2c3e50] mb-12 uppercase tracking-tight">Safeguarding Your Data</h3>
                <div className="space-y-8">
                  {[
                    {
                      title: "Obtaining Your Consent",
                      text: "We will always seek your consent before collecting or using your personal information. While sharing personal data is optional, please note that certain information is necessary for processing orders."
                    },
                    {
                      title: "Data Accuracy",
                      text: "We may request you to confirm the accuracy of your details to prevent issues related to payment and delivery, ensuring a seamless experience."
                    },
                    {
                      title: "Secure Sharing",
                      text: "Your personal information is securely stored and will not be shared with third parties unless necessary (e.g., sharing delivery addresses with couriers)."
                    },
                    {
                      title: "Retention & Withdrawal",
                      text: "Data is stored temporarily and deleted post-transaction, except for subscriptions. You have the right to withdraw consent at any time."
                    }
                  ].map((item, idx) => (
                    <div key={idx}>
                      <h3 className="font-michroma text-sm font-bold text-[#2c3e50] mb-2 uppercase tracking-widest">{item.title}</h3>
                      <p className="font-be-vietnam text-[#2c3e50]/70 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="text-center pt-8">
                <p className="font-be-vietnam text-[#2c3e50]/60 text-md italic">
                  LASVELA reserves the right to update or amend this privacy policy in accordance with the PDPA and other relevant laws.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

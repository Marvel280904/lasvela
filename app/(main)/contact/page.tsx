"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Phone, Mail, MapPin, ChevronRight, Smartphone, Car, TrainFront, Bus } from "lucide-react";

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + (i * 0.15),
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1] // easeOut exposure
      }
    })
  };

  return (
    <main className="relative min-h-screen overflow-x-clip">
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-start xl:items-center px-6 md:px-12 xl:px-24 overflow-hidden">
        {/* Background Section */}
        <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
            className="absolute inset-0 z-0 h-full w-full"
        >
            <Image
            src="/images/contact-bg.png"
            alt="Home Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[60%_50%]"
            />
            {/* Subtle Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/5" />
        </motion.div>

        <div className="relative z-10 pt-32 md:pt-40 lg:pt-60 xl:pt-0">
            <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="text-2xl md:text-4xl font-michroma leading-[1.2] md:leading-[1.1] tracking-wide text-white drop-shadow-2xl"
            >
            CONTACT
            </motion.h1>

            <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "linear" }}
            className="mt-8 text-white/80 font-be-vietnam text-sm md:text-lg max-w-2xl"
            >
            Have questions or need assistance? Feel free to reach out to us, 
            we are happy to help you find the right piece for your space.
            </motion.p>
        </div>
        </section>

        {/* Contact Info & Form Section */}
        <section className="bg-[#FCF9EE] py-24 md:py-32 px-6 md:px-12 xl:px-24">
            <div className="max-w-8xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-12">
                {/* Left Side: Information */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="w-full lg:w-1/2 space-y-12 xl:space-y-4 flex flex-col md:items-center lg:items-start text-center lg:text-left"
                >
                    <div className="space-y-6">
                        <motion.h2 
                            variants={itemVariants} 
                            className="text-4xl xl:text-5xl font-michroma font-bold text-[#2c3e50] leading-tight max-w-lg md:mx-auto lg:mx-0"
                        >
                            We&apos;re Here Whenever You Need Us
                        </motion.h2>
                        <motion.p 
                            variants={itemVariants} 
                            className="text-[#2c3e50]/70 font-be-vietnam text-md md:text-lg leading-relaxed max-w-md md:mx-auto lg:mx-0"
                        >
                            Our team is ready to guide you with any questions about your home furnishing needs.
                        </motion.p>
                    </div>

                    <motion.div 
                        variants={itemVariants}
                        className="relative aspect-square w-full max-w-md overflow-hidden md:mx-auto lg:mx-0"
                    >
                        <Image
                            src="/images/img4.png"
                            alt="Lasvela Furniture"
                            fill
                            sizes="(max-width: 1024px) 100vw, 512px"
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Quick Contacts Grid */}
                    <div className="grid grid-cols-2 gap-y-10 gap-x-3 pt-8 w-full md:justify-items-center lg:justify-items-start">
                        {/* WhatsApp */}
                        <motion.div variants={itemVariants} className="space-y-4 flex flex-col md:items-center lg:items-start">
                            <div className="flex items-center gap-3 text-[#2c3e50]">
                                <Smartphone className="w-5 h-5" strokeWidth={1.5} />
                                <span className="font-be-vietnam text-xs font-bold uppercase tracking-widest">WhatsApp</span>
                            </div>
                            <Link 
                                href="https://wa.me/6560190775?text=Hi%20Las%20Vela!%20I%20would%20like%20to%20know%20is%20there%20any%20promos?" 
                                target="_blank" rel="noopener noreferrer"
                                className="block text-[#2c3e50]/70 font-be-vietnam text-sm md:text-md hover:text-[#2c3e50] transition-colors"
                            >
                                +65 6019 0775
                            </Link>
                        </motion.div>

                        {/* Our Location */}
                        <motion.div variants={itemVariants} className="space-y-4 flex flex-col md:items-center lg:items-start">
                            <div className="flex items-center gap-3 text-[#2c3e50]">
                                <MapPin className="w-5 h-5" strokeWidth={1.5} />
                                <span className="font-be-vietnam text-xs font-bold uppercase tracking-widest">Our Location</span>
                            </div>
                            <Link 
                                href="https://maps.google.com/?q=36+Jalan+Kilang+Barat+Singapore+159366" 
                                target="_blank" rel="noopener noreferrer"
                                className="block text-[#2c3e50]/70 font-be-vietnam text-sm md:text-md hover:text-[#2c3e50] transition-colors leading-relaxed md:text-center lg:text-left"
                            >
                                36 Jalan Kilang Barat<br />Singapore 159366
                            </Link>
                        </motion.div>

                        {/* Email */}
                        <motion.div variants={itemVariants} className="space-y-4 flex flex-col md:items-center lg:items-start">
                            <div className="flex items-center gap-3 text-[#2c3e50]">
                                <Mail className="w-5 h-5" strokeWidth={1.5} />
                                <span className="font-be-vietnam text-xs font-bold uppercase tracking-widest">Email</span>
                            </div>
                            <Link 
                                href="mailto:enquiry@lasvela.sg" 
                                target="_blank" rel="noopener noreferrer"
                                className="block text-[#2c3e50]/70 font-be-vietnam text-sm md:text-md hover:text-[#2c3e50] transition-colors"
                            >
                                enquiry@lasvela.sg
                            </Link>
                        </motion.div>

                        {/* Social Network */}
                        <motion.div variants={itemVariants} className="space-y-4 flex flex-col md:items-center lg:items-start">
                            <div className="flex items-center gap-3 text-[#2c3e50]">
                                <Smartphone className="w-5 h-5" strokeWidth={1.5} />
                                <span className="font-be-vietnam text-xs font-bold uppercase tracking-widest">Social Network</span>
                            </div>
                            <div className="flex items-center gap-6">
                                {/* Facebook */}
                                <Link href="https://www.facebook.com/lasvelasg" target="_blank" rel="noopener noreferrer" className="text-[#2c3e50]/70 hover:text-[#2c3e50] transition-colors">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </Link>
                                {/* Tiktok */}
                                <Link href="https://www.tiktok.com/@lasvela.sg" target="_blank" rel="noopener noreferrer" className="text-[#2c3e50]/70 hover:text-[#2c3e50] transition-colors">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.26-.18-.52-.38-.75-.59v6.7c-.22 5.92-7.5 8.16-10.49 4.18-3.03-3.8-1.54-9.98 3.8-10.43v4.01c-2.48.24-3.32 3.49-1.63 4.96 1.72 1.49 4.54.49 4.54-1.8V0c.23-.01.49-.01.76-.01z"/>
                                    </svg>
                                </Link>
                                {/* IG */}
                                <Link href="https://www.instagram.com/lasvela.sg" target="_blank" rel="noopener noreferrer" className="text-[#2c3e50]/70 hover:text-[#2c3e50] transition-colors">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Side: Contact Form Card */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-1/2"
                >
                    <div className="bg-white p-8 md:p-6 xl:p-14 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50/50">
                        <div className="mb-12">
                            <h2 className="text-3xl md:text-4xl font-michroma font-bold text-[#2c3e50] leading-tight">
                                Send us a message
                            </h2>
                            <p className="mt-4 text-[#2c3e50]/70 font-be-vietnam text-sm leading-relaxed">
                                We&apos;re here to answer your questions and guide you through your home journey.
                            </p>
                            <div className="mt-8 border-b border-gray-400" />
                        </div>

                        {/* Form Fields - Static for now */}
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-be-vietnam tracking-widest font-medium text-[#2C3E50]">Full name</label>
                                    <input type="text" className="w-full border border-gray-400 py-3 rounded-sm outline-none focus:border-[#2c3e50] transition-colors font-be-vietnam text-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-be-vietnam tracking-widest font-medium text-[#2C3E50]">Contact</label>
                                    <input type="text" className="w-full border border-gray-400 py-3 rounded-sm outline-none focus:border-[#2c3e50] transition-colors font-be-vietnam text-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-be-vietnam tracking-widest font-medium text-[#2C3E50]">Email</label>
                                    <input type="email" className="w-full border border-gray-400 py-3 rounded-sm outline-none focus:border-[#2c3e50] transition-colors font-be-vietnam text-sm" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-be-vietnam tracking-widest font-medium text-[#2C3E50]">Reason</label>
                                    <select className="w-full border border-gray-400 py-3 rounded-sm outline-none focus:border-[#2c3e50] transition-colors font-be-vietnam text-sm bg-transparent cursor-pointer">
                                        <option>Select</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-be-vietnam tracking-widest font-medium text-[#2C3E50]">Contact Time</label>
                                    <select className="w-full border border-gray-400 py-3 rounded-sm outline-none focus:border-[#2c3e50] transition-colors font-be-vietnam text-sm bg-transparent cursor-pointer">
                                        <option>Select</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2 pt-4">
                                <label className="text-sm font-be-vietnam tracking-widest font-medium text-[#2C3E50]">Message</label>
                                <textarea rows={4} className="w-full border border-gray-400 p-4 rounded-sm outline-none focus:border-[#2c3e50] transition-colors font-be-vietnam text-sm resize-none" />
                            </div>

                            <div className="flex justify-end pt-8">
                                <button type="button" className="bg-[#2c3e50] text-white px-10 py-4 rounded-full font-michroma text-[11px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-[#1a252f] transition-all duration-300">
                                    <ChevronRight className="w-4 h-4" />
                                    Send a message
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>

        {/* Come Visit Our Space Section */}
        <section className="bg-[#F8F5EA] py-24 md:py-32 px-6 md:px-12 xl:px-24 border-t border-[#FCF9EE]/50">
            <div className="max-w-8xl mx-auto">
                <div className="mb-10">
                    <motion.h2 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-4xl font-michroma font-bold text-[#2c3e50] leading-tight"
                    >
                        Come Visit Our Space
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-4 text-[#2c3e50]/70 font-be-vietnam text-sm md:text-md leading-relaxed"
                    >
                        Find essential information to make your visit smooth and convenient.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* By Car Card */}
                    <motion.div 
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cardVariants}
                        className="bg-[#2C3E50] p-10 xl:p-12 rounded-2xl text-white shadow-xl flex flex-col justify-between group hover:translate-y-[-8px] transition-transform duration-500"
                    >
                        <div>
                            <div className="flex items-center gap-6 mb-12">
                                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                    <Car className="w-10 h-10" strokeWidth={2} />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-michroma font-bold leading-tight">By Car</h3>
                            </div>
                            <p className="font-be-vietnam text-sm md:text-md leading-relaxed text-white/80">
                                Parking is available within the building, providing convenient access for visitors arriving by vehicle.
                            </p>
                        </div>
                    </motion.div>

                    {/* By MRT Card */}
                    <motion.div 
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cardVariants}
                        className="bg-white p-10 md:p-12 rounded-2xl text-[#2c3e50] shadow-xl border border-gray-100/50 flex flex-col justify-between hover:translate-y-[-8px] transition-transform duration-500"
                    >
                        <div>
                            <div className="flex items-center gap-6 mb-12">
                                <div className="w-16 h-16 rounded-full bg-[#2C3E50] flex items-center justify-center">
                                    <TrainFront className="w-10 h-10 text-white" strokeWidth={2} />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-michroma font-bold leading-tight">By MRT</h3>
                            </div>
                            <p className="font-be-vietnam text-sm md:text-md leading-relaxed text-[#2c3e50]/70">
                                The building is within a short 10-minute walking distance from Redhill MRT Station (EW18), ensuring easy connectivity.
                            </p>
                        </div>
                    </motion.div>

                    {/* By Bus Card */}
                    <motion.div 
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cardVariants}
                        className="bg-white p-10 md:p-12 rounded-2xl text-[#2c3e50] shadow-xl border border-gray-100/50 flex flex-col justify-between hover:translate-y-[-8px] transition-transform duration-500"
                    >
                        <div>
                            <div className="flex items-center gap-6 mb-10">
                                <div className="w-16 h-16 rounded-full bg-[#2C3E50] flex items-center justify-center">
                                    <Bus className="w-10 h-10 text-white" strokeWidth={2} />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-michroma font-bold leading-tight">By Bus</h3>
                            </div>
                            <div className="space-y-8">
                                <p className="font-be-vietnam text-sm leading-relaxed text-[#2c3e50]/70">
                                    Stop at Blk 1 (Stop ID: 10139) or Opp Blk 28 (Stop ID: 10111) along Jalan Bukit Merah
                                </p>
                                {/* Bus Number Grid */}
                                <div className="grid grid-cols-5 gap-2">
                                    {[14, 123, 147, 153, 196, 197, 198, 855, 961, "961M"].map((num) => (
                                        <div 
                                            key={num.toString()} 
                                            className="bg-[#2c3e50] text-white text-[10px] md:text-xs font-bold py-1.5 rounded flex items-center justify-center font-michroma"
                                        >
                                            {num}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* Map Section */}
        <section className="w-full h-[500px] md:h-[600px] bg-white overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full h-full"
            >
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.790606497274!2d103.80010631475403!3d1.2896110990636652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1bad55555555%3A0x1234567890abcdef!2s36%20Jalan%20Kilang%20Barat!5e0!3m2!1sen!2ssg!4v1620000000000!5m2!1sen!2ssg" 
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ESSEN Furniture Store Location"
                    className="w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                ></iframe>
            </motion.div>
        </section>
    </main>
  );
}
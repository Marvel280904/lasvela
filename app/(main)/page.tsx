"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Hourglass, 
  ShieldCheck, 
  Sparkles, 
  Home as HomeIcon,
  MapPin,
  Clock,
  Coffee,
  BookOpen,
  Tag
} from "lucide-react";
import Testimonial from "@/components/home/Testimonial";
import WeeklyBestSeller from "@/components/home/best-seller";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-start xl:items-center px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Background Section */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0 h-full w-full"
        >
          <Image
            src="/images/home-bg.png"
            alt="Home Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[60%_50%]"
          />
          {/* Subtle Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/5" />
        </motion.div>

        <div className="relative z-10 max-w-4xl pt-32 md:pt-40 lg:pt-60 xl:pt-0">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl md:text-4xl font-michroma leading-[1.2] md:leading-[1.1] tracking-wide text-white drop-shadow-2xl"
          >
            ILLUMINATING LIFE,
            <br />
            CRAFTING HOME.
          </motion.h1>
          
          {/* <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            className="h-[2px] bg-white/30 mt-8 max-w-xs md:max-w-md lg:max-w-lg"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeIn" }}
            className="mt-8 text-white/80 font-be-vietnam text-xs md:text-sm tracking-[0.4em] uppercase"
          >
            Luxury Lighting & Furniture Collections
          </motion.p> */}
        </div>
      </section>

      {/* Design That Endures Section */}
      <section className="bg-[#FCF9EE] py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-8xl mx-auto flex flex-col xl:flex-row items-center gap-16 xl:gap-24">
          {/* Image Part */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 relative aspect-[3/4] w-full"
          >
            <Image
              src="/images/img1.png"
              alt="Design That Endures furniture"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
              className="object-cover shadow-xl"
            />
          </motion.div>

          {/* Text Part */}
          <div className="flex-1 space-y-10">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-4xl font-michroma font-bold text-[#2c3e50] leading-tight"
            >
              Design That Endures
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-[#2c3e50] font-be-vietnam leading-relaxed text-[15px] md:text-base"
            >
              <p>
                LAS VELA stands for design that endures. We believe furniture should do more than fill a space – it should bring warmth, balance, and meaning into everyday life. Our approach bridges the aesthetic and the essential, creating pieces that integrate naturally into the rhythm of contemporary living. Each product is designed with intention, combining refined form with practical function to ensure lasting comfort and reliability. We focus on thoughtful craftsmanship, where every curve, material, and finish is carefully considered, allowing us to create furniture that not only looks timeless, but also feels right to live with day after day.
              </p>
              <p>
                At LAS VELA, we design for people who value clarity, calm, and quality in their environment. Our collections are made to support modern homes – spaces where comfort, simplicity, and purpose exist in balance. Beyond design, we believe the experience matters, which is why through our showroom we invite you to explore each piece in person, feel the materials, see the details, and discover furniture that fits naturally into your life.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/about">
                <button className="bg-[#2c3e50] text-white px-8 py-3 font-be-vietnam text-sm tracking-[0.2em] hover:bg-[#34495e] transition-all transform hover:scale-105 active:scale-95">
                  LEARN MORE
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Collection Section */}
      <section className="bg-[#F8F5EA] py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-8xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-michroma text-[#2c3e50] mb-4">
              The Collection
            </h2>
            <p className="text-[#2c3e50] font-be-vietnam text-sm md:text-base">
              Our collection is created to support the way people live today.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {[
              { name: "Chairs", src: "/images/chairs.png" },
              { name: "Dining Table", src: "/images/dining-table.png" },
              { name: "Sofas", src: "/images/sofas.png" },
              { name: "Bedframes", src: "/images/bedframes.png" },
            ].map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Link href="/product" className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-sm group-hover:shadow-xl transition-all duration-500">
                    <Image
                      src={item.src}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="mt-6 text-md font-bold font-michroma text-[#2c3e50] tracking-wider">
                    {item.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Thoughtful Craftsmanship Section */}
      <section className="bg-[#FCF9EE] py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-8xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="text-3xl md:text-4xl font-michroma font-bold text-[#2c3e50] leading-tight max-w-2xl mx-auto">
              Thoughtful Craftsmanship, Designed to Last
            </h2>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              {
                icon: Hourglass,
                title: "Timeless Craft",
                desc: "Honoring centuries - old techniques while embracing modern ergonomics.",
              },
              {
                icon: ShieldCheck,
                title: "Unwavering Trust",
                desc: "Full transparency in our supply chain and sustainable sourcing practices.",
              },
              {
                icon: Sparkles,
                title: "Curated Care",
                desc: "A white-glove experience from initial consultation to final delivery.",
              },
              {
                icon: HomeIcon,
                title: "Designed for Living",
                desc: "Furniture that adapts to your life, built for the rigors of every day.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center space-y-6"
              >
                <div className="bg-[#F0EDE1] p-6 rounded-2xl transition-colors hover:bg-[#2c3e50]/10">
                  <feature.icon className="w-8 h-8 text-[#2c3e50]" strokeWidth={1.2} />
                </div>
                <h3 className="text-lg font-bold font-michroma text-[#2C3E50] tracking-wider">
                  {feature.title}
                </h3>
                <p className="text-[#2c3e50] font-be-vietnam text-sm leading-relaxed max-w-md">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WeeklyBestSeller />

      {/* Experience Section */}
      <section className="bg-[#FCF9EE] py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-8xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 xl:gap-24">
          {/* Left Column - Text Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-michroma font-bold text-[#2c3e50] leading-tight">
                Experience LAS VELA in Person
              </h2>
              <p className="text-[#2c3e50] font-be-vietnam text-sm md:text-base leading-relaxed max-w-xl">
                Our showrooms are designed as immersive galleries. Feel the textures, experience the scale, and consult with our design specialists about your unique space.
              </p>
            </div>

            <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row md:items-center lg:items-start xl:items-center md:gap-16 xl:gap-20 space-y-10 md:space-y-0 xl:space-y-0">
              {/* Location & Time */}
              <div className="space-y-6">
                <div className="flex items-start lg:items-center space-x-4">
                  <MapPin className="w-6 h-6 text-[#2c3e50] mt-1 lg:mt-0" strokeWidth={1.5} />
                  <div className="text-[#2c3e50] font-be-vietnam text-md tracking-wide">
                    <span>36 Jln Kilang Barat Singapore</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-[#2c3e50]" strokeWidth={1.5} />
                  <p className="text-[#2c3e50] font-be-vietnam text-md tracking-wide">
                    11.00 - 19.00
                  </p>
                </div>
              </div>

              {/* Experience Icons */}
              <div className="flex items-center justify-center space-x-10 lg:space-x-12">
                <div className="flex flex-col items-center">
                  <Coffee className="w-8 h-8 text-[#2c3e50] fill-current" strokeWidth={1.2} />
                </div>
                <div className="w-[1px] h-12 bg-[#2c3e50]/20" />
                <div className="flex flex-col items-center">
                  <BookOpen className="w-8 h-8 text-[#2c3e50] fill-current" strokeWidth={1.2} />
                </div>
                <div className="w-[1px] h-12 bg-[#2c3e50]/20" />
                <div className="flex flex-col items-center">
                  <Tag className="w-8 h-8 text-[#2c3e50] fill-current" strokeWidth={1.2} />
                </div>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button className="bg-[#2c3e50] text-white py-5 font-be-vietnam text-sm tracking-[0.3em] hover:bg-[#34495e] transition-all shadow-xl w-full">
                VISIT OUR SHOWROOM
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative aspect-[4/4] w-full group overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/lasvela-location.png"
              alt="Lasvela Showroom Location"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Image Footer Overlay
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white font-be-vietnam text-[10px] md:text-xs tracking-widest text-center">
                Find our location at: <span className="font-bold">36 Jalan Kilang Barat, Singapore</span>
              </p>
            </div> */}
          </motion.div>
        </div>
      </section>

      <Testimonial />

      {/* CTA Section */}
      <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
        {/* Background Image with Animation */}
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1}}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/cta-bg.png"
            alt="Create a Home That Feels Right"
            fill
            sizes="100vw"
            className="object-cover object-[70%_50%]"
            priority
          />
        </motion.div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-michroma font-bold text-white leading-tight">
              Create a Home That Feels Right
            </h2>
            <p className="text-white font-be-vietnam text-lg mx-auto">
              Discover furniture designed with intention, built for comfort, and made to last.
            </p>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
              <Link href="/product">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#2c3e50] text-white px-12 py-4 font-be-vietnam text-sm tracking-[0.2em] transition-all min-w-[240px]"
                >
                  EXPLORE COLLECTION
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05}}
                  whileTap={{ scale: 0.95 }}
                  className="border border-white text-white px-23 py-4 font-be-vietnam text-sm tracking-[0.2em] transition-all min-w-[240px]"
                >
                  CONTACT US
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

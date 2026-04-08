"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sofa, MessageSquare, Settings, Truck } from "lucide-react";

export default function About() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
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
            src="/images/about-bg.png"
            alt="Home Hero Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[65%_30%]"
            />
            {/* Subtle Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/5" />
        </motion.div>

        <div className="relative z-10 pt-32 md:pt-40 lg:pt-60 xl:pt-0">
            <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl md:text-4xl font-michroma leading-[1.2] md:leading-[1.1] tracking-wide text-white drop-shadow-2xl"
            >
            ABOUT US
            </motion.h1>

            <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeIn" }}
            className="mt-8 text-white/80 font-be-vietnam text-sm md:text-lg max-w-2xl"
            >
            We create thoughtfully designed furniture that brings comfort, 
            clarity, and balance into modern living spaces. Every piece is 
            crafted to make your home feel more meaningful.
            </motion.p>
        </div>
        </section>

        {/* Meaningful Living Section */}
        <section className="bg-[#FCF9EE] py-20 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-8xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Content Side */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl xl:text-4xl font-michroma font-bold text-[#2c3e50] leading-tight">
                        Spaces Crafted for <br className="hidden md:block" /> Meaningful Living
                    </h2>
                    
                    <div className="mt-10 space-y-6 text-[#2c3e50]/80 font-be-vietnam text-sm md:text-md leading-relaxed">
                        <p>
                            At LAS VELA, we design living spaces that balance beauty with emotion. 
                            Every piece is created with intention, combining modern aesthetics with 
                            timeless comfort to shape environments that feel refined, calm, and personal. 
                            We believe furniture is not only about function, but also about atmosphere, 
                            character, and the feeling that fills a room when every element is placed with care. 
                            Our collections are designed to help people live better, rest deeper, and enjoy 
                            the quiet moments that make a house feel complete.
                        </p>
                        <p>
                            Our philosophy moves between two ideas, The Sail and The Light. 
                            The Sail represents progress, direction, and the courage to move forward, 
                            while The Light represents warmth, clarity, and the feeling of coming home. 
                            Through this balance, we create furniture that supports modern living without 
                            losing the sense of comfort and humanity that every home deserves. 
                            Each design is carefully considered so that it not only fits the space, 
                            but also fits the life inside it.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Image Side */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative aspect-[5/5] w-full overflow-hidden shadow-2xl"
                >
                    <Image
                        src="/images/img2.png"
                        alt="Meaningful Living"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                    />
                </motion.div>
            </div>
        </div>
        </section>

        {/* Where Purpose Meets Section */}
        <section className="bg-[#F8F5EA] py-20 md:py-32 px-6 md:px-12 lg:px-24">
            <div className="max-w-8xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                {/* Image Side - Now on the left for deskop balance */}
                <div className="w-full lg:w-1/2 order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative aspect-square w-full overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="/images/img3.png"
                            alt="Purpose & Living"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </motion.div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 order-2">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl xl:text-4xl font-michroma font-bold text-[#2c3e50] leading-tight">
                            Where Purpose Meets <br className="hidden md:block" /> Beautiful Living
                        </h2>
                        
                        <div className="mt-10 space-y-6 text-[#2c3e50]/80 font-be-vietnam text-sm md:text-md leading-relaxed">
                            <p>
                                LAS VELA began with a simple belief that a home should grow together with 
                                the person who lives in it. We see furniture as part of a journey, not just 
                                objects placed inside a room. Like a sail guiding movement across the sea, 
                                our designs provide structure, stability, and confidence for people who 
                                continue to move forward in life. Every line, material, and proportion is 
                                created with purpose so that beauty and function exist in perfect harmony.
                            </p>
                            <p>
                                At the same time, every journey needs a place to return to. Like a light that 
                                waits at the end of the day, our designs bring warmth into modern spaces 
                                and turn them into places of rest. We craft each piece with careful attention 
                                to detail, ensuring that comfort, durability, and elegance stay together 
                                for years to come. Through thoughtful design and honest craftsmanship, 
                                we aim to create furniture that not only fills a room, but also gives 
                                meaning to the way people live inside it.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* Stats Bar Section */}
        <section className="bg-[#2c3e50] py-20 px-6 md:px-12 lg:px-24">
            <div className="max-w-8xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {[1, 2, 3].map((item) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: item * 0.1 }}
                            className="space-y-4"
                        >
                            <h3 className="text-5xl md:text-6xl font-michroma font-bold text-white tracking-widest">
                                00+
                            </h3>
                            <p className="text-white/60 font-be-vietnam text-sm md:text-base uppercase tracking-widest">
                                Lorem Ipsum
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* Why Lasvela Section */}
        <section className="bg-[#F8F5EA] py-24 md:py-32 px-6 md:px-12 lg:px-24">
            <div className="max-w-8xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
                {/* Left Side: Sticky Content */}
                <div className="lg:w-2/5">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:sticky lg:top-32 h-fit"
                    >
                        <div className="flex items-center gap-4 text-[#2c3e50]">
                            <Sofa className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
                            <h2 className="text-3xl xl:text-4xl font-michroma font-bold leading-tight uppercase">
                                Why Lasvela?
                            </h2>
                        </div>
                        <p className="mt-8 text-[#2c3e50]/80 font-be-vietnam text-sm md:text-base leading-relaxed max-w-2xl lowercase">
                            <span className="font-bold uppercase tracking-widest text-[#2c3e50]">Lasvela</span> delivers thoughtfully 
                            designed furniture with premium materials, combining comfort, functionality, and timeless aesthetics for your home.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Features Timeline */}
                <div className="lg:w-3/5 relative">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-[#2c3e50]/15" />

                    <div className="space-y-16 pl-8 lg:pl-16">
                        {[
                            {
                                title: "Everything Under One Roof",
                                description: "Find complete furniture solutions for every room in one curated destination. We provide a seamless one stop experience for your living, dining, and kitchen areas."
                            },
                            {
                                title: "Expert Design Consultation",
                                description: "Collaborate with our interior specialists to define your vision and preferences. Our experts help you find the perfect pieces to resonate with your unique lifestyle."
                            },
                            {
                                title: "Bespoke Customization",
                                description: "Tailor our products to your exact specifications for a perfect fit. Select your preferred sizes and premium fabrics to create a truly unique piece."
                            },
                            {
                                title: "Uncompromised Value",
                                description: "Enjoy exceptional design and high quality craftsmanship at competitive prices. We offer the best value for your investment without ever sacrificing style."
                            },
                            {
                                title: "Seamless Delivery",
                                description: "Our efficient delivery services ensure your furniture arrives safely and on time. We handle every item with care to bring your vision to life right at your doorstep."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.15 }}
                                className="relative group"
                            >
                                {/* Marker Dot */}
                                <div className="absolute -left-[35.5px] lg:-left-[67.5px] top-1.5 w-2 h-2 rounded-full bg-[#2c3e50] z-10 transition-transform duration-500 group-hover:scale-150" />
                                
                                <h3 className="text-xl md:text-2xl font-michroma font-bold text-[#2c3e50] leading-tight flex items-center gap-4">
                                    {feature.title}
                                </h3>
                                <p className="mt-4 text-[#2c3e50]/70 font-be-vietnam text-sm md:text-base leading-relaxed max-w-2xl">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* Our Services Section */}
        <section className="bg-[#FCF9EE] py-24 md:py-32 px-6 md:px-12 lg:px-24">
            <div className="max-w-8xl mx-auto">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl xl:text-4xl font-michroma font-bold text-[#2c3e50] uppercase"
                >
                    Our Services
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mt-16 md:mt-24">
                    {[
                        {
                            icon: MessageSquare,
                            title: "Design Consultation",
                            description: "Meet with our interior experts to discuss your space, style preferences, and find the perfect pieces for your home."
                        },
                        {
                            icon: Settings,
                            title: "Custom Operation",
                            description: "Need a specific size or fabric? Our customization services allow you to tailor products to your exact specifications."
                        },
                        {
                            icon: Truck,
                            title: "Fast Delivery",
                            description: "We offer reliable and careful delivery services, ensuring your furniture arrives safely and on time to your doorstep."
                        }
                    ].map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="bg-white p-10 lg:p-6 xl:p-12 border border-gray-100/50 shadow-sm hover:shadow-xl transition-all duration-500 group"
                        >
                            <div className="w-14 h-14 rounded-full bg-[#2c3e50] flex items-center justify-center text-white mb-10 transition-transform duration-500 group-hover:scale-110">
                                <service.icon className="w-6 h-6" strokeWidth={1.5} />
                            </div>
                            
                            <h3 className="text-xl md:text-2xl font-michroma font-bold text-[#2c3e50] leading-tight mb-6">
                                {service.title}
                            </h3>
                            <p className="text-[#2c3e50]/70 font-be-vietnam text-sm md:text-md leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    </main>
    );
}
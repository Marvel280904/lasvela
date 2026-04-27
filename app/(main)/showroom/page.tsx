"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Showroom() {
    return (
        <main className="relative min-h-screen overflow-x-clip">
            {/* Hero Section */}
            <section className="relative flex min-h-screen items-start xl:items-center px-6 md:px-12 xl:px-24 overflow-hidden">
                {/* Background Section */}
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0 z-0 h-full w-full"
                >
                    <Image
                        src="/images/showroom-bg.png"
                        alt="Home Hero Background"
                        fill
                        priority
                        quality={100}
                        sizes="100vw"
                        className="object-cover object-[75%_30%]"
                    />
                    {/* Subtle Overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-black/5" />
                </motion.div>

                <div className="relative z-10 max-w-[280px] sm:max-w-md md:max-w-2xl lg:max-w-4xl pt-32 md:pt-40 lg:pt-60 xl:pt-0">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-2xl md:text-4xl font-michroma leading-[1.2] md:leading-[1.1] tracking-wide text-white drop-shadow-2xl"
                    >
                        OUR SHOWROOM
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeIn" }}
                        className="mt-8 text-white/80 font-be-vietnam text-sm md:text-lg max-w-lg lg:max-w-2xl"
                    >
                        Discover our curated space where every piece is displayed in a
                        real living atmosphere, allowing you to experience comfort, material,
                        and design in person.
                    </motion.p>
                </div>
            </section>

            {/* Floors Section */}
            <section className="bg-[#FCF9EE] py-20 px-6 md:px-12 xl:px-24">
                <div className="max-w-8xl mx-auto">
                    {[
                        {
                            id: "third",
                            title: "Third Floor",
                            image: "/images/third-floor.png",
                            description: "Discover tranquility on our top floor. Explore our premium range of beds, mattresses, and bedroom storage solutions crafted to create your personal haven of rest and relaxation."
                        },
                        {
                            id: "second",
                            title: "Second Floor",
                            image: "/images/second-floor.png",
                            description: "Experience the art of gathering. Our second floor is dedicated to living and dining spaces, featuring elegant sofas, dining sets, and statement pieces designed for comfort and conversation."
                        },
                        {
                            id: "first",
                            title: "First Floor",
                            image: "/images/firts-floor.png",
                            description: "Step into our ground floor and immerse yourself in our comprehensive collection of home essentials. This thoughtfully curated space showcases the foundational elements that transform a house into a sophisticated home."
                        }
                    ].map((floor, index) => (
                        <motion.div
                            key={floor.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="relative w-full group"
                        >
                            {/* Floor Image Container */}
                            <div className="relative aspect-[16/9] md:aspect-[20/6] w-full overflow-hidden">
                                <Image
                                    src={floor.image}
                                    alt={floor.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
                                    quality={100}
                                    priority={index > 0} // Set priority for images detected as LCP
                                    className="object-contain"
                                />

                                {/* Floor Label Tag */}
                                <div className="absolute top-5 left-0 bg-[#2c3e50] text-white px-4 py-2 md:px-8 md:py-3 font-michroma text-[10px] md:text-xs tracking-widest z-20">
                                    {floor.title.toUpperCase()}
                                </div>

                                {/* Description Box (Desktop/Tablet) */}
                                <div className="hidden md:block absolute bottom-0.5 right-0 max-w-sm lg:max-w-md bg-[#F8F5EA] p-2 lg:p-3 z-20">
                                    <p className="text-[#2c3e50] font-be-vietnam text-xs lg:text-sm leading-relaxed">
                                        {floor.description}
                                    </p>
                                </div>
                            </div>

                            {/* Description Box (Mobile) */}
                            <div className="md:hidden mb-6 bg-[#F8F5EA] p-6 shadow-sm">
                                <p className="text-[#2c3e50] font-be-vietnam text-sm leading-relaxed">
                                    {floor.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Experience Section */}
            <section className="bg-[#F8F5EA] py-32 px-6 md:px-12 xl:px-24 border-t border-gray-200/50">
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
                            <h2 className="text-3xl md:text-4xl font-michroma font-bold text-[#2c3e50] leading-tight">
                                The LASVELA Experience
                            </h2>
                            <p className="mt-8 text-[#2c3e50]/80 font-be-vietnam text-sm md:text-base leading-relaxed max-w-lg">
                                When you visit our showroom, you'll enjoy a curated furniture experience
                                designed to inspire and guide you toward the right choices for your home.
                                Plus, enjoy exclusive perks available only in-store.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Side: Experience Cards */}
                    <div className="lg:w-3/5 relative">
                        {/* Vertical Timeline Line (Desktop Only) */}
                        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[1px] bg-[#2c3e50]/20" />

                        <div className="space-y-16 lg:pl-12">
                            {[
                                {
                                    id: "consultation",
                                    title: "Free Design Consultation",
                                    description: "Our design consultants are available on every floor to offer personalized guidance and help you shape your ideal living space.",
                                    items: [
                                        "Space planning and furniture layout",
                                        "Choosing colors and materials that fit your style",
                                        "Custom furniture options tailored to your needs"
                                    ]
                                },
                                {
                                    id: "benefits",
                                    title: "In-Store Benefits",
                                    description: "Enjoy exclusive perks available only to showroom visitors:",
                                    items: [
                                        "Complimentary refreshments during your visit",
                                        "Special in-store discounts not offered online",
                                        "$50 off purchases of $500+ with an appointment (T&C apply)"
                                    ]
                                }
                            ].map((card, index) => (
                                <motion.div
                                    key={card.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.2 }}
                                    className="relative flex flex-col md:flex-row gap-8"
                                >
                                    {/* Timeline Marker (Desktop Only) */}
                                    <div className="hidden lg:block absolute -left-[57px] top-0 w-5 h-5 rounded-full bg-[#2c3e50] z-10 border-4 border-[#F9F6EE]" />

                                    <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100/50 w-full hover:shadow-xl transition-shadow duration-500">
                                        <h3 className="text-xl md:text-2xl font-michroma font-bold text-[#2c3e50]">
                                            {card.title}
                                        </h3>
                                        <p className="mt-6 text-[#2c3e50]/80 font-be-vietnam text-sm md:text-base leading-relaxed">
                                            {card.description}
                                        </p>
                                        <ul className="mt-8 space-y-4">
                                            {card.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-4 text-[#2c3e50]/80 font-be-vietnam text-md">
                                                    <span className="text-[#2c3e50] font-be-vietnam font-bold min-w-[20px]">{i + 1}.</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
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
    )
}

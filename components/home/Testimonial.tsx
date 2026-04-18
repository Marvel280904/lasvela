"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { UserCircle, ArrowLeft, ArrowRight } from "lucide-react";

// Dummy Data
const testimonials = [
  {
    id: 1,
    name: "Eric Tan",
    tagline: "Customer",
    body: "We had a great experience with Mr Nick. His recommendations were spot-on, and the furniture quality is excellent and beautiful. He is very helpful, knowledgeable, and always quick to respond to our questions. Truly appreciate his professionalism and dedication. Highly recommended!",
  },
  {
    id: 2,
    name: "Yokemui Tong",
    tagline: "Customer",
    body: "I have been looking for vanity set for my bathroom after HIP for the past few weeks. This set of vanity fulfill my requirement for the rounded corner and the price is very reasonable. The sale rep and manager are very polite and patient. The manager is very professional and answer my questions and do recommendations based on my need and no hard selling feeling throughout. Very happy with my purchases including lamp and taps also. Will definitely recommend Essen to my friends.",
  },
  {
    id: 3,
    name: "CT",
    tagline: "Customer",
    body: "RECOMMENDED!! Great service from Nick, who was friendly and attentive. I purchased two vanity sets at a reasonable price, and there was no hard selling throughout the process. The installation appointment was arranged promptly after the purchase, and Nick also followed up afterward to check on the installation condition. The installation team was professional as well. Overall, it was a very satisfying experience.",
  },
  {
    id: 4,
    name: "Yu Xuan Tan",
    tagline: "Customer",
    body: "Came to spend our climate vouchers on shower fittings and it was a successful trip. Nick was very patient, wasn’t pushy and very helpful in explaining the different features. There’s also a live area that shows you how the shower fittings work with water. Would recommend!",
  },
  {
    id: 5,
    name: "Navanita A",
    tagline: "Customer",
    body: "Excellent service from the moment I stepped into the showroom to delivery of items. Nick is a master salesman - honest, informative and not pushy. Good range of bathroom items and ceiling fans at reasonable prices. I recommend them highly.",
  },
  {
    id: 6,
    name: "Siti Zulaikha",
    tagline: "Customer",
    body: "We happened to come across the company on social media and decided to drop by. We ended up purchasing a few items for our home. The customer service was extremely friendly, and I highly recommend them.",
  },
  {
    id: 7,
    name: "Estelle Soh",
    tagline: "Customer",
    body: "I was served by Suki for my bathroom essentials. She was very patient and kind to me, offering advices and alternatives that catered to my wants and needs. The whole experience honestly was comfortable and not pushy. I could take my time and decide and she showed no ounce of impatience with me and my child. Thank you Suki and your team, really appreciate the support and kindness shown to us.",
  },
  {
    id: 8,
    name: "Nurafidah Kamsani",
    tagline: "Customer",
    body: "Kris was very helpful and patient. He clarified all our doubts and even climbed up a chair to demonstrate how to do the upkeep. This is not our first time here and will keep coming back!",
  },
  {
    id: 9,
    name: "Dennis Yeo",
    tagline: "Customer",
    body: "They have a wide range of products and the staff Suki was very patient and friendly offered great service to us with regards to the style of dining table we wanted",
  },
];

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0); 
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Total dots to show (5 as per the new image)
  const totalDots = 5;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      
      let scrollTo;
      if (direction === "left") {
        scrollTo = scrollLeft - clientWidth;
        if (scrollTo < -10) scrollTo = scrollWidth;
      } else {
        scrollTo = scrollLeft + clientWidth;
        if (scrollLeft + clientWidth + 50 >= scrollWidth) {
           scrollTo = 0;
        }
      }

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      
      // Calculate active dot index (0 to 4)
      const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
      const dotIndex = Math.min(Math.round(scrollPercentage * (totalDots - 1)), totalDots - 1);
      
      if (dotIndex !== activeIndex) {
        setActiveIndex(dotIndex);
      }
    }
  };

  // Autoscroll logic
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      scroll("right");
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, activeIndex]);

  return (
    <section className="bg-[#F8F5EA] py-32 px-6 md:px-12 lg:px-24 overflow-hidden relative">
      <div className="max-w-8xl mx-auto">
        
        {/* Header - Centered as per new design */}
        <div className="flex flex-col items-center text-center mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-3xl md:text-4xl font-michroma font-bold text-[#2C3E50] tracking-wider uppercase">
              Testimonials
            </h1>
            <p className="text-[#2C3E50]/70 font-be-vietnam text-sm md:text-base max-w-xl">
              What our customers say about us.
            </p>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative group touch-pan-x"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex space-x-6 md:space-x-8 overflow-x-auto scrollbar-hide pb-20 snap-x snap-mandatory scroll-smooth"
          >
            {testimonials.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1 }}
                className="flex-shrink-0 w-[82%] md:w-[48%] lg:w-[32%] snap-center md:snap-start"
              >
                <div className="bg-white rounded-xl p-8 lg:p-6 xl:p-12 h-full border border-[#2c3e50]/5 shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col space-y-10 min-h-[400px]">
                  <div className="flex items-center space-x-6">
                    <div className="bg-[#2c3e50]/5 p-3 rounded-full border border-[#2c3e50]/10">
                      <UserCircle className="w-10 h-10 xl:w-14 xl:h-14 text-[#2c3e50]/40" strokeWidth={0.8} />
                    </div>
                    <div>
                      <h4 className="text-base lg:text-sm xl:text-base font-bold font-michroma text-[#2c3e50] tracking-wider uppercase">
                        {item.name}
                      </h4>
                      <p className="text-[#2c3e50]/60 font-be-vietnam text-[11px] uppercase tracking-[0.25em] mt-1.5 font-medium">
                        {item.tagline}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative">
                     <span className="absolute -top-4 -left-2 text-6xl text-[#2c3e50]/5 font-serif opacity-50">"</span>
                     <p className="text-[#2c3e50]/80 font-be-vietnam text-[15px] leading-relaxed relative z-10">
                       {item.body}
                     </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination Dots (5 Dots as per image) */}
        <div className="flex justify-center items-center space-x-2">
           {[...Array(totalDots)].map((_, i) => (
              <button
                key={i}
                onClick={() => {
                   if(scrollRef.current) {
                      const { scrollWidth, clientWidth } = scrollRef.current;
                      const targetX = i * (scrollWidth / totalDots);
                      scrollRef.current.scrollTo({ left: targetX, behavior: "smooth" });
                   }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-500 ease-in-out ${
                  activeIndex === i 
                    ? "bg-[#2c3e50] scale-125 shadow-md" 
                    : "bg-[#2c3e50]/20 hover:bg-[#2c3e50]/40"
                }`}
              />
           ))}
        </div>
      </div>
    </section>
  );
}

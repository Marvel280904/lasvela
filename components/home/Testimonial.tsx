"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { UserCircle, ArrowLeft, ArrowRight } from "lucide-react";

// Dummy Data
const testimonials = [
  {
    id: 1,
    name: "SARAH JENKINS",
    tagline: "Interior Designer",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: 2,
    name: "MICHAEL CHEN",
    tagline: "Homeowner",
    body: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.",
  },
  {
    id: 3,
    name: "EMMA ROBERTS",
    tagline: "Architect",
    body: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.",
  },
  {
    id: 4,
    name: "DAVID WILSON",
    tagline: "Real Estate Agent",
    body: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe.",
  },
  {
    id: 5,
    name: "OLIVIA TAYLOR",
    tagline: "Business Owner",
    body: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
  },
  {
    id: 6,
    name: "JAMES ANDERSON",
    tagline: "Photographer",
    body: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words.",
  },
  {
    id: 7,
    name: "SOPHIA MARTINEZ",
    tagline: "Art Director",
    body: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure.",
  },
  {
    id: 8,
    name: "WILLIAM GARCIA",
    tagline: "Hospitality Executive",
    body: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions by H. Rackham.",
  },
  {
    id: 9,
    name: "ISABELLA LEE",
    tagline: "Lifestyle Blogger",
    body: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'.",
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
    }, 5000);

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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
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

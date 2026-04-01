"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useMotionValue, useSpring } from "framer-motion";
import { UserCircle } from "lucide-react";

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
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine items visible based on screen size
  // Simple hack: 3 on desktop, 1 on mobile
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    return window.innerWidth < 768 ? 1 : 3;
  };

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section className="bg-[#F8F5EA] py-32 px-6 md:px-12 lg:px-24 overflow-hidden relative">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-michroma font-bold text-[#2c3e50] mb-6">
            Testimonials
          </h2>
          <p className="text-[#2c3e50] font-be-vietnam text-sm md:text-base">
            What our customers say about us.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            animate={{ x: `-${index * (100 / getVisibleCount())}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.x < -100) nextSlide();
              else if (offset.x > 100) setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
            }}
            className="flex"
          >
            {testimonials.map((item) => (
              <div 
                key={item.id} 
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
              >
                <div className="bg-white rounded-2xl p-10 h-full border border-[#2c3e50]/5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col space-y-8">
                  <div className="flex items-center space-x-5">
                    <div className="bg-[#2c3e50]/5 p-2 rounded-full">
                      <UserCircle className="w-12 h-12 text-[#2c3e50]/40" strokeWidth={1} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-michroma text-[#2c3e50] tracking-wider uppercase">
                        {item.name}
                      </h4>
                      <p className="text-[#2c3e50]/60 font-be-vietnam text-[10px] uppercase tracking-[0.2em] mt-1">
                        {item.tagline}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-[#2c3e50]/80 font-be-vietnam text-sm leading-relaxed flex-1">
                    "{item.body}"
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center items-center space-x-3 mt-16">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === i 
                  ? "bg-[#2c3e50] w-8 shadow-md" 
                  : "bg-[#2c3e50]/15 w-1.5 hover:bg-[#2c3e50]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

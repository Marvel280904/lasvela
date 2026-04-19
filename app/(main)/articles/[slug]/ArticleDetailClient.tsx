"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface SimpleArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnailImage: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
}

interface ArticleDetailClientProps {
  article: SimpleArticle;
  latestArticles: SimpleArticle[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function ArticleDetailClient({ article, latestArticles }: ArticleDetailClientProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Create a tripled list for infinite loop effect
  const [infiniteArticles, setInfiniteArticles] = useState<SimpleArticle[]>([]);

  useEffect(() => {
    if (latestArticles.length > 0) {
      setInfiniteArticles([...latestArticles, ...latestArticles, ...latestArticles]);
    }
  }, [latestArticles]);

  // Set initial scroll position to the middle section
  useEffect(() => {
    if (scrollRef.current && infiniteArticles.length > 0) {
      const cardWidth = 400 + 32; // card + gap
      scrollRef.current.scrollLeft = cardWidth * latestArticles.length;
    }
  }, [infiniteArticles, latestArticles.length]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 432; // Approximate width of one card (400px) + gap (32px)
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollJump = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const cardWidth = 432;
      const setWidth = cardWidth * latestArticles.length;

      // If we scroll too far left, jump to the middle section
      if (scrollLeft < cardWidth) {
        scrollRef.current.scrollLeft += setWidth;
      } 
      // If we scroll too far right, jump back to the middle section
      else if (scrollLeft + clientWidth > scrollWidth - cardWidth) {
        scrollRef.current.scrollLeft -= setWidth;
      }
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const getExcerpt = (art: SimpleArticle) => {
    if (art.excerpt) return art.excerpt;
    if (!art.content) return "";
    return art.content.replace(/<[^>]+>/g, '').substring(0, 100) + '...';
  };

  return (
    <div className="min-h-screen bg-[#FCF9EE] pt-24 md:pt-32 pb-4">
      <div className="max-w-8xl mx-auto px-6 md:px-12 xl:px-24">
        
        {/* Back Button */}
        <Link href="/articles">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-[#2C3E50]/70 hover:text-[#2C3E50] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back
          </motion.button>
        </Link>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center"
        >
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-michroma text-[#2C3E50] leading-tight mb-10 max-w-5xl">
            {article.title}
          </h1>

          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                <User className="w-6 h-6" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs text-gray-400 uppercase tracking-widest font-michroma">Author</span>
                <span className="text-[15px] font-bold text-[#2C3E50] font-be-vietnam">{article.author || "Essen Team"}</span>
              </div>
            </div>
            
            <div className="h-10 w-px bg-gray-300 hidden sm:block"></div>

            <div className="flex flex-col text-left">
              <span className="text-xs text-gray-400 uppercase tracking-widest font-michroma">Published</span>
              <span className="text-[15px] font-bold text-[#2C3E50] font-be-vietnam">{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full aspect-[16/9] mb-12 rounded-xl overflow-hidden shadow-2xl"
        >
          <img 
            src={article.thumbnailImage || '/placeholderarticle.jpg'} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-lg mx-auto text-[#2C3E50] font-be-vietnam leading-[1.8] mb-24"
        >
          <div 
            dangerouslySetInnerHTML={{ __html: article.content }} 
            className="article-content"
          />
        </motion.div>
      </div>

      {/* Recommended Articles Carousel Section */}
      {latestArticles.length > 0 && (
        <div className="bg-[#FCF9EE] pt-10 pb-20 overflow-hidden">
          <div className="max-w-8xl mx-auto px-6 md:px-12 xl:px-24">
            
            {/* Carousel Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8 border-t border-gray-400 pt-10">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-4xl font-michroma text-[#2C3E50] mb-4 leading-tight">
                  Read Our Next Article
                </h2>
                <p className="text-gray-500 font-be-vietnam text-sm md:text-base leading-relaxed">
                  Ideas, inspiration, and insights about furniture, interior design, and modern living.
                </p>
              </div>
              
              {/* Navigation Arrows */}
              <div className="flex gap-4 w-full justify-center md:w-auto md:justify-end">
                <button 
                  onClick={() => handleScroll('left')}
                  className="w-12 h-12 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-[#2C3E50] hover:text-white transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => handleScroll('right')}
                  className="w-12 h-12 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-[#2C3E50] hover:text-white transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div 
              ref={scrollRef}
              onScroll={handleScrollJump}
              className="flex gap-5 md:gap-8 overflow-x-auto scroll-smooth scrollbar-hide pb-8 px-2"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {infiniteArticles.map((art, idx) => (
                <div 
                  key={`${art.id}-${idx}`} 
                  className="flex-shrink-0 w-[75vw] md:w-[400px] scroll-snap-align-start"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="bg-white rounded-2xl shadow-[0_4px_20px_-5px_rgba(44,62,80,0.1)] border border-gray-100 overflow-hidden flex flex-col h-full min-h-[460px] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                    <div className="relative h-[220px] w-full overflow-hidden">
                      <img 
                        src={art.thumbnailImage || '/placeholder.jpg'} 
                        alt={art.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6 lg:p-4 xl:p-6 flex flex-col flex-1">
                      <h3 className="text-[#2C3E50] font-michroma uppercase text-[16px] mb-3 line-clamp-2 leading-snug h-[3rem]">
                        {art.title}
                      </h3>
                      <p className="text-gray-500 font-be-vietnam text-[13px] mb-6 line-clamp-3 leading-relaxed">
                        {getExcerpt(art)}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                        <div className="flex items-center text-sm text-[#2C3E50]/70 font-be-vietnam">
                          <Clock className="w-5 h-5 mr-2 text-gray-400" />
                          <span>{formatDate(art.publishedAt)}</span>
                        </div>
                        <Link 
                          href={`/articles/${art.slug}`} 
                          className="bg-[#324558] font-be-vietnam text-white px-5 py-3 text-[11px] font-bold uppercase tracking-wider shadow-sm rounded hover:bg-[#1a252f] transition-all flex items-center gap-2 hover:gap-3"
                        >
                          Read <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

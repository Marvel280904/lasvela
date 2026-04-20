"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import apiClient from "@/lib/axiosClient";

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnailImage: string;
  images?: string[] | null;
  tags: string[];
  updatedAt: string;
  publishedAt: string;
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

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await apiClient.get("/api/articles?limit=100");
        
        if (response.data?.success && response.data?.data) {
          const sorted = response.data.data.sort((a: Article, b: Article) => 
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
          setArticles(sorted);
        }
      } catch (error) {
        console.error("Failed to fetch articles", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const filteredArticles = articles.filter((article) => {
    const lowerSearch = search.toLowerCase();
    const titleMatch = article.title?.toLowerCase().includes(lowerSearch) || false;
    const tagMatch = article.tags?.some((tag) => tag.toLowerCase().includes(lowerSearch)) || false;
    return titleMatch || tagMatch;
  });

  const isSearching = search.trim().length > 0;
  
  // If searching, show all in grid. If not, show top 4 as featured.
  const topArticles = isSearching ? [] : filteredArticles.slice(0, 4);
  const gridArticles = isSearching ? filteredArticles : filteredArticles.slice(4);

  const totalPages = Math.ceil(gridArticles.length / ITEMS_PER_PAGE);
  const currentGridArticles = gridArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const getExcerpt = (article: Article) => {
     if (article.excerpt) return article.excerpt;
     if (!article.content) return "";
     return article.content.replace(/<[^>]+>/g, '').substring(0, 100) + '...';
  };

  const getDisplayImage = (article: Article) => {
    if (article.images && article.images.length > 0) {
      return article.images[0];
    }
    return article.thumbnailImage || '/placeholder.jpg';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FCF9EE] flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2C3E50]"
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF9EE] pt-24 md:pt-30 pb-16">
      <div className="max-w-8xl mx-auto px-6 md:px-12 xl:px-24">
        
        {/* Search Input */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-8 md:mb-12"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full bg-[#EBE9E3] rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-1 focus:ring-[#2C3E50] text-[#2C3E50] placeholder-gray-500 font-be-vietnam transition-all duration-300 border border-transparent focus:border-gray-300"
          />
        </motion.div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h1 className="text-xl md:text-4xl tracking-wide text-[#2C3E50] mb-2 font-michroma leading-tight">
            Our Insightfull Articles
          </h1>
          <p className="text-gray-600 font-be-vietnam text-xs md:text-base">
            Ideas, inspiration, and insights about furniture, interior design, and modern living.
          </p>
        </motion.div>

        {/* Top 4 Articles Section - ONLY shown when NOT searching */}
        {!isSearching && topArticles.length > 0 && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 h-auto lg:h-[480px]"
          >
            {/* Main Featured Article (Left) */}
            <motion.div variants={itemVariants} className="lg:col-span-6 relative h-[400px] lg:h-full rounded-lg overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-500">
              <img 
                src={getDisplayImage(topArticles[0])} 
                alt={topArticles[0].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50]/90 via-[#2C3E50]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                <h2 className="text-xl md:text-2xl font-michroma uppercase mb-3 line-clamp-1">
                  {topArticles[0].title}
                </h2>
                <p className="font-be-vietnam text-sm md:text-[15px] text-gray-200 mb-6 line-clamp-2 leading-relaxed h-[3rem]">
                  {getExcerpt(topArticles[0])}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm font-be-vietnam text-gray-300">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{formatDate(topArticles[0].updatedAt)}</span>
                  </div>
                  <Link 
                    href={`/articles/${topArticles[0].slug}`} 
                    className="bg-white font-be-vietnam text-black px-6 py-2.5 flex items-center gap-2 text-[13px] font-bold rounded shadow-sm hover:bg-gray-100 transition-colors uppercase tracking-wider"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Sub Featured Articles (Right) */}
            <motion.div variants={containerVariants} className="lg:col-span-6 flex flex-col gap-6 h-full">
              {topArticles.slice(1, 4).map((article) => (
                <motion.div variants={itemVariants} key={article.id} className="flex bg-transparent overflow-hidden h-auto lg:h-[calc((480px-3rem)/3)] group rounded-xl">
                  <div className="w-[40%] md:w-[35%] lg:w-[40%] relative min-h-[140px] overflow-hidden">
                    <img 
                      src={getDisplayImage(article)} 
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="w-[60%] md:w-[65%] lg:w-[60%] pl-5 flex flex-col justify-center">
                    <h3 className="text-[#2C3E50] font-michroma uppercase text-[15px] mb-2 line-clamp-1 group-hover:text-blue-900 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 font-be-vietnam text-xs lg:text-[13px] mb-3 line-clamp-2 leading-relaxed">
                      {getExcerpt(article)}
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center text-[11px] lg:text-xs text-[#2C3E50]/70 font-be-vietnam mb-3">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        <span>{formatDate(article.updatedAt)}</span>
                      </div>
                      <Link 
                        href={`/articles/${article.slug}`} 
                        className="inline-flex bg-[#324558] font-be-vietnam text-white px-5 py-2 text-[11px] font-bold tracking-wider uppercase shadow-sm rounded hover:bg-[#1a252f] transition-colors items-center gap-2"
                      >
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Grid Articles Section - Shown for all search results OR remaining articles */}
        <AnimatePresence mode="wait">
          {gridArticles.length > 0 ? (
            <motion.div 
              key={isSearching ? "search-results" : "remaining-articles"}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            > 
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
                {currentGridArticles.map((article) => (
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    key={article.id} 
                    className="bg-white rounded-2xl shadow-[0_4px_20px_-5px_rgba(44,62,80,0.1)] border border-gray-100 overflow-hidden flex flex-col h-full min-h-[420px] transition-shadow duration-300 hover:shadow-xl"
                  >
                    <div className="relative h-[220px] w-full overflow-hidden group">
                      <img 
                        src={getDisplayImage(article)} 
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6 lg:p-4 xl:p-6 flex flex-col flex-1">
                      <h3 className="text-[#2C3E50] font-michroma uppercase text-[16px] mb-3 line-clamp-2 leading-snug h-[3rem]">
                        {article.title}
                      </h3>
                      <p className="text-gray-500 font-be-vietnam text-[14px] mb-6 line-clamp-3 leading-relaxed">
                        {getExcerpt(article)}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                        <div className="flex items-center text-sm text-[#2C3E50]/70 font-be-vietnam">
                          <Clock className="w-5 h-5 mr-2 text-gray-400" />
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                        <Link 
                          href={`/articles/${article.slug}`} 
                          className="bg-[#324558] font-be-vietnam text-white px-5 py-3 text-[11px] font-bold uppercase tracking-wider shadow-sm rounded hover:bg-[#1a252f] transition-all flex items-center gap-2 hover:gap-3"
                        >
                          Read <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <motion.div 
                  variants={itemVariants}
                  className="flex justify-center items-center space-x-2 font-be-vietnam pt-8"
                >
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-xl disabled:opacity-30 text-gray-400 hover:text-[#2C3E50] transition-all border border-transparent hover:border-gray-500"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl text-[15px] font-bold transition-all ${
                        currentPage === page 
                          ? 'bg-[#324558] text-white shadow-lg' 
                          : 'bg-transparent border border-gray-500 text-gray-500 hover:border-[#324558]/80 hover:shadow-md'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-xl disabled:opacity-30 text-gray-400 hover:text-[#2C3E50] transition-all border border-transparent hover:border-gray-500"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 text-gray-500 font-be-vietnam"
            >
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-lg">No articles found matching "{search}"</p>
              <button 
                onClick={() => setSearch("")}
                className="mt-4 text-[#324558] font-bold underline hover:text-[#1a252f]"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </div>
  );
}

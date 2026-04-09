"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import apiClient from "@/lib/axiosClient";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryFilterProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategories: string[]; // array of category slugs or names
  onApply: (categories: string[]) => void;
}

export function CategoryFilter({ isOpen, onClose, selectedCategories, onApply }: CategoryFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [localSelected, setLocalSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Sync state whenever sidebar is opened
  useEffect(() => {
    if (isOpen) {
      setLocalSelected([...selectedCategories]);
      // Prevent scrolling on body when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, selectedCategories]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/api/categories');
        if (response.data?.success && Array.isArray(response.data.data)) {
           setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  const toggleCategory = (categoryName: string) => {
    setLocalSelected(prev => {
      if (prev.includes(categoryName)) {
        return prev.filter(c => c !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  };

  const handleClear = () => {
    setLocalSelected([]);
  };

  const handleApply = () => {
    onApply(localSelected);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          />

          {/* Right Sidebar Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-80 sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header & Close Button */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <h2 className="text-xl font-michroma text-[#2C3E50]">Filter Categories</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-800 transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-40 space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin text-[#2C3E50]/50" />
                  <p className="text-sm font-be-vietnam text-gray-400">Loading categories...</p>
                </div>
              ) : categories.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-sm font-be-vietnam text-gray-500">No categories found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-400 font-be-vietnam mb-4">Select all applicable categories:</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => {
                      const isSelected = localSelected.includes(cat.name);
                      return (
                        <button
                          key={cat.id}
                          onClick={() => toggleCategory(cat.name)}
                          className={`
                            px-4 py-2 border rounded-full text-xs font-be-vietnam tracking-wide transition-all duration-200
                            ${isSelected 
                              ? 'bg-[#2C3E50] border-[#2C3E50] text-[#F8F5EA] shadow-md' 
                              : 'bg-transparent border-gray-300 text-gray-600 hover:border-[#2C3E50] hover:text-[#2C3E50]'
                            }
                          `}
                        >
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
              <button
                onClick={handleClear}
                className="flex-1 py-3 px-4 border border-[#2C3E50] text-[#2C3E50] font-be-vietnam text-xs font-semibold tracking-wider hover:bg-[#2C3E50]/5 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleApply}
                className="flex-1 py-3 px-4 bg-[#2C3E50] text-white font-be-vietnam text-xs font-semibold tracking-wider hover:bg-[#34495e] transition-colors shadow-lg"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

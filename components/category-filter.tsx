"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Loader2, 
  ChevronDown, 
  ChevronRight
} from "lucide-react";
import apiClient from "@/lib/axiosClient";

interface ChildCategory {
  id: string;
  name: string;
  slug: string;
}

interface ParentCategory {
  id: string;
  name: string;
  slug: string;
  children: ChildCategory[];
}

interface CategoryFilterProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategories: string[]; // array of category slugs or names
  onApply: (categories: string[]) => void;
}

export function CategoryFilter({ isOpen, onClose, selectedCategories, onApply }: CategoryFilterProps) {
  const [parentCategories, setParentCategories] = useState<ParentCategory[]>([]);
  const [localSelected, setLocalSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedRooms, setExpandedRooms] = useState<string[]>([]);

  const toggleRoom = (roomId: string) => {
    setExpandedRooms(prev => 
      prev.includes(roomId) ? prev.filter(id => id !== roomId) : [...prev, roomId]
    );
  };

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

  // Fetch categories from API tree
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/api/parent-categories/tree');
        if (response.data?.success && Array.isArray(response.data.data)) {
           const treeData = response.data.data;
           setParentCategories(treeData);
           // Expand all by default initially
           setExpandedRooms(treeData.map((p: ParentCategory) => p.id));
        }
      } catch (error) {
        console.error("Failed to fetch tree categories:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (isOpen) {
        fetchCategories();
    }
  }, [isOpen]);

  const toggleCategory = (categoryName: string) => {
    setLocalSelected(prev => {
      const lowerName = categoryName.toLowerCase();
      const existing = prev.find(c => c.toLowerCase() === lowerName);
      
      if (existing) {
        return prev.filter(c => c.toLowerCase() !== lowerName);
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
            className="fixed inset-y-0 right-0 w-80 sm:w-120 bg-white shadow-2xl z-50 flex flex-col"
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
              ) : parentCategories.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-sm font-be-vietnam text-gray-500">No categories found</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {parentCategories.map((parent) => {
                    const isExpanded = expandedRooms.includes(parent.id);
                    
                    return (
                      <div key={parent.id} className="space-y-4">
                        {/* Parent Header */}
                        <div 
                          onClick={() => toggleRoom(parent.id)}
                          className="flex items-center justify-between cursor-pointer group border-b border-gray-100 pb-3"
                        >
                          <div className="flex items-center gap-3 text-[#2C3E50]">
                            <h3 className="text-lg md:text-xl font-michroma tracking-tight uppercase">
                              {parent.name}
                            </h3>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown size={20} className="text-gray-400" />
                          </motion.div>
                        </div>

                        {/* Children Categories */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-wrap gap-2.5 pt-1 pb-2">
                                {parent.children.map((child) => {
                                  const isSelected = localSelected.some(c => c.toLowerCase() === child.name.toLowerCase());
                                  return (
                                    <button
                                      key={child.id}
                                      onClick={() => toggleCategory(child.name)}
                                      className={`
                                        px-5 py-2.5 border rounded text-xs font-be-vietnam uppercase tracking-widest transition-all duration-300
                                        ${isSelected 
                                          ? 'bg-[#2C3E50] border-[#2C3E50] text-[#F8F5EA] shadow-lg scale-[1.02]' 
                                          : 'bg-white border-gray-200 text-gray-600 hover:border-[#2C3E50] hover:text-[#2C3E50] hover:shadow-sm'
                                        }
                                      `}
                                    >
                                      {child.name}
                                    </button>
                                  );
                                })}
                                {parent.children.length === 0 && (
                                  <p className="text-xs text-gray-400 italic font-be-vietnam">No sub-categories available</p>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
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

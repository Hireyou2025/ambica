"use client";

import React, { useState, useMemo } from "react";
import { Eye, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  size: "small" | "large" | "medium"; // For grid layout variation
}

const categories = ["All", "Interior", "Signature Dishes", "Biryanis", "Customer Experience"];

const items: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Royal Suite Private Dining Room",
    category: "Interior",
    image: "/images/private_dining.png",
    size: "large",
  },
  {
    id: "gal-2",
    title: "Signature Lobster Dum Biryani",
    category: "Biryanis",
    image: "/images/lobster_biryani.png",
    size: "medium",
  },
  {
    id: "gal-3",
    title: "Luxury Main Dining Lounge",
    category: "Interior",
    image: "/images/restaurant_interior.png",
    size: "medium",
  },
  {
    id: "gal-4",
    title: "Coastal Andhra Seafood Platter",
    category: "Signature Dishes",
    image: "/images/seafood_platter.png",
    size: "large",
  },
  {
    id: "gal-5",
    title: "Gold-Leaf Themed Table Setting",
    category: "Interior",
    image: "/images/restaurant_interior.png",
    size: "small",
  },
  {
    id: "gal-6",
    title: "Chettinad Spicy Tangdi Dum Biryani",
    category: "Biryanis",
    image: "/images/lobster_biryani.png",
    size: "small",
  },
  {
    id: "gal-7",
    title: "Private Anniversary Celebration",
    category: "Customer Experience",
    image: "/images/private_dining.png",
    size: "medium",
  },
  {
    id: "gal-8",
    title: "Family Dinner Platters",
    category: "Customer Experience",
    image: "/images/seafood_platter.png",
    size: "medium",
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="gallery" className="py-24 bg-dark-bg transition-colors duration-500 html.light:bg-light-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-gold-500 text-xs sm:text-sm font-bold tracking-widest uppercase block">
            Visual Tour
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-playfair text-white leading-tight">
            Reeves <span className="gold-text-gradient">Photo Gallery</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
        </div>

        {/* Categories Tab selector */}
        <div className="flex overflow-x-auto justify-start md:justify-center pb-4 mb-12 gap-2 scrollbar-none snap-x">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-300 snap-center cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gold-500 text-dark-bg shadow-md shadow-gold-500/10"
                  : "bg-dark-surface border border-gold-500/5 text-text-muted hover:text-gold-500 hover:border-gold-500/20 html.light:bg-white html.light:border-light-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[200px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`relative rounded-2xl overflow-hidden group border border-gold-500/10 cursor-pointer shadow-lg html.light:border-light-border ${
                  item.size === "large"
                    ? "md:col-span-2 md:row-span-2"
                    : item.size === "medium"
                    ? "md:row-span-2"
                    : ""
                }`}
              >
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />

                {/* Glassy Hover Mask */}
                <div className="absolute inset-0 bg-dark-bg/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
                    <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-dark-bg shadow-lg">
                      <Eye className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] text-gold-500 uppercase tracking-widest font-extrabold">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-white font-playfair leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
                
                {/* Simple overlay tag when not hovered */}
                <div className="absolute top-4 right-4 bg-dark-bg/80 backdrop-blur-md border border-gold-500/20 text-gold-500 text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider group-hover:opacity-0 transition-opacity">
                  <span className="flex items-center gap-1">
                    <ImageIcon className="h-3 w-3" />
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}

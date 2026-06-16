"use client";

import React, { useState, useMemo } from "react";
import { Search, Flame, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  tag?: string;
  rating: number;
  isSpicy?: boolean;
  isVeg: boolean;
}

const categories = [
  "All",
  "Starters",
  "Soups",
  "Vegetarian Specials",
  "Chicken Specials",
  "Mutton Specials",
  "Seafood Specials",
  "Biryanis",
  "Tandoori Specials",
  "Chinese Cuisine",
  "Desserts",
  "Beverages",
];

const menuItems: MenuItem[] = [
  // Starters
  {
    id: "menu-1",
    name: "Paneer Tikka Multi-Spiced",
    category: "Starters",
    description: "Fresh cottage cheese cubes marinated in yogurt and hand-pounded spices, charred in the clay oven.",
    price: 240,
    image: "/images/seafood_platter.png",
    tag: "Best Seller",
    rating: 4.7,
    isVeg: true,
  },
  {
    id: "menu-2",
    name: "Guntur Chicken Fry",
    category: "Starters",
    description: "Crispy fried chicken tossed with caramelized onions, curry leaves, and spicy red chillies from Guntur.",
    price: 320,
    image: "/images/seafood_platter.png",
    tag: "Spicy Local",
    rating: 4.8,
    isSpicy: true,
    isVeg: false,
  },
  // Soups
  {
    id: "menu-3",
    name: "Lemon Coriander Soup",
    category: "Soups",
    description: "A refreshing clear soup infused with fresh coriander and tangy lemon juice, spiked with white pepper.",
    price: 160,
    image: "/images/seafood_platter.png",
    rating: 4.5,
    isVeg: true,
  },
  {
    id: "menu-4",
    name: "Hot & Sour Chicken Soup",
    category: "Soups",
    description: "Classic Chinese hot and sour thick broth with shredded chicken, bamboo shoots, and mushrooms.",
    price: 180,
    image: "/images/seafood_platter.png",
    rating: 4.6,
    isVeg: false,
  },
  // Vegetarian Specials
  {
    id: "menu-5",
    name: "Paneer Butter Masala",
    category: "Vegetarian Specials",
    description: "Cubes of paneer cooked in a rich, creamy tomato and butter gravy with fragrant kasuri methi.",
    price: 280,
    image: "/images/seafood_platter.png",
    tag: "Chef Recommended",
    rating: 4.8,
    isVeg: true,
  },
  {
    id: "menu-6",
    name: "Andhra Tomato Pappu",
    category: "Vegetarian Specials",
    description: "Yellow lentils tempered with ghee, garlic, red chillies, and fresh local tangy tomatoes.",
    price: 220,
    image: "/images/seafood_platter.png",
    rating: 4.7,
    isVeg: true,
  },
  // Chicken Specials
  {
    id: "menu-7",
    name: "Reeves Butter Chicken",
    category: "Chicken Specials",
    description: "Clay-oven grilled chicken tikka folded into a luscious rich tomato gravy finished with fresh cream.",
    price: 340,
    image: "/images/seafood_platter.png",
    tag: "Popular",
    rating: 4.9,
    isVeg: false,
  },
  {
    id: "menu-8",
    name: "Chicken Dum Ka Curry",
    category: "Chicken Specials",
    description: "Chicken slow-cooked on dum in a rich gravy of nuts, caramelized onions, and yogurt.",
    price: 320,
    image: "/images/seafood_platter.png",
    rating: 4.6,
    isVeg: false,
  },
  // Mutton Specials
  {
    id: "menu-9",
    name: "Mutton Rogan Josh",
    category: "Mutton Specials",
    description: "Tender pieces of baby lamb cooked in a rich onion and tomato sauce flavored with Kashmiri chillies.",
    price: 460,
    image: "/images/seafood_platter.png",
    tag: "Chef Special",
    rating: 4.9,
    isVeg: false,
  },
  {
    id: "menu-10",
    name: "Gongura Mutton Curry",
    category: "Mutton Specials",
    description: "Traditional Andhra dish featuring tender mutton cooked with tangy sorrel (gongura) leaves and local spices.",
    price: 480,
    image: "/images/seafood_platter.png",
    rating: 4.8,
    isSpicy: true,
    isVeg: false,
  },
  // Seafood Specials
  {
    id: "menu-11",
    name: "Nellore Chepala Pulusu",
    category: "Seafood Specials",
    description: "Tangy Andhra fish curry cooked in wood-pressed oils with local tamarind and raw mangoes.",
    price: 440,
    image: "/images/seafood_platter.png",
    tag: "Spicy Local",
    rating: 4.9,
    isSpicy: true,
    isVeg: false,
  },
  {
    id: "menu-12",
    name: "Konaseema Prawns Iguru",
    category: "Seafood Specials",
    description: "Juicy prawns slow-roasted with green chillies, grated coconut, and Konaseema garam masala.",
    price: 420,
    image: "/images/seafood_platter.png",
    tag: "Best Seller",
    rating: 4.8,
    isSpicy: true,
    isVeg: false,
  },
  // Biryanis
  {
    id: "spec-1",
    name: "Signature Lobster Dum Biryani",
    category: "Biryanis",
    description: "Whole fresh lobster cooked in dum with premium fragrant basmati rice, layered with saffron, ghee, and secret spices.",
    price: 1299,
    image: "/images/lobster_biryani.png",
    tag: "Signature Dish",
    rating: 5.0,
    isSpicy: true,
    isVeg: false,
  },
  {
    id: "menu-13",
    name: "Reeves Special Chicken Biryani",
    category: "Biryanis",
    description: "Our legendary double masala chicken biryani made with long-grain basmati, layered and slow cooked.",
    price: 360,
    image: "/images/lobster_biryani.png",
    tag: "Must Try",
    rating: 4.9,
    isSpicy: true,
    isVeg: false,
  },
  {
    id: "menu-14",
    name: "Kaju Paneer Biryani",
    category: "Biryanis",
    description: "Rich basmati rice layered with crispy paneer cubes, cashews, and aromatic biryani herbs.",
    price: 310,
    image: "/images/lobster_biryani.png",
    rating: 4.7,
    isVeg: true,
  },
  // Tandoori Specials
  {
    id: "menu-15",
    name: "Tandoori Chicken (Half)",
    category: "Tandoori Specials",
    description: "Half chicken marinated in spiced yogurt and ginger-garlic paste, roasted over charcoal fire.",
    price: 320,
    image: "/images/seafood_platter.png",
    rating: 4.7,
    isVeg: false,
  },
  {
    id: "menu-16",
    name: "Garlic Hariyali Kebab",
    category: "Tandoori Specials",
    description: "Boneless chicken cubes marinated with fresh coriander, mint, garlic paste, and grilled to perfection.",
    price: 340,
    image: "/images/seafood_platter.png",
    rating: 4.8,
    isVeg: false,
  },
  // Chinese Cuisine
  {
    id: "menu-17",
    name: "Veg Hakka Noodles",
    category: "Chinese Cuisine",
    description: "Wok-tossed noodles with julienne bell peppers, cabbage, carrots, spring onions, and soy sauce.",
    price: 240,
    image: "/images/seafood_platter.png",
    rating: 4.4,
    isVeg: true,
  },
  {
    id: "menu-18",
    name: "Chilli Prawns Dry",
    category: "Chinese Cuisine",
    description: "Stir-fried crispy prawns with bell peppers, garlic, ginger, green chillies, and Chinese barbecue sauces.",
    price: 380,
    image: "/images/seafood_platter.png",
    rating: 4.6,
    isSpicy: true,
    isVeg: false,
  },
  // Desserts
  {
    id: "menu-19",
    name: "Double Ka Meetha",
    category: "Desserts",
    description: "Classic golden fried bread pudding cooked in sweetened milk infused with saffron and cardamom.",
    price: 150,
    image: "/images/seafood_platter.png",
    rating: 4.8,
    isVeg: true,
  },
  {
    id: "menu-20",
    name: "Apricot Delight",
    category: "Desserts",
    description: "Kakinada's favorite dessert. Pureed sweet dried apricots served over soft cake crumble and rich vanilla custard.",
    price: 180,
    image: "/images/seafood_platter.png",
    tag: "Best Seller",
    rating: 4.9,
    isVeg: true,
  },
  // Beverages
  {
    id: "menu-21",
    name: "Masala Chaas",
    category: "Beverages",
    description: "Chilled whipped buttermilk spiced with green chillies, ginger, mint, and roasted cumin powder.",
    price: 90,
    image: "/images/seafood_platter.png",
    rating: 4.6,
    isVeg: true,
  },
  {
    id: "menu-22",
    name: "Fresh Lime Soda",
    category: "Beverages",
    description: "Prepared with fresh lemon juice, simple syrup, soda water, and a pinch of black salt. Sweet or salted.",
    price: 80,
    image: "/images/seafood_platter.png",
    rating: 4.5,
    isVeg: true,
  },
];

export default function Menu() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering logic
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="menu" className="py-24 bg-dark-surface transition-colors duration-500 html.light:bg-light-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-gold-500 text-xs sm:text-sm font-bold tracking-widest uppercase block">
            Flavor Directory
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-playfair text-white leading-tight">
            Explore Our <span className="gold-text-gradient">Culinary Menu</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
        </div>

        {/* Filters and Search panel */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search for biryanis, starters, desserts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-dark-bg border border-gold-500/10 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm font-medium text-foreground transition-all html.light:bg-white html.light:border-light-border"
            />
          </div>

          {/* Veg indicator count helper */}
          <div className="flex gap-2 text-xs text-text-muted font-medium">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 text-green-500">
              <span className="h-2 w-2 rounded-full bg-green-500" /> Veg Specials
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/5 text-red-500">
              <span className="h-2 w-2 rounded-full bg-red-500" /> Non-Veg Delights
            </span>
          </div>
        </div>

        {/* Categories Tab list */}
        <div className="flex overflow-x-auto pb-4 mb-10 gap-2 scrollbar-none snap-x mask-gradient">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-300 snap-center cursor-pointer ${
                selectedCategory === cat
                  ? "bg-gold-500 text-dark-bg shadow-md shadow-gold-500/10"
                  : "bg-dark-bg border border-gold-500/5 text-text-muted hover:text-gold-500 hover:border-gold-500/20 html.light:bg-white html.light:border-light-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex gap-4 p-4 rounded-2xl bg-dark-surface border border-gold-500/5 hover:border-gold-500/20 transition-all duration-300 hover:shadow-xl html.light:bg-light-card html.light:border-light-border"
              >
                {/* Image */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gold-500/5 flex-shrink-0 relative border border-gold-500/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Veg / Non-Veg indicator icon */}
                  <span
                    className={`absolute top-2 left-2 w-4.5 h-4.5 rounded bg-white flex items-center justify-center border ${
                      item.isVeg ? "border-green-600" : "border-red-600"
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        item.isVeg ? "bg-green-600" : "bg-red-600"
                      }`}
                    />
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="space-y-1.5">
                    {/* Header line */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-sm sm:text-base font-playfair truncate text-white">
                        {item.name}
                      </h3>
                      {item.isSpicy && (
                        <Flame className="h-4 w-4 text-red-500 flex-shrink-0" />
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Tag if any */}
                    {item.tag && (
                      <span className="inline-block bg-gold-500/10 text-gold-500 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Pricing and cart add */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border-color">
                    <span className="font-extrabold text-gold-500 text-base">
                      ₹{item.price}
                    </span>

                    <button
                      onClick={() =>
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                        })
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 text-dark-bg hover:bg-gold-600 transition-colors focus:outline-none cursor-pointer"
                      aria-label={`Add ${item.name} to order`}
                    >
                      <Plus className="h-4.5 w-4.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 space-y-4">
            <ShoppingBag className="h-12 w-12 text-gold-500/30 mx-auto" />
            <h3 className="text-xl font-bold font-playfair text-white">No dishes found</h3>
            <p className="text-sm text-text-muted max-w-md mx-auto">
              We couldn&apos;t find any dishes matching &quot;{searchQuery}&quot; in our {selectedCategory} category. Try searching for other terms like &apos;Biryani&apos;, &apos;Prawns&apos;, or &apos;Paneer&apos;.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

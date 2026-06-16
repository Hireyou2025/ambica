"use client";

import React from "react";
import { Star, Plus, Flame } from "lucide-react";
import { useCart } from "./CartContext";
import { motion } from "framer-motion";

interface SpecialtyDish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag: string;
  rating: number;
  isSpicy?: boolean;
}

export default function Specialties() {
  const { addToCart } = useCart();

  const specialties: SpecialtyDish[] = [
    {
      id: "spec-1",
      name: "Signature Lobster Biryani",
      description: "Our crown jewel. Whole fresh lobster cooked in dum with premium fragrant basmati rice, layered with saffron, ghee, and secret spices.",
      price: 1299,
      image: "/images/lobster_biryani.png",
      tag: "Signature Dish",
      rating: 5,
      isSpicy: true,
    },
    {
      id: "spec-2",
      name: "Seafood Delicacies Platter",
      description: "An ultimate seafood thali with Nellore Nelluri chepala pulusu, golden prawns fry, tandoori crab, butter garlic squid, and steamed basmati.",
      price: 850,
      image: "/images/seafood_platter.png",
      tag: "Chef Recommendation",
      rating: 4.9,
    },
    {
      id: "spec-3",
      name: "Chettinad Tangdi Biryani",
      description: "Spiced chicken drumsticks marinated in freshly ground Chettinad masala, slow-dum cooked with fine grain biryani rice.",
      price: 480,
      image: "/images/lobster_biryani.png",
      tag: "Best Seller",
      rating: 4.8,
      isSpicy: true,
    },
    {
      id: "spec-4",
      name: "Special Family Platter",
      description: "A colossal assortment of our best kebabs, curries, butter naans, and biryani rice. Feeds 3-4 hungry diners comfortably.",
      price: 1190,
      image: "/images/seafood_platter.png",
      tag: "Family Dining",
      rating: 4.9,
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="specialties" className="py-24 bg-dark-bg transition-colors duration-500 html.light:bg-light-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-gold-500 text-xs sm:text-sm font-bold tracking-widest uppercase block">
            Signature Masterpieces
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-playfair text-white leading-tight">
            Featured <span className="gold-text-gradient">Specialties</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
          <p className="text-sm text-text-muted mt-4">
            Handpicked signature creations crafted by our Master Chefs. Taste the perfect marriage of authentic local traditions and modern culinary styling.
          </p>
        </div>

        {/* Grid of Dishes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialties.map((dish, index) => (
            <motion.div
              key={dish.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col h-full rounded-2xl overflow-hidden bg-dark-surface border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/5 hover:-translate-y-1 relative html.light:bg-light-card html.light:border-light-border"
            >
              {/* Dish Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gold-500/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Tag Overlay */}
                <span className="absolute top-4 left-4 bg-gold-500 text-dark-bg text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {dish.tag}
                </span>

                {/* Spicy Tag */}
                {dish.isSpicy && (
                  <span className="absolute top-4 right-4 bg-red-600 text-white p-1 rounded-full shadow-md" title="Spicy">
                    <Flame className="h-4 w-4 fill-current" />
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < Math.floor(dish.rating)
                            ? "text-gold-500 fill-current"
                            : "text-text-muted/30"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-text-muted font-semibold ml-1">
                      {dish.rating}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-bold font-playfair group-hover:text-gold-500 transition-colors text-white">
                    {dish.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                    {dish.description}
                  </p>
                </div>

                {/* Pricing and Action */}
                <div className="flex items-center justify-between pt-6 mt-4 border-t border-border-color">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-text-muted font-medium uppercase tracking-wider">Price</span>
                    <span className="text-lg font-extrabold text-gold-500">₹{dish.price}</span>
                  </div>
                  
                  <button
                    onClick={() => addToCart({ id: dish.id, name: dish.name, price: dish.price, image: dish.image })}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-dark-bg transition-all duration-300 hover:bg-gold-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold-500 cursor-pointer"
                    aria-label={`Add ${dish.name} to order`}
                  >
                    <Plus className="h-5 w-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

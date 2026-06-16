"use client";

import React from "react";
import { Star, Utensils, ShoppingBag, Menu, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-dark-bg">
      {/* Background with luxury parallax-like overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 12, 0.75), rgba(10, 10, 12, 0.95)), url('/images/restaurant_interior.png')`
        }}
      />

      {/* Decorative Gold Light leak */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-600/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center py-20 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 max-w-4xl mx-auto"
        >
          {/* Tagline Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-gold-500/30 text-gold-500 text-xs sm:text-sm font-semibold tracking-widest uppercase animate-float">
            <Star className="h-4.5 w-4.5 fill-current text-gold-500" />
            <span>{"Kakinada's"} Premier Culinary Landmark</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-playfair tracking-tight text-white leading-tight">
            Experience {"Kakinada's"} Favorite <br className="hidden sm:inline" />
            <span className="gold-text-gradient">Dining Destination</span>
          </motion.h1>

          {/* Telugu translation subheading */}
          <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl font-semibold tracking-wider text-gold-500/90 font-serif">
            రీవ్స్ రెస్టారెంట్ — ఆధునిక భారతీయ రుచులు
          </motion.h2>

          {/* Subheading */}
          <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            Serving exceptional Modern Indian cuisine with unforgettable flavors, luxury dining spaces, and award-winning hospitality.
          </motion.p>

          {/* Core Display Badges */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl border border-gold-500/10 bg-dark-surface/40 backdrop-blur-md flex flex-col justify-center items-center text-center">
              <span className="text-2xl font-bold text-gold-500 flex items-center gap-1">
                4.6 <Star className="h-5 w-5 fill-current text-gold-500 inline" />
              </span>
              <span className="text-xs text-text-muted mt-1">Google Rating</span>
            </div>
            
            <div className="p-4 rounded-xl border border-gold-500/10 bg-dark-surface/40 backdrop-blur-md flex flex-col justify-center items-center text-center">
              <span className="text-2xl font-bold text-white">7,460+</span>
              <span className="text-xs text-text-muted mt-1">Happy Reviews</span>
            </div>

            <div className="p-4 rounded-xl border border-gold-500/10 bg-dark-surface/40 backdrop-blur-md flex flex-col justify-center items-center text-center">
              <span className="text-2xl font-bold text-gold-500">Premium</span>
              <span className="text-xs text-text-muted mt-1">Dining Experience</span>
            </div>

            <div className="p-4 rounded-xl border border-gold-500/10 bg-dark-surface/40 backdrop-blur-md flex flex-col justify-center items-center text-center">
              <span className="text-2xl font-bold text-white">No. 1</span>
              <span className="text-xs text-text-muted mt-1">Biryani Destination</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <a
              href="#reservation"
              className="px-8 py-4 rounded-full bg-gold-500 text-dark-bg font-bold tracking-wider hover:bg-gold-600 transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-gold-500/20 flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <Utensils className="h-5 w-5" />
              Reserve Table
            </a>

            <a
              href="#menu"
              className="px-8 py-4 rounded-full bg-gold-500/10 border border-gold-500/40 text-gold-500 font-bold tracking-wider hover:bg-gold-500 hover:text-dark-bg transition-all duration-300 hover:scale-[1.03] flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <ShoppingBag className="h-5 w-5" />
              Order Online
            </a>

            <a
              href="#menu"
              className="px-6 py-4 rounded-full bg-transparent text-white font-semibold hover:text-gold-500 transition-colors flex items-center gap-2 text-sm"
            >
              <Menu className="h-5 w-5 text-gold-500" />
              View Menu
            </a>

            <a
              href="tel:+919160345681"
              className="px-6 py-4 rounded-full bg-transparent text-white font-semibold hover:text-gold-500 transition-colors flex items-center gap-2 text-sm"
            >
              <Phone className="h-4 w-4 text-gold-500" />
              Call Now
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Wave Divider at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] z-10 translate-y-[2px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-background transition-colors duration-500">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86C252.12,62.19,165.74,46,90.47,26.79,57.05,18.3,26.9,8.75,0,0V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" />
        </svg>
      </div>
    </section>
  );
}

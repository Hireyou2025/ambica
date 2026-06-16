"use client";

import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const features = [
    { title: "Premium Dining Experience", desc: "Enjoy our dark-gold upscale ambience tailored for the finest culinary pleasure." },
    { title: "Culinary Excellence", desc: "Authentic Indian recipes infused with modern gastronomical innovations by expert chefs." },
    { title: "Family-Friendly Atmosphere", desc: "Spacious seating layouts perfect for multi-generational family get-togethers." },
    { title: "Quality Ingredients", desc: "100% fresh, locally sourced meat, daily-caught seafood, and premium hand-pounded spices." },
    { title: "Exceptional Hospitality", desc: "Warm and prompt service that makes you feel like royalty from the moment you step in." },
    { title: "Trusted by Thousands", desc: "Over 7,460 happy reviews from Kakinada food lovers and travelers alike." },
  ];

  return (
    <section id="about" className="py-24 bg-dark-surface transition-colors duration-500 html.light:bg-light-surface relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -right-40 top-1/3 w-80 h-80 rounded-full bg-gold-500/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Images Grid */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-gold-500/25 shadow-2xl z-10 aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/seafood_platter.png"
                alt="Reeves Restaurant Cuisine"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Decorative Gold frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-gold-500 rounded-2xl -z-0 opacity-40 pointer-events-none" />

            {/* Float Badge */}
            <div className="absolute bottom-6 -right-6 glass border border-gold-500/30 rounded-2xl p-4 shadow-xl z-20 max-w-[180px] hidden sm:block animate-float">
              <p className="text-3xl font-extrabold text-gold-500 font-playfair">4.6 ★</p>
              <p className="text-xs text-text-muted mt-1 font-semibold">Rated by 7,460+ local food connoisseurs</p>
            </div>
          </motion.div>

          {/* Right Side: Narrative Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-gold-500 text-xs sm:text-sm font-bold tracking-widest uppercase block">
                Our Story & Legacy
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-playfair text-white leading-tight">
                Modern Indian Dining <br />
                <span className="gold-text-gradient">Redefined in Kakinada</span>
              </h2>
              <h3 className="text-lg text-gold-500/80 font-serif italic">
                రీవ్స్ రెస్టారెంట్ — ప్రతి ముద్దలోనూ ఒక అద్భుతమైన అనుభూతి
              </h3>
            </div>

            <p className="text-base text-text-muted leading-relaxed">
              At Reeves Restaurant, we take pride in re-imagining the rich heritage of Indian cuisine for the modern palate. Nestled in Surya Rao Peta, Kakinada, we offer a grand culinary journey blending classical recipes from the length and breadth of India with refined contemporary execution. From our legendary lobster biryanis to succulent tandoori delicacies, each plate celebrates authentic flavors and fresh local seafood.
            </p>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {features.map((feat) => (
                <div key={feat.title} className="flex gap-3 items-start">
                  <div className="mt-1 w-5 h-5 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-gold-500 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-playfair">{feat.title}</h4>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex gap-4">
              <a
                href="#menu"
                className="px-6 py-3 border border-gold-500 text-gold-500 rounded-full text-sm font-bold tracking-wider hover:bg-gold-500 hover:text-dark-bg transition-all duration-300"
              >
                Explore Specialties
              </a>
              <a
                href="#reservation"
                className="px-6 py-3 bg-gold-500 text-dark-bg rounded-full text-sm font-bold tracking-wider hover:bg-gold-600 transition-all duration-300 shadow-md shadow-gold-500/10"
              >
                Book Your Table
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

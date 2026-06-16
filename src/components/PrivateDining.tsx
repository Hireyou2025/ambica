"use client";

import React from "react";
import { Shield, Sparkles, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivateDining() {
  const features = [
    {
      icon: Shield,
      title: "Royal Chambers",
      desc: "Fully soundproofed premium dining chambers equipped with a dedicated butler, perfect for 8–15 guests.",
    },
    {
      icon: Users,
      title: "Family Gatherings & Birthdays",
      desc: "Customizable buffet arrangements, elegant tables, and beautiful lighting setups for grand milestones.",
    },
    {
      icon: Sparkles,
      title: "Corporate Meets & Luncheons",
      desc: "Acoustic-panel settings, high-speed Wi-Fi, projector setup, and custom corporate menus for meetings.",
    },
    {
      icon: Award,
      title: "Custom Menu Planning",
      desc: "Work with our Master Chef to design a bespoke multi-course menu featuring your favorites.",
    },
  ];

  return (
    <section id="private-dining" className="py-24 bg-dark-bg transition-colors duration-500 html.light:bg-light-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-gold-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Text Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-gold-500 text-xs sm:text-sm font-bold tracking-widest uppercase block">
                Exclusive Experiences
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-playfair text-white leading-tight">
                Private Dining & <br />
                <span className="gold-text-gradient">Celebration Suites</span>
              </h2>
              <div className="w-20 h-0.5 bg-gold-500 mt-4" />
            </div>

            <p className="text-base text-text-muted leading-relaxed">
              Celebrate your {"life's"} special moments in absolute privacy and grand style. Reeves Restaurant offers state-of-the-art private dining suites (PDR) and banquet spaces in Kakinada. Whether you are hosting an intimate family reunion, a milestone birthday celebration, a premium corporate meetup, or a high-profile business luncheon, our elegant chambers provide the perfect backdrop of sophistication, comfort, and specialized hospitality.
            </p>

            {/* Icon Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {features.map((feat) => {
                const IconComponent = feat.icon;
                return (
                  <div key={feat.title} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5 text-gold-500" />
                      <h4 className="font-bold text-white font-playfair text-sm">{feat.title}</h4>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">{feat.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <a
                href="#reservation"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gold-500 text-dark-bg font-bold tracking-wider hover:bg-gold-600 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-gold-500/15"
              >
                Inquire & Book Space
              </a>
            </div>
          </motion.div>

          {/* Right Side: Showcase Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border-2 border-gold-500/25 shadow-2xl z-10 aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/private_dining.png"
                alt="Reeves Private Dining Room Suite"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Outline Frame overlay */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold-500 rounded-2xl -z-0 opacity-40 pointer-events-none" />

            {/* Quick stats floating badge */}
            <div className="absolute top-6 -left-6 glass border border-gold-500/30 rounded-2xl p-4 shadow-xl z-20 hidden sm:block">
              <div className="flex gap-2 items-center">
                <Users className="h-5 w-5 text-gold-500" />
                <span className="text-sm font-bold text-white font-playfair">Capacity: 6 – 40 Guests</span>
              </div>
              <p className="text-[10px] text-text-muted mt-1 font-semibold">Prior reservations recommended</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, MessageSquare, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    id: "rev-1",
    name: "Ramesh Kumar G.",
    role: "Local Guide & Food Blogger",
    text: "The Lobster Biryani at Reeves is an absolute masterpiece! I have never tasted such aromatic saffron rice combined with tender, juicy lobster. The dark and gold interior is incredibly luxurious. It's the best dining experience in Kakinada.",
    rating: 5,
    highlight: "Best Lobster Biryani in Kakinada",
  },
  {
    id: "rev-2",
    name: "Priya S.",
    role: "Software Architect",
    text: "We booked the Royal PDR chamber for a corporate dinner of 12 people. The acoustic setup was completely private, and the dedicated butler service was impeccable. Food arrived piping hot, and the flavors were highly refined.",
    rating: 5,
    highlight: "Perfect for Corporate Groups",
  },
  {
    id: "rev-3",
    name: "Dr. Anand V.",
    role: "Pediatrician",
    text: "Hands down the best modern Indian restaurant in Andhra Pradesh. The Chettinad Tangdi Biryani is packed with flavor, and the local favorite Apricot Delight dessert is outstanding. Incredible value for money considering the premium ambiance.",
    rating: 5,
    highlight: "Excellent Food Quality & Pricing",
  },
  {
    id: "rev-4",
    name: "K. Satish Garu",
    role: "Business Owner",
    text: "Reeves has become our go-to family dining destination. The starters, especially the Guntur Chicken Fry, are spicy and delicious. The service is incredibly fast even during peak Sunday rush hours. A solid 4.6 stars well-deserved!",
    rating: 4.8,
    highlight: "Fast Service & Great Ambience",
  },
];

const ratingStats = [
  { stars: 5, count: "5,820", percent: 78 },
  { stars: 4, count: "1,240", percent: 16 },
  { stars: 3, count: "290", percent: 4 },
  { stars: 2, count: "80", percent: 1 },
  { stars: 1, count: "30", percent: 1 },
];

const satisfactionMetrics = [
  { label: "Food Quality", score: 98 },
  { label: "Ambience & Luxury", score: 96 },
  { label: "Service Speed", score: 94 },
  { label: "Value for Money", score: 92 },
];

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    resetTimer();
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    resetTimer();
  };

  return (
    <section id="reviews" className="py-24 bg-dark-surface transition-colors duration-500 html.light:bg-light-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-gold-500 text-xs sm:text-sm font-bold tracking-widest uppercase block">
            Guest Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-playfair text-white leading-tight">
            Loved by <span className="gold-text-gradient">7,460+ Diners</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Rating breakdown stats */}
          <div className="lg:col-span-5 space-y-8 p-6 rounded-2xl bg-dark-bg/60 border border-gold-500/10 html.light:bg-white html.light:border-light-border">
            {/* Core Score Card */}
            <div className="flex items-center gap-6 pb-6 border-b border-border-color">
              <div className="text-center">
                <span className="text-5xl font-extrabold text-gold-500 font-playfair">4.6</span>
                <div className="flex gap-1 justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gold-500 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] text-text-muted mt-1 block">7,462 total reviews</span>
              </div>
              <div className="flex-1 space-y-1">
                <span className="text-sm font-bold text-white font-playfair flex items-center gap-1.5">
                  <ShieldCheck className="h-4.5 w-4.5 text-gold-500" />
                  Verified Guest Feedback
                </span>
                <p className="text-xs text-text-muted leading-relaxed">
                  Consistently rated 4.6/5 stars across Google, Zomato, and TripAdvisor for taste, speed, and premium hosting.
                </p>
              </div>
            </div>

            {/* Progress breakdown */}
            <div className="space-y-3">
              {ratingStats.map((stat) => (
                <div key={stat.stars} className="flex items-center gap-3 text-xs font-semibold text-text-muted">
                  <span className="w-8 flex items-center gap-0.5 justify-end">
                    {stat.stars} <Star className="h-3 w-3 fill-current text-gold-500" />
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-border-color overflow-hidden">
                    <div
                      className="h-full bg-gold-500 rounded-full"
                      style={{ width: `${stat.percent}%` }}
                    />
                  </div>
                  <span className="w-12 text-right">{stat.count}</span>
                </div>
              ))}
            </div>

            {/* Satisfaction Metrics */}
            <div className="pt-4 border-t border-border-color space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-playfair">Guest Satisfaction</h4>
              <div className="grid grid-cols-2 gap-4">
                {satisfactionMetrics.map((met) => (
                  <div key={met.label} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-text-muted">
                      <span>{met.label}</span>
                      <span className="text-gold-500">{met.score}%</span>
                    </div>
                    <div className="h-1 bg-border-color rounded-full overflow-hidden">
                      <div className="h-full bg-gold-500" style={{ width: `${met.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Animated slider */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full min-h-[350px]">
            <div className="relative overflow-hidden flex-1 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <MessageSquare className="h-10 w-10 text-gold-500/20 stroke-[2.5]" />
                  
                  {/* Highlight Quote */}
                  <h3 className="text-2xl font-bold font-playfair text-gold-500">
                    &ldquo;{testimonials[activeIndex].highlight}&rdquo;
                  </h3>

                  {/* Review Text */}
                  <p className="text-base sm:text-lg text-text-muted leading-relaxed italic">
                    &ldquo;{testimonials[activeIndex].text}&rdquo;
                  </p>

                  {/* Reviewer Details */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center font-bold text-gold-500 font-playfair">
                      {testimonials[activeIndex].name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-playfair">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="text-xs text-text-muted mt-0.5">
                        {testimonials[activeIndex].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-border-color mt-8">
              {/* Pagination Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveIndex(i);
                      resetTimer();
                    }}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === i ? "w-6 bg-gold-500" : "w-2 bg-text-muted/30"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full border border-gold-500/20 text-text-muted hover:text-gold-500 hover:border-gold-500 transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full border border-gold-500/20 text-text-muted hover:text-gold-500 hover:border-gold-500 transition-colors cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

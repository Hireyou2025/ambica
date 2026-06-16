"use client";

import React, { useState } from "react";
import { Phone, MapPin, Navigation, MessageSquare, ChevronDown, ChevronUp, Mail, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

export default function Contact() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [queryName, setQueryName] = useState("");

  const faqs: FAQItem[] = [
    {
      question: "What are the restaurant's opening hours?",
      answer: "Reeves Restaurant is open daily from 11:00 AM to 11:00 PM, serving lunch and dinner. Online ordering is available until 10:45 PM.",
    },
    {
      question: "Do you offer private dining suites for corporate events or parties?",
      answer: "Yes, we feature dedicated Royal Chambers (PDR) and banquet spaces that host between 6 and 40 guests. You can request a suite on our Table Reservation form or call +91 91603 45681.",
    },
    {
      question: "Is there valet parking available?",
      answer: "Yes, we provide complimentary valet parking services for all dine-in guests at Surya Rao Peta.",
    },
    {
      question: "What is your online ordering delivery range in Kakinada?",
      answer: "We offer free No-Contact Delivery within a 5km radius of Surya Rao Peta. For locations beyond 5km, a nominal delivery fee applies based on distance.",
    },
    {
      question: "Are your dishes halal-certified?",
      answer: "Yes, all meat and poultry sourced at Reeves Restaurant are 100% Halal certified and prepared according to highest culinary safety standards.",
    },
  ];

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-dark-bg transition-colors duration-500 html.light:bg-light-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-gold-500 text-xs sm:text-sm font-bold tracking-widest uppercase block">
            Reach Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-playfair text-white leading-tight">
            Contact & <span className="gold-text-gradient">Directions</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-stretch">
          
          {/* Left Block: Contact Details */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between p-8 rounded-2xl bg-dark-surface border border-gold-500/10 html.light:bg-light-card html.light:border-light-border">
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-playfair text-white">Reeves Restaurant</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Located in the heart of Surya Rao Peta, Kakinada, right opposite Reliance Smart. 
                Visit us to experience fine dining or contact us for reservations, catering, or bulk orders.
              </p>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white font-playfair">Address</h4>
                    <p className="text-text-muted mt-1 leading-relaxed">
                      13-3-5, Opposite Reliance Smart,<br />
                      Surya Rao Peta, Kakinada,<br />
                      Andhra Pradesh 533001, India
                    </p>
                    <span className="text-[10px] text-gold-500 font-semibold block mt-1">Google Plus Code: X65P+2F Kakinada</span>
                  </div>
                </div>

                {/* Call */}
                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white font-playfair">Phone Number</h4>
                    <a href="tel:+919160345681" className="text-text-muted hover:text-gold-500 mt-1 block font-semibold transition-colors">
                      +91 91603 45681
                    </a>
                    <span className="text-[10px] text-text-muted block mt-0.5">Direct reservations & takeaway support</span>
                  </div>
                </div>

                {/* Mail */}
                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white font-playfair">Email Address</h4>
                    <a href="mailto:info@reevesrestaurant.com" className="text-text-muted hover:text-gold-500 mt-1 block transition-colors">
                      info@reevesrestaurant.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-6 border-t border-border-color flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=Reeves+Restaurant+Kakinada"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gold-500 text-dark-bg text-xs font-bold uppercase tracking-wider hover:bg-gold-600 transition-all cursor-pointer"
              >
                <Navigation className="h-4 w-4" />
                Directions
              </a>
              <a
                href="https://wa.me/919160345681"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-gold-500/20 text-gold-500 text-xs font-bold uppercase tracking-wider hover:bg-gold-500/10 transition-all"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Right Block: Embedded Map / Query Form */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Map Frame Card */}
            <div className="rounded-2xl overflow-hidden border border-gold-500/10 shadow-xl h-[280px] relative bg-gold-500/5 html.light:border-light-border">
              <iframe
                title="Reeves Restaurant Kakinada Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3816.035773663012!2d82.2355!3d16.9587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a38287a55555555%3A0x5555555555555555!2sReeves%20Restaurant!5e0!3m2!1sen!2sin!4v1781584000000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Custom Inquiry Contact Form */}
            <div className="p-6 rounded-2xl bg-dark-surface border border-gold-500/10 flex-1 flex flex-col justify-center html.light:bg-light-card html.light:border-light-border">
              <AnimatePresence mode="wait">
                {!contactSubmitted ? (
                  <motion.form
                    key="inquiry-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleQuerySubmit}
                    className="space-y-4"
                  >
                    <h4 className="text-sm font-bold text-white font-playfair uppercase tracking-wider">Send an Inquiry</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={queryName}
                        onChange={(e) => setQueryName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-gold-500/10 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 text-xs font-medium text-foreground html.light:bg-light-surface html.light:border-light-border"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-gold-500/10 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 text-xs font-medium text-foreground html.light:bg-light-surface html.light:border-light-border"
                      />
                    </div>
                    <textarea
                      placeholder="Your Message..."
                      rows={3}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-bg border border-gold-500/10 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 text-xs font-medium text-foreground html.light:bg-light-surface html.light:border-light-border"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-gold-500 text-dark-bg text-xs font-bold hover:bg-gold-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Send Message
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="inquiry-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-4 space-y-2"
                  >
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                    <h5 className="text-sm font-bold text-white">Message Sent!</h5>
                    <p className="text-xs text-text-muted">
                      Thank you, {queryName || "guest"}. We have received your query and will reply within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* FAQs Sub-section */}
        <div className="max-w-3xl mx-auto pt-10 border-t border-border-color">
          <div className="text-center mb-10 space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-playfair text-white">Frequently Asked Questions</h3>
            <p className="text-xs text-text-muted">Quick answers to help plan your premium dining at Reeves.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gold-500/10 bg-dark-surface overflow-hidden html.light:bg-light-card html.light:border-light-border"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-white hover:text-gold-500 transition-colors focus:outline-none"
                >
                  <span className="font-playfair tracking-wide">{faq.question}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="h-4 w-4 text-gold-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-text-muted flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-4 pt-1 text-xs text-text-muted leading-relaxed border-t border-border-color/30">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

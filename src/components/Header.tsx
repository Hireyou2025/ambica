"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import { useCart } from "./CartContext";
import { Sun, Moon, ShoppingBag, Menu, X, Utensils, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home", id: "home" },
  { name: "About", href: "#about", id: "about" },
  { name: "Specialties", href: "#specialties", id: "specialties" },
  { name: "Menu", href: "#menu", id: "menu" },
  { name: "Private Dining", href: "#private-dining", id: "private-dining" },
  { name: "Reviews", href: "#reviews", id: "reviews" },
  { name: "Gallery", href: "#gallery", id: "gallery" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { cartCount, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Section highlighters on scroll
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-dark-bg/95 backdrop-blur-md border-b border-gold-500/10 shadow-lg html.light:bg-light-bg/95 html.light:border-light-border"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex flex-col group focus:outline-none">
            <span className="text-2xl sm:text-3xl font-extrabold font-playfair tracking-wider text-gold-500 group-hover:scale-102 transition-transform">
              REEVES
            </span>
            <span className="text-[10px] tracking-[0.25em] font-semibold text-text-muted text-center mt-[-3px] font-sans">
              రీవ్స్ రెస్టారెంట్
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors relative py-1 focus:outline-none ${
                  activeSection === link.id
                    ? "text-gold-500"
                    : "text-foreground/80 hover:text-gold-500"
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-foreground/80 hover:text-gold-500 hover:bg-gold-500/10 transition-colors focus:outline-none"
              aria-label="Toggle Theme Mode"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-full text-foreground/80 hover:text-gold-500 hover:bg-gold-500/10 transition-colors relative focus:outline-none"
              aria-label="Open Cart Drawer"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-gold-500 text-dark-bg text-[10px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center border border-dark-bg">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Reserve Table CTA (Desktop) */}
            <a
              href="#reservation"
              className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gold-500 text-dark-bg font-bold text-sm tracking-wider hover:bg-gold-600 transition-all duration-300 hover:scale-[1.03] shadow-md shadow-gold-500/20"
            >
              <Utensils className="h-4 w-4" />
              Book Table
            </a>

            {/* Mobile Nav Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-md text-foreground hover:text-gold-500 focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 left-0 bottom-0 z-50 w-full max-w-[300px] bg-dark-surface border-r border-gold-500/20 text-foreground shadow-2xl flex flex-col p-6 html.light:bg-light-card html.light:border-light-border"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-border-color">
                <a
                  href="#home"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex flex-col focus:outline-none"
                >
                  <span className="text-xl font-bold font-playfair tracking-wider text-gold-500">
                    REEVES
                  </span>
                  <span className="text-[8px] tracking-[0.25em] font-semibold text-text-muted text-center mt-[-3px] font-sans">
                    రీవ్స్ రెస్టారెంట్
                  </span>
                </a>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-text-muted hover:text-gold-500 transition-colors focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 py-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-semibold tracking-wide transition-colors ${
                      activeSection === link.id
                        ? "text-gold-500 pl-2 border-l-2 border-gold-500"
                        : "text-foreground/80 hover:text-gold-500 pl-0"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              {/* Drawer Footer Actions */}
              <div className="space-y-4 pt-6 border-t border-border-color">
                <a
                  href="tel:+919160345681"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/30 hover:bg-gold-500/20 transition-all font-bold text-sm tracking-wider"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
                <a
                  href="#reservation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gold-500 text-dark-bg hover:bg-gold-600 transition-all font-bold text-sm tracking-wider"
                >
                  <Utensils className="h-4 w-4" />
                  Book a Table
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

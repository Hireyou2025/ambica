"use client";

import React from "react";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Specialties", href: "#specialties" },
    { name: "Menu", href: "#menu" },
    { name: "Private Dining", href: "#private-dining" },
    { name: "Reviews", href: "#reviews" },
    { name: "Gallery", href: "#gallery" },
    { name: "Table Reservation", href: "#reservation" },
  ];

  return (
    <footer className="bg-dark-surface border-t border-gold-500/10 text-foreground pt-16 pb-8 html.light:bg-light-surface html.light:border-light-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <a href="#home" className="inline-flex flex-col group">
              <span className="text-3xl font-extrabold font-playfair tracking-wider text-gold-500">
                REEVES
              </span>
              <span className="text-[10px] tracking-[0.25em] font-semibold text-text-muted mt-[-3px] font-sans">
                రీవ్స్ రెస్టారెంట్
              </span>
            </a>
            <p className="text-sm text-text-muted leading-relaxed">
              Experience the true art of Modern Indian fine dining in Kakinada. 
              Exceptional ingredients, culinary passion, and unforgettable hospitality.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gold-500/10 hover:bg-gold-500 hover:text-dark-bg text-gold-500 flex items-center justify-center transition-all duration-300 focus:outline-none"
                aria-label="Instagram"
              >
                <svg
                  className="h-4 w-4 fill-none stroke-current"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gold-500/10 hover:bg-gold-500 hover:text-dark-bg text-gold-500 flex items-center justify-center transition-all duration-300 focus:outline-none"
                aria-label="Facebook"
              >
                <svg
                  className="h-4 w-4 fill-none stroke-current"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gold-500/10 hover:bg-gold-500 hover:text-dark-bg text-gold-500 flex items-center justify-center transition-all duration-300 focus:outline-none"
                aria-label="Twitter/X"
              >
                <svg
                  className="h-4 w-4 fill-none stroke-current"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold font-playfair tracking-wide text-gold-500 mb-6">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-text-muted hover:text-gold-500 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h3 className="text-lg font-bold font-playfair tracking-wide text-gold-500 mb-6">
              Business Hours
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Everyday</p>
                  <p className="text-xs text-text-muted mt-1">11:00 AM – 11:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0 opacity-40" />
                <div>
                  <p className="text-sm font-semibold">Dine-in / Delivery</p>
                  <p className="text-xs text-text-muted mt-1">Order online until 10:45 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-bold font-playfair tracking-wide text-gold-500 mb-6">
              Get in Touch
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold-500 mt-0.5 flex-shrink-0" />
                <a
                  href="https://maps.google.com/?q=Reeves+Restaurant+Kakinada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-gold-500 transition-colors"
                >
                  13-3-5, Opposite Reliance Smart,<br />
                  Surya Rao Peta, Kakinada,<br />
                  Andhra Pradesh 533001, India
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold-500 flex-shrink-0" />
                <a
                  href="tel:+919160345681"
                  className="text-text-muted hover:text-gold-500 transition-colors font-semibold"
                >
                  +91 91603 45681
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold-500 flex-shrink-0" />
                <a
                  href="mailto:info@reevesrestaurant.com"
                  className="text-text-muted hover:text-gold-500 transition-colors"
                >
                  info@reevesrestaurant.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="h-px bg-border-color my-12" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>
            &copy; {new Date().getFullYear()} Reeves Restaurant. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-gold-500">Privacy Policy</a>
            <a href="#terms" className="hover:text-gold-500">Terms of Service</a>
            <span className="text-gold-500 font-semibold">Plus Code: X65P+2F Kakinada</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { Phone, ArrowUp } from "lucide-react";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-dark-bg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gold-600 hover:shadow-gold-500/30 focus:outline-none focus:ring-2 focus:ring-gold-500"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5 stroke-[2.5]" />
        </button>
      )}

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919160345681?text=Hi%20Reeves%20Restaurant%2C%20I'd%20like%20to%20make%20an%20inquiry%20or%20reserve%20a%20table!"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-green-500/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25d366] relative"
        aria-label="Contact on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
        </span>
        {/* Custom WhatsApp SVG */}
        <svg
          className="h-7 w-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.805-9.799.002-2.618-1.01-5.078-2.854-6.924C16.379 2.036 13.924 1.01 11.312 1.01c-5.41 0-9.811 4.398-9.813 9.802-.001 1.606.452 3.179 1.31 4.566l-.988 3.606 3.693-.97c1.385.756 2.87 1.151 4.417 1.153zm10.748-7.553c-.322-.162-1.91-.942-2.206-1.05-.297-.108-.513-.162-.73.162-.215.322-.835 1.05-.1.162zm0 0c-.215-.322-.835-1.05-1.023-1.266-.188-.215-.41-.322-.73-.162-.322.162-.942.502-1.282.885-.34.383-.715 1.287-.318 2.083.398.796.883 1.488 1.488 2.083.605.595 1.297.883 2.093 1.282.796.398 1.701.318 2.083-.079.383-.397 1.287-1.328 1.45-1.936.162-.607.162-1.129.08-1.237-.08-.108-.297-.215-.62-.376z"/>
        </svg>
      </a>

      {/* Direct Call Button */}
      <a
        href="tel:+919160345681"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-dark-bg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-500/30 hover:scale-105 hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-gold-500 relative"
        aria-label="Call Reeves Restaurant"
      >
        <Phone className="h-6 w-6 stroke-[2.5]" />
      </a>
    </div>
  );
}

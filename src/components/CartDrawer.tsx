"use client";

import React, { useEffect } from "react";
import { useCart } from "./CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
  } = useCart();

  // Prevent background scrolling when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  const handleCheckout = () => {
    // Generate order summary for WhatsApp message
    const itemSummaries = cart
      .map((item) => `${item.name} x ${item.quantity} (₹${item.price * item.quantity})`)
      .join("\n");
    const message = encodeURIComponent(
      `Hello Reeves Restaurant! I would like to place an online order:\n\n${itemSummaries}\n\n*Total Amount:* ₹${cartTotal}\n\n*Service:* Delivery / Takeaway\n*Please confirm my order.*`
    );
    window.open(`https://wa.me/919160345681?text=${message}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-dark-surface border-l border-gold-500/20 text-foreground shadow-2xl flex flex-col html.light:bg-light-card html.light:border-light-border"
          >
            {/* Header */}
            <div className="p-5 border-b border-border-color flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-gold-500" />
                <h2 className="text-xl font-bold font-playfair tracking-wide text-gold-500">Your Order</h2>
                <span className="bg-gold-500 text-dark-bg text-xs font-semibold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-full text-text-muted hover:text-gold-500 hover:bg-gold-500/10 transition-colors"
                aria-label="Close cart"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-10">
                  <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center">
                    <ShoppingBag className="h-8 w-8 text-gold-500/60" />
                  </div>
                  <h3 className="text-lg font-semibold font-playfair">Your cart is empty</h3>
                  <p className="text-sm text-text-muted max-w-[280px]">
                    Browse our menu and add {"Kakinada's"} finest delicacies to your order!
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 px-6 py-2 border border-gold-500 text-gold-500 rounded-full text-sm font-semibold hover:bg-gold-500 hover:text-dark-bg transition-all duration-300"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-4 p-3 rounded-lg bg-dark-bg/40 border border-gold-500/10 html.light:bg-light-surface/40 html.light:border-light-border"
                  >
                    {/* Item Image */}
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-gold-500/10 flex-shrink-0 relative border border-gold-500/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate font-playfair text-foreground">{item.name}</h4>
                      <p className="text-xs text-text-muted mt-0.5">₹{item.price} each</p>
                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-border-color rounded-full bg-dark-bg/60 overflow-hidden html.light:bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2.5 hover:bg-gold-500/10 text-text-muted hover:text-gold-500 transition-colors"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-xs font-semibold px-2 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2.5 hover:bg-gold-500/10 text-text-muted hover:text-gold-500 transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Total Price */}
                        <span className="text-sm font-semibold text-gold-500">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors self-start"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer and Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-border-color bg-dark-bg/50 backdrop-blur-md space-y-4 html.light:bg-light-surface/50">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-text-muted">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-text-muted">
                    <span>Delivery Fee</span>
                    <span className="text-green-500 font-semibold">FREE</span>
                  </div>
                  <div className="h-px bg-border-color my-1" />
                  <div className="flex justify-between text-base font-bold">
                    <span className="font-playfair">Estimated Total</span>
                    <span className="text-gold-500">₹{cartTotal}</span>
                  </div>
                </div>

                <div className="text-xs text-text-muted text-center leading-relaxed">
                  🛵 No-Contact Delivery & takeaway orders are handled immediately. 
                  Average delivery time is 30-45 minutes.
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 rounded-full bg-gold-500 text-dark-bg font-bold tracking-wide transition-all duration-300 hover:bg-gold-600 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-lg shadow-gold-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Place Order via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import React, { useState } from "react";
import { Calendar, Clock, Users, User, Phone, Mail, Award, CheckCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  privateRoom: boolean;
  specialRequests: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  date?: string;
  time?: string;
  guests?: string;
}

export default function Reservation() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    privateRoom: false,
    specialRequests: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6789]\d{9}$/; // Indian mobile numbers

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = "Enter a valid 10-digit Indian phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Reservation date must be today or in the future";
      }
    }

    if (!formData.time) {
      newErrors.time = "Please select a preferred time";
    } else {
      const hour = parseInt(formData.time.split(":")[0]);
      if (hour < 11 || hour >= 23) {
        newErrors.time = "Opening hours are from 11:00 AM to 11:00 PM";
      }
    }

    const guestsNum = parseInt(formData.guests);
    if (!formData.guests) {
      newErrors.guests = "Please specify guest count";
    } else if (isNaN(guestsNum) || guestsNum < 1 || guestsNum > 40) {
      newErrors.guests = "Guest capacity must be between 1 and 40";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Generate random booking code
      const code = "REV-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      setBookingCode(code);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      guests: "2",
      privateRoom: false,
      specialRequests: "",
    });
    setIsSuccess(false);
    setBookingCode("");
  };

  return (
    <section id="reservation" className="py-24 bg-dark-surface transition-colors duration-500 html.light:bg-light-surface relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-gold-500 text-xs sm:text-sm font-bold tracking-widest uppercase block">
            Table Booking
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-playfair text-white leading-tight">
            Reserve Your <span className="gold-text-gradient">Dining Table</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Side: Booking Guidelines Card */}
          <div className="lg:col-span-4 flex flex-col justify-between p-8 rounded-2xl bg-dark-bg/60 border border-gold-500/10 shadow-xl space-y-8 html.light:bg-white html.light:border-light-border">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Award className="h-6 w-6 text-gold-500" />
                <h3 className="text-lg font-bold font-playfair text-white">Booking Guidelines</h3>
              </div>
              
              <ul className="space-y-4 text-xs text-text-muted leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-gold-500 font-bold">•</span>
                  <span><strong>Grace Period:</strong> Tables are held for a maximum of 15 minutes past the reserved schedule.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold-500 font-bold">•</span>
                  <span><strong>Private Suites:</strong> Booking our private suites (PDR) requires a minimum guest size of 6 and is subject to availability.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold-500 font-bold">•</span>
                  <span><strong>Dress Code:</strong> Smart casual or traditional wear is appreciated to preserve our premium fine dining atmosphere.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold-500 font-bold">•</span>
                  <span><strong>Group Dinners:</strong> For gatherings larger than 20 guests, please contact us directly via telephone at +91 91603 45681.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-gold-500/5 border border-gold-500/15 flex gap-3 items-start">
              <Info className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white font-playfair">Instant Confirmation</h4>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  Upon submission, you will receive a digital booking ticket. Our reception will call you 2 hours prior to verify.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: The Form / Success Ticket */}
          <div className="lg:col-span-8 p-8 rounded-2xl bg-dark-bg/40 border border-gold-500/10 shadow-xl flex flex-col justify-center min-h-[500px] html.light:bg-white html.light:border-light-border">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="booking-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-text-muted" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Ex: Rajesh Chapa"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl bg-dark-surface border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors html.light:bg-light-surface ${
                            errors.name ? "border-red-500 focus:border-red-500" : "border-gold-500/10 focus:border-gold-500"
                          }`}
                        />
                      </div>
                      {errors.name && <p className="text-xs text-red-500 font-semibold">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-text-muted" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="Ex: 91603 45681"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl bg-dark-surface border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors html.light:bg-light-surface ${
                            errors.phone ? "border-red-500 focus:border-red-500" : "border-gold-500/10 focus:border-gold-500"
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-red-500 font-semibold">{errors.phone}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-text-muted" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Ex: rajesh@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl bg-dark-surface border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors html.light:bg-light-surface ${
                            errors.email ? "border-red-500 focus:border-red-500" : "border-gold-500/10 focus:border-gold-500"
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-500 font-semibold">{errors.email}</p>}
                    </div>

                    {/* Guest Count */}
                    <div className="space-y-1.5">
                      <label htmlFor="guests" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                        Number of Guests
                      </label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-text-muted" />
                        <select
                          id="guests"
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl bg-dark-surface border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors appearance-none html.light:bg-light-surface ${
                            errors.guests ? "border-red-500 focus:border-red-500" : "border-gold-500/10 focus:border-gold-500"
                          }`}
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 Persons</option>
                          <option value="3">3 Persons</option>
                          <option value="4">4 Persons</option>
                          <option value="5">5 Persons</option>
                          <option value="6">6 Persons</option>
                          <option value="8">8 Persons (PDR Suite Option)</option>
                          <option value="10">10+ Persons</option>
                          <option value="15">15+ Persons</option>
                        </select>
                      </div>
                      {errors.guests && <p className="text-xs text-red-500 font-semibold">{errors.guests}</p>}
                    </div>

                    {/* Date */}
                    <div className="space-y-1.5">
                      <label htmlFor="date" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-text-muted" />
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl bg-dark-surface border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors html.light:bg-light-surface ${
                            errors.date ? "border-red-500 focus:border-red-500" : "border-gold-500/10 focus:border-gold-500"
                          }`}
                        />
                      </div>
                      {errors.date && <p className="text-xs text-red-500 font-semibold">{errors.date}</p>}
                    </div>

                    {/* Time */}
                    <div className="space-y-1.5">
                      <label htmlFor="time" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                        Preferred Time
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-text-muted" />
                        <input
                          type="time"
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl bg-dark-surface border text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors html.light:bg-light-surface ${
                            errors.time ? "border-red-500 focus:border-red-500" : "border-gold-500/10 focus:border-gold-500"
                          }`}
                        />
                      </div>
                      {errors.time && <p className="text-xs text-red-500 font-semibold">{errors.time}</p>}
                    </div>
                  </div>

                  {/* Private Room Checkbox */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-gold-500/10 bg-dark-surface/30 html.light:bg-light-surface">
                    <input
                      type="checkbox"
                      id="privateRoom"
                      name="privateRoom"
                      checked={formData.privateRoom}
                      onChange={handleChange}
                      className="h-4.5 w-4.5 rounded border-gold-500/30 text-gold-500 focus:ring-gold-500 bg-dark-bg cursor-pointer"
                    />
                    <label htmlFor="privateRoom" className="text-xs sm:text-sm font-semibold text-white select-none cursor-pointer">
                      Request a Private Dining Room / Suite (PDR)
                    </label>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-1.5">
                    <label htmlFor="specialRequests" className="text-xs font-bold text-text-muted uppercase tracking-wider">
                      Special Requests or Dietary Requirements
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows={3}
                      placeholder="Ex: Vegetarian options, birthday setup, kid-friendly seating, allergens..."
                      value={formData.specialRequests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-dark-surface border border-gold-500/10 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm font-medium text-foreground transition-colors html.light:bg-light-surface"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-gold-500 text-dark-bg font-bold tracking-wider hover:bg-gold-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] shadow-lg shadow-gold-500/20 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-4 w-4 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
                        Verifying details...
                      </span>
                    ) : (
                      "Confirm Table Reservation"
                    )}
                  </button>
                </motion.form>
              ) : (
                /* Ticket Success State */
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8 text-center py-6"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto text-green-500">
                    <CheckCircle className="h-10 w-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-playfair text-white">Table Reserved Successfully!</h3>
                    <p className="text-sm text-text-muted max-w-md mx-auto">
                      Thank you, {formData.name}. Your booking has been secured. We look forward to hosting you.
                    </p>
                  </div>

                  {/* Ticket Container */}
                  <div className="max-w-md mx-auto rounded-xl border border-gold-500/20 bg-dark-surface/60 overflow-hidden relative shadow-2xl html.light:bg-light-surface">
                    {/* Left and Right punched circles for ticket look */}
                    <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-dark-bg border-r border-gold-500/20" />
                    <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-dark-bg border-l border-gold-500/20" />

                    {/* Ticket Header */}
                    <div className="p-5 bg-gold-500 text-dark-bg border-b border-gold-600/25 text-center">
                      <span className="text-[10px] uppercase font-bold tracking-[0.2em]">RESERVATION PASS</span>
                      <p className="text-xl font-extrabold font-playfair mt-0.5">{bookingCode}</p>
                    </div>

                    {/* Ticket Content */}
                    <div className="p-6 grid grid-cols-2 gap-y-4 gap-x-2 text-left text-xs sm:text-sm border-b border-dashed border-border-color">
                      <div>
                        <span className="text-[10px] text-text-muted font-bold uppercase block">Name</span>
                        <span className="font-semibold text-white truncate block">{formData.name}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted font-bold uppercase block">Phone</span>
                        <span className="font-semibold text-white block">{formData.phone}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted font-bold uppercase block">Guests</span>
                        <span className="font-semibold text-gold-500 block">{formData.guests} Persons</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted font-bold uppercase block">Private Room</span>
                        <span className={`font-semibold block ${formData.privateRoom ? "text-green-500" : "text-text-muted"}`}>
                          {formData.privateRoom ? "Requested" : "No"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted font-bold uppercase block">Date</span>
                        <span className="font-semibold text-white block">
                          {new Date(formData.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted font-bold uppercase block">Time</span>
                        <span className="font-semibold text-white block">{formData.time}</span>
                      </div>
                    </div>

                    {/* Ticket Footer */}
                    <div className="p-4 bg-dark-surface/40 text-[10px] text-text-muted text-center leading-relaxed">
                      💡 Bring this code with you. Reeves Restaurant is located opposite Reliance Smart, Surya Rao Peta, Kakinada.
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center gap-4">
                    <button
                      onClick={resetForm}
                      className="px-6 py-2 border border-gold-500/25 text-text-muted hover:text-gold-500 rounded-full text-xs font-bold transition-colors cursor-pointer"
                    >
                      Book Another Table
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-6 py-2 bg-gold-500 text-dark-bg rounded-full text-xs font-bold hover:bg-gold-600 transition-colors cursor-pointer"
                    >
                      Print Pass
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

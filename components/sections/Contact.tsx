"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  ExternalLink,
  Clock,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/config";

const CalendlyModal = dynamic(
  () => import("@/components/ui/CalendlyModal").then((mod) => mod.CalendlyModal),
  { ssr: false }
);

interface FormData {
  fullName: string;
  email: string;
  phone: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  React.useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash;
        if (hash === "#calendly" || hash === "#schedule") {
          setIsCalendlyOpen(true);
        } else if (hash === "#contact" || hash === "#contact-form") {
          setTimeout(() => {
            const formCard =
              document.getElementById("contact-form") ||
              document.getElementById("contact");
            if (formCard) {
              formCard.scrollIntoView({ behavior: "smooth", block: "center" });
              const input = document.getElementById("fullName");
              if (input) {
                input.focus({ preventScroll: true });
              }
            }
          }, 300);
        }
      }
    };

    const handleCustomOpen = () => setIsCalendlyOpen(true);

    handleHash();
    window.addEventListener("hashchange", handleHash);
    window.addEventListener("open-calendly", handleCustomOpen);
    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("open-calendly", handleCustomOpen);
    };
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (formData.phone.replace(/\D/g, "").length < 7) {
      newErrors.phone = "Please enter a valid phone number (at least 7 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send consultation request. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to connect to the mail server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ fullName: "", email: "", phone: "" });
    setErrors({});
    setSubmitError(null);
    setIsSubmitted(false);
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-white text-darkSlate scroll-mt-20"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-gold-deep uppercase block mb-3">
            TWO WAYS TO CONNECT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-navy leading-[1.18] mb-4">
            Let&apos;s Discuss Your Tax Situation.
          </h2>
          <p className="text-secondaryText text-sm sm:text-base leading-relaxed">
            Choose the method that works best for you: book a 30-minute appointment directly on Bruce&apos;s live calendar, or send a quick message to request a callback.
          </p>
        </div>

        {/* Two-Column Grid: Left Calendly Appointment Card, Right Callback Form Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Card 1 (Left): Direct Appointment Booking on Calendly - Full Golden Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#ECCB6E] via-[#D9A323] to-[#C28C14] text-navy rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-[#D9A323] shadow-xl flex flex-col justify-between relative group hover:shadow-2xl transition-all duration-200">
            <div>
              {/* Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy text-gold text-xs font-bold uppercase tracking-wider shadow-sm">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  INSTANT APPOINTMENT
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-950 bg-white/70 px-2.5 py-0.5 rounded-full border border-emerald-600/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  Live Calendar
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight mb-3">
                Book a 30-Minute Review
              </h3>
              <p className="text-navy/85 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                Pick a date and time directly on Bruce&apos;s live schedule for a confidential, one-on-one consultation regarding your tax resolution, unfiled returns, or tax planning needs.
              </p>

              {/* Bruce Bergeron Host Profile Highlight */}
              <div className="bg-[#071D49] text-white rounded-2xl p-4 sm:p-5 mb-6 flex items-center gap-4 border border-gold/30 shadow-md">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 border-gold/50">
                  <Image
                    src="/assets/images/about-portrait.jpg"
                    alt="Bruce Bergeron - Experienced Tax Professional"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-white font-bold text-sm sm:text-base tracking-tight truncate">
                    Bruce Bergeron
                  </h4>
                  <p className="text-gold text-xs font-semibold tracking-wide truncate">
                    Experienced Tax Professional Since 2012
                  </p>
                  <p className="text-blue-100/80 text-xs mt-1 truncate">
                    Confidential • Personalized • Solution-Focused
                  </p>
                </div>
              </div>

              {/* Benefit Bullet Points */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-navy text-gold flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    <Clock className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-navy">
                      30-Minute Confidential Session
                    </h5>
                    <p className="text-navy/80 text-xs leading-relaxed font-medium">
                      Zero obligation. We will review your notices, letters, or tax questions thoroughly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-navy text-gold flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-navy">
                      Instant Confirmation &amp; Reminders
                    </h5>
                    <p className="text-navy/80 text-xs leading-relaxed font-medium">
                      Calendar invites and meeting links are automatically generated and sent to your email.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendly Action Button - Opens Modal Overlay */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsCalendlyOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#071D49] hover:bg-navy-light text-white font-bold text-sm sm:text-base transition-colors active:scale-[0.99] group/btn shadow-md cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-gold" />
                <span>Select a Time</span>
              </button>

              <p className="text-center text-xs text-navy/80 mt-3 font-medium">
                Free initial review • Live calendar modal overlay
              </p>
            </div>
          </div>

          {/* Card 2 (Right): Send a Message / Callback Request Form */}
          <div
            id="contact-form"
            className="lg:col-span-6 bg-[#071D49] text-white rounded-3xl p-6 sm:p-8 md:p-10 border border-white/15 flex flex-col justify-between scroll-mt-28"
          >
            {isSubmitted ? (
              <div className="py-10 text-center my-auto">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-500/40">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <span className="inline-block px-3.5 py-1 bg-gold/20 text-gold text-xs font-semibold rounded-full border border-gold/40 mb-3">
                  Inquiry Sent Successfully
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Consultation Request Received
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto mb-6">
                  Thank you, <strong className="text-gold">{formData.fullName}</strong>! Your inquiry has been sent directly to Bruce. He will review your details and contact you shortly.
                </p>
                <div className="bg-[#051535] rounded-xl p-4 text-xs text-slate-300 text-left max-w-sm mx-auto mb-6 space-y-1.5 border border-white/10">
                  <div><strong className="text-white">Email:</strong> {formData.email}</div>
                  <div><strong className="text-white">Phone:</strong> {formData.phone}</div>
                </div>
                <Button
                  onClick={handleReset}
                  variant="gold"
                  size="md"
                  className="!bg-gold hover:!bg-gold-hover text-navy font-bold rounded-full px-6"
                >
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <div>
                {/* Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-gold text-xs font-bold uppercase tracking-wider border border-white/15">
                    <Mail className="w-3.5 h-3.5 text-gold" />
                    PREFER A CALLBACK?
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                  Request a Callback or Inquiry
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  Leave your contact details below and describe your tax questions. Bruce will personally review your information and get back to you promptly.
                </p>

                <form id="consultation-form" onSubmit={handleSubmit} noValidate className="space-y-5">
                  {submitError && (
                    <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      placeholder="e.g. John Doe"
                      className={`w-full px-4 py-3 text-sm rounded-xl border bg-white text-darkSlate placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all ${
                        errors.fullName
                          ? "border-red-400 focus:ring-red-200"
                          : "border-slate-200 focus:border-gold"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-red-300 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 text-sm rounded-xl border bg-white text-darkSlate placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all ${
                        errors.email
                          ? "border-red-400 focus:ring-red-200"
                          : "border-slate-200 focus:border-gold"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-300 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      placeholder="(555) 000-0000"
                      className={`w-full px-4 py-3 text-sm rounded-xl border bg-white text-darkSlate placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all ${
                        errors.phone
                          ? "border-red-400 focus:ring-red-200"
                          : "border-slate-200 focus:border-gold"
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-300 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="gold"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full !bg-gold hover:!bg-gold-hover text-navy font-bold py-3.5 rounded-full transition-colors"
                    >
                      {isSubmitting ? "Processing Request..." : "Send Callback Request"}
                    </Button>
                  </div>

                  <div className="text-center pt-1">
                    <p className="text-xs text-slate-300">
                      Strictly confidential • Your information is never shared with third parties.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Calendly Booking Modal Overlay */}
      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
      />
    </section>
  );
};

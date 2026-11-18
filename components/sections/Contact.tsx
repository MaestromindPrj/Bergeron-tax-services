"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/config";

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

  React.useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash;
        if (hash === "#contact" || hash === "#contact-form") {
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

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
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
        <div className="max-w-2xl mb-14 md:mb-16">
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-gold-deep uppercase block mb-3">
            LET&apos;S START A CONVERSATION
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-navy leading-[1.18] mb-4">
            Let&apos;s Discuss Your Tax Situation.
          </h2>
          <p className="text-secondaryText text-sm sm:text-base leading-relaxed">
            Take the first step towards understanding your tax options. Get in touch to schedule an initial consultation.
          </p>
        </div>

        {/* Two-Column Grid: Left Form, Right Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Contact Form in Deep Blue Card */}
          <motion.div
            id="contact-form"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 bg-[#071D49] text-white rounded-2xl p-8 sm:p-10 border border-navy/20 shadow-xl flex flex-col justify-between scroll-mt-28"
          >
            {isSubmitted ? (
              <div className="py-6 text-center">
                <div className="w-14 h-14 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-5 border border-green-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-semibold rounded-full border border-gold/40 mb-3">
                  Inquiry Sent Successfully
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Consultation Request Received
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto mb-6">
                  Thank you, <strong className="text-gold">{formData.fullName}</strong>! Your consultation request has been sent directly to our team. We will review your tax details and contact you shortly.
                </p>
                <div className="bg-[#051535] rounded-xl p-4 text-xs text-slate-300 text-left max-w-sm mx-auto mb-6 space-y-1 border border-white/10">
                  <div><strong className="text-white">Email:</strong> {formData.email}</div>
                  <div><strong className="text-white">Phone:</strong> {formData.phone}</div>
                </div>
                <Button
                  onClick={handleReset}
                  variant="gold"
                  size="md"
                  className="!bg-gold hover:!bg-gold-hover text-navy font-bold rounded-full"
                >
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <form id="consultation-form" onSubmit={handleSubmit} noValidate className="space-y-6">
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
                    placeholder="Your full name"
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
                    placeholder="Your phone number"
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
                    className="w-full !bg-gold hover:!bg-gold-hover text-navy font-bold py-3.5 rounded-full shadow-md hover:shadow-gold-glow transition-all"
                  >
                    {isSubmitting ? "Processing Request..." : "Request a Consultation"}
                  </Button>
                </div>

                <div className="text-center pt-2">
                  <p className="text-xs text-slate-300">
                    Free, confidential initial review. Your information is held in strict confidence.
                  </p>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right Column: Professional Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex flex-col"
          >
            {/* Consultation Photo */}
            <div className="relative aspect-[4/3] lg:aspect-auto w-full h-full min-h-[380px] lg:min-h-[460px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
              <Image
                src="/images/contact-consultation.jpg"
                alt="Tax consultation review meeting"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

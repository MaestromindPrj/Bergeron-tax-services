"use client";

import React, { useState } from "react";
import { Calendar, Clock, ShieldCheck, ExternalLink, X } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { Button } from "@/components/ui/Button";
import { scrollToContactForm } from "@/lib/utils";

export const Consultation: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="bg-gradient-to-b from-[#071D49] to-[#0d2250] text-white py-16 border-t border-b border-white/10 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div
          className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-gold text-xs font-bold tracking-widest uppercase mb-3">
              <Calendar className="w-4 h-4" />
              <span>DIRECT CALENDAR BOOKING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3 leading-snug">
              Let&apos;s Discuss Your Tax Situation.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Take the first step towards understanding your tax options. Choose a convenient time slot directly on our consultation calendar for a confidential initial review.
            </p>
          </div>

          <div className="flex-shrink-0 flex flex-col sm:flex-row items-center gap-4">
            <Button
              href="/#contact-form"
              onClick={scrollToContactForm}
              variant="gold"
              size="lg"
              className="text-navy font-bold shadow-lg hover:shadow-gold-glow flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-navy" />
              Request a Consultation
            </Button>
          </div>
        </div>
      </div>

      {/* Google Calendar Presentation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md">
          <div
            className="bg-white text-darkSlate rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-darkSlate rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-[#071D49] border border-navy/20 text-gold flex items-center justify-center mb-5 shadow-sm">
              <Calendar className="w-6 h-6 stroke-[1.75]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-navy mb-2">
              Google Calendar Scheduling
            </h3>
            <p className="text-secondaryText text-sm leading-relaxed mb-6">
              In production, this button launches the integrated Google Calendar appointment scheduler, allowing you to select your preferred date and time for a confidential tax review.
            </p>

            <div className="bg-lightGrey rounded-xl p-4 border border-lightGrey-border mb-6 space-y-2 text-xs text-secondaryText">
              <div className="flex items-center gap-2 text-navy font-medium">
                <Clock className="w-4 h-4 text-gold-deep flex-shrink-0" />
                <span>30-minute free confidential initial consultation</span>
              </div>
              <div className="flex items-center gap-2 text-navy font-medium">
                <ShieldCheck className="w-4 h-4 text-gold-deep flex-shrink-0" />
                <span>One-on-one review with Bruce Bergeron</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={SITE_CONFIG.schedulingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold hover:bg-gold-hover text-navy font-bold text-sm shadow-sm transition-colors gap-2"
              >
                Open Google Calendar
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => setShowModal(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-darkSlate font-semibold text-sm transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

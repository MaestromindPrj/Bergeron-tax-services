"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Calendar } from "lucide-react";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/config";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedulingUrl?: string;
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({
  isOpen,
  onClose,
  schedulingUrl = SITE_CONFIG.schedulingUrl,
}) => {
  const [mounted, setMounted] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle body scroll locking and Escape key
  useEffect(() => {
    if (!isOpen) {
      setIframeLoading(true);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  // Build clean embed URL
  const origin = typeof window !== "undefined" ? window.location.host : "bergerontaxservices.com";
  const embedUrl = `${schedulingUrl}${schedulingUrl.includes("?") ? "&" : "?"}embed_domain=${encodeURIComponent(
    origin
  )}&embed_type=Inline&hide_gdpr_banner=1`;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#051535]/85 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendly-modal-title"
    >
      <div
        className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-4xl h-[92vh] max-h-[820px] flex flex-col shadow-2xl border border-gold/40 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-[#071D49] text-white px-5 py-3.5 sm:px-6 sm:py-4 flex items-center justify-between border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-gold/40">
              <Image
                src="/assets/images/about-portrait.jpg"
                alt="Bruce Bergeron"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  id="calendly-modal-title"
                  className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight"
                >
                  Schedule a Consultation
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Calendar
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Bruce Bergeron • 30-Minute Confidential Tax Review
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Iframe Container */}
        <div className="relative flex-1 w-full bg-[#f8fafc] overflow-hidden">
          {iframeLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 gap-3">
              <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin flex items-center justify-center text-gold">
                <Calendar className="w-4 h-4 text-gold" />
              </div>
              <p className="text-sm font-semibold text-navy">
                Loading Bruce&apos;s Live Calendar...
              </p>
              <p className="text-xs text-secondaryText">
                Connecting securely to appointment schedule
              </p>
            </div>
          )}

          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Select a Consultation Time with Bruce Bergeron"
            className="w-full h-full"
            onLoad={() => setIframeLoading(false)}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

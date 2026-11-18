"use client";

import React from "react";
import {
  FileWarning,
  FileClock,
  ShieldAlert,
  ShieldCheck,
  Calculator,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { scrollToContactForm } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  FileWarning,
  FileClock,
  ShieldAlert,
  ShieldCheck,
  Calculator,
};

interface ServiceCardProps {
  title: string;
  description: string;
  iconName: string;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  iconName,
}) => {
  const IconComponent = iconMap[iconName] || FileWarning;

  return (
    <div
      className="bg-white text-darkSlate rounded-2xl p-7 flex flex-col justify-between border border-slate-100 shadow-md hover:shadow-2xl hover:border-gold/50 hover:-translate-y-1.5 transition-all duration-200 group"
    >
      <div>
        <div className="w-11 h-11 rounded-xl bg-[#071D49] border border-navy/20 flex items-center justify-center text-gold mb-6 shadow-sm group-hover:bg-navy-light group-hover:scale-105 transition-all">
          <IconComponent className="w-5 h-5 stroke-[1.75]" />
        </div>
        <h3 className="text-navy font-bold text-lg mb-3 tracking-tight group-hover:text-gold-deep transition-colors">
          {title}
        </h3>
        <p className="text-secondaryText text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

interface HighlightConsultationCardProps {
  onCtaClick?: () => void;
}

export const HighlightConsultationCard: React.FC<HighlightConsultationCardProps> = ({
  onCtaClick,
}) => {
  return (
    <div
      className="bg-gold text-navy rounded-2xl p-7 flex flex-col justify-between border-2 border-gold-hover shadow-xl hover:shadow-gold-glow hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-200 relative overflow-hidden group"
    >
      <div className="relative z-10">
        <span className="text-[11px] font-bold tracking-widest text-navy uppercase block mb-3">
          A PERSONALIZED START
        </span>
        <h3 className="text-navy font-bold text-xl mb-3 tracking-tight">
          Not sure where to begin?
        </h3>
        <p className="text-navy text-sm leading-relaxed mb-6 font-medium">
          Start with a confidential conversation about your tax situation.
        </p>
      </div>
      <div className="relative z-10 pt-2">
        <a
          href="/#contact-form"
          onClick={onCtaClick || scrollToContactForm}
          className="inline-flex items-center text-navy font-bold text-sm hover:opacity-80 transition-opacity group/link"
        >
          Request a Consultation
          <ArrowRight className="w-4 h-4 ml-1.5 text-navy transition-transform group-hover/link:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { FileSearch, Target, Scale, ShieldCheck, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  FileSearch,
  Target,
  Scale,
  ShieldCheck,
};

interface ProcessCardProps {
  step: string;
  title: string;
  description: string;
  iconName: string;
  index: number;
}

export const ProcessCard: React.FC<ProcessCardProps> = ({
  title,
  description,
  iconName,
}) => {
  const IconComponent = iconMap[iconName] || FileSearch;

  return (
    <div
      className="bg-[#071D49] border border-white/10 rounded-2xl p-7 flex flex-col justify-start hover:border-gold/60 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 relative group h-full"
    >
      <div className="w-11 h-11 rounded-xl bg-gold border border-gold-light flex items-center justify-center text-navy mb-5 shadow-sm group-hover:bg-gold-light transition-all duration-300">
        <IconComponent className="w-5 h-5 stroke-[2] text-navy" />
      </div>

      <h3 className="text-gold font-bold text-lg mb-2.5 tracking-tight leading-snug group-hover:text-gold-light transition-colors">
        {title}
      </h3>

      <p className="text-slate-300 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

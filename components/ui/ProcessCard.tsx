"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProcessCardProps {
  step: string;
  title: string;
  description: string;
  index: number;
}

export const ProcessCard: React.FC<ProcessCardProps> = ({
  step,
  title,
  description,
}) => {
  return (
    <div
      className="bg-[#071D49] border border-white/10 rounded-2xl p-7 flex flex-col justify-start hover:border-gold/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-200 relative group h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gold/15 text-gold border border-gold/40 font-mono text-xs font-bold tracking-wider">
          {step}
        </span>
      </div>

      <h3 className="text-gold font-bold text-lg mb-3 tracking-tight leading-snug">
        {title}
      </h3>

      <p className="text-slate-300 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

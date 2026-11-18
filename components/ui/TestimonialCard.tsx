"use client";

import React from "react";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  quote: string;
  name: string;
  category: string;
  index: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  category,
}) => {
  return (
    <div
      className="bg-[#071D49] rounded-2xl p-8 flex flex-col justify-between border border-white/10 hover:border-gold/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-200 relative group h-full"
    >
      <div>
        <div className="text-gold/40 group-hover:text-gold transition-colors mb-5">
          <Quote className="w-7 h-7 stroke-[1.5]" />
        </div>
        <p className="text-slate-200 text-sm leading-relaxed mb-8">
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      <div className="border-t border-white/10 pt-5">
        <h4 className="text-gold font-semibold text-base tracking-tight">
          {name}
        </h4>
        <p className="text-slate-400 text-xs mt-0.5 tracking-wide">
          {category}
        </p>
      </div>
    </div>
  );
};

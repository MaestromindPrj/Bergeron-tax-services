"use client";

import React from "react";
import { UserCheck, MessageSquare, LineChart } from "lucide-react";

export const Approach: React.FC = () => {
  const cards = [
    {
      title: "Personalized Attention",
      description:
        "Understand each client's individual circumstances and provide services based on their specific tax needs.",
      icon: UserCheck,
    },
    {
      title: "Clear Communication",
      description:
        "Make complex tax matters easier to understand through honest communication and practical guidance.",
      icon: MessageSquare,
    },
    {
      title: "Proactive Tax Planning",
      description:
        "Identify applicable deductions, credits and opportunities to minimize tax liabilities through proactive planning.",
      icon: LineChart,
    },
  ];

  return (
    <section
      className="py-20 md:py-28 bg-[#071D49] text-white"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 md:mb-16">
          <div className="max-w-xl">
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-gold uppercase block mb-3">
              A PERSONAL, PROFESSIONAL APPROACH
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.18]">
              More Than Tax Preparation.
              <br />
              A Long-Term Partnership.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Tax concerns don&apos;t always end with filing a return. My commitment is to provide personalized support, clear communication and ongoing guidance.
            </p>
          </div>
        </div>

        {/* 3 White Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-stretch">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-7 text-darkSlate border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-start group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#071D49] border border-navy/20 flex items-center justify-center text-gold mb-5 shadow-sm group-hover:bg-navy-light group-hover:scale-105 transition-all">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <h3 className="text-navy font-bold text-lg mb-2.5 tracking-tight group-hover:text-gold-deep transition-colors">
                  {card.title}
                </h3>
                <p className="text-secondaryText text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Support Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-md flex flex-col md:flex-row items-start md:items-center gap-5 text-darkSlate">
          <div className="flex-shrink-0">
            <span className="inline-block bg-navy text-gold text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border border-navy-light">
              SUPPORT THAT CONTINUES
            </span>
          </div>
          <p className="text-secondaryText text-sm sm:text-base leading-relaxed">
            When your immediate tax concerns have been addressed, I can continue supporting you with tax preparation, planning and ongoing compliance.
          </p>
        </div>
      </div>
    </section>
  );
};

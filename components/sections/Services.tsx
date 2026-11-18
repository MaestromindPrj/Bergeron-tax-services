"use client";

import React from "react";
import { SERVICES_DATA } from "@/data/services";
import { ServiceCard, HighlightConsultationCard } from "@/components/ui/ServiceCard";

export const Services: React.FC = () => {
  return (
    <section
      id="services"
      className="py-20 md:py-28 bg-[#071D49] text-white"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header with Title and Right Subtitle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 md:mb-16">
          <div className="max-w-xl">
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-gold uppercase block mb-3">
              SERVICES &amp; AREAS OF EXPERTISE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.18]">
              Tax Services Designed
              <br />
              Around Your Needs.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Helping individuals, families, self-employed professionals and small-business owners navigate their tax responsibilities with confidence.
            </p>
          </div>
        </div>

        {/* 6-Card Grid: 5 Services + 1 Highlight Consultation Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {SERVICES_DATA.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              iconName={service.iconName}
              index={index}
            />
          ))}

          {/* 6th Card: Highlight Consultation */}
          <HighlightConsultationCard />
        </div>
      </div>
    </section>
  );
};

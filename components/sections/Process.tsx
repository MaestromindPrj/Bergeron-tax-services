"use client";

import React from "react";
import { RESOLUTION_PROCESS_DATA } from "@/data/services";
import { ProcessCard } from "@/components/ui/ProcessCard";

export const Process: React.FC = () => {
  return (
    <section
      id="process"
      className="py-20 md:py-28 bg-white text-darkSlate relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-14">
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-gold-deep uppercase block mb-3">
            YOUR PATH TO RESOLUTION
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-navy leading-[1.18] mb-4">
            A Clear Path Forward.
          </h2>
          <p className="text-secondaryText text-sm sm:text-base leading-relaxed">
            Every tax situation is different. My process is designed to give you clarity, advocate on your behalf with taxing authorities, and guide you towards complete resolution.
          </p>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {RESOLUTION_PROCESS_DATA.map((item, index) => (
            <ProcessCard
              key={item.step}
              step={item.step}
              title={item.title}
              description={item.description}
              iconName={item.iconName}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

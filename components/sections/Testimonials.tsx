"use client";

import React from "react";
import { TESTIMONIALS_DATA } from "@/data/testimonials";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

export const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-[#F4F5F7] text-darkSlate"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 md:mb-16">
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-gold-deep uppercase block mb-3">
            CLIENT EXPERIENCES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-navy leading-[1.18] mb-4">
            Trusted Guidance.
            <br />
            Meaningful Client Relationships.
          </h2>
          <p className="text-secondaryText text-sm sm:text-base leading-relaxed">
            Providing personalized tax support, clear communication and professional guidance throughout every step of the process.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {TESTIMONIALS_DATA.map((item, index) => (
            <TestimonialCard
              key={item.id}
              quote={item.quote}
              name={item.name}
              category={item.category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

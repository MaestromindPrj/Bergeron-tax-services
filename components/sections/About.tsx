"use client";

import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-20 md:py-28 bg-white text-darkSlate overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-gold-deep uppercase block mb-3">
            MEET YOUR TAX PROFESSIONAL
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-navy leading-[1.18]">
            Experience. Knowledge.
            <br />
            A Commitment to Helping Clients.
          </h2>
        </div>

        {/* Editorial Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Biography Text Column */}
          <div className="lg:col-span-7 space-y-5 text-secondaryText text-sm sm:text-base leading-relaxed">
            <p>
              I am an experienced tax professional since 2012 with experience in tax preparation, tax resolution, audit representation, and IRS and state tax notice review. My background has provided me with a comprehensive understanding of the tax industry and the challenges individuals and small business owners face when managing their tax obligations.
            </p>
            <p>
              My goal is to use this experience as I build and operate a successful tax services business focused on helping individuals, families, and self-employed professionals navigate their tax responsibilities with confidence.
            </p>
            <p>
              Throughout my career, I have worked with the IRS and state taxing authorities to resolve complex tax matters, negotiate payment arrangements, pursue penalty abatements, and explore available tax relief programs. I have also assisted taxpayers with audit defense, reviewed tax notices, and prepared individual and small business tax returns.
            </p>
            <p>
              As I grow my tax services business, I am committed to providing personalized service, preparing accurate tax returns, identifying applicable deductions and credits, and helping clients understand their tax situations. I believe that effective tax services go beyond preparing a return. They involve building relationships, educating clients, addressing concerns, and identifying opportunities to minimize tax liabilities through proactive tax planning.
            </p>
            <p>
              My professional experience has strengthened my ability to analyze tax issues, communicate complex information in understandable terms, manage cases efficiently, and advocate for taxpayers. These skills provide a strong foundation for delivering dependable tax preparation services and developing lasting client relationships.
            </p>

            {/* Mission Statement Callout */}
            <div className="border-l-2 border-gold pl-5 py-2 my-6 bg-lightGrey/60 rounded-r-lg">
              <p className="text-navy font-semibold text-sm sm:text-base italic leading-relaxed">
                &ldquo;My mission is to make tax preparation less stressful, provide clients with peace of mind, and build a tax services business founded on knowledge, integrity, personalized attention, and long-term client relationships.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Portrait and Callout Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
              <Image
                src="/assets/images/about-portrait.jpg"
                alt="Bruce Bergeron - Experienced Tax Professional"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            {/* Quote Card */}
            <div className="bg-[#071D49] text-white border border-white/10 rounded-2xl p-6 relative shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/40 text-gold flex items-center justify-center mb-3 shadow-sm">
                <Quote className="w-5 h-5 stroke-[1.75]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2 tracking-tight">
                Knowledge. Integrity. Personalized attention.
              </h3>
              <p className="text-slate-300 text-sm italic leading-relaxed">
                &ldquo;My mission is to make tax preparation less stressful, provide clients with peace of mind.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Three Highlights */}
        <div className="mt-16 pt-12 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              num: "01",
              title: "Tax Professional Since 2012",
              desc: "Over a decade of dedicated taxation and resolution experience.",
            },
            {
              num: "02",
              title: "Tax Preparation & Resolution",
              desc: "Comprehensive compliance and strategic back-tax relief.",
            },
            {
              num: "03",
              title: "IRS & State Tax Representation",
              desc: "Direct advocacy and audit defense before taxing authorities.",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="flex items-start gap-4"
            >
              <span className="font-mono text-xs font-bold text-gold-deep bg-gold/10 px-2.5 py-1 rounded">
                {item.num}
              </span>
              <div>
                <h4 className="text-navy font-bold text-base leading-snug">
                  {item.title}
                </h4>
                <p className="text-secondaryText text-xs mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

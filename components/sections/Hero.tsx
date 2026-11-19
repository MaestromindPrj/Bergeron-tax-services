"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { scrollToContactForm } from "@/lib/utils";

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Direct GPU-composited parallax (0 CPU physics solver overhead)
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const yHeroImage = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const yHeroBadge = useTransform(scrollYProgress, [0, 1], [0, -65]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative bg-[#071D49] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden text-white"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions with smooth parallax */}
          <motion.div
            style={{ y: yHeroText }}
            className="lg:col-span-7 transform-gpu"
          >
            <div className="inline-block mb-4">
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-gold uppercase">
                TAX RESOLUTION SPECIALISTS
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.12] mb-5">
              Tax Problems Don&apos;t
              <br />
              Have to Be Faced
              <br />
              Alone.
            </h1>

            <p className="text-gold font-semibold text-lg md:text-xl tracking-tight mb-4 leading-snug">
              Clear Answers. Knowledgeable Representation. A Path Forward.
            </p>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl mb-8">
              Are you self-employed or a small-business owner dealing with unfiled tax returns, IRS notices, or unpaid tax liabilities?
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-5">
              <Button
                href="/#contact-form"
                onClick={scrollToContactForm}
                variant="gold"
                size="lg"
                className="w-full sm:w-auto !bg-gold hover:!bg-gold-hover text-navy font-bold rounded-full shadow-md hover:shadow-gold-glow transition-all px-7 text-center justify-center"
              >
                Request a Consultation
              </Button>
              <Button
                href="#services"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border-white/20 rounded-full font-medium px-7 text-center justify-center"
              >
                Explore Our Services
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
              <span>Free, confidential initial consultation</span>
            </div>
          </motion.div>

          {/* Right Column: Hero Image with Layered Parallax */}
          <div className="lg:col-span-5 relative">
            <motion.div
              style={{ y: yHeroImage }}
              className="relative mx-auto max-w-md lg:max-w-none transform-gpu"
            >
              {/* Main photo card with clean border and no background shadow */}
              <div className="relative aspect-[4/5] w-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/20 bg-navy-card">
                <Image
                  src="/images/hero-consultation.jpg"
                  alt="Tax consultation with clients"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating Bottom Card with Differential Foreground Parallax */}
              <motion.div
                style={{ y: yHeroBadge }}
                className="absolute -bottom-6 left-3 right-3 sm:left-4 sm:right-auto bg-white rounded-xl shadow-xl p-4 sm:p-5 border border-slate-100 sm:max-w-xs transform-gpu z-20"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#071D49] border border-navy/20 text-gold flex items-center justify-center flex-shrink-0 shadow-sm">
                    <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase block mb-1">
                      A KNOWLEDGEABLE PARTNER
                    </span>
                    <p className="text-darkSlate font-bold text-sm leading-snug">
                      Tax expertise.
                      <br />
                      Personal attention.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#071D49] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col justify-start">
            <Link href="/#home" className="flex items-center gap-3 mb-5 group">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo/bts-logo.png"
                  alt="Bergeron Tax Services Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-gold transition-colors">
                Bergeron Tax Services
              </span>
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm mb-6">
              Professional tax preparation, resolution and planning with personalized attention.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-gold transition-colors font-medium underline underline-offset-4 decoration-white/30 hover:decoration-gold"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>

              <div className="pt-1">
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bruce Bergeron on LinkedIn"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gold hover:bg-gold-hover text-navy shadow-sm hover:shadow-gold-glow hover:scale-105 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    fill="currentColor"
                    className="w-4 h-4 text-navy"
                  >
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold tracking-widest text-gold uppercase mb-5">
              EXPLORE
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <Link href="/#home" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-white transition-colors">
                  Our Process
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-white transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog & Resources
                </Link>
              </li>
              <li>
                <Link href="/#contact-form" className="hover:text-white transition-colors">
                  Request a Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Tax Services Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold tracking-widest text-gold uppercase mb-5">
              TAX SERVICES
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  IRS & State Tax Notices
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Unfiled Tax Returns
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Tax Debt Resolution
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Audit Representation
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Tax Preparation & Planning
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {SITE_CONFIG.copyrightYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-slate-300 font-medium tracking-wide">
            Knowledge. Integrity. Personal attention.
          </p>
        </div>
      </div>
    </footer>
  );
};

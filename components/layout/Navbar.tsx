"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { Button } from "@/components/ui/Button";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isBlogPage = Boolean(pathname?.startsWith("/blog"));

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/#home", id: "home" },
    { label: "About", href: "/#about", id: "about" },
    { label: "Services", href: "/#services", id: "services" },
    { label: "Our Process", href: "/#process", id: "process" },
    { label: "Testimonials", href: "/#testimonials", id: "testimonials" },
    { label: "Blog", href: isBlogPage ? "/blog" : "/#blog", id: "blog" },
  ];

  const isScrolledRef = React.useRef(false);
  const activeSectionRef = React.useRef("home");

  // Determine active item: on any /blog route, 'blog' is active; otherwise use scrollspy
  const currentActive = isBlogPage ? "blog" : activeSection;

  useEffect(() => {
    // 1. Passive scroll listener for navbar background state
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 20;
      if (shouldBeScrolled !== isScrolledRef.current) {
        isScrolledRef.current = shouldBeScrolled;
        setIsScrolled(shouldBeScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 2. High-performance IntersectionObserver (eliminates getBoundingClientRect layout thrashing)
    if (window.location.pathname === "/") {
      const sectionIds = ["home", "about", "services", "process", "testimonials", "blog"];
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              if (id && id !== activeSectionRef.current) {
                activeSectionRef.current = id;
                setActiveSection(id);
              }
            }
          });
        },
        {
          rootMargin: "-20% 0px -60% 0px",
          threshold: 0,
        }
      );

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      return () => {
        window.removeEventListener("scroll", handleScroll);
        observer.disconnect();
      };
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<any>, href: string) => {
    if (href.startsWith("/#") && window.location.pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      if (targetId === "contact" || targetId === "contact-form") {
        const formCard =
          document.getElementById("contact-form") ||
          document.getElementById("contact");
        if (formCard) {
          formCard.scrollIntoView({ behavior: "smooth", block: "center" });
          setActiveSection("contact");
          setMobileMenuOpen(false);
          setTimeout(() => {
            const input = document.getElementById("fullName");
            if (input) input.focus({ preventScroll: true });
          }, 500);
          return;
        }
      }
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        setActiveSection(targetId);
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none transition-all duration-300">
      {/* Floating Solid White Pill Navbar Box */}
      <div
        className={`pointer-events-auto max-w-[1180px] mx-auto bg-white rounded-full border border-slate-200/90 px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 ${
          isScrolled
            ? "shadow-xl shadow-slate-900/15 py-2 sm:py-2.5 border-slate-300"
            : "shadow-lg shadow-black/8"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo & Brand Name */}
          <Link
            href="/#home"
            onClick={(e) => handleScrollTo(e, "/#home")}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none flex-shrink-0"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden transition-transform duration-200 group-hover:scale-105 flex-shrink-0">
              <Image
                src="/logo/bts-logo.png"
                alt="Bergeron Tax Services Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-navy font-bold text-sm sm:text-base leading-tight tracking-tight">
                Bergeron Tax Services
              </span>
              <span className="text-gold-deep text-[10px] sm:text-[11px] font-semibold tracking-wide">
                Tax Resolution Specialists
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((item) => {
              const isActive = currentActive === item.id;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className={`text-xs xl:text-[13px] transition-all duration-200 px-3.5 py-1.5 rounded-full tracking-tight font-medium ${
                    isActive
                      ? "text-gold-deep font-bold border border-gold/70 bg-gold/10 shadow-xs"
                      : "text-darkSlate hover:text-navy hover:bg-slate-100/80"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Gold CTA Button */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <Button
              href="/#contact"
              onClick={(e) => handleScrollTo(e, "/#contact")}
              variant="gold"
              size="sm"
              className="!bg-gold hover:!bg-gold-hover text-navy font-bold text-xs px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all"
            >
              Request a Consultation
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              href="/#contact"
              onClick={(e) => handleScrollTo(e, "/#contact")}
              variant="gold"
              size="sm"
              className="text-xs px-3 py-1.5 rounded-full font-bold text-navy"
            >
              Consult
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-darkSlate hover:text-navy rounded-full hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 px-2 pb-2 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-1">
              {navLinks.map((item) => {
                const isActive = currentActive === item.id;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className={`text-sm px-3.5 py-2 rounded-full transition-colors ${
                      isActive
                        ? "bg-gold/15 text-gold-deep font-bold border border-gold/40"
                        : "text-darkSlate hover:bg-slate-100 font-medium"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-2">
                <Button
                  href="/#contact"
                  variant="gold"
                  size="md"
                  className="w-full justify-center text-navy font-bold rounded-full"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleScrollTo(e, "/#contact");
                  }}
                >
                  Request a Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

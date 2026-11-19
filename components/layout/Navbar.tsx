"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, Mail, Calendar } from "lucide-react";
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

  // Handle ESC key and body scroll lock when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleScrollTo = (e: React.MouseEvent<any>, href: string) => {
    setMobileMenuOpen(false);

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
      }
    }
  };

  return (
    <>
      {/* Dimmed backdrop overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#071D49]/70 backdrop-blur-sm z-40 transition-opacity duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none">
        {/* Floating Solid White Navbar Pill - Always stays pill shape */}
        <div
          className={`pointer-events-auto max-w-[1180px] mx-auto bg-white rounded-full border border-slate-200/90 px-4 sm:px-6 py-2.5 sm:py-3 transition-shadow duration-200 ${
            isScrolled
              ? "shadow-xl shadow-slate-900/15 py-2 sm:py-2.5 border-slate-300"
              : "shadow-lg shadow-black/8"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Logo & Brand Name */}
            <Link
              href="/#home"
              onClick={(e) => handleScrollTo(e, "/#home")}
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none flex-shrink min-w-0"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden transition-transform duration-200 group-hover:scale-105 flex-shrink-0 border border-slate-100 bg-slate-50">
                <Image
                  src="/logo/bts-logo.png"
                  alt="Bergeron Tax Services Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-navy font-bold text-sm sm:text-base leading-tight tracking-tight truncate">
                  Bergeron Tax Services
                </span>
                <span className="hidden sm:block text-gold-deep text-[10px] sm:text-[11px] font-semibold tracking-wide truncate">
                  Tax Resolution Specialists
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (>= 1024px) */}
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

            {/* Desktop Gold CTA Button (>= 1024px) */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
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

            {/* Mobile / Tablet menu controls (< 1024px) */}
            <div className="flex lg:hidden items-center gap-2 flex-shrink-0">
              <Button
                href="/#contact"
                onClick={(e) => handleScrollTo(e, "/#contact")}
                variant="gold"
                size="sm"
                className="hidden sm:inline-flex text-xs px-3.5 py-1.5 rounded-full font-bold text-navy !bg-gold hover:!bg-gold-hover"
              >
                Consult
              </Button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-darkSlate hover:text-navy rounded-full hover:bg-slate-100 focus:outline-none transition-colors border border-slate-200"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 stroke-[2.25]" />
                ) : (
                  <Menu className="w-5 h-5 stroke-[2.25]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated Mobile Dropdown Card - 100% square (rounded-2xl) from frame 1, NEVER a circle */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 pointer-events-auto max-w-[1180px] mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 sm:p-5 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col space-y-1">
              {navLinks.map((item) => {
                const isActive = currentActive === item.id;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className={`group flex items-center justify-between text-sm sm:text-base px-4 py-2.5 rounded-xl transition-all ${
                      isActive
                        ? "bg-gold/15 text-gold-deep font-bold border border-gold/40 shadow-xs"
                        : "text-darkSlate hover:bg-slate-50 hover:text-navy font-medium"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                        isActive ? "text-gold-deep" : "text-slate-400"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Bottom Action inside Mobile Menu */}
            <div className="mt-3 pt-3 border-t border-slate-100 space-y-2.5">
              <Button
                href="/#contact-form"
                variant="gold"
                size="md"
                className="w-full justify-center !bg-gold hover:!bg-gold-hover text-navy font-bold py-3 rounded-full shadow-md flex items-center gap-2"
                onClick={(e) => handleScrollTo(e, "/#contact-form")}
              >
                <Calendar className="w-4 h-4 text-navy" />
                Request a Consultation
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-secondaryText pt-1">
                <Mail className="w-3.5 h-3.5 text-gold-deep" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-navy transition-colors font-medium"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

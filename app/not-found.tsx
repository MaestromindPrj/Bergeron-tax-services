import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, BookOpen, ShieldAlert } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-darkSlate">
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-36 pb-24 px-6 bg-gradient-to-b from-[#071D49] to-[#0d2556] text-white">
        <div className="max-w-xl w-full text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldAlert className="w-4 h-4" />
            <span>404 - Page Not Found</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Looking for Guidance?
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
            The page you requested could not be found or may have been moved. Let&apos;s get you back on the right track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gold hover:bg-gold-hover text-navy font-bold text-sm shadow-md hover:shadow-gold-glow transition-all"
            >
              <Home className="w-4 h-4" />
              Return to Homepage
            </Link>

            <Link
              href="/blog"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Tax Resources & Blog
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

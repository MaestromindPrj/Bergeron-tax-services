import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Approach } from "@/components/sections/Approach";
import { Testimonials } from "@/components/sections/Testimonials";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-darkSlate">
      {/* 01. Navigation Header */}
      <Navbar />

      <main className="flex-1">
        {/* 02. Hero Section */}
        <Hero />

        {/* 03. About Section */}
        <About />

        {/* 04. Services Section */}
        <Services />

        {/* 05. Resolution Process */}
        <Process />

        {/* 06. Professional Approach */}
        <Approach />

        {/* 07. Testimonials */}
        <Testimonials />

        {/* 08. Blog / Tax Resources */}
        <Blog />

        {/* 09. Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

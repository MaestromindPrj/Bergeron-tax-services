"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowLeft, BookOpen } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/data/blog";
import { BlogGridCard } from "@/components/ui/BlogCard";
import { Button } from "@/components/ui/Button";

const categories = [
  "ALL",
  "TAX GUIDANCE",
  "TAX RESOLUTION",
  "TAX PREPARATION",
  "TAX PLANNING",
];

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === "ALL" ||
      post.category.toUpperCase() === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-darkSlate">
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Blog Header Banner - Compact, balanced & proportioned */}
        <section className="bg-[#071D49] text-white min-h-[500px] md:min-h-[520px] lg:h-[530px] flex flex-col justify-center pt-28 md:pt-32 pb-10 md:pb-12 mb-10 md:mb-12">
          <div className="w-full max-w-[1200px] mx-auto px-6">
            <Link
              href="/#blog"
              className="inline-flex items-center text-xs font-semibold text-gold hover:text-white transition-colors mb-4 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5 transition-transform group-hover:-translate-x-1" />
              Back to Homepage
            </Link>

            <div className="max-w-3xl">
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-gold uppercase block mb-4">
                TAX KNOWLEDGE &amp; ARTICLES
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[60px] xl:text-[64px] font-bold tracking-tight text-white mb-[18px] leading-[1.08]">
                Insights to Help You
                <br />
                Navigate Your Taxes.
              </h1>
              <p className="text-slate-300 text-sm sm:text-base md:text-[17px] leading-relaxed max-w-xl">
                Practical tax insights, helpful guidance and educational resources for individuals, families, and small-business owners.
              </p>
            </div>
          </div>
        </section>

        {/* Filters & Search */}
        <div className="max-w-[1200px] mx-auto px-6 mb-10">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-navy text-white shadow-sm"
                      : "bg-slate-100 text-secondaryText hover:text-navy hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 text-darkSlate placeholder-slate-400 focus:outline-none focus:bg-white focus:border-navy"
              />
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="max-w-[1200px] mx-auto px-6">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogGridCard
                  key={post.slug}
                  post={post}
                  index={index}
                  variant="blue"
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-md mx-auto my-12">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-navy mb-2">No articles found</h3>
              <p className="text-secondaryText text-sm mb-6">
                No articles matched your selected category or search query.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("ALL");
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 bg-navy text-white text-xs font-semibold rounded-full hover:bg-navy-light transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA Banner */}
        <div className="max-w-[1200px] mx-auto px-6 mt-20">
          <div className="bg-gradient-to-r from-navy to-[#0F2F6D] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-bold tracking-widest text-gold uppercase block mb-2">
                PERSONALIZED TAX ASSISTANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                Have specific tax questions regarding your situation?
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Schedule a confidential consultation to review your notices, back-taxes, or return preparation options.
              </p>
            </div>
            <Button
              href="/#contact-form"
              variant="gold"
              size="lg"
              className="text-navy font-bold flex-shrink-0"
            >
              Request a Consultation
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

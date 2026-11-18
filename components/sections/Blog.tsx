"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog";
import { FeaturedBlogCard, BlogGridCard } from "@/components/ui/BlogCard";

export const Blog: React.FC = () => {
  const featuredPost = BLOG_POSTS.find((p) => p.isFeatured) || BLOG_POSTS[0];
  const additionalPosts = BLOG_POSTS.filter((p) => !p.isFeatured);

  return (
    <section
      id="blog"
      className="py-20 md:py-28 bg-[#071D49] text-white"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 md:mb-16">
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-gold uppercase block mb-3">
            BLOG / TAX RESOURCES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.18] mb-4">
            Insights to Help You
            <br />
            Navigate Your Taxes.
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Explore practical tax insights, helpful guidance and educational resources for individuals and small-business owners.
          </p>
        </div>

        {/* Featured Article Card */}
        <div className="mb-8">
          <FeaturedBlogCard post={featuredPost} />
        </div>

        {/* 3 Additional Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-stretch">
          {additionalPosts.map((post, index) => (
            <BlogGridCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        {/* Bottom Action: Explore All Articles */}
        <div className="flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-7 py-3.5 rounded-full bg-gold hover:bg-gold-hover text-navy text-sm font-bold shadow-md hover:shadow-gold-glow transition-all group"
          >
            Explore All Articles
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 text-navy" />
          </Link>
        </div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { BlogPost } from "@/data/blog";

interface FeaturedBlogCardProps {
  post: BlogPost;
}

export const FeaturedBlogCard: React.FC<FeaturedBlogCardProps> = ({ post }) => {
  return (
    <article
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-white/20 hover:-translate-y-1.5 transition-all duration-200 grid grid-cols-1 md:grid-cols-12 group"
    >
      <div className="relative md:col-span-5 h-64 md:h-auto min-h-[260px] overflow-hidden bg-slate-100">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block bg-gold text-navy text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-md border border-gold-light/40">
            ARTICLE PREVIEW
          </span>
        </div>
      </div>

      <div className="md:col-span-7 p-7 md:p-10 flex flex-col justify-between">
        <div>
          <span className="text-xs font-bold tracking-wider text-gold-deep uppercase block mb-2.5">
            {post.category}
          </span>
          <h3 className="text-darkSlate font-bold text-xl md:text-2xl mb-3 tracking-tight leading-snug group-hover:text-navy transition-colors">
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h3>
          <p className="text-secondaryText text-sm md:text-base leading-relaxed mb-6">
            {post.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-slate-100 gap-4">
          <div className="flex items-center text-xs text-secondaryText gap-4">
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              {post.date}
            </span>
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              {post.readTime}
            </span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-sm font-semibold text-darkSlate hover:text-gold-deep transition-colors group/link"
          >
            Read Article
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};

interface BlogGridCardProps {
  post: BlogPost;
  index?: number;
  variant?: "white" | "blue";
}

export const BlogGridCard: React.FC<BlogGridCardProps> = ({
  post,
  variant = "white",
}) => {
  const isBlue = variant === "blue";

  return (
    <article
      className={`rounded-2xl overflow-hidden flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-200 group h-full ${
        isBlue
          ? "bg-[#071D49] shadow-lg hover:shadow-2xl border border-white/10"
          : "bg-white shadow-md hover:shadow-xl border border-slate-200/90"
      }`}
    >
      <div>
        <div
          className={`relative h-48 w-full overflow-hidden ${
            isBlue ? "bg-slate-900" : "bg-slate-100"
          }`}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block bg-gold text-navy text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md border border-gold-light/40">
              ARTICLE PREVIEW
            </span>
          </div>
        </div>

        <div className="p-6">
          <span
            className={`text-[11px] font-bold tracking-wider uppercase block mb-2 ${
              isBlue ? "text-gold" : "text-gold-deep"
            }`}
          >
            {post.category}
          </span>
          <h3
            className={`font-bold text-lg mb-2.5 tracking-tight leading-snug transition-colors ${
              isBlue
                ? "text-white group-hover:text-gold"
                : "text-darkSlate group-hover:text-navy"
            }`}
          >
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h3>
          <p
            className={`text-sm leading-relaxed ${
              isBlue ? "text-slate-300" : "text-secondaryText"
            }`}
          >
            {post.description}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2">
        <div
          className={`flex items-center justify-between text-xs border-t pt-4 ${
            isBlue
              ? "text-slate-400 border-white/10"
              : "text-secondaryText border-slate-100"
          }`}
        >
          <span>
            {post.date} &bull; {post.readTime}
          </span>
        </div>
        <div className="mt-3">
          <Link
            href={`/blog/${post.slug}`}
            className={`inline-flex items-center text-sm font-semibold transition-colors group/link ${
              isBlue
                ? "text-gold hover:text-white"
                : "text-navy hover:text-gold-deep"
            }`}
          >
            Read Article
            <ArrowRight
              className={`w-4 h-4 ml-1.5 transition-transform group-hover/link:translate-x-1 ${
                isBlue
                  ? "text-gold group-hover/link:text-white"
                  : "text-navy group-hover/link:text-gold-deep"
              }`}
            />
          </Link>
        </div>
      </div>
    </article>
  );
};

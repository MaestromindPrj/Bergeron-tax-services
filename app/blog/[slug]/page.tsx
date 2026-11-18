import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Share2,
  User,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BLOG_POSTS, BlogPost } from "@/data/blog";
import { SITE_CONFIG } from "@/lib/config";
import { Button } from "@/components/ui/Button";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} | ${SITE_CONFIG.name}`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      images: [
        {
          url: post.image,
          width: 800,
          height: 500,
          alt: post.title,
        },
      ],
    },
  };
}

export default function BlogPostDetail({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Related posts (excluding current)
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(
    0,
    2
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-darkSlate">
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Breadcrumb Navigation & Header */}
        <div className="bg-[#071D49] text-white pt-40 sm:pt-44 md:pt-48 pb-20">
          <div className="max-w-[1000px] mx-auto px-6">
            <div className="flex items-center gap-2 text-xs text-slate-300 mb-6">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-gold transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-gold truncate max-w-xs">{post.category}</span>
            </div>

            <span className="inline-block text-xs font-bold tracking-widest text-gold uppercase mb-4">
              {post.category}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-white mb-6 leading-[1.2]">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden relative bg-slate-200">
                  <Image
                    src="/assets/images/about-portrait.jpg"
                    alt={SITE_CONFIG.owner}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-semibold text-white">
                  By {SITE_CONFIG.owner}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content Container */}
        <div className="max-w-[1000px] mx-auto px-6 -mt-10">
          {/* Main Hero Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 mb-12">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Article Body */}
            <article className="lg:col-span-8 prose prose-slate max-w-none">
              {/* Introduction */}
              <div className="text-base sm:text-lg text-darkSlate leading-relaxed font-normal mb-8 pb-6 border-b border-slate-200/80">
                <p>{post.content.introduction}</p>
              </div>

              {/* Sections */}
              <div className="space-y-8">
                {post.content.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-navy tracking-tight">
                      {section.heading}
                    </h2>
                    {section.body.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-secondaryText text-sm sm:text-base leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.listItems && (
                      <ul className="space-y-2.5 my-4 pl-0 list-none">
                        {section.listItems.map((item, lIdx) => (
                          <li
                            key={lIdx}
                            className="flex items-start gap-2.5 text-sm sm:text-base text-darkSlate"
                          >
                            <CheckCircle2 className="w-4 h-4 text-gold-deep flex-shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Key Takeaways Box */}
              <div className="my-10 bg-[#071D49] text-white border border-white/10 rounded-2xl p-6 sm:p-8 shadow-lg">
                <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                  Key Takeaways
                </h3>
                <ul className="space-y-2.5 list-none pl-0">
                  {post.content.takeaways.map((takeaway, tIdx) => (
                    <li
                      key={tIdx}
                      className="flex items-start gap-2.5 text-sm sm:text-[15px] text-slate-200 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Author Bio Box */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-sm">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-gold/40">
                    <Image
                      src="/assets/images/about-portrait.jpg"
                      alt={SITE_CONFIG.owner}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold tracking-widest text-gold-deep uppercase block mb-1">
                      ABOUT THE AUTHOR
                    </span>
                    <h4 className="text-lg font-bold text-navy mb-1.5">
                      {SITE_CONFIG.owner}
                    </h4>
                    <p className="text-xs sm:text-sm text-secondaryText leading-relaxed mb-3">
                      Tax professional since 2012 specializing in tax preparation, IRS notice defense, and individual &amp; small-business tax resolution.
                    </p>
                    <Link
                      href="/#about"
                      className="text-xs font-semibold text-navy hover:text-gold-deep transition-colors inline-flex items-center gap-1"
                    >
                      Read Complete Bio <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar CTA */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Consultation Box */}
              <div className="bg-[#071D49] text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-white/10">
                <span className="text-[11px] font-bold tracking-widest text-gold uppercase block mb-2">
                  NEED GUIDANCE?
                </span>
                <h3 className="text-xl font-bold tracking-tight mb-3">
                  Have Questions About Your Tax Situation?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  Schedule a confidential initial consultation with Bruce Bergeron to evaluate your options and formulate a tailored strategy.
                </p>
                <Button
                  href="/#contact-form"
                  variant="gold"
                  size="md"
                  className="w-full text-navy font-bold justify-center"
                >
                  Request a Consultation
                </Button>
                <div className="mt-4 pt-4 border-t border-white/10 text-center">
                  <Link
                    href="/blog"
                    className="inline-flex items-center text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    Back to All Articles
                  </Link>
                </div>
              </div>

              {/* Related Articles */}
              <div className="bg-gold text-navy rounded-2xl p-6 sm:p-7 border-2 border-gold-hover shadow-lg">
                <h4 className="text-xs font-bold tracking-widest text-navy uppercase mb-4">
                  RELATED ARTICLES
                </h4>
                <div className="space-y-4">
                  {relatedPosts.map((related) => (
                    <div
                      key={related.slug}
                      className="pb-4 border-b border-navy/20 last:border-b-0 last:pb-0"
                    >
                      <span className="text-[10px] font-bold text-navy uppercase tracking-wider block mb-1">
                        {related.category}
                      </span>
                      <Link
                        href={`/blog/${related.slug}`}
                        className="text-xs sm:text-[13px] font-bold text-navy hover:opacity-80 transition-opacity line-clamp-2 leading-snug"
                      >
                        {related.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

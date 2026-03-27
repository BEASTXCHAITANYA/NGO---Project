"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import ImpactStats from "@/components/impact/ImpactStats";
import ImageUploader from "@/components/impact/ImageUploader";
import ImpactFeed from "@/components/impact/ImpactFeed";
import LiveBanner from "@/components/impact/LiveBanner";

const HeroScene = dynamic(() => import("@/components/animations/HeroScene"), { ssr: false });

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* 3D background */}
        <HeroScene />

        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 space-y-6 max-w-3xl mx-auto">
          <FadeIn delay={0}>
            <p className="text-xs font-semibold tracking-[0.3em] text-indigo-400 uppercase mb-2">
              Building Better Communities
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-tight">
              <span className="text-white">Change starts</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                with you.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
              SevaConnect drives transparent, community-led development across India.
              Every rupee tracked, every impact visible.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <Link
                href="/donate"
                className="px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:-translate-y-0.5"
              >
                Donate Now
              </Link>
              <Link
                href="/dashboard"
                className="px-7 py-3 rounded-xl border border-white/15 hover:border-indigo-400/50 bg-white/5 hover:bg-white/10 backdrop-blur text-gray-200 font-semibold text-sm transition-all hover:-translate-y-0.5"
              >
                View Impact
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-40">
          <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      <ImpactStats />

      {/* Feature Highlight */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        {/* Summary banner */}
        <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent p-8 mb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.12)_0%,transparent_60%)] pointer-events-none" />
          <p className="text-xs font-semibold tracking-[0.3em] text-indigo-400 uppercase mb-3">Platform Capabilities</p>
          <p className="text-lg sm:text-xl font-semibold text-white leading-relaxed max-w-3xl">
            Built a real-time NGO platform with{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              live impact tracking
            </span>
            ,{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              transparent fund flow
            </span>
            , and{" "}
            <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              geospatial aid mapping
            </span>
            .
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: "⚡",
              title: "Real-Time Updates",
              desc: "Firebase listeners push impact stories and donation data instantly — no refresh needed.",
            },
            {
              icon: "🗺️",
              title: "Geospatial Aid Map",
              desc: "Mapbox-powered map visualises which communities need help and which have been served.",
            },
            {
              icon: "📊",
              title: "Transparent Fund Flow",
              desc: "Every rupee logged in Firestore with donor names, amounts, and live totals on the dashboard.",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-2 hover:border-indigo-500/30 hover:bg-white/[0.07] transition-all duration-300"
            >
              <div className="text-2xl">{icon}</div>
              <h3 className="font-semibold text-white text-sm">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <LiveBanner />

      {/* AI Impact Engine */}
      <section className="max-w-5xl mx-auto px-4 pb-24 space-y-10">
        <div className="text-center space-y-2">
          <p className="text-xs font-semibold tracking-[0.3em] text-indigo-400 uppercase">Impact Engine</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Share Your{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Impact Story
            </span>
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Upload a photo from the field. Your story inspires others to give.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <ImageUploader />
        </div>

        <ImpactFeed />
      </section>
    </main>
  );
}

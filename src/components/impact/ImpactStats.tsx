"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  icon: string;
  label: string;
  value: number;
  display: string;   // formatted final display value
  suffix: string;    // e.g. "+" appended after animation
  color: string;     // glow color class
}

const STATS: Stat[] = [
  {
    icon: "💰",
    label: "Total Raised (All Time)",
    value: 124,
    display: "₹12.4L",
    suffix: "+",
    color: "rgba(99,102,241,0.4)",
  },
  {
    icon: "🏘️",
    label: "Communities Helped",
    value: 84,
    display: "84",
    suffix: "+",
    color: "rgba(168,85,247,0.4)",
  },
  {
    icon: "🤝",
    label: "Active Volunteers",
    value: 320,
    display: "320",
    suffix: "+",
    color: "rgba(236,72,153,0.4)",
  },
];

function useCountUp(target: number, duration = 1800, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [started, target, duration]);

  return count;
}

function StatCard({ stat, started }: { stat: Stat; started: boolean }) {
  const count = useCountUp(stat.value, 1800, started);

  // For ₹12.4L we animate the raw number (124 → "₹12.4L")
  const isRupee = stat.display.startsWith("₹");
  const displayCount = isRupee
    ? `₹${(count / 10).toFixed(1)}L`
    : `${count}`;

  return (
    <div
      className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 text-center
                 transition-all duration-300 hover:scale-[1.03] hover:border-white/20"
      style={{
        boxShadow: `0 0 0 0 ${stat.color}`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 28px 4px ${stat.color}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 0 ${stat.color}`;
      }}
    >
      <div className="text-3xl mb-4">{stat.icon}</div>
      <p className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
        {started ? displayCount : "0"}
        <span className="text-indigo-400">{stat.suffix}</span>
      </p>
      <p className="mt-2 text-sm text-gray-500 leading-snug">{stat.label}</p>
    </div>
  );
}

export default function ImpactStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="max-w-4xl mx-auto px-4 py-24">
      <div className="text-center mb-14">
        <p className="text-xs font-semibold tracking-[0.3em] text-indigo-400 uppercase mb-3">
          What We&apos;ve Achieved
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Real Impact.{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Real Change.
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} started={started} />
        ))}
      </div>
    </section>
  );
}

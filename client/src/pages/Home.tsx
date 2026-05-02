/**
 * Home Page — VOID Aesthetic
 * Minimal, cinematic, premium. Video background with clock overlays.
 */

import { useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ChevronDown, Clock } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import { segments } from "@/lib/data";
import VideoBackground from "@/components/ui/VideoBackground";

/* ── Scroll Reveal ─────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Hero Section ──────────────────────────────────────────── */
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={heroRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Video Background with clock overlays */}
      <VideoBackground
        src="https://stream.mux.com/jPyJ2YM6Nlly7U6EyfxM01tz4D4uPE3gyJ4PYuvY62Wg.m3u8"
        opacity={0.28}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8"
        style={{ y, opacity }}
      >
        {/* Label */}
        <motion.div
          className="mb-10 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="h-px w-10 bg-[#EB0028]" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#EB0028]">
            TEDx AlMuntazirSchoolsYouth — 2026
          </span>
          <div className="h-px w-10 bg-[#EB0028]" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="mb-6 text-[5rem] font-bold leading-none tracking-tighter text-white md:text-[8rem] lg:text-[11rem]"
          style={{ fontFamily: "'Inter', sans-serif" }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          BORROWED
          <br />
          <span className="text-white/10">TIME.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="mx-auto mb-14 max-w-lg text-lg text-white/50 md:text-xl"
          style={{ fontFamily: "'Inter', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          None of us choose our arrival. The clock was already running.
          <br />
          <span className="text-[#EB0028]">
            What will you do with the time that's left?
          </span>
        </motion.p>

        {/* Countdown */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="mb-4 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-white/25">
            <Clock size={13} className="text-[#EB0028]" />
            Time remaining
          </div>
          <CountdownTimer />
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Link href="/speakers">
            <motion.button
              className="rounded-full bg-[#EB0028] px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#c50022]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View Speakers
            </motion.button>
          </Link>
          <Link href="/theme">
            <motion.button
              className="rounded-full border border-white/20 px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:border-[#EB0028] hover:text-[#EB0028]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Read Manifesto
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/20">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── Theme Section ─────────────────────────────────────────── */
function ThemePreview() {
  return (
    <section className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <Reveal>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#EB0028]">
                The Theme
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="mt-5 mb-8 text-5xl font-bold leading-tight text-white lg:text-6xl"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Borrowed
                <br />
                <span className="text-[#EB0028]">Time.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mb-8 text-lg leading-relaxed text-white/45" style={{ fontFamily: "'Inter', sans-serif" }}>
                Every second you have lived has been borrowed — from the future,
                from the planet, from the generations that will inherit whatever
                we leave behind.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link href="/theme">
                <motion.button
                  className="rounded-full bg-[#EB0028] px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#c50022]"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Read the Manifesto
                </motion.button>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="relative mx-auto aspect-square max-w-sm">
              {/* Rotating clock rings */}
              {[
                { border: "rgba(235, 0, 40, 0.12)", dur: 60, dir: 1 },
                { border: "rgba(255, 255, 255, 0.04)", dur: 40, dir: -1 },
                { border: "rgba(235, 0, 40, 0.08)", dur: 25, dir: 1 },
              ].map((r, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: `1px solid ${r.border}`,
                    inset: `${(i + 1) * 2}rem`,
                  }}
                  animate={{ rotate: 360 * r.dir }}
                  transition={{ duration: r.dur, repeat: Infinity, ease: "linear" }}
                />
              ))}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="mb-2 text-7xl font-bold text-[#EB0028]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  2026
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/25">
                  Borrowed Time
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Segments Section ──────────────────────────────────────── */
function Segments() {
  return (
    <section className="py-32 lg:py-40" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mb-16 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#EB0028]">
              Three Segments
            </span>
            <h2
              className="mt-4 text-4xl font-bold text-white lg:text-5xl"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              The journey through <span className="text-[#EB0028]">time</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {segments.map((segment, i) => (
            <SegmentCard key={segment.id} segment={segment} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SegmentCard({
  segment,
  index,
}: {
  segment: (typeof segments)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <Link href={`/speakers?segment=${segment.id}`}>
      <motion.div
        ref={ref}
        className="group relative cursor-pointer overflow-hidden rounded-2xl p-8 transition-all duration-500"
        style={{
          background: "rgba(255,255,255,0.015)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ borderColor: "rgba(235, 0, 40, 0.3)" }}
      >
        <div className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-[#EB0028]">
          Segment {segment.number}
        </div>
        <h3 className="mb-2 text-xl font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
          {segment.label}
        </h3>
        <div className="mb-4 text-xs font-mono uppercase tracking-widest text-white/20">
          {segment.theme}
        </div>
        <p className="mb-6 text-sm leading-relaxed text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
          {segment.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/20 font-mono">
            {segment.speakers.length} speakers
          </span>
          <ArrowRight size={14} className="text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#EB0028]" />
        </div>
      </motion.div>
    </Link>
  );
}

/* ── Quote Section ─────────────────────────────────────────── */
function Quote() {
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "rgba(235, 0, 40, 0.04)" }} />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
        <Reveal>
          <div className="mb-8 text-8xl font-bold leading-none text-[#EB0028]/20" style={{ fontFamily: "'Inter', sans-serif" }}>
            "
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote
            className="mb-8 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Ideas are the only currency that appreciates with time.
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-white/30">
            TEDx AlMuntazirSchoolsYouth 2026
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Final CTA ─────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#EB0028]">
                Don't waste it
              </span>
              <h2
                className="mt-4 mb-6 text-4xl font-bold text-white lg:text-5xl"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Your time is
                <br />
                <span className="text-[#EB0028]">running out.</span>
              </h2>
              <p className="text-lg leading-relaxed text-white/45" style={{ fontFamily: "'Inter', sans-serif" }}>
                Join us for a day of ideas that challenge, inspire, and demand action.
                Six student speakers. Three segments. One urgent question.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="space-y-3">
              {[
                { href: "/speakers", label: "Meet the Speakers" },
                { href: "/theme", label: "Read the Manifesto" },
                { href: "/about", label: "About TEDx" },
              ].map((link, i) => (
                <Link key={link.href} href={link.href}>
                  <motion.button
                    className={`flex w-full items-center justify-between rounded-full px-8 py-5 text-sm font-medium tracking-wide transition-all duration-300 ${
                      i === 0
                        ? "bg-[#EB0028] text-white hover:bg-[#c50022]"
                        : "border border-white/10 text-white hover:border-[#EB0028] hover:text-[#EB0028]"
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Main Page ─────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <ThemePreview />
      <Segments />
      <Quote />
      <FinalCTA />
    </div>
  );
}

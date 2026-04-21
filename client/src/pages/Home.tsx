/**
 * Home Page — "The Urgency Hub"
 * Design: Neo-Brutalist Editorial | Dark, kinetic, confrontational
 * Sections: Hero (countdown), Theme Preview, 3 Segments, CTA
 */

import { useRef } from "react";
import { Link } from "wouter";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { ArrowRight, Clock, ChevronDown, Hourglass } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import { GLSLHills } from "@/components/ui/glsl-hills";
import { segments } from "@/lib/data";

// ── Scroll-reveal wrapper ─────────────────────────────────────
function RevealOnScroll({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// ── Animated headline characters ─────────────────────────────
function AnimatedHeadline({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: delay + wi * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ── Segment Card ──────────────────────────────────────────────
function SegmentCard({
  segment,
  index,
}: {
  segment: (typeof segments)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link href="/speakers">
        <div
          className="group relative p-8 lg:p-10 cursor-pointer overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "#EB0028";
            el.style.background = "rgba(235, 0, 40, 0.04)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "rgba(255,255,255,0.07)";
            el.style.background = "rgba(255,255,255,0.02)";
          }}
        >
          {/* Segment number */}
          <div
            className="text-8xl font-bold absolute -top-4 -right-2 select-none pointer-events-none"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "rgba(235, 0, 40, 0.06)",
              lineHeight: 1,
            }}
          >
            {segment.number}
          </div>

          {/* Label */}
          <div
            className="text-xs tracking-widest uppercase mb-4"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "#EB0028",
            }}
          >
            Segment {segment.number}
          </div>

          {/* Title */}
          <h3
            className="text-2xl lg:text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {segment.label}
          </h3>

          {/* Theme */}
          <div
            className="text-xs tracking-widest uppercase text-white/30 mb-5"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {segment.theme}
          </div>

          {/* Description */}
          <p
            className="text-white/50 text-sm leading-relaxed mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {segment.description}
          </p>

          {/* Speaker count */}
          <div className="flex items-center justify-between">
            <div
              className="text-white/30 text-xs"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {segment.speakers.length} speakers
            </div>
            <div
              className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors duration-300"
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem" }}
            >
              <span className="tracking-widest uppercase">Explore</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>

          {/* Bottom red rule — animates on hover */}
          <div
            className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
            style={{ background: "#EB0028" }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

// ── Main Home Page ────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen" style={{ background: "#000000" }}>
      {/* ── HERO SECTION ──────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      >
        {/* 3D WebGL Hills Background */}
        <div className="absolute inset-0 z-0">
          <GLSLHills width="100%" height="100%" cameraZ={125} speed={0.3} />
          {/* Dark overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.95) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20"
          style={{ opacity: heroOpacity }}
        >
          {/* Event label */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="h-px w-12" style={{ background: "#EB0028" }} />
            <span
              className="text-xs tracking-widest uppercase"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#EB0028",
              }}
            >
              TEDxAlMuntazirSchoolsYouth 2026
            </span>
          </motion.div>

          {/* Main headline */}
          <div className="mb-6">
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold leading-none tracking-tight text-white"
              style={{ fontFamily: "'Dream Orphans', serif" }}
            >
              <AnimatedHeadline text="BORROWED" delay={0.3} />
              <br />
              <AnimatedHeadline
                text="TIME."
                delay={0.5}
                className="text-white/10"
              />
            </h1>
          </div>

          {/* Subheadline */}
          <motion.p
            className="text-white/60 text-lg md:text-xl max-w-xl mb-16"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            None of us choose our arrival. The clock was already running.
            <br />
            <span style={{ color: "#EB0028" }}>
              What will you do with the time that's left?
            </span>
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
          >
            <div
              className="text-xs tracking-widest uppercase text-white/30 mb-6 flex items-center gap-2"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Hourglass size={14} style={{ color: "#EB0028" }} />
              </motion.div>
              Time remaining until the event
            </div>
            <CountdownTimer />
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-4 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Link href="/speakers">
              <motion.button
                className="btn-ted flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Speakers
                <ArrowRight size={16} />
              </motion.button>
            </Link>
            <Link href="/theme">
              <motion.button
                className="btn-outline-ted"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Read Manifesto
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span
            className="text-white/20 text-xs tracking-widest uppercase"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── THEME PREVIEW SECTION ─────────────────────────── */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Text */}
            <div>
              <RevealOnScroll>
                <div
                  className="text-xs tracking-widest uppercase mb-6"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#EB0028",
                  }}
                >
                  — The Theme
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <h2
                  className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Borrowed
                  <br />
                  <span style={{ color: "#EB0028" }}>Time.</span>
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <p
                  className="text-white/50 text-lg leading-relaxed mb-8"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Every second you have lived has been borrowed — from the
                  future, from the planet, from the generations that will
                  inherit whatever we leave behind.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.3}>
                <p
                  className="text-white/30 text-base leading-relaxed mb-10"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Time is not yours. It never was. You are merely its temporary
                  custodian.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.4}>
                <Link href="/theme">
                  <motion.button
                    className="btn-ted flex items-center gap-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Read the Manifesto
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </RevealOnScroll>
            </div>

            {/* Right: Visual element */}
            <RevealOnScroll delay={0.2} className="relative">
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0 lg:ml-auto">
                {/* Outer ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1px solid rgba(235, 0, 40, 0.15)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />
                {/* Middle ring */}
                <motion.div
                  className="absolute inset-8 rounded-full"
                  style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />
                {/* Inner ring */}
                <motion.div
                  className="absolute inset-16 rounded-full"
                  style={{ border: "1px solid rgba(235, 0, 40, 0.1)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div
                    className="text-7xl font-bold mb-2"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#EB0028",
                    }}
                  >
                    2026
                  </div>
                  <div
                    className="text-white/30 text-xs tracking-widest uppercase"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    Borrowed Time
                  </div>
                </div>

                {/* Tick marks */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-full h-full"
                    style={{ rotate: `${i * 30}deg` }}
                  >
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-px"
                      style={{
                        height: i % 3 === 0 ? "12px" : "6px",
                        background:
                          i % 3 === 0
                            ? "rgba(235, 0, 40, 0.5)"
                            : "rgba(255,255,255,0.1)",
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── RED DIVIDER ───────────────────────────────────── */}
      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="h-px"
          style={{ background: "rgba(235, 0, 40, 0.2)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>

      {/* ── THREE SEGMENTS SECTION ────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-16 lg:mb-20">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12" style={{ background: "#EB0028" }} />
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#EB0028",
                  }}
                >
                  Event Structure
                </span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2
                className="text-4xl lg:text-5xl font-bold text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Three Moments
                <br />
                <span className="text-white/30">in Time.</span>
              </h2>
            </RevealOnScroll>
          </div>

          {/* Segment cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {segments.map((segment, i) => (
              <SegmentCard key={segment.id} segment={segment} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE SECTION ─────────────────────────────────── */}
      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{ background: "#EB0028" }}
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <div
              className="text-white/40 text-8xl font-bold leading-none mb-6 select-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              "
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <blockquote
              className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Ideas are the only currency that appreciates with time.
            </blockquote>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <div
              className="text-white/60 text-sm tracking-widest uppercase"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              TEDxAlMuntazirSchoolsYouth 2026
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealOnScroll>
              <div>
                <div
                  className="text-xs tracking-widest uppercase mb-6"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#EB0028",
                  }}
                >
                  — Don't waste it
                </div>
                <h2
                  className="text-4xl lg:text-5xl font-bold text-white mb-6"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Your time is
                  <br />
                  <span style={{ color: "#EB0028" }}>running out.</span>
                </h2>
                <p
                  className="text-white/50 text-lg leading-relaxed"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Join us for a day of ideas that challenge, inspire, and
                  demand action. Six student speakers. Three segments. One
                  urgent question.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="space-y-4">
                <Link href="/speakers">
                  <motion.button
                    className="w-full btn-ted flex items-center justify-between px-8 py-5 text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Meet the Speakers</span>
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <Link href="/theme">
                  <motion.button
                    className="w-full btn-outline-ted flex items-center justify-between px-8 py-5 text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Read the Manifesto</span>
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <Link href="/about">
                  <motion.button
                    className="w-full btn-outline-ted flex items-center justify-between px-8 py-5 text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>About TEDx</span>
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}

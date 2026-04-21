/**
 * Theme Page — "Borrowed Time" Manifesto
 * Design: Editorial parallax page, scroll-reveal text, floating through time
 * Parallax: Multiple depth layers that move at different speeds
 */

import { useRef } from "react";
import { Link } from "wouter";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { themeManifesto } from "@/lib/data";
<<<<<<< HEAD
=======
import { BackgroundPaths } from "@/components/ui/background-paths";
import { LayeredText } from "@/components/ui/layered-text";
>>>>>>> 7c05b59 (feat(docs): add GitHub Pages docs site with showcase for background components and CI workflow)

// ── Parallax Layer ────────────────────────────────────────────
function ParallaxLayer({
  children,
  speed = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// ── Scroll-reveal paragraph ───────────────────────────────────
function RevealParagraph({
  text,
  isLarge = false,
  isQuote = false,
  delay = 0,
}: {
  text: string;
  isLarge?: boolean;
  isQuote?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {isQuote ? (
        <p
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
          style={{ fontFamily: "'Recoleta', serif" }}
        >
          {text}
        </p>
      ) : isLarge ? (
        <p
          className="text-2xl md:text-3xl font-bold leading-tight"
          style={{
            fontFamily: "'Roseblue', serif",
            color: "#EB0028",
          }}
        >
          {text}
        </p>
      ) : (
        <p
          className="text-lg md:text-xl text-white/70 leading-relaxed"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {text}
        </p>
      )}
    </motion.div>
  );
}

// ── Floating time element ─────────────────────────────────────
function FloatingTimeElement({
  value,
  unit,
  x,
  y,
  opacity = 0.04,
}: {
  value: string;
  unit: string;
  x: string;
  y: string;
  opacity?: number;
}) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y, opacity }}
    >
      <div
        className="text-white font-bold"
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "clamp(4rem, 12vw, 14rem)",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        className="text-white/50 text-xs tracking-widest uppercase"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {unit}
      </div>
    </div>
  );
}

// ── Main Theme Page ───────────────────────────────────────────
export default function Theme() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pageRef });

  // Parallax transforms for background layers
  const bgY1 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const bgY3 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  // Determine which paragraphs get special treatment
  const specialIndices = [0, 4, 8, 11]; // "None of us...", "So what...", "But here...", "What will you..."
  const quoteIndices = [0, 4, 8, 11];
  const largeIndices = [2, 6, 10];

  return (
    <div
      ref={pageRef}
      className="min-h-screen relative"
      style={{ background: "#000000" }}
    >
<<<<<<< HEAD
      {/* ── PARALLAX BACKGROUND ─────────────────────────── */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Layer 1: Main background image */}
        <motion.div className="absolute inset-0" style={{ y: bgY1 }}>
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663582999684/647iubpgwR3y9bf7h3fhHY/tedx-theme-parallax-X7t9VCnTjkChuZwwfrvxBa.webp"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.25, transform: "scale(1.2)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)",
            }}
          />
        </motion.div>

        {/* Layer 2: Floating large numbers */}
        <motion.div className="absolute inset-0" style={{ y: bgY2 }}>
          <FloatingTimeElement value="∞" unit="seconds" x="-5%" y="10%" opacity={0.04} />
          <FloatingTimeElement value="24" unit="hours" x="70%" y="30%" opacity={0.04} />
          <FloatingTimeElement value="365" unit="days" x="20%" y="55%" opacity={0.035} />
          <FloatingTimeElement value="2026" unit="year" x="60%" y="70%" opacity={0.04} />
          <FloatingTimeElement value="14.06" unit="june" x="10%" y="80%" opacity={0.03} />
        </motion.div>

        {/* Layer 3: Red gradient accent */}
        <motion.div
          className="absolute inset-0"
          style={{ y: bgY3 }}
        >
          <div
            className="absolute top-1/3 left-0 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "rgba(235, 0, 40, 0.04)" }}
          />
          <div
            className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full blur-3xl"
            style={{ background: "rgba(235, 0, 40, 0.03)" }}
          />
        </motion.div>
=======
      {/* ── CINEMATIC BACKGROUND ─────────────────────────── */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <BackgroundPaths title="" subtitle="" />
>>>>>>> 7c05b59 (feat(docs): add GitHub Pages docs site with showcase for background components and CI workflow)
      </div>

      {/* ── CONTENT ─────────────────────────────────────── */}
      <div className="relative z-10">
        {/* Hero header */}
        <div className="min-h-screen flex flex-col justify-center px-6 lg:px-8 max-w-5xl mx-auto pt-32 pb-20">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <Link href="/">
              <div className="flex items-center gap-2 text-white/30 hover:text-white transition-colors duration-200 w-fit">
                <ArrowLeft size={14} />
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  Back to Home
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Label */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
              The Theme — 2026
            </span>
          </motion.div>

<<<<<<< HEAD
          {/* Title */}
          <motion.h1
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold text-white leading-none tracking-tight mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Borrowed
            <br />
            <span style={{ color: "#EB0028" }}>Time.</span>
          </motion.h1>
=======
          {/* Layered Reveal Title */}
          <div className="mb-12">
            <LayeredText 
              fontSize="clamp(3rem, 10vw, 8rem)"
              lineHeight={100}
              className="text-white select-none"
              lines={[
                { top: "\u00A0", bottom: "BORROWED" },
                { top: "BORROWED", bottom: "TIME." },
                { top: "TIME.", bottom: "2026" },
                { top: "2026", bottom: "\u00A0" },
              ]}
            />
          </div>
>>>>>>> 7c05b59 (feat(docs): add GitHub Pages docs site with showcase for background components and CI workflow)

          {/* Subtitle */}
          <motion.p
            className="text-white/40 text-lg md:text-xl max-w-lg"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            TEDxAlMuntazirSchoolsYouth 2026 — A manifesto on the most
            precious and most wasted resource in the universe.
          </motion.p>

          {/* Scroll prompt */}
          <motion.div
            className="mt-16 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              className="h-px"
              style={{ background: "#EB0028", width: "40px" }}
              animate={{ width: ["40px", "80px", "40px"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span
              className="text-white/20 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Scroll to read
            </span>
          </motion.div>
        </div>

        {/* ── MANIFESTO TEXT ──────────────────────────── */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 pb-32">
          <div className="space-y-16 lg:space-y-20">
            {themeManifesto.paragraphs.map((paragraph, i) => {
              const isQuote = quoteIndices.includes(i);
              const isLarge = largeIndices.includes(i);

              return (
                <div key={i} className="relative">
                  {/* Paragraph number */}
                  <motion.div
                    className="absolute -left-12 top-1 hidden lg:block"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <span
                      className="text-white/10 text-xs"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.div>

                  {/* Red accent for key paragraphs */}
                  {isQuote && (
                    <motion.div
                      className="h-px mb-6"
                      style={{ background: "#EB0028", width: "40px" }}
                      initial={{ width: 0 }}
                      whileInView={{ width: "40px" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    />
                  )}

                  <RevealParagraph
                    text={paragraph}
                    isLarge={isLarge}
                    isQuote={isQuote}
                    delay={0}
                  />
                </div>
              );
            })}
          </div>

          {/* End marker */}
          <motion.div
            className="mt-24 flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="h-px w-full" style={{ background: "rgba(235, 0, 40, 0.3)" }} />
            <div
              className="text-white/20 text-xs tracking-widest uppercase text-center"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              TEDxAlMuntazirSchoolsYouth 2026
              <br />
              Borrowed Time
            </div>
            <div className="h-px w-full" style={{ background: "rgba(235, 0, 40, 0.3)" }} />
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-16 flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/speakers">
              <motion.button
                className="btn-ted flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Meet the Speakers
                <ArrowRight size={16} />
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                className="btn-outline-ted"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                About TEDx
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

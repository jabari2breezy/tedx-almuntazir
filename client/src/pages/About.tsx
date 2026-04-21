/**
 * About TED Page — TEDx Compliance
 * Design: Clean editorial layout, two sections (TED + TEDx), event-specific section
 * Content: Standard TED boilerplate + TEDxAlMuntazirSchoolsYouth specifics
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Globe, Users, Lightbulb, Heart } from "lucide-react";

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
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function StatCard({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="text-center p-8"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div
        className="text-4xl lg:text-5xl font-bold mb-2"
        style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#EB0028" }}
      >
        {value}
      </div>
      <div
        className="text-white/40 text-xs tracking-widest uppercase"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {label}
      </div>
    </motion.div>
  );
}

function FeatureItem({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="flex gap-5"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div
        className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1"
        style={{
          background: "rgba(235, 0, 40, 0.1)",
          border: "1px solid rgba(235, 0, 40, 0.2)",
        }}
      >
        <Icon size={16} style={{ color: "#EB0028" }} />
      </div>
      <div>
        <h4
          className="text-white font-bold text-base mb-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {title}
        </h4>
        <p
          className="text-white/50 text-sm leading-relaxed"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <div
      className="min-h-screen relative"
      style={{ background: "#000000" }}
    >
      {/* ── PAGE HEADER ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
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

        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="h-px w-12" style={{ background: "#EB0028" }} />
          <span
            className="text-xs tracking-widest uppercase"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "#EB0028",
            }}
          >
            About
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl lg:text-7xl font-bold text-white leading-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Ideas Worth
          <br />
          <span style={{ color: "#EB0028" }}>Spreading.</span>
        </motion.h1>
      </div>

      {/* ── WHAT IS TED ──────────────────────────────────── */}
      <section
        className="py-20 lg:py-28"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left */}
            <div>
              <RevealOnScroll>
                <div
                  className="text-xs tracking-widest uppercase mb-6"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#EB0028",
                  }}
                >
                  — Section 01
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <h2
                  className="text-4xl lg:text-5xl font-bold text-white mb-8"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  What is TED?
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <p
                  className="text-white/60 text-lg leading-relaxed mb-6"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  TED is a nonprofit organization devoted to spreading ideas, usually in the form of short, powerful talks (18 minutes or less). TED began in 1984 as a conference where Technology, Entertainment and Design converged, and today covers almost all topics — from science to business to global issues — in more than 100 languages.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.3}>
                <p
                  className="text-white/40 text-base leading-relaxed mb-8"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Meanwhile, independently run TEDx events help share ideas in communities around the world. TED's mission is to discover and spread ideas that spark imagination, embrace possibility and catalyze impact.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.4}>
                <div className="space-y-6">
                  <FeatureItem
                    icon={Lightbulb}
                    title="Ideas Worth Spreading"
                    description="TED's core mission is to discover and spread ideas that spark imagination, embrace possibility, and catalyze impact across every domain of human knowledge."
                    delay={0}
                  />
                  <FeatureItem
                    icon={Globe}
                    title="Global Reach"
                    description="With talks in over 100 languages and millions of views worldwide, TED has become the world's most trusted platform for ideas that matter."
                    delay={0.1}
                  />
                </div>
              </RevealOnScroll>
            </div>

            {/* Right: Stats */}
            <RevealOnScroll delay={0.2}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <StatCard value="3,500+" label="Talks Online" delay={0.1} />
                  <StatCard value="100+" label="Languages" delay={0.2} />
                  <StatCard value="1984" label="Founded" delay={0.3} />
                  <StatCard value="1B+" label="Views" delay={0.4} />
                </div>

                {/* TED quote */}
                <div
                  className="p-8 mt-4"
                  style={{
                    background: "rgba(235, 0, 40, 0.05)",
                    border: "1px solid rgba(235, 0, 40, 0.15)",
                  }}
                >
                  <div
                    className="text-white/20 text-4xl font-bold mb-4"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    "
                  </div>
                  <p
                    className="text-white/70 text-lg leading-relaxed italic"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Riveting talks by remarkable people, free to the world.
                  </p>
                  <div
                    className="mt-4 text-white/30 text-xs tracking-widest uppercase"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    — TED
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Red divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-px" style={{ background: "rgba(235, 0, 40, 0.2)" }} />
      </div>

      {/* ── WHAT IS TEDX ─────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: Visual */}
            <RevealOnScroll className="order-2 lg:order-1">
              <div className="space-y-4">
                {/* TEDx explanation cards */}
                {[
                  {
                    title: "Independently Organized",
                    desc: "TEDx events are planned and coordinated independently, on a community-by-community basis, under a free license granted by TED.",
                  },
                  {
                    title: "TED-like Experience",
                    desc: "In the spirit of ideas worth spreading, TEDx brings people together to share a TED-like experience — live talks, performances, and discussions.",
                  },
                  {
                    title: "Local Impact",
                    desc: "Each TEDx event is tailored to the local community, addressing issues and ideas that matter most to the people in that place.",
                  },
                  {
                    title: "Global Network",
                    desc: "TEDx events take place in over 170 countries, creating a worldwide network of local conversations that collectively advance human understanding.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="p-6"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderLeft: "2px solid #EB0028",
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <h4
                      className="text-white font-bold text-sm mb-2"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-white/40 text-sm leading-relaxed"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </RevealOnScroll>

            {/* Right */}
            <div className="order-1 lg:order-2">
              <RevealOnScroll>
                <div
                  className="text-xs tracking-widest uppercase mb-6"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#EB0028",
                  }}
                >
                  — Section 02
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <h2
                  className="text-4xl lg:text-5xl font-bold text-white mb-8"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  What is TED
                  <span style={{ color: "#EB0028" }}>x</span>?
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <p
                  className="text-white/60 text-lg leading-relaxed mb-6"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  In the spirit of ideas worth spreading, TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. At a TEDx event, TED Talks video and live speakers combine to spark deep discussion and connection in a small group.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.3}>
                <p
                  className="text-white/40 text-base leading-relaxed mb-8"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  These local, self-organized events are branded TEDx, where x = independently organized TED event. The TED Conference provides general guidance for the TEDx program, but individual TEDx events are self-organized.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.4}>
                <div
                  className="p-6"
                  style={{
                    background: "rgba(235, 0, 40, 0.05)",
                    border: "1px solid rgba(235, 0, 40, 0.15)",
                  }}
                >
                  <div
                    className="text-white/30 text-xs tracking-widest uppercase mb-3"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    License Statement
                  </div>
                  <p
                    className="text-white/50 text-sm leading-relaxed"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    This independent TEDx event is operated under license from TED. In the spirit of ideas worth spreading, TEDx is a program of local, self-organized events that bring people together to share a TED-like experience.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Red divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-px" style={{ background: "rgba(235, 0, 40, 0.2)" }} />
      </div>

      {/* ── ABOUT TEDX ALMUNTAZIR ─────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <RevealOnScroll>
            <div
              className="text-xs tracking-widest uppercase mb-6"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#EB0028",
              }}
            >
              — Section 03
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2
              className="text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              TEDx
              <span style={{ color: "#EB0028" }}>AlMuntazir</span>
              <br />
              SchoolsYouth
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div
              className="text-xs tracking-widest uppercase mb-12"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Dar es Salaam, Tanzania — 2026
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <RevealOnScroll delay={0.1} className="lg:col-span-2">
              <p
                className="text-white/60 text-lg leading-relaxed mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                TEDxAlMuntazirSchoolsYouth is an independently organized TEDx event hosted by the students of Al Muntazir Schools in Dar es Salaam, Tanzania. This event is entirely student-led — from curation to production — representing the next generation of thinkers, builders, and change-makers.
              </p>
              <p
                className="text-white/40 text-base leading-relaxed mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Our 2026 event, themed "Borrowed Time," brings together six student speakers across three thematic segments — The Past, The Present, and The Future — to explore humanity's most complex and urgent relationship: our relationship with time itself.
              </p>
              <p
                className="text-white/40 text-base leading-relaxed"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                We believe that young people have not only the right but the responsibility to engage with the world's most pressing questions. TEDxAlMuntazirSchoolsYouth is our platform to do exactly that.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="space-y-4">
                {[
                  { icon: Users, title: "Student-Led", desc: "Entirely organized and produced by students of Al Muntazir Schools." },
                  { icon: Lightbulb, title: "Ideas First", desc: "Every talk is selected for the power and originality of its central idea." },
                  { icon: Heart, title: "Community Rooted", desc: "Grounded in the Dar es Salaam community, with global ambitions." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-4 p-5"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div
                      className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(235, 0, 40, 0.1)",
                        border: "1px solid rgba(235, 0, 40, 0.2)",
                      }}
                    >
                      <item.icon size={14} style={{ color: "#EB0028" }} />
                    </div>
                    <div>
                      <div
                        className="text-white text-sm font-bold mb-1"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {item.title}
                      </div>
                      <div
                        className="text-white/40 text-xs leading-relaxed"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          {/* CTA */}
          <RevealOnScroll delay={0.2}>
            <div className="flex flex-wrap gap-4">
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
              <Link href="/theme">
                <motion.button
                  className="btn-outline-ted"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Read the Manifesto
                </motion.button>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}

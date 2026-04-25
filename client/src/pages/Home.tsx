import { useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Hourglass,
  Sparkles,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import { segments, speakers } from "@/lib/data";
import { TemporalShader } from "@/components/ui/TemporalShader";
import { VerticalTabs } from "@/components/ui/vertical-tabs";
import { SmokeBackground } from "@/components/ui/spooky-smoke-animation";

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
        <span key={wi} className="mr-[0.25em] inline-block overflow-hidden">
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
      <Link href={`/speakers?segment=${segment.id}`}>
        <div
          className="group relative cursor-pointer overflow-hidden p-8 lg:p-10"
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
          <div
            className="pointer-events-none absolute -top-4 -right-2 select-none text-8xl font-bold"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "rgba(235, 0, 40, 0.06)",
              lineHeight: 1,
            }}
          >
            {segment.number}
          </div>

          <div
            className="mb-4 text-xs uppercase tracking-widest"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "#EB0028",
            }}
          >
            Segment {segment.number}
          </div>

          <h3
            className="mb-3 text-2xl font-bold text-white lg:text-3xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {segment.label}
          </h3>

          <div
            className="mb-5 text-xs uppercase tracking-widest text-white/30"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {segment.theme}
          </div>

          <p
            className="mb-8 text-sm leading-relaxed text-white/50"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {segment.description}
          </p>

          <div className="flex items-center justify-between">
            <div
              className="text-xs text-white/30"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {segment.speakers.length} speakers
            </div>
            <div
              className="group-hover:text-white flex items-center gap-2 text-white/40 transition-colors duration-300"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.7rem",
              }}
            >
              <span className="uppercase tracking-widest">Explore</span>
              <ArrowRight
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
            style={{ background: "#EB0028" }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

function ExperiencePlanner() {
  const [selectedSegment, setSelectedSegment] = useState<(typeof segments)[number]["id"]>("present");
  const [urgency, setUrgency] = useState(72);

  const selected = useMemo(
    () => segments.find((segment) => segment.id === selectedSegment) ?? segments[1],
    [selectedSegment],
  );

  const visibleSpeakers = useMemo(
    () => speakers.filter((speaker) => speaker.segment === selectedSegment && !speaker.isPlaceholder),
    [selectedSegment],
  );

  const urgencyCopy =
    urgency < 35
      ? "A slower entry point: reflective, thoughtful, and grounded in context."
      : urgency < 70
        ? "A balanced route through the event: equal parts reflection and action."
        : "The sharpest edge of the theme: urgent, challenging, and built to provoke movement.";

  const timeLens =
    selectedSegment === "past"
      ? "Start with memory, legacy, and the stories we inherited."
      : selectedSegment === "present"
        ? "Sit in the tension of now, where choice becomes action."
        : "Lean into consequence, possibility, and what we leave behind.";

  const talkIntensity = Math.round((urgency / 100) * 18);

  return (
    <section
      className="py-24 lg:py-28"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <RevealOnScroll>
            <div
              className="mb-5 flex items-center gap-3 text-xs uppercase tracking-widest"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#EB0028",
              }}
            >
              <Sparkles size={13} />
              Explore the experience
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2
              className="mb-5 text-4xl font-bold text-white lg:text-5xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Shape your way into
              <span style={{ color: "#EB0028" }}> Borrowed Time.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p
              className="text-lg leading-relaxed text-white/50"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Choose a lens, tune the intensity, and preview the conversation you
              want to step into before you reach the full lineup.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealOnScroll>
            <div
              className="overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
              }}
            >
              <div
                className="grid grid-cols-1 border-b md:grid-cols-3"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                {segments.map((segment) => {
                  const isActive = segment.id === selectedSegment;
                  return (
                    <button
                      key={segment.id}
                      type="button"
                      className="px-5 py-5 text-left transition-colors duration-200"
                      onClick={() => setSelectedSegment(segment.id)}
                      style={{
                        background: isActive ? "rgba(235,0,40,0.08)" : "transparent",
                        borderRight: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <div
                        className="mb-2 text-xs uppercase tracking-widest"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          color: isActive ? "#EB0028" : "rgba(255,255,255,0.3)",
                        }}
                      >
                        {segment.number}
                      </div>
                      <div
                        className="mb-1 text-lg font-bold"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.7)",
                        }}
                      >
                        {segment.label}
                      </div>
                      <div
                        className="text-xs"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          color: "rgba(255,255,255,0.25)",
                        }}
                      >
                        {segment.theme}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-8 p-6 lg:grid-cols-[1fr_0.8fr] lg:p-8">
                <div>
                  <div
                    className="mb-5 flex items-center gap-2 text-xs uppercase tracking-widest text-white/30"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    <SlidersHorizontal size={13} style={{ color: "#EB0028" }} />
                    Set the energy
                  </div>

                  <div className="mb-3 flex items-end justify-between gap-4">
                    <div>
                      <div
                        className="text-3xl font-bold text-white"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {urgency}%
                      </div>
                      <div
                        className="text-xs uppercase tracking-widest text-white/30"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        Urgency setting
                      </div>
                    </div>
                    <div
                      className="text-right text-xs uppercase tracking-widest"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "#EB0028",
                      }}
                    >
                      {selected.theme}
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={urgency}
                    onChange={(event) => setUrgency(Number(event.target.value))}
                    className="mb-5 w-full accent-[#EB0028]"
                    aria-label="Adjust urgency"
                  />

                  <p
                    className="mb-8 max-w-xl text-base leading-relaxed text-white/55"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {urgencyCopy}
                  </p>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div
                      className="p-4"
                      style={{
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      <div
                        className="mb-2 text-xs uppercase tracking-widest text-white/30"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        Recommended segment
                      </div>
                      <div
                        className="text-lg font-bold text-white"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {selected.label}
                      </div>
                    </div>
                    <div
                      className="p-4"
                      style={{
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      <div
                        className="mb-2 text-xs uppercase tracking-widest text-white/30"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        Live speakers
                      </div>
                      <div
                        className="text-lg font-bold text-white"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {visibleSpeakers.length}
                      </div>
                    </div>
                    <div
                      className="p-4"
                      style={{
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      <div
                        className="mb-2 text-xs uppercase tracking-widest text-white/30"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        Talk intensity
                      </div>
                      <div
                        className="text-lg font-bold text-white"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {talkIntensity}/18
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="relative overflow-hidden p-6"
                  style={{
                    border: "1px solid rgba(235,0,40,0.15)",
                    background: "rgba(235,0,40,0.05)",
                  }}
                >
                  <div
                    className="mb-3 text-xs uppercase tracking-widest"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#EB0028",
                    }}
                  >
                    Your preview
                  </div>
                  <h3
                    className="mb-3 text-2xl font-bold text-white"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {selected.label} feels like the right entry point.
                  </h3>
                  <p
                    className="mb-6 text-sm leading-relaxed text-white/65"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {timeLens}
                  </p>

                  <div className="mb-6 space-y-3">
                    {visibleSpeakers.map((speaker) => (
                      <div
                        key={speaker.id}
                        className="flex items-start justify-between gap-3"
                      >
                        <div>
                          <div
                            className="text-sm font-bold text-white"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            {speaker.name}
                          </div>
                          <div
                            className="text-xs text-white/35"
                            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                          >
                            {speaker.talkTitle}
                          </div>
                        </div>
                        <div
                          className="pt-1 text-[10px] uppercase tracking-widest"
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            color: "#EB0028",
                          }}
                        >
                          {speaker.topic}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className="mb-6 h-px w-full"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  />

                  <div className="mb-6 flex items-center gap-3">
                    <Users size={14} style={{ color: "#EB0028" }} />
                    <div
                      className="text-xs uppercase tracking-widest text-white/35"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      Best for visitors who want ideas with immediate emotional traction
                    </div>
                  </div>

                  <Link href={`/speakers?segment=${selected.id}`}>
                    <motion.button
                      className="btn-ted flex w-full items-center justify-between gap-2"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Explore this segment
                      <ArrowRight size={16} />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen" style={{ background: "#000000" }}>
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <SmokeBackground smokeColor="#808080" />
      </div>

      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <TemporalShader className="opacity-60" speed={0.4} />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.95) 100%)",
            }}
          />
        </div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            className="mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="h-px w-12" style={{ background: "#EB0028" }} />
            <span
              className="text-xs uppercase tracking-widest"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#EB0028",
              }}
            >
              TEDxAlMuntazirSchoolsYouth 2026
            </span>
          </motion.div>

          <div className="mb-6">
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold leading-none tracking-tight text-white"
              style={{ fontFamily: "'Helvetica Serif', serif" }}
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

          <motion.p
            className="mb-16 max-w-xl text-lg text-white/60 md:text-xl"
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
          >
            <div
              className="mb-6 flex items-center gap-2 text-xs uppercase tracking-widest text-white/30"
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

          <motion.div
            className="mt-12 flex flex-wrap items-center gap-4"
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

        <motion.div
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span
            className="text-xs uppercase tracking-widest text-white/20"
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

      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <RevealOnScroll>
                <div
                  className="mb-6 text-xs uppercase tracking-widest"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#EB0028",
                  }}
                >
                  The Theme
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <h2
                  className="mb-8 text-5xl font-bold leading-tight text-white lg:text-6xl"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Borrowed
                  <br />
                  <span style={{ color: "#EB0028" }}>Time.</span>
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <p
                  className="mb-8 text-lg leading-relaxed text-white/50"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Every second you have lived has been borrowed - from the
                  future, from the planet, from the generations that will
                  inherit whatever we leave behind.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.3}>
                <p
                  className="mb-10 text-base leading-relaxed text-white/30"
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

            <RevealOnScroll delay={0.2} className="relative">
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0 lg:ml-auto">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: "1px solid rgba(235, 0, 40, 0.15)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-8 rounded-full"
                  style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-16 rounded-full"
                  style={{ border: "1px solid rgba(235, 0, 40, 0.1)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div
                    className="mb-2 text-7xl font-bold"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#EB0028",
                    }}
                  >
                    2026
                  </div>
                  <div
                    className="text-xs uppercase tracking-widest text-white/30"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    Borrowed Time
                  </div>
                </div>

                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-full w-full"
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

      <ExperiencePlanner />

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

      <section className="bg-black">
        <VerticalTabs />
      </section>

      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{ background: "#EB0028" }}
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <div
              className="mb-6 select-none text-8xl font-bold leading-none text-white/40"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              "
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <blockquote
              className="mb-8 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Ideas are the only currency that appreciates with time.
            </blockquote>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <div
              className="text-sm uppercase tracking-widest text-white/60"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              TEDxAlMuntazirSchoolsYouth 2026
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {segments.map((segment, index) => (
              <SegmentCard key={segment.id} segment={segment} index={index} />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-12 items-center pt-20 lg:grid-cols-2">
            <RevealOnScroll>
              <div>
                <div
                  className="mb-6 text-xs uppercase tracking-widest"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#EB0028",
                  }}
                >
                  Don't waste it
                </div>
                <h2
                  className="mb-6 text-4xl font-bold text-white lg:text-5xl"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Your time is
                  <br />
                  <span style={{ color: "#EB0028" }}>running out.</span>
                </h2>
                <p
                  className="text-lg leading-relaxed text-white/50"
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
                    className="btn-ted flex w-full items-center justify-between px-8 py-5 text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Meet the Speakers</span>
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <Link href="/theme">
                  <motion.button
                    className="btn-outline-ted flex w-full items-center justify-between px-8 py-5 text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Read the Manifesto</span>
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <Link href="/about">
                  <motion.button
                    className="btn-outline-ted flex w-full items-center justify-between px-8 py-5 text-base"
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

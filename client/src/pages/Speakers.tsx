/**
 * Speakers Page — Dynamic 3-Segment Timeline
 * Design: Tab system (Past/Present/Future), speaker cards with dialog
 * Interaction: Click card → Shadcn Dialog with full bio and talk description
 */

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowLeft, Clock, Users, Mic, X, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { speakers, segments, type Speaker } from "@/lib/data";

// ── Speaker Avatar ────────────────────────────────────────────
function SpeakerAvatar({
  speaker,
  size = "md",
}: {
  speaker: Speaker;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "w-12 h-12 text-sm",
    md: "w-16 h-16 text-lg",
    lg: "w-24 h-24 text-2xl",
  };

  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-bold flex-shrink-0`}
      style={{
        background: speaker.isPlaceholder
          ? "rgba(255,255,255,0.05)"
          : "rgba(235, 0, 40, 0.15)",
        border: speaker.isPlaceholder
          ? "1px dashed rgba(255,255,255,0.15)"
          : "1px solid rgba(235, 0, 40, 0.3)",
        fontFamily: "'Space Grotesk', sans-serif",
        color: speaker.isPlaceholder ? "rgba(255,255,255,0.3)" : "#EB0028",
      }}
    >
      {speaker.initials}
    </div>
  );
}

// ── Speaker Card ──────────────────────────────────────────────
function SpeakerCard({
  speaker,
  index,
  onClick,
}: {
  speaker: Speaker;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        className="speaker-card p-6 lg:p-8 cursor-pointer relative overflow-hidden group"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderRadius: "2px",
        }}
        onClick={onClick}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Hover red glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top left, rgba(235,0,40,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Placeholder badge */}
        {speaker.isPlaceholder && (
          <div
            className="absolute top-4 right-4 text-xs px-2 py-1 tracking-widest uppercase"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "rgba(255,255,255,0.2)",
              border: "1px dashed rgba(255,255,255,0.1)",
              fontSize: "0.6rem",
            }}
          >
            TBA
          </div>
        )}

        {/* Alumni badge */}
        {speaker.isAlumni && (
          <div
            className="absolute top-4 right-4 text-xs px-2 py-1 tracking-widest uppercase"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "#EB0028",
              border: "1px solid rgba(235, 0, 40, 0.3)",
              fontSize: "0.6rem",
              background: "rgba(235, 0, 40, 0.05)",
            }}
          >
            Alumni
          </div>
        )}

        <div className="flex items-start gap-5">
          <SpeakerAvatar speaker={speaker} size="md" />

          <div className="flex-1 min-w-0">
            {/* Topic tag */}
            <div
              className="text-xs tracking-widest uppercase mb-2"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: speaker.isPlaceholder
                  ? "rgba(255,255,255,0.2)"
                  : "#EB0028",
              }}
            >
              {speaker.topic}
            </div>

            {/* Name */}
            <h3
              className="text-xl font-bold text-white mb-1 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {speaker.name}
            </h3>

            {/* Talk title */}
            <p
              className="text-white/40 text-sm leading-snug mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              "{speaker.talkTitle}"
            </p>

            {/* Read more */}
            <div
              className="flex items-center gap-2 text-white/30 group-hover:text-white/60 transition-colors duration-300"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
              }}
            >
              <span className="tracking-widest uppercase">
                {speaker.isPlaceholder ? "Details TBA" : "Read Bio"}
              </span>
              {!speaker.isPlaceholder && (
                <ChevronRight
                  size={10}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              )}
            </div>
          </div>
        </div>

        {/* Bottom red line — animates on hover */}
        <div
          className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
          style={{ background: "#EB0028" }}
        />
      </motion.div>
    </motion.div>
  );
}

// ── Speaker Dialog ────────────────────────────────────────────
function SpeakerDialog({
  speaker,
  open,
  onClose,
}: {
  speaker: Speaker | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!speaker) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl border-0 p-0 overflow-hidden"
        style={{ background: "#0A0A0A", borderRadius: "2px" }}
      >
        {/* Red top bar */}
        <div className="h-1 w-full" style={{ background: "#EB0028" }} />

        <div className="p-8 lg:p-10">
          <DialogHeader className="mb-8">
            <div className="flex items-start gap-6">
              <SpeakerAvatar speaker={speaker} size="lg" />
              <div className="flex-1">
                {/* Topic */}
                <div
                  className="text-xs tracking-widest uppercase mb-3"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#EB0028",
                  }}
                >
                  {speaker.topic}
                  {speaker.isAlumni && (
                    <span className="ml-3 text-white/30">· Alumni</span>
                  )}
                </div>

                <DialogTitle
                  className="text-2xl lg:text-3xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {speaker.name}
                </DialogTitle>

                <p
                  className="text-white/40 text-sm"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  "{speaker.talkTitle}"
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* Divider */}
          <div
            className="h-px w-full mb-8"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />

          {/* Bio */}
          <div className="mb-8">
            <div
              className="text-xs tracking-widest uppercase mb-4 flex items-center gap-2"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              <Users size={10} />
              About the Speaker
            </div>
            <p
              className="text-white/60 text-base leading-relaxed"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {speaker.bio}
            </p>
          </div>

          {/* Talk description */}
          <div
            className="p-6 relative"
            style={{
              background: "rgba(235, 0, 40, 0.04)",
              border: "1px solid rgba(235, 0, 40, 0.15)",
            }}
          >
            <div
              className="text-xs tracking-widest uppercase mb-4 flex items-center gap-2"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#EB0028",
              }}
            >
              <Mic size={10} />
              The Talk
            </div>
            <p
              className="text-white/70 text-base leading-relaxed"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {speaker.talkDescription}
            </p>
          </div>

          {/* Segment badge */}
          <div className="mt-6 flex items-center justify-between">
            <div
              className="text-white/20 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Segment:{" "}
              <span className="text-white/40">
                The {speaker.segment.charAt(0).toUpperCase() + speaker.segment.slice(1)}
              </span>
            </div>
            {speaker.isPlaceholder && (
              <div
                className="text-xs tracking-widest uppercase"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "rgba(255,255,255,0.2)",
                }}
              >
                Speaker TBA
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Segment Tab ───────────────────────────────────────────────
function SegmentTab({
  segment,
  isActive,
  onClick,
}: {
  segment: (typeof segments)[0];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      className="relative px-6 py-4 text-left group"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute inset-0"
          style={{ background: "rgba(235, 0, 40, 0.08)", border: "1px solid rgba(235, 0, 40, 0.3)" }}
          layoutId="active-tab"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      <div className="relative z-10">
        <div
          className="text-xs tracking-widest uppercase mb-1"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            color: isActive ? "#EB0028" : "rgba(255,255,255,0.2)",
          }}
        >
          {segment.number}
        </div>
        <div
          className="text-sm font-bold"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.4)",
          }}
        >
          {segment.label}
        </div>
        <div
          className="text-xs mt-1 hidden sm:block"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            color: isActive ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)",
          }}
        >
          {segment.theme}
        </div>
      </div>
    </motion.button>
  );
}

// ── Main Speakers Page ────────────────────────────────────────
export default function Speakers() {
  const [activeSegment, setActiveSegment] = useState<string>("past");
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const currentSegment = segments.find((s) => s.id === activeSegment)!;
  const currentSpeakers = speakers.filter((s) => s.segment === activeSegment);

  const handleSpeakerClick = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setDialogOpen(true);
  };

  return (
    <div
      className="min-h-screen relative"
      style={{ background: "#000000" }}
    >
      {/* Background texture */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      >
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663582999684/647iubpgwR3y9bf7h3fhHY/tedx-speakers-bg-GmeYhJM4W6nvFCfe3mbDd7.webp"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.3 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.7)" }}
        />
      </div>

      <div className="relative z-10">
        {/* ── PAGE HEADER ──────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
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
                  Speaker Timeline
                </span>
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                The Voices
                <br />
                <span style={{ color: "#EB0028" }}>of Time.</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p
                className="text-white/40 text-lg leading-relaxed mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Six student speakers. Three segments. One urgent question: what
                will you do with the time that's left?
              </p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div
                    className="text-3xl font-bold"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#EB0028",
                    }}
                  >
                    6
                  </div>
                  <div
                    className="text-white/30 text-xs tracking-widest uppercase"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    Speakers
                  </div>
                </div>
                <div
                  className="h-8 w-px"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                />
                <div className="text-center">
                  <div
                    className="text-3xl font-bold"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#EB0028",
                    }}
                  >
                    3
                  </div>
                  <div
                    className="text-white/30 text-xs tracking-widest uppercase"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    Segments
                  </div>
                </div>
                <div
                  className="h-8 w-px"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                />
                <div className="text-center">
                  <div
                    className="text-3xl font-bold"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#EB0028",
                    }}
                  >
                    1
                  </div>
                  <div
                    className="text-white/30 text-xs tracking-widest uppercase"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    Theme
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── SEGMENT TABS ─────────────────────────────── */}
        <div
          className="sticky top-16 lg:top-20 z-30"
          style={{
            background: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-stretch gap-0">
              {segments.map((segment) => (
                <SegmentTab
                  key={segment.id}
                  segment={segment}
                  isActive={activeSegment === segment.id}
                  onClick={() => setActiveSegment(segment.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── SEGMENT CONTENT ──────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSegment}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Segment header */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="text-5xl font-bold"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "rgba(235, 0, 40, 0.15)",
                    }}
                  >
                    {currentSegment.number}
                  </span>
                  <div>
                    <h2
                      className="text-3xl font-bold text-white"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {currentSegment.label}
                    </h2>
                    <div
                      className="text-xs tracking-widest uppercase mt-1"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "#EB0028",
                      }}
                    >
                      {currentSegment.theme}
                    </div>
                  </div>
                </div>
                <p
                  className="text-white/40 text-base max-w-2xl"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {currentSegment.description}
                </p>
              </div>

              {/* Speaker grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {currentSpeakers.map((speaker, i) => (
                  <SpeakerCard
                    key={speaker.id}
                    speaker={speaker}
                    index={i}
                    onClick={() => handleSpeakerClick(speaker)}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── ALL SPEAKERS OVERVIEW ─────────────────────── */}
        <div
          className="border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="mb-10">
              <div
                className="text-xs tracking-widest uppercase mb-4"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "#EB0028",
                }}
              >
                All Speakers
              </div>
              <h3
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                The Complete Lineup
              </h3>
            </div>

            <div className="space-y-2">
              {speakers
                .filter((s) => !s.isPlaceholder)
                .map((speaker, i) => (
                  <motion.div
                    key={speaker.id}
                    className="flex items-center gap-6 py-4 px-6 group cursor-pointer"
                    style={{
                      border: "1px solid rgba(255,255,255,0.04)",
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => handleSpeakerClick(speaker)}
                    whileHover={{
                      borderColor: "rgba(235, 0, 40, 0.3)",
                      backgroundColor: "rgba(235, 0, 40, 0.03)",
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span
                      className="text-white/20 text-xs w-6"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <SpeakerAvatar speaker={speaker} size="sm" />
                    <div className="flex-1">
                      <div
                        className="text-white font-bold text-sm"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {speaker.name}
                      </div>
                      <div
                        className="text-white/30 text-xs"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        {speaker.talkTitle}
                      </div>
                    </div>
                    <div
                      className="text-xs tracking-widest uppercase hidden sm:block"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "#EB0028",
                      }}
                    >
                      {speaker.topic}
                    </div>
                    <div
                      className="text-xs tracking-widest uppercase hidden md:block"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "rgba(255,255,255,0.2)",
                      }}
                    >
                      The {speaker.segment.charAt(0).toUpperCase() + speaker.segment.slice(1)}
                    </div>
                    <ChevronRight
                      size={14}
                      className="text-white/20 group-hover:text-white/50 transition-colors"
                    />
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Speaker Dialog */}
      <SpeakerDialog
        speaker={selectedSpeaker}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
}

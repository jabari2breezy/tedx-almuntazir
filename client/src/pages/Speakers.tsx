import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  Clock,
  Mic,
  Search,
  Users,
  X,
} from "lucide-react";
import { Link } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { speakers, segments, type Speaker } from "@/lib/data";

const FAVORITES_STORAGE_KEY = "tedx-almuntazir-saved-speakers";

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

function SaveButton({
  saved,
  onClick,
}: {
  saved: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-widest transition-colors"
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        color: saved ? "#EB0028" : "rgba(255,255,255,0.45)",
        border: saved
          ? "1px solid rgba(235, 0, 40, 0.35)"
          : "1px solid rgba(255,255,255,0.1)",
        background: saved ? "rgba(235,0,40,0.08)" : "rgba(255,255,255,0.02)",
      }}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label={saved ? "Remove from shortlist" : "Save to shortlist"}
    >
      {saved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
      {saved ? "Saved" : "Save"}
    </button>
  );
}

function SpeakerCard({
  speaker,
  index,
  saved,
  onClick,
  onToggleSave,
}: {
  speaker: Speaker;
  index: number;
  saved: boolean;
  onClick: () => void;
  onToggleSave: () => void;
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
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        className="speaker-card group relative cursor-pointer overflow-hidden p-6 lg:p-8"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderRadius: "2px",
        }}
        onClick={onClick}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse at top left, rgba(235,0,40,0.06) 0%, transparent 70%)",
          }}
        />

        {speaker.isPlaceholder && (
          <div
            className="absolute top-4 right-4 px-2 py-1 text-xs uppercase tracking-widest"
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

        {speaker.isAlumni && !speaker.isPlaceholder && (
          <div
            className="absolute top-4 right-4 px-2 py-1 text-xs uppercase tracking-widest"
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
            <div
              className="mb-2 text-xs uppercase tracking-widest"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: speaker.isPlaceholder ? "rgba(255,255,255,0.2)" : "#EB0028",
              }}
            >
              {speaker.topic}
            </div>

            <h3
              className="mb-1 text-xl font-bold leading-tight text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {speaker.name}
            </h3>

            <p
              className="mb-4 text-sm leading-snug text-white/40"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              "{speaker.talkTitle}"
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <div
                className="group-hover:text-white/60 flex items-center gap-2 text-white/30 transition-colors duration-300"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.65rem",
                }}
              >
                <span className="uppercase tracking-widest">
                  {speaker.isPlaceholder ? "Details TBA" : "Read Bio"}
                </span>
                {!speaker.isPlaceholder && (
                  <ChevronRight
                    size={10}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </div>

              {!speaker.isPlaceholder && (
                <SaveButton saved={saved} onClick={onToggleSave} />
              )}
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
          style={{ background: "#EB0028" }}
        />
      </motion.div>
    </motion.div>
  );
}

function SpeakerDialog({
  speaker,
  open,
  saved,
  onClose,
  onToggleSave,
}: {
  speaker: Speaker | null;
  open: boolean;
  saved: boolean;
  onClose: () => void;
  onToggleSave: () => void;
}) {
  if (!speaker) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl overflow-hidden border-0 p-0"
        style={{ background: "#0A0A0A", borderRadius: "2px" }}
      >
        <div className="h-1 w-full" style={{ background: "#EB0028" }} />

        <div className="p-8 lg:p-10">
          <DialogHeader className="mb-8">
            <div className="flex items-start gap-6">
              <SpeakerAvatar speaker={speaker} size="lg" />
              <div className="flex-1">
                <div
                  className="mb-3 text-xs uppercase tracking-widest"
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
                  className="mb-2 text-2xl font-bold text-white lg:text-3xl"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {speaker.name}
                </DialogTitle>

                <p
                  className="text-sm text-white/40"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  "{speaker.talkTitle}"
                </p>
              </div>
            </div>
          </DialogHeader>

          <div
            className="mb-8 h-px w-full"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />

          <div className="mb-8">
            <div
              className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              <Users size={10} />
              About the Speaker
            </div>
            <p
              className="text-base leading-relaxed text-white/60"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {speaker.bio}
            </p>
          </div>

          <div
            className="relative p-6"
            style={{
              background: "rgba(235, 0, 40, 0.04)",
              border: "1px solid rgba(235, 0, 40, 0.15)",
            }}
          >
            <div
              className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#EB0028",
              }}
            >
              <Mic size={10} />
              The Talk
            </div>
            <p
              className="text-base leading-relaxed text-white/70"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {speaker.talkDescription}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div
              className="text-xs uppercase tracking-widest text-white/20"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Segment:{" "}
              <span className="text-white/40">
                The {speaker.segment.charAt(0).toUpperCase() + speaker.segment.slice(1)}
              </span>
            </div>

            {!speaker.isPlaceholder && (
              <SaveButton saved={saved} onClick={onToggleSave} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
      className="group relative px-6 py-4 text-left"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: "rgba(235, 0, 40, 0.08)",
            border: "1px solid rgba(235, 0, 40, 0.3)",
          }}
          layoutId="active-tab"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      <div className="relative z-10">
        <div
          className="mb-1 text-xs uppercase tracking-widest"
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
          className="mt-1 hidden text-xs sm:block"
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

export default function Speakers() {
  const [activeSegment, setActiveSegment] = useState<string>("past");
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState("all");
  const [savedSpeakerIds, setSavedSpeakerIds] = useState<string[]>([]);

  useEffect(() => {
    const hash = window.location.hash || "";
    const hashQuery = hash.includes("?") ? hash.slice(hash.indexOf("?")) : "";
    const params = new URLSearchParams(hashQuery || window.location.search);
    const segment = params.get("segment");
    if (segment && segments.some((item) => item.id === segment)) {
      setActiveSegment(segment);
    }
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setSavedSpeakerIds(parsed.filter((value): value is string => typeof value === "string"));
      }
    } catch {
      window.localStorage.removeItem(FAVORITES_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(savedSpeakerIds),
    );
  }, [savedSpeakerIds]);

  const currentSegment = useMemo(
    () => segments.find((segment) => segment.id === activeSegment) ?? segments[0],
    [activeSegment],
  );

  const availableTopics = useMemo(() => {
    const topics = speakers
      .filter((speaker) => speaker.segment === activeSegment && !speaker.isPlaceholder)
      .map((speaker) => speaker.topic);

    return Array.from(new Set(topics));
  }, [activeSegment]);

  const filteredSpeakers = useMemo(() => {
    return speakers.filter((speaker) => {
      if (speaker.segment !== activeSegment) return false;

      const matchesQuery =
        query.trim().length === 0 ||
        speaker.name.toLowerCase().includes(query.toLowerCase()) ||
        speaker.talkTitle.toLowerCase().includes(query.toLowerCase()) ||
        speaker.topic.toLowerCase().includes(query.toLowerCase());

      const matchesTopic =
        topicFilter === "all" || speaker.topic === topicFilter;

      return matchesQuery && matchesTopic;
    });
  }, [activeSegment, query, topicFilter]);

  const savedSpeakers = useMemo(
    () => speakers.filter((speaker) => savedSpeakerIds.includes(speaker.id)),
    [savedSpeakerIds],
  );

  const visibleCount = filteredSpeakers.filter((speaker) => !speaker.isPlaceholder).length;

  const handleSpeakerClick = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setDialogOpen(true);
  };

  const toggleSaveSpeaker = (speakerId: string) => {
    setSavedSpeakerIds((current) =>
      current.includes(speakerId)
        ? current.filter((id) => id !== speakerId)
        : [...current, speakerId],
    );
  };

  const clearFilters = () => {
    setQuery("");
    setTopicFilter("all");
  };

  return (
    <div className="min-h-screen relative" style={{ background: "#000000" }}>
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Link href="/">
              <div className="flex w-fit items-center gap-2 text-white/30 transition-colors duration-200 hover:text-white">
                <ArrowLeft size={14} />
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  Back to Home
                </span>
              </div>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-2">
            <div>
              <motion.div
                className="mb-6 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="h-px w-12" style={{ background: "#EB0028" }} />
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#EB0028",
                  }}
                >
                  Speaker Timeline
                </span>
              </motion.div>

              <motion.h1
                className="text-5xl font-bold leading-tight text-white lg:text-7xl"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Build your
                <br />
                <span style={{ color: "#EB0028" }}>own route through time.</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p
                className="mb-6 text-lg leading-relaxed text-white/40"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Filter by segment, search for ideas that pull at you, and save a
                shortlist of talks you want to come back to.
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
                    {speakers.filter((speaker) => !speaker.isPlaceholder).length}
                  </div>
                  <div
                    className="text-xs uppercase tracking-widest text-white/30"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    Speakers
                  </div>
                </div>
                <div className="h-8 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
                <div className="text-center">
                  <div
                    className="text-3xl font-bold"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#EB0028",
                    }}
                  >
                    {savedSpeakers.length}
                  </div>
                  <div
                    className="text-xs uppercase tracking-widest text-white/30"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    Saved
                  </div>
                </div>
                <div className="h-8 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />
                <div className="text-center">
                  <div
                    className="text-3xl font-bold"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#EB0028",
                    }}
                  >
                    {segments.length}
                  </div>
                  <div
                    className="text-xs uppercase tracking-widest text-white/30"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    Segments
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div
          className="sticky top-16 lg:top-20 z-30"
          style={{
            background: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap items-stretch gap-0 overflow-x-auto">
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

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-6"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.025)",
              }}
            >
              <div className="mb-3 flex items-center gap-2">
                <Clock size={14} style={{ color: "#EB0028" }} />
                <div
                  className="text-xs uppercase tracking-widest text-white/35"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  Currently exploring
                </div>
              </div>
              <h2
                className="mb-2 text-3xl font-bold text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {currentSegment.label}
              </h2>
              <p
                className="mb-5 max-w-2xl text-sm leading-relaxed text-white/45"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {currentSegment.description}
              </p>

              <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                <label className="block">
                  <div
                    className="mb-2 text-xs uppercase tracking-widest text-white/30"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    Search talks
                  </div>
                  <div
                    className="flex items-center gap-3 px-4 py-3"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(0,0,0,0.35)",
                    }}
                  >
                    <Search size={14} style={{ color: "#EB0028" }} />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search speaker, title, or topic"
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    />
                  </div>
                </label>

                <label className="block">
                  <div
                    className="mb-2 text-xs uppercase tracking-widest text-white/30"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    Topic
                  </div>
                  <select
                    value={topicFilter}
                    onChange={(event) => setTopicFilter(event.target.value)}
                    className="w-full px-4 py-3 text-sm text-white focus:outline-none"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(0,0,0,0.35)",
                    }}
                  >
                    <option value="all">All topics</option>
                    {availableTopics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div
                  className="text-xs uppercase tracking-widest text-white/30"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {visibleCount} active talk{visibleCount === 1 ? "" : "s"} visible
                </div>
                {(query || topicFilter !== "all") && (
                  <button
                    type="button"
                    className="text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-white"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    onClick={clearFilters}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="p-6"
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
                Your shortlist
              </div>

              {savedSpeakers.length === 0 ? (
                <p
                  className="text-sm leading-relaxed text-white/55"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Save talks as you browse and this space turns into a quick personal
                  lineup planner.
                </p>
              ) : (
                <div className="space-y-3">
                  {savedSpeakers.map((speaker) => (
                    <button
                      key={speaker.id}
                      type="button"
                      className="flex w-full items-center justify-between gap-3 p-3 text-left transition-colors"
                      style={{
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(0,0,0,0.2)",
                      }}
                      onClick={() => handleSpeakerClick(speaker)}
                    >
                      <div>
                        <div
                          className="text-sm font-bold text-white"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {speaker.name}
                        </div>
                        <div
                          className="text-[11px] text-white/35"
                          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                        >
                          {speaker.topic}
                        </div>
                      </div>
                      <BookmarkCheck size={15} style={{ color: "#EB0028" }} />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeSegment}-${query}-${topicFilter}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <div className="mb-12">
                <div className="mb-4 flex items-center gap-4">
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
                      className="mt-1 text-xs uppercase tracking-widest"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "#EB0028",
                      }}
                    >
                      {currentSegment.theme}
                    </div>
                  </div>
                </div>
              </div>

              {filteredSpeakers.length === 0 ? (
                <div
                  className="p-8 text-center"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div
                    className="mb-3 text-xs uppercase tracking-widest text-white/30"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    No talks match that filter
                  </div>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="btn-outline-ted"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                  {filteredSpeakers.map((speaker, index) => (
                    <SpeakerCard
                      key={speaker.id}
                      speaker={speaker}
                      index={index}
                      saved={savedSpeakerIds.includes(speaker.id)}
                      onClick={() => handleSpeakerClick(speaker)}
                      onToggleSave={() => toggleSaveSpeaker(speaker.id)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className="border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div
                  className="mb-4 text-xs uppercase tracking-widest"
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

              <div
                className="text-xs uppercase tracking-widest text-white/30"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                Click any row to open the full talk brief
              </div>
            </div>

            <div className="space-y-2">
              {speakers
                .filter((speaker) => !speaker.isPlaceholder)
                .map((speaker, index) => (
                  <motion.div
                    key={speaker.id}
                    className="group flex cursor-pointer items-center gap-6 px-6 py-4"
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
                    transition={{ delay: index * 0.04 }}
                  >
                    <span
                      className="w-6 text-xs text-white/20"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <SpeakerAvatar speaker={speaker} size="sm" />
                    <div className="flex-1">
                      <div
                        className="text-sm font-bold text-white"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {speaker.name}
                      </div>
                      <div
                        className="text-xs text-white/30"
                        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        {speaker.talkTitle}
                      </div>
                    </div>
                    <div
                      className="hidden text-xs uppercase tracking-widest sm:block"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "#EB0028",
                      }}
                    >
                      {speaker.topic}
                    </div>
                    <div
                      className="hidden text-xs uppercase tracking-widest md:block"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "rgba(255,255,255,0.2)",
                      }}
                    >
                      The {speaker.segment.charAt(0).toUpperCase() + speaker.segment.slice(1)}
                    </div>
                    <SaveButton
                      saved={savedSpeakerIds.includes(speaker.id)}
                      onClick={() => toggleSaveSpeaker(speaker.id)}
                    />
                    <ChevronRight
                      size={14}
                      className="text-white/20 transition-colors group-hover:text-white/50"
                    />
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <SpeakerDialog
        speaker={selectedSpeaker}
        open={dialogOpen}
        saved={selectedSpeaker ? savedSpeakerIds.includes(selectedSpeaker.id) : false}
        onClose={() => setDialogOpen(false)}
        onToggleSave={() => {
          if (selectedSpeaker) {
            toggleSaveSpeaker(selectedSpeaker.id);
          }
        }}
      />
    </div>
  );
}

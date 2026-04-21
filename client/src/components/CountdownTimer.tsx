/**
 * CountdownTimer — Mechanical slot-machine style countdown
 * Design: IBM Plex Mono digits, red accent, ticking animation
 * Target: TEDxAlMuntazirSchoolsYouth 2026 event date
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Event date: June 14, 2026
const EVENT_DATE = new Date("2026-06-14T09:00:00");

interface TimeUnit {
  value: number;
  label: string;
}

function getTimeLeft(): TimeUnit[] {
  const now = new Date();
  const diff = EVENT_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return [
      { value: 0, label: "DAYS" },
      { value: 0, label: "HRS" },
      { value: 0, label: "MIN" },
      { value: 0, label: "SEC" },
    ];
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return [
    { value: days, label: "DAYS" },
    { value: hours, label: "HRS" },
    { value: minutes, label: "MIN" },
    { value: seconds, label: "SEC" },
  ];
}

function DigitRoller({ value }: { value: number }) {
  const formatted = String(value).padStart(2, "0");
  const prevRef = useRef(formatted);
  const changed = prevRef.current !== formatted;
  
  useEffect(() => {
    prevRef.current = formatted;
  });

  return (
    <div className="relative overflow-hidden" style={{ height: "1.1em" }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={formatted}
          initial={changed ? { y: "-100%", opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="block"
        >
          {formatted}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

interface CountdownTimerProps {
  compact?: boolean;
}

export default function CountdownTimer({ compact = false }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        {timeLeft.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-3">
            <div className="text-center">
              <div
                className="countdown-digit text-2xl font-bold tabular-nums"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#EB0028" }}
              >
                <DigitRoller value={unit.value} />
              </div>
              <div
                className="text-white/30 text-xs tracking-widest"
                style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.55rem" }}
              >
                {unit.label}
              </div>
            </div>
            {i < timeLeft.length - 1 && (
              <span
                className="text-white/20 text-xl pb-4"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-end gap-4 md:gap-8">
      {timeLeft.map((unit, i) => (
        <div key={unit.label} className="flex items-end gap-4 md:gap-8">
          <div className="text-center">
            {/* Digit display */}
            <div
              className="relative px-4 py-3 md:px-6 md:py-4"
              style={{
                background: "rgba(235, 0, 40, 0.05)",
                border: "1px solid rgba(235, 0, 40, 0.2)",
              }}
            >
              {/* Top scan line */}
              <div
                className="absolute top-1/2 left-0 right-0 h-px opacity-20"
                style={{ background: "#EB0028" }}
              />
              <div
                className="countdown-digit text-5xl md:text-7xl lg:text-8xl font-bold tabular-nums"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#EB0028" }}
              >
                <DigitRoller value={unit.value} />
              </div>
            </div>
            <div
              className="mt-3 text-white/40 tracking-widest"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
              }}
            >
              {unit.label}
            </div>
          </div>
          {i < timeLeft.length - 1 && (
            <div
              className="text-white/15 text-4xl md:text-6xl mb-10 font-bold"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              :
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * VideoBackground — Mux HLS video stream with subtle time/clock overlays
 * AVOID aesthetic: faint, layered, cinematic background
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Hls from "hls.js";

interface VideoBackgroundProps {
  src: string;
  opacity?: number;
}

export default function VideoBackground({
  src,
  opacity = 0.35,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        lowLatencyMode: false,
        backBufferLength: 0,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        startLevel: -1,
        debug: false,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
        setIsReady(true);
      });
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {});
        setIsReady(true);
      });
    }
  }, [src]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      {/* Video layer */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: isReady ? opacity : 0, transition: "opacity 2s ease" }}
      />

      {/* Dark overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Clock overlays — subtle, floating, time-themed */}
      <ClockOverlay delay={0} x="15%" y="20%" scale={0.8} />
      <ClockOverlay delay={1.2} x="75%" y="15%" scale={0.6} />
      <ClockOverlay delay={2.4} x="60%" y="70%" scale={0.5} />
      <ClockOverlay delay={3.6} x="25%" y="75%" scale={0.7} />
      <ClockOverlay delay={0.8} x="50%" y="50%" scale={1.2} />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

/* ── Floating Clock Overlay ──────────────────────────────── */
function ClockOverlay({
  delay,
  x,
  y,
  scale,
}: {
  delay: number;
  x: string;
  y: string;
  scale: number;
}) {
  const now = new Date();
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourDeg = (hours * 30 + minutes * 0.5);
  const minuteDeg = (minutes * 6);
  const secondDeg = (seconds * 6);

  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y, transform: `scale(${scale})` }}
      initial={{ opacity: 0, rotate: -10 }}
      animate={{
        opacity: [0, 0.06, 0.04, 0.06, 0],
        rotate: [0, 360],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 60,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Clock face */}
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer ring */}
        <circle
          cx="60"
          cy="60"
          r="58"
          stroke="rgba(235, 0, 40, 0.15)"
          strokeWidth="0.5"
        />
        {/* Inner ring */}
        <circle
          cx="60"
          cy="60"
          r="40"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="0.3"
        />

        {/* Tick marks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 60 + 52 * Math.cos(angle);
          const y1 = 60 + 52 * Math.sin(angle);
          const x2 = 60 + 47 * Math.cos(angle);
          const y2 = 60 + 47 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i % 3 === 0 ? "rgba(235, 0, 40, 0.2)" : "rgba(255, 255, 255, 0.06)"}
              strokeWidth={i % 3 === 0 ? "1" : "0.5"}
            />
          );
        })}

        {/* Hour hand */}
        <line
          x1="60"
          y1="60"
          x2="60"
          y2="35"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ transformOrigin: "60px 60px", transform: `rotate(${hourDeg}deg)` }}
        />
        {/* Minute hand */}
        <line
          x1="60"
          y1="60"
          x2="60"
          y2="25"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
          strokeLinecap="round"
          style={{ transformOrigin: "60px 60px", transform: `rotate(${minuteDeg}deg)` }}
        />
        {/* Second hand */}
        <line
          x1="60"
          y1="60"
          x2="60"
          y2="20"
          stroke="rgba(235, 0, 40, 0.1)"
          strokeWidth="0.5"
          strokeLinecap="round"
          style={{ transformOrigin: "60px 60px", transform: `rotate(${secondDeg}deg)` }}
        />
        {/* Center dot */}
        <circle cx="60" cy="60" r="2" fill="rgba(235, 0, 40, 0.15)" />
      </svg>
    </motion.div>
  );
}

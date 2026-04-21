/**
 * BackgroundPaths — Animated flowing SVG paths with letter reveal
 * Design: Elegant, flowing lines with staggered text animation
 */

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(235, 0, 40, ${0.05 + i * 0.02})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        style={{ color: "#EB0028" }}
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.4 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.5, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  title = "Background Paths",
  subtitle = "",
  buttonText = "Discover Excellence",
  onButtonClick = () => {},
  subtitleStyle = {},
}: {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  subtitleStyle?: React.CSSProperties;
}) {
  const words = title.split(" ");

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ background: "#000000" }}
    >
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Title with letter-by-letter reveal */}
          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#FFFFFF",
            }}
          >
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className="text-lg md:text-xl mb-12 max-w-2xl mx-auto"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "rgba(255,255,255,0.6)",
                ...subtitleStyle,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTA Button */}
          <motion.div
            className="inline-block group relative"
            style={{
              background:
                "linear-gradient(to bottom, rgba(235,0,40,0.1), rgba(235,0,40,0.05))",
              padding: "1px",
              borderRadius: "1.5rem",
              backdropFilter: "blur(20px)",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(235, 0, 40, 0.1)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            whileHover={{ boxShadow: "0 12px 48px rgba(235, 0, 40, 0.2)" }}
          >
            <button
              onClick={onButtonClick}
              className="rounded-[1.35rem] px-8 py-6 text-lg font-semibold transition-all duration-300 group-hover:-translate-y-0.5 flex items-center gap-3"
              style={{
                background: "rgba(0, 0, 0, 0.8)",
                color: "#FFFFFF",
                fontFamily: "'Space Grotesk', sans-serif",
                border: "1px solid rgba(235, 0, 40, 0.2)",
                backdropFilter: "blur(20px)",
              }}
            >
              <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                {buttonText}
              </span>
              <motion.span
                className="opacity-70 group-hover:opacity-100 transition-opacity"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

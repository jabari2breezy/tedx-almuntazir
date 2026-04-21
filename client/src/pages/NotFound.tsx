/**
 * 404 Not Found Page
 * Design: Neo-Brutalist Editorial | TEDx brand
 */

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "#000000" }}
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div
          className="font-bold leading-none mb-4"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            color: "rgba(235, 0, 40, 0.15)",
            fontSize: "clamp(6rem, 20vw, 14rem)",
          }}
        >
          404
        </div>
        <h1
          className="text-4xl font-bold text-white mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Time Not Found
        </h1>
        <p
          className="text-white/40 text-lg mb-10 max-w-md mx-auto"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          This moment doesn't exist. Perhaps it was borrowed and never returned.
        </p>
        <Link href="/">
          <motion.button
            className="btn-ted flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowLeft size={16} />
            Return to Present
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

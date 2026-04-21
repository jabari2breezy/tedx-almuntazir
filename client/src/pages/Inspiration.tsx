/**
 * Inspiration Page — Featured showcase with BackgroundPaths animation
 * Design: Elegant flowing lines, letter-by-letter reveal, TEDx brand integration
 */

import { motion } from "framer-motion";
import { Link } from "wouter";
import { BackgroundPaths } from "@/components/ui/background-paths";

export default function Inspiration() {
  const handleCTA = () => {
    // Navigate to speakers page
    window.location.href = "/speakers";
  };

  return (
    <div style={{ background: "#000000" }}>
      {/* Main BackgroundPaths Section */}
      <BackgroundPaths
        title="Ideas Worth Spreading"
        subtitle="Discover the stories of six young thinkers exploring humanity's most urgent relationship: our relationship with time."
        buttonText="Meet the Speakers"
        onButtonClick={handleCTA}
        subtitleStyle={{ fontFamily: "'Satoshi', sans-serif" }}
      />

      {/* Secondary Section: Why This Matters */}
      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{ background: "#000000" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div
                className="text-xs tracking-widest uppercase mb-6"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "#EB0028",
                }}
              >
                Why Inspiration Matters
              </div>

              <h2
                className="text-4xl lg:text-5xl font-bold text-white mb-8"
                style={{ fontFamily: "'Coolvetica', sans-serif" }}
              >
                Every idea begins with a spark.
              </h2>

              <p
                className="text-white/60 text-lg leading-relaxed mb-6"
                style={{ fontFamily: "'Satoshi', sans-serif" }}
              >
                At TEDxAlMuntazirSchoolsYouth, we believe that young people have
                the power to change the world. Our speakers aren't just sharing
                ideas—they're igniting conversations that matter.
              </p>

              <p
                className="text-white/40 text-base leading-relaxed mb-8"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                From exploring the weight of procrastination to reimagining our
                future with climate action and AI, these talks challenge us to
                reconsider how we spend our most precious resource: time.
              </p>

              <Link href="/speakers">
                <motion.button
                  className="btn-ted flex items-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore All Talks
                  <span>→</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Right: Stats Grid */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {[
                {
                  number: "6",
                  label: "Student Speakers",
                  description: "Voices from Al Muntazir Schools",
                },
                {
                  number: "3",
                  label: "Thematic Segments",
                  description: "Past, Present, Future",
                },
                {
                  number: "1",
                  label: "Central Question",
                  description: "What will you do with borrowed time?",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="p-6 lg:p-8"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(235, 0, 40, 0.15)",
                    borderLeft: "3px solid #EB0028",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div
                    className="text-3xl font-bold mb-2"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#EB0028",
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-white font-bold text-sm mb-1"
                    style={{ fontFamily: "'Roseblue', serif" }}
                  >
                    {stat.label}
                  </div>
                  <div
                    className="text-white/40 text-xs"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
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

      {/* Call to Action Section */}
      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{ background: "#000000" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="text-xs tracking-widest uppercase mb-6"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#EB0028",
              }}
            >
              Ready to be inspired?
            </div>

            <h2
              className="text-4xl lg:text-5xl font-bold text-white mb-8"
              style={{ fontFamily: "'Recoleta', serif" }}
            >
              Join us for an unforgettable evening of ideas, conversation, and
              connection.
            </h2>

            <p
              className="text-white/40 text-lg max-w-2xl mx-auto mb-12"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              TEDxAlMuntazirSchoolsYouth 2026 brings together the brightest
              young minds to explore what it means to live intentionally in a
              world of borrowed time.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/speakers">
                <motion.button
                  className="btn-ted"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore Speakers
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  className="btn-outline-ted"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Learn About TEDx
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

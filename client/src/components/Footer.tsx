/**
 * Footer — TEDx compliance footer
 * Design: Neo-Brutalist Editorial | Red logo, social links, license text
 */

import { motion } from "framer-motion";
import { Link } from "wouter";
import { Twitter, Instagram, Youtube, Mail } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Theme", href: "/theme" },
  { label: "Speakers", href: "/speakers" },
  { label: "About TED", href: "/about" },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:info@tedxalmuntazir.com" },
];

export default function Footer() {
  return (
    <footer
      className="relative border-t"
      style={{
        background: "#000000",
        borderColor: "rgba(235, 0, 40, 0.2)",
      }}
    >
      {/* Top red rule */}
      <div className="h-px w-full" style={{ background: "#EB0028" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <div className="flex items-baseline gap-1 mb-2">
                <span
                  className="text-white text-3xl font-bold"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  TED
                </span>
                <span
                  className="text-3xl font-bold"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: "#EB0028",
                  }}
                >
                  x
                </span>
              </div>
              <div
                className="text-white/60 text-xs tracking-widest uppercase"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                AlMuntazirSchoolsYouth
              </div>
              <div
                className="text-white/30 text-xs tracking-widest mt-1"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                2026 — Borrowed Time
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-white/40 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div
              className="text-white/30 text-xs tracking-widest uppercase mb-6"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Navigation
            </div>
            <nav className="space-y-3">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200 block"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Event Info */}
          <div>
            <div
              className="text-white/30 text-xs tracking-widest uppercase mb-6"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Event Info
            </div>
            <div className="space-y-3">
              <div>
                <div
                  className="text-white/30 text-xs tracking-widest uppercase mb-1"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  Date
                </div>
                <div
                  className="text-white/70 text-sm"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  2026 — TBA
                </div>
              </div>
              <div>
                <div
                  className="text-white/30 text-xs tracking-widest uppercase mb-1"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  Location
                </div>
                <div
                  className="text-white/70 text-sm"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Al Muntazir Schools, Dar es Salaam
                </div>
              </div>
              <div>
                <div
                  className="text-white/30 text-xs tracking-widest uppercase mb-1"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  Contact
                </div>
                <a
                  href="mailto:info@tedxalmuntazir.com"
                  className="text-sm transition-colors duration-200"
                  style={{ color: "#EB0028", fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  info@tedxalmuntazir.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="text-white/25 text-xs leading-relaxed max-w-xl"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            This independent TEDx event is operated under license from TED. In the spirit of ideas worth spreading, TEDx is a program of local, self-organized events that bring people together to share a TED-like experience.
          </div>
          <div
            className="text-white/20 text-xs whitespace-nowrap"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            © 2026 TEDxAlMuntazirSchoolsYouth
          </div>
        </div>
      </div>
    </footer>
  );
}

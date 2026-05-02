/**
 * Navigation — VOID aesthetic: floating, minimal, glass
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/theme", label: "Theme" },
  { href: "/inspiration", label: "Inspiration" },
  { href: "/speakers", label: "Speakers" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500"
          style={{
            background: scrolled ? "rgba(10, 10, 10, 0.8)" : "rgba(10, 10, 10, 0.4)",
            backdropFilter: "blur(20px) saturate(1.5)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            boxShadow: scrolled ? "0 8px 32px rgba(0, 0, 0, 0.4)" : "none",
          }}
        >
          {/* Brand */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-0.5 px-4 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-white font-semibold tracking-tight text-sm">
                TED<span style={{ color: "#EB0028" }}>x</span>
              </span>
            </motion.div>
          </Link>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10" />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.span
                  className={`relative block px-3 py-1.5 text-xs font-medium tracking-wide transition-colors duration-200 rounded-full cursor-pointer ${
                    location === link.href
                      ? "text-white"
                      : "text-white/40 hover:text-white/70"
                  }`}
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                  {location === link.href && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgba(235, 0, 40, 0.12)" }}
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.span>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link href="/speakers" className="hidden md:block">
            <motion.button
              className="ml-2 px-4 py-2 text-xs font-medium tracking-wide text-white rounded-full cursor-pointer"
              style={{ background: "#EB0028" }}
              whileHover={{ scale: 1.03, background: "#c50022" }}
              whileTap={{ scale: 0.97 }}
            >
              Explore
            </motion.button>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white/60 hover:text-white p-2 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "rgba(0, 0, 0, 0.95)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between h-16 px-6">
              <span className="text-white font-semibold text-sm">
                TED<span style={{ color: "#EB0028" }}>x</span>
              </span>
              <button className="text-white/60 p-2" onClick={() => setMobileOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-6 px-8 pt-12">
              {navLinks.map((link, i) => (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className="flex items-center gap-4 cursor-pointer group"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <span className="text-xs text-white/20 font-mono">
                      0{i + 1}
                    </span>
                    <span className="text-2xl font-medium text-white group-hover:text-[#EB0028] transition-colors">
                      {link.label}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </nav>

            <div className="mt-auto px-8 pb-12">
              <Link href="/speakers">
                <motion.button
                  className="w-full py-4 text-sm font-medium text-white rounded-full"
                  style={{ background: "#EB0028" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Program
                </motion.button>
              </Link>
              <div className="mt-6 text-xs text-white/20 text-center font-mono">
                BORROWED TIME — 2026
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/theme", label: "Theme" },
  { href: "/inspiration", label: "Inspiration" },
  { href: "/speakers", label: "Speakers" },
  { href: "/about", label: "About TED" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-nav" : "bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/">
              <motion.div
                className="group flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-1">
                  <span
                    className="font-display text-xl font-bold tracking-tight text-white lg:text-2xl"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    TED
                  </span>
                  <span
                    className="font-display text-xl font-bold text-white lg:text-2xl"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "#EB0028",
                    }}
                  >
                    x
                  </span>
                </div>
                <div className="hidden sm:block">
                  <div
                    className="text-xs font-medium uppercase tracking-widest text-white/90"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    AlMuntazirSchoolsYouth
                  </div>
                  <div
                    className="text-xs tracking-widest text-white/40"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    2026
                  </div>
                </div>
              </motion.div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.span
                    className={`relative text-sm font-medium uppercase tracking-widest transition-colors duration-200 ${
                      location === link.href
                        ? "text-white"
                        : "text-white/50 hover:text-white"
                    }`}
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.7rem",
                    }}
                    whileHover={{ y: -1 }}
                  >
                    {link.label}
                    {location === link.href && (
                      <motion.span
                        className="absolute -bottom-1 left-0 right-0 h-px"
                        style={{ background: "#EB0028" }}
                        layoutId="nav-underline"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.span>
                </Link>
              ))}

              <Link href="/speakers">
                <motion.button
                  className="btn-ted text-xs px-5 py-2.5"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore Program
                </motion.button>
              </Link>
            </nav>

            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "#000000" }}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center justify-between h-16 px-6">
              <span
                className="text-white font-bold text-xl"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                TED<span style={{ color: "#EB0028" }}>x</span>
              </span>
              <button className="text-white p-2" onClick={() => setMobileOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="h-px w-full" style={{ background: "#EB0028" }} />

            <nav className="flex flex-col gap-8 px-6 pt-12">
              {navLinks.map((link, i) => (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className="group flex items-center gap-4"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <span
                      className="text-xs text-white/30"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className="text-3xl font-bold text-white transition-colors group-hover:text-[#EB0028]"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {link.label}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </nav>

            <div className="mt-auto px-6 pb-12">
              <div
                className="mb-4 text-xs text-white/20"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                BORROWED TIME - 2026
              </div>
              <Link href="/speakers">
                <button className="btn-ted w-full">Explore Program</button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

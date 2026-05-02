/**
 * Footer — VOID Aesthetic: minimal, clean, subtle
 */

import { Link } from "wouter";
import { Twitter, Instagram, Youtube, Mail } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Theme", href: "/theme" },
  { label: "Speakers", href: "/speakers" },
  { label: "About", href: "/about" },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:tedxalmuntazirschoolsyouth@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="relative mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-20">
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-baseline gap-0.5">
                <span className="text-xl font-semibold text-white">
                  TED<span className="text-[#EB0028]">x</span>
                </span>
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-white/35">
                AlMuntazirSchoolsYouth
              </div>
              <div className="mt-1 text-xs font-mono tracking-widest text-white/20">
                2026 — Borrowed Time
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-white/25 transition-colors duration-200 hover:text-white/60"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="mb-6 text-xs font-mono uppercase tracking-widest text-white/20">
              Navigation
            </div>
            <nav className="space-y-3">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="block text-sm text-white/40 transition-colors duration-200 hover:text-white">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Event Info */}
          <div>
            <div className="mb-6 text-xs font-mono uppercase tracking-widest text-white/20">
              Event Info
            </div>
            <div className="space-y-3">
              <div>
                <div className="mb-1 text-xs font-mono uppercase tracking-widest text-white/20">
                  Date
                </div>
                <div className="text-sm text-white/50">2026 — TBA</div>
              </div>
              <div>
                <div className="mb-1 text-xs font-mono uppercase tracking-widest text-white/20">
                  Location
                </div>
                <div className="text-sm text-white/50">Al Muntazir Schools, Dar es Salaam</div>
              </div>
              <div>
                <div className="mb-1 text-xs font-mono uppercase tracking-widest text-white/20">
                  Contact
                </div>
                <a
                  href="mailto:tedxalmuntazirschoolsyouth@gmail.com"
                  className="text-sm transition-colors hover:text-[#EB0028]"
                  style={{ color: "#EB0028" }}
                >
                  tedxalmuntazirschoolsyouth@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-16 flex flex-col items-start justify-between gap-4 border-t pt-8 md:flex-row md:items-center"
          style={{ borderColor: "rgba(255,255,255,0.04)" }}
        >
          <p className="max-w-xl text-xs leading-relaxed text-white/15 font-mono">
            This independent TEDx event is operated under license from TED.
          </p>
          <span className="whitespace-nowrap text-xs text-white/15 font-mono">
            © 2026 TEDxAlMuntazirSchoolsYouth
          </span>
        </div>
      </div>
    </footer>
  );
}

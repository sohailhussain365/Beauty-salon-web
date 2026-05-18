import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.37 6.37 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34v-7.1a8.16 8.16 0 004.77 1.53V6.29a4.85 4.85 0 01-1-.4z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "hsl(22,20%,7%)" }}
      data-testid="footer"
    >
      {/* Gold top accent line */}
      <div className="h-[2px] w-full"
        style={{ background: "linear-gradient(90deg, transparent 0%, hsl(43,70%,48%) 40%, hsl(43,75%,54%) 60%, transparent 100%)" }} />

      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.018,
          backgroundImage: "radial-gradient(circle, rgba(201,168,76,1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true" />

      {/* Radial glow at top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 65%)" }}
        aria-hidden="true" />

      {/* ── Hero brand statement ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-center pt-20 pb-14 px-5"
      >
        {/* Section eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="block w-10 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.45))" }} />
          <span className="text-[10px] tracking-[0.42em] uppercase font-semibold" style={{ color: "hsl(43,60%,52%)" }}>
            Matthew Dillard
          </span>
          <span className="block w-10 h-px" style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.45), transparent)" }} />
        </div>

        {/* Large serif statement */}
        <h2 className="font-serif leading-[1.15] mx-auto"
          style={{ fontSize: "clamp(32px, 5.5vw, 68px)", color: "hsl(30,10%,94%)", maxWidth: 780 }}>
          Where craft meets{" "}
          <span style={{
            background: "linear-gradient(135deg, hsl(43,60%,42%) 0%, hsl(43,80%,58%) 50%, hsl(43,60%,42%) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }} className="italic">confidence.</span>
        </h2>

        <p className="mt-5 text-sm leading-relaxed mx-auto"
          style={{ color: "rgba(240,230,210,0.38)", maxWidth: 420, letterSpacing: "0.02em" }}>
          Luxury hair artistry in the heart of Prosper, Texas.
          Veteran-owned. LGBTQ+ friendly.
        </p>

        {/* CTA button */}
        <a
          href="https://matthewdillard.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 mt-8 px-7 py-3.5 text-[9px] tracking-[0.34em] uppercase font-bold transition-all duration-300"
          style={{
            color: "hsl(22,20%,7%)",
            background: "linear-gradient(135deg, hsl(43,65%,48%) 0%, hsl(43,78%,56%) 100%)",
            boxShadow: "0 4px 24px rgba(201,168,76,0.28)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(201,168,76,0.42)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(201,168,76,0.28)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          Book an Appointment
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </motion.div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(240,230,210,0.1) 30%, rgba(240,230,210,0.1) 70%, transparent)" }} />
      </div>

      {/* ── Three-column grid ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
      >
        {/* Brand / Social column */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-[9px] tracking-[0.44em] uppercase font-semibold mb-4"
              style={{ color: "hsl(43,60%,52%)" }}>Studio</p>
            <div className="h-px mb-5" style={{ background: "rgba(201,168,76,0.22)" }} />
            <div className="flex flex-wrap gap-2 mb-5">
              {["Veteran Owned", "LGBTQ+ Friendly"].map(b => (
                <span key={b}
                  className="text-[8px] tracking-[0.26em] uppercase px-3 py-1.5 font-semibold"
                  style={{
                    color: "hsl(43,65%,54%)",
                    border: "1px solid rgba(201,168,76,0.28)",
                    background: "rgba(201,168,76,0.06)",
                  }}>
                  {b}
                </span>
              ))}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(240,230,210,0.36)" }}>
              Prosper, Texas · Est. 2014<br />
              Where every client leaves transformed.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center transition-all duration-300"
                style={{
                  color: "rgba(240,230,210,0.4)",
                  border: "1px solid rgba(240,230,210,0.1)",
                  background: "rgba(255,255,255,0.04)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = "hsl(43,75%,54%)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.4)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.08)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(240,230,210,0.4)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,230,210,0.1)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
                aria-label={s.label}
                data-testid={`footer-social-${s.label.toLowerCase()}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigate column */}
        <div className="flex flex-col gap-0">
          <p className="text-[9px] tracking-[0.44em] uppercase font-semibold mb-4"
            style={{ color: "hsl(43,60%,52%)" }}>Navigate</p>
          <div className="h-px mb-5" style={{ background: "rgba(201,168,76,0.22)" }} />
          {NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2.5 text-sm font-light tracking-wide border-b transition-all duration-300 flex items-center justify-between group"
              style={{
                color: "rgba(240,230,210,0.48)",
                borderBottomColor: "rgba(240,230,210,0.06)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "hsl(30,10%,94%)";
                (e.currentTarget as HTMLElement).style.paddingLeft = "8px";
                (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(201,168,76,0.18)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "rgba(240,230,210,0.48)";
                (e.currentTarget as HTMLElement).style.paddingLeft = "0";
                (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(240,230,210,0.06)";
              }}
              data-testid={`footer-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
              <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                style={{ color: "hsl(43,65%,52%)" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          ))}
        </div>

        {/* Contact column */}
        <div className="flex flex-col gap-0">
          <p className="text-[9px] tracking-[0.44em] uppercase font-semibold mb-4"
            style={{ color: "hsl(43,60%,52%)" }}>Contact</p>
          <div className="h-px mb-5" style={{ background: "rgba(201,168,76,0.22)" }} />

          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 flex items-center justify-center shrink-0 mt-0.5"
                style={{ border: "1px solid rgba(201,168,76,0.22)", background: "rgba(201,168,76,0.05)" }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  style={{ color: "hsl(43,65%,52%)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <a href="https://maps.google.com/?q=2281+E+University+Dr+Suite+101+Prosper+TX+75078"
                target="_blank" rel="noopener noreferrer"
                className="text-xs leading-relaxed transition-colors duration-300 hover:opacity-80"
                style={{ color: "rgba(240,230,210,0.48)" }}
                data-testid="footer-address">
                2281 E University Dr, Suite 101<br />
                Prosper, TX 75078
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 flex items-center justify-center shrink-0"
                style={{ border: "1px solid rgba(201,168,76,0.22)", background: "rgba(201,168,76,0.05)" }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  style={{ color: "hsl(43,65%,52%)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <a href="tel:+19725717787"
                className="text-sm font-medium transition-colors duration-300 hover:opacity-80"
                style={{ color: "rgba(240,230,210,0.72)" }}
                data-testid="footer-phone">
                +1 (972) 571-7787
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 flex items-center justify-center shrink-0"
                style={{ border: "1px solid rgba(201,168,76,0.22)", background: "rgba(201,168,76,0.05)" }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  style={{ color: "hsl(43,65%,52%)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
              </div>
              <a href="https://matthewdillard.com"
                target="_blank" rel="noopener noreferrer"
                className="text-xs transition-colors duration-300 hover:opacity-80"
                style={{ color: "rgba(240,230,210,0.42)" }}
                data-testid="footer-website">
                matthewdillard.com
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Bottom bar ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(240,230,210,0.08) 30%, rgba(240,230,210,0.08) 70%, transparent)" }} />
      </div>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[9px] tracking-[0.24em] font-medium"
          style={{ color: "rgba(240,230,210,0.22)" }}>
          &copy; {new Date().getFullYear()} Matthew Dillard Hair Salons. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          <span className="w-1 h-1 rounded-full" style={{ background: "hsl(43,65%,48%)" }} />
          <p className="text-[9px] tracking-[0.24em] font-medium"
            style={{ color: "rgba(240,230,210,0.22)" }}>
            Veteran Owned · LGBTQ+ Friendly · Prosper, TX
          </p>
        </div>
      </div>
    </footer>
  );
}

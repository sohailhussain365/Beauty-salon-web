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
    hoverBg: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcaf45 100%)",
    hoverBorder: "transparent",
    hoverColor: "#ffffff",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    hoverBg: "#1877F2",
    hoverBorder: "transparent",
    hoverColor: "#ffffff",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    hoverBg: "#010101",
    hoverBorder: "#FE2C55",
    hoverColor: "#ffffff",
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
      style={{ background: "hsl(30,8%,93%)", borderTop: "1px solid rgba(22,15,8,0.07)" }}
      data-testid="footer"
    >
      {/* Gradient top accent */}
      <div className="h-[2px] w-full"
        style={{ background: "linear-gradient(90deg, hsl(22,18%,10%) 0%, hsl(22,18%,10%) 55%, hsl(43,70%,48%) 100%)" }} />

      {/* Subtle dot texture */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.018,
          backgroundImage: "radial-gradient(circle, rgba(22,15,8,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true" />

      {/* ── Large editorial brand name ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative pt-14 pb-2"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group block w-full text-left"
          >
            <div
              className="heading-bebas select-none leading-none"
              style={{
                fontSize: "clamp(56px, 10vw, 122px)",
                color: "hsl(22,20%,8%)",
                letterSpacing: "0.01em",
                lineHeight: 0.92,
              }}
            >
              Matthew{" "}
              <span style={{
                background: "linear-gradient(135deg, hsl(43,65%,36%) 0%, hsl(43,78%,52%) 50%, hsl(43,65%,36%) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Dillard</span>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Thin divider under name */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-5">
        <div className="h-px" style={{ background: "linear-gradient(90deg, rgba(22,15,8,0.18) 0%, rgba(22,15,8,0.06) 60%, transparent 100%)" }} />
      </div>

      {/* ── Three-column section ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        className="max-w-7xl mx-auto px-5 sm:px-8 pt-10 pb-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
      >
        {/* Brand column */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-[9px] tracking-[0.44em] uppercase font-bold mb-3" style={{ color: "hsl(22,18%,14%)" }}>Studio</p>
            <div className="w-6 h-[2px] mb-4" style={{ background: "hsl(43,70%,46%)" }} />
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: "rgba(22,15,8,0.48)", letterSpacing: "0.02em" }}>
              Luxury hair artistry in the heart of Prosper, Texas.<br />
              Veteran-owned. LGBTQ+ friendly.<br />
              Where craft meets confidence.
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {["Veteran Owned", "LGBTQ+ Friendly"].map(b => (
              <span key={b}
                className="text-[8px] tracking-[0.28em] uppercase px-3 py-1.5 font-semibold"
                style={{
                  color: "hsl(43,60%,36%)",
                  border: "1.5px solid hsl(43,60%,72%)",
                  background: "rgba(201,168,76,0.07)",
                }}>
                {b}
              </span>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center transition-all duration-300"
                style={{
                  color: "rgba(22,15,8,0.52)",
                  border: "1px solid rgba(22,15,8,0.14)",
                  background: "#ffffff",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = s.hoverBg;
                  (e.currentTarget as HTMLElement).style.borderColor = s.hoverBorder;
                  (e.currentTarget as HTMLElement).style.color = s.hoverColor;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 18px rgba(22,15,8,0.14)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "#ffffff";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(22,15,8,0.14)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(22,15,8,0.52)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
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
        <div className="flex flex-col">
          <p className="text-[9px] tracking-[0.44em] uppercase font-bold mb-3" style={{ color: "hsl(22,18%,14%)" }}>Navigate</p>
          <div className="w-6 h-[2px] mb-4" style={{ background: "hsl(43,70%,46%)" }} />
          {NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2.5 text-sm border-b flex items-center justify-between group transition-all duration-300"
              style={{ color: "rgba(22,15,8,0.52)", borderBottomColor: "rgba(22,15,8,0.07)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "hsl(22,20%,8%)";
                (e.currentTarget as HTMLElement).style.paddingLeft = "8px";
                (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(22,15,8,0.14)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "rgba(22,15,8,0.52)";
                (e.currentTarget as HTMLElement).style.paddingLeft = "0";
                (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(22,15,8,0.07)";
              }}
              data-testid={`footer-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
              <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                style={{ color: "hsl(43,65%,46%)" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          ))}
        </div>

        {/* Contact column */}
        <div className="flex flex-col">
          <p className="text-[9px] tracking-[0.44em] uppercase font-bold mb-3" style={{ color: "hsl(22,18%,14%)" }}>Contact</p>
          <div className="w-6 h-[2px] mb-4" style={{ background: "hsl(43,70%,46%)" }} />

          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 flex items-center justify-center shrink-0 mt-0.5"
                style={{ border: "1px solid rgba(22,15,8,0.12)", background: "#ffffff" }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  style={{ color: "hsl(43,65%,44%)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <a href="https://maps.google.com/?q=2281+E+University+Dr+Suite+101+Prosper+TX+75078"
                target="_blank" rel="noopener noreferrer"
                className="text-xs leading-relaxed transition-colors duration-300 hover:text-black"
                style={{ color: "rgba(22,15,8,0.5)" }}
                data-testid="footer-address">
                2281 E University Dr, Suite 101<br />
                Prosper, TX 75078
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 flex items-center justify-center shrink-0"
                style={{ border: "1px solid rgba(22,15,8,0.12)", background: "#ffffff" }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  style={{ color: "hsl(43,65%,44%)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <a href="tel:+19725717787"
                className="text-sm font-semibold transition-colors duration-300 hover:text-black"
                style={{ color: "rgba(22,15,8,0.72)" }}
                data-testid="footer-phone">
                +1 (972) 571-7787
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 flex items-center justify-center shrink-0"
                style={{ border: "1px solid rgba(22,15,8,0.12)", background: "#ffffff" }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  style={{ color: "hsl(43,65%,44%)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
              </div>
              <a href="https://matthewdillard.com"
                target="_blank" rel="noopener noreferrer"
                className="text-xs transition-colors duration-300 hover:text-black"
                style={{ color: "rgba(22,15,8,0.45)" }}
                data-testid="footer-website">
                matthewdillard.com
              </a>
            </div>

            <a
              href="https://matthewdillard.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2.5 px-5 py-3 text-[9px] tracking-[0.32em] uppercase font-bold transition-all duration-300 w-fit"
              style={{
                color: "#ffffff",
                background: "hsl(22,18%,10%)",
                boxShadow: "0 2px 14px rgba(22,15,8,0.16)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "hsl(43,70%,44%)";
                (e.currentTarget as HTMLElement).style.color = "hsl(22,20%,8%)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(201,168,76,0.32)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "hsl(22,18%,10%)";
                (e.currentTarget as HTMLElement).style.color = "#ffffff";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 14px rgba(22,15,8,0.16)";
              }}
              data-testid="footer-book-btn"
            >
              Book Appointment
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── Bottom bar ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="h-px" style={{ background: "linear-gradient(90deg, rgba(22,15,8,0.1) 0%, rgba(22,15,8,0.06) 60%, transparent 100%)" }} />
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[9px] tracking-[0.24em] font-medium" style={{ color: "rgba(22,15,8,0.30)" }}>
          &copy; {new Date().getFullYear()} Matthew Dillard Hair Salons. All rights reserved.
        </p>
        <div className="flex items-center gap-2.5">
          <span className="w-1 h-1 rounded-full" style={{ background: "hsl(43,65%,48%)" }} />
          <p className="text-[9px] tracking-[0.24em] font-medium" style={{ color: "rgba(22,15,8,0.30)" }}>
            Veteran Owned · LGBTQ+ Friendly · Prosper, TX
          </p>
        </div>
      </div>
    </footer>
  );
}

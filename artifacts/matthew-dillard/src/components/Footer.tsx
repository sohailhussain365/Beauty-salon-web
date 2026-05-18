import { motion } from "framer-motion";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
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
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative pt-20 pb-12 md:pt-24 overflow-hidden"
      style={{
        background: "hsl(30,8%,90%)",
        borderTop: "1px solid rgba(22,15,8,0.08)",
      }}
      data-testid="footer"
    >
      {/* Top subtle rule */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(22,15,8,0.14), transparent)" }}
        aria-hidden="true" />

      {/* Large brand name above grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-14">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group block">
          <div className="overflow-hidden">
            <motion.div
              className="heading-bebas"
              style={{ fontSize: "clamp(52px, 8vw, 108px)", color: "rgba(22,15,8,0.06)", letterSpacing: "0.01em", lineHeight: 1, userSelect: "none" }}
              initial={{ y: "105%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              Matthew{" "}
              <span style={{ color: "rgba(22,15,8,0.12)" }}>Dillard</span>
            </motion.div>
          </div>
          <div className="h-px mt-2 mb-0" style={{ background: "linear-gradient(90deg, rgba(22,15,8,0.14), transparent)" }} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-left group"
            >
              <span className="block text-lg font-serif tracking-[0.08em] transition-opacity group-hover:opacity-70" style={{ color: "hsl(22,20%,10%)" }}>
                Matthew <span className="text-gold-gradient">Dillard</span>
              </span>
              <span className="block text-[9px] tracking-[0.35em] uppercase mt-1" style={{ color: "rgba(22,15,8,0.32)" }}>
                Hair Salons · Prosper, Texas
              </span>
            </button>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: "rgba(22,15,8,0.40)" }}>
              Luxury hair artistry in the heart of Prosper, Texas. Veteran-owned.
              LGBTQ+ friendly. Where craft meets confidence.
            </p>
            <div className="flex items-center gap-3 mt-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:opacity-70"
                  style={{ color: "rgba(22,15,8,0.38)", border: "1px solid rgba(22,15,8,0.10)" }}
                  aria-label={s.label}
                  data-testid={`footer-social-${s.label.toLowerCase()}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <p className="text-[9px] tracking-[0.35em] uppercase mb-2" style={{ color: "rgba(22,15,8,0.38)" }}>Navigate</p>
            {NAV.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left text-xs tracking-wide transition-opacity hover:opacity-60"
                style={{ color: "rgba(22,15,8,0.45)" }}
                data-testid={`footer-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-3">
            <p className="text-[9px] tracking-[0.35em] uppercase mb-2" style={{ color: "rgba(22,15,8,0.38)" }}>Contact</p>
            <a
              href="https://maps.google.com/?q=2281+E+University+Dr+Suite+101+Prosper+TX+75078"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs leading-relaxed transition-opacity hover:opacity-60"
              style={{ color: "rgba(22,15,8,0.45)" }}
              data-testid="footer-address"
            >
              2281 E University Dr Suite 101<br />
              Prosper, TX 75078
            </a>
            <a
              href="tel:+19725717787"
              className="text-xs transition-opacity hover:opacity-60"
              style={{ color: "rgba(22,15,8,0.45)" }}
              data-testid="footer-phone"
            >
              +1 (972) 571-7787
            </a>
            <a
              href="https://matthewdillard.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-opacity hover:opacity-60"
              style={{ color: "rgba(22,15,8,0.45)" }}
              data-testid="footer-website"
            >
              matthewdillard.com
            </a>
            <a
              href="https://matthewdillard.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 text-[9px] tracking-[0.25em] uppercase transition-all duration-300 w-fit hover:opacity-70"
              style={{ color: "rgba(22,15,8,0.60)", border: "1px solid rgba(22,15,8,0.18)" }}
              data-testid="footer-book-btn"
            >
              Book Appointment
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(22,15,8,0.07)" }}
        >
          <p className="text-[10px] tracking-[0.2em]" style={{ color: "rgba(22,15,8,0.28)" }}>
            &copy; {new Date().getFullYear()} Matthew Dillard Hair Salons. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full" style={{ background: "rgba(22,15,8,0.28)" }} />
            <p className="text-[10px] tracking-[0.2em]" style={{ color: "rgba(22,15,8,0.28)" }}>
              Veteran Owned · LGBTQ+ Friendly · Prosper, TX
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

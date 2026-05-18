import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

function ScissorsIcon() {
  return (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="7" cy="7" r="4" strokeWidth="1.6" />
      <circle cx="7" cy="21" r="4" strokeWidth="1.6" />
      <line x1="10" y1="9" x2="23" y2="20" strokeWidth="1.6" />
      <line x1="10" y1="19" x2="23" y2="8" strokeWidth="1.6" />
    </svg>
  );
}

export default function Navbar({ transparentTop = false }: { transparentTop?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const glass = !transparentTop || scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: glass ? "rgba(5,3,2,0.92)" : "transparent",
          backdropFilter: glass ? "blur(28px) saturate(1.4)" : "none",
          WebkitBackdropFilter: glass ? "blur(28px) saturate(1.4)" : "none",
          boxShadow: glass ? "0 1px 0 rgba(255,255,255,0.05), 0 8px 40px rgba(0,0,0,0.5)" : "none",
          transition: "background 0.5s, box-shadow 0.5s",
        }}
      >
        {/* Top accent line — very subtle */}
        <div
          className="absolute inset-x-0 top-0 h-px transition-opacity duration-500"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.55) 30%, rgba(201,168,76,0.8) 50%, rgba(201,168,76,0.55) 70%, transparent 100%)",
            opacity: glass ? 1 : 0,
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1380px] mx-auto px-6 lg:px-10 h-[76px] flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group select-none" data-testid="nav-logo">
              <div className="w-8 h-8 shrink-0 flex items-center justify-center"
                style={{
                  border: "1px solid rgba(201,168,76,0.35)",
                  color: "rgba(201,168,76,0.75)",
                  transition: "border-color 0.3s, color 0.3s",
                }}>
                <ScissorsIcon />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif transition-colors duration-300 group-hover:text-white"
                  style={{ fontSize: 18, color: "rgba(255,255,255,0.90)", fontWeight: 600, letterSpacing: "0.04em" }}>
                  Matthew Dillard
                </span>
                <span className="uppercase tracking-widest"
                  style={{ fontSize: 7, color: "rgba(255,255,255,0.22)", marginTop: 3, letterSpacing: "0.42em" }}>
                  Hair Salons · Prosper TX
                </span>
              </div>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center" data-testid="desktop-nav">
            {/* Thin left separator */}
            <div className="w-px h-5 mr-6" style={{ background: "rgba(255,255,255,0.08)" }} aria-hidden="true" />
            {LINKS.map((l) => {
              const active = location === l.href || (l.href !== "/" && location.startsWith(l.href));
              return (
                <Link key={l.href} href={l.href}>
                  <motion.div
                    className="relative px-4 py-2 cursor-pointer"
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.15 }}
                    data-testid={`nav-${l.label.toLowerCase()}`}
                  >
                    <span className="transition-colors duration-300" style={{
                      fontSize: 11,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      color: active ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.50)",
                    }}>
                      {l.label}
                    </span>
                    {/* Active underline — short gold dash */}
                    <div
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-px transition-all duration-300"
                      style={{
                        width: active ? 18 : 0,
                        background: "rgba(201,168,76,0.8)",
                      }}
                      aria-hidden="true"
                    />
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* ── Right side ── */}
          <div className="flex items-center gap-5">
            <a
              href="tel:+19725717787"
              className="hidden lg:flex items-center gap-2 transition-colors duration-300 hover:text-white/60"
              style={{ fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.26)" }}
              data-testid="nav-phone"
            >
              <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              972·571·7787
            </a>

            {/* Thin separator */}
            <div className="hidden lg:block w-px h-5" style={{ background: "rgba(255,255,255,0.08)" }} aria-hidden="true" />

            <Link href="/booking">
              <motion.div
                className="hidden lg:flex group relative overflow-hidden px-6 py-2.5 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: "linear-gradient(135deg, hsl(43,68%,50%) 0%, hsl(35,72%,42%) 100%)",
                  boxShadow: "0 2px 16px rgba(201,168,76,0.22)",
                }}
                data-testid="nav-book"
              >
                <span className="relative z-10 font-medium" style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "#000" }}>
                  Book Now
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, hsl(43,78%,58%) 0%, hsl(35,80%,50%) 100%)" }} />
              </motion.div>
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col items-end justify-center gap-[5px] w-8 h-8 z-[60] relative"
              onClick={() => setOpen(v => !v)}
              aria-label="Menu"
              data-testid="nav-toggle"
            >
              {[0, 1, 2].map((i) => (
                <motion.span key={i} className="block h-px origin-center"
                  animate={open
                    ? i === 1 ? { opacity: 0, scaleX: 0 }
                    : i === 0 ? { rotate: 45, y: 6, width: "100%" }
                    : { rotate: -45, y: -6, width: "100%" }
                    : { rotate: 0, y: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.25 }}
                  style={{ width: i === 1 ? "60%" : "100%", background: "rgba(255,255,255,0.65)" }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: "rgba(4,3,2,0.97)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)" }}
          >
            {/* Ambient */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.02) 0%, transparent 65%)" }}
              aria-hidden="true" />

            {/* Top bar */}
            <div className="flex items-center justify-between px-6 h-[76px]" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 flex items-center justify-center" style={{ border: "1px solid rgba(201,168,76,0.3)", color: "rgba(201,168,76,0.65)" }}>
                  <ScissorsIcon />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-serif" style={{ fontSize: 16, color: "rgba(255,255,255,0.88)", fontWeight: 600, letterSpacing: "0.04em" }}>
                    Matthew Dillard
                  </span>
                  <span style={{ fontSize: 7, color: "rgba(255,255,255,0.22)", marginTop: 2, letterSpacing: "0.38em", textTransform: "uppercase" }}>
                    Hair Salons
                  </span>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="w-9 h-9 flex items-center justify-center transition-colors hover:text-white/70"
                style={{ color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col px-6 pt-8 pb-4">
              {LINKS.map((l, i) => {
                const active = location === l.href || (l.href !== "/" && location.startsWith(l.href));
                return (
                  <Link key={l.href} href={l.href}>
                    <motion.div
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ delay: i * 0.05 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center justify-between py-4 cursor-pointer group"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                      data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                    >
                      <div className="flex items-center gap-4">
                        <span style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(255,255,255,0.18)", minWidth: 20 }}>
                          0{i + 1}
                        </span>
                        <span className="font-serif transition-colors duration-200"
                          style={{ fontSize: 26, color: active ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.65)", fontWeight: 500 }}>
                          {l.label}
                        </span>
                      </div>
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        style={{ color: "rgba(255,255,255,0.5)" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="mx-6 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

            {/* CTA + Info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="px-6 pt-6 pb-4 flex flex-col gap-4"
            >
              <Link href="/booking">
                <div className="w-full py-4 text-center font-medium transition-opacity hover:opacity-90 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, hsl(43,68%,50%), hsl(35,72%,42%))",
                    fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "#000", fontWeight: 600,
                    boxShadow: "0 4px 20px rgba(201,168,76,0.22)",
                  }}>
                  Book Appointment
                </div>
              </Link>
              <a href="tel:+19725717787"
                className="w-full py-3.5 text-center transition-colors hover:text-white/50"
                style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", border: "1px solid rgba(255,255,255,0.07)" }}>
                (972) 571-7787
              </a>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="absolute bottom-0 inset-x-0 px-6 pb-8 pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
            >
              <div className="flex items-center justify-between">
                <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>
                  Prosper, TX · Veteran Owned
                </p>
                <div className="flex items-center gap-3">
                  {[
                    { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                    { label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                  ].map(s => (
                    <a key={s.label} href="#" aria-label={s.label}
                      className="w-7 h-7 flex items-center justify-center transition-colors hover:text-white/50"
                      style={{ color: "rgba(255,255,255,0.22)" }}>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

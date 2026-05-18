import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Layout from "@/components/Layout";
import LoadingScreen from "@/components/LoadingScreen";
import BeautyElements from "@/components/BeautyElements";
import CtaSection from "@/components/CtaSection";
import BeforeAfter from "@/components/BeforeAfter";
import TestimonialsSlider from "@/components/TestimonialsSlider";

// ─── CountUp ──────────────────────────────────────────────────────────────────
function CountUp({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();
    const frame = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const p = Math.min(elapsed / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(frame);
      else setCount(end);
    };
    requestAnimationFrame(frame);
  }, [inView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Particle Field ───────────────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", resize, { passive: true });
    resize();
    const pts = Array.from({ length: 65 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.1 + 0.2,
      vx: (Math.random() - 0.5) * 0.22, vy: -(Math.random() * 0.38 + 0.06),
      a: Math.random() * 0.28 + 0.04,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;
      }
      animId = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" aria-hidden="true" />;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity     = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const yContent    = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const yPhoto      = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden" data-testid="hero">

      {/* ── Full-bleed background photo with subtle parallax ── */}
      <motion.div className="absolute inset-0 scale-[1.06]" style={{ y: yPhoto }}>
        <motion.img
          src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1800&q=90"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ objectPosition: "60% 18%", filter: "brightness(0.60) saturate(0.85)" }}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1.0 }}
          transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {/* ── Layered gradient overlays ── */}
      {/* Left-side darkness — makes text very readable */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(108deg, rgba(5,3,2,0.96) 0%, rgba(5,3,2,0.82) 32%, rgba(5,3,2,0.50) 58%, rgba(5,3,2,0.18) 100%)"
      }} />
      {/* Bottom vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to top, rgba(5,3,2,0.92) 0%, rgba(5,3,2,0.35) 28%, transparent 56%)"
      }} />
      {/* Top vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to bottom, rgba(5,3,2,0.75) 0%, transparent 28%)"
      }} />
      {/* Warm gold atmospheric glow — center-right */}
      <div className="absolute pointer-events-none" style={{
        inset: 0,
        background: "radial-gradient(ellipse 55% 65% at 72% 46%, rgba(201,168,76,0.07) 0%, transparent 70%)"
      }} />

      {/* ── Decorative geometric rings (desktop only) ── */}
      {/* Outer ring — slow rotation */}
      <motion.div
        className="absolute rounded-full pointer-events-none hidden lg:block"
        style={{
          width: 720, height: 720,
          right: "-4%", top: "50%", translateY: "-50%",
          border: "1px solid rgba(201,168,76,0.11)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
      {/* Mid ring — counter-rotation */}
      <motion.div
        className="absolute rounded-full pointer-events-none hidden lg:block"
        style={{
          width: 520, height: 520,
          right: "4.8%", top: "50%", translateY: "-50%",
          border: "1px solid rgba(201,168,76,0.09)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 64, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
      {/* Inner ring — static */}
      <div
        className="absolute rounded-full pointer-events-none hidden lg:block"
        style={{
          width: 340, height: 340,
          right: "13.2%", top: "50%", translateY: "-50%",
          border: "1px solid rgba(201,168,76,0.07)",
        }}
        aria-hidden="true"
      />
      {/* Tiny innermost ring — pulsing glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none hidden lg:block"
        style={{
          width: 180, height: 180,
          right: "19.6%", top: "50%", translateY: "-50%",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.09) 0%, transparent 70%)",
          border: "1px solid rgba(201,168,76,0.13)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      {/* Glowing orb behind rings */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          width: 540, height: 540,
          right: "1%", top: "50%", translateY: "-50%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 65%)",
          filter: "blur(28px)",
        }}
        aria-hidden="true"
      />

      {/* ── Particles ── */}
      <ParticleField />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-24 flex items-center min-h-screen"
        style={{ opacity }}
      >
        <motion.div className="max-w-[580px] w-full" style={{ y: yContent }}>

          {/* Eyebrow */}
          <motion.div className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}>
            <motion.div
              className="h-px shrink-0"
              initial={{ width: 0 }} animate={{ width: 32 }}
              transition={{ duration: 1.1, delay: 0.5 }}
              style={{ background: "linear-gradient(to right, rgba(201,168,76,0.7), rgba(201,168,76,0.1))" }}
            />
            <span style={{ fontSize: 9, letterSpacing: "0.44em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)" }}>
              Luxury Hair Artistry · Prosper TX
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-serif leading-[0.90] mb-9">
            {[
              { text: "Elevate", weight: 400, italic: false },
              { text: "Your",    weight: 500, italic: true },
              { text: "Hair.",   weight: 700, italic: true, shimmer: true },
            ].map((line, li) => (
              <div key={li} className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.38 + li * 0.20 }}
                  style={{
                    fontSize: "clamp(54px, 8vw, 112px)",
                    fontWeight: line.weight,
                    fontStyle: line.italic ? "italic" : "normal",
                    color: li === 2 ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.86)",
                    letterSpacing: "-0.02em",
                    display: "block",
                  }}
                >
                  {line.shimmer ? <span className="shimmer-text">{line.text}</span> : line.text}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Divider line */}
          <motion.div
            className="mb-7 h-px"
            initial={{ width: 0 }} animate={{ width: 56 }}
            transition={{ duration: 1.0, delay: 1.0 }}
            style={{ background: "linear-gradient(to right, rgba(201,168,76,0.5), transparent)" }}
          />

          {/* Description */}
          <motion.p
            className="mb-10 leading-[1.80]"
            style={{ fontSize: "clamp(13px, 1.1vw, 15px)", color: "rgba(255,255,255,0.40)", maxWidth: 420, letterSpacing: "0.015em" }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05 }}
          >
            Where craft meets confidence. An elevated salon experience for those who demand the extraordinary — in Prosper, TX.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 1.25 }}
          >
            <Link href="/booking">
              <motion.div
                className="group relative overflow-hidden px-10 py-4 cursor-pointer"
                style={{ background: "linear-gradient(135deg, hsl(43,70%,52%), hsl(35,74%,44%))", boxShadow: "0 6px 36px rgba(201,168,76,0.30)" }}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 56px rgba(201,168,76,0.58)" }}
                whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ["0 6px 28px rgba(201,168,76,0.22)", "0 6px 50px rgba(201,168,76,0.50)", "0 6px 28px rgba(201,168,76,0.22)"] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" } as never}
                data-testid="hero-book"
              >
                <span className="relative z-10 flex items-center gap-3 font-semibold"
                  style={{ fontSize: 10.5, letterSpacing: "0.28em", textTransform: "uppercase", color: "#000" }}>
                  Book Appointment
                  <motion.svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    animate={{ x: [0, 4, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, hsl(43,80%,58%), hsl(35,82%,52%))" }} />
              </motion.div>
            </Link>
            <Link href="/services">
              <motion.div
                className="flex items-center gap-3 cursor-pointer group py-3 sm:py-0"
                whileHover={{ x: 5 }}
                data-testid="hero-services"
              >
                <span className="group-hover:text-white/65 transition-colors duration-300"
                  style={{ fontSize: 10.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.34)" }}>
                  Our Services
                </span>
                <svg className="w-3.5 h-3.5 group-hover:text-white/50 transition-colors duration-300"
                  style={{ color: "rgba(255,255,255,0.24)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap gap-x-7 gap-y-4 mt-14 pt-9"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.65 }}
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            {[
              { v: "4.8★", l: "Rating" },
              { v: "28+",  l: "Reviews" },
              { v: "10+",  l: "Years" },
              { v: "Veteran", l: "Owned" },
            ].map((b, i) => (
              <motion.div key={b.l} className="flex flex-col gap-1"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.75 + i * 0.09 }}>
                <span className="font-serif font-bold" style={{ fontSize: 22, color: "rgba(255,255,255,0.90)" }}>{b.v}</span>
                <span style={{ fontSize: 8, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(255,255,255,0.24)" }}>{b.l}</span>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        aria-hidden="true"
      >
        <span style={{ fontSize: 7.5, letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(255,255,255,0.20)" }}>Scroll</span>
        <motion.div className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.55), transparent)" }}
          animate={{ scaleY: [0.35, 1, 0.35], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>

    </section>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ["Luxury Hair Artistry", "Balayage Specialist", "Master Colorist", "Prosper, Texas", "Veteran Owned", "LGBTQ+ Friendly", "Bridal Styling", "Blonde Specialist"];
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-4 section-divider"
      style={{ background: "hsl(22,16%,6%)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-8 flex-shrink-0 px-8">
            <span style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.20)", whiteSpace: "nowrap" }}>{item}</span>
            <span style={{ color: "rgba(255,255,255,0.14)", fontSize: 14 }}>·</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { end: 48, suffix: "★", label: "Average Rating", sub: "Google Reviews", display: "4.8" },
    { end: 28, suffix: "+", label: "Verified Reviews", sub: "Satisfied Clients" },
    { end: 10, suffix: "+", label: "Years Experience", sub: "Master Colorist" },
    { end: 100, suffix: "%", label: "Veteran Owned", sub: "Community Proud" },
  ];
  return (
    <section className="py-16 md:py-24 section-divider" style={{ background: "hsl(22,16%,5%)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col items-center text-center gap-2 p-5 sm:p-6 relative overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              whileHover={{ borderColor: "rgba(255,255,255,0.15)", y: -4, transition: { duration: 0.2 } }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03), transparent 70%)" }} />
              <div className="relative z-10">
                <span className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl" style={{ color: "rgba(255,255,255,0.90)" }}>
                  {s.display ? s.display : <CountUp end={s.end} suffix="" duration={1.8} />}{s.suffix}
                </span>
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/55 mt-2">{s.label}</p>
                <p className="text-[9px] tracking-[0.15em] uppercase text-white/25 mt-0.5">{s.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services Preview ─────────────────────────────────────────────────────────
const SERVICES_PREVIEW = [
  { icon: "✦", title: "Balayage", desc: "Hand-painted sun-kissed color that grows out naturally.", color: "rgba(201,168,76,0.8)" },
  { icon: "◈", title: "Blonde Specialist", desc: "Every shade of blonde — platinum to honey, perfected.", color: "rgba(220,200,150,0.8)" },
  { icon: "❋", title: "Hair Treatments", desc: "Olaplex, keratin, and deep conditioning therapies.", color: "rgba(180,220,200,0.7)" },
  { icon: "❃", title: "Bridal Styling", desc: "Your wedding day hair — from trial to the aisle.", color: "rgba(220,180,200,0.7)" },
  { icon: "◉", title: "Hair Coloring", desc: "Dimensional color executed with precision and vision.", color: "rgba(201,168,76,0.7)" },
  { icon: "⬡", title: "Extensions", desc: "Length and volume using premium human hair.", color: "rgba(160,200,230,0.7)" },
];

function ServicesPreview() {
  return (
    <section className="py-20 md:py-32 section-divider relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12 md:mb-16">
          <motion.div className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}>
            <motion.span className="h-px" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }} style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }} />
            <span className="text-[9px] tracking-[0.4em] uppercase text-yellow-400/60">Specialties</span>
            <motion.span className="h-px" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }} style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} />
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif"
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}>
              <span className="text-white/90">Crafted </span>
              <span className="text-gold-gradient italic">Services</span>
            </motion.h2>
          </div>
          <motion.p className="mt-5 text-sm text-white/38 tracking-wide max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            Every service is a statement. Every result, a transformation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES_PREVIEW.map((svc, i) => (
            <motion.div key={svc.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.06 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-7 sm:p-8 overflow-hidden cursor-pointer"
              style={{ background: "linear-gradient(145deg, hsl(22,16%,8%), hsl(22,14%,6%))", border: "1px solid rgba(201,168,76,0.08)" }}
              whileHover={{ borderColor: "rgba(201,168,76,0.28)", y: -6, transition: { duration: 0.2 } }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 20% 10%, ${svc.color.replace("0.8", "0.09").replace("0.7", "0.07")}, transparent 65%)` }} aria-hidden="true" />
              <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: `linear-gradient(90deg, ${svc.color}, transparent)` }} aria-hidden="true" />
              <div className="relative z-10">
                <div className="mb-5 text-3xl" style={{ color: svc.color }}>{svc.icon}</div>
                <div className="overflow-hidden mb-3">
                  <h3 className="text-base font-serif font-semibold text-white/85 group-hover:text-white transition-colors">
                    {svc.title}
                  </h3>
                </div>
                <p className="text-xs text-white/38 leading-relaxed">{svc.desc}</p>
                <div className="h-px mt-5 w-0 group-hover:w-10 transition-all duration-500" style={{ background: svc.color }} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-10"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
          <Link href="/services">
            <motion.span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase cursor-pointer py-3 px-1"
              style={{ color: "rgba(201,168,76,0.6)" }}
              whileHover={{ color: "rgba(201,168,76,1)", x: 3 }}>
              View All Services
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      {!loading && (
        <Layout>
          <Hero />
          <Marquee />
          <Stats />
          <ServicesPreview />
          <BeforeAfter />
          <TestimonialsSlider />
          <CtaSection />
        </Layout>
      )}
    </>
  );
}

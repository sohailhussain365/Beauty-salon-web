import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Layout from "@/components/Layout";
import LoadingScreen from "@/components/LoadingScreen";
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


// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity  = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const yImg     = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={ref} className="relative min-h-screen flex overflow-hidden" data-testid="hero">

      {/* ── Mobile: full-bleed photo background ── */}
      <div className="absolute inset-0 lg:hidden">
        <img
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=85"
          alt="" aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ objectPosition: "50% 18%", filter: "brightness(0.38) saturate(0.85)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(115deg, rgba(5,3,2,0.96) 0%, rgba(5,3,2,0.78) 55%, rgba(5,3,2,0.55) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,3,2,0.95) 0%, transparent 45%)" }} />
      </div>

      {/* ── Desktop: solid dark left panel ── */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[55%] hidden lg:block" style={{ background: "hsl(22,18%,4%)" }}>
        <div className="absolute top-0 right-0 w-96 h-80 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(201,168,76,0.055) 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 100% 100%, rgba(201,168,76,0.035) 0%, transparent 65%)" }} />
      </div>

      {/* ── Desktop: right photo panel ── */}
      <div className="absolute inset-y-0 right-0 w-[45%] hidden lg:block overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=90"
          alt="Luxury hair artistry" aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ objectPosition: "50% 18%", filter: "brightness(0.80) saturate(0.88)" }}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1.0, opacity: 1 }}
          transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        />
        {/* Seamless left blend into dark panel */}
        <div className="absolute inset-y-0 left-0 w-36 pointer-events-none"
          style={{ background: "linear-gradient(to right, hsl(22,18%,4%) 0%, transparent 100%)" }} />
        {/* Top & bottom fades */}
        <div className="absolute top-0 inset-x-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, hsl(22,18%,4%) 0%, transparent 100%)" }} />
        <div className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to top, hsl(22,18%,4%) 0%, transparent 100%)" }} />
        {/* Subtle corner label */}
        <motion.div className="absolute bottom-14 right-10 z-10 flex flex-col items-end gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
          <div className="h-px w-9" style={{ background: "rgba(201,168,76,0.38)" }} />
          <span style={{ fontSize: 7.5, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Artistry · Precision</span>
        </motion.div>
      </div>

      {/* ── Text content ── */}
      <motion.div
        className="relative z-10 w-full lg:w-[55%] min-h-screen flex items-center px-6 sm:px-10 lg:px-14 xl:px-20 pt-28 pb-20"
        style={{ opacity }}
      >
        <div className="w-full max-w-[520px]">

          {/* Eyebrow */}
          <motion.div className="flex items-center gap-3 mb-9"
            initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.3 }}>
            <motion.div className="h-px shrink-0"
              initial={{ width: 0 }} animate={{ width: 30 }}
              transition={{ duration: 1.0, delay: 0.5 }}
              style={{ background: "linear-gradient(to right, rgba(201,168,76,0.80), rgba(201,168,76,0.08))" }} />
            <span style={{ fontSize: 9, letterSpacing: "0.46em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>
              Luxury Hair Artistry · Prosper TX
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-serif leading-[0.88] mb-10">
            {[
              { text: "Elevate", weight: 300 as const, italic: false },
              { text: "Your",    weight: 500 as const, italic: true  },
              { text: "Hair.",   weight: 700 as const, italic: true, shimmer: true },
            ].map((line, li) => (
              <div key={li} className="overflow-hidden">
                <motion.span className="block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 + li * 0.18 }}
                  style={{
                    fontSize: "clamp(58px, 7.8vw, 110px)",
                    fontWeight: line.weight,
                    fontStyle: line.italic ? "italic" : "normal",
                    color: li === 2 ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.88)",
                    letterSpacing: "-0.02em",
                    display: "block",
                  }}>
                  {line.shimmer ? <span className="shimmer-text">{line.text}</span> : line.text}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Gold accent line */}
          <motion.div className="mb-8 h-px"
            initial={{ width: 0 }} animate={{ width: 52 }}
            transition={{ duration: 1.0, delay: 1.0 }}
            style={{ background: "linear-gradient(to right, rgba(201,168,76,0.60), transparent)" }} />

          {/* Description */}
          <motion.p className="mb-11 leading-[1.88]"
            style={{ fontSize: "clamp(13.5px, 1.05vw, 15.5px)", color: "rgba(255,255,255,0.38)", maxWidth: 410, letterSpacing: "0.012em" }}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05 }}>
            Where craft meets confidence. An elevated salon experience for those who demand the extraordinary — in Prosper, TX.
          </motion.p>

          {/* CTAs */}
          <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-14"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 1.22 }}>
            <Link href="/booking">
              <motion.div
                className="group relative overflow-hidden px-9 py-[14px] cursor-pointer"
                style={{ background: "linear-gradient(135deg, hsl(43,70%,52%), hsl(35,74%,44%))" }}
                whileHover={{ scale: 1.04, boxShadow: "0 10px 60px rgba(201,168,76,0.60)" }}
                whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ["0 6px 28px rgba(201,168,76,0.22)", "0 6px 52px rgba(201,168,76,0.50)", "0 6px 28px rgba(201,168,76,0.22)"] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" } as never}
                data-testid="hero-book">
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
              <motion.div className="flex items-center gap-3 cursor-pointer group py-2 sm:py-0" whileHover={{ x: 5 }} data-testid="hero-services">
                <span className="group-hover:text-white/60 transition-colors duration-300"
                  style={{ fontSize: 10.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)" }}>
                  Our Services
                </span>
                <svg className="w-3.5 h-3.5 group-hover:text-white/50 transition-colors duration-300"
                  style={{ color: "rgba(255,255,255,0.22)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </Link>
          </motion.div>

          {/* Specialty pill badges — inspired by reference design */}
          <motion.div className="flex flex-wrap gap-2 mb-10"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.38 }}>
            {["Balayage", "Blonde Specialist", "Color", "Bridal", "Extensions", "Treatments"].map((tag, i) => (
              <motion.span key={tag}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.45 + i * 0.07, duration: 0.35 }}
                className="px-3.5 py-1.5 text-[9.5px] tracking-[0.18em] uppercase whitespace-nowrap"
                style={{
                  border: "1px solid rgba(201,168,76,0.22)",
                  color: "rgba(255,255,255,0.45)",
                  background: "rgba(201,168,76,0.04)",
                  borderRadius: 9999,
                }}>
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Stats bar */}
          <motion.div className="flex flex-wrap gap-x-8 gap-y-4 pt-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.85 }}
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { v: "4.8★", l: "Google Rating" },
              { v: "28+",  l: "Happy Clients" },
              { v: "10+",  l: "Years Mastery" },
              { v: "Veteran", l: "Owned" },
            ].map((b, i) => (
              <motion.div key={b.l} className="flex flex-col gap-[5px]"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.95 + i * 0.08 }}>
                <span className="font-serif font-bold" style={{ fontSize: 21, color: "rgba(255,255,255,0.90)" }}>{b.v}</span>
                <span style={{ fontSize: 8, letterSpacing: "0.36em", textTransform: "uppercase", color: "rgba(255,255,255,0.24)" }}>{b.l}</span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.div>

      {/* ── Floating testimonial card overlay (desktop, right panel) — inspired by reference design ── */}
      <motion.div
        className="hidden lg:block absolute z-20"
        style={{ right: "4%", bottom: "12%" }}
        initial={{ opacity: 0, y: 24, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="px-5 py-4 max-w-[240px]"
          style={{
            background: "rgba(8,5,3,0.88)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(201,168,76,0.18)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.06)",
          }}>
          {/* Stars */}
          <div className="flex gap-0.5 mb-2">
            {[1,2,3,4,5].map(i => (
              <span key={i} style={{ color: "hsl(43,72%,56%)", fontSize: 11 }}>★</span>
            ))}
          </div>
          <p className="font-serif italic leading-snug mb-3"
            style={{ fontSize: 11.5, color: "rgba(255,255,255,0.58)" }}>
            "My hair has never looked so radiant and healthy. Truly world-class."
          </p>
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full flex items-center justify-center font-serif font-semibold"
              style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", fontSize: 9, color: "rgba(201,168,76,0.8)" }}>
              S
            </div>
            <div>
              <p style={{ fontSize: 9.5, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>Sarah M.</p>
              <p style={{ fontSize: 7.5, color: "rgba(255,255,255,0.25)", letterSpacing: "0.22em", textTransform: "uppercase" }}>Frisco, TX</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-[27.5%] lg:left-[27.5%] z-20 hidden lg:flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }} aria-hidden="true">
        <span style={{ fontSize: 7.5, letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>Scroll</span>
        <motion.div className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.50), transparent)" }}
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

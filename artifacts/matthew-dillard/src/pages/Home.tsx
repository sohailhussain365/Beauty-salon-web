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
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const BADGE_ROWS = [
    ["Balayage", "Color", "Bridal", "Approved"],
    ["Extensions", "Blonde Specialist", "Treatments"],
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "hsl(30,7%,90%)", minHeight: "100svh" }}
      data-testid="hero"
    >
      <motion.div
        className="relative z-10 flex flex-col lg:flex-row min-h-screen"
        style={{ opacity }}
      >

        {/* ════════════ LEFT PANEL ════════════ */}
        <div className="w-full lg:w-[52%] flex flex-col justify-center px-8 sm:px-12 lg:px-14 xl:px-20 pt-28 pb-14 lg:pt-0 lg:pb-0">

          {/* Eyebrow */}
          <motion.p
            className="mb-6"
            style={{ fontSize: 10, letterSpacing: "0.38em", textTransform: "uppercase", color: "#999" }}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}>
            Luxury Hair Artistry · Prosper, TX
          </motion.p>

          {/* ── MASSIVE bold uppercase heading — exact match to reference ── */}
          <h1 className="mb-7 select-none" style={{ lineHeight: 0.9 }}>
            {["ELEVATE,", "RESTORE,", "SHINE."].map((word, i) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.08 }}
                style={{
                  fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(62px, 9vw, 126px)",
                  letterSpacing: "0.01em",
                  textTransform: "uppercase",
                  color: "#0d0d0c",
                  display: "block",
                }}>
                {word}
              </motion.div>
            ))}
          </h1>

          {/* Description */}
          <motion.p
            className="mb-9 leading-relaxed"
            style={{ fontSize: "clamp(13px, 1.1vw, 15.5px)", color: "#666", maxWidth: 380, lineHeight: 1.75 }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}>
            Discover a premier salon experience designed to elevate your look, restore your confidence, and make your hair truly shine — in Prosper, TX.
          </motion.p>

          {/* ── Dark rounded-pill CTA button — exactly like reference ── */}
          <motion.div className="mb-10 flex items-center gap-5 flex-wrap"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.58 }}>
            <Link href="/booking">
              <motion.div
                className="inline-flex items-center gap-3 cursor-pointer font-semibold"
                style={{
                  background: "#111",
                  color: "#fff",
                  borderRadius: 9999,
                  padding: "15px 36px",
                  fontSize: 13,
                  letterSpacing: "0.01em",
                }}
                whileHover={{ background: "#222", scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                data-testid="hero-book">
                Book Appointment
                <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </Link>
            <Link href="/services">
              <motion.span
                className="inline-flex items-center gap-1.5 cursor-pointer"
                style={{ fontSize: 12, color: "#888", letterSpacing: "0.01em" }}
                whileHover={{ color: "#333", x: 3 }}
                data-testid="hero-services">
                Our Services
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.span>
            </Link>
          </motion.div>

          {/* ── White pill badges — 2 rows, exactly like reference ── */}
          <motion.div className="flex flex-col gap-2.5"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.72 }}>
            {BADGE_ROWS.map((row, ri) => (
              <div key={ri} className="flex flex-wrap gap-2">
                {row.map((tag, ti) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.75 + ri * 0.06 + ti * 0.05, duration: 0.3 }}
                    style={{
                      padding: "8px 20px",
                      border: "1px solid #ccc",
                      color: "#333",
                      background: "rgba(255,255,255,0.75)",
                      borderRadius: 9999,
                      fontSize: 11.5,
                      fontWeight: 400,
                      letterSpacing: "0.01em",
                      backdropFilter: "blur(4px)",
                      cursor: "default",
                    }}>
                    {tag}
                  </motion.span>
                ))}
              </div>
            ))}
          </motion.div>

        </div>

        {/* ════════════ RIGHT PANEL: Arch + portrait + testimonial ════════════ */}
        <div className="w-full lg:w-[48%] flex items-center justify-center relative lg:min-h-screen">

          {/* Extra left space so portrait can bleed left — total wrapper is wider */}
          <div className="relative" style={{ marginLeft: "clamp(40px, 6vw, 90px)" }}>

            {/* ── THE ARCH ── tombstone shape: full-radius top, square bottom */}
            <motion.div
              className="relative overflow-hidden"
              style={{
                width: "clamp(300px, 36vw, 450px)",
                height: "clamp(480px, 86vh, 700px)",
                borderRadius: "9999px 9999px 14px 14px",
                background: "hsl(22,18%,8%)",
                boxShadow: "0 30px 90px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.08)",
              }}
              initial={{ opacity: 0, y: 44, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0 }}
            >
              {/* Photo */}
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1000&q=88"
                alt="Luxury hair artistry"
                className="w-full h-full object-cover"
                style={{ objectPosition: "50% 15%", filter: "brightness(0.65) saturate(0.78)" }}
              />

              {/* Bottom gradient so testimonial is readable */}
              <div className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{
                  height: "55%",
                  background: "linear-gradient(to top, rgba(5,2,1,0.97) 0%, rgba(5,2,1,0.65) 45%, transparent 100%)",
                }} />

              {/* ── Testimonial — bottom of arch ── */}
              <motion.div
                className="absolute bottom-5 left-5 right-5 z-10"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}>
                {/* Stars */}
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} style={{ color: "#f5c842", fontSize: 13 }}>★</span>
                  ))}
                </div>
                {/* Quote */}
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: 10, fontStyle: "italic" }}>
                  "My skin has never looked so radiant and healthy. The shades are a perfect match, and they last all day!"
                </p>
                {/* Avatar + name */}
                <div className="flex items-center gap-2.5">
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%", overflow: "hidden",
                    border: "1.5px solid rgba(255,255,255,0.25)", flexShrink: 0,
                  }}>
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
                      alt="Emily R."
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Emily R.</span>
                </div>
              </motion.div>
            </motion.div>

            {/* ── CIRCULAR PORTRAIT — bleeds left out of the arch ── */}
            <motion.div
              className="absolute z-20"
              style={{
                left: "clamp(-90px, -22%, -50px)",
                top: "42%",
                transform: "translateY(-50%)",
              }}
              initial={{ opacity: 0, x: -28, scale: 0.72 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            >
              <div style={{
                width: "clamp(120px, 13vw, 168px)",
                height: "clamp(120px, 13vw, 168px)",
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid hsl(30,7%,90%)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.22)",
              }}>
                <img
                  src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500&q=88"
                  alt="Happy salon client"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "50% 10%" }}
                />
              </div>
            </motion.div>

          </div>
        </div>

      </motion.div>

      {/* ── Fade transition into the dark site below ── */}
      <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(22,18%,4%))" }} />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-8 z-20 hidden lg:flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }} aria-hidden="true">
        <span style={{ fontSize: 7, letterSpacing: "0.42em", textTransform: "uppercase", color: "#999" }}>Scroll</span>
        <motion.div className="w-px h-7 bg-gray-400"
          animate={{ scaleY: [0.35, 1, 0.35], opacity: [0.4, 0.8, 0.4] }}
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
    <div className="relative overflow-hidden py-5"
      style={{ background: "hsl(22,18%,5%)", borderTop: "1px solid rgba(201,168,76,0.12)", borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-9 flex-shrink-0 px-9">
            <span style={{ fontSize: 9.5, letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", whiteSpace: "nowrap" }}>{item}</span>
            <span style={{ color: "rgba(201,168,76,0.45)", fontSize: 11 }}>✦</span>
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
    <section className="py-16 md:py-24 section-light">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section eyebrow */}
        <motion.div className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
          <div className="h-px w-7" style={{ background: "hsl(43,65%,52%)" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.42em", textTransform: "uppercase", color: "hsl(43,62%,44%)" }}>At a Glance</span>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col items-center text-center gap-2 p-6 sm:p-8 relative overflow-hidden card-light"
              whileHover={{ y: -5, boxShadow: "0 8px 40px rgba(22,15,8,0.1)", transition: { duration: 0.2 } }}>
              {/* Gold top bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} aria-hidden="true" />
              <div className="relative z-10">
                <span className="heading-bebas block" style={{ fontSize: "clamp(42px, 5.5vw, 64px)", color: "hsl(22,20%,8%)", lineHeight: 1 }}>
                  {s.display ? s.display : <CountUp end={s.end} suffix="" duration={1.8} />}{s.suffix}
                </span>
                <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(22,15,8,0.5)", marginTop: 10 }}>{s.label}</p>
                <p style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(22,15,8,0.3)", marginTop: 3 }}>{s.sub}</p>
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
        <div className="mb-12 md:mb-16">
          <motion.div className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}>
            <div className="h-px w-7" style={{ background: "hsl(43,65%,52%)" }} />
            <span className="text-[9px] tracking-[0.42em] uppercase text-yellow-400/65">Specialties</span>
          </motion.div>
          <div className="overflow-hidden mb-4">
            <motion.h2
              className="heading-bebas"
              style={{ fontSize: "clamp(52px, 8vw, 106px)", color: "rgba(255,255,255,0.90)", lineHeight: 0.92 }}
              initial={{ y: "108%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
              Crafted{" "}
              <span style={{ color: "hsl(43,65%,52%)" }}>Services</span>
            </motion.h2>
          </div>
          <motion.p className="text-sm text-white/38 max-w-md leading-relaxed font-serif italic"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
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
        <Layout lightNav transparentNav>
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

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
    ["Balayage", "Color", "Bridal"],
    ["Extensions", "Blonde", "Treatments"],
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "hsl(22,18%,4%)", minHeight: "100svh" }}
      data-testid="hero"
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 55% 60% at 20% 55%, rgba(201,168,76,0.045) 0%, transparent 70%)" }} />

      <motion.div
        className="relative z-10 flex flex-col lg:flex-row items-center min-h-screen px-6 sm:px-10 lg:px-14 xl:px-20 pt-24 pb-14 gap-10 lg:gap-6"
        style={{ opacity }}
      >

        {/* ════ LEFT: Text ════ */}
        <div className="w-full lg:w-[54%] flex flex-col justify-center order-2 lg:order-1">

          {/* Eyebrow */}
          <motion.div className="flex items-center gap-3 mb-7"
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}>
            <motion.div className="h-px shrink-0"
              initial={{ width: 0 }} animate={{ width: 28 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              style={{ background: "linear-gradient(to right, hsl(43,65%,52%), rgba(201,168,76,0.0))" }} />
            <span style={{ fontSize: 8.5, letterSpacing: "0.44em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>
              Luxury Hair Artistry · Prosper TX
            </span>
          </motion.div>

          {/* HUGE bold uppercase headline — like the reference */}
          <h1 className="font-sans font-black uppercase leading-[0.82] tracking-[-0.02em] mb-7 select-none">
            {[
              { text: "ELEVATE,",  color: "rgba(255,255,255,0.93)" },
              { text: "RESTORE,",  color: "rgba(255,255,255,0.93)" },
              { text: "SHINE.",    color: "hsl(43,68%,54%)" },
            ].map((line, li) => (
              <div key={li} className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "108%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.3 + li * 0.13 }}
                  style={{
                    fontSize: "clamp(48px, 7vw, 100px)",
                    color: line.color,
                    display: "block",
                  }}>
                  {line.text}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Description */}
          <motion.p className="mb-9 leading-[1.85]"
            style={{ fontSize: "clamp(13px, 1.0vw, 15px)", color: "rgba(255,255,255,0.42)", maxWidth: 390 }}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.75 }}>
            Where craft meets confidence. An elevated salon experience for those who demand the extraordinary — in Prosper, TX.
          </motion.p>

          {/* CTAs */}
          <motion.div className="flex flex-wrap items-center gap-4 mb-10"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}>
            <Link href="/booking">
              <motion.div
                className="group relative overflow-hidden cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, hsl(43,70%,52%), hsl(35,74%,44%))",
                  borderRadius: 9999,
                  padding: "13px 34px",
                  boxShadow: "0 6px 32px rgba(201,168,76,0.30)",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 56px rgba(201,168,76,0.55)" }}
                whileTap={{ scale: 0.97 }}
                data-testid="hero-book">
                <span className="relative z-10 flex items-center gap-2.5 font-semibold whitespace-nowrap"
                  style={{ fontSize: 10.5, letterSpacing: "0.24em", textTransform: "uppercase", color: "#000" }}>
                  Book Appointment
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, hsl(43,82%,60%), hsl(35,85%,52%))" }} />
              </motion.div>
            </Link>

            <Link href="/services">
              <motion.div className="flex items-center gap-2 cursor-pointer group" whileHover={{ x: 4 }} data-testid="hero-services">
                <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}
                  className="group-hover:text-white/60 transition-colors">
                  Our Services
                </span>
                <svg className="w-3 h-3" style={{ color: "rgba(255,255,255,0.22)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </Link>
          </motion.div>

          {/* Pill badge rows — exactly like the reference */}
          <motion.div className="flex flex-col gap-2.5"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}>
            {BADGE_ROWS.map((row, ri) => (
              <div key={ri} className="flex flex-wrap gap-2">
                {row.map((tag, ti) => (
                  <motion.span key={tag}
                    initial={{ opacity: 0, scale: 0.82 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.28 + ri * 0.12 + ti * 0.07, duration: 0.32 }}
                    className="whitespace-nowrap"
                    style={{
                      padding: "7px 18px",
                      border: "1px solid rgba(201,168,76,0.22)",
                      color: "rgba(255,255,255,0.52)",
                      background: "rgba(201,168,76,0.04)",
                      borderRadius: 9999,
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}>
                    {tag}
                  </motion.span>
                ))}
              </div>
            ))}
          </motion.div>

        </div>

        {/* ════ RIGHT: Arch panel ════ */}
        <div className="w-full lg:w-[46%] flex items-center justify-center lg:justify-end order-1 lg:order-2 relative">

          {/* Arch wrapper — handles z-stacking for the portrait circle */}
          <div className="relative" style={{ width: "min(340px, 82vw)", height: "min(490px, 68vh)" }}>

            {/* ── Arch shape with salon photo ── */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              style={{
                borderRadius: "50% 50% 14px 14px / 34% 34% 14px 14px",
                background: "hsl(22,14%,7%)",
                border: "1px solid rgba(201,168,76,0.14)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
              }}
              initial={{ opacity: 0, y: 36, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=85"
                alt="Luxury hair artistry"
                className="w-full h-full object-cover"
                style={{ objectPosition: "50% 16%", filter: "brightness(0.72) saturate(0.82)" }}
              />
              {/* Top vignette */}
              <div className="absolute top-0 inset-x-0 h-28 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, rgba(10,6,3,0.4) 0%, transparent 100%)" }} />
              {/* Bottom gradient for testimonial readability */}
              <div className="absolute bottom-0 inset-x-0 h-52 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(8,4,2,0.92) 0%, rgba(8,4,2,0.5) 50%, transparent 100%)" }} />

              {/* ── Testimonial card inside arch ── */}
              <motion.div
                className="absolute bottom-5 left-4 right-4 z-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.9 }}
              >
                <div className="px-4 py-3.5"
                  style={{
                    background: "rgba(6,3,1,0.88)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    border: "1px solid rgba(201,168,76,0.20)",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.5)",
                    borderRadius: 4,
                  }}>
                  <div className="flex gap-0.5 mb-1.5">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} style={{ color: "hsl(43,72%,56%)", fontSize: 11 }}>★</span>
                    ))}
                  </div>
                  <p className="font-serif italic leading-snug mb-2.5"
                    style={{ fontSize: 11, color: "rgba(255,255,255,0.62)" }}>
                    "My hair has never looked so radiant. Truly world-class artistry."
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden shrink-0"
                      style={{ border: "1.5px solid rgba(201,168,76,0.35)" }}>
                      <img
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80"
                        alt="Emily R."
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>Emily R.</span>
                    <span style={{ fontSize: 8, color: "rgba(201,168,76,0.5)", marginLeft: "auto", letterSpacing: "0.18em", textTransform: "uppercase" }}>Frisco, TX</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Circular portrait — overlapping the left boundary of the arch ── */}
            <motion.div
              className="absolute z-20"
              style={{ left: "-14%", top: "36%", transform: "translateY(-50%)" }}
              initial={{ opacity: 0, x: -24, scale: 0.75 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 1.3 }}
            >
              <div style={{
                width: "clamp(100px, 12vw, 148px)",
                height: "clamp(100px, 12vw, 148px)",
                borderRadius: "50%",
                overflow: "hidden",
                border: "3.5px solid hsl(22,18%,4%)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1.5px rgba(201,168,76,0.25)",
              }}>
                <img
                  src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&q=85"
                  alt="Happy client"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "50% 12%" }}
                />
              </div>
            </motion.div>

          </div>
        </div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }} aria-hidden="true">
        <span style={{ fontSize: 7, letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>Scroll</span>
        <motion.div className="w-px h-7"
          style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)" }}
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

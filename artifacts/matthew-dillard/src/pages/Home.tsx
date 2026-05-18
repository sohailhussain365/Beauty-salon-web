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

// ─── Hero Photo Element ────────────────────────────────────────────────────────
function SalonElement() {
  return (
    <div className="relative w-full max-w-[360px] mx-auto select-none" aria-hidden="true">
      {/* Ambient glow */}
      <div className="absolute -inset-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)" }} />

      {/* Corner bracket accents */}
      <div className="absolute -top-3 -left-3 w-8 h-8 border-t border-l" style={{ borderColor: "rgba(201,168,76,0.5)" }} />
      <div className="absolute -top-3 -right-3 w-8 h-8 border-t border-r" style={{ borderColor: "rgba(201,168,76,0.5)" }} />
      <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b border-l" style={{ borderColor: "rgba(201,168,76,0.5)" }} />
      <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b border-r" style={{ borderColor: "rgba(201,168,76,0.5)" }} />

      {/* Photo */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <motion.img
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=85"
          alt="Luxury hair artistry"
          className="w-full h-full object-cover object-top"
          style={{ filter: "brightness(0.78) saturate(0.88)" }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(5,3,2,0.82) 0%, transparent 100%)" }} />
        {/* Bottom label */}
        <div className="absolute bottom-5 inset-x-0 px-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.12)" }} />
            <span style={{ fontSize: 7, letterSpacing: "0.48em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>ARTISTRY</span>
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.12)" }} />
          </div>
          <p className="text-center" style={{ fontSize: 8.5, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.42)" }}>
            Matthew Dillard · Prosper TX
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden" data-testid="hero">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 120% 90% at 30% 55%, hsl(26,18%,9%) 0%, hsl(22,18%,4%) 60%, hsl(20,18%,3%) 100%)"
        }} />
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: "min(700px,100vw)", height: "min(700px,100vw)", top: "30%", left: "25%", translateX: "-50%", translateY: "-50%", background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 62%)" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: "min(500px,80vw)", height: "min(500px,80vw)", top: "60%", right: "10%", background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 62%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      </motion.div>

      <BeautyElements />

      <motion.div className="relative z-10 w-full max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-16" style={{ opacity }}>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center min-h-[85vh]">

          {/* ── Left: text ── */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <motion.div className="flex items-center gap-3 mb-7"
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              <motion.div className="h-px shrink-0" initial={{ width: 0 }} animate={{ width: 32 }}
                transition={{ duration: 0.8, delay: 0.5 }} style={{ background: "rgba(255,255,255,0.18)" }} />
              <span style={{ fontSize: "clamp(8px,1.5vw,9px)", letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)" }}>
                Luxury Hair Artistry · Prosper TX
              </span>
            </motion.div>

            <h1 className="font-serif leading-[1.0] mb-7">
              {["Elevate", "Your Hair."].map((line, li) => (
                <div key={li} className="overflow-hidden">
                  <motion.span className="block"
                    initial={{ y: "105%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 + li * 0.16 }}
                    style={{
                      fontSize: "clamp(42px, 6.5vw, 86px)",
                      color: li === 0 ? "rgba(255,255,255,0.88)" : undefined,
                      fontWeight: li === 0 ? 500 : 700,
                    }}
                  >
                    {li === 1 ? <span className="shimmer-text italic">{line}</span> : line}
                  </motion.span>
                </div>
              ))}
            </h1>

            <motion.p className="mb-10 max-w-md text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.38)", letterSpacing: "0.03em" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.75 }}>
              Where craft meets confidence. An elevated salon experience for those who demand the extraordinary.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.95 }}>
              <Link href="/booking">
                <motion.div
                  className="group relative overflow-hidden px-8 sm:px-9 py-4 cursor-pointer w-full sm:w-auto text-center"
                  style={{ background: "linear-gradient(135deg, hsl(43,68%,50%), hsl(35,72%,42%))", boxShadow: "0 6px 32px rgba(201,168,76,0.38)" }}
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 40px rgba(201,168,76,0.55)" }}
                  animate={{ boxShadow: ["0 6px 32px rgba(201,168,76,0.3)", "0 6px 48px rgba(201,168,76,0.55)", "0 6px 32px rgba(201,168,76,0.3)"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" } as never}
                  data-testid="hero-book">
                  <span className="relative z-10 flex items-center justify-center gap-3 font-medium"
                    style={{ fontSize: 11, letterSpacing: "0.26em", textTransform: "uppercase", color: "#000" }}>
                    Book Appointment
                    <motion.svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      animate={{ x: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, hsl(43,78%,58%), hsl(35,80%,50%))" }} />
                </motion.div>
              </Link>
              <Link href="/services">
                <motion.div className="flex items-center gap-2.5 cursor-pointer group py-4 sm:py-0" whileHover={{ x: 4 }} data-testid="hero-services">
                  <span className="group-hover:text-white/80 transition-colors"
                    style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>
                    Our Services
                  </span>
                  <svg className="w-3 h-3 transition-colors" style={{ color: "rgba(255,255,255,0.3)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div className="flex flex-wrap gap-x-6 gap-y-4 mt-10 pt-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {[{ v: "4.8★", l: "Rating" }, { v: "28+", l: "Reviews" }, { v: "10+", l: "Years" }, { v: "Veteran", l: "Owned" }].map((b, i) => (
                <motion.div key={b.l} className="flex flex-col gap-0.5"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 + i * 0.08 }}>
                  <span className="font-serif font-semibold" style={{ fontSize: 17, color: "rgba(255,255,255,0.85)" }}>{b.v}</span>
                  <span style={{ fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>{b.l}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: lightweight CSS 3D element ── */}
          <motion.div
            className="flex items-center justify-center order-1 lg:order-2 relative py-8 lg:py-0"
            initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}>
            <SalonElement />

            {/* Floating badge chips */}
            {[
              { label: "Master Colorist", angle: -40, r: 195 },
              { label: "Balayage Expert", angle: 160, r: 185 },
              { label: "Prosper, TX", angle: 88, r: 202 },
            ].map((badge) => {
              const rad = (badge.angle * Math.PI) / 180;
              return (
                <motion.div key={badge.label} className="absolute hidden sm:block"
                  style={{
                    left: "50%",
                    top: "50%",
                    translateX: `calc(-50% + ${Math.cos(rad) * badge.r}px)`,
                    translateY: `calc(-50% + ${Math.sin(rad) * badge.r}px)`,
                  }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 1.6 }}>
                  <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="px-3 py-1.5 whitespace-nowrap"
                    style={{
                      background: "rgba(8,6,4,0.88)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(14px)",
                      fontSize: 8,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.48)",
                    }}>
                    {badge.label}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
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

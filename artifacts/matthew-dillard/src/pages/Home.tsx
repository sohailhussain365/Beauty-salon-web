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

// ─── Full-height editorial photo ──────────────────────────────────────────────
function SalonElement() {
  return (
    <div className="absolute inset-y-0 right-0 w-[46%] hidden lg:block overflow-hidden" aria-hidden="true">
      <motion.img
        src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1000&q=88"
        alt="Luxury hair artistry"
        className="w-full h-full object-cover object-center"
        style={{ filter: "brightness(0.66) saturate(0.80) contrast(1.06)" }}
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      />
      {/* Left gradient bleed */}
      <div className="absolute inset-y-0 left-0 w-52 pointer-events-none z-10"
        style={{ background: "linear-gradient(to right, hsl(22,18%,3%) 0%, hsl(22,18%,3%) 5%, transparent 100%)" }} />
      {/* Top fade */}
      <div className="absolute top-0 inset-x-0 h-36 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, hsl(22,18%,3%) 0%, transparent 100%)" }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-48 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, hsl(22,18%,3%) 0%, transparent 100%)" }} />
      {/* Label chip */}
      <motion.div className="absolute bottom-12 right-10 z-20"
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.9 }}>
        <div className="px-4 py-2.5"
          style={{ background: "rgba(4,3,2,0.72)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p style={{ fontSize: 8, letterSpacing: "0.44em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>
            Artistry · Precision · Care
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex overflow-hidden" data-testid="hero">

      {/* ── Deep background ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 110% 100% at 22% 50%, hsl(26,18%,8%) 0%, hsl(22,18%,4%) 48%, hsl(20,18%,2%) 100%)"
        }} />
        {/* Warm glow left */}
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 700, height: 700, top: "10%", left: "-10%", background: "radial-gradient(ellipse, rgba(190,148,72,0.07) 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      {/* ── Particle field ── */}
      <ParticleField />

      {/* ── Subtle background tools ── */}
      <BeautyElements />

      {/* ── Full-height editorial photo — right 46% ── */}
      <SalonElement />

      {/* ── Text block — left 56% ── */}
      <motion.div
        className="relative z-10 flex items-center w-full lg:w-[56%] min-h-screen px-7 sm:px-12 lg:px-16 xl:px-22 pt-28 pb-20"
        style={{ opacity }}
      >
        <motion.div className="w-full max-w-[560px]" style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "16%"]) }}>

          {/* Eyebrow line */}
          <motion.div className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
            <motion.div className="h-px shrink-0" initial={{ width: 0 }} animate={{ width: 40 }}
              transition={{ duration: 1.1, delay: 0.5 }} style={{ background: "rgba(255,255,255,0.18)" }} />
            <span style={{ fontSize: 9, letterSpacing: "0.46em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>
              Luxury Hair Artistry · Prosper TX
            </span>
          </motion.div>

          {/* ── Oversized 3-line headline ── */}
          <h1 className="font-serif leading-[0.90] mb-10">
            {[
              { text: "Elevate", weight: 400, italic: false, size: "clamp(56px, 8.5vw, 122px)" },
              { text: "Your",    weight: 500, italic: true,  size: "clamp(56px, 8.5vw, 122px)" },
              { text: "Hair.",   weight: 700, italic: true,  size: "clamp(56px, 8.5vw, 122px)" },
            ].map((line, li) => (
              <div key={li} className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "112%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1], delay: 0.38 + li * 0.22 }}
                  style={{
                    fontSize: line.size,
                    fontWeight: line.weight,
                    fontStyle: line.italic ? "italic" : "normal",
                    color: li === 2 ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)",
                    display: "block",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {li === 2 ? <span className="shimmer-text">{line.text}</span> : line.text}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Description */}
          <motion.p
            className="mb-10 leading-relaxed"
            style={{ fontSize: "clamp(13px,1.15vw,15px)", color: "rgba(255,255,255,0.34)", letterSpacing: "0.025em", maxWidth: 400 }}
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.05 }}
          >
            Where craft meets confidence. An elevated salon experience for those who demand the extraordinary.
          </motion.p>

          {/* CTA row */}
          <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 1.2 }}>
            <Link href="/booking">
              <motion.div
                className="group relative overflow-hidden px-10 py-4 cursor-pointer w-full sm:w-auto text-center"
                style={{ background: "linear-gradient(135deg, hsl(43,70%,52%), hsl(35,74%,44%))", boxShadow: "0 6px 32px rgba(201,168,76,0.26)" }}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 48px rgba(201,168,76,0.52)" }}
                whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ["0 6px 28px rgba(201,168,76,0.20)", "0 6px 44px rgba(201,168,76,0.46)", "0 6px 28px rgba(201,168,76,0.20)"] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" } as never}
                data-testid="hero-book"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 font-semibold"
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
              <motion.div className="flex items-center gap-3 cursor-pointer group py-4 sm:py-0" whileHover={{ x: 5 }} data-testid="hero-services">
                <span className="group-hover:text-white/70 transition-colors duration-300"
                  style={{ fontSize: 10.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.34)" }}>
                  Our Services
                </span>
                <svg className="w-3.5 h-3.5 transition-colors duration-300 group-hover:text-white/50"
                  style={{ color: "rgba(255,255,255,0.24)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div className="flex flex-wrap gap-x-8 gap-y-4 mt-14 pt-9"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {[{ v: "4.8★", l: "Rating" }, { v: "28+", l: "Reviews" }, { v: "10+", l: "Years" }, { v: "Veteran", l: "Owned" }].map((b, i) => (
              <motion.div key={b.l} className="flex flex-col gap-1"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7 + i * 0.09 }}>
                <span className="font-serif font-bold" style={{ fontSize: 21, color: "rgba(255,255,255,0.88)" }}>{b.v}</span>
                <span style={{ fontSize: 8, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(255,255,255,0.20)" }}>{b.l}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile photo */}
          <div className="lg:hidden mt-10 overflow-hidden relative" style={{ aspectRatio: "4/3" }}>
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
              alt="Luxury hair artistry"
              className="w-full h-full object-cover object-top"
              style={{ filter: "brightness(0.70) saturate(0.82)" }}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3"
              style={{ background: "linear-gradient(to top, rgba(5,3,2,0.88) 0%, transparent 100%)" }} />
          </div>

        </motion.div>
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

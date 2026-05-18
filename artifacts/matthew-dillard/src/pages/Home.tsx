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
        <div className="w-full lg:w-[52%] flex flex-col justify-center px-8 sm:px-12 lg:px-14 xl:px-20 pt-28 pb-14 lg:pt-28 lg:pb-0">

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

          <motion.p
            className="mb-9 leading-relaxed"
            style={{ fontSize: "clamp(13px, 1.1vw, 15.5px)", color: "#666", maxWidth: 380, lineHeight: 1.75 }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}>
            Discover a premier salon experience designed to elevate your look, restore your confidence, and make your hair truly shine — in Prosper, TX.
          </motion.p>

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

        {/* ════════════ RIGHT PANEL ════════════ */}
        <div className="w-full lg:w-[48%] flex items-center justify-center relative lg:min-h-screen">
          <div className="relative" style={{ marginLeft: "clamp(40px, 6vw, 90px)" }}>
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
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1000&q=88"
                alt="Luxury hair artistry"
                className="w-full h-full object-cover"
                style={{ objectPosition: "50% 15%", filter: "brightness(0.65) saturate(0.78)" }}
              />
              <div className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{
                  height: "55%",
                  background: "linear-gradient(to top, rgba(5,2,1,0.97) 0%, rgba(5,2,1,0.65) 45%, transparent 100%)",
                }} />
              <motion.div
                className="absolute bottom-5 left-5 right-5 z-10"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}>
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} style={{ color: "#f5c842", fontSize: 13 }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: 10, fontStyle: "italic" }}>
                  "My skin has never looked so radiant and healthy. The shades are a perfect match, and they last all day!"
                </p>
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

      {/* Fade to next section — cream to cream */}
      <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(30,8%,93%))" }} />

      <motion.div
        className="absolute bottom-8 left-8 z-20 hidden lg:flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }} aria-hidden="true">
        <span style={{ fontSize: 7, letterSpacing: "0.42em", textTransform: "uppercase", color: "#999" }}>Scroll</span>
        <motion.div className="w-px h-7" style={{ background: "rgba(22,15,8,0.25)" }}
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
      style={{ background: "hsl(30,8%,90%)", borderTop: "1px solid rgba(22,15,8,0.07)", borderBottom: "1px solid rgba(22,15,8,0.07)" }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-9 flex-shrink-0 px-9">
            <span style={{ fontSize: 9.5, letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(22,15,8,0.38)", whiteSpace: "nowrap" }}>{item}</span>
            <span style={{ color: "rgba(22,15,8,0.22)", fontSize: 11 }}>✦</span>
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
    <section className="py-16 md:py-24 section-divider relative overflow-hidden" style={{ background: "hsl(30,10%,96%)" }}>
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div className="flex items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
          <motion.span className="h-px" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ background: "linear-gradient(90deg, transparent, rgba(22,15,8,0.25))" }} />
          <span style={{ fontSize: 11, letterSpacing: "0.38em", textTransform: "uppercase", color: "hsl(22,20%,14%)", fontWeight: 600 }}>At a Glance</span>
          <motion.span className="h-px" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ background: "linear-gradient(90deg, rgba(22,15,8,0.25), transparent)" }} />
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col items-center text-center gap-2 p-6 sm:p-8 relative overflow-hidden"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(22,15,8,0.07)",
                boxShadow: "0 2px 16px rgba(22,15,8,0.045)",
              }}
              whileHover={{ y: -5, borderColor: "rgba(22,15,8,0.14)", transition: { duration: 0.2 } }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(22,15,8,0.03) 0%, transparent 70%)" }} aria-hidden="true" />
              <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(90deg, hsl(22,15%,12%), transparent)" }} aria-hidden="true" />
              <div className="relative z-10">
                <span className="heading-bebas block shimmer-text" style={{ fontSize: "clamp(42px, 5.5vw, 64px)", lineHeight: 1 }}>
                  {s.display ? s.display : <CountUp end={s.end} suffix="" duration={1.8} />}{s.suffix}
                </span>
                <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(22,15,8,0.45)", marginTop: 10 }}>{s.label}</p>
                <p style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(22,15,8,0.28)", marginTop: 3 }}>{s.sub}</p>
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
  { icon: "✦", title: "Balayage", desc: "Hand-painted sun-kissed color that grows out naturally." },
  { icon: "◈", title: "Blonde Specialist", desc: "Every shade of blonde — platinum to honey, perfected." },
  { icon: "❋", title: "Hair Treatments", desc: "Olaplex, keratin, and deep conditioning therapies." },
  { icon: "❃", title: "Bridal Styling", desc: "Your wedding day hair — from trial to the aisle." },
  { icon: "◉", title: "Hair Coloring", desc: "Dimensional color executed with precision and vision." },
  { icon: "⬡", title: "Extensions", desc: "Length and volume using premium human hair." },
];

function ServicesPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-20 md:py-32 section-divider relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="block w-12 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(22,15,8,0.22))" }} />
            <span className="text-[13px] tracking-[0.28em] uppercase font-semibold" style={{ color: "hsl(22,20%,12%)" }}>Specialties</span>
            <span className="block w-12 h-px" style={{ background: "linear-gradient(90deg, rgba(22,15,8,0.22), transparent)" }} />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif" style={{ color: "hsl(22,20%,8%)" }}>
            Crafted <span className="text-gold-gradient italic">&amp;</span> Perfected
          </h2>
          <p className="mt-4 text-sm tracking-wide max-w-md mx-auto font-serif italic" style={{ color: "rgba(22,15,8,0.42)" }}>
            Every service is a statement. Every result, a transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "rgba(22,15,8,0.08)" }}>
          {SERVICES_PREVIEW.map((svc, i) => (
            <motion.div key={svc.title}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.06 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden cursor-pointer"
              style={{ background: "hsl(30,10%,98%)" }}>

              {/* Gold left-border accent — slides in on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500"
                style={{ background: "linear-gradient(to top, hsl(43,70%,44%), hsl(43,80%,58%))" }}
                aria-hidden="true" />

              {/* Subtle hover background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.04) 0%, transparent 60%)" }}
                aria-hidden="true" />

              <div className="relative z-10 p-8 flex flex-col h-full min-h-[200px]">
                {/* Top row — icon + number */}
                <div className="flex items-start justify-between mb-6">
                  {/* Icon box */}
                  <div
                    className="w-11 h-11 flex items-center justify-center transition-all duration-400 group-hover:scale-110"
                    style={{
                      background: "rgba(22,15,8,0.04)",
                      border: "1px solid rgba(22,15,8,0.10)",
                      color: "rgba(22,15,8,0.58)",
                      fontSize: 18,
                    }}>
                    {svc.icon}
                  </div>
                  {/* Index number */}
                  <span
                    className="font-serif transition-colors duration-300"
                    style={{ fontSize: 11, color: "rgba(22,15,8,0.18)", letterSpacing: "0.08em", marginTop: 2 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-serif font-semibold mb-2 transition-colors duration-300 group-hover:text-black"
                  style={{ fontSize: 17, color: "hsl(22,20%,10%)", lineHeight: 1.3 }}>
                  {svc.title}
                </h3>

                {/* Divider */}
                <div className="mb-3 h-px w-8 transition-all duration-500 group-hover:w-14"
                  style={{ background: "linear-gradient(90deg, hsl(43,70%,46%), rgba(201,168,76,0.3))" }} />

                {/* Description */}
                <p className="text-xs leading-relaxed flex-1" style={{ color: "rgba(22,15,8,0.50)" }}>
                  {svc.desc}
                </p>

                {/* CTA — reveals on hover */}
                <div className="mt-5 flex items-center gap-2 overflow-hidden">
                  <span
                    className="text-[9px] tracking-[0.28em] uppercase font-semibold translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-350"
                    style={{ color: "hsl(43,60%,36%)" }}>
                    Explore
                  </span>
                  <svg
                    className="w-2.5 h-2.5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-350 delay-75"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    style={{ color: "hsl(43,60%,40%)" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="flex items-center justify-between mt-8"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <p className="text-[10px] tracking-[0.28em] uppercase" style={{ color: "rgba(22,15,8,0.28)" }}>
            {SERVICES_PREVIEW.length} signature services
          </p>
          <Link href="/services">
            <motion.div
              className="group inline-flex items-center gap-3 cursor-pointer"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}>
              <span className="text-[10px] tracking-[0.30em] uppercase font-semibold"
                style={{ color: "hsl(22,20%,10%)" }}>
                View All Services
              </span>
              <div className="w-7 h-7 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ border: "1px solid rgba(22,15,8,0.20)", color: "rgba(22,15,8,0.60)" }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
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

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Layout from "@/components/Layout";
import LoadingScreen from "@/components/LoadingScreen";
import BeautyElements from "@/components/BeautyElements";
import CtaSection from "@/components/CtaSection";
import BeforeAfter from "@/components/BeforeAfter";
import TestimonialsSlider from "@/components/TestimonialsSlider";

// ─── Floating Sparkles ────────────────────────────────────────────────────────
function FloatingSparkles({ count = 20 }: { count?: number }) {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    id: i, x: Math.random() * 100, delay: Math.random() * 8,
    duration: 6 + Math.random() * 8, size: 2 + Math.random() * 3,
    hue: [210, 320, 260, 43][i % 4],
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {sparkles.map((s) => (
        <motion.div key={s.id} className="absolute rounded-full"
          style={{ left: `${s.x}%`, bottom: "-8px", width: s.size, height: s.size, background: `hsl(${s.hue},80%,75%)`, boxShadow: `0 0 ${s.size * 3}px ${s.size}px hsla(${s.hue},80%,75%,0.5)` }}
          animate={{ y: [0, -(400 + Math.random() * 250)], x: [0, (Math.random() - 0.5) * 80], opacity: [0, 0.6, 0.5, 0], scale: [0, 1, 0.8, 0] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// ─── 3D Gyroscope Salon Element — Ethereal ────────────────────────────────────
function SalonElement() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
      setMouse({ x: ((e.clientX - cx) / rect.width) * 14, y: ((e.clientY - cy) / rect.height) * 14 });
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const gemColors = ["rgba(220,240,255,0.95)", "rgba(255,210,230,0.95)", "rgba(200,215,255,0.85)", "rgba(240,220,255,0.85)"];

  return (
    <div ref={containerRef} className="relative select-none" style={{ width: 380, height: 380 }} aria-hidden="true">
      <div className="absolute rounded-full pointer-events-none"
        style={{ inset: -90, background: "radial-gradient(ellipse, rgba(180,210,255,0.09) 0%, rgba(230,185,215,0.05) 40%, transparent 65%)", animation: "orb-halo-drift 7s ease-in-out infinite" }} />
      <motion.div className="absolute inset-0 flex items-center justify-center"
        animate={{ rotateX: -mouse.y * 0.22, rotateY: mouse.x * 0.22 }}
        transition={{ type: "spring", stiffness: 80, damping: 25 }}
        style={{ perspective: "700px", transformStyle: "preserve-3d" }}>
        {/* Ring 1 — ice blue */}
        <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", border: "1.5px solid rgba(180,215,255,0.50)", boxShadow: "0 0 26px rgba(180,215,255,0.10)", animation: "ring-spin-1 18s linear infinite" }}>
          {[0,90,180,270].map((deg, di) => (
            <div key={deg} style={{ position: "absolute", top: "50%", left: "50%", transformOrigin: "0 0", transform: `rotate(${deg}deg)` }}>
              <div style={{ position: "absolute", top: -177, left: -5, width: 10, height: 10, borderRadius: "2px", background: gemColors[di], boxShadow: `0 0 10px 4px ${gemColors[di].replace("0.95","0.7").replace("0.85","0.6")}`, transform: "rotate(45deg)" }} />
            </div>
          ))}
        </div>
        {/* Ring 2 — blush rose */}
        <div style={{ position: "absolute", width: 290, height: 290, borderRadius: "50%", border: "1px solid rgba(230,185,215,0.38)", animation: "ring-spin-2 26s linear infinite" }}>
          {[45,225].map((deg,di) => (
            <div key={deg} style={{ position: "absolute", top: "50%", left: "50%", transformOrigin: "0 0", transform: `rotate(${deg}deg)` }}>
              <div style={{ position: "absolute", top: -148, left: -4, width: 8, height: 8, borderRadius: "50%", background: di===0?"rgba(255,210,230,0.95)":"rgba(200,230,255,0.95)", boxShadow: `0 0 14px 5px ${di===0?"rgba(230,180,210,0.7)":"rgba(180,215,255,0.7)"}` }} />
            </div>
          ))}
        </div>
        {/* Ring 3 — silver */}
        <div style={{ position: "absolute", width: 230, height: 230, borderRadius: "50%", border: "1px solid rgba(210,218,240,0.28)", animation: "ring-spin-3 34s linear infinite" }}>
          {[135,315].map((deg) => (
            <div key={deg} style={{ position: "absolute", top: "50%", left: "50%", transformOrigin: "0 0", transform: `rotate(${deg}deg)` }}>
              <div style={{ position: "absolute", top: -118, left: -4, width: 8, height: 8, background: "rgba(215,220,245,0.80)", boxShadow: "0 0 10px 4px rgba(200,210,255,0.6)", transform: "rotate(45deg)" }} />
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", width: 170, height: 170, borderRadius: "50%", border: "1px solid rgba(200,212,240,0.18)", boxShadow: "inset 0 0 40px rgba(180,210,255,0.05)" }} />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{ width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(180,210,255,0.22) 0%, rgba(230,185,215,0.10) 45%, transparent 72%)", boxShadow: "0 0 80px rgba(180,210,255,0.28), 0 0 160px rgba(230,185,215,0.08)", animation: "orb-core-pulse 4s ease-in-out infinite" }} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div style={{ color: "rgba(215,228,255,0.88)", width: 100, height: 100 }}
          animate={{ scale: [1,1.06,1], filter: ["drop-shadow(0 0 6px rgba(180,215,255,0.4))","drop-shadow(0 0 26px rgba(200,225,255,0.95)) drop-shadow(0 0 50px rgba(230,185,215,0.5))","drop-shadow(0 0 6px rgba(180,215,255,0.4))"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <motion.g animate={{ rotate: [0,14,0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "50px 50px" }}>
              <circle cx="20" cy="20" r="13" strokeWidth="2.5" /><circle cx="20" cy="20" r="5" fill="rgba(215,228,255,0.88)" stroke="none" />
              <line x1="31" y1="25" x2="50" y2="50" strokeWidth="2.5" /><path d="M 50 50 L 88 16" strokeWidth="2.5" />
            </motion.g>
            <motion.g animate={{ rotate: [0,-14,0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "50px 50px" }}>
              <circle cx="20" cy="80" r="13" strokeWidth="2.5" /><circle cx="20" cy="80" r="5" fill="rgba(215,228,255,0.88)" stroke="none" />
              <line x1="31" y1="75" x2="50" y2="50" strokeWidth="2.5" /><path d="M 50 50 L 88 84" strokeWidth="2.5" />
            </motion.g>
            <circle cx="50" cy="50" r="5.5" fill="rgba(215,228,255,0.88)" stroke="none" />
          </svg>
        </motion.div>
      </div>

      <motion.div className="absolute" style={{ top: "calc(50% - 7px)", left: "calc(50% - 7px)" }}
        animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
        <div style={{ position: "absolute", top: -177, left: -7, width: 14, height: 14, borderRadius: "50%", background: "hsl(210,100%,90%)", boxShadow: "0 0 20px 8px rgba(180,215,255,0.9), 0 0 40px 12px rgba(180,215,255,0.35)" }} />
      </motion.div>
      <motion.div className="absolute" style={{ top: "calc(50% - 5px)", left: "calc(50% - 5px)" }}
        animate={{ rotate: -360 }} transition={{ duration: 7, repeat: Infinity, ease: "linear" }}>
        <div style={{ position: "absolute", top: -148, left: -5, width: 10, height: 10, borderRadius: "50%", background: "rgba(255,205,225,0.95)", boxShadow: "0 0 16px 5px rgba(230,180,210,0.75)" }} />
      </motion.div>
      {[0,72,144,216,288].map((deg, i) => {
        const rad = (deg*Math.PI)/180, r = 190;
        return (
          <motion.div key={i} className="absolute"
            style={{ left: "50%", top: "50%", x: Math.cos(rad)*r-8, y: Math.sin(rad)*r-8, color: ["rgba(190,215,255,0.65)","rgba(240,200,255,0.60)","rgba(255,205,225,0.60)","rgba(210,230,255,0.65)","rgba(225,205,255,0.60)"][i], width: 16 }}
            animate={{ opacity: [0.15,1,0.15], scale: [0.5,1.4,0.5], rotate: [0,180,360] }}
            transition={{ duration: 3+i*0.4, repeat: Infinity, ease: "easeInOut", delay: i*0.6 }}>
            <svg viewBox="0 0 40 40" fill="currentColor"><path d="M20 2 L21.5 17 L36 18 L21.5 20 L20 38 L18.5 20 L4 18 L18.5 17 Z" /></svg>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── CountUp ──────────────────────────────────────────────────────────────────
function CountUp({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();
    const frame = () => {
      const elapsed = (Date.now()-startTime)/1000;
      const p = Math.min(elapsed/duration, 1);
      setCount(Math.floor((1-Math.pow(1-p,3))*end));
      if (p < 1) requestAnimationFrame(frame); else setCount(end);
    };
    requestAnimationFrame(frame);
  }, [inView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
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
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 90% at 30% 55%, hsl(26,18%,9%) 0%, hsl(22,18%,4%) 60%, hsl(20,18%,3%) 100%)" }} />
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 700, height: 700, top: "30%", left: "25%", translateX: "-50%", translateY: "-50%", background: "radial-gradient(ellipse, rgba(180,210,255,0.06) 0%, transparent 62%)" }}
          animate={{ scale: [1,1.1,1], opacity: [0.6,1,0.6] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ width: 500, height: 500, top: "60%", right: "10%", background: "radial-gradient(ellipse, rgba(230,185,215,0.05) 0%, transparent 62%)" }}
          animate={{ scale: [1,1.15,1], opacity: [0.4,0.8,0.4] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      </motion.div>

      <BeautyElements />
      <FloatingSparkles count={22} />

      <motion.div className="relative z-10 w-full max-w-[1380px] mx-auto px-6 lg:px-10 pt-24 pb-16" style={{ opacity }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[85vh]">
          {/* Left: text */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <motion.div className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              <motion.div className="h-px" initial={{ width: 0 }} animate={{ width: 48 }} transition={{ duration: 0.8, delay: 0.5 }}
                style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }} />
              <span style={{ fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(201,168,76,0.65)" }}>Luxury Hair Artistry · Prosper TX</span>
            </motion.div>

            <h1 className="font-serif leading-[1.0] mb-7">
              {["Elevate", "Your Hair."].map((line, li) => (
                <div key={li} className="overflow-hidden">
                  <motion.span className="block"
                    initial={{ y: "105%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 + li * 0.16 }}
                    style={{ fontSize: "clamp(44px, 6vw, 82px)", color: li===0?"rgba(255,255,255,0.88)":undefined, fontWeight: li===0?500:700 }}
                  >{li===1?<span className="shimmer-text italic">{line}</span>:line}</motion.span>
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
                <motion.div className="group relative overflow-hidden px-9 py-4 cursor-pointer"
                  style={{ background: "linear-gradient(135deg, hsl(43,68%,50%), hsl(35,72%,42%))", boxShadow: "0 6px 32px rgba(201,168,76,0.38)" }}
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 40px rgba(201,168,76,0.55)" }}
                  animate={{ boxShadow: ["0 6px 32px rgba(201,168,76,0.3)","0 6px 48px rgba(201,168,76,0.55)","0 6px 32px rgba(201,168,76,0.3)"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" } as never}
                  data-testid="hero-book">
                  <span className="relative z-10 flex items-center gap-3 font-medium"
                    style={{ fontSize: 11, letterSpacing: "0.26em", textTransform: "uppercase", color: "#000" }}>
                    Book Appointment
                    <motion.svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      animate={{ x: [0,3,0] }} transition={{ duration: 2, repeat: Infinity }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, hsl(43,78%,58%), hsl(35,80%,50%))" }} />
                </motion.div>
              </Link>
              <Link href="/services">
                <motion.div className="flex items-center gap-2.5 cursor-pointer group" whileHover={{ x: 4 }} data-testid="hero-services">
                  <span className="group-hover:text-yellow-400 transition-colors"
                    style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)" }}>Our Services</span>
                  <svg className="w-3 h-3 text-yellow-500/60 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </Link>
            </motion.div>

            <motion.div className="flex flex-wrap gap-6 mt-10 pt-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
              style={{ borderTop: "1px solid rgba(201,168,76,0.08)" }}>
              {[{v:"4.8★",l:"Rating"},{v:"28+",l:"Reviews"},{v:"10+",l:"Years"},{v:"Veteran",l:"Owned"}].map((b,i)=>(
                <motion.div key={b.l} className="flex flex-col gap-0.5"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 + i * 0.08 }}>
                  <span className="font-serif font-semibold" style={{ fontSize: 17, color: "hsl(43,65%,52%)" }}>{b.v}</span>
                  <span style={{ fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>{b.l}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D element */}
          <motion.div className="flex items-center justify-center order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}>
            <SalonElement />
            {[{label:"Master Colorist",angle:-40,r:215},{label:"Balayage Expert",angle:160,r:205},{label:"Prosper, TX",angle:88,r:225}].map((badge)=>{
              const rad = (badge.angle*Math.PI)/180;
              return (
                <motion.div key={badge.label} className="absolute"
                  style={{ left:"50%", top:"50%", translateX:`calc(-50% + ${Math.cos(rad)*badge.r}px)`, translateY:`calc(-50% + ${Math.sin(rad)*badge.r}px)` }}
                  initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 1.6 }}>
                  <motion.div animate={{ y: [0,-6,0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="px-3 py-1.5 whitespace-nowrap"
                    style={{ background: "rgba(8,5,2,0.88)", border: "1px solid rgba(180,210,255,0.22)", backdropFilter: "blur(14px)", fontSize: 8, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(200,220,255,0.65)" }}
                  >{badge.label}</motion.div>
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
  const items = ["Luxury Hair Artistry","Balayage Specialist","Master Colorist","Prosper, Texas","Veteran Owned","LGBTQ+ Friendly","Bridal Styling","Blonde Specialist"];
  const doubled = [...items,...items];
  return (
    <div className="relative overflow-hidden py-4 section-divider"
      style={{ background: "hsl(22,16%,6%)", borderTop: "1px solid rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-8 flex-shrink-0 px-8">
            <span style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", whiteSpace: "nowrap" }}>{item}</span>
            <span style={{ color: "rgba(201,168,76,0.4)", fontSize: 8 }}>✦</span>
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
    <section className="py-20 md:py-24 section-divider" style={{ background: "hsl(22,16%,5%)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 70, scale: 0.9, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col items-center text-center gap-2 p-6 relative overflow-hidden"
              style={{ border: "1px solid rgba(201,168,76,0.08)" }}
              whileHover={{ borderColor: "rgba(201,168,76,0.25)", y: -4, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.06), transparent 70%)" }} />
              <div className="relative z-10">
                <span className="font-serif font-bold text-4xl md:text-5xl" style={{ color: "hsl(43,65%,55%)" }}>
                  {s.display ? s.display : <CountUp end={s.end} suffix="" duration={1.8} />}{s.suffix}
                </span>
                <p className="text-[11px] tracking-[0.2em] uppercase text-white/55 mt-2">{s.label}</p>
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
    <section className="py-28 md:py-36 section-divider relative overflow-hidden">
      {/* Ambient floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{ left: `${(i * 8.5) % 100}%`, bottom: "-6px", width: 2 + (i%3), height: 2 + (i%3), background: `hsl(${43+i*20},70%,65%)`, boxShadow: `0 0 ${(2+(i%3))*4}px ${(2+(i%3))+1}px hsla(${43+i*20},70%,65%,0.4)` }}
            animate={{ y: [0,-(300+i*20)], opacity: [0,0.5,0.4,0], scale: [0,1,0.8,0] }}
            transition={{ duration: 7+i*0.5, delay: i*0.8, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
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
            <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-serif"
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
              initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.06 }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-8 overflow-hidden cursor-pointer"
              style={{ background: "linear-gradient(145deg, hsl(22,16%,8%), hsl(22,14%,6%))", border: "1px solid rgba(201,168,76,0.08)" }}
              whileHover={{ borderColor: "rgba(201,168,76,0.28)", y: -8, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 20% 10%, ${svc.color.replace("0.8","0.09").replace("0.7","0.07")}, transparent 65%)` }} aria-hidden="true" />
              <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: `linear-gradient(90deg, ${svc.color}, transparent)` }} aria-hidden="true" />
              <div className="relative z-10">
                <motion.div className="mb-5 text-3xl" style={{ color: svc.color }}
                  animate={{ rotate: [0,5,0,-5,0] }} transition={{ duration: 5+i*0.5, repeat: Infinity, ease: "easeInOut" }}>
                  {svc.icon}
                </motion.div>
                <div className="overflow-hidden mb-3">
                  <motion.h3 className="text-base font-serif font-semibold text-white/85 group-hover:text-white transition-colors"
                    initial={{ y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.1 + 0.15, ease: [0.16, 1, 0.3, 1] }}>
                    {svc.title}
                  </motion.h3>
                </div>
                <motion.p className="text-xs text-white/38 leading-relaxed"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.25 }}>
                  {svc.desc}
                </motion.p>
                <div className="h-px mt-5 w-0 group-hover:w-10 transition-all duration-500" style={{ background: svc.color }} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
          <Link href="/services">
            <motion.span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase cursor-pointer"
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

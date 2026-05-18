import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import LoadingScreen from "@/components/LoadingScreen";
import BeautyElements from "@/components/BeautyElements";
import CtaSection from "@/components/CtaSection";
import BeforeAfter from "@/components/BeforeAfter";
import TestimonialsSlider from "@/components/TestimonialsSlider";

// ─── Salon Centerpiece ────────────────────────────────────────────────────────
function SalonElement() {
  return (
    <div className="relative select-none" style={{ width: 340, height: 340 }} aria-hidden="true">
      {/* Large ambient halo */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: -70,
          background: "radial-gradient(ellipse, rgba(201,168,76,0.18) 0%, rgba(180,130,50,0.06) 50%, transparent 70%)",
          animation: "orb-halo-drift 6s ease-in-out infinite",
        }}
      />

      {/* Outer precision ring — clockwise with graduation marks */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: "1.5px solid rgba(201,168,76,0.55)", boxShadow: "0 0 24px rgba(201,168,76,0.14)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <div
            key={deg}
            style={{
              position: "absolute", top: "50%", left: "50%",
              transformOrigin: "0 0", transform: `rotate(${deg}deg)`,
            }}
          >
            <div style={{
              position: "absolute",
              top: -170, left: deg % 90 === 0 ? -1.5 : -0.75,
              width: deg % 90 === 0 ? 3 : 1.5,
              height: deg % 90 === 0 ? 13 : 6,
              background: `rgba(201,168,76,${deg % 90 === 0 ? 0.9 : 0.45})`,
            }} />
          </div>
        ))}
      </motion.div>

      {/* Middle ring — counter-clockwise */}
      <motion.div
        className="absolute rounded-full"
        style={{ inset: 26, border: "1px solid rgba(201,168,76,0.38)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[45, 135, 225, 315].map((deg) => (
          <div
            key={deg}
            style={{
              position: "absolute", top: "50%", left: "50%",
              transformOrigin: "0 0", transform: `rotate(${deg}deg)`,
            }}
          >
            <div style={{
              position: "absolute",
              top: -144, left: -2,
              width: 4, height: 4, borderRadius: "50%",
              background: "rgba(201,168,76,0.55)",
            }} />
          </div>
        ))}
      </motion.div>

      {/* Inner decorative ring */}
      <div
        className="absolute rounded-full"
        style={{ inset: 54, border: "1px solid rgba(201,168,76,0.22)", boxShadow: "inset 0 0 30px rgba(201,168,76,0.06)" }}
      />

      {/* Golden core glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div style={{
          width: 140, height: 140, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.32) 0%, rgba(201,168,76,0.1) 45%, transparent 72%)",
          boxShadow: "0 0 80px rgba(201,168,76,0.35), 0 0 160px rgba(201,168,76,0.1)",
          animation: "orb-core-pulse 4s ease-in-out infinite",
        }} />
      </div>

      {/* ✦ SCISSORS — golden centerpiece */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ color: "hsl(43,80%,65%)", width: 96, height: 96 }}
          animate={{
            scale: [1, 1.07, 1],
            filter: [
              "drop-shadow(0 0 10px rgba(201,168,76,0.55))",
              "drop-shadow(0 0 28px rgba(201,168,76,0.95))",
              "drop-shadow(0 0 10px rgba(201,168,76,0.55))",
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            {/* Upper blade */}
            <motion.g
              animate={{ rotate: [0, 12, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "50px 50px" }}
            >
              <circle cx="20" cy="20" r="13" strokeWidth="2.5" />
              <line x1="31" y1="25" x2="50" y2="50" strokeWidth="2.5" />
              <path d="M 50 50 L 86 18" strokeWidth="2.5" />
            </motion.g>
            {/* Lower blade */}
            <motion.g
              animate={{ rotate: [0, -12, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "50px 50px" }}
            >
              <circle cx="20" cy="80" r="13" strokeWidth="2.5" />
              <line x1="31" y1="75" x2="50" y2="50" strokeWidth="2.5" />
              <path d="M 50 50 L 86 82" strokeWidth="2.5" />
            </motion.g>
            {/* Pivot */}
            <circle cx="50" cy="50" r="5" fill="hsl(43,80%,65%)" stroke="none" />
          </svg>
        </motion.div>
      </div>

      {/* Orbiting golden dot — outer ring */}
      <motion.div
        className="absolute"
        style={{ top: "calc(50% - 6px)", left: "calc(50% - 6px)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      >
        <div style={{
          position: "absolute", top: -170, left: -6,
          width: 12, height: 12, borderRadius: "50%",
          background: "hsl(43,80%,62%)",
          boxShadow: "0 0 20px 6px rgba(201,168,76,0.9)",
        }} />
      </motion.div>

      {/* Orbiting champagne dot — middle ring */}
      <motion.div
        className="absolute"
        style={{ top: "calc(50% - 5px)", left: "calc(50% - 5px)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "linear" }}
      >
        <div style={{
          position: "absolute", top: -131, left: -5,
          width: 10, height: 10, borderRadius: "50%",
          background: "rgba(255,230,150,0.95)",
          boxShadow: "0 0 16px 4px rgba(201,168,76,0.72)",
        }} />
      </motion.div>

      {/* Orbiting hair-dye droplet */}
      <motion.div
        className="absolute"
        style={{ top: "50%", left: "50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          style={{ position: "absolute", top: -152, left: -8, color: "rgba(201,168,76,0.72)", width: 16 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 30 40" fill="currentColor">
            <path d="M15 2 C15 2,2 18,2 26 A13 13 0 0 0 28 26 C28 18 15 2 15 2 Z" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Golden sparkle at top */}
      <motion.div
        className="absolute"
        style={{ top: -8, left: "50%", translateX: "-50%", color: "rgba(201,168,76,0.85)", width: 18 }}
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.3, 0.8], rotate: [0, 45, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 40 40" fill="currentColor">
          <path d="M20 2 L21.5 17 L36 18 L21.5 20 L20 38 L18.5 20 L4 18 L18.5 17 Z" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const words = ["Where", "craft", "meets", "confidence."];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden" data-testid="hero">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 120% 90% at 30% 55%, hsl(26,18%,9%) 0%, hsl(22,18%,4%) 60%, hsl(20,18%,3%) 100%)",
          }}
        />
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 700, height: 700,
            top: "30%", left: "25%",
            translateX: "-50%", translateY: "-50%",
            background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 62%)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px",
          }}
          aria-hidden="true"
        />
      </motion.div>

      <BeautyElements />

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]" aria-hidden="true">
        <div className="absolute top-1/2 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,1), transparent)" }} />
        <div className="absolute inset-y-0 left-1/2 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(201,168,76,1), transparent)" }} />
      </div>

      <motion.div className="relative z-10 w-full max-w-[1380px] mx-auto px-6 lg:px-10 pt-24 pb-16" style={{ opacity }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[85vh]">
          {/* ── Left: text ── */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Sub-label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center gap-3 mb-8"
            >
              <motion.div
                className="h-px"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }}
              />
              <span style={{ fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(201,168,76,0.65)" }}>
                Luxury Hair Artistry
              </span>
            </motion.div>

            {/* Main headline */}
            <h1 className="font-serif leading-[1.0] mb-7">
              {["Elevate", "Your Hair."].map((line, li) => (
                <div key={li} className="overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 + li * 0.16 }}
                    style={{
                      fontSize: "clamp(44px, 6vw, 80px)",
                      color: li === 0 ? "rgba(255,255,255,0.88)" : undefined,
                      fontWeight: li === 0 ? 500 : 700,
                    }}
                  >
                    {li === 1 ? <span className="shimmer-text italic">{line}</span> : line}
                  </motion.span>
                </div>
              ))}
            </h1>

            {/* Sub-copy */}
            <div className="mb-10 max-w-md">
              <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.38)", letterSpacing: "0.03em" }}>
                {words.map((w, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-[0.28em]"
                    initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, delay: 0.9 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {w}
                  </motion.span>
                ))}
                {" "}
                {["An", "elevated", "salon", "experience", "for", "those", "who", "demand", "the", "extraordinary."].map((w, i) => (
                  <motion.span
                    key={`b${i}`}
                    className="inline-block mr-[0.28em]"
                    initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, delay: 1.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {w}
                  </motion.span>
                ))}
              </p>
            </div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <Link href="/booking">
              <motion.div
                className="group relative overflow-hidden px-9 py-4 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, hsl(43,68%,50%), hsl(35,72%,42%))",
                  boxShadow: "0 6px 32px rgba(201,168,76,0.38), 0 0 0 1px rgba(201,168,76,0.18)",
                }}
                data-testid="hero-book"
              >
                <span className="relative z-10 flex items-center gap-3 font-medium"
                  style={{ fontSize: 11, letterSpacing: "0.26em", textTransform: "uppercase", color: "#000" }}>
                  Book Appointment
                  <motion.svg
                    className="w-3.5 h-3.5"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, hsl(43,78%,58%), hsl(35,80%,50%))" }}
                />
              </motion.div>
              </Link>
              <Link href="/services">
                <motion.div
                  className="flex items-center gap-2.5 cursor-pointer group"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  data-testid="hero-services"
                >
                  <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)" }}
                    className="group-hover:text-yellow-400 transition-colors">
                    Our Services
                  </span>
                  <svg className="w-3 h-3 text-yellow-500/60 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex flex-wrap gap-4 mt-10 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1 }}
              style={{ borderTop: "1px solid rgba(201,168,76,0.08)" }}
            >
              {[
                { v: "4.8★", l: "Rating" },
                { v: "28+", l: "Reviews" },
                { v: "10+", l: "Years" },
                { v: "Veteran", l: "Owned" },
              ].map((b) => (
                <div key={b.l} className="flex flex-col gap-0.5">
                  <span className="font-serif font-semibold" style={{ fontSize: 16, color: "hsl(43,65%,52%)" }}>{b.v}</span>
                  <span style={{ fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>{b.l}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: 3D Orb ── */}
          <motion.div
            className="flex items-center justify-center order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 420, height: 420,
                background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 65%)",
              }}
              aria-hidden="true"
            />
            <SalonElement />
            {/* Floating mini-badges around orb */}
            {[
              { label: "Master Colorist", angle: -40, r: 200 },
              { label: "Balayage Expert", angle: 160, r: 190 },
              { label: "Prosper, TX", angle: 85, r: 210 },
            ].map((badge) => {
              const rad = (badge.angle * Math.PI) / 180;
              const x = Math.cos(rad) * badge.r;
              const y = Math.sin(rad) * badge.r;
              return (
                <motion.div
                  key={badge.label}
                  className="absolute"
                  style={{ left: "50%", top: "50%", translateX: `calc(-50% + ${x}px)`, translateY: `calc(-50% + ${y}px)` }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 1.4 }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
                    className="px-3 py-1.5 whitespace-nowrap"
                    style={{
                      background: "rgba(10,7,4,0.85)",
                      border: "1px solid rgba(201,168,76,0.22)",
                      backdropFilter: "blur(12px)",
                      fontSize: 8,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "rgba(201,168,76,0.7)",
                    }}
                  >
                    {badge.label}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="flex flex-col items-center gap-2 mt-4 lg:-mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-1"
          >
            <span style={{ fontSize: 7.5, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>Scroll</span>
            <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)" }} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Side labels */}
      <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 opacity-20" aria-hidden="true">
        <div className="w-px h-14" style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.6))" }} />
        <span className="rotate-90 origin-center whitespace-nowrap" style={{ fontSize: 7, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", margin: "24px 0" }}>Matthew Dillard</span>
        <div className="w-px h-14" style={{ background: "linear-gradient(to top, transparent, rgba(201,168,76,0.6))" }} />
      </div>
      <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 opacity-20" aria-hidden="true">
        <div className="w-px h-14" style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.6))" }} />
        <span className="rotate-90 origin-center whitespace-nowrap" style={{ fontSize: 7, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", margin: "24px 0" }}>Hair Salons</span>
        <div className="w-px h-14" style={{ background: "linear-gradient(to top, transparent, rgba(201,168,76,0.6))" }} />
      </div>
    </section>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ["Luxury Hair Artistry", "Balayage Specialist", "Master Colorist", "Prosper, Texas", "Veteran Owned", "LGBTQ+ Friendly", "Bridal Styling", "Blonde Specialist"];
  const doubled = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden py-4 section-divider"
      style={{ background: "hsl(22,16%,6%)", borderTop: "1px solid rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.08)" }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-8 flex-shrink-0 px-8">
            <span style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", whiteSpace: "nowrap" }}>
              {item}
            </span>
            <span style={{ color: "rgba(201,168,76,0.4)", fontSize: 8 }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const stats = [
    { value: "4.8", suffix: "★", label: "Average Rating", sub: "Google Reviews" },
    { value: "28", suffix: "+", label: "Verified Reviews", sub: "Real Clients" },
    { value: "10", suffix: "+", label: "Years of Artistry", sub: "Master-Level Craft" },
    { value: "5K", suffix: "+", label: "Clients Transformed", sub: "& Counting" },
  ];
  return (
    <section ref={ref} className="py-20 section-divider">
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden p-7 text-center"
              style={{
                background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))",
                border: "1px solid rgba(201,168,76,0.09)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07), transparent 70%)" }}
                aria-hidden="true"
              />
              <div
                className="absolute top-0 inset-x-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }}
                aria-hidden="true"
              />
              <p className="font-serif font-bold shimmer-text mb-1" style={{ fontSize: 38 }}>
                {s.value}<span style={{ fontSize: 22 }}>{s.suffix}</span>
              </p>
              <p className="font-medium mb-0.5" style={{ fontSize: 11, letterSpacing: "0.08em", color: "rgba(255,255,255,0.6)" }}>{s.label}</p>
              <p style={{ fontSize: 8.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Teaser ─────────────────────────────────────────────────────────────
function AboutTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 md:py-32 section-divider overflow-hidden">
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-7">
              <span className="w-8 h-px" style={{ background: "hsl(43,65%,52%)" }} />
              <span style={{ fontSize: 9, letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(201,168,76,0.62)" }}>Our Story</span>
            </div>
            <h2 className="font-serif leading-[1.1] mb-7" style={{ fontSize: "clamp(32px, 4vw, 52px)", color: "rgba(255,255,255,0.88)" }}>
              More Than a Salon —<br />
              <span className="text-gold-gradient italic">A Philosophy</span>
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.42)", maxWidth: 480, marginBottom: 28 }}>
              Veteran-owned and LGBTQ+ friendly, Matthew Dillard Hair Salons was built on the
              belief that extraordinary hair requires extraordinary care. Each appointment is
              treated as a creative commission — collaborative, intentional, and uniquely yours.
            </p>
            <div className="flex flex-wrap gap-2.5 mb-9">
              {["Veteran Owned", "LGBTQ+ Friendly", "Master Colorist", "Blade Specialist"].map((badge) => (
                <span key={badge} className="px-4 py-1.5"
                  style={{ fontSize: 8.5, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", border: "1px solid rgba(201,168,76,0.2)" }}>
                  {badge}
                </span>
              ))}
            </div>
            <Link href="/about">
              <motion.div
                className="inline-flex items-center gap-3 cursor-pointer group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                data-testid="about-link"
              >
                <span style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(201,168,76,0.65)" }}
                  className="group-hover:text-yellow-400 transition-colors">
                  Read Our Story
                </span>
                <svg className="w-3.5 h-3.5 text-yellow-500/60 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="space-y-4"
          >
            {[
              { n: "01", title: "Artistry First", desc: "Hair is sculpted, not just cut. Every appointment begins with a deep creative vision." },
              { n: "02", title: "Personalized Experience", desc: "No two clients are the same. Your lifestyle, texture, and vision shape every decision." },
              { n: "03", title: "Elevated Environment", desc: "A calm, private studio designed to feel exclusive without ever feeling intimidating." },
            ].map((item) => (
              <div key={item.n} className="flex gap-5 p-6 group"
                style={{ background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))", border: "1px solid rgba(201,168,76,0.08)" }}>
                <span className="font-serif text-sm flex-shrink-0 mt-0.5 group-hover:text-yellow-400 transition-colors"
                  style={{ color: "rgba(201,168,76,0.35)" }}>
                  {item.n}
                </span>
                <div>
                  <h3 className="font-serif font-semibold mb-1.5 group-hover:text-white transition-colors" style={{ fontSize: 14, color: "rgba(255,255,255,0.78)" }}>{item.title}</h3>
                  <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "rgba(255,255,255,0.35)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────
function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const steps = [
    { n: "01", title: "The Consultation", desc: "We begin by listening. Understanding your hair history, lifestyle, and aspirations before a single decision is made.", icon: "◇" },
    { n: "02", title: "The Vision", desc: "Together we craft a plan — color theory, shape, texture — a bespoke roadmap for your transformation.", icon: "◈" },
    { n: "03", title: "The Transformation", desc: "Hours of focused artistry. Precision technique combined with premium products for flawless execution.", icon: "◉" },
    { n: "04", title: "The Reveal", desc: "You leave feeling seen, celebrated, and utterly transformed — ready to face the world with renewed confidence.", icon: "✦" },
  ];
  return (
    <section ref={ref} className="py-24 md:py-32 section-divider relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, transparent 0%, hsl(22,18%,5%) 30%, hsl(22,18%,5%) 70%, transparent 100%)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.04), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="w-10 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }} />
            <span style={{ fontSize: 9, letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(201,168,76,0.62)" }}>Your Journey</span>
            <span className="w-10 h-px" style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} />
          </div>
          <h2 className="font-serif" style={{ fontSize: "clamp(30px, 4vw, 52px)", color: "rgba(255,255,255,0.88)" }}>
            The <span className="text-gold-gradient italic">Experience</span>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), rgba(201,168,76,0.2), transparent)" }}
            aria-hidden="true" />
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-8 text-center overflow-hidden"
              style={{ background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))", border: "1px solid rgba(201,168,76,0.08)" }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07), transparent 70%)" }}
                aria-hidden="true"
              />
              <div
                className="absolute top-0 inset-x-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }}
                aria-hidden="true"
              />
              {/* Step number + connector dot */}
              <div className="relative z-10 flex flex-col items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.22)" }}>
                  <span className="font-serif text-xs font-bold" style={{ color: "rgba(201,168,76,0.7)" }}>{step.n}</span>
                </div>
                <span style={{ fontSize: 22, color: "rgba(201,168,76,0.35)" }} className="group-hover:text-yellow-400/60 transition-colors">{step.icon}</span>
              </div>
              <h3 className="font-serif font-semibold mb-3 group-hover:text-white transition-colors" style={{ fontSize: 15, color: "rgba(255,255,255,0.8)" }}>{step.title}</h3>
              <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "rgba(255,255,255,0.35)" }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Philosophy ───────────────────────────────────────────────────────────────
function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="relative py-28 md:py-40 overflow-hidden section-divider">
      {/* Background */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 100% 80% at 50% 50%, hsl(28,18%,8%) 0%, hsl(22,18%,4%) 70%)" }}
        aria-hidden="true" />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: 800, height: 400, background: "radial-gradient(ellipse, rgba(201,168,76,0.05), transparent 65%)" }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      {/* Decorative lines */}
      <div className="absolute top-1/3 inset-x-0 h-px opacity-8" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} aria-hidden="true" />
      <div className="absolute bottom-1/3 inset-x-0 h-px opacity-5" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)" }} aria-hidden="true" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Large quote mark */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-serif select-none pointer-events-none"
            style={{ fontSize: 120, color: "rgba(201,168,76,0.05)", lineHeight: 1 }} aria-hidden="true">
            &ldquo;
          </div>
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="w-12 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }} />
            <span style={{ fontSize: 9, letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(201,168,76,0.62)" }}>Our Belief</span>
            <span className="w-12 h-px" style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} />
          </div>
          <blockquote className="font-serif italic leading-[1.25] mb-10"
            style={{ fontSize: "clamp(22px, 3.5vw, 38px)", color: "rgba(255,255,255,0.72)" }}>
            Every person who sits in this chair deserves to leave feeling extraordinary. Hair is not just aesthetics — it is identity, confidence, and joy.
          </blockquote>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-px mb-2" style={{ background: "hsl(43,65%,52%)" }} />
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", fontFamily: "Playfair Display, serif", fontWeight: 500 }}>Matthew Dillard</span>
            <span style={{ fontSize: 8.5, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(201,168,76,0.5)" }}>Founder & Master Stylist</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Featured Services ────────────────────────────────────────────────────────
const FEATURED_SVCS = [
  { icon: "◈", title: "Balayage", desc: "Hand-painted, sun-kissed color that grows out beautifully and looks effortless in every light.", tag: "Most Popular" },
  { icon: "✦", title: "Blonde Specialist", desc: "Every shade from platinum to honey — executed with bond-building precision and toning mastery.", tag: "Specialty" },
  { icon: "❋", title: "Luxury Treatments", desc: "Olaplex, deep conditioning, and keratin smoothing — restore, repair, and protect from within.", tag: "Recommended" },
  { icon: "❃", title: "Bridal Styling", desc: "Full consultation, trial, and day-of styling for the bride and entire bridal party.", tag: "Book Early" },
];

function FeaturedServices() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 md:py-32 section-divider overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.04), transparent 65%)" }} aria-hidden="true" />
      <div className="max-w-[1380px] mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-5 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px" style={{ background: "hsl(43,65%,52%)" }} />
              <span style={{ fontSize: 9, letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(201,168,76,0.62)" }}>What We Do</span>
            </div>
            <h2 className="font-serif" style={{ fontSize: "clamp(30px, 4vw, 52px)", color: "rgba(255,255,255,0.88)" }}>
              Signature <span className="text-gold-gradient italic">Services</span>
            </h2>
          </div>
          <Link href="/services">
            <motion.div
              className="inline-flex items-center gap-2.5 cursor-pointer group"
              whileHover={{ x: 5 }}
              data-testid="all-services"
            >
              <span style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)" }}
                className="group-hover:text-yellow-400 transition-colors">
                All Services
              </span>
              <svg className="w-3.5 h-3.5 text-yellow-500/60 group-hover:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_SVCS.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden p-8"
              style={{ background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))", border: "1px solid rgba(201,168,76,0.08)" }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08), transparent 65%)" }} aria-hidden="true" />
              <div className="absolute top-0 inset-x-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} aria-hidden="true" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <span style={{ fontSize: 24, color: "rgba(201,168,76,0.38)" }} className="group-hover:text-yellow-400/65 transition-colors">{svc.icon}</span>
                  <span className="px-2.5 py-1" style={{ fontSize: 7.5, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,168,76,0.65)", border: "1px solid rgba(201,168,76,0.2)" }}>
                    {svc.tag}
                  </span>
                </div>
                <h3 className="font-serif font-semibold mb-2.5 group-hover:text-white transition-colors" style={{ fontSize: 15, color: "rgba(255,255,255,0.8)" }}>{svc.title}</h3>
                <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "rgba(255,255,255,0.35)" }}>{svc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("md_loaded")) setLoaded(true);
  }, []);
  const handleLoadComplete = () => {
    sessionStorage.setItem("md_loaded", "1");
    setLoaded(true);
  };

  return (
    <>
      <AnimatePresence>{!loaded && <LoadingScreen onComplete={handleLoadComplete} />}</AnimatePresence>
      {loaded && (
        <Layout transparentNav>
          <Hero />
          <Marquee />
          <Stats />
          <AboutTeaser />
          <Process />
          <Philosophy />
          <FeaturedServices />
          <BeforeAfter />
          <TestimonialsSlider />
          <CtaSection />
        </Layout>
      )}
    </>
  );
}

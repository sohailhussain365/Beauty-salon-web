import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";

function FloatingSparkles({ count = 16 }: { count?: number }) {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    id: i, x: Math.random() * 100, delay: Math.random() * 7,
    duration: 6 + Math.random() * 7, size: 1.5 + Math.random() * 2,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {sparkles.map((s) => (
        <motion.div key={s.id} className="absolute rounded-full"
          style={{ left: `${s.x}%`, bottom: "-6px", width: s.size, height: s.size, background: "rgba(22,15,8,0.18)" }}
          animate={{ y: [0, -(350 + Math.random() * 200)], x: [0, (Math.random() - 0.5) * 70], opacity: [0, 0.4, 0.3, 0], scale: [0, 1, 0.7, 0] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function PulsingRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
      {[1, 1.6, 2.3].map((scale, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{ width: 400, height: 400, border: "1px solid rgba(22,15,8,0.06)", borderRadius: "50%" }}
          animate={{ scale: [scale, scale * 1.05, scale], opacity: [0.12, 0.28, 0.12] }}
          transition={{ duration: 4 + i * 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
        />
      ))}
    </div>
  );
}

export default function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cta" ref={ref}
      className="relative py-32 md:py-44 overflow-hidden section-divider"
      data-testid="cta-section">
      {/* Background */}
      <div className="absolute inset-0"
        style={{ background: "hsl(30,10%,96%)" }}
        aria-hidden="true" />

      {/* Subtle ambient orbs */}
      <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(22,15,8,0.04) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5], x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true" />
      <motion.div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(22,15,8,0.03) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4], x: [0, -20, 0], y: [0, 12, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        aria-hidden="true" />

      {/* Scanning line */}
      <motion.div className="absolute inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(22,15,8,0.07), transparent)" }}
        animate={{ top: ["10%", "90%", "10%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true" />

      {/* Grid lines */}
      <div className="absolute left-0 right-0 top-1/3 h-px opacity-[0.04]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(22,15,8,0.5), transparent)" }} aria-hidden="true" />
      <div className="absolute left-0 right-0 bottom-1/3 h-px opacity-[0.03]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(22,15,8,0.4), transparent)" }} aria-hidden="true" />

      <FloatingSparkles count={18} />
      <PulsingRings />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-8"
        >
          {/* Badge */}
          <motion.div className="flex items-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}>
            <motion.span className="block h-px" initial={{ width: 0 }} animate={inView ? { width: 64 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ background: "linear-gradient(90deg, transparent, rgba(22,15,8,0.25))" }} />
            <span style={{ fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(22,15,8,0.45)" }}>Book Your Experience</span>
            <motion.span className="block h-px" initial={{ width: 0 }} animate={inView ? { width: 64 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ background: "linear-gradient(90deg, rgba(22,15,8,0.25), transparent)" }} />
          </motion.div>

          {/* Headline */}
          <div>
            {["Experience Luxury", "Hair Transformation"].map((line, li) => (
              <div key={li} className="overflow-hidden">
                <motion.span className="block font-serif"
                  initial={{ y: "110%" }} animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.25 + li * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontSize: "clamp(36px, 6vw, 68px)", color: li === 0 ? "hsl(22,20%,8%)" : undefined }}
                >
                  {li === 1 ? <span className="shimmer-text italic">{line}</span> : line}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Body */}
          <motion.p style={{ fontSize: 14, color: "rgba(22,15,8,0.48)", lineHeight: 1.75, maxWidth: 480, letterSpacing: "0.02em" }}
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}>
            Your transformation begins with a single appointment. Let Matthew Dillard bring your hair vision to life with artistry that speaks for itself.
          </motion.p>

          {/* Buttons */}
          <motion.div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.65 }}>
            <Link href="/booking" className="w-full sm:w-auto">
              <motion.div className="group relative px-10 py-5 overflow-hidden cursor-pointer w-full sm:w-auto text-center"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ background: "hsl(22,15%,12%)", boxShadow: "0 6px 28px rgba(22,15,8,0.18), 0 0 0 1px rgba(22,15,8,0.10)" }}
                data-testid="cta-book-btn">
                <span className="relative z-10 flex items-center gap-3 font-medium"
                  style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#ffffff" }}>
                  Book Your Appointment
                  <motion.svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    animate={{ x: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "hsl(22,12%,18%)" }} />
              </motion.div>
            </Link>

            <motion.a href="tel:+19725717787"
              className="px-8 py-5 flex items-center gap-3 transition-all duration-300"
              style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(22,15,8,0.55)", border: "1px solid rgba(22,15,8,0.18)" }}
              whileHover={{ borderColor: "rgba(22,15,8,0.40)", color: "rgba(22,15,8,0.85)", y: -2 }}
              data-testid="cta-call-btn">
              <motion.svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                animate={{ rotate: [0, 12, -12, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 2 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </motion.svg>
              Call Us Now
            </motion.a>
          </motion.div>

          {/* Address */}
          <motion.p style={{ fontSize: 10, color: "rgba(22,15,8,0.28)", letterSpacing: "0.2em" }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.85 }}>
            2281 E University Dr Suite 101 · Prosper, TX 75078
          </motion.p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(22,15,8,0.10), transparent)" }} aria-hidden="true" />
    </section>
  );
}

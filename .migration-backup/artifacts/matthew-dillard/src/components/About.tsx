import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface StatProps {
  value: string;
  label: string;
  symbol?: string;
}

function AnimatedStat({ value, label, symbol = "" }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [displayed, setDisplayed] = useState(0);
  const numericEnd = parseFloat(value.replace(/[^0-9.]/g, ""));
  const prefix = value.startsWith("4.") ? "" : "";

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.floor(eased * numericEnd * 10) / 10);
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplayed(numericEnd);
    };
    requestAnimationFrame(tick);
  }, [inView, numericEnd]);

  const displayValue = value.includes(".") ? displayed.toFixed(1) : Math.floor(displayed).toString();

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <span className="text-3xl md:text-4xl font-serif shimmer-text font-semibold">
        {prefix}{displayValue}{symbol}
      </span>
      <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">{label}</span>
    </div>
  );
}

const BADGES = [
  { label: "Veteran Owned", icon: "★" },
  { label: "LGBTQ+ Friendly", icon: "◆" },
  { label: "Award Winning", icon: "●" },
  { label: "5-Star Experience", icon: "◇" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden section-divider"
      data-testid="about-section"
    >
      {/* Background orb */}
      <div
        className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main card */}
              <div
                className="relative h-[460px] md:h-[520px] overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, hsl(22,16%,11%) 0%, hsl(22,16%,7%) 100%)",
                  border: "1px solid rgba(201,168,76,0.12)",
                }}
              >
                {/* Abstract luxury visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <div
                      className="absolute inset-0 rounded-full animate-pulse-glow"
                      style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.15) 0%, transparent 70%)" }}
                    />
                    <div
                      className="absolute inset-6 rounded-full animate-pulse-glow"
                      style={{
                        background: "radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 70%)",
                        animationDelay: "1s",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-serif shimmer-text font-bold tracking-wider">MD</span>
                    </div>
                  </div>
                </div>
                {/* Decorative lines */}
                <div className="absolute top-6 left-6 w-12 h-px" style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} />
                <div className="absolute top-6 left-6 w-px h-12" style={{ background: "linear-gradient(180deg, hsl(43,65%,52%), transparent)" }} />
                <div className="absolute bottom-6 right-6 w-12 h-px" style={{ background: "linear-gradient(270deg, hsl(43,65%,52%), transparent)" }} />
                <div className="absolute bottom-6 right-6 w-px h-12" style={{ background: "linear-gradient(0deg, hsl(43,65%,52%), transparent)" }} />

                {/* Floating badge */}
                <div
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 px-5 py-2.5 glass"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
                >
                  <p className="text-[9px] tracking-[0.35em] uppercase text-yellow-400/80">Luxury · Art · Craft</p>
                </div>
              </div>

              {/* Floating stat card */}
              <motion.div
                className="absolute -bottom-8 -right-6 glass p-5 min-w-[140px]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.15)" }}
              >
                <p className="text-2xl font-serif shimmer-text font-semibold">4.8</p>
                <div className="flex gap-0.5 my-1">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className="text-yellow-400 text-xs">★</span>
                  ))}
                </div>
                <p className="text-[9px] tracking-[0.2em] uppercase text-white/40">Rating</p>
              </motion.div>
            </div>

            {/* Badges row */}
            <div className="mt-14 flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <span
                  key={b.label}
                  className="glass-light px-3 py-1.5 text-[9px] tracking-[0.25em] uppercase text-yellow-400/70 flex items-center gap-1.5"
                >
                  <span className="text-yellow-500/60">{b.icon}</span> {b.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="block w-8 h-px" style={{ background: "hsl(43,65%,52%)" }} />
              <span className="text-[9px] tracking-[0.4em] uppercase text-yellow-400/60">Our Story</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif leading-[1.1] text-white/90 mb-6">
              Where Artistry <br />
              <span className="text-gold-gradient italic">Meets Luxury</span>
            </h2>

            <div className="space-y-4 text-sm leading-relaxed text-white/50 mb-10">
              <p>
                At Matthew Dillard Hair Salons, every visit is an experience carefully crafted
                for those who appreciate the extraordinary. Our salon is a sanctuary of creativity —
                where technical precision meets artistic vision.
              </p>
              <p>
                As a proud veteran-owned establishment and an enthusiastically LGBTQ+ friendly space,
                we believe that great hair is for everyone. Our relaxed luxury atmosphere puts you
                at ease from the moment you walk through our doors.
              </p>
              <p>
                Matthew brings a unique blend of laid-back warmth and razor-sharp expertise,
                creating a space where you can be yourself while receiving a world-class service
                you'll want to return to again and again.
              </p>
            </div>

            <div className="mb-10">
              <a
                href="tel:+19725717787"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-yellow-400 transition-colors group"
                data-testid="about-phone-link"
              >
                <span className="w-8 h-8 border border-yellow-500/30 flex items-center justify-center group-hover:border-yellow-400/60 transition-colors">
                  <svg className="w-3.5 h-3.5 text-yellow-500/60 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <span>+1 (972) 571-7787</span>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/8">
              <AnimatedStat value="4.8" label="Rating" />
              <AnimatedStat value="28" label="Reviews" symbol="+" />
              <AnimatedStat value="10" label="Years Exp." symbol="+" />
              <AnimatedStat value="5000" label="Clients" symbol="+" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const REVIEWS = [
  {
    text: "I highly recommend him for your next service, he will not disappoint! Matthew has an incredible eye for what works best for each individual client. The atmosphere is relaxed but the results are anything but — truly world-class.",
    author: "Sarah M.",
    location: "Frisco, TX",
    stars: 5,
  },
  {
    text: "Highly suggest this place if you are in the Frisco/McKinney area! I came in for a balayage and left feeling like an entirely different person. The attention to detail and the level of craft here is unlike anything I have experienced.",
    author: "Emily R.",
    location: "McKinney, TX",
    stars: 5,
  },
  {
    text: "Quirky sense of humor and laid back vibe that instantly puts you at ease. Matthew is genuinely talented — the kind of stylist who listens, understands your vision, and then somehow makes it even better than you imagined.",
    author: "Jordan T.",
    location: "Prosper, TX",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08, duration: 0.3 }}
          className="text-yellow-400 text-sm"
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % REVIEWS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const go = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 50 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: -dir * 50 }),
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden section-divider"
      data-testid="testimonials-section"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="block w-12 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }} />
            <span className="text-[9px] tracking-[0.4em] uppercase text-yellow-400/60">Client Stories</span>
            <span className="block w-12 h-px" style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white/90">
            What They <span className="text-gold-gradient italic">Say</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <div
            className="relative overflow-hidden p-8 md:p-12 text-center"
            style={{
              background: "linear-gradient(145deg, hsl(22,16%,9%) 0%, hsl(22,16%,7%) 100%)",
              border: "1px solid rgba(201,168,76,0.12)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            {/* Quote mark */}
            <div
              className="absolute top-6 left-8 text-7xl font-serif leading-none select-none"
              style={{ color: "rgba(201,168,76,0.08)", fontFamily: "Georgia, serif" }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <div className="relative z-10 min-h-[160px] flex flex-col items-center justify-center">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-6"
                >
                  <div className="flex justify-center">
                    <Stars count={REVIEWS[current].stars} />
                  </div>
                  <p className="text-base md:text-lg leading-relaxed text-white/65 font-serif italic max-w-2xl">
                    &ldquo;{REVIEWS[current].text}&rdquo;
                  </p>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-px" style={{ background: "hsl(43,65%,52%)" }} />
                    <span className="text-sm font-medium text-white/70 tracking-wide mt-2">
                      {REVIEWS[current].author}
                    </span>
                    <span className="text-xs tracking-[0.2em] uppercase text-yellow-400/50">
                      {REVIEWS[current].location}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Corner accents */}
            <div className="absolute top-4 right-4 opacity-20" aria-hidden="true">
              <div className="w-6 h-px mb-0.5" style={{ background: "hsl(43,65%,52%)" }} />
              <div className="w-px h-6 ml-6" style={{ background: "hsl(43,65%,52%)" }} />
            </div>
            <div className="absolute bottom-4 left-4 opacity-20" aria-hidden="true">
              <div className="w-px h-6" style={{ background: "hsl(43,65%,52%)" }} />
              <div className="w-6 h-px mt-0" style={{ background: "hsl(43,65%,52%)" }} />
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="transition-all duration-300"
                data-testid={`testimonial-dot-${i}`}
                aria-label={`Review ${i + 1}`}
              >
                <div
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "24px" : "6px",
                    height: "2px",
                    background: i === current ? "hsl(43,65%,52%)" : "rgba(255,255,255,0.2)",
                  }}
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="grid grid-cols-3 gap-4 mt-16 pt-12 border-t border-white/6"
        >
          {[
            { value: "4.8/5", label: "Average Rating" },
            { value: "28+", label: "Verified Reviews" },
            { value: "100%", label: "Would Recommend" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-serif shimmer-text font-semibold">{stat.value}</div>
              <div className="text-[9px] tracking-[0.3em] uppercase text-white/35 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

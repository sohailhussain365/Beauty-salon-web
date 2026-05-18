import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "wouter";

const REVIEWS = [
  { text: "I highly recommend him for your next service, he will not disappoint! Matthew has an incredible eye for what works best for each individual client. The atmosphere is relaxed but the results are anything but — truly world-class.", author: "Sarah M.", location: "Frisco, TX", service: "Balayage", stars: 5 },
  { text: "Highly suggest this place if you are in the Frisco/McKinney area! I came in for a balayage and left feeling like an entirely different person. The attention to detail and the level of craft here is unlike anything I have experienced at any other salon.", author: "Emily R.", location: "McKinney, TX", service: "Balayage", stars: 5 },
  { text: "Quirky sense of humor and laid back vibe that instantly puts you at ease. Matthew is genuinely talented — the kind of stylist who listens, understands your vision, and then somehow makes it even better than you imagined. I will not go anywhere else.", author: "Jordan T.", location: "Prosper, TX", service: "Color", stars: 5 },
  { text: "Finding a colorist who truly understands blonde is nearly impossible. Matthew is the rare exception — my hair has never looked more luminous or felt more healthy. The environment is calm, the conversation is easy, and the results speak for themselves.", author: "Lauren K.", location: "Celina, TX", service: "Blonde Specialist", stars: 5 },
  { text: "Matthew did my hair for my wedding and I could not have been more thrilled. He worked with me through multiple trials until we found exactly the right look — patient, talented, and so supportive throughout the entire process.", author: "Amanda P.", location: "Allen, TX", service: "Bridal Styling", stars: 5 },
  { text: "Veteran-owned and genuinely kind — this is not just a salon, it's a community. Matthew treats every client with such care and intention. I drove 45 minutes and I would drive twice as far. He is simply that good.", author: "Marcus D.", location: "Plano, TX", service: "Haircut", stars: 5 },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, filter: "blur(6px)" }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, filter: "blur(6px)" }),
};

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const dragStart = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(c => (c - 1 + REVIEWS.length) % REVIEWS.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(c => (c + 1) % REVIEWS.length);
  }, []);

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [next, paused]);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 section-divider overflow-hidden"
      style={{ background: "hsl(30,10%,96%)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(22,15,8,0.025), transparent 68%)" }}
        aria-hidden="true" />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between flex-wrap gap-4 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: "hsl(22,15%,20%)" }} />
              <span style={{ fontSize: 9, letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(22,15,8,0.42)" }}>Client Voices</span>
            </div>
            <h2 className="font-serif" style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "hsl(22,20%,8%)" }}>
              What They <span className="text-gold-gradient italic">Say</span>
            </h2>
          </div>
          {/* Review counter */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <span key={i} style={{ color: "hsl(22,15%,22%)", fontSize: 12 }}>★</span>)}
            </div>
            <span style={{ fontSize: 11, color: "rgba(22,15,8,0.38)", marginLeft: 4 }}>4.8 · 28 Reviews</span>
          </div>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          {/* Prev / Next arrows */}
          {["prev", "next"].map(dir => (
            <button
              key={dir}
              onClick={dir === "prev" ? prev : next}
              className="absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              style={{
                [dir === "prev" ? "left" : "right"]: "-0.5rem",
                background: "#ffffff",
                border: "1px solid rgba(22,15,8,0.12)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 2px 12px rgba(22,15,8,0.08)",
              }}
              aria-label={dir === "prev" ? "Previous" : "Next"}
            >
              <svg className="w-4 h-4 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                style={{ color: "rgba(22,15,8,0.45)" }}>
                {dir === "prev"
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                }
              </svg>
            </button>
          ))}

          {/* Card */}
          <div
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onPointerDown={e => { dragStart.current = e.clientX; }}
            onPointerUp={e => {
              const diff = e.clientX - dragStart.current;
              if (Math.abs(diff) > 50) diff < 0 ? next() : prev();
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto max-w-3xl"
              >
                <div
                  className="relative p-7 sm:p-10 md:p-14"
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(22,15,8,0.08)",
                    boxShadow: "0 4px 24px rgba(22,15,8,0.06)",
                  }}
                >
                  {/* Top border accent */}
                  <div className="absolute top-0 inset-x-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(22,15,8,0.18), transparent)" }}
                    aria-hidden="true" />
                  {/* Large quote */}
                  <div className="absolute top-4 left-8 select-none pointer-events-none font-serif"
                    style={{ fontSize: 100, color: "rgba(22,15,8,0.04)", lineHeight: 1 }} aria-hidden="true">&ldquo;</div>

                  <div className="relative z-10">
                    {/* Stars */}
                    <div className="flex gap-1 mb-7">
                      {Array.from({ length: REVIEWS[current].stars }).map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.06, duration: 0.3 }}
                          style={{ color: "hsl(22,15%,22%)", fontSize: 14 }}
                        >★</motion.span>
                      ))}
                    </div>
                    {/* Text */}
                    <p className="font-serif italic leading-relaxed mb-8"
                      style={{ fontSize: "clamp(14px, 1.8vw, 18px)", color: "rgba(22,15,8,0.58)" }}>
                      &ldquo;{REVIEWS[current].text}&rdquo;
                    </p>
                    {/* Author */}
                    <div className="flex items-center gap-5 flex-wrap">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold"
                        style={{ background: "rgba(22,15,8,0.06)", border: "1px solid rgba(22,15,8,0.12)", fontSize: 13, color: "rgba(22,15,8,0.55)" }}>
                        {REVIEWS[current].author[0]}
                      </div>
                      <div>
                        <p className="font-serif font-medium" style={{ fontSize: 14, color: "hsl(22,20%,12%)" }}>{REVIEWS[current].author}</p>
                        <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(22,15,8,0.32)", marginTop: 2 }}>{REVIEWS[current].location}</p>
                      </div>
                      <div className="ml-auto">
                        <span className="px-3 py-1.5" style={{ fontSize: 8.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(22,15,8,0.45)", border: "1px solid rgba(22,15,8,0.12)" }}>
                          {REVIEWS[current].service}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-8">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="transition-all duration-300"
                style={{
                  width: i === current ? 28 : 8,
                  height: 3,
                  background: i === current ? "hsl(22,15%,12%)" : "rgba(22,15,8,0.15)",
                  borderRadius: 2,
                }}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-5 max-w-xs mx-auto h-px relative overflow-hidden" style={{ background: "rgba(22,15,8,0.08)" }}>
            <motion.div
              className="absolute inset-y-0 left-0"
              key={current}
              initial={{ width: "0%" }}
              animate={{ width: paused ? undefined : "100%" }}
              transition={{ duration: 5.5, ease: "linear" }}
              style={{ background: "linear-gradient(90deg, hsl(22,15%,12%), hsl(22,10%,25%))" }}
            />
          </div>
        </div>

        {/* Footer link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <Link href="/testimonials">
            <motion.div
              className="inline-flex items-center gap-3 cursor-pointer group"
              whileHover={{ x: 5 }}
            >
              <span style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(22,15,8,0.45)" }}
                className="group-hover:opacity-70 transition-opacity">
                Read All 28 Reviews
              </span>
              <svg className="w-3.5 h-3.5 transition-opacity group-hover:opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                style={{ color: "rgba(22,15,8,0.45)" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

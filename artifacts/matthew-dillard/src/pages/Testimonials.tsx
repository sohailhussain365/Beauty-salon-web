import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const REVIEWS = [
  { text: "I highly recommend him for your next service, he will not disappoint! Matthew has an incredible eye for what works best for each individual client. The atmosphere is relaxed but the results are anything but — truly world-class.", author: "Sarah M.", location: "Frisco, TX", service: "Balayage", stars: 5 },
  { text: "Highly suggest this place if you are in the Frisco/McKinney area! I came in for a balayage and left feeling like an entirely different person. The attention to detail and level of craft here is unlike anything I've experienced.", author: "Emily R.", location: "McKinney, TX", service: "Balayage", stars: 5 },
  { text: "Quirky sense of humor and laid back vibe that instantly puts you at ease. Matthew is genuinely talented — the kind of stylist who listens, understands your vision, and then somehow makes it even better than you imagined.", author: "Jordan T.", location: "Prosper, TX", service: "Hair Coloring", stars: 5 },
  { text: "Finding a colorist who truly understands blonde is nearly impossible. Matthew is the rare exception — my hair has never looked more luminous or felt more healthy. The results speak for themselves.", author: "Lauren K.", location: "Celina, TX", service: "Blonde Specialist", stars: 5 },
  { text: "Matthew did my hair for my wedding and I could not have been more thrilled. He worked with me through multiple trials until we found exactly the right look — patient, talented, and so supportive throughout.", author: "Amanda P.", location: "Allen, TX", service: "Bridal Styling", stars: 5 },
  { text: "Veteran-owned and genuinely kind — this is not just a salon, it's a community. Matthew treats every client with such care and intention. I drove 45 minutes and I would drive twice as far.", author: "Marcus D.", location: "Plano, TX", service: "Luxury Haircuts", stars: 5 },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const itemUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
};

// ─── CountUp ──────────────────────────────────────────────────────────────────
function CountUp({ end, suffix = "", decimals = 0, duration = 2 }: { end: number; suffix?: string; decimals?: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();
    const frame = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * end;
      setCount(decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.floor(value));
      if (progress < 1) requestAnimationFrame(frame);
      else setCount(end);
    };
    requestAnimationFrame(frame);
  }, [inView, end, duration, decimals]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Animated Stars ───────────────────────────────────────────────────────────
function AnimatedStars({ count = 5, size = "text-sm", delay = 0 }: { count?: number; size?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <motion.span key={i} className={`${size} text-yellow-400`}
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.4, delay: delay + i * 0.07, type: "spring", stiffness: 300, damping: 12 }}
        >★</motion.span>
      ))}
    </div>
  );
}

// ─── Review Card ──────────────────────────────────────────────────────────────
function ReviewCard({ review, index }: { review: typeof REVIEWS[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const isLong = review.text.length > 180;
  const displayText = isLong && !expanded ? review.text.slice(0, 180) + "…" : review.text;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.75, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-8 overflow-hidden flex flex-col gap-5 cursor-default"
      style={{
        background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))",
        border: "1px solid rgba(201,168,76,0.10)",
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease",
      }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setTilt({ x: ((e.clientY - rect.top) / rect.height - 0.5) * 6, y: -((e.clientX - rect.left) / rect.width - 0.5) * 6 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      data-testid={`review-card-${index}`}
    >
      {/* Ambient glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.06), transparent 65%)" }} aria-hidden="true" />
      {/* Top gold line reveal */}
      <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} aria-hidden="true" />

      {/* Large decorative quote mark */}
      <motion.div
        className="absolute top-4 right-5 font-serif leading-none select-none pointer-events-none"
        style={{ fontSize: 72, color: "rgba(201,168,76,0.06)", lineHeight: 1 }}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: index * 0.08 + 0.2 }}
        aria-hidden="true"
      >"</motion.div>

      <div className="relative z-10 flex items-start justify-between gap-4">
        <AnimatedStars count={review.stars} delay={(index % 3) * 0.1} />
        <motion.span
          className="text-[8px] tracking-[0.25em] uppercase px-2.5 py-1 flex-shrink-0"
          style={{ border: "1px solid rgba(201,168,76,0.2)", color: "rgba(201,168,76,0.5)" }}
          animate={{ boxShadow: ["0 0 0px rgba(201,168,76,0)", "0 0 8px rgba(201,168,76,0.2)", "0 0 0px rgba(201,168,76,0)"] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
        >{review.service}</motion.span>
      </div>

      <div className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          <motion.p key={String(expanded)}
            className="text-sm leading-relaxed text-white/50 font-serif italic"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            &ldquo;{displayText}&rdquo;
          </motion.p>
        </AnimatePresence>
        {isLong && (
          <motion.button onClick={() => setExpanded(v => !v)}
            className="mt-2 text-[9px] tracking-[0.2em] uppercase text-yellow-400/50 hover:text-yellow-400/80 transition-colors"
            whileHover={{ x: 2 }}
          >{expanded ? "Show less" : "Read more"}</motion.button>
        )}
      </div>

      <div className="relative z-10 flex items-center gap-3 mt-auto">
        <motion.div
          className="w-8 h-8 flex items-center justify-center text-xs font-serif text-black font-bold flex-shrink-0"
          style={{ background: "linear-gradient(135deg, hsl(43,65%,52%), hsl(35,70%,45%))" }}
          animate={{ boxShadow: ["0 0 0px rgba(201,168,76,0)", "0 0 12px rgba(201,168,76,0.5)", "0 0 0px rgba(201,168,76,0)"] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: index * 0.2 }}
          aria-hidden="true"
        >{review.author[0]}</motion.div>
        <div>
          <p className="text-xs font-medium text-white/70">{review.author}</p>
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/30">{review.location}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Overall Rating ───────────────────────────────────────────────────────────
function OverallRating() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="py-16 section-divider">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="p-10 md:p-14 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(145deg, hsl(28,18%,8%), hsl(22,16%,6%))", border: "1px solid rgba(201,168,76,0.12)" }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06), transparent 65%)" }} aria-hidden="true" />

          {/* Animated scanning line */}
          <motion.div className="absolute inset-x-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)" }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
            {[
              { end: 4.8, decimals: 1, suffix: "", label: "Overall Rating", sub: "Out of 5.0" },
              { end: 28, decimals: 0, suffix: "+", label: "Total Reviews", sub: "Verified clients" },
              { end: 100, decimals: 0, suffix: "%", label: "Recommend Rate", sub: "Would return" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <motion.span className="text-5xl font-serif shimmer-text font-bold"
                  initial={{ opacity: 0, scale: 0.7, y: 20 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.15, type: "spring", stiffness: 120 }}>
                  {inView ? <CountUp end={s.end} suffix={s.suffix} decimals={s.decimals} duration={2} /> : `0${s.suffix}`}
                </motion.span>
                {i === 0 && <AnimatedStars count={5} size="text-base" delay={0.8} />}
                <span className="text-sm text-white/60">{s.label}</span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">{s.sub}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials Page ────────────────────────────────────────────────────────
export default function TestimonialsPage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <Layout>
      <PageHero
        title="What Clients"
        titleGold="Say"
        subtitle="Real words from real people who trust Matthew with their hair."
        breadcrumb="Reviews"
      />
      <OverallRating />
      <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
        {/* Ambient sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <motion.div key={i} className="absolute"
              style={{ left: `${10 + i * 11}%`, top: `${20 + (i % 3) * 28}%`, color: "rgba(201,168,76,0.09)", fontSize: 18 }}
              animate={{ opacity: [0.06, 0.22, 0.06], scale: [0.7, 1.3, 0.7], rotate: [0, 180, 360] }}
              transition={{ duration: 5 + i * 0.8, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
            >✦</motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((review, i) => <ReviewCard key={i} review={review} index={i} />)}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-16 pt-12"
            style={{ borderTop: "1px solid rgba(201,168,76,0.06)" }}
          >
            <p className="text-sm text-white/35 mb-6">Ready to write your own story?</p>
            <motion.a
              href="https://matthewdillard.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-9 py-4 text-xs tracking-[0.28em] uppercase text-black font-medium relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, hsl(43,72%,54%), hsl(35,78%,47%))", boxShadow: "0 6px 28px rgba(201,168,76,0.38)" }}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 36px rgba(201,168,76,0.55)" }}
            >
              Book Your Appointment
              <motion.svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                animate={{ x: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

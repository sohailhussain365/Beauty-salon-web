import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const REVIEWS = [
  { text: "I highly recommend him for your next service, he will not disappoint! Matthew has an incredible eye for what works best for each individual client. The atmosphere is relaxed but the results are anything but — truly world-class.", author: "Sarah M.", location: "Frisco, TX", service: "Balayage", stars: 5 },
  { text: "Highly suggest this place if you are in the Frisco/McKinney area! I came in for a balayage and left feeling like an entirely different person. The attention to detail and level of craft here is unlike anything I've experienced.", author: "Emily R.", location: "McKinney, TX", service: "Balayage", stars: 5 },
  { text: "Quirky sense of humor and laid back vibe that instantly puts you at ease. Matthew is genuinely talented — the kind of stylist who listens, understands your vision, and then somehow makes it even better than you imagined.", author: "Jordan T.", location: "Prosper, TX", service: "Hair Coloring", stars: 5 },
  { text: "Finding a colorist who truly understands blonde is nearly impossible. Matthew is the rare exception — my hair has never looked more luminous or felt more healthy. The results speak for themselves.", author: "Lauren K.", location: "Celina, TX", service: "Blonde Specialist", stars: 5 },
  { text: "Matthew did my hair for my wedding and I could not have been more thrilled. He worked through multiple trials until we found exactly the right look — patient, talented, and so supportive throughout.", author: "Amanda P.", location: "Allen, TX", service: "Bridal Styling", stars: 5 },
  { text: "Veteran-owned and genuinely kind — this is not just a salon, it's a community. Matthew treats every client with such care and intention. I drove 45 minutes and I would drive twice as far.", author: "Marcus D.", location: "Plano, TX", service: "Luxury Haircuts", stars: 5 },
];

function CountUp({ end, suffix = "", decimals = 0, duration = 2 }: { end: number; suffix?: string; decimals?: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();
    const frame = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const p = Math.min(elapsed / duration, 1);
      const val = (1 - Math.pow(1 - p, 3)) * end;
      setCount(decimals > 0 ? parseFloat(val.toFixed(decimals)) : Math.floor(val));
      if (p < 1) requestAnimationFrame(frame); else setCount(end);
    };
    requestAnimationFrame(frame);
  }, [inView, end, duration, decimals]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function AnimatedStars({ count = 5, size = "text-sm", delay = 0 }: { count?: number; size?: string; delay?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <motion.span key={i} className={`${size}`}
          style={{ color: "hsl(22,15%,22%)" }}
          initial={{ opacity: 0, scale: 0, rotate: -45 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + i * 0.08, type: "spring", stiffness: 280, damping: 12 }}
        >★</motion.span>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: typeof REVIEWS[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const isLong = review.text.length > 180;
  const displayText = isLong && !expanded ? review.text.slice(0, 180) + "…" : review.text;

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.13, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-8 overflow-hidden flex flex-col gap-5 cursor-default"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(22,15,8,0.07)",
        boxShadow: "0 2px 16px rgba(22,15,8,0.04)",
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease",
      }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * 6, y: -((e.clientX - r.left) / r.width - 0.5) * 6 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      data-testid={`review-card-${index}`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(22,15,8,0.03), transparent 65%)" }} aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: "linear-gradient(90deg, hsl(22,15%,12%), transparent)" }} aria-hidden="true" />

      <motion.div className="absolute top-3 right-5 font-serif pointer-events-none select-none"
        style={{ fontSize: 80, color: "rgba(22,15,8,0.04)", lineHeight: 1 }}
        initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.08 + 0.25 }}
        aria-hidden="true">"</motion.div>

      <div className="relative z-10 flex items-start justify-between gap-4">
        <AnimatedStars count={review.stars} delay={(index % 3) * 0.12} />
        <motion.span className="text-[8px] tracking-[0.25em] uppercase px-2.5 py-1 flex-shrink-0"
          style={{ border: "1px solid rgba(22,15,8,0.12)", color: "rgba(22,15,8,0.45)" }}
        >{review.service}</motion.span>
      </div>

      <div className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          <motion.p key={String(expanded)} className="text-sm leading-relaxed font-serif italic"
            style={{ color: "rgba(22,15,8,0.55)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            &ldquo;{displayText}&rdquo;
          </motion.p>
        </AnimatePresence>
        {isLong && (
          <motion.button onClick={() => setExpanded(v => !v)}
            className="mt-2 text-[9px] tracking-[0.2em] uppercase transition-opacity hover:opacity-60"
            style={{ color: "rgba(22,15,8,0.45)" }}
            whileHover={{ x: 2 }}>{expanded ? "Show less" : "Read more"}</motion.button>
        )}
      </div>

      <div className="relative z-10 flex items-center gap-3 mt-auto">
        <motion.div className="w-8 h-8 flex items-center justify-center text-xs font-serif font-bold flex-shrink-0"
          style={{ background: "hsl(22,15%,12%)", color: "#ffffff" }}
          aria-hidden="true">{review.author[0]}</motion.div>
        <div>
          <p className="text-xs font-medium" style={{ color: "hsl(22,20%,12%)" }}>{review.author}</p>
          <p className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(22,15,8,0.32)" }}>{review.location}</p>
        </div>
      </div>
    </motion.div>
  );
}

function OverallRating() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section className="py-16 section-divider relative overflow-hidden" style={{ background: "hsl(30,10%,96%)" }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <motion.div className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
          <div className="h-px w-7" style={{ background: "hsl(22,15%,20%)" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(22,15,8,0.42)" }}>At a Glance</span>
        </motion.div>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { end: 4.8, decimals: 1, suffix: "", label: "Overall Rating", sub: "Out of 5.0" },
            { end: 28, decimals: 0, suffix: "+", label: "Total Reviews", sub: "Verified clients" },
            { end: 100, decimals: 0, suffix: "%", label: "Recommend Rate", sub: "Would return" },
          ].map((s, i) => (
            <motion.div key={i}
              className="group flex flex-col items-center text-center gap-3 p-8 relative overflow-hidden"
              style={{ background: "#ffffff", border: "1px solid rgba(22,15,8,0.07)", boxShadow: "0 2px 16px rgba(22,15,8,0.04)" }}
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, borderColor: "rgba(22,15,8,0.16)", transition: { duration: 0.2 } }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(22,15,8,0.03), transparent 70%)" }} aria-hidden="true" />
              <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(90deg, hsl(22,15%,12%), transparent)" }} aria-hidden="true" />
              <span className="heading-bebas block shimmer-text" style={{ fontSize: "clamp(48px, 6vw, 72px)", lineHeight: 1 }}>
                {inView ? <CountUp end={s.end} suffix={s.suffix} decimals={s.decimals} duration={2} /> : `0${s.suffix}`}
              </span>
              {i === 0 && <AnimatedStars count={5} size="text-base" delay={0.8} />}
              <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(22,15,8,0.42)", marginTop: 2 }}>{s.label}</p>
              <p style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(22,15,8,0.28)" }}>{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TestimonialsPage() {
  return (
    <Layout>
      <PageHero title="What Clients" titleGold="Say" subtitle="Real words from real people who trust Matthew with their hair." breadcrumb="Reviews" />
      <OverallRating />
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <motion.div key={i} className="absolute"
              style={{ left: `${10 + i * 11}%`, top: `${20 + (i % 3) * 28}%`, color: "rgba(22,15,8,0.05)", fontSize: 18 }}
              animate={{ opacity: [0.03, 0.14, 0.03], scale: [0.7, 1.3, 0.7], rotate: [0, 180, 360] }}
              transition={{ duration: 5 + i * 0.8, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
            >✦</motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((review, i) => <ReviewCard key={i} review={review} index={i} />)}
          </div>

          <motion.div className="text-center mt-16 pt-12"
            style={{ borderTop: "1px solid rgba(22,15,8,0.07)" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}>
            <motion.p className="text-sm mb-6" style={{ color: "rgba(22,15,8,0.40)" }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              Ready to write your own story?
            </motion.p>
            <motion.a href="https://matthewdillard.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-9 py-4 text-xs tracking-[0.28em] uppercase font-medium transition-opacity hover:opacity-80"
              style={{ background: "hsl(22,15%,12%)", color: "#ffffff", boxShadow: "0 6px 24px rgba(22,15,8,0.18)" }}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
              whileHover={{ scale: 1.05 }}>
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

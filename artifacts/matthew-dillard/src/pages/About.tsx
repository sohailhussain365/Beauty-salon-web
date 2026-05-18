import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

// ─── Shared animation variants ────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const itemUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
};

// ─── Word reveal ──────────────────────────────────────────────────────────────
function WordReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <motion.span key={i} className="inline-block mr-[0.28em]"
          initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, delay: delay + i * 0.055, ease: [0.16, 1, 0.3, 1] }}
        >{w}</motion.span>
      ))}
    </span>
  );
}

// ─── CountUp ──────────────────────────────────────────────────────────────────
function CountUp({ end, suffix = "", prefix = "", duration = 2 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
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
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(frame);
      else setCount(end);
    };
    requestAnimationFrame(frame);
  }, [inView, end, duration]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────
function TiltCard({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref}
      className={className}
      style={{ ...style, transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: "transform 0.15s ease" }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setTilt({ x: ((e.clientY - rect.top) / rect.height - 0.5) * 8, y: -((e.clientX - rect.left) / rect.width - 0.5) * 8 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >{children}</div>
  );
}

// ─── Ambient sparkles ─────────────────────────────────────────────────────────
function AmbientSparkles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {[...Array(10)].map((_, i) => (
        <motion.div key={i} className="absolute"
          style={{ left: `${8 + i * 9}%`, top: `${15 + (i % 4) * 22}%`, color: "rgba(201,168,76,0.1)", fontSize: 14 + (i % 3) * 5 }}
          animate={{ opacity: [0.06, 0.22, 0.06], scale: [0.7, 1.3, 0.7], rotate: [0, 90, 180] }}
          transition={{ duration: 5 + i * 0.7, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
        >✦</motion.div>
      ))}
    </div>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────
function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const pillars = [
    { num: "01", title: "Artistry First", desc: "Hair is not just cut or colored — it's sculpted. Every appointment is treated like a creative commission." },
    { num: "02", title: "Personalized Experience", desc: "Matthew takes time to understand your hair history, daily routine, and vision before a single snip is made." },
    { num: "03", title: "Continued Education", desc: "The world of hair never stops evolving. Matthew regularly trains with industry leaders to bring the latest techniques to your chair." },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 section-divider relative overflow-hidden">
      <AmbientSparkles />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-4 mb-8">
              <motion.span className="h-px" initial={{ width: 0 }} animate={inView ? { width: 32 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }} style={{ background: "hsl(43,65%,52%)" }} />
              <span className="text-[9px] tracking-[0.4em] uppercase text-yellow-400/60">Who We Are</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif leading-[1.1] text-white/88 mb-8">
              More Than a Salon —{" "}
              <span className="block">
                <span className="text-gold-gradient italic">A Philosophy</span>
              </span>
            </h2>

            <div className="space-y-5 text-sm leading-relaxed text-white/42 mb-10">
              <p>
                <WordReveal text="Matthew Dillard Hair Salons was built on a simple belief: every person who sits in the chair deserves to feel extraordinary when they leave." delay={0} />
              </p>
              <p>
                <WordReveal text="As a veteran-owned, LGBTQ+ friendly salon, we celebrate every individual. Matthew's approach is collaborative — he listens deeply and crafts a look that is uniquely, authentically yours." delay={0.1} />
              </p>
            </div>

            {/* Animated badges */}
            <motion.div className="flex flex-wrap gap-3"
              variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
              {["Veteran Owned", "LGBTQ+ Friendly", "Master Colorist", "Blade Specialist"].map((badge) => (
                <motion.span key={badge} variants={itemUp}
                  className="px-4 py-2 text-[9px] tracking-[0.3em] uppercase text-yellow-400/65 transition-all duration-300"
                  style={{ border: "1px solid rgba(201,168,76,0.18)" }}
                  whileHover={{ borderColor: "rgba(201,168,76,0.45)", color: "rgba(201,168,76,1)", y: -2 }}
                >{badge}</motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — 3D tilt pillar cards */}
          <motion.div className="space-y-3"
            variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
            {pillars.map((p) => (
              <motion.div key={p.num} variants={itemUp}>
                <TiltCard
                  className="group p-7 relative overflow-hidden cursor-default"
                  style={{ background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))", border: "1px solid rgba(201,168,76,0.08)" }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(201,168,76,0.06), transparent 65%)" }} aria-hidden="true" />
                  <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} aria-hidden="true" />
                  <div className="relative z-10 flex items-start gap-5">
                    <motion.span className="font-serif text-yellow-400/30 group-hover:text-yellow-400/65 transition-colors text-sm flex-shrink-0 mt-0.5"
                      animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                      {p.num}
                    </motion.span>
                    <div>
                      <h3 className="text-sm font-serif font-semibold text-white/80 group-hover:text-white transition-colors mb-2">{p.title}</h3>
                      <p className="text-xs text-white/35 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats with CountUp ───────────────────────────────────────────────────────
function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const stats = [
    { end: 48, prefix: "", suffix: "/5", label: "Average Rating", raw: "4.8/5" },
    { end: 28, prefix: "", suffix: "+", label: "Verified Reviews" },
    { end: 10, prefix: "", suffix: "+", label: "Years of Expertise" },
    { end: 5000, prefix: "", suffix: "+", label: "Clients Served" },
  ];
  return (
    <section ref={ref} className="py-16 section-divider relative overflow-hidden">
      <AmbientSparkles />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          {stats.map((s, i) => (
            <motion.div key={s.label} variants={itemUp}
              className="relative group p-8 overflow-hidden"
              style={{ background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))", border: "1px solid rgba(201,168,76,0.10)" }}
              whileHover={{ borderColor: "rgba(201,168,76,0.28)", y: -4, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07), transparent 70%)" }} aria-hidden="true" />
              <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} aria-hidden="true" />
              <div className="relative z-10">
                <p className="text-4xl font-serif shimmer-text font-bold mb-2">
                  {s.raw ? s.raw : (inView ? <CountUp end={s.end} suffix={s.suffix} duration={2} /> : `0${s.suffix}`)}
                </p>
                <p className="text-[9px] tracking-[0.35em] uppercase text-white/35">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Values ───────────────────────────────────────────────────────────────────
const VALUE_DATA = [
  {
    icon: "✦",
    title: "Excellence Without Exception",
    desc: "Every service — regardless of price point — receives the full weight of our expertise and attention.",
    color: "rgba(201,168,76,0.75)",
  },
  {
    icon: "◈",
    title: "Inclusive by Design",
    desc: "From our first day, we have welcomed every hair type, identity, and background. Everyone deserves to feel beautiful.",
    color: "rgba(180,215,255,0.65)",
  },
  {
    icon: "◇",
    title: "Craft Over Commerce",
    desc: "We keep our books intentionally small so that every client receives the unhurried, premium experience they deserve.",
    color: "rgba(230,185,215,0.65)",
  },
];

function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 md:py-32 section-divider relative overflow-hidden">
      <AmbientSparkles />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <motion.div className="text-center mb-14"
          variants={itemUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.span className="h-px" initial={{ width: 0 }} animate={inView ? { width: 40 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }} style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }} />
            <span className="text-[9px] tracking-[0.4em] uppercase text-yellow-400/60">Our Values</span>
            <motion.span className="h-px" initial={{ width: 0 }} animate={inView ? { width: 40 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }} style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white/88">
            What We <span className="text-gold-gradient italic">Stand For</span>
          </h2>
        </motion.div>

        <motion.div className="grid md:grid-cols-3 gap-6"
          variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          {VALUE_DATA.map((v) => (
            <motion.div key={v.title} variants={itemUp}>
              <TiltCard
                className="p-9 text-center group relative overflow-hidden cursor-default h-full"
                style={{ background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))", border: "1px solid rgba(201,168,76,0.08)" }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${v.color.replace("0.75","0.08").replace("0.65","0.06")}, transparent 65%)` }} aria-hidden="true" />
                <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: `linear-gradient(90deg, ${v.color}, transparent)` }} aria-hidden="true" />
                <div className="relative z-10">
                  <motion.span
                    className="text-3xl block mb-5"
                    style={{ color: v.color }}
                    animate={{ scale: [1, 1.15, 1], filter: [`drop-shadow(0 0 4px ${v.color.replace("0.75","0.3").replace("0.65","0.2")})`, `drop-shadow(0 0 16px ${v.color})`, `drop-shadow(0 0 4px ${v.color.replace("0.75","0.3").replace("0.65","0.2")})`] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  >{v.icon}</motion.span>
                  <h3 className="text-base font-serif text-white/80 group-hover:text-white transition-colors mb-3">{v.title}</h3>
                  <p className="text-xs text-white/35 leading-relaxed">{v.desc}</p>
                  <motion.div className="h-px w-0 group-hover:w-12 mx-auto mt-5 transition-all duration-500"
                    style={{ background: v.color }} />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Timeline / Journey ───────────────────────────────────────────────────────
const MILESTONES = [
  { year: "2014", title: "The Beginning", desc: "Matthew started his career in the heart of Dallas, honing his craft under industry mentors." },
  { year: "2017", title: "Specialization", desc: "Completed advanced training in balayage and color theory in New York and Los Angeles." },
  { year: "2020", title: "Prosper Studio", desc: "Opened the boutique studio in Prosper, TX — bringing luxury artistry to North Dallas." },
  { year: "2024", title: "Milestone", desc: "Serving 5,000+ clients with a 4.8-star average and 28 glowing reviews." },
];

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 md:py-32 section-divider relative overflow-hidden">
      <AmbientSparkles />
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8">
        <motion.div className="text-center mb-16"
          variants={itemUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.span className="h-px" initial={{ width: 0 }} animate={inView ? { width: 40 } : {}}
              transition={{ duration: 0.8 }} style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }} />
            <span className="text-[9px] tracking-[0.4em] uppercase text-yellow-400/60">The Journey</span>
            <motion.span className="h-px" initial={{ width: 0 }} animate={inView ? { width: 40 } : {}}
              transition={{ duration: 0.8 }} style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white/88">
            A Decade of <span className="text-gold-gradient italic">Craft</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: "rgba(201,168,76,0.1)" }} />
          <motion.div className="absolute left-[27px] md:left-1/2 top-0 w-px -translate-x-1/2"
            initial={{ height: 0 }} animate={inView ? { height: "100%" } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            style={{ background: "linear-gradient(to bottom, hsl(43,65%,52%), rgba(201,168,76,0.1))" }} />

          <div className="space-y-10">
            {MILESTONES.map((m, i) => (
              <motion.div key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`flex gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center`}
              >
                {/* Content side */}
                <div className={`flex-1 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <TiltCard
                    className="group p-6 relative overflow-hidden cursor-default"
                    style={{ background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))", border: "1px solid rgba(201,168,76,0.08)" }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07), transparent 65%)" }} aria-hidden="true" />
                    <div className="relative z-10">
                      <span className="block text-[9px] tracking-[0.35em] uppercase text-yellow-400/55 mb-2">{m.year}</span>
                      <h3 className="text-sm font-serif font-semibold text-white/82 group-hover:text-white transition-colors mb-2">{m.title}</h3>
                      <p className="text-xs text-white/35 leading-relaxed">{m.desc}</p>
                    </div>
                  </TiltCard>
                </div>

                {/* Center node */}
                <motion.div className="relative z-10 flex-shrink-0 w-14 flex items-center justify-center"
                  initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.15, type: "spring", stiffness: 200 }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "hsl(22,18%,6%)", border: "2px solid hsl(43,65%,52%)", boxShadow: "0 0 16px rgba(201,168,76,0.5)" }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: "hsl(43,65%,52%)" }} />
                  </div>
                </motion.div>

                {/* Empty side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────
export default function About() {
  return (
    <Layout>
      <PageHero
        title="About"
        titleGold="Matthew Dillard"
        subtitle="Luxury hair artistry rooted in craft, community, and care."
        breadcrumb="Our Story"
      />
      <StorySection />
      <StatsRow />
      <Timeline />
      <ValuesSection />
    </Layout>
  );
}

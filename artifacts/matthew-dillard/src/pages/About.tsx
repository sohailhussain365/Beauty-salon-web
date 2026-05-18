import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

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
      if (p < 1) requestAnimationFrame(frame); else setCount(end);
    };
    requestAnimationFrame(frame);
  }, [inView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────
function TiltCard({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className={className} style={{ ...style, transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: "transform 0.15s ease" }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * 8, y: -((e.clientX - r.left) / r.width - 0.5) * 8 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
      {children}
    </div>
  );
}

// ─── Ambient sparkles ─────────────────────────────────────────────────────────
function AmbientBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {[...Array(10)].map((_, i) => (
        <motion.div key={i} className="absolute"
          style={{ left: `${8 + i * 9}%`, top: `${12 + (i % 4) * 22}%`, color: "rgba(201,168,76,0.1)", fontSize: 14 + (i % 3) * 5 }}
          animate={{ opacity: [0.05, 0.22, 0.05], scale: [0.7, 1.3, 0.7], rotate: [0, 90, 180] }}
          transition={{ duration: 5 + i * 0.7, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
        >✦</motion.div>
      ))}
    </div>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────
function StorySection() {
  const pillars = [
    { num: "01", title: "Artistry First", desc: "Hair is not just cut or colored — it's sculpted. Every appointment is treated like a creative commission, with the reverence a sculptor brings to marble." },
    { num: "02", title: "Personalized Experience", desc: "Matthew takes time to understand your hair history, daily routine, and vision before a single snip is made. No two clients are ever the same." },
    { num: "03", title: "Continued Education", desc: "The world of hair never stops evolving. Matthew regularly trains with industry leaders to bring the latest techniques directly to your chair." },
  ];
  return (
    <section className="py-24 md:py-32 section-light relative overflow-hidden">
      {/* Light ambient sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <motion.div key={i} className="absolute"
            style={{ left: `${8 + i * 15}%`, top: `${15 + (i % 3) * 28}%`, color: "rgba(201,168,76,0.12)", fontSize: 12 + (i % 3) * 4 }}
            animate={{ opacity: [0.04, 0.18, 0.04], scale: [0.7, 1.2, 0.7] }}
            transition={{ duration: 5 + i * 0.8, delay: i * 0.7, repeat: Infinity, ease: "easeInOut" }}>✦</motion.div>
        ))}
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <motion.div className="flex items-center gap-3 mb-7"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <motion.span className="h-px" initial={{ width: 0 }} whileInView={{ width: 28 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }} style={{ background: "hsl(43,65%,52%)" }} />
              <span style={{ fontSize: 9, letterSpacing: "0.42em", textTransform: "uppercase", color: "hsl(43,60%,42%)" }}>Who We Are</span>
            </motion.div>

            <div className="overflow-hidden mb-2">
              <motion.h2
                className="heading-bebas"
                style={{ fontSize: "clamp(48px, 6.5vw, 84px)", color: "hsl(22,20%,8%)", lineHeight: 0.92 }}
                initial={{ y: "108%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
                More Than a Salon
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h2
                className="heading-bebas"
                style={{ fontSize: "clamp(48px, 6.5vw, 84px)", lineHeight: 0.92, color: "hsl(43,65%,52%)" }}
                initial={{ y: "108%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.85, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}>
                A Philosophy
              </motion.h2>
            </div>

            <motion.p className="text-sm leading-relaxed mb-4"
              style={{ color: "rgba(22,15,8,0.52)" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}>
              Matthew Dillard Hair Salons was built on a simple belief: every person who sits in the chair deserves to feel extraordinary when they leave. Our Prosper, Texas studio is a sanctuary — designed to feel exclusive without feeling intimidating.
            </motion.p>
            <motion.p className="text-sm leading-relaxed mb-10"
              style={{ color: "rgba(22,15,8,0.52)" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.3 }}>
              As a veteran-owned, LGBTQ+ friendly salon, we celebrate every individual. Matthew's approach is collaborative — he listens deeply and crafts a look that is uniquely, authentically yours.
            </motion.p>

            <div className="flex flex-wrap gap-3">
              {["Veteran Owned", "LGBTQ+ Friendly", "Master Colorist", "Blade Specialist"].map((badge, i) => (
                <motion.span key={badge}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: 0.35 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="px-4 py-2 text-[9px] tracking-[0.3em] uppercase"
                  style={{ color: "hsl(43,60%,42%)", border: "1px solid rgba(201,168,76,0.32)", background: "rgba(201,168,76,0.06)" }}
                  whileHover={{ borderColor: "rgba(201,168,76,0.65)", y: -2 }}
                >{badge}</motion.span>
              ))}
            </div>
          </div>

          {/* Right — 3D tilt cards */}
          <div className="space-y-3">
            {pillars.map((p, i) => (
              <motion.div key={p.num}
                initial={{ opacity: 0, y: 50, x: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: 0.85, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard className="group p-7 relative overflow-hidden cursor-default card-light"
                  style={{}}>
                  <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} aria-hidden="true" />
                  <div className="relative z-10 flex items-start gap-5">
                    <motion.span
                      style={{ fontFamily: "serif", color: "rgba(201,168,76,0.55)", fontSize: 13, flexShrink: 0, marginTop: 2 }}
                      animate={{ opacity: [0.4, 0.75, 0.4] }} transition={{ duration: 3, repeat: Infinity }}>
                      {p.num}
                    </motion.span>
                    <div>
                      <h3 className="text-sm font-serif font-semibold mb-2" style={{ color: "hsl(22,20%,10%)" }}>{p.title}</h3>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(22,15,8,0.48)" }}>{p.desc}</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function StatsRow() {
  return (
    <section className="py-16 section-divider relative overflow-hidden">
      <AmbientBg />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { end: 48, suffix: "/5", label: "Average Rating", raw: "4.8" },
            { end: 28, suffix: "+", label: "Verified Reviews" },
            { end: 10, suffix: "+", label: "Years Expertise" },
            { end: 5, suffix: "K+", label: "Clients Served" },
          ].map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 60, scale: 0.92, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.85, delay: i * 0.11, ease: [0.16, 1, 0.3, 1] }}
              className="relative group p-8 overflow-hidden"
              style={{ background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))", border: "1px solid rgba(201,168,76,0.10)" }}
              whileHover={{ borderColor: "rgba(201,168,76,0.3)", y: -4, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08), transparent 70%)" }} aria-hidden="true" />
              <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} aria-hidden="true" />
              <div className="relative z-10">
                <p className="text-4xl font-serif shimmer-text font-bold mb-2">
                  {s.raw ? s.raw : <CountUp end={s.end} suffix="" duration={1.8} />}{s.suffix}
                </p>
                <p className="text-[9px] tracking-[0.35em] uppercase text-white/35">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Values ───────────────────────────────────────────────────────────────────
function ValuesSection() {
  const values = [
    { icon: "✦", title: "Excellence Without Exception", desc: "Every service receives the full weight of our expertise and attention.", color: "rgba(201,168,76,0.8)" },
    { icon: "◈", title: "Inclusive by Design", desc: "From day one, we have welcomed every hair type, identity, and background.", color: "rgba(180,215,255,0.7)" },
    { icon: "◇", title: "Craft Over Commerce", desc: "We keep our books small so every client receives an unhurried, premium experience.", color: "rgba(230,185,215,0.7)" },
  ];
  return (
    <section className="py-24 md:py-32 section-divider relative overflow-hidden">
      <AmbientBg />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-14">
          <motion.div className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
            <div className="h-px w-7" style={{ background: "hsl(43,65%,52%)" }} />
            <span className="text-[9px] tracking-[0.42em] uppercase text-yellow-400/65">Our Values</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              className="heading-bebas"
              style={{ fontSize: "clamp(50px, 7.5vw, 100px)", color: "rgba(255,255,255,0.90)", lineHeight: 0.92 }}
              initial={{ y: "108%", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
              What We <span style={{ color: "hsl(43,65%,52%)" }}>Stand For</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div key={v.title}
              initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.9, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="p-9 text-center group relative overflow-hidden cursor-default h-full"
                style={{ background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))", border: "1px solid rgba(201,168,76,0.08)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${v.color.replace("0.8","0.09").replace("0.7","0.07")}, transparent 65%)` }} aria-hidden="true" />
                <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: `linear-gradient(90deg, ${v.color}, transparent)` }} aria-hidden="true" />
                <div className="relative z-10">
                  <motion.span className="text-3xl block mb-5" style={{ color: v.color }}
                    animate={{ scale: [1, 1.15, 1], filter: [`drop-shadow(0 0 4px ${v.color.replace("0.8","0.25")})`, `drop-shadow(0 0 16px ${v.color})`, `drop-shadow(0 0 4px ${v.color.replace("0.8","0.25")})`] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  >{v.icon}</motion.span>
                  <h3 className="text-base font-serif text-white/80 group-hover:text-white transition-colors mb-3">{v.title}</h3>
                  <p className="text-xs text-white/35 leading-relaxed">{v.desc}</p>
                  <motion.div className="h-px w-0 group-hover:w-12 mx-auto mt-5 transition-all duration-500" style={{ background: v.color }} />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
const MILESTONES = [
  { year: "2014", title: "The Beginning", desc: "Matthew started his career in Dallas, honing his craft under industry mentors." },
  { year: "2017", title: "Specialization", desc: "Completed advanced training in balayage and color theory in New York and Los Angeles." },
  { year: "2020", title: "Prosper Studio", desc: "Opened the boutique studio in Prosper, TX — bringing luxury artistry to North Dallas." },
  { year: "2024", title: "Milestone", desc: "Serving 5,000+ clients with a 4.8-star average and 28 glowing verified reviews." },
];

function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(lineRef, { once: true, margin: "-80px" });
  return (
    <section className="py-24 md:py-32 section-divider relative overflow-hidden">
      <AmbientBg />
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <motion.div className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
            <motion.span className="h-px" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }}
              transition={{ duration: 0.8 }} style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }} />
            <span className="text-[9px] tracking-[0.4em] uppercase text-yellow-400/60">The Journey</span>
            <motion.span className="h-px" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }}
              transition={{ duration: 0.8 }} style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} />
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2 className="text-4xl md:text-5xl font-serif text-white/88"
              initial={{ y: "110%", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              A Decade of <span className="text-gold-gradient italic">Craft</span>
            </motion.h2>
          </div>
        </div>

        <div ref={lineRef} className="relative">
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: "rgba(201,168,76,0.08)" }} />
          <motion.div className="absolute left-[27px] md:left-1/2 top-0 w-px -translate-x-1/2"
            initial={{ height: 0 }} animate={inView ? { height: "100%" } : {}}
            transition={{ duration: 1.8, delay: 0.3, ease: "easeOut" }}
            style={{ background: "linear-gradient(to bottom, hsl(43,65%,52%), rgba(201,168,76,0.15))" }} />

          <div className="space-y-10">
            {MILESTONES.map((m, i) => (
              <motion.div key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`flex gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <TiltCard className="group p-6 relative overflow-hidden cursor-default"
                    style={{ background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))", border: "1px solid rgba(201,168,76,0.08)" }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07), transparent 65%)" }} aria-hidden="true" />
                    <div className="relative z-10">
                      <span className="block text-[9px] tracking-[0.35em] uppercase text-yellow-400/55 mb-2">{m.year}</span>
                      <h3 className="text-sm font-serif font-semibold text-white/82 group-hover:text-white transition-colors mb-2">{m.title}</h3>
                      <p className="text-xs text-white/35 leading-relaxed">{m.desc}</p>
                    </div>
                  </TiltCard>
                </div>
                <motion.div className="relative z-10 flex-shrink-0 w-14 flex items-center justify-center"
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.15, type: "spring", stiffness: 200 }}>
                  <motion.div className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "hsl(22,18%,6%)", border: "2px solid hsl(43,65%,52%)" }}
                    animate={{ boxShadow: ["0 0 0px rgba(201,168,76,0)", "0 0 16px rgba(201,168,76,0.6)", "0 0 0px rgba(201,168,76,0)"] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: "hsl(43,65%,52%)" }} />
                  </motion.div>
                </motion.div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <Layout>
      <PageHero title="About" titleGold="Matthew Dillard" subtitle="Luxury hair artistry rooted in craft, community, and care." breadcrumb="Our Story" />
      <StorySection />
      <StatsRow />
      <Timeline />
      <ValuesSection />
    </Layout>
  );
}

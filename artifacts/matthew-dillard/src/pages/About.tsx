import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

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

function StorySection() {
  const pillars = [
    { num: "01", title: "Artistry First", desc: "Hair is not just cut or colored — it's sculpted. Every appointment is treated like a creative commission, with the reverence a sculptor brings to marble." },
    { num: "02", title: "Personalized Experience", desc: "Matthew takes time to understand your hair history, daily routine, and vision before a single snip is made. No two clients are ever the same." },
    { num: "03", title: "Continued Education", desc: "The world of hair never stops evolving. Matthew regularly trains with industry leaders to bring the latest techniques directly to your chair." },
  ];
  return (
    <section className="py-24 md:py-32 section-divider relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <motion.div key={i} className="absolute"
            style={{ left: `${8 + i * 15}%`, top: `${15 + (i % 3) * 28}%`, color: "rgba(22,15,8,0.06)", fontSize: 12 + (i % 3) * 4 }}
            animate={{ opacity: [0.04, 0.15, 0.04], scale: [0.7, 1.2, 0.7] }}
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
                transition={{ duration: 0.6, delay: 0.2 }} style={{ background: "hsl(22,15%,20%)" }} />
              <span style={{ fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "hsl(22,20%,12%)", fontWeight: 600 }}>Who We Are</span>
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
                className="heading-bebas text-gold-gradient"
                style={{ fontSize: "clamp(48px, 6.5vw, 84px)", lineHeight: 0.92 }}
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
                  style={{ color: "rgba(22,15,8,0.58)", border: "1px solid rgba(22,15,8,0.15)", background: "rgba(22,15,8,0.03)" }}
                  whileHover={{ borderColor: "rgba(22,15,8,0.30)", y: -2 }}
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
                <TiltCard className="group p-7 relative overflow-hidden cursor-default"
                  style={{ background: "#ffffff", border: "1px solid rgba(22,15,8,0.07)", boxShadow: "0 2px 14px rgba(22,15,8,0.04)" }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(22,15,8,0.03), transparent 70%)" }} aria-hidden="true" />
                  <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ background: "linear-gradient(90deg, hsl(22,15%,12%), transparent)" }} aria-hidden="true" />
                  <div className="relative z-10 flex items-start gap-5">
                    <motion.span
                      style={{ fontFamily: "serif", color: "rgba(22,15,8,0.30)", fontSize: 13, flexShrink: 0, marginTop: 2 }}
                      animate={{ opacity: [0.25, 0.55, 0.25] }} transition={{ duration: 3, repeat: Infinity }}>
                      {p.num}
                    </motion.span>
                    <div>
                      <h3 className="text-sm font-serif font-semibold mb-2 transition-colors" style={{ color: "hsl(22,20%,10%)" }}>{p.title}</h3>
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

function StatsRow() {
  return (
    <section className="py-16 section-divider relative overflow-hidden" style={{ background: "hsl(30,10%,96%)" }}>
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
              style={{ background: "#ffffff", border: "1px solid rgba(22,15,8,0.07)", boxShadow: "0 2px 14px rgba(22,15,8,0.04)" }}
              whileHover={{ borderColor: "rgba(22,15,8,0.16)", y: -4, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(22,15,8,0.03), transparent 70%)" }} aria-hidden="true" />
              <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(90deg, hsl(22,15%,12%), transparent)" }} aria-hidden="true" />
              <div className="relative z-10">
                <p className="text-4xl font-serif shimmer-text font-bold mb-2">
                  {s.raw ? s.raw : <CountUp end={s.end} suffix="" duration={1.8} />}{s.suffix}
                </p>
                <p className="text-[9px] tracking-[0.35em] uppercase" style={{ color: "rgba(22,15,8,0.38)" }}>{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const values = [
    { icon: "✦", title: "Excellence Without Exception", desc: "Every service receives the full weight of our expertise and attention." },
    { icon: "◈", title: "Inclusive by Design", desc: "From day one, we have welcomed every hair type, identity, and background." },
    { icon: "◇", title: "Craft Over Commerce", desc: "We keep our books small so every client receives an unhurried, premium experience." },
  ];
  return (
    <section className="py-24 md:py-32 section-divider relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-14">
          <motion.div className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
            <div className="h-px w-7" style={{ background: "hsl(22,15%,20%)" }} />
            <span className="text-[13px] tracking-[0.32em] uppercase font-semibold" style={{ color: "hsl(22,20%,12%)" }}>Our Values</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              className="heading-bebas"
              style={{ fontSize: "clamp(50px, 7.5vw, 100px)", color: "hsl(22,20%,8%)", lineHeight: 0.92 }}
              initial={{ y: "108%", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
              What We <span className="text-gold-gradient">Stand For</span>
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
                style={{ background: "#ffffff", border: "1px solid rgba(22,15,8,0.07)", boxShadow: "0 2px 16px rgba(22,15,8,0.04)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(22,15,8,0.03), transparent 65%)" }} aria-hidden="true" />
                <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: "linear-gradient(90deg, hsl(22,15%,12%), transparent)" }} aria-hidden="true" />
                <div className="relative z-10">
                  <motion.span className="text-3xl block mb-5" style={{ color: "rgba(22,15,8,0.45)" }}
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  >{v.icon}</motion.span>
                  <h3 className="text-base font-serif mb-3 transition-colors" style={{ color: "hsl(22,20%,10%)" }}>{v.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(22,15,8,0.48)" }}>{v.desc}</p>
                  <motion.div className="h-px w-0 group-hover:w-12 mx-auto mt-5 transition-all duration-500" style={{ background: "hsl(22,15%,20%)" }} />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    <section className="py-24 md:py-32 section-divider relative overflow-hidden" style={{ background: "hsl(30,10%,96%)" }}>
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <motion.div className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
            <motion.span className="h-px" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }}
              transition={{ duration: 0.8 }} style={{ background: "linear-gradient(90deg, transparent, rgba(22,15,8,0.22))" }} />
            <span className="text-[13px] tracking-[0.32em] uppercase font-semibold" style={{ color: "hsl(22,20%,12%)" }}>The Journey</span>
            <motion.span className="h-px" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }}
              transition={{ duration: 0.8 }} style={{ background: "linear-gradient(90deg, rgba(22,15,8,0.22), transparent)" }} />
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2 className="text-4xl md:text-5xl font-serif" style={{ color: "hsl(22,20%,8%)" }}
              initial={{ y: "110%", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              A Decade of <span className="text-gold-gradient italic">Craft</span>
            </motion.h2>
          </div>
        </div>

        <div ref={lineRef} className="relative">
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: "rgba(22,15,8,0.06)" }} />
          <motion.div className="absolute left-[27px] md:left-1/2 top-0 w-px -translate-x-1/2"
            initial={{ height: 0 }} animate={inView ? { height: "100%" } : {}}
            transition={{ duration: 1.8, delay: 0.3, ease: "easeOut" }}
            style={{ background: "linear-gradient(to bottom, hsl(22,15%,20%), rgba(22,15,8,0.08))" }} />

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
                    style={{ background: "#ffffff", border: "1px solid rgba(22,15,8,0.07)", boxShadow: "0 2px 14px rgba(22,15,8,0.04)" }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(22,15,8,0.03), transparent 65%)" }} aria-hidden="true" />
                    <div className="relative z-10">
                      <span className="block text-[9px] tracking-[0.35em] uppercase mb-2" style={{ color: "rgba(22,15,8,0.38)" }}>{m.year}</span>
                      <h3 className="text-sm font-serif font-semibold mb-2 transition-colors" style={{ color: "hsl(22,20%,10%)" }}>{m.title}</h3>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(22,15,8,0.48)" }}>{m.desc}</p>
                    </div>
                  </TiltCard>
                </div>
                <motion.div className="relative z-10 flex-shrink-0 w-14 flex items-center justify-center"
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.15, type: "spring", stiffness: 200 }}>
                  <motion.div className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "hsl(30,10%,96%)", border: "2px solid hsl(22,15%,18%)" }}
                    animate={{ boxShadow: ["0 0 0px rgba(22,15,8,0)", "0 0 14px rgba(22,15,8,0.20)", "0 0 0px rgba(22,15,8,0)"] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: "hsl(22,15%,18%)" }} />
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

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

function StatCard({ value, suffix, label, delay }: { value: string; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative group p-8 overflow-hidden"
      style={{
        background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))",
        border: "1px solid rgba(201,168,76,0.10)",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07), transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }}
        aria-hidden="true"
      />
      <p className="text-4xl font-serif shimmer-text font-bold mb-2">
        {value}<span className="text-2xl">{suffix}</span>
      </p>
      <p className="text-[9px] tracking-[0.35em] uppercase text-white/35">{label}</p>
    </motion.div>
  );
}

function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 md:py-32 section-divider">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-px" style={{ background: "hsl(43,65%,52%)" }} />
              <span className="text-[9px] tracking-[0.4em] uppercase text-yellow-400/60">Who We Are</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif leading-[1.1] text-white/88 mb-8">
              More Than a Salon — <br />
              <span className="text-gold-gradient italic">A Philosophy</span>
            </h2>
            <div className="space-y-5 text-sm leading-relaxed text-white/45">
              <p>
                Matthew Dillard Hair Salons was built on a simple belief: every person who sits
                in the chair deserves to feel extraordinary when they leave. Our Prosper, Texas
                studio is a sanctuary — designed to feel exclusive without feeling intimidating.
              </p>
              <p>
                As a veteran-owned, LGBTQ+ friendly salon, we celebrate every individual.
                Matthew's approach is collaborative — he listens deeply, understands your
                lifestyle, and crafts a look that is uniquely, authentically yours.
              </p>
              <p>
                With roots in master coloristry and an eye trained on the world's most
                prestigious runways, Matthew brings an international standard of craft to
                every appointment in Prosper, Texas.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-10">
              {["Veteran Owned", "LGBTQ+ Friendly", "Master Colorist", "Blade Specialist"].map((badge) => (
                <span
                  key={badge}
                  className="px-4 py-2 text-[9px] tracking-[0.3em] uppercase text-yellow-400/70"
                  style={{ border: "1px solid rgba(201,168,76,0.2)" }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="space-y-4"
          >
            {[
              { title: "Artistry First", desc: "Hair is not just cut or colored — it's sculpted. Every appointment is treated like a creative commission, with the same reverence a sculptor brings to marble." },
              { title: "Personalized Experience", desc: "No two clients are the same. Matthew takes time to understand your hair's history, your daily routine, and your vision before a single snip is made." },
              { title: "Continued Education", desc: "The world of hair never stops evolving. Matthew regularly trains with industry leaders to bring the latest techniques directly to your chair." },
            ].map((item, i) => (
              <div
                key={item.title}
                className="p-7 group"
                style={{
                  background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))",
                  border: "1px solid rgba(201,168,76,0.08)",
                }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="text-xs font-serif text-yellow-400/40 group-hover:text-yellow-400/70 transition-colors flex-shrink-0 mt-0.5"
                    style={{ fontVariantNumeric: "oldstyle-nums" }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-serif font-semibold text-white/80 group-hover:text-white transition-colors mb-2">{item.title}</h3>
                    <p className="text-xs text-white/35 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatsRow() {
  return (
    <section className="py-16 section-divider">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard value="4.8" suffix="/5" label="Average Rating" delay={0} />
          <StatCard value="28" suffix="+" label="Verified Reviews" delay={0.08} />
          <StatCard value="10" suffix="+" label="Years of Expertise" delay={0.16} />
          <StatCard value="5K" suffix="+" label="Clients Served" delay={0.24} />
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-24 md:py-32 section-divider">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-10 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }} />
            <span className="text-[9px] tracking-[0.4em] uppercase text-yellow-400/60">Our Values</span>
            <span className="w-10 h-px" style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white/88">
            What We <span className="text-gold-gradient italic">Stand For</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "✦", title: "Excellence Without Exception", desc: "Every service — regardless of its price point — receives the full weight of our expertise and attention." },
            { icon: "◈", title: "Inclusive by Design", desc: "From our first day, we have welcomed every hair type, identity, and background. Everyone deserves to feel beautiful." },
            { icon: "◇", title: "Craft Over Commerce", desc: "We keep our books intentionally small so that every client receives the unhurried, premium experience they deserve." },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-9 text-center group"
              style={{
                background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))",
                border: "1px solid rgba(201,168,76,0.08)",
              }}
            >
              <span className="text-3xl text-yellow-400/35 group-hover:text-yellow-400/60 transition-colors block mb-5">{v.icon}</span>
              <h3 className="text-base font-serif text-white/80 group-hover:text-white transition-colors mb-3">{v.title}</h3>
              <p className="text-xs text-white/35 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
      <ValuesSection />
    </Layout>
  );
}

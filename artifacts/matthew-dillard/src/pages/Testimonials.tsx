import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const REVIEWS = [
  {
    text: "I highly recommend him for your next service, he will not disappoint! Matthew has an incredible eye for what works best for each individual client. The atmosphere is relaxed but the results are anything but — truly world-class.",
    author: "Sarah M.",
    location: "Frisco, TX",
    service: "Balayage",
    stars: 5,
    date: "Recent",
  },
  {
    text: "Highly suggest this place if you are in the Frisco/McKinney area! I came in for a balayage and left feeling like an entirely different person. The attention to detail and the level of craft here is unlike anything I have experienced at any other salon.",
    author: "Emily R.",
    location: "McKinney, TX",
    service: "Balayage",
    stars: 5,
    date: "Recent",
  },
  {
    text: "Quirky sense of humor and laid back vibe that instantly puts you at ease. Matthew is genuinely talented — the kind of stylist who listens, understands your vision, and then somehow makes it even better than you imagined. I will not go anywhere else.",
    author: "Jordan T.",
    location: "Prosper, TX",
    service: "Hair Coloring",
    stars: 5,
    date: "Recent",
  },
  {
    text: "Finding a colorist who truly understands blonde is nearly impossible. Matthew is the rare exception — my hair has never looked more luminous or felt more healthy. The environment is calm, the conversation is easy, and the results speak for themselves.",
    author: "Lauren K.",
    location: "Celina, TX",
    service: "Blonde Specialist",
    stars: 5,
    date: "Recent",
  },
  {
    text: "Matthew did my hair for my wedding and I could not have been more thrilled. He worked with me through multiple trials until we found exactly the right look — patient, talented, and so supportive throughout the entire process.",
    author: "Amanda P.",
    location: "Allen, TX",
    service: "Bridal Styling",
    stars: 5,
    date: "Recent",
  },
  {
    text: "Veteran-owned and genuinely kind — this is not just a salon, it's a community. Matthew treats every client with such care and intention. I drove 45 minutes and I would drive twice as far. He is simply that good.",
    author: "Marcus D.",
    location: "Plano, TX",
    service: "Luxury Haircuts",
    stars: 5,
    date: "Recent",
  },
];

function ReviewCard({ review, index, inView }: { review: typeof REVIEWS[0]; index: number; inView: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 180;
  const displayText = isLong && !expanded ? review.text.slice(0, 180) + "…" : review.text;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-8 overflow-hidden flex flex-col gap-5"
      style={{
        background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))",
        border: "1px solid rgba(201,168,76,0.10)",
      }}
      data-testid={`review-card-${index}`}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.06), transparent 65%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex gap-0.5">
          {[1,2,3,4,5].map(i => (
            <span key={i} className="text-yellow-400 text-xs">★</span>
          ))}
        </div>
        <span
          className="text-[8px] tracking-[0.25em] uppercase text-yellow-400/50 px-2.5 py-1 flex-shrink-0"
          style={{ border: "1px solid rgba(201,168,76,0.2)" }}
        >
          {review.service}
        </span>
      </div>

      <div className="relative z-10">
        <p className="text-sm leading-relaxed text-white/50 font-serif italic">
          &ldquo;{displayText}&rdquo;
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(v => !v)}
            className="mt-2 text-[9px] tracking-[0.2em] uppercase text-yellow-400/50 hover:text-yellow-400/80 transition-colors"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      <div className="relative z-10 flex items-center gap-3 mt-auto">
        <div
          className="w-8 h-8 flex items-center justify-center text-xs font-serif text-black font-bold flex-shrink-0"
          style={{ background: "linear-gradient(135deg, hsl(43,65%,52%), hsl(35,70%,45%))" }}
          aria-hidden="true"
        >
          {review.author[0]}
        </div>
        <div>
          <p className="text-xs font-medium text-white/70">{review.author}</p>
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/30">{review.location}</p>
        </div>
      </div>
    </motion.div>
  );
}

function OverallRating() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <section ref={ref} className="py-16 section-divider">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, hsl(28,18%,8%), hsl(22,16%,6%))",
            border: "1px solid rgba(201,168,76,0.12)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.05), transparent 65%)" }}
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
            {[
              { value: "4.8", label: "Overall Rating", sub: "Out of 5.0" },
              { value: "28+", label: "Total Reviews", sub: "Verified clients" },
              { value: "100%", label: "Recommend Rate", sub: "Would return" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-5xl font-serif shimmer-text font-bold">{s.value}</span>
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

export default function TestimonialsPage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Layout>
      <PageHero
        title="What Clients"
        titleGold="Say"
        subtitle="Real words from real people who trust Matthew with their hair."
        breadcrumb="Reviews"
      />
      <OverallRating />
      <section ref={ref} className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((review, i) => (
              <ReviewCard key={i} review={review} index={i} inView={inView} />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center mt-16 pt-12"
            style={{ borderTop: "1px solid rgba(201,168,76,0.06)" }}
          >
            <p className="text-sm text-white/35 mb-6">Ready to write your own story?</p>
            <a
              href="https://matthewdillard.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-9 py-4 text-xs tracking-[0.28em] uppercase text-black font-medium transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, hsl(43,72%,54%), hsl(35,78%,47%))", boxShadow: "0 6px 28px rgba(201,168,76,0.38)" }}
            >
              Book Your Appointment
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

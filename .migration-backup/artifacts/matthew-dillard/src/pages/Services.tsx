import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const SERVICES = [
  {
    icon: "◉",
    title: "Hair Coloring",
    desc: "From single-process to complex multi-dimensional color — executed with precision and creative vision. We use professional-grade color lines chosen for their depth, longevity, and hair integrity.",
    features: ["Single process", "Double process", "Root touch-up", "Toning & glazing"],
    badge: "Most Popular",
  },
  {
    icon: "◈",
    title: "Balayage",
    desc: "The art of hand-painted color, crafted to look sun-kissed and grow out naturally. Our balayage technique creates seamless transitions that read as effortlessly beautiful in every light.",
    features: ["Classic balayage", "Baby lights", "Money piece", "Color melt"],
    badge: null,
  },
  {
    icon: "✦",
    title: "Blonde Specialist",
    desc: "Platinum, honey, ash, or golden — every shade of blonde deserves a specialist. Matthew is trained in corrective blonde work and bond-building treatments to keep your hair luminous.",
    features: ["Platinum blonde", "Highlights", "Corrective blonde", "Toning"],
    badge: "Specialty",
  },
  {
    icon: "◇",
    title: "Luxury Haircuts",
    desc: "A haircut is architecture. Matthew's cuts are engineered to complement your face shape, lifestyle, and texture — delivering a shape that moves beautifully and is easy to maintain.",
    features: ["Precision cut", "Texture cut", "Dry cut", "Men's cut"],
    badge: null,
  },
  {
    icon: "◆",
    title: "Hair Styling",
    desc: "Blowouts, waves, and editorial looks for any occasion. Whether it's a Tuesday morning or a black-tie gala, you leave looking polished and feeling confident.",
    features: ["Blowout", "Curling & waving", "Braiding", "Editorial"],
    badge: null,
  },
  {
    icon: "❋",
    title: "Hair Treatments",
    desc: "Repair, restore, and protect. Our treatment menu includes Olaplex bond-building, deep conditioning, scalp treatments, and keratin smoothing — tailored to your hair's specific needs.",
    features: ["Olaplex", "Deep conditioning", "Scalp treatment", "Keratin smoothing"],
    badge: "Recommended",
  },
  {
    icon: "❃",
    title: "Bridal Styling",
    desc: "Your wedding day hair should be as extraordinary as the moment. Matthew offers full bridal consultations, trials, and day-of styling for the bride and entire bridal party.",
    features: ["Bridal consultation", "Hair trial", "Day-of styling", "Bridal party"],
    badge: "Book Early",
  },
  {
    icon: "⬡",
    title: "Extensions",
    desc: "Length, volume, and fullness — transformed in a single session. We offer hand-tied and tape-in extension methods using premium human hair, matched and blended to perfection.",
    features: ["Hand-tied", "Tape-in", "Volume extensions", "Maintenance"],
    badge: null,
  },
];

export default function ServicesPage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Layout>
      <PageHero
        title="Our"
        titleGold="Services"
        subtitle="Eight ways we transform your hair — every one a statement in luxury craft."
        breadcrumb="What We Offer"
      />
      <section ref={ref} className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-5">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-9 overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))",
                  border: "1px solid rgba(201,168,76,0.08)",
                }}
                data-testid={`service-card-${i}`}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600"
                  style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.07), transparent 65%)" }}
                  aria-hidden="true"
                />
                <div
                  className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), rgba(201,168,76,0.3), transparent)" }}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl text-yellow-400/40 group-hover:text-yellow-400/70 transition-colors">{svc.icon}</span>
                      <div>
                        <h3 className="text-lg font-serif font-semibold text-white/85 group-hover:text-white transition-colors">{svc.title}</h3>
                      </div>
                    </div>
                    {svc.badge && (
                      <span
                        className="text-[8px] tracking-[0.3em] uppercase text-yellow-400/70 px-3 py-1 flex-shrink-0"
                        style={{ border: "1px solid rgba(201,168,76,0.25)" }}
                      >
                        {svc.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-white/40 leading-relaxed mb-6">{svc.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {svc.features.map((f) => (
                      <span key={f} className="text-[9px] tracking-[0.2em] text-white/35 px-3 py-1" style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.08)" }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16 pt-16"
            style={{ borderTop: "1px solid rgba(201,168,76,0.08)" }}
          >
            <p className="text-sm text-white/40 mb-6">
              Not sure which service is right for you? We always begin with a complimentary consultation.
            </p>
            <a
              href="https://matthewdillard.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.28em] uppercase text-black font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, hsl(43,72%,54%), hsl(35,78%,47%))",
                boxShadow: "0 6px 28px rgba(201,168,76,0.38)",
              }}
              data-testid="services-book-btn"
            >
              Book a Consultation
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

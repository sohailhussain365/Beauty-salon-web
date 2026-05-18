import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <circle cx="20" cy="20" r="14" />
        <circle cx="20" cy="20" r="7" />
        <circle cx="20" cy="20" r="2" fill="currentColor" stroke="none" />
        <line x1="20" y1="2" x2="20" y2="6" />
        <line x1="20" y1="34" x2="20" y2="38" />
        <line x1="2" y1="20" x2="6" y2="20" />
        <line x1="34" y1="20" x2="38" y2="20" />
      </svg>
    ),
    title: "Hair Coloring",
    desc: "From single-process to complex multi-dimensional color — executed with precision and creative vision. Professional-grade color lines chosen for their depth, longevity, and hair integrity.",
    features: ["Single process", "Double process", "Root touch-up", "Toning & glazing"],
    badge: "Most Popular",
    color: "rgba(201,168,76,0.85)",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M20 4 L28 14 L38 16 L30 24 L32 34 L20 28 L8 34 L10 24 L2 16 L12 14 Z" />
        <circle cx="20" cy="20" r="4" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Balayage",
    desc: "The art of hand-painted color, crafted to look sun-kissed and grow out naturally. Seamless transitions that read as effortlessly beautiful in every light.",
    features: ["Classic balayage", "Baby lights", "Money piece", "Color melt"],
    badge: null,
    color: "rgba(230,195,100,0.85)",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <polygon points="20,4 24,16 36,16 27,24 30,36 20,29 10,36 13,24 4,16 16,16" />
      </svg>
    ),
    title: "Blonde Specialist",
    desc: "Platinum, honey, ash, or golden — every shade of blonde deserves a specialist. Trained in corrective blonde work and bond-building to keep your hair luminous.",
    features: ["Platinum blonde", "Highlights", "Corrective blonde", "Toning"],
    badge: "Specialty",
    color: "rgba(240,220,160,0.85)",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M10 4 Q20 2 30 4 Q35 12 35 20 Q35 32 20 36 Q5 32 5 20 Q5 12 10 4" />
        <path d="M14 16 Q20 14 26 16 Q28 22 26 26 Q20 30 14 26 Q12 22 14 16" />
      </svg>
    ),
    title: "Luxury Haircuts",
    desc: "A haircut is architecture. Cuts engineered to complement your face shape, lifestyle, and texture — delivering a shape that moves beautifully and is easy to maintain.",
    features: ["Precision cut", "Texture cut", "Dry cut", "Men's cut"],
    badge: null,
    color: "rgba(160,200,230,0.75)",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M8 20 Q14 8 20 6 Q26 8 32 20" strokeLinecap="round" />
        <path d="M6 24 Q12 12 20 10 Q28 12 34 24" strokeLinecap="round" />
        <path d="M10 28 Q16 18 20 16 Q24 18 30 28" strokeLinecap="round" />
        <line x1="20" y1="6" x2="20" y2="36" strokeLinecap="round" />
      </svg>
    ),
    title: "Hair Styling",
    desc: "Blowouts, waves, and editorial looks for any occasion. Whether it's a Tuesday morning or a black-tie gala, you leave polished and confident.",
    features: ["Blowout", "Curling & waving", "Braiding", "Editorial"],
    badge: null,
    color: "rgba(180,140,220,0.75)",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <circle cx="20" cy="20" r="10" />
        <path d="M20 6 C26 6 34 12 34 20 C34 28 26 34 20 34" strokeLinecap="round" />
        <path d="M20 10 C24 10 30 14 30 20 C30 26 24 30 20 30" strokeLinecap="round" />
        <circle cx="20" cy="20" r="3" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Hair Treatments",
    desc: "Repair, restore, and protect. Olaplex bond-building, deep conditioning, scalp treatments, and keratin smoothing — tailored to your hair's specific needs.",
    features: ["Olaplex", "Deep conditioning", "Scalp treatment", "Keratin smoothing"],
    badge: "Recommended",
    color: "rgba(100,210,180,0.75)",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M12 8 Q12 4 16 4 Q20 4 20 8 Q20 4 24 4 Q28 4 28 8" strokeLinecap="round" />
        <path d="M6 14 Q6 10 10 10 L30 10 Q34 10 34 14 L32 32 Q32 36 28 36 L12 36 Q8 36 8 32 Z" />
        <line x1="16" y1="18" x2="16" y2="30" strokeLinecap="round" />
        <line x1="20" y1="16" x2="20" y2="30" strokeLinecap="round" />
        <line x1="24" y1="18" x2="24" y2="30" strokeLinecap="round" />
      </svg>
    ),
    title: "Bridal Styling",
    desc: "Your wedding day hair should be as extraordinary as the moment. Full bridal consultations, trials, and day-of styling for the bride and entire bridal party.",
    features: ["Bridal consultation", "Hair trial", "Day-of styling", "Bridal party"],
    badge: "Book Early",
    color: "rgba(220,170,210,0.75)",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <polygon points="20,4 36,12 36,28 20,36 4,28 4,12" />
        <polygon points="20,10 30,15 30,25 20,30 10,25 10,15" />
        <circle cx="20" cy="20" r="4" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Extensions",
    desc: "Length, volume, and fullness — transformed in a single session. Hand-tied and tape-in methods using premium human hair, matched and blended to perfection.",
    features: ["Hand-tied", "Tape-in", "Volume extensions", "Maintenance"],
    badge: null,
    color: "rgba(201,168,76,0.7)",
  },
];

function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-9 overflow-hidden"
      style={{
        background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))",
        border: "1px solid rgba(201,168,76,0.08)",
      }}
      whileHover={{
        borderColor: "rgba(201,168,76,0.22)",
        y: -3,
        transition: { duration: 0.25 },
      }}
      data-testid={`service-card-${index}`}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600"
        style={{ background: `radial-gradient(ellipse at 20% 10%, ${svc.color.replace("0.85", "0.07").replace("0.75", "0.06")}, transparent 65%)` }}
        aria-hidden="true"
      />

      {/* Top gold line sweep */}
      <div
        className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-600 origin-left"
        style={{ background: `linear-gradient(90deg, ${svc.color}, rgba(201,168,76,0.3), transparent)` }}
        aria-hidden="true"
      />

      {/* Bottom glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${svc.color.replace("0.85","0.3").replace("0.75","0.2")}, transparent)` }}
        transition={{ duration: 0.4 }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-5">
            {/* Animated icon */}
            <motion.div
              className="flex-shrink-0"
              style={{ width: 40, height: 40, color: svc.color }}
              animate={{
                filter: [
                  `drop-shadow(0 0 4px ${svc.color.replace("0.85", "0.3").replace("0.75","0.2")})`,
                  `drop-shadow(0 0 12px ${svc.color.replace("0.85", "0.8").replace("0.75","0.7")})`,
                  `drop-shadow(0 0 4px ${svc.color.replace("0.85", "0.3").replace("0.75","0.2")})`,
                ],
              }}
              transition={{ duration: 3 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
            >
              {svc.icon}
            </motion.div>
            <h3 className="text-lg font-serif font-semibold text-white/85 group-hover:text-white transition-colors duration-300">
              {svc.title}
            </h3>
          </div>
          {svc.badge && (
            <motion.span
              className="text-[8px] tracking-[0.3em] uppercase px-3 py-1 flex-shrink-0"
              style={{
                color: svc.color,
                border: `1px solid ${svc.color.replace("0.85", "0.3").replace("0.75","0.25")}`,
                background: svc.color.replace("0.85", "0.05").replace("0.75","0.04"),
              }}
              animate={{
                boxShadow: [
                  `0 0 0px ${svc.color.replace("0.85","0")}`,
                  `0 0 8px ${svc.color.replace("0.85","0.3").replace("0.75","0.2")}`,
                  `0 0 0px ${svc.color.replace("0.85","0")}`,
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {svc.badge}
            </motion.span>
          )}
        </div>

        <p className="text-sm text-white/40 leading-relaxed mb-6">{svc.desc}</p>

        <div className="flex flex-wrap gap-2">
          {svc.features.map((f, fi) => (
            <motion.span
              key={f}
              className="text-[9px] tracking-[0.18em] text-white/35 px-3 py-1 transition-all duration-300 group-hover:text-white/50"
              style={{
                background: "rgba(201,168,76,0.04)",
                border: "1px solid rgba(201,168,76,0.08)",
              }}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + fi * 0.06 }}
              whileHover={{
                background: svc.color.replace("0.85","0.08").replace("0.75","0.06"),
                borderColor: svc.color.replace("0.85","0.25").replace("0.75","0.2"),
                color: "rgba(255,255,255,0.65)",
              }}
            >
              {f}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <Layout>
      <PageHero
        title="Our"
        titleGold="Services"
        subtitle="Eight ways we transform your hair — every one a statement in luxury craft."
        breadcrumb="What We Offer"
      />
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background ambient sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${(i * 8.3) % 100}%`,
                top: `${10 + (i % 4) * 22}%`,
                color: "rgba(201,168,76,0.08)",
                fontSize: 16 + (i % 3) * 6,
              }}
              animate={{
                opacity: [0.06, 0.2, 0.06],
                scale: [0.8, 1.3, 0.8],
                rotate: [0, 90, 180],
              }}
              transition={{
                duration: 5 + i * 0.6,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✦
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-4">
            {SERVICES.map((svc, i) => (
              <ServiceCard key={svc.title} svc={svc} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-16 pt-16"
            style={{ borderTop: "1px solid rgba(201,168,76,0.08)" }}
          >
            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="w-16 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4))" }} />
              <span className="text-[9px] tracking-[0.4em] uppercase text-yellow-400/50">Begin Your Journey</span>
              <span className="w-16 h-px" style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.4), transparent)" }} />
            </motion.div>
            <p className="text-sm text-white/38 mb-8 max-w-sm mx-auto leading-relaxed">
              Not sure which service is right for you? We always begin with a complimentary consultation.
            </p>
            <motion.a
              href="https://matthewdillard.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.28em] uppercase text-black font-medium relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(43,72%,54%), hsl(35,78%,47%))",
                boxShadow: "0 6px 28px rgba(201,168,76,0.38)",
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 36px rgba(201,168,76,0.55)",
              }}
              data-testid="services-book-btn"
            >
              Book a Consultation
              <motion.svg
                className="w-3.5 h-3.5"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <circle cx="20" cy="20" r="14" /><circle cx="20" cy="20" r="7" />
        <circle cx="20" cy="20" r="2" fill="currentColor" stroke="none" />
        <line x1="20" y1="2" x2="20" y2="6" /><line x1="20" y1="34" x2="20" y2="38" />
        <line x1="2" y1="20" x2="6" y2="20" /><line x1="34" y1="20" x2="38" y2="20" />
      </svg>
    ),
    title: "Hair Coloring", badge: "Most Popular",
    desc: "From single-process to complex multi-dimensional color — executed with precision and creative vision. Professional-grade color lines chosen for their depth, longevity, and hair integrity.",
    features: ["Single process", "Double process", "Root touch-up", "Toning & glazing"],
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M20 4 L28 14 L38 16 L30 24 L32 34 L20 28 L8 34 L10 24 L2 16 L12 14 Z" />
        <circle cx="20" cy="20" r="4" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Balayage", badge: null,
    desc: "The art of hand-painted color, crafted to look sun-kissed and grow out naturally. Seamless transitions that read as effortlessly beautiful in every light.",
    features: ["Classic balayage", "Baby lights", "Money piece", "Color melt"],
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <polygon points="20,4 24,16 36,16 27,24 30,36 20,29 10,36 13,24 4,16 16,16" />
      </svg>
    ),
    title: "Blonde Specialist", badge: "Specialty",
    desc: "Platinum, honey, ash, or golden — every shade of blonde deserves a specialist. Trained in corrective blonde work and bond-building to keep your hair luminous.",
    features: ["Platinum blonde", "Highlights", "Corrective blonde", "Toning"],
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M10 4 Q20 2 30 4 Q35 12 35 20 Q35 32 20 36 Q5 32 5 20 Q5 12 10 4" />
        <path d="M14 16 Q20 14 26 16 Q28 22 26 26 Q20 30 14 26 Q12 22 14 16" />
      </svg>
    ),
    title: "Luxury Haircuts", badge: null,
    desc: "A haircut is architecture. Cuts engineered to complement your face shape, lifestyle, and texture — delivering a shape that moves beautifully and is easy to maintain.",
    features: ["Precision cut", "Texture cut", "Dry cut", "Men's cut"],
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
    title: "Hair Styling", badge: null,
    desc: "Blowouts, waves, and editorial looks for any occasion. Whether it's a Tuesday morning or a black-tie gala, you leave polished and confident.",
    features: ["Blowout", "Curling & waving", "Braiding", "Editorial"],
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
    title: "Hair Treatments", badge: "Recommended",
    desc: "Repair, restore, and protect. Olaplex bond-building, deep conditioning, scalp treatments, and keratin smoothing — tailored to your hair's specific needs.",
    features: ["Olaplex", "Deep conditioning", "Scalp treatment", "Keratin smoothing"],
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
    title: "Bridal Styling", badge: "Book Early",
    desc: "Your wedding day hair should be as extraordinary as the moment. Full bridal consultations, trials, and day-of styling for the bride and entire bridal party.",
    features: ["Bridal consultation", "Hair trial", "Day-of styling", "Bridal party"],
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <polygon points="20,4 36,12 36,28 20,36 4,28 4,12" />
        <polygon points="20,10 30,15 30,25 20,30 10,25 10,15" />
        <circle cx="20" cy="20" r="4" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Extensions", badge: null,
    desc: "Length, volume, and fullness — transformed in a single session. Hand-tied and tape-in methods using premium human hair, matched and blended to perfection.",
    features: ["Hand-tied", "Tape-in", "Volume extensions", "Maintenance"],
  },
];

function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, x: isEven ? -30 : 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.9, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-9 overflow-hidden"
      style={{ background: "#ffffff", border: "1px solid rgba(22,15,8,0.07)", boxShadow: "0 2px 16px rgba(22,15,8,0.04)" }}
      whileHover={{ borderColor: "rgba(22,15,8,0.18)", y: -6, transition: { duration: 0.25 } }}
      data-testid={`service-card-${index}`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse at 20% 10%, rgba(22,15,8,0.03), transparent 65%)" }} aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: "linear-gradient(90deg, hsl(22,15%,12%), transparent)" }} aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg, transparent, rgba(22,15,8,0.10), transparent)" }} aria-hidden="true" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-5">
            <motion.div className="flex-shrink-0" style={{ width: 40, height: 40, color: "rgba(22,15,8,0.45)" }}
              animate={{ opacity: [0.45, 0.72, 0.45] }}
              transition={{ duration: 3 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
            >{svc.icon}</motion.div>
            <div className="overflow-hidden">
              <motion.h3 className="text-lg font-serif font-semibold transition-colors duration-300"
                style={{ color: "hsl(22,20%,10%)" }}
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: (index % 4) * 0.1 + 0.15, ease: [0.16, 1, 0.3, 1] }}
              >{svc.title}</motion.h3>
            </div>
          </div>
          {svc.badge && (
            <motion.span className="text-[8px] tracking-[0.3em] uppercase px-3 py-1 flex-shrink-0"
              style={{ color: "rgba(22,15,8,0.50)", border: "1px solid rgba(22,15,8,0.15)", background: "rgba(22,15,8,0.03)" }}
            >{svc.badge}</motion.span>
          )}
        </div>

        <motion.p className="text-sm leading-relaxed mb-6"
          style={{ color: "rgba(22,15,8,0.48)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: (index % 4) * 0.1 + 0.25 }}
        >{svc.desc}</motion.p>

        <div className="flex flex-wrap gap-2">
          {svc.features.map((f, fi) => (
            <motion.span key={f}
              initial={{ opacity: 0, x: -12, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (index % 4) * 0.1 + 0.35 + fi * 0.07 }}
              className="text-[9px] tracking-[0.18em] px-3 py-1 transition-all duration-300"
              style={{ color: "rgba(22,15,8,0.42)", background: "rgba(22,15,8,0.03)", border: "1px solid rgba(22,15,8,0.09)" }}
              whileHover={{ background: "rgba(22,15,8,0.07)", borderColor: "rgba(22,15,8,0.20)", color: "rgba(22,15,8,0.60)" }}
            >{f}</motion.span>
          ))}
        </div>

        <div className="mt-6 h-px w-0 group-hover:w-12 transition-all duration-500" style={{ background: "hsl(22,15%,20%)" }} />
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <Layout>
      <PageHero title="Our" titleGold="Services" subtitle="Eight ways we transform your hair — every one a statement in luxury craft." breadcrumb="What We Offer" />

      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {[...Array(14)].map((_, i) => (
            <motion.div key={i} className="absolute"
              style={{ left: `${(i * 7.3) % 100}%`, top: `${8 + (i % 5) * 18}%`, color: "rgba(22,15,8,0.05)", fontSize: 14 + (i % 3) * 5 }}
              animate={{ opacity: [0.03, 0.12, 0.03], scale: [0.7, 1.4, 0.7], rotate: [0, 90, 180] }}
              transition={{ duration: 5 + i * 0.6, delay: i * 0.45, repeat: Infinity, ease: "easeInOut" }}
            >✦</motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-16">
            <motion.div className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}>
              <div className="h-px w-7" style={{ background: "hsl(22,15%,20%)" }} />
              <span className="text-[9px] tracking-[0.42em] uppercase" style={{ color: "rgba(22,15,8,0.42)" }}>Specialties</span>
            </motion.div>
            <div className="overflow-hidden mb-4">
              <motion.h2
                className="heading-bebas"
                style={{ fontSize: "clamp(52px, 8vw, 106px)", color: "hsl(22,20%,8%)", lineHeight: 0.92 }}
                initial={{ y: "108%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
                All <span className="text-gold-gradient">Services</span>
              </motion.h2>
            </div>
            <motion.p className="text-sm max-w-md leading-relaxed font-serif italic" style={{ color: "rgba(22,15,8,0.42)" }}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              Every service is a statement. Every result, a transformation.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {SERVICES.map((svc, i) => <ServiceCard key={svc.title} svc={svc} index={i} />)}
          </div>

          <motion.div className="text-center mt-16 pt-16"
            style={{ borderTop: "1px solid rgba(22,15,8,0.07)" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}>
            <motion.div className="flex items-center justify-center gap-4 mb-6"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <motion.span className="h-px" initial={{ width: 0 }} whileInView={{ width: 64 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ background: "linear-gradient(90deg, transparent, rgba(22,15,8,0.20))" }} />
              <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: "rgba(22,15,8,0.40)" }}>Begin Your Journey</span>
              <motion.span className="h-px" initial={{ width: 0 }} whileInView={{ width: 64 }} viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ background: "linear-gradient(90deg, rgba(22,15,8,0.20), transparent)" }} />
            </motion.div>
            <motion.p className="text-sm mb-8 max-w-sm mx-auto leading-relaxed" style={{ color: "rgba(22,15,8,0.40)" }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              Not sure which service is right for you? We always begin with a complimentary consultation.
            </motion.p>
            <motion.a href="https://matthewdillard.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.28em] uppercase text-white font-medium relative overflow-hidden transition-opacity hover:opacity-80"
              style={{ background: "hsl(22,15%,12%)", boxShadow: "0 6px 28px rgba(22,15,8,0.18)" }}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              data-testid="services-book-btn">
              Book a Consultation
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

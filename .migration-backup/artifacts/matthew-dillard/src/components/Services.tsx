import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Hair Coloring",
    description: "Custom color formulations crafted to complement your skin tone and lifestyle. From subtle shifts to dramatic transformations.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
    title: "Hair Styling",
    description: "Precision cuts and creative styling that moves with you. Everyday elegance or occasion-ready looks — we master both.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
      </svg>
    ),
    title: "Luxury Haircuts",
    description: "More than a trim — a sculptural experience. Tailored to your bone structure, personality, and vision.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13l-.866.5M4.206 15.5l-.866.5M20.66 15.5l-.866-.5M4.206 8.5l-.866-.5M21 12h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" />
      </svg>
    ),
    title: "Balayage",
    description: "Sun-kissed, hand-painted perfection. Our balayage technique creates natural dimension that grows out beautifully.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "Blonde Specialist",
    description: "The pinnacle of the craft. We specialize in every shade of blonde — platinum, honey, ash, and everything between.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Hair Treatments",
    description: "Restore vitality and luminosity to every strand. From deep conditioning to bond-repair therapy — hair health redefined.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Bridal Styling",
    description: "Your most important day deserves perfection. We craft bridal looks that remain flawless from ceremony to last dance.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Extensions",
    description: "Seamlessly integrated length and volume using only the finest quality hair. Undetectable, beautiful, transformative.",
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden section-divider"
      data-testid="services-section"
    >
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="block w-12 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }} />
            <span className="text-[9px] tracking-[0.4em] uppercase text-yellow-400/60">What We Offer</span>
            <span className="block w-12 h-px" style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white/90">
            Our <span className="text-gold-gradient italic">Services</span>
          </h2>
          <p className="mt-4 text-sm text-white/40 tracking-wide max-w-md mx-auto">
            Each service is an opportunity to elevate your appearance and confidence.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
              className="group relative p-6 cursor-default overflow-hidden"
              style={{
                background: "linear-gradient(145deg, hsl(22,16%,9%) 0%, hsl(22,16%,7%) 100%)",
                border: "1px solid rgba(201,168,76,0.08)",
              }}
              data-testid={`service-card-${i}`}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />
              {/* Top border accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="text-yellow-500/60 group-hover:text-yellow-400 transition-colors duration-300 mb-5">
                  {svc.icon}
                </div>
                <h3 className="text-sm font-semibold tracking-wide text-white/80 group-hover:text-white transition-colors duration-300 mb-3 font-serif">
                  {svc.title}
                </h3>
                <p className="text-xs leading-relaxed text-white/35 group-hover:text-white/50 transition-colors duration-300 mb-5">
                  {svc.description}
                </p>
                <a
                  href="https://matthewdillard.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase text-yellow-500/50 group-hover:text-yellow-400 transition-colors duration-300"
                  data-testid={`service-book-${i}`}
                >
                  Book Now
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

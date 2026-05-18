import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";

export default function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="cta"
      ref={ref}
      className="relative py-32 md:py-44 overflow-hidden section-divider"
      data-testid="cta-section"
    >
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 90% 70% at 50% 50%, hsl(30,22%,9%) 0%, hsl(22,18%,4%) 70%)" }}
        aria-hidden="true"
      />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 65%)", animationName: "orb-halo-drift", animationDuration: "8s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" }}
        aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 65%)", animationName: "orb-halo-drift", animationDuration: "8s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: "-6s", animationDirection: "reverse" }}
        aria-hidden="true" />
      <div className="absolute left-0 right-0 top-1/3 h-px opacity-10"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)" }}
        aria-hidden="true" />
      <div className="absolute left-0 right-0 bottom-1/3 h-px opacity-5"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)" }}
        aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex items-center gap-4">
            <span className="block w-16 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }} />
            <span style={{ fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)" }}>Book Your Experience</span>
            <span className="block w-16 h-px" style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} />
          </div>

          <h2 className="font-serif leading-[1.05]" style={{ fontSize: "clamp(36px, 6vw, 68px)" }}>
            <span className="block" style={{ color: "rgba(255,255,255,0.85)" }}>Experience Luxury</span>
            <span className="block shimmer-text italic mt-1">Hair Transformation</span>
          </h2>

          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.40)", lineHeight: 1.75, maxWidth: 480, letterSpacing: "0.02em" }}>
            Your transformation begins with a single appointment. Let Matthew Dillard bring your hair vision to life with artistry that speaks for itself.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Link href="/booking">
              <motion.div
                className="group relative px-10 py-5 overflow-hidden transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "linear-gradient(135deg, hsl(43,72%,54%), hsl(35,78%,47%))",
                  boxShadow: "0 6px 35px rgba(201,168,76,0.45), 0 0 0 1px rgba(201,168,76,0.2)",
                }}
                data-testid="cta-book-btn"
              >
                <span className="relative z-10 flex items-center gap-3 font-medium"
                  style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#000" }}>
                  Book Your Appointment
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, hsl(43,85%,62%), hsl(35,85%,53%))" }} />
              </motion.div>
            </Link>

            <a
              href="tel:+19725717787"
              className="px-8 py-5 flex items-center gap-3 transition-all duration-300 hover:border-yellow-400/50 hover:text-yellow-300"
              style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", border: "1px solid rgba(201,168,76,0.25)" }}
              data-testid="cta-call-btn"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us Now
            </a>
          </div>

          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em" }}>
            2281 E University Dr Suite 101 · Prosper, TX 75078
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)" }}
        aria-hidden="true" />
    </section>
  );
}

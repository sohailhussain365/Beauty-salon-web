import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const HOURS = [
  { day: "Monday – Tuesday", hours: "Closed", closed: true },
  { day: "Wednesday – Friday", hours: "10:00 AM – 7:00 PM", closed: false },
  { day: "Saturday", hours: "9:00 AM – 5:00 PM", closed: false },
  { day: "Sunday", hours: "By Appointment", closed: false },
];

function InfoCards() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <section ref={ref} className="py-16 section-divider">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
              label: "Address",
              value: "2281 E University Dr\nSuite 101\nProsper, TX 75078",
              href: "https://maps.google.com/?q=2281+E+University+Dr+Suite+101+Prosper+TX+75078",
            },
            {
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
              label: "Phone",
              value: "+1 (972) 571-7787",
              href: "tel:+19725717787",
            },
            {
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
              label: "Website",
              value: "matthewdillard.com",
              href: "https://matthewdillard.com",
            },
            {
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
              label: "Booking",
              value: "Book online 24/7 at matthewdillard.com",
              href: "https://matthewdillard.com",
            },
          ].map((info, i) => (
            <motion.a
              key={info.label}
              href={info.href}
              target={info.href.startsWith("http") ? "_blank" : undefined}
              rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group p-7 flex flex-col gap-4 transition-all duration-300"
              style={{
                background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))",
                border: "1px solid rgba(201,168,76,0.08)",
              }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center text-yellow-500/50 group-hover:text-yellow-400 transition-colors"
                style={{ border: "1px solid rgba(201,168,76,0.18)" }}
              >
                {info.icon}
              </div>
              <div>
                <p className="text-[8px] tracking-[0.35em] uppercase text-white/30 mb-1">{info.label}</p>
                <p className="text-sm text-white/55 group-hover:text-white/75 transition-colors leading-relaxed whitespace-pre-line">{info.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactMain() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", service: "", message: "" });
  };

  return (
    <section ref={ref} className="py-24 md:py-32 section-divider">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: map + hours */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-4 mb-5">
                <span className="w-8 h-px" style={{ background: "hsl(43,65%,52%)" }} />
                <span className="text-[9px] tracking-[0.4em] uppercase text-yellow-400/60">Find Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-white/88 mb-4">
                Visit the <span className="text-gold-gradient italic">Studio</span>
              </h2>
              <p className="text-sm text-white/40 leading-relaxed">
                Located in the heart of Prosper, TX — inside a serene, private studio designed for an unhurried luxury experience.
              </p>
            </div>

            {/* Map */}
            <div className="overflow-hidden h-52" style={{ border: "1px solid rgba(201,168,76,0.1)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3342.5!2d-96.8!3d33.24!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c3af8b3a48a7d%3A0x1!2s2281+E+University+Dr+Suite+101%2C+Prosper%2C+TX+75078!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.8) brightness(0.75)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Matthew Dillard Hair Salons Location"
              />
            </div>

            {/* Hours */}
            <div
              className="p-7"
              style={{
                background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))",
                border: "1px solid rgba(201,168,76,0.08)",
              }}
            >
              <p className="text-[9px] tracking-[0.35em] uppercase text-yellow-400/60 mb-5">Studio Hours</p>
              <div className="space-y-3">
                {HOURS.map((h) => (
                  <div key={h.day} className="flex items-center justify-between gap-4">
                    <span className="text-xs text-white/40">{h.day}</span>
                    <span className="text-xs font-medium" style={{ color: h.closed ? "rgba(255,255,255,0.2)" : "hsl(43,65%,52%)" }}>
                      {h.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <div
              className="p-9 md:p-11"
              style={{
                background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))",
                border: "1px solid rgba(201,168,76,0.1)",
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-px" style={{ background: "hsl(43,65%,52%)" }} />
                <span className="text-[9px] tracking-[0.4em] uppercase text-yellow-400/60">Get in Touch</span>
              </div>
              <h2 className="text-2xl font-serif text-white/88 mb-1">Send a Message</h2>
              <p className="text-xs text-white/30 mb-8 tracking-wide">We respond within 24 hours.</p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-12 text-center"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center text-yellow-400"
                    style={{ border: "1px solid rgba(201,168,76,0.4)" }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-white/50 font-serif italic">Message received. We'll be in touch.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                  {[
                    { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                    { key: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                  ].map((field) => (
                    <div key={field.key} className="flex flex-col gap-1.5">
                      <label className="text-[9px] tracking-[0.3em] uppercase text-white/30">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) => setFormData((f) => ({ ...f, [field.key]: e.target.value }))}
                        className="w-full px-4 py-3 text-sm text-white/70 placeholder:text-white/20 outline-none transition-all duration-300"
                        style={{ background: "hsl(22,16%,6%)", border: "1px solid rgba(201,168,76,0.08)" }}
                        required
                      />
                    </div>
                  ))}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] tracking-[0.3em] uppercase text-white/30">Service Interest</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData((f) => ({ ...f, service: e.target.value }))}
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-300"
                      style={{
                        background: "hsl(22,16%,6%)",
                        border: "1px solid rgba(201,168,76,0.08)",
                        color: formData.service ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                      }}
                    >
                      <option value="" style={{ background: "hsl(22,16%,9%)" }}>Select a service</option>
                      {["Hair Coloring", "Balayage", "Blonde Specialist", "Luxury Haircuts", "Hair Styling", "Hair Treatments", "Bridal Styling", "Extensions"].map((s) => (
                        <option key={s} value={s} style={{ background: "hsl(22,16%,9%)" }}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] tracking-[0.3em] uppercase text-white/30">Message</label>
                    <textarea
                      placeholder="Tell us about your hair goals..."
                      value={formData.message}
                      onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 text-sm text-white/70 placeholder:text-white/20 outline-none resize-none"
                      style={{ background: "hsl(22,16%,6%)", border: "1px solid rgba(201,168,76,0.08)" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 text-xs tracking-[0.28em] uppercase text-black font-medium transition-all duration-300 hover:opacity-90 hover:scale-[1.01] mt-2"
                    style={{ background: "linear-gradient(135deg, hsl(43,72%,54%), hsl(35,78%,47%))", boxShadow: "0 4px 20px rgba(201,168,76,0.3)" }}
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <Layout>
      <PageHero
        title="Visit &"
        titleGold="Connect"
        subtitle="Located in Prosper, TX — luxury hair artistry awaits."
        breadcrumb="Contact"
      />
      <InfoCards />
      <ContactMain />
    </Layout>
  );
}

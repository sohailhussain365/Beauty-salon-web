import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const HOURS = [
  { day: "Monday – Tuesday", hours: "Closed", closed: true },
  { day: "Wednesday – Friday", hours: "10:00 AM – 7:00 PM", closed: false },
  { day: "Saturday", hours: "9:00 AM – 5:00 PM", closed: false },
  { day: "Sunday", hours: "By Appointment", closed: false },
];

function AmbientBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {[...Array(8)].map((_, i) => (
        <motion.div key={i} className="absolute"
          style={{ left: `${10 + i * 11}%`, top: `${15 + (i % 3) * 28}%`, color: "rgba(201,168,76,0.08)", fontSize: 14 + (i % 3) * 4 }}
          animate={{ opacity: [0.05, 0.2, 0.05], scale: [0.7, 1.3, 0.7], rotate: [0, 90, 180] }}
          transition={{ duration: 5 + i * 0.7, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
        >✦</motion.div>
      ))}
    </div>
  );
}

function InfoCards() {
  const cards = [
    { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, label: "Address", value: "2281 E University Dr\nSuite 101\nProsper, TX 75078", href: "https://maps.google.com/?q=2281+E+University+Dr+Suite+101+Prosper+TX+75078", color: "rgba(201,168,76,0.8)" },
    { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, label: "Phone", value: "+1 (972) 571-7787", href: "tel:+19725717787", color: "rgba(180,215,255,0.75)" },
    { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>, label: "Website", value: "matthewdillard.com", href: "https://matthewdillard.com", color: "rgba(230,185,215,0.75)" },
    { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, label: "Booking", value: "Book online 24/7", href: "https://matthewdillard.com", color: "rgba(180,220,190,0.75)" },
  ];
  return (
    <section className="py-16 section-light">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
          <div className="h-px w-7" style={{ background: "hsl(43,65%,52%)" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.42em", textTransform: "uppercase", color: "hsl(43,60%,42%)" }}>Find Us</span>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((info, i) => (
            <motion.a key={info.label} href={info.href}
              target={info.href.startsWith("http") ? "_blank" : undefined}
              rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group p-7 flex flex-col gap-4 relative overflow-hidden card-light"
              whileHover={{ y: -5, boxShadow: "0 8px 40px rgba(22,15,8,0.1)", transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: `linear-gradient(90deg, ${info.color}, transparent)` }} aria-hidden="true" />
              <div className="relative z-10">
                <motion.div className="w-10 h-10 flex items-center justify-center mb-4"
                  style={{ border: "1px solid rgba(22,15,8,0.12)", color: "hsl(43,60%,42%)", background: "rgba(201,168,76,0.07)" }}>
                  {info.icon}
                </motion.div>
                <p style={{ fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(22,15,8,0.38)", marginBottom: 4 }}>{info.label}</p>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "hsl(22,20%,16%)" }}>{info.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactMain() {
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4500);
    setFormData({ name: "", email: "", service: "", message: "" });
  };

  return (
    <section className="py-24 md:py-32 section-divider relative overflow-hidden">
      <AmbientBg />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left: map + hours */}
          <motion.div className="space-y-6"
            initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <div>
              <div className="flex items-center gap-4 mb-5">
                <motion.span className="h-px" initial={{ width: 0 }} whileInView={{ width: 32 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }} style={{ background: "hsl(43,65%,52%)" }} />
                <span className="text-[9px] tracking-[0.4em] uppercase text-yellow-400/60">Find Us</span>
              </div>
              <div className="overflow-hidden mb-4">
                <motion.h2 className="text-3xl md:text-4xl font-serif text-white/88"
                  initial={{ y: "110%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                  Visit the <span className="text-gold-gradient italic">Studio</span>
                </motion.h2>
              </div>
              <motion.p className="text-sm text-white/40 leading-relaxed"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
                Located in the heart of Prosper, TX — inside a serene, private studio designed for an unhurried luxury experience.
              </motion.p>
            </div>

            {/* Map */}
            <motion.div className="overflow-hidden relative h-52"
              initial={{ opacity: 0, scaleX: 0.8, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, scaleX: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              style={{ border: "1px solid rgba(201,168,76,0.12)" }}>
              <motion.div className="absolute inset-x-0 top-0 h-px pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)" }}
                animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity }} aria-hidden="true" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3342.5!2d-96.8!3d33.24!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c3af8b3a48a7d%3A0x1!2s2281+E+University+Dr+Suite+101%2C+Prosper%2C+TX+75078!5e0!3m2!1sen!2sus!4v1"
                width="100%" height="100%"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.8) brightness(0.75)" }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Matthew Dillard Hair Salons Location" />
            </motion.div>

            {/* Hours */}
            <motion.div className="p-7 relative overflow-hidden"
              style={{ background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))", border: "1px solid rgba(201,168,76,0.08)" }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}>
              <p className="text-[9px] tracking-[0.35em] uppercase text-yellow-400/60 mb-5">Studio Hours</p>
              <div className="space-y-3">
                {HOURS.map((h, i) => (
                  <motion.div key={h.day}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                    className="flex items-center justify-between gap-4">
                    <span className="text-xs text-white/40">{h.day}</span>
                    <motion.span className="text-xs font-medium"
                      style={{ color: h.closed ? "rgba(255,255,255,0.2)" : "hsl(43,65%,52%)" }}
                      animate={!h.closed ? { opacity: [0.7, 1, 0.7] } : {}}
                      transition={{ duration: 3 + i, repeat: Infinity }}>
                      {h.hours}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}>
            <div className="p-9 md:p-11 relative overflow-hidden"
              style={{ background: "linear-gradient(145deg, hsl(22,16%,9%), hsl(22,14%,7%))", border: "1px solid rgba(201,168,76,0.10)" }}>
              <div className="absolute top-0 right-0 pointer-events-none opacity-30" aria-hidden="true">
                <div className="w-10 h-px" style={{ background: "hsl(43,65%,52%)" }} />
                <div className="w-px h-10 ml-auto" style={{ background: "hsl(43,65%,52%)" }} />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <motion.span className="h-px" initial={{ width: 0 }} whileInView={{ width: 32 }} viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }} style={{ background: "hsl(43,65%,52%)" }} />
                <span className="text-[9px] tracking-[0.4em] uppercase text-yellow-400/60">Get in Touch</span>
              </div>
              <div className="overflow-hidden">
                <motion.h2 className="text-2xl font-serif text-white/88 mb-1"
                  initial={{ y: "110%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                  Send a Message
                </motion.h2>
              </div>
              <motion.p className="text-xs text-white/30 mb-8 tracking-wide"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                We respond within 24 hours.
              </motion.p>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-5 py-12 text-center">
                  <motion.div className="w-14 h-14 flex items-center justify-center text-yellow-400"
                    style={{ border: "1px solid rgba(201,168,76,0.4)" }}
                    animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 0px rgba(201,168,76,0)", "0 0 20px rgba(201,168,76,0.4)", "0 0 0px rgba(201,168,76,0)"] }}
                    transition={{ duration: 2, repeat: Infinity }}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <p className="text-sm text-white/55 font-serif italic">Message received. We'll be in touch soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                  {[
                    { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                    { key: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                  ].map((field, fi) => (
                    <motion.div key={field.key} className="flex flex-col gap-1.5"
                      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + fi * 0.1, ease: [0.16, 1, 0.3, 1] }}>
                      <label className="text-[9px] tracking-[0.3em] uppercase text-white/30">{field.label}</label>
                      <motion.input type={field.type} placeholder={field.placeholder}
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) => setFormData((f) => ({ ...f, [field.key]: e.target.value }))}
                        className="w-full px-4 py-3 text-sm text-white/70 placeholder:text-white/20 outline-none transition-all duration-300"
                        style={{ background: "hsl(22,16%,6%)", border: "1px solid rgba(201,168,76,0.08)" }}
                        whileFocus={{ borderColor: "rgba(201,168,76,0.4)", boxShadow: "0 0 0 3px rgba(201,168,76,0.08)" }}
                        required />
                    </motion.div>
                  ))}

                  <motion.div className="flex flex-col gap-1.5"
                    initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}>
                    <label className="text-[9px] tracking-[0.3em] uppercase text-white/30">Service Interest</label>
                    <select value={formData.service} onChange={(e) => setFormData((f) => ({ ...f, service: e.target.value }))}
                      className="w-full px-4 py-3 text-sm outline-none"
                      style={{ background: "hsl(22,16%,6%)", border: "1px solid rgba(201,168,76,0.08)", color: formData.service ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)" }}>
                      <option value="" style={{ background: "hsl(22,16%,9%)" }}>Select a service</option>
                      {["Hair Coloring", "Balayage", "Blonde Specialist", "Luxury Haircuts", "Hair Styling", "Hair Treatments", "Bridal Styling", "Extensions"].map((s) => (
                        <option key={s} value={s} style={{ background: "hsl(22,16%,9%)" }}>{s}</option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div className="flex flex-col gap-1.5"
                    initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}>
                    <label className="text-[9px] tracking-[0.3em] uppercase text-white/30">Message</label>
                    <motion.textarea placeholder="Tell us about your hair goals..."
                      value={formData.message}
                      onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 text-sm text-white/70 placeholder:text-white/20 outline-none resize-none"
                      style={{ background: "hsl(22,16%,6%)", border: "1px solid rgba(201,168,76,0.08)" }}
                      whileFocus={{ borderColor: "rgba(201,168,76,0.4)", boxShadow: "0 0 0 3px rgba(201,168,76,0.08)" }}
                    />
                  </motion.div>

                  <motion.button type="submit"
                    className="w-full py-4 text-xs tracking-[0.28em] uppercase text-black font-medium mt-2 relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, hsl(43,72%,54%), hsl(35,78%,47%))", boxShadow: "0 4px 20px rgba(201,168,76,0.3)" }}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 6px 28px rgba(201,168,76,0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    animate={{ boxShadow: ["0 4px 20px rgba(201,168,76,0.25)", "0 4px 32px rgba(201,168,76,0.45)", "0 4px 20px rgba(201,168,76,0.25)"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" } as never}
                  >Send Message</motion.button>
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
      <PageHero title="Visit &" titleGold="Connect" subtitle="Located in Prosper, TX — luxury hair artistry awaits." breadcrumb="Contact" />
      <InfoCards />
      <ContactMain />
    </Layout>
  );
}

import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  titleGold?: string;
  subtitle?: string;
  breadcrumb?: string;
}

function FloatingParticles() {
  const particles = [
    { x: "6%", y: "25%", s: 3, d: 0, dur: 7, hue: 43 },
    { x: "14%", y: "70%", s: 2, d: 1.2, dur: 8, hue: 210 },
    { x: "22%", y: "18%", s: 4, d: 0.5, dur: 6, hue: 43 },
    { x: "35%", y: "82%", s: 2, d: 2.1, dur: 9, hue: 320 },
    { x: "48%", y: "14%", s: 3, d: 0.3, dur: 7, hue: 43 },
    { x: "55%", y: "75%", s: 2, d: 1.8, dur: 8, hue: 260 },
    { x: "63%", y: "30%", s: 4, d: 0.7, dur: 6, hue: 43 },
    { x: "74%", y: "60%", s: 2, d: 2.4, dur: 7, hue: 43 },
    { x: "82%", y: "22%", s: 3, d: 0.9, dur: 9, hue: 210 },
    { x: "91%", y: "78%", s: 2, d: 1.5, dur: 8, hue: 43 },
    { x: "10%", y: "45%", s: 2, d: 3.0, dur: 7, hue: 320 },
    { x: "43%", y: "55%", s: 3, d: 1.1, dur: 8, hue: 43 },
    { x: "68%", y: "88%", s: 2, d: 2.6, dur: 6, hue: 260 },
    { x: "88%", y: "40%", s: 4, d: 0.4, dur: 9, hue: 43 },
    { x: "28%", y: "50%", s: 2, d: 1.7, dur: 7, hue: 43 },
    { x: "78%", y: "12%", s: 3, d: 2.9, dur: 8, hue: 210 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ left: p.x, top: p.y, width: p.s, height: p.s, background: `hsl(${p.hue},80%,72%)`, boxShadow: `0 0 ${p.s * 4}px ${p.s + 1}px hsla(${p.hue},80%,72%,0.5)` }}
          animate={{ y: [0, -30, 0], opacity: [0.15, 0.6, 0.15], scale: [0.7, 1.3, 0.7] }}
          transition={{ duration: p.dur, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* Larger sparkle icons */}
      {[
        { x: "8%", y: "55%", d: 0.2, hue: 43 },
        { x: "25%", y: "28%", d: 1.4, hue: 43 },
        { x: "50%", y: "85%", d: 2.2, hue: 43 },
        { x: "72%", y: "18%", d: 0.8, hue: 43 },
        { x: "90%", y: "62%", d: 1.9, hue: 43 },
        { x: "40%", y: "40%", d: 3.1, hue: 43 },
        { x: "60%", y: "65%", d: 0.6, hue: 43 },
      ].map((s, i) => (
        <motion.div key={`sp-${i}`} className="absolute pointer-events-none"
          style={{ left: s.x, top: s.y, width: 14, color: "rgba(201,168,76,0.28)" }}
          animate={{ opacity: [0.1, 0.55, 0.1], scale: [0.5, 1.2, 0.5], rotate: [0, 120, 240] }}
          transition={{ duration: 5 + i * 0.5, delay: s.d, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 40 40" fill="currentColor">
            <path d="M20 2L21.5 17L36 18L21.5 20L20 38L18.5 20L4 18L18.5 17Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export default function PageHero({ title, titleGold, subtitle, breadcrumb }: PageHeroProps) {
  const words = title.split(" ");
  const goldWords = titleGold ? titleGold.split(" ") : [];

  return (
    <section className="relative min-h-[72vh] flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse 120% 90% at 50% -10%, hsl(30,22%,10%) 0%, hsl(22,18%,4%) 55%, hsl(20,16%,3%) 100%)", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>

      {/* Deep background gradient orbs */}
      <motion.div className="absolute pointer-events-none"
        style={{ width: 700, height: 400, top: "-5%", left: "50%", translateX: "-50%", background: "radial-gradient(ellipse, rgba(201,168,76,0.11) 0%, rgba(180,140,80,0.05) 40%, transparent 70%)" }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true" />
      <motion.div className="absolute pointer-events-none"
        style={{ width: 500, height: 300, bottom: "10%", left: "20%", background: "radial-gradient(ellipse, rgba(180,210,255,0.06) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.12, 1], x: [0, 20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        aria-hidden="true" />
      <motion.div className="absolute pointer-events-none"
        style={{ width: 400, height: 300, bottom: "5%", right: "10%", background: "radial-gradient(ellipse, rgba(230,185,215,0.05) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.15, 1], y: [0, -15, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        aria-hidden="true" />

      {/* Animated top border sweep */}
      <motion.div className="absolute top-0 left-0 right-0 h-px"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5) 30%, rgba(201,168,76,0.8) 50%, rgba(201,168,76,0.5) 70%, transparent)", transformOrigin: "left" }}
        aria-hidden="true" />

      {/* Vertical beam from top */}
      <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-px pointer-events-none"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.3 }}
        style={{ height: 90, background: "linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)", transformOrigin: "top" }}
        aria-hidden="true" />

      {/* Vertical hair strands */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[12, 30, 50, 70, 88].map((x, i) => (
          <motion.div key={i} className="absolute top-0 bottom-0"
            style={{ left: `${x}%`, width: 1, opacity: 0.035 }}
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.4, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
            <div className="w-full h-full" style={{ background: "linear-gradient(to bottom, rgba(201,168,76,1), transparent 70%)" }} />
          </motion.div>
        ))}
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }}
        aria-hidden="true" />

      <FloatingParticles />

      {/* Corner decorations */}
      {[
        { pos: "top-24 left-8", ox: [0, 1], oy: [1, 0] },
        { pos: "top-24 right-8", ox: [1, 0], oy: [1, 0] },
        { pos: "bottom-10 left-8", ox: [0, 1], oy: [0, 1] },
        { pos: "bottom-10 right-8", ox: [1, 0], oy: [0, 1] },
      ].map((c, i) => (
        <motion.div key={i} className={`absolute ${c.pos} pointer-events-none`}
          initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ delay: 0.8 + i * 0.1 }}
          aria-hidden="true">
          <div style={{ width: 24, height: 1, background: "hsl(43,65%,52%)", marginLeft: c.ox[0] ? "auto" : 0, marginBottom: 2 }} />
          <div style={{ width: 1, height: 24, background: "hsl(43,65%,52%)", marginLeft: c.ox[0] ? "auto" : 0 }} />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-7 px-6 py-16 pt-32">
        {breadcrumb && (
          <motion.div className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}>
            <motion.span className="h-px"
              initial={{ width: 0 }} animate={{ width: 40 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }} />
            <span style={{ fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(201,168,76,0.65)" }}>{breadcrumb}</span>
            <motion.span className="h-px"
              initial={{ width: 0 }} animate={{ width: 40 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} />
          </motion.div>
        )}

        {/* Title — word by word clip reveal */}
        <h1 className="font-serif leading-[1.08] max-w-4xl">
          <div className="flex flex-wrap justify-center gap-x-[0.22em]">
            {words.map((word, wi) => (
              <div key={`t-${wi}`} className="overflow-hidden">
                <motion.span className="block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.0, delay: 0.2 + wi * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontSize: "clamp(42px, 6.5vw, 80px)", color: "rgba(255,255,255,0.88)", display: "inline-block" }}
                >{word}</motion.span>
              </div>
            ))}
            {goldWords.map((word, wi) => (
              <div key={`g-${wi}`} className="overflow-hidden">
                <motion.span className="block text-gold-gradient italic"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.0, delay: 0.2 + (words.length + wi) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontSize: "clamp(42px, 6.5vw, 80px)", display: "inline-block" }}
                >{word}</motion.span>
              </div>
            ))}
          </div>
        </h1>

        {subtitle && (
          <motion.p className="text-sm tracking-[0.06em] max-w-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.38)" }}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.5 + (words.length + goldWords.length) * 0.08 }}
          >{subtitle}</motion.p>
        )}

        {/* Animated gold divider */}
        <motion.div className="flex items-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}>
          <motion.span className="h-px"
            initial={{ width: 0 }} animate={{ width: 60 }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }} />
          <motion.span style={{ color: "rgba(201,168,76,0.5)", fontSize: 8 }}
            animate={{ rotate: [0, 180, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>✦</motion.span>
          <motion.span className="h-px"
            initial={{ width: 0 }} animate={{ width: 60 }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(20,14,10,0.4))" }} aria-hidden="true" />
    </section>
  );
}

import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  titleGold?: string;
  subtitle?: string;
  breadcrumb?: string;
}

const SPARKLE_POSITIONS = [
  { x: "8%", y: "30%", delay: 0 }, { x: "18%", y: "65%", delay: 1.2 },
  { x: "32%", y: "20%", delay: 0.6 }, { x: "48%", y: "78%", delay: 2.0 },
  { x: "62%", y: "25%", delay: 0.3 }, { x: "75%", y: "60%", delay: 1.5 },
  { x: "88%", y: "38%", delay: 0.9 }, { x: "92%", y: "72%", delay: 1.8 },
  { x: "24%", y: "85%", delay: 2.4 }, { x: "70%", y: "85%", delay: 0.5 },
];

export default function PageHero({ title, titleGold, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section
      className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center"
      style={{
        background: "radial-gradient(ellipse 100% 80% at 50% 0%, hsl(28,18%,9%) 0%, hsl(22,18%,4%) 70%)",
        borderBottom: "1px solid rgba(201,168,76,0.08)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.09) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)" }}
        aria-hidden="true"
      />

      {/* Vertical center beam */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)" }}
        aria-hidden="true"
      />

      {/* Floating sparkles */}
      {SPARKLE_POSITIONS.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: pos.x, top: pos.y, color: "rgba(201,168,76,0.3)", width: 14 }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scale: [0.6, 1.3, 0.6],
            rotate: [0, 90, 180],
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4 + i * 0.3,
            delay: pos.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 40 40" fill="currentColor">
            <path d="M20 2 L21.5 17 L36 18 L21.5 20 L20 38 L18.5 20 L4 18 L18.5 17 Z" />
          </svg>
        </motion.div>
      ))}

      {/* Decorative hair strands */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[15, 35, 65, 85].map((x, i) => (
          <motion.div
            key={i}
            className="absolute top-0 bottom-0"
            style={{ left: `${x}%`, width: 1, opacity: 0.04 }}
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full h-full" style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.8), transparent 60%)" }} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {breadcrumb && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <motion.span
              className="w-8 h-px"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ background: "hsl(43,65%,52%)", transformOrigin: "right" }}
            />
            <span className="text-[9px] tracking-[0.45em] uppercase text-yellow-400/60">{breadcrumb}</span>
            <motion.span
              className="w-8 h-px"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ background: "hsl(43,65%,52%)", transformOrigin: "left" }}
            />
          </motion.div>
        )}

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.05]"
          >
            <span className="text-white/85">{title}</span>
            {titleGold && (
              <span className="text-gold-gradient italic"> {titleGold}</span>
            )}
          </motion.h1>
        </div>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm text-white/38 tracking-[0.1em] max-w-md leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="w-20 h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%), transparent)" }}
        />
      </div>

      {/* Corner accents — animated */}
      {[
        { pos: "bottom-8 left-8", origin: "left" },
        { pos: "bottom-8 right-8", origin: "right" },
      ].map((c, i) => (
        <motion.div
          key={i}
          className={`absolute ${c.pos} opacity-25`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 0.6 + i * 0.1 }}
          aria-hidden="true"
        >
          <div className={`w-8 h-px mb-0.5 ${i === 1 ? "ml-auto" : ""}`} style={{ background: "hsl(43,65%,52%)" }} />
          <div className={`w-px h-8 ${i === 1 ? "ml-auto" : ""}`} style={{ background: "hsl(43,65%,52%)" }} />
        </motion.div>
      ))}
    </section>
  );
}

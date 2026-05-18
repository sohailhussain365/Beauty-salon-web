import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  titleGold?: string;
  subtitle?: string;
  breadcrumb?: string;
}

export default function PageHero({ title, titleGold, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section
      className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden flex flex-col items-center justify-center text-center"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(28,18%,8%) 0%, hsl(22,18%,4%) 70%)",
        borderBottom: "1px solid rgba(201,168,76,0.08)",
      }}
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Horizontal top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)" }}
        aria-hidden="true"
      />

      {/* Vertical center line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.3), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-5">
        {breadcrumb && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="w-8 h-px" style={{ background: "hsl(43,65%,52%)" }} />
            <span className="text-[9px] tracking-[0.45em] uppercase text-yellow-400/60">{breadcrumb}</span>
            <span className="w-8 h-px" style={{ background: "hsl(43,65%,52%)" }} />
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.05]"
        >
          <span className="text-white/85">{title}</span>
          {titleGold && (
            <span className="text-gold-gradient italic"> {titleGold}</span>
          )}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-sm text-white/40 tracking-[0.12em] max-w-md"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="w-16 h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%), transparent)" }}
        />
      </div>

      {/* Corner accents */}
      <div className="absolute bottom-8 left-8 opacity-20" aria-hidden="true">
        <div className="w-6 h-px mb-0.5" style={{ background: "hsl(43,65%,52%)" }} />
        <div className="w-px h-6" style={{ background: "hsl(43,65%,52%)" }} />
      </div>
      <div className="absolute bottom-8 right-8 opacity-20" aria-hidden="true">
        <div className="w-6 h-px mb-0.5 ml-auto" style={{ background: "hsl(43,65%,52%)" }} />
        <div className="w-px h-6 ml-auto" style={{ background: "hsl(43,65%,52%)" }} />
      </div>
    </section>
  );
}

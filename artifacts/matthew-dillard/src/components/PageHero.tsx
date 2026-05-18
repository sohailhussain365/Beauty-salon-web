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
      className="relative min-h-[72vh] flex flex-col justify-end overflow-hidden"
      style={{ background: "hsl(22,18%,4%)" }}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden="true"
      />

      {/* Animated top border sweep */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.4) 20%, rgba(201,168,76,0.85) 50%, rgba(201,168,76,0.4) 80%, transparent 100%)",
          transformOrigin: "left",
        }}
        aria-hidden="true"
      />

      {/* Left vertical beam from top */}
      <motion.div
        className="absolute left-8 top-0 w-px pointer-events-none"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{
          height: 120,
          background: "linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)",
          transformOrigin: "top",
        }}
        aria-hidden="true"
      />

      {/* Right decorative arch — abstract, editorial */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-[38%] pointer-events-none"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        aria-hidden="true"
      >
        {/* Arch silhouette */}
        <div
          className="absolute"
          style={{
            right: "clamp(48px, 8vw, 120px)",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(160px, 18vw, 240px)",
            height: "clamp(260px, 58vh, 420px)",
            borderRadius: "9999px 9999px 10px 10px",
            border: "1px solid rgba(201,168,76,0.10)",
            background:
              "linear-gradient(to bottom, rgba(201,168,76,0.05) 0%, rgba(201,168,76,0.02) 50%, transparent 100%)",
          }}
        />
        {/* Smaller inner arch */}
        <div
          className="absolute"
          style={{
            right: "clamp(72px, 12vw, 160px)",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(90px, 10vw, 130px)",
            height: "clamp(160px, 36vh, 260px)",
            borderRadius: "9999px 9999px 8px 8px",
            border: "1px solid rgba(201,168,76,0.07)",
          }}
        />
        {/* Floating ✦ sparkles */}
        {[
          { right: "14%", top: "18%", d: 0, dur: 5 },
          { right: "32%", top: "72%", d: 1.2, dur: 6.5 },
          { right: "5%", top: "55%", d: 0.6, dur: 7 },
          { right: "22%", top: "38%", d: 2, dur: 5.5 },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ right: s.right, top: s.top, color: "rgba(201,168,76,0.22)", fontSize: 10 + i * 2 }}
            animate={{ opacity: [0.1, 0.5, 0.1], scale: [0.7, 1.2, 0.7], rotate: [0, 90, 180] }}
            transition={{ duration: s.dur, delay: s.d, repeat: Infinity, ease: "easeInOut" }}
          >
            ✦
          </motion.div>
        ))}
        {/* Horizontal lines */}
        {[30, 55, 78].map((top, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ right: 0, top: `${top}%`, height: 1 }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: `${50 - i * 10}%`, opacity: 0.07 + i * 0.02 }}
            transition={{ duration: 1.2, delay: 0.5 + i * 0.15 }}
          >
            <div className="w-full h-full" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5))" }} />
          </motion.div>
        ))}
      </motion.div>

      {/* Main content — left-aligned, sits at bottom */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 pb-14 pt-36 w-full">

        {/* Eyebrow breadcrumb */}
        {breadcrumb && (
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <motion.span
              className="h-px"
              initial={{ width: 0 }}
              animate={{ width: 28 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ background: "hsl(43,65%,52%)" }}
            />
            <span style={{ fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)" }}>
              {breadcrumb}
            </span>
          </motion.div>
        )}

        {/* Massive Bebas Neue title */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            style={{
              fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(60px, 10.5vw, 148px)",
              letterSpacing: "0.01em",
              lineHeight: 0.9,
              color: "rgba(255,255,255,0.88)",
            }}
            initial={{ y: "108%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {title}{" "}
            {titleGold && (
              <span style={{ color: "hsl(43,65%,52%)" }}>
                {titleGold}
              </span>
            )}
          </motion.h1>
        </div>

        {/* Gold rule + sparkle */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="h-px"
            initial={{ width: 0 }}
            animate={{ width: "min(280px, 38vw)" }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), rgba(201,168,76,0.15))" }}
          />
          <motion.span
            style={{ color: "rgba(201,168,76,0.45)", fontSize: 8 }}
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            ✦
          </motion.span>
        </motion.div>

        {/* Playfair italic subtitle */}
        {subtitle && (
          <motion.p
            className="font-serif italic"
            style={{ fontSize: "clamp(14px, 1.35vw, 18px)", color: "rgba(255,255,255,0.38)", maxWidth: 480, lineHeight: 1.7 }}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Bottom fade to site content */}
      <div
        className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(22,18%,5%))" }}
        aria-hidden="true"
      />
    </section>
  );
}

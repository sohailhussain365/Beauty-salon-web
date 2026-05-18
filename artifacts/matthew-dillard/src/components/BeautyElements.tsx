import { motion } from "framer-motion";

function ScissorsSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 110" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="28" cy="24" r="16" strokeWidth="1.8" />
      <circle cx="28" cy="86" r="16" strokeWidth="1.8" />
      <line x1="42" y1="29" x2="90" y2="76" strokeWidth="1.8" />
      <line x1="42" y1="81" x2="90" y2="34" strokeWidth="1.8" />
      <circle cx="67" cy="55" r="5" fill="currentColor" strokeWidth="0" />
      <path d="M18 24 Q28 24 36 20" strokeWidth="1" opacity="0.4" />
      <path d="M18 86 Q28 86 36 90" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function CombSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 120" fill="none" stroke="currentColor" strokeLinecap="round">
      <rect x="4" y="4" width="52" height="20" rx="5" strokeWidth="1.8" />
      {[0, 7, 14, 21, 28, 35, 42].map((x, i) => (
        <line key={i} x1={10 + x} y1="24" x2={10 + x} y2={60 + (i % 2) * 12} strokeWidth="1.6" />
      ))}
    </svg>
  );
}

function MirrorSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 110" fill="none" stroke="currentColor" strokeLinecap="round">
      <ellipse cx="40" cy="40" rx="34" ry="36" strokeWidth="1.8" />
      <ellipse cx="40" cy="40" rx="26" ry="28" strokeWidth="1" opacity="0.3" />
      <rect x="33" y="76" width="14" height="22" rx="3" strokeWidth="1.8" />
      <line x1="33" y1="76" x2="27" y2="98" strokeWidth="1.5" />
      <line x1="47" y1="76" x2="53" y2="98" strokeWidth="1.5" />
    </svg>
  );
}

const HAIR_PATHS = [
  { d: "M -100 380 C 150 280 350 180 600 300 C 850 420 1050 220 1400 340", opacity: 0.05, width: 2, delay: 0, duration: 2.8 },
  { d: "M -100 180 C 200 80 500 380 780 200 C 1000 80 1150 300 1400 180", opacity: 0.04, width: 1.5, delay: 0.4, duration: 3.2 },
  { d: "M -100 520 C 300 420 600 600 900 420 C 1100 320 1250 480 1400 420", opacity: 0.03, width: 1.2, delay: 0.8, duration: 3.8 },
  { d: "M 0 650 C 250 550 550 700 800 580 C 1050 460 1200 600 1400 560", opacity: 0.025, width: 1, delay: 1.2, duration: 4.0 },
];

export default function BeautyElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Animated hair strand paths — subtle white */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice">
        {HAIR_PATHS.map((p, i) => (
          <motion.path
            key={i}
            d={p.d}
            stroke={`rgba(255,255,255,${p.opacity})`}
            strokeWidth={p.width}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
          />
        ))}
      </svg>

      {/* Scissors — top right, very subtle */}
      <motion.div
        className="absolute"
        style={{ right: "8%", top: "14%", color: "rgba(255,255,255,0.10)", width: 80 }}
        animate={{ y: [0, -18, 0], rotate: [-6, 4, -6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <ScissorsSVG className="w-full h-full" />
      </motion.div>

      {/* Comb — left side */}
      <motion.div
        className="absolute"
        style={{ left: "4%", top: "42%", color: "rgba(255,255,255,0.08)", width: 36 }}
        animate={{ y: [0, 14, 0], x: [0, 4, 0], rotate: [5, -3, 5] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <CombSVG className="w-full h-auto" />
      </motion.div>

      {/* Mirror — bottom right */}
      <motion.div
        className="absolute"
        style={{ right: "14%", bottom: "12%", color: "rgba(255,255,255,0.07)", width: 55 }}
        animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <MirrorSVG className="w-full h-auto" />
      </motion.div>

      {/* Thin decorative ring */}
      <motion.div
        className="absolute"
        style={{ right: "5%", top: "55%", width: 70, height: 70, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute"
        style={{ left: "2%", top: "22%", width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

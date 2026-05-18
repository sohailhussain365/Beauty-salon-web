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
        <line
          key={i}
          x1={10 + x}
          y1="24"
          x2={10 + x}
          y2={60 + (i % 2) * 12}
          strokeWidth="1.6"
        />
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

function SparkleStarSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="currentColor">
      <path d="M20 2 L21.5 17 L36 18 L21.5 20 L20 38 L18.5 20 L4 18 L18.5 17 Z" />
    </svg>
  );
}

function DropletSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 30 40" fill="currentColor">
      <path d="M15 2 C15 2, 2 18, 2 26 A13 13 0 0 0 28 26 C28 18 15 2 15 2 Z" />
    </svg>
  );
}

const HAIR_PATHS = [
  {
    d: "M -100 380 C 150 280 350 180 600 300 C 850 420 1050 220 1400 340",
    opacity: 0.08, width: 2.5, delay: 0, duration: 2.8,
  },
  {
    d: "M -100 180 C 200 80 500 380 780 200 C 1000 80 1150 300 1400 180",
    opacity: 0.06, width: 1.8, delay: 0.4, duration: 3.2,
  },
  {
    d: "M -100 520 C 300 420 600 600 900 420 C 1100 320 1250 480 1400 420",
    opacity: 0.05, width: 1.5, delay: 0.8, duration: 3.8,
  },
  {
    d: "M 0 650 C 250 550 550 700 800 580 C 1050 460 1200 600 1400 560",
    opacity: 0.04, width: 1.2, delay: 1.2, duration: 4.0,
  },
  {
    d: "M 200 -50 C 250 200 180 400 300 600 C 420 800 380 950 350 1100",
    opacity: 0.05, width: 1.5, delay: 0.6, duration: 3.5,
  },
  {
    d: "M 900 -50 C 950 200 880 420 1000 600 C 1120 780 1080 950 1050 1100",
    opacity: 0.04, width: 1.2, delay: 1.0, duration: 4.2,
  },
];

const COLOR_ORBS = [
  { x: "82%", y: "20%", color: "rgba(201,168,76,0.18)", size: 60, delay: 0 },
  { x: "88%", y: "55%", color: "rgba(180,120,60,0.14)", size: 40, delay: 1 },
  { x: "10%", y: "75%", color: "rgba(220,200,160,0.12)", size: 35, delay: 0.5 },
  { x: "6%", y: "30%", color: "rgba(160,100,80,0.12)", size: 28, delay: 1.5 },
  { x: "50%", y: "88%", color: "rgba(201,168,76,0.10)", size: 22, delay: 2 },
];

const SPARKLES = [
  { x: "75%", y: "12%", size: 14, delay: 0.3, duration: 2.5 },
  { x: "90%", y: "40%", size: 10, delay: 1.1, duration: 3.0 },
  { x: "15%", y: "18%", size: 12, delay: 0.7, duration: 2.8 },
  { x: "8%", y: "60%", size: 8, delay: 1.8, duration: 3.5 },
  { x: "60%", y: "85%", size: 10, delay: 0.5, duration: 2.2 },
  { x: "35%", y: "92%", size: 8, delay: 2.2, duration: 3.8 },
  { x: "92%", y: "75%", size: 12, delay: 0.9, duration: 2.6 },
];

export default function BeautyElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Animated hair strand paths */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1400 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {HAIR_PATHS.map((p, i) => (
          <motion.path
            key={i}
            d={p.d}
            stroke={`rgba(201,168,76,${p.opacity})`}
            strokeWidth={p.width}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
          />
        ))}
      </svg>

      {/* Floating color orbs */}
      {COLOR_ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(ellipse, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -12, 0, 8, 0],
            x: [0, 6, 0, -6, 0],
            scale: [1, 1.12, 1, 0.95, 1],
          }}
          transition={{
            duration: 6 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {/* Sparkle stars */}
      {SPARKLES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: s.x, top: s.y, width: s.size, height: s.size, color: "rgba(201,168,76,0.5)" }}
          animate={{
            opacity: [0.1, 0.7, 0.1],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        >
          <SparkleStarSVG className="w-full h-full" />
        </motion.div>
      ))}

      {/* Scissors — top right, large, floating */}
      <motion.div
        className="absolute"
        style={{ right: "8%", top: "14%", color: "rgba(201,168,76,0.22)", width: 90 }}
        animate={{
          y: [0, -20, 0],
          rotate: [-8, 4, -8],
          filter: [
            "drop-shadow(0 0 0px rgba(201,168,76,0))",
            "drop-shadow(0 0 12px rgba(201,168,76,0.3))",
            "drop-shadow(0 0 0px rgba(201,168,76,0))",
          ],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <ScissorsSVG className="w-full h-full" />
      </motion.div>

      {/* Comb — left side, mid height */}
      <motion.div
        className="absolute"
        style={{ left: "4%", top: "42%", color: "rgba(201,168,76,0.18)", width: 40 }}
        animate={{
          y: [0, 14, 0],
          x: [0, 4, 0],
          rotate: [5, -3, 5],
        }}
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
        style={{ right: "14%", bottom: "12%", color: "rgba(201,168,76,0.16)", width: 60 }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 6, 0],
          filter: [
            "drop-shadow(0 0 0px rgba(201,168,76,0))",
            "drop-shadow(0 0 8px rgba(201,168,76,0.2))",
            "drop-shadow(0 0 0px rgba(201,168,76,0))",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <MirrorSVG className="w-full h-auto" />
      </motion.div>

      {/* Small droplets */}
      {[
        { x: "20%", y: "12%", size: 16, c: "rgba(201,168,76,0.3)", d: 0 },
        { x: "78%", y: "70%", size: 12, c: "rgba(180,130,60,0.25)", d: 1 },
        { x: "45%", y: "8%", size: 10, c: "rgba(201,168,76,0.2)", d: 1.5 },
      ].map((drop, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: drop.x, top: drop.y, width: drop.size, color: drop.c }}
          animate={{ y: [0, 10, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: drop.d }}
        >
          <DropletSVG className="w-full h-auto" />
        </motion.div>
      ))}

      {/* Thin decorative ring — orbiting slowly */}
      <motion.div
        className="absolute"
        style={{
          right: "5%",
          top: "55%",
          width: 80,
          height: 80,
          borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.12)",
        }}
        animate={{ rotate: 360, scale: [1, 1.08, 1] }}
        transition={{ rotate: { duration: 18, repeat: Infinity, ease: "linear" }, scale: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
      />
      <motion.div
        className="absolute"
        style={{
          left: "2%",
          top: "22%",
          width: 50,
          height: 50,
          borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.10)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

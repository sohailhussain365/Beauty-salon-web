import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    updatePosition(e.clientX);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    updatePosition(e.clientX);
  };
  const onMouseUp = () => setDragging(false);
  const onTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    updatePosition(e.touches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    updatePosition(e.touches[0].clientX);
  };
  const onTouchEnd = () => setDragging(false);

  const BEFORE_IMG = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80";
  const AFTER_IMG  = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80";

  return (
    <section
      id="transformation"
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden section-divider"
      data-testid="before-after-section"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="block w-12 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }} />
            <span className="text-[9px] tracking-[0.4em] uppercase text-yellow-400/60">Transformation</span>
            <span className="block w-12 h-px" style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white/90">
            Before <span className="text-gold-gradient italic">&amp;</span> After
          </h2>
          <p className="mt-4 text-sm text-white/40 tracking-wide max-w-md mx-auto">
            Drag the slider to witness the transformation firsthand.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          ref={containerRef}
          className="relative h-[380px] md:h-[480px] overflow-hidden select-none"
          style={{
            cursor: dragging ? "ew-resize" : "col-resize",
            border: "1px solid rgba(201,168,76,0.1)",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          data-testid="before-after-slider"
        >
          {/* After (full — photo) */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={AFTER_IMG}
              alt="After transformation"
              className="absolute inset-0 w-full h-full object-cover object-center"
              draggable={false}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }} aria-hidden="true" />
            <div className="absolute inset-0" style={{ background: "rgba(201,168,76,0.06)" }} aria-hidden="true" />
            <div className="absolute bottom-6 right-6 text-right">
              <span className="block text-[9px] tracking-[0.35em] uppercase text-yellow-400/80 mb-1">After</span>
              <span className="block text-lg font-serif text-white/90">Transformed</span>
            </div>
          </div>

          {/* Before (clipped — photo) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <div
              className="absolute inset-0"
              style={{ width: `${100 * (100 / Math.max(position, 0.1))}%`, maxWidth: "none" }}
            >
              <img
                src={BEFORE_IMG}
                alt="Before transformation"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ minWidth: `${100 * (100 / Math.max(position, 0.1))}%` }}
                draggable={false}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }} aria-hidden="true" />
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.25)" }} aria-hidden="true" />
              <div className="absolute bottom-6 left-6">
                <span className="block text-[9px] tracking-[0.35em] uppercase text-white/55 mb-1">Before</span>
                <span className="block text-lg font-serif text-white/70">Natural</span>
              </div>
            </div>
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-px z-20 pointer-events-none"
            style={{
              left: `${position}%`,
              background: "linear-gradient(to bottom, transparent, hsl(43,65%,52%) 20%, hsl(43,65%,52%) 80%, transparent)",
              boxShadow: "0 0 12px rgba(201,168,76,0.5)",
            }}
            aria-hidden="true"
          />

          {/* Drag handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none"
            style={{ left: `${position}%` }}
            aria-hidden="true"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(43,72%,54%), hsl(35,78%,47%))",
                boxShadow: "0 4px 20px rgba(201,168,76,0.5)",
              }}
            >
              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 text-xs text-white/25 tracking-[0.2em]"
        >
          Drag to compare · Every transformation begins with a consultation
        </motion.p>
      </div>
    </section>
  );
}

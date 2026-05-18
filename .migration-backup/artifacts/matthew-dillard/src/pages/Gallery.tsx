import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const ITEMS = [
  { title: "Golden Balayage", category: "Balayage", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85", accent: "rgba(201,168,76,0.35)", size: "tall" },
  { title: "Platinum Perfection", category: "Blonde Specialist", image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=85", accent: "rgba(200,210,235,0.3)", size: "normal" },
  { title: "Bridal Updo", category: "Bridal Styling", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=85", accent: "rgba(220,180,200,0.3)", size: "normal" },
  { title: "Rich Auburn", category: "Hair Coloring", image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=85", accent: "rgba(200,100,60,0.35)", size: "wide" },
  { title: "Dimensional Cut", category: "Luxury Haircuts", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=85", accent: "rgba(100,160,200,0.25)", size: "normal" },
  { title: "Glossy Extensions", category: "Extensions", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=85", accent: "rgba(201,168,76,0.28)", size: "tall" },
  { title: "Bond Repair", category: "Hair Treatments", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=85", accent: "rgba(80,180,140,0.25)", size: "normal" },
  { title: "Textured Style", category: "Hair Styling", image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=85", accent: "rgba(160,120,220,0.25)", size: "normal" },
  { title: "Honey Highlights", category: "Balayage", image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=85", accent: "rgba(201,168,76,0.3)", size: "normal" },
  { title: "Copper Wave", category: "Hair Coloring", image: "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?auto=format&fit=crop&w=800&q=85", accent: "rgba(180,90,50,0.3)", size: "tall" },
  { title: "Sculpted Bob", category: "Luxury Haircuts", image: "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?auto=format&fit=crop&w=800&q=85", accent: "rgba(120,170,210,0.25)", size: "normal" },
  { title: "Bridal Waves", category: "Bridal Styling", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=85", accent: "rgba(200,160,200,0.28)", size: "wide" },
  { title: "Ash Blonde", category: "Blonde Specialist", image: "https://images.unsplash.com/photo-1522337660329-2d49010b47bf?auto=format&fit=crop&w=800&q=85", accent: "rgba(190,210,240,0.3)", size: "normal" },
  { title: "Chestnut Gloss", category: "Hair Coloring", image: "https://images.unsplash.com/photo-1535207010348-71e47296838a?auto=format&fit=crop&w=800&q=85", accent: "rgba(160,100,60,0.3)", size: "normal" },
  { title: "Tape-In Volume", category: "Extensions", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=85", accent: "rgba(201,168,76,0.25)", size: "normal" },
  { title: "Olaplex Shine", category: "Hair Treatments", image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=85", accent: "rgba(100,200,180,0.25)", size: "wide" },
];

const CATEGORIES = ["All", "Balayage", "Blonde Specialist", "Hair Coloring", "Luxury Haircuts", "Bridal Styling", "Extensions", "Hair Treatments", "Hair Styling"];

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: typeof ITEMS[0];
  index: number;
  onClick: (item: typeof ITEMS[0], idx: number) => void;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 10;
    setTilt({ x, y });
  };

  const heightClass =
    item.size === "tall" ? "row-span-2" : "";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.93, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      layout
      className={`group relative overflow-hidden cursor-pointer ${heightClass}`}
      style={{
        background: "hsl(22,14%,7%)",
        border: "1px solid rgba(201,168,76,0.10)",
        transformStyle: "preserve-3d",
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={() => onClick(item, index)}
      data-testid={`gallery-item-${index}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
        style={{ transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }}
        loading="lazy"
      />

      {/* Permanent gradient */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" }}
        aria-hidden="true"
      />

      {/* Hover colour wash */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 50% 20%, ${item.accent} 0%, transparent 65%)` }}
        aria-hidden="true"
      />

      {/* Shine sweep on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
          transform: "translateX(-100%)",
          transition: "transform 0.6s ease, opacity 0.3s",
        }}
        aria-hidden="true"
      />

      {/* Top gold border reveal */}
      <div
        className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
        <span className="block text-[8px] tracking-[0.35em] uppercase text-yellow-400/70 mb-1">
          {item.category}
        </span>
        <span className="block text-sm font-serif text-white/80 group-hover:text-white transition-colors duration-300">
          {item.title}
        </span>
        <div
          className="w-0 group-hover:w-8 h-px mt-2 transition-all duration-500"
          style={{ background: "hsl(43,65%,52%)" }}
          aria-hidden="true"
        />
      </div>

      {/* Corner accent */}
      <div
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        aria-hidden="true"
      >
        <div className="w-5 h-px mb-0.5" style={{ background: "rgba(201,168,76,0.7)" }} />
        <div className="w-px h-5 ml-5" style={{ background: "rgba(201,168,76,0.7)" }} />
      </div>

      {/* Zoom icon */}
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
        <div
          className="w-8 h-8 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(201,168,76,0.3)", backdropFilter: "blur(8px)" }}
        >
          <svg width="12" height="12" fill="none" stroke="rgba(201,168,76,0.8)" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<{ item: typeof ITEMS[0]; idx: number } | null>(null);

  const filtered = activeCategory === "All" ? ITEMS : ITEMS.filter((item) => item.category === activeCategory);

  const categoryCounts = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = cat === "All" ? ITEMS.length : ITEMS.filter((i) => i.category === cat).length;
    return acc;
  }, {});

  const goPrev = () => {
    if (!selected) return;
    const newIdx = (selected.idx - 1 + filtered.length) % filtered.length;
    setSelected({ item: filtered[newIdx], idx: newIdx });
  };

  const goNext = () => {
    if (!selected) return;
    const newIdx = (selected.idx + 1) % filtered.length;
    setSelected({ item: filtered[newIdx], idx: newIdx });
  };

  return (
    <Layout>
      <PageHero
        title="The"
        titleGold="Gallery"
        subtitle="A curated portfolio of transformations — each one a story of artistry."
        breadcrumb="Portfolio"
      />

      <section ref={ref} className="py-20 md:py-28 relative overflow-hidden">
        {/* Ambient background sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 30}%`,
                color: "rgba(201,168,76,0.12)",
                fontSize: 20,
              }}
              animate={{ opacity: [0.08, 0.25, 0.08], scale: [0.8, 1.2, 0.8], rotate: [0, 180, 360] }}
              transition={{ duration: 6 + i * 0.8, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
            >
              ✦
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-8 mb-10"
          >
            {[
              { v: `${ITEMS.length}`, l: "Works" },
              { v: `${CATEGORIES.length - 1}`, l: "Categories" },
              { v: "2024", l: "Portfolio" },
            ].map((s) => (
              <div key={s.l} className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold" style={{ color: "hsl(43,65%,52%)" }}>{s.v}</span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">{s.l}</span>
              </div>
            ))}
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.15), transparent)" }} />
          </motion.div>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="relative px-4 py-2 text-[9px] tracking-[0.22em] uppercase transition-all duration-300 flex items-center gap-2"
                  style={{
                    background: isActive ? "linear-gradient(135deg, hsl(43,65%,52%), hsl(35,70%,45%))" : "transparent",
                    color: isActive ? "black" : "rgba(255,255,255,0.38)",
                    border: isActive ? "1px solid transparent" : "1px solid rgba(201,168,76,0.14)",
                    fontWeight: isActive ? 600 : 400,
                  }}
                  whileHover={!isActive ? { borderColor: "rgba(201,168,76,0.35)", color: "rgba(255,255,255,0.65)" } : {}}
                  whileTap={{ scale: 0.97 }}
                  data-testid={`gallery-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {cat}
                  <span
                    className="text-[8px] font-mono"
                    style={{
                      color: isActive ? "rgba(0,0,0,0.55)" : "rgba(201,168,76,0.4)",
                      fontWeight: 400,
                    }}
                  >
                    {categoryCounts[cat]}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[190px]"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <GalleryCard
                  key={item.title}
                  item={item}
                  index={i}
                  onClick={(it, idx) => setSelected({ item: it, idx })}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-20 pt-14"
            style={{ borderTop: "1px solid rgba(201,168,76,0.08)" }}
          >
            <p className="text-sm text-white/35 mb-6 max-w-sm mx-auto leading-relaxed">
              Ready to create your transformation? Book your appointment today.
            </p>
            <a
              href="https://matthewdillard.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.28em] uppercase text-black font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, hsl(43,72%,54%), hsl(35,78%,47%))",
                boxShadow: "0 6px 28px rgba(201,168,76,0.38)",
              }}
            >
              Book Your Transformation
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ background: "rgba(0,0,0,0.94)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(201,168,76,0.3)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(201,168,76,0.08)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[320px] md:h-[460px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selected.item.title}
                    src={selected.item.image}
                    alt={selected.item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                  />
                </AnimatePresence>
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }}
                  aria-hidden="true"
                />

                {/* Info */}
                <div className="absolute bottom-6 left-6 right-16">
                  <span className="block text-[8px] tracking-[0.38em] uppercase text-yellow-400/65 mb-1.5">{selected.item.category}</span>
                  <span className="text-xl md:text-2xl font-serif text-white/92">{selected.item.title}</span>
                </div>

                {/* Close */}
                <button
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center transition-colors"
                  style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.5)" }}
                  onClick={() => setSelected(null)}
                >
                  ✕
                </button>
              </div>

              {/* Navigation */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ background: "hsl(22,16%,7%)", borderTop: "1px solid rgba(201,168,76,0.1)" }}
              >
                <motion.button
                  onClick={goPrev}
                  className="flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase transition-colors"
                  style={{ color: "rgba(201,168,76,0.5)" }}
                  whileHover={{ color: "rgba(201,168,76,1)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Prev
                </motion.button>

                <span className="text-[9px] tracking-[0.3em] uppercase text-white/25">
                  {selected.idx + 1} / {filtered.length}
                </span>

                <motion.button
                  onClick={goNext}
                  className="flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase transition-colors"
                  style={{ color: "rgba(201,168,76,0.5)" }}
                  whileHover={{ color: "rgba(201,168,76,1)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Next
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

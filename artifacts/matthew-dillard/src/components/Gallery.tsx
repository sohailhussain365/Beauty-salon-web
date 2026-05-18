import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const GALLERY_ITEMS = [
  { title: "Golden Balayage", category: "Balayage", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80", accent: "rgba(201,168,76,0.35)", size: "tall" },
  { title: "Platinum Perfection", category: "Blonde Specialist", image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=700&q=80", accent: "rgba(200,210,235,0.3)", size: "normal" },
  { title: "Bridal Updo", category: "Bridal Styling", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=700&q=80", accent: "rgba(220,180,200,0.3)", size: "normal" },
  { title: "Rich Auburn", category: "Hair Coloring", image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=700&q=80", accent: "rgba(200,100,60,0.35)", size: "wide" },
  { title: "Dimensional Cut", category: "Luxury Haircuts", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=700&q=80", accent: "rgba(100,160,200,0.25)", size: "normal" },
  { title: "Glossy Extensions", category: "Extensions", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=700&q=80", accent: "rgba(201,168,76,0.28)", size: "tall" },
  { title: "Bond Repair", category: "Hair Treatments", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=700&q=80", accent: "rgba(80,180,140,0.25)", size: "normal" },
  { title: "Textured Style", category: "Hair Styling", image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=700&q=80", accent: "rgba(160,120,220,0.25)", size: "normal" },
];

interface GalleryItemProps {
  item: typeof GALLERY_ITEMS[0];
  index: number;
  inView: boolean;
  onClick: (item: typeof GALLERY_ITEMS[0]) => void;
}

function GalleryItem({ item, index, inView, onClick }: GalleryItemProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 8;
    setTilt({ x, y });
  };

  const heightClass =
    item.size === "tall" ? "row-span-2 min-h-[400px]" : item.size === "wide" ? "min-h-[180px]" : "min-h-[200px]";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.93, y: 16 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
      className={`group relative overflow-hidden cursor-pointer ${heightClass}`}
      style={{
        border: "1px solid rgba(201,168,76,0.10)",
        background: "hsl(22,14%,8%)",
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={() => onClick(item)}
      data-testid={`gallery-item-${index}`}
      whileHover={{ borderColor: "rgba(201,168,76,0.28)" }}
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.07)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
        loading="lazy"
      />

      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 50% 20%, ${item.accent} 0%, transparent 65%)` }}
        aria-hidden="true"
      />

      {/* Top bar reveal */}
      <div
        className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
        <span className="block text-[8px] tracking-[0.35em] uppercase text-yellow-400/65 mb-1">{item.category}</span>
        <span className="block text-sm font-serif text-white/80 group-hover:text-white transition-colors duration-300">{item.title}</span>
        <div className="w-0 group-hover:w-8 h-px mt-2 transition-all duration-500" style={{ background: "hsl(43,65%,52%)" }} aria-hidden="true" />
      </div>

      {/* Corner accent */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400" aria-hidden="true">
        <div className="w-5 h-px mb-0.5" style={{ background: "rgba(201,168,76,0.7)" }} />
        <div className="w-px h-5 ml-5" style={{ background: "rgba(201,168,76,0.7)" }} />
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden section-divider"
      data-testid="gallery-section"
    >
      {/* Ambient floating sparkles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 2) * 50}%`, color: "rgba(201,168,76,0.12)", fontSize: 14 }}
            animate={{ opacity: [0.07, 0.25, 0.07], scale: [0.8, 1.4, 0.8], rotate: [0, 180, 360] }}
            transition={{ duration: 5 + i * 0.8, repeat: Infinity, delay: i * 0.9, ease: "easeInOut" }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.span
              className="block h-px"
              initial={{ width: 0 }}
              animate={inView ? { width: 48 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }}
            />
            <span className="text-[9px] tracking-[0.4em] uppercase text-yellow-400/60">Portfolio</span>
            <motion.span
              className="block h-px"
              initial={{ width: 0 }}
              animate={inView ? { width: 48 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }}
            />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white/90">
            The <span className="text-gold-gradient italic">Gallery</span>
          </h2>
          <p className="mt-4 text-sm text-white/38 tracking-wide max-w-md mx-auto">
            A curated collection of transformations — each one a story of artistry.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[200px]">
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryItem key={item.title} item={item} index={i} inView={inView} onClick={setSelected} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={() => setSelected(null)}
            data-testid="gallery-lightbox"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg overflow-hidden"
              style={{
                border: "1px solid rgba(201,168,76,0.28)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(201,168,76,0.08)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-72 md:h-[400px]">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)" }}
                  aria-hidden="true"
                />
                <div className="absolute bottom-6 left-6">
                  <span className="block text-[9px] tracking-[0.35em] uppercase text-yellow-400/65 mb-1">{selected.category}</span>
                  <span className="text-xl font-serif text-white/90">{selected.title}</span>
                </div>
                <button
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center transition-colors text-white/45 hover:text-white"
                  style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}
                  onClick={() => setSelected(null)}
                  data-testid="gallery-close-btn"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

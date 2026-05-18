import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const GALLERY_ITEMS = [
  {
    title: "Golden Balayage",
    category: "Balayage",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    accent: "rgba(201,168,76,0.35)",
    size: "tall",
  },
  {
    title: "Platinum Perfection",
    category: "Blonde Specialist",
    image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&q=80",
    accent: "rgba(200,210,235,0.3)",
    size: "normal",
  },
  {
    title: "Bridal Updo",
    category: "Bridal Styling",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=600&q=80",
    accent: "rgba(220,180,200,0.3)",
    size: "normal",
  },
  {
    title: "Rich Auburn",
    category: "Hair Coloring",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=600&q=80",
    accent: "rgba(200,100,60,0.35)",
    size: "wide",
  },
  {
    title: "Dimensional Cut",
    category: "Luxury Haircuts",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80",
    accent: "rgba(100,160,200,0.25)",
    size: "normal",
  },
  {
    title: "Glossy Extensions",
    category: "Extensions",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80",
    accent: "rgba(201,168,76,0.28)",
    size: "tall",
  },
  {
    title: "Bond Repair Treatment",
    category: "Hair Treatments",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80",
    accent: "rgba(80,180,140,0.25)",
    size: "normal",
  },
  {
    title: "Textured Style",
    category: "Hair Styling",
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=600&q=80",
    accent: "rgba(160,120,220,0.25)",
    size: "normal",
  },
];

interface GalleryItemProps {
  item: typeof GALLERY_ITEMS[0];
  index: number;
  inView: boolean;
  onClick: (item: typeof GALLERY_ITEMS[0]) => void;
}

function GalleryItem({ item, index, inView, onClick }: GalleryItemProps) {
  const heightClass =
    item.size === "tall"
      ? "row-span-2 min-h-[400px]"
      : item.size === "wide"
      ? "min-h-[180px]"
      : "min-h-[200px]";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      className={`group relative overflow-hidden cursor-pointer ${heightClass}`}
      style={{ border: "1px solid rgba(201,168,76,0.10)", background: "hsl(22,14%,8%)" }}
      onClick={() => onClick(item)}
      data-testid={`gallery-item-${index}`}
    >
      {/* Photo */}
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />

      {/* Permanent dark gradient at bottom for legibility */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)" }}
        aria-hidden="true"
      />

      {/* Hover colour wash */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 50% 30%, ${item.accent} 0%, transparent 65%)` }}
        aria-hidden="true"
      />

      {/* Hover darkening */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: "rgba(0,0,0,0.22)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
        <span className="block text-[8px] tracking-[0.35em] uppercase text-yellow-400/60 mb-1">
          {item.category}
        </span>
        <span className="block text-sm font-serif text-white/80 group-hover:text-white transition-colors duration-300">
          {item.title}
        </span>
        <div
          className="w-0 group-hover:w-8 h-px mt-2 transition-all duration-400"
          style={{ background: "hsl(43,65%,52%)" }}
          aria-hidden="true"
        />
      </div>

      {/* Top right corner accent */}
      <div
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        aria-hidden="true"
      >
        <div className="w-5 h-px mb-0.5" style={{ background: "rgba(201,168,76,0.6)" }} />
        <div className="w-px h-5 ml-5" style={{ background: "rgba(201,168,76,0.6)" }} />
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="block w-12 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }} />
            <span className="text-[9px] tracking-[0.4em] uppercase text-yellow-400/60">Portfolio</span>
            <span className="block w-12 h-px" style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white/90">
            The <span className="text-gold-gradient italic">Gallery</span>
          </h2>
          <p className="mt-4 text-sm text-white/40 tracking-wide max-w-md mx-auto">
            A curated collection of transformations — each one a story of artistry.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[200px]">
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryItem
              key={item.title}
              item={item}
              index={i}
              inView={inView}
              onClick={setSelected}
            />
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
            style={{ background: "rgba(0,0,0,0.9)" }}
            onClick={() => setSelected(null)}
            data-testid="gallery-lightbox"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg h-72 md:h-96 overflow-hidden"
              style={{ border: "1px solid rgba(201,168,76,0.25)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.image}
                alt={selected.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)" }}
                aria-hidden="true"
              />
              <div className="absolute bottom-6 left-6">
                <span className="block text-[9px] tracking-[0.35em] uppercase text-yellow-400/60 mb-1">{selected.category}</span>
                <span className="text-xl font-serif text-white/90">{selected.title}</span>
              </div>
              <button
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                onClick={() => setSelected(null)}
                data-testid="gallery-close-btn"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

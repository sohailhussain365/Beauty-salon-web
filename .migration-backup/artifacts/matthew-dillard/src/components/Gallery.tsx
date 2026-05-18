import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const GALLERY_ITEMS = [
  {
    title: "Golden Balayage",
    category: "Balayage",
    gradient: "linear-gradient(145deg, hsl(35,50%,15%) 0%, hsl(25,30%,10%) 100%)",
    accent: "rgba(201,168,76,0.25)",
    size: "tall",
  },
  {
    title: "Platinum Perfection",
    category: "Blonde Specialist",
    gradient: "linear-gradient(145deg, hsl(220,20%,14%) 0%, hsl(220,18%,9%) 100%)",
    accent: "rgba(200,210,235,0.2)",
    size: "normal",
  },
  {
    title: "Bridal Updo",
    category: "Bridal Styling",
    gradient: "linear-gradient(145deg, hsl(300,15%,13%) 0%, hsl(280,12%,8%) 100%)",
    accent: "rgba(220,180,200,0.2)",
    size: "normal",
  },
  {
    title: "Rich Auburn",
    category: "Hair Coloring",
    gradient: "linear-gradient(145deg, hsl(15,45%,14%) 0%, hsl(10,30%,9%) 100%)",
    accent: "rgba(200,100,60,0.25)",
    size: "wide",
  },
  {
    title: "Dimensional Cut",
    category: "Luxury Haircuts",
    gradient: "linear-gradient(145deg, hsl(200,20%,12%) 0%, hsl(200,15%,8%) 100%)",
    accent: "rgba(100,160,200,0.18)",
    size: "normal",
  },
  {
    title: "Glossy Extensions",
    category: "Extensions",
    gradient: "linear-gradient(145deg, hsl(40,25%,12%) 0%, hsl(30,18%,8%) 100%)",
    accent: "rgba(201,168,76,0.2)",
    size: "tall",
  },
  {
    title: "Bond Repair Treatment",
    category: "Hair Treatments",
    gradient: "linear-gradient(145deg, hsl(160,20%,11%) 0%, hsl(160,15%,7%) 100%)",
    accent: "rgba(80,180,140,0.18)",
    size: "normal",
  },
  {
    title: "Textured Style",
    category: "Hair Styling",
    gradient: "linear-gradient(145deg, hsl(260,18%,13%) 0%, hsl(260,14%,8%) 100%)",
    accent: "rgba(160,120,220,0.18)",
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
      style={{
        background: item.gradient,
        border: "1px solid rgba(201,168,76,0.07)",
      }}
      onClick={() => onClick(item)}
      data-testid={`gallery-item-${index}`}
    >
      {/* Ambient light */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${item.accent} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Abstract hair pattern */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px opacity-10 group-hover:opacity-25 transition-opacity duration-700"
            style={{
              height: "120%",
              left: `${20 + i * 15}%`,
              background: `linear-gradient(to bottom, transparent, ${item.accent.replace("0.", "0.6")}, transparent)`,
              transform: `rotate(${-5 + i * 3}deg)`,
              transformOrigin: "center",
            }}
            aria-hidden="true"
          />
        ))}
        <div
          className="w-20 h-20 rounded-full opacity-15 group-hover:opacity-30 group-hover:scale-150 transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse, ${item.accent.replace("0.", "0.8")} 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: "rgba(0,0,0,0.35)" }}
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
              className="relative w-full max-w-lg h-72 md:h-96"
              style={{
                background: selected.gradient,
                border: "1px solid rgba(201,168,76,0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 50% 50%, ${selected.accent.replace("0.", "0.5")} 0%, transparent 65%)`,
                }}
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

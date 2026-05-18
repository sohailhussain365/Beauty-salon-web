import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const ITEMS = [
  { title: "Golden Balayage", category: "Balayage", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80", accent: "rgba(201,168,76,0.35)", size: "tall" },
  { title: "Platinum Perfection", category: "Blonde Specialist", image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&q=80", accent: "rgba(200,210,235,0.3)", size: "normal" },
  { title: "Bridal Updo", category: "Bridal Styling", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=600&q=80", accent: "rgba(220,180,200,0.3)", size: "normal" },
  { title: "Rich Auburn", category: "Hair Coloring", image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=600&q=80", accent: "rgba(200,100,60,0.35)", size: "wide" },
  { title: "Dimensional Cut", category: "Luxury Haircuts", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80", accent: "rgba(100,160,200,0.25)", size: "normal" },
  { title: "Glossy Extensions", category: "Extensions", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80", accent: "rgba(201,168,76,0.28)", size: "tall" },
  { title: "Bond Repair", category: "Hair Treatments", image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80", accent: "rgba(80,180,140,0.25)", size: "normal" },
  { title: "Textured Style", category: "Hair Styling", image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=600&q=80", accent: "rgba(160,120,220,0.25)", size: "normal" },
  { title: "Honey Highlights", category: "Balayage", image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80", accent: "rgba(201,168,76,0.3)", size: "normal" },
  { title: "Copper Wave", category: "Hair Coloring", image: "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?auto=format&fit=crop&w=600&q=80", accent: "rgba(180,90,50,0.3)", size: "tall" },
  { title: "Sculpted Bob", category: "Luxury Haircuts", image: "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?auto=format&fit=crop&w=600&q=80", accent: "rgba(120,170,210,0.25)", size: "normal" },
  { title: "Bridal Waves", category: "Bridal Styling", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80", accent: "rgba(200,160,200,0.28)", size: "wide" },
];

const CATEGORIES = ["All", "Balayage", "Blonde Specialist", "Hair Coloring", "Luxury Haircuts", "Bridal Styling", "Extensions", "Hair Treatments", "Hair Styling"];

export default function GalleryPage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<typeof ITEMS[0] | null>(null);

  const filtered = activeCategory === "All" ? ITEMS : ITEMS.filter(item => item.category === activeCategory);

  return (
    <Layout>
      <PageHero
        title="The"
        titleGold="Gallery"
        subtitle="A curated portfolio of transformations — each one a story of artistry."
        breadcrumb="Portfolio"
      />
      <section ref={ref} className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 text-[9px] tracking-[0.25em] uppercase transition-all duration-300"
                style={{
                  background: activeCategory === cat ? "linear-gradient(135deg, hsl(43,65%,52%), hsl(35,70%,45%))" : "transparent",
                  color: activeCategory === cat ? "black" : "rgba(255,255,255,0.35)",
                  border: activeCategory === cat ? "1px solid transparent" : "1px solid rgba(201,168,76,0.15)",
                }}
                data-testid={`gallery-filter-${cat.toLowerCase().replace(/\s+/g,"-")}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[180px]">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => {
                const heightClass = item.size === "tall" ? "row-span-2" : item.size === "wide" ? "" : "";
                return (
                  <motion.div
                    key={item.title}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.5, delay: i * 0.04 }}
                    className={`group relative overflow-hidden cursor-pointer ${heightClass}`}
                    style={{ background: "hsl(22,14%,7%)", border: "1px solid rgba(201,168,76,0.10)" }}
                    onClick={() => setSelected(item)}
                    data-testid={`gallery-item-${i}`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" }}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(ellipse at 50% 30%, ${item.accent} 0%, transparent 65%)` }}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "rgba(0,0,0,0.2)" }}
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="block text-[7px] tracking-[0.35em] uppercase text-yellow-400/70 mb-0.5">{item.category}</span>
                      <span className="block text-xs font-serif text-white/85 group-hover:text-white">{item.title}</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

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
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl h-80 md:h-[420px] overflow-hidden"
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
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)" }}
                aria-hidden="true"
              />
              <div className="absolute bottom-8 left-8">
                <span className="block text-[9px] tracking-[0.35em] uppercase text-yellow-400/60 mb-1">{selected.category}</span>
                <span className="text-2xl font-serif text-white/90">{selected.title}</span>
              </div>
              <button
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-white/40 hover:text-white text-sm transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

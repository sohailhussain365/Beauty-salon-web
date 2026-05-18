import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";

const ITEMS = [
  { title: "Golden Balayage", category: "Balayage", gradient: "linear-gradient(145deg, hsl(35,50%,15%), hsl(25,30%,10%))", accent: "rgba(201,168,76,0.3)", size: "tall" },
  { title: "Platinum Perfection", category: "Blonde Specialist", gradient: "linear-gradient(145deg, hsl(220,20%,14%), hsl(220,18%,9%))", accent: "rgba(200,210,235,0.25)", size: "normal" },
  { title: "Bridal Updo", category: "Bridal Styling", gradient: "linear-gradient(145deg, hsl(300,15%,13%), hsl(280,12%,8%))", accent: "rgba(220,180,200,0.25)", size: "normal" },
  { title: "Rich Auburn", category: "Hair Coloring", gradient: "linear-gradient(145deg, hsl(15,45%,14%), hsl(10,30%,9%))", accent: "rgba(200,100,60,0.3)", size: "wide" },
  { title: "Dimensional Cut", category: "Luxury Haircuts", gradient: "linear-gradient(145deg, hsl(200,20%,12%), hsl(200,15%,8%))", accent: "rgba(100,160,200,0.22)", size: "normal" },
  { title: "Glossy Extensions", category: "Extensions", gradient: "linear-gradient(145deg, hsl(40,25%,12%), hsl(30,18%,8%))", accent: "rgba(201,168,76,0.25)", size: "tall" },
  { title: "Bond Repair", category: "Hair Treatments", gradient: "linear-gradient(145deg, hsl(160,20%,11%), hsl(160,15%,7%))", accent: "rgba(80,180,140,0.22)", size: "normal" },
  { title: "Textured Style", category: "Hair Styling", gradient: "linear-gradient(145deg, hsl(260,18%,13%), hsl(260,14%,8%))", accent: "rgba(160,120,220,0.22)", size: "normal" },
  { title: "Honey Highlights", category: "Balayage", gradient: "linear-gradient(145deg, hsl(38,42%,14%), hsl(32,28%,9%))", accent: "rgba(201,168,76,0.22)", size: "normal" },
  { title: "Copper Wave", category: "Hair Coloring", gradient: "linear-gradient(145deg, hsl(20,40%,13%), hsl(15,28%,8%))", accent: "rgba(180,90,50,0.25)", size: "tall" },
  { title: "Sculpted Bob", category: "Luxury Haircuts", gradient: "linear-gradient(145deg, hsl(210,18%,12%), hsl(210,14%,8%))", accent: "rgba(120,170,210,0.2)", size: "normal" },
  { title: "Bridal Waves", category: "Bridal Styling", gradient: "linear-gradient(145deg, hsl(290,14%,12%), hsl(270,12%,8%))", accent: "rgba(200,160,200,0.22)", size: "wide" },
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
                    style={{ background: item.gradient, border: "1px solid rgba(201,168,76,0.07)" }}
                    onClick={() => setSelected(item)}
                    data-testid={`gallery-item-${i}`}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(ellipse at 50% 50%, ${item.accent} 0%, transparent 70%)` }}
                      aria-hidden="true"
                    />
                    {[...Array(5)].map((_, si) => (
                      <div
                        key={si}
                        className="absolute top-0 bottom-0 w-px opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                        style={{
                          left: `${15 + si * 16}%`,
                          background: `linear-gradient(to bottom, transparent, ${item.accent} 50%, transparent)`,
                          transform: `rotate(${-4 + si * 2}deg)`,
                        }}
                        aria-hidden="true"
                      />
                    ))}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "rgba(0,0,0,0.3)" }}
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="block text-[7px] tracking-[0.35em] uppercase text-yellow-400/60 mb-0.5">{item.category}</span>
                      <span className="block text-xs font-serif text-white/80 group-hover:text-white">{item.title}</span>
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
              className="relative w-full max-w-xl h-80 md:h-[420px]"
              style={{ background: selected.gradient, border: "1px solid rgba(201,168,76,0.2)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="absolute inset-0"
                style={{ background: `radial-gradient(ellipse at 50% 50%, ${selected.accent.replace("0.", "0.5")} 0%, transparent 65%)` }}
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

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Deep cinematic background */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(30,20%,8%) 0%, hsl(22,18%,4%) 60%, hsl(22,18%,3%) 100%)",
          }}
        />
        {/* Ambient orbs */}
        <div
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full animate-orb-drift"
          style={{
            background:
              "radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full animate-orb-drift"
          style={{
            background:
              "radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 65%)",
            animationDelay: "-4s",
            animationDirection: "reverse",
          }}
          aria-hidden="true"
        />
        {/* Vertical light beam */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(201,168,76,0.08) 30%, rgba(201,168,76,0.04) 60%, transparent)",
          }}
          aria-hidden="true"
        />
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px",
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Decorative horizontal lines */}
      <div
        className="absolute left-0 right-0 top-[35%] h-px opacity-10"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute left-0 right-0 top-[65%] h-px opacity-5"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)" }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ opacity }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-6 flex items-center justify-center gap-4">
          <span className="block w-12 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(43,65%,52%))" }} />
          <span className="text-[10px] tracking-[0.45em] uppercase text-yellow-400/70">
            Prosper, Texas · Est. Excellence
          </span>
          <span className="block w-12 h-px" style={{ background: "linear-gradient(90deg, hsl(43,65%,52%), transparent)" }} />
        </motion.div>

        <motion.h1
          variants={item}
          className="font-serif mb-6 leading-[1.05]"
          style={{ fontWeight: 600 }}
        >
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white/90 mb-2">
            Luxury Hair
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl shimmer-text">
            Artistry
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-sm md:text-base text-white/45 tracking-[0.12em] leading-relaxed mb-10 max-w-xl mx-auto"
        >
          Where craft meets confidence. An elevated salon experience
          <br className="hidden md:block" />
          designed for those who demand the extraordinary.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://matthewdillard.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 text-xs tracking-[0.25em] uppercase text-black font-medium overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, hsl(43,72%,54%), hsl(35,78%,47%))",
              boxShadow: "0 4px 25px rgba(201,168,76,0.4)",
            }}
            data-testid="hero-book-btn"
          >
            <span className="relative z-10">Book Appointment</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, hsl(43,80%,60%), hsl(35,85%,53%))" }}
            />
          </a>
          <button
            onClick={() => scrollTo("#services")}
            className="px-8 py-4 text-xs tracking-[0.25em] uppercase text-yellow-400/80 border border-yellow-500/30 hover:border-yellow-400/60 hover:text-yellow-300 transition-all duration-300"
            data-testid="hero-services-btn"
          >
            Explore Services
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={item}
          className="mt-16 flex flex-col items-center gap-2 opacity-40"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/50">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-yellow-400/60 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Side accents */}
      <div
        className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 opacity-30"
        aria-hidden="true"
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-yellow-400/50" />
        <span className="text-[8px] tracking-[0.4em] uppercase text-yellow-400/60 rotate-90 origin-center whitespace-nowrap my-8">
          Matthew Dillard
        </span>
        <div className="w-px h-20 bg-gradient-to-t from-transparent to-yellow-400/50" />
      </div>
      <div
        className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 opacity-30"
        aria-hidden="true"
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-yellow-400/50" />
        <span className="text-[8px] tracking-[0.4em] uppercase text-yellow-400/60 rotate-90 origin-center whitespace-nowrap my-8">
          Hair Salons
        </span>
        <div className="w-px h-20 bg-gradient-to-t from-transparent to-yellow-400/50" />
      </div>
    </section>
  );
}

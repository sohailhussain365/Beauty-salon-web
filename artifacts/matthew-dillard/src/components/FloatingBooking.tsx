import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingBooking() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 right-6 z-50"
          data-testid="floating-book-btn"
        >
          <Link href="/booking">
            <div
              className="flex items-center gap-2.5 px-5 py-3.5 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:scale-105 cursor-pointer group"
              style={{
                background: "hsl(22,15%,12%)",
                color: "#ffffff",
                boxShadow: "0 4px 20px rgba(22,15,8,0.22), 0 0 0 1px rgba(22,15,8,0.10)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white/60 transition-colors" />
              Book Appointment
            </div>
          </Link>
          <div
            className="absolute inset-0 -z-10 blur-xl opacity-25"
            style={{ background: "hsl(22,15%,12%)" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

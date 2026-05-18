import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const steps = [15, 35, 55, 75, 90, 100];
    let i = 0;
    const timer = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 600);
        }, 300);
      }
    }, 200);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          style={{
            background: "hsl(30,8%,93%)",
          }}
        >
          <div
            className="absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-pulse-glow"
              style={{
                background: "radial-gradient(ellipse, rgba(22,15,8,0.04) 0%, transparent 70%)",
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-16 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(22,15,8,0.30), transparent)" }}
              />
              <h1
                className="text-5xl md:text-6xl font-serif tracking-[0.12em] text-center w-full"
                style={{ fontWeight: 400, color: "hsl(22,20%,8%)" }}
              >
                Matthew <span className="text-gold-gradient font-semibold">Dillard</span>
              </h1>
              <p className="text-xs tracking-[0.4em] uppercase mt-1 text-center" style={{ color: "rgba(22,15,8,0.40)" }}>
                Hair Salons · Prosper, Texas
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-16 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(22,15,8,0.30), transparent)" }}
              />
            </div>

            <div className="flex flex-col items-center gap-3 w-48">
              <div className="w-full h-px relative overflow-hidden rounded-full" style={{ background: "rgba(22,15,8,0.10)" }}>
                <motion.div
                  className="absolute top-0 left-0 h-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    background: "linear-gradient(90deg, hsl(22,15%,20%), hsl(22,12%,12%))",
                    boxShadow: "0 0 6px rgba(22,15,8,0.18)",
                  }}
                />
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(22,15,8,0.38)" }}>
                {progress < 100 ? "Loading Experience" : "Welcome"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

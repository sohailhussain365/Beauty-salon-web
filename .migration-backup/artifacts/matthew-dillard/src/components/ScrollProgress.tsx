import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? scrolled / total : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scaleX = useSpring(progress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9997] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, hsl(43,65%,52%), hsl(43,85%,68%), hsl(35,75%,48%))",
        boxShadow: "0 0 10px rgba(201,168,76,0.6)",
      }}
    />
  );
}

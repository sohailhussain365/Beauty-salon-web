import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.style.cursor === "pointer" ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-multiply"
        animate={{
          x: mousePos.x - (isHovering ? 20 : 4),
          y: mousePos.y - (isHovering ? 20 : 4),
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.5 }}
      >
        <div
          className={`rounded-full transition-all duration-300 ${
            isHovering
              ? "w-10 h-10 bg-transparent border-2"
              : "w-2 h-2"
          }`}
          style={{
            background: isHovering ? "transparent" : "hsl(22,15%,12%)",
            borderColor: isHovering ? "hsl(22,15%,12%)" : "transparent",
          }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          opacity: isVisible ? 0.20 : 0,
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 1 }}
      >
        <div
          className="w-10 h-10 rounded-full"
          style={{ border: "1px solid rgba(22,15,8,0.30)" }}
        />
      </motion.div>
    </>
  );
}

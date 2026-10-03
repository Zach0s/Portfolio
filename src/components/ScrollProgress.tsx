"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar under the navbar showing how far down the page you are. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-16 z-50 h-[2px] origin-left bg-[linear-gradient(90deg,var(--accent),var(--accent2))]"
      style={{ scaleX }}
    />
  );
}

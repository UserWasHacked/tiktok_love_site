"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface Props {
  onContinue: () => void;
}

const heartPath =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

const shatterParticlesData = Array.from({ length: 30 }).map(() => ({
  hue: 343 + Math.random() * 20,
  light: 50 + Math.random() * 30,
  x: (Math.random() - 0.5) * 600,
  y: (Math.random() - 0.5) * 600,
  dur: 1 + Math.random(),
  delay: Math.random() * 0.5,
}));

const fragments = Array.from({ length: 8 }, (_, i) => {
  const angle = (i / 8) * Math.PI * 2;
  return { x: Math.cos(angle) * 2, y: Math.sin(angle) * 2, id: i };
});

export default function Screen4({ onContinue }: Props) {
  const [phase, setPhase] = useState<"text" | "heart" | "breaking" | "done">("text");
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("heart"), 2000);
    const t2 = setTimeout(() => setPhase("breaking"), 4000);
    const t3 = setTimeout(() => {
      setPhase("done");
      onContinue();
    }, 5500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onContinue]);

  useEffect(() => {
    if (phase !== "breaking") return;
    const svg = svgRef.current;
    if (!svg) return;
    const paths = svg.querySelectorAll("path");

    gsap.to(paths, {
      scale: 0,
      opacity: 0,
      rotation: () => gsap.utils.random(-30, 30),
      x: () => gsap.utils.random(-100, 100),
      y: () => gsap.utils.random(-100, 100),
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.03,
    });

    gsap.to(svg, {
      scale: 0.3,
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      ease: "power2.in",
    });
  }, [phase]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence mode="wait">
        {phase === "text" && (
          <motion.h2
            key="text"
            className="text-2xl md:text-4xl font-bold text-center px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gradient">
              Последний шанс перед правдой...
            </span>
          </motion.h2>
        )}

        {(phase === "heart" || phase === "breaking") && (
          <motion.div
            key="heart"
            className="relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 12,
              delay: 0.2,
            }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-[#FF4D6D]/20 to-transparent blur-3xl scale-150" />
            <svg
              ref={svgRef}
              viewBox="0 0 24 24"
              className="w-48 h-48 md:w-64 md:h-64 relative z-10"
              style={{ filter: "url(#glow)" }}
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {fragments.map((f) => (
                <path
                  key={f.id}
                  d={heartPath}
                  fill="#FF4D6D"
                  opacity={0.9}
                  style={{ transformOrigin: "12px 12px" }}
                />
              ))}
            </svg>

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                opacity: phase === "breaking" ? [0, 1] : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-6xl md:text-8xl text-white/10 select-none">
                💔
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {phase === "breaking" &&
          shatterParticlesData.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: `hsl(${p.hue}, 80%, ${p.light}%)`,
                left: "50%",
                top: "50%",
              }}
              initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              animate={{
                x: p.x,
                y: p.y,
                scale: 0,
                opacity: 0,
              }}
              transition={{
                duration: p.dur,
                delay: p.delay,
                ease: "easeOut",
              }}
            />
          ))}
      </div>
    </motion.div>
  );
}

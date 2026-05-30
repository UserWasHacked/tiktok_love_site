"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface Props {
  onContinue: () => void;
}

export default function Screen5({ onContinue }: Props) {
  const [phase, setPhase] = useState<"silence" | "restoring" | "pulsing" | "done">("silence");
  const heartRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("restoring"), 1200);
    const t2 = setTimeout(() => setPhase("pulsing"), 3500);
    const t3 = setTimeout(() => {
      setPhase("done");
      onContinue();
    }, 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onContinue]);

  useEffect(() => {
    if (phase !== "restoring") return;
    const heart = heartRef.current;
    if (!heart) return;
    gsap.fromTo(
      heart,
      { scale: 0, opacity: 0, rotation: -180 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      }
    );
  }, [phase]);

  useEffect(() => {
    if (phase !== "restoring") return;
    const glow = glowRef.current;
    if (!glow) return;
    gsap.fromTo(
      glow,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 2,
        duration: 1.2,
        ease: "power2.out",
      }
    );
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
        {phase === "silence" && (
          <motion.div
            key="silence"
            className="text-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl md:text-6xl font-light text-white/20">
              ...
            </div>
          </motion.div>
        )}

        {phase === "restoring" && (
          <motion.div
            key="flash"
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-[#FF4D6D]/30 via-[#7B2CBF]/20 to-transparent" />
          </motion.div>
        )}

        {(phase === "restoring" || phase === "pulsing" || phase === "done") && (
          <motion.div
            key="heart-container"
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              ref={glowRef}
              className="absolute inset-0 bg-gradient-radial from-[#FF4D6D]/40 via-[#FF758F]/20 to-transparent blur-3xl"
              style={{ transform: "scale(2)" }}
            />

            <div
              ref={heartRef}
              className="relative z-10"
            >
              <motion.div
                animate={
                  phase === "pulsing" || phase === "done"
                    ? {
                        scale: [1, 1.08, 1],
                        filter: [
                          "drop-shadow(0 0 20px rgba(255,77,109,0.5))",
                          "drop-shadow(0 0 40px rgba(255,77,109,0.8))",
                          "drop-shadow(0 0 20px rgba(255,77,109,0.5))",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="#FF4D6D"
                  className="w-40 h-40 md:w-56 md:h-56"
                >
                  <defs>
                    <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF4D6D" />
                      <stop offset="50%" stopColor="#FF758F" />
                      <stop offset="100%" stopColor="#FFB3C1" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="url(#heartGrad)"
                  />
                </svg>
              </motion.div>

              {phase === "pulsing" && (
                <motion.div
                  className="absolute -inset-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-radial from-[#FF4D6D]/20 to-transparent blur-2xl" />
                </motion.div>
              )}
            </div>

            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                phase === "done"
                  ? { opacity: [0, 1, 0], scale: [0, 1.5, 0] }
                  : {}
              }
              transition={{ duration: 1.5 }}
            >
              <div className="text-6xl md:text-8xl">✨</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

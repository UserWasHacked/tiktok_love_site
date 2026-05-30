"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onRestart: () => void;
}

function HeartIcon({ className, color }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color || "#FF4D6D"} className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

const heartsData = Array.from({ length: 20 }).map(() => ({
  left: Math.random() * 100,
  x1: (Math.random() - 0.5) * 300,
  x2: (Math.random() - 0.5) * 300,
  hue: 343 + Math.random() * 20,
  light: 60 + Math.random() * 20,
  dur: 3 + Math.random() * 3,
  delay: Math.random() * 3,
}));

function FlyingHearts({ vh }: { vh: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {heartsData.map((h, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${h.left}%`, top: "100%" }}
          initial={{ y: 0, x: 0, opacity: 0, scale: 0 }}
          animate={{
            y: [0, -vh - 200],
            x: [h.x1, h.x2],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0.5],
          }}
          transition={{
            duration: h.dur,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <HeartIcon
            className="w-4 h-4 md:w-6 md:h-6"
            color={`hsla(${h.hue}, 80%, ${h.light}%, 0.6)`}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function Screen6({ onRestart }: Props) {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [vh, setVh] = useState(800);

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setShowFirst(true), 800);
    const t2 = setTimeout(() => setShowSecond(true), 3000);
    const t3 = setTimeout(() => setShowHearts(true), 3500);
    const t4 = setTimeout(() => setShowButton(true), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {showHearts && <FlyingHearts vh={vh} />}

      <AnimatePresence>
        {showFirst && (
          <motion.div
            key="first"
            className="text-center max-w-2xl mb-8"
            initial={{ opacity: 0, scale: 0.5, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <motion.div
              className="mb-6"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <HeartIcon className="w-16 h-16 md:w-20 md:h-20 mx-auto drop-shadow-[0_0_20px_rgba(255,77,109,0.5)]" />
            </motion.div>

            <p className="text-2xl md:text-4xl font-bold leading-relaxed">
              <span className="text-gradient">
                Потому что среди миллиардов людей
              </span>
              <br />
              <span className="text-gradient">
                именно ты стал(а) самым важным
              </span>
              <br />
              <span className="text-gradient">
                человеком в моей жизни{" "}
                <HeartIcon className="w-6 h-6 md:w-8 md:h-8 inline-block align-middle" />
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSecond && (
          <motion.div
            key="second"
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl text-white/60 font-light italic">
              Спасибо, что ты есть.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showButton && (
          <motion.button
            key="btn"
            className="relative px-10 py-4 text-lg font-semibold rounded-full text-white overflow-hidden group cursor-pointer z-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] to-[#7B2CBF] opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF4D6D] to-[#7B2CBF] rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="absolute inset-0 rounded-full border border-white/20" />
            <span className="relative z-10 flex items-center gap-2">
              Создать такую же историю{" "}
              <HeartIcon className="w-5 h-5 inline-block" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

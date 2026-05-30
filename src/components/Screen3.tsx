"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onContinue: () => void;
}

function TinyHeart({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#FF4D6D"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export default function Screen3({ onContinue }: Props) {
  const [showText, setShowText] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setShowText(true), 400);
    const t2 = setTimeout(() => setShowHeart(true), 1200);
    const t3 = setTimeout(() => setShowButtons(true), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const moveNoButton = useCallback(() => {
    const btn = noBtnRef.current;
    if (!btn) return;
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const btnW = btn.offsetWidth;
    const btnH = btn.offsetHeight;
    const padding = 20;
    const newX = Math.random() * (viewportW - btnW - padding * 2) + padding;
    const newY = Math.random() * (viewportH - btnH - padding * 2) + padding;
    btn.style.position = "fixed";
    btn.style.left = `${newX}px`;
    btn.style.top = `${newY}px`;
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence>
        {showText && (
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center px-6 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gradient">Точно уверен(а)?</span>
          </motion.h2>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHeart && (
          <motion.div
            className="mb-12"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <TinyHeart className="w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_25px_rgba(255,77,109,0.5)]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showButtons && (
          <motion.div
            className="flex flex-col md:flex-row items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              className="relative px-10 py-4 text-lg font-semibold rounded-full text-white overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContinue}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] to-[#FF758F] opacity-90" />
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF4D6D] to-[#FF758F] rounded-full blur-md opacity-40" />
              <span className="relative z-10">Да, точно ❤️</span>
            </motion.button>

            <motion.button
              ref={noBtnRef}
              className="relative px-10 py-4 text-lg font-semibold rounded-full text-white/80 border border-white/20 bg-white/5 backdrop-blur-sm cursor-pointer select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              whileHover={{ scale: 1.05 }}
            >
              Не знаю 🤔
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onContinue: () => void;
}

export default function Screen2({ onContinue }: Props) {
  const [showText, setShowText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const [noBtnFixed, setNoBtnFixed] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowText(true), 300);
    const t2 = setTimeout(() => setShowButtons(true), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const moveNoButton = useCallback(() => {
    const btn = noBtnRef.current;
    if (!btn) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const bw = btn.offsetWidth;
    const bh = btn.offsetHeight;
    const pad = 20;
    const x = Math.random() * (vw - bw - pad * 2) + pad;
    const y = Math.random() * (vh - bh - pad * 2) + pad;
    btn.style.position = "fixed";
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
    setNoBtnFixed(true);
  }, []);

  const typewriter = "Ты уверен(а)?";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!showText) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(typewriter.slice(0, i + 1));
      i++;
      if (i >= typewriter.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [showText]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 className="text-3xl md:text-5xl font-bold text-center px-6 mb-16 min-h-[60px]">
        <span className="text-gradient">
          {displayed}
          <span className="animate-pulse">|</span>
        </span>
      </motion.h2>

      <AnimatePresence>
        {showButtons && (
          <motion.div
            className="flex flex-col md:flex-row items-center gap-6 relative w-full justify-center"
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
              <span className="relative z-10">Да ❤️</span>
            </motion.button>

            <motion.button
              ref={noBtnRef}
              className="relative px-10 py-4 text-lg font-semibold rounded-full text-white/80 border border-white/20 bg-white/5 backdrop-blur-sm cursor-pointer select-none z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              whileHover={{ scale: 1.05 }}
              style={noBtnFixed ? { position: "fixed" as const } : undefined}
            >
              Нет 🙈
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

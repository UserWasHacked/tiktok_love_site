"use client";

import { motion } from "framer-motion";

interface Props {
  onContinue: () => void;
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export default function Screen1({ onContinue }: Props) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative mb-12">
        <div className="absolute inset-0 animate-pulse-glow rounded-full" />
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <HeartIcon className="w-32 h-32 md:w-40 md:h-40 text-[#FF4D6D] drop-shadow-[0_0_30px_rgba(255,77,109,0.6)]" />
        </motion.div>
      </div>

      <motion.h1
        className="text-2xl md:text-4xl font-bold text-center px-6 mb-12 leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <span className="text-gradient">
          Открой только если
        </span>
        <br />
        <span className="text-gradient">
          любишь меня{" "}
          <span className="inline-block">
            <svg viewBox="0 0 24 24" fill="#FF4D6D" className="w-6 h-6 md:w-8 md:h-8 inline-block align-middle">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </span>
        </span>
      </motion.h1>

      <motion.button
        className="relative px-10 py-4 text-lg font-semibold rounded-full text-white overflow-hidden group cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onContinue}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] to-[#7B2CBF] opacity-90 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 rounded-full border border-white/20" />
        <div className="absolute -inset-1 bg-gradient-to-r from-[#FF4D6D] to-[#7B2CBF] rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
        <span className="relative z-10">Открыть</span>
      </motion.button>
    </motion.div>
  );
}

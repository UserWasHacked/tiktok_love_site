"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParticleField from "@/components/ParticleField";
import Screen1 from "@/components/Screen1";
import Screen2 from "@/components/Screen2";
import Screen3 from "@/components/Screen3";
import Screen4 from "@/components/Screen4";
import Screen5 from "@/components/Screen5";
import Screen6 from "@/components/Screen6";

export default function Home() {
  const [screen, setScreen] = useState(1);

  const goNext = useCallback(() => {
    setScreen((s) => Math.min(s + 1, 6));
  }, []);

  const restart = useCallback(() => {
    setScreen(1);
  }, []);

  return (
    <main className="relative w-full h-dvh min-h-dvh overflow-hidden bg-[#0a0a0f]">
      <ParticleField />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-[#FF4D6D]/10 via-transparent to-transparent animate-aurora"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-[#7B2CBF]/10 via-transparent to-transparent animate-aurora"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-radial from-[#FF758F]/5 via-transparent to-transparent animate-aurora"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <AnimatePresence>
        {screen === 1 && <Screen1 key="s1" onContinue={goNext} />}
        {screen === 2 && <Screen2 key="s2" onContinue={goNext} />}
        {screen === 3 && <Screen3 key="s3" onContinue={goNext} />}
        {screen === 4 && <Screen4 key="s4" onContinue={goNext} />}
        {screen === 5 && <Screen5 key="s5" onContinue={goNext} />}
        {screen === 6 && <Screen6 key="s6" onRestart={restart} />}
      </AnimatePresence>

      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 text-xs text-white/15 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        made with ❤️
      </motion.div>
    </main>
  );
}

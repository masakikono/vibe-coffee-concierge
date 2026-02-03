"use client";

import { useState } from "react";
import { CoffeeCard } from "@/components/CoffeeCard";
import { getCoffeeByVibe } from "@/lib/vibe-matcher";
import { CoffeeBean } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Sparkles, Search, Palette } from "lucide-react";
import clsx from "clsx";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const QUICK_VIBES = [
  "クリエイティブ",
  "集中したい深い夜",
  "雨の日の読書",
  "ハワイで休日",
  "南国の夕日",
  "ベトナムの熱気",
  "甘いご褒美",
  "デカフェで眠る"
];

const THEMES = [
  { id: "navy", name: "Dark Navy", bg: "bg-slate-900", accent: "from-blue-500 to-indigo-500" },
  { id: "forest", name: "Deep Forest", bg: "bg-green-950", accent: "from-emerald-500 to-teal-500" },
  { id: "burgundy", name: "Rich Burgundy", bg: "bg-rose-950", accent: "from-rose-500 to-pink-500" },
  { id: "charcoal", name: "Minimal Charcoal", bg: "bg-neutral-900", accent: "from-neutral-500 to-stone-500" },
];

export default function Home() {
  const [vibe, setVibe] = useState("");
  const [result, setResult] = useState<CoffeeBean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  const handleBrew = (inputVibe: string) => {
    if (!inputVibe.trim()) return;

    setIsLoading(true);
    setResult(null);

    // Simulate "thinking" delay for effect
    setTimeout(() => {
      const match = getCoffeeByVibe(inputVibe);
      setResult(match);
      setIsLoading(false);
    }, 600);
  };

  const handleReset = () => {
    setResult(null);
    setVibe("");
  };

  return (
    <main className={clsx("min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden text-white transition-colors duration-1000", currentTheme.bg)}>

      {/* Dynamic Background */}
      <div className={clsx("absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 bg-gradient-to-br transition-all duration-1000", currentTheme.accent)} />
      <div className={clsx("absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 bg-gradient-to-tl transition-all duration-1000", currentTheme.accent)} />

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={() => setShowThemeSelector(!showThemeSelector)}
          className="p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"
        >
          <Palette size={20} className="text-white/80" />
        </button>

        <AnimatePresence>
          {showThemeSelector && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-3 p-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col gap-1 w-48 shadow-2xl origin-top-right"
            >
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setCurrentTheme(theme);
                    setShowThemeSelector(false);
                  }}
                  className={clsx(
                    "px-4 py-2 text-sm text-left rounded-xl transition-colors",
                    currentTheme.id === theme.id ? "bg-white/20 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {theme.name}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="z-10 w-full max-w-3xl flex flex-col items-center">

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center text-center"
            >
              <div className="mb-8 p-5 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-lg border border-white/10 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                <div className={clsx("absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r", currentTheme.accent)} />
                <Coffee size={40} className="text-white relative z-10" strokeWidth={1} />
              </div>

              <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-sm">
                Vibe Coding
              </h1>
              <p className="text-white/60 mb-12 text-lg max-w-lg font-light leading-relaxed">
                今の気分や天気、シチュエーションを教えてください。<br />
                あなたのための最高の一杯と音楽を、AIが提案します。
              </p>

              <div className="w-full relative mb-14 group">
                <input
                  type="text"
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleBrew(vibe)}
                  placeholder="例: 深夜の執筆活動、雨音とともに..."
                  className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-xl md:text-2xl py-6 px-8 text-center focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all placeholder:text-white/20 text-white shadow-lg"
                />
                <button
                  onClick={() => handleBrew(vibe)}
                  disabled={!vibe}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-4 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all disabled:opacity-0"
                >
                  <Search size={24} />
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {QUICK_VIBES.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setVibe(tag);
                      handleBrew(tag);
                    }}
                    className="px-5 py-2.5 bg-white/5 border border-white/5 rounded-full text-white/70 text-sm hover:border-white/20 hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col items-center"
            >
              <button
                onClick={handleReset}
                className="mb-8 px-6 py-2 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/5 text-sm tracking-widest uppercase transition-all"
              >
                ← もう一度選ぶ
              </button>
              <CoffeeCard bean={result} />
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center p-8 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              >
                <Sparkles className="text-white/90" size={48} strokeWidth={1} />
              </motion.div>
              <p className="mt-6 text-white/80 font-serif italic text-xl tracking-wide">Curating your vibe...</p>
            </div>
          </motion.div>
        )}

        <div className="w-full mt-12 max-w-4xl">
          <h2 className="text-2xl font-serif text-white/80 mb-4 text-center">Cafe Map (Beta)</h2>
          <Map />
        </div>

      </div>
    </main>
  );
}

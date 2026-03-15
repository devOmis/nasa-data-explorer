import astronaut from "@/assets/astronaut-floating.png";
import rocket from "@/assets/rocket.png";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from 'react';
import ApodModal from './apod/ApodModal';

import {
  Camera02Icon,
  GlobeIcon,
} from "@hugeicons/core-free-icons";

export default function Home() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 40, damping: 20 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const astronautX = useTransform(springX, [0, 1], [-60, 60]);
  const astronautY = useTransform(springY, [0, 1], [-60, 60]);

  const textX = useTransform(springX, [0, 1], [15, -15]);

  const [apodOpen, setApodOpen] = useState(false);
  const [apodDate, setApodDate] = useState(() => new Date().toISOString().split('T')[0]);

  return (
    <>
      <div className="relative h-full w-full flex items-center justify-center z-20 px-4">
        {/* Animated Background Text */}
        <motion.div
          style={{ x: textX }}
          className="absolute text-[20vw] font-black text-white/2 select-none pointer-events-none tracking-tighter"
        >
          EXPLORE
        </motion.div>

        {/* Astronaut - Interactive */}
        <motion.div
          style={{ x: astronautX, y: astronautY }}
          className="relative z-30 flex items-center justify-center w-full max-w-[90vw]"
        >
          <motion.img
            animate={{ y: [-20, 20, -20], rotate: [-2, 2, -2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            src={astronaut}
            className="h-[50vh] md:h-[65vh] w-auto drop-shadow-[0_0_80px_rgba(59,130,246,0.3)] mix-blend-lighten pointer-events-none"
          />

          {/* Main Title Overlay */}
          <div className="absolute flex flex-col items-center pointer-events-none w-full">
            <h1 className="text-[18vw] md:text-[14vw] font-black tracking-[-0.05em] leading-none text-white drop-shadow-2xl">
              NASA
            </h1>
            <div className="flex items-center gap-2 md:gap-4 -mt-1.25 md:-mt-2.5">
              <div className="h-px w-8 md:w-12 bg-blue-500" />
              <span className="text-[8px] md:text-[11px] font-mono tracking-[0.4em] md:tracking-[0.6em] text-blue-400 uppercase text-center">
                Per Aspera Ad Astra
              </span>
              <div className="h-px w-8 md:w-12 bg-blue-500" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mission Data Card (Bottom Left) */}
      <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 z-40 w-[calc(100%-3rem)] sm:w-auto sm:max-w-[320px] md:max-w-sm">
        <div className="p-5 md:p-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl">
          <div className="flex gap-2 mb-4 md:mb-6">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-[8px] md:text-[10px] font-mono tracking-widest text-white/40 uppercase">
          LIVE MISSION DATA
        </span>
          </div>
          <p className="font-mono text-[9px] md:text-[10px] leading-relaxed text-white/60 mb-4 md:mb-6 uppercase tracking-wider line-clamp-3 sm:line-clamp-none">
        If you find yourself doing the same routine day after day, you are
        living on autopilot. Our mission is to push beyond the boundaries of
        the known.
          </p>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
        <a
          href="/neo"
          className="aspect-square flex flex-col items-center justify-center bg-white/5 rounded-lg border border-white/10 hover:border-blue-500/50 transition-colors group cursor-pointer"
        >
          <HugeiconsIcon
            icon={Camera02Icon}
            className="w-5 md:w-6 h-5 md:h-6 text-white/30 group-hover:text-blue-400"
          />
          <span className="mt-2 text-[8px] md:text-[10px] text-white/50 group-hover:text-blue-400 font-mono uppercase tracking-wide">
            NEO
          </span>
        </a>
        <button
          onClick={() => setApodOpen(true)}
          className="aspect-square flex flex-col items-center justify-center bg-white/5 rounded-lg border border-white/10 hover:border-blue-500/50 transition-colors group cursor-pointer"
        >
          <HugeiconsIcon
            icon={GlobeIcon}
            className="w-5 md:w-6 h-5 md:h-6 text-white/30 group-hover:text-blue-400"
          />
          <span className="mt-2 text-[8px] md:text-[10px] text-white/50 group-hover:text-blue-400 font-mono uppercase tracking-wide">
            APOD
          </span>
        </button>
          </div>
        </div>
      </div>

      {/* Rocket Launch Node (Bottom Right) */}
      <div className="absolute bottom-12 right-12 z-40 hidden lg:block">
        <div className="relative w-56 xl:w-64 h-72 xl:h-80 bg-white/2 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group">
          <div className="absolute top-4 left-4 z-20 flex flex-col">
            <span className="text-[9px] font-mono text-blue-400">
              LAUNCH SEQUENCE
            </span>
            <span className="text-[14px] font-bold tracking-tight">
              V-MARS II
            </span>
          </div>

          {/* Scanning Line */}
          <motion.div
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-px bg-blue-400/30 z-20 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />

          <motion.div className="absolute inset-0 flex items-end justify-center">
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
              transition={{ duration: 0.1, repeat: Infinity }}
              className="absolute bottom-[-10%] w-32 h-32 bg-orange-600 rounded-full blur-2xl opacity-20"
            />
            <motion.img
              animate={{ x: [-1, 1, -1] }}
              transition={{ duration: 0.05, repeat: Infinity }}
              src={rocket}
              className="w-full h-full object-contain object-bottom mix-blend-lighten"
            />
          </motion.div>
        </div>
      </div>

      <ApodModal
        open={apodOpen}
        onClose={() => setApodOpen(false)}
        date={apodDate}
        setDate={setApodDate}
      />
    </>
  );
}

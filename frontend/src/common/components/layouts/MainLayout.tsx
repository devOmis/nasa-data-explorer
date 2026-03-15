import type { ReactNode } from "react";
import { Loader } from "@/common/components/loader";
import { Error } from "@/common/components/error";
import { useAppStatus } from "@/hooks/useAppStatus";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import NASA_LOGO from "@/assets/vite.svg";
import { Link } from "react-router-dom";


import { useEffect } from "react";

export default function MainLayout({ children, allowScroll = false }: { children: ReactNode, allowScroll?: boolean }) {
  const { isLoaded, error, finishLoading } = useAppStatus();

  useEffect(() => {
    finishLoading();
  }, [finishLoading]);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 40, damping: 20 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const bgX = useTransform(springX, [0, 1], [20, -20]);
  const bgY = useTransform(springY, [0, 1], [20, -20]);

  if (error) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-red-500 font-mono uppercase tracking-tighter">
        <Error message={error} />
      </div>
    );
  }
  if (!isLoaded) {
    return (
      <div className="h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader />
          <span className="text-[10px] text-white/40 font-mono tracking-[0.5em] uppercase">
            Booting Mission Systems
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={
      `relative min-h-screen w-full bg-[#020202] text-white font-sans` +
      (allowScroll ? '' : ' overflow-hidden')
    }>
      {/* Background Starfield */}
      <motion.div
        style={{ x: bgX, y: bgY, backgroundImage: `url('image-todo)` }}
        className="absolute -inset-15 z-0 bg-cover bg-center opacity-30 mix-blend-screen scale-110"
      />

      {/* Futuristic HUD Scanning Lines */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* Nav */}
      <nav className="absolute top-0 w-full px-6 md:px-12 py-6 md:py-10 flex justify-between items-center z-50">
        <div className="flex gap-4 md:gap-8 items-center">
          <div className="h-px w-8 md:w-12 bg-white/10 hidden sm:block" />
          <span className="text-[8px] md:text-[9px] font-bold tracking-[0.3em] uppercase text-white/40 hidden xs:block">
            Sector 07
          </span>
        </div>

        <Link key="/" to="/">
        
          <img
            src={NASA_LOGO}
            alt="NASA"
            className="h-8 md:h-10 w-auto brightness-200"
          />
        </Link>

        <div className="flex items-center gap-4 md:gap-8"></div>
      </nav>

      {/* Main Content */}
      {children}
    </div>
  );
}

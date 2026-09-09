import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, MessageCircle, Send, Music2 } from 'lucide-react';

const slides = [
  { src: '/images/blog-1.jpg', caption: 'AI Agent Demo', tag: 'Tech' },
  { src: '/images/blog-2.jpg', caption: 'Product Launch Reel', tag: 'Marketing' },
  { src: '/images/blog-3.jpg', caption: 'Client Campaign', tag: 'Growth' },
];

export default function HeroPhoneMockup() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const slide = slides[index];

  return (
    <div className="relative flex items-center justify-center scale-[0.88] sm:scale-90 origin-center">
      {/* Soft glow behind phone */}
      <div className="absolute w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full bg-primary/20 blur-[70px] pointer-events-none" />

      {/* Phone frame — smaller so it sits mid-right without dominating */}
      <div className="relative w-[200px] sm:w-[220px] aspect-[9/19] rounded-[2.2rem] sm:rounded-[2.5rem] bg-[#1a1a1e] border-[2.5px] border-[#2a2a30] shadow-2xl shadow-black/50 overflow-hidden">
        {/* Side buttons */}
        <div className="absolute -left-[4px] top-24 w-[2.5px] h-7 rounded-l-sm bg-[#3a3a42]" />
        <div className="absolute -left-[4px] top-36 w-[2.5px] h-10 rounded-l-sm bg-[#3a3a42]" />
        <div className="absolute -right-[4px] top-32 w-[2.5px] h-14 rounded-r-sm bg-[#3a3a42]" />

        {/* Screen */}
        <div className="absolute inset-[5px] sm:inset-[6px] rounded-[1.8rem] sm:rounded-[2rem] overflow-hidden bg-black">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 w-16 sm:w-20 h-5 sm:h-6 rounded-full bg-black border border-white/5" />

          {/* Media stack */}
          <AnimatePresence mode="wait">
            <motion.img
              key={slide.src}
              src={slide.src}
              alt={slide.caption}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none z-10" />

          {/* Top label */}
          <div className="absolute top-10 left-0 right-0 z-20 flex justify-center">
            <span className="text-[10px] sm:text-xs font-semibold text-white/90 tracking-wide uppercase">
              Reels · {slide.tag}
            </span>
          </div>

          {/* Right-side social icons */}
          <div className="absolute right-2.5 bottom-20 z-20 flex flex-col items-center gap-3">
            <div className="flex flex-col items-center gap-0.5">
              <Heart className="w-5 h-5 text-white fill-white/20" />
              <span className="text-[8px] text-white/80">12.4K</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="text-[8px] text-white/80">842</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <Send className="w-4 h-4 text-white" />
              <span className="text-[8px] text-white/80">Share</span>
            </div>
          </div>

          {/* Bottom caption */}
          <div className="absolute left-3 right-14 bottom-6 z-20">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">WO</span>
              </div>
              <span className="text-xs font-semibold text-white">kasshit.in</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FFA3] animate-pulse" />
            </div>
            <p className="text-[11px] text-white/90 leading-snug line-clamp-2">{slide.caption}</p>
            <div className="flex items-center gap-1.5 mt-1.5 text-white/60">
              <Music2 className="w-3 h-3" />
              <span className="text-[9px] truncate">Original Audio · Kasshit</span>
            </div>
          </div>

          {/* Slide dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === index ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

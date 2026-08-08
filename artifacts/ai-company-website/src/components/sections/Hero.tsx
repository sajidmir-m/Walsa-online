import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroCanvas from './HeroCanvas';
import HeroPhoneMockup from './HeroPhoneMockup';
import { ArrowRight, Play } from 'lucide-react';
import { usePageSection } from '@/lib/pageContent';

const defaultHero = {
  badge: 'Technology & Marketing, Done Right',
  headline_prefix: 'We build',
  rotating_phrases: [
    'AI Agents',
    'Scalable Software',
    'High-Ranking SEO',
    'Growth Campaigns',
    'Mobile Apps',
  ],
  subheadline:
    'Our engineers build the agents and software. Our marketers make sure people find you — with SEO, content, and campaigns that compound.',
  cta_primary: 'Start a Project',
  cta_secondary: 'See Our Work',
  stats: [
    { value: 500, suffix: '+', label: 'Projects Delivered' },
    { value: 50, suffix: '+', label: 'AI Agents Built' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
    { value: 15, suffix: '+', label: 'Countries Served' },
  ],
};

const NumberCounter = ({
  end,
  duration = 2,
  suffix = '',
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export default function Hero() {
  const { data } = usePageSection('home', 'hero', defaultHero);
  const phrases = data.rotating_phrases?.length ? data.rotating_phrases : defaultHero.rotating_phrases;
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }, 2500);
    return () => clearInterval(id);
  }, [phrases.length]);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-background">
      <HeroCanvas />

      <div className="absolute top-1/4 left-1/4 w-[320px] h-[320px] bg-primary/12 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/3 w-[280px] h-[280px] bg-accent/8 rounded-full blur-[130px] pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-8 sm:px-12 lg:px-16 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20 xl:gap-28 items-center">
          <div className="max-w-md mx-auto lg:mx-0 lg:justify-self-end lg:pr-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FFA3] animate-pulse" />
              <span className="text-xs font-medium text-slate-300">{data.badge}</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold font-display leading-[1.15] mb-4">
              <span className="block text-white">{data.headline_prefix}</span>
              <span className="block relative h-[1.2em] mt-0.5 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phrases[phraseIndex % phrases.length]}
                    initial={{ y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -28, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-0 bg-gradient-to-r from-primary via-accent to-[#00FFA3] text-transparent bg-clip-text whitespace-nowrap"
                  >
                    {phrases[phraseIndex % phrases.length]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-sm sm:text-[15px] text-slate-400 mb-6 max-w-sm leading-relaxed"
            >
              {data.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-2.5 mb-8"
            >
              <a
                href="#contact"
                data-testid="btn-start-journey"
                className="group relative px-5 py-2.5 bg-white text-background rounded-full font-semibold overflow-hidden transition-transform hover:scale-105 text-sm text-center"
              >
                <span className="relative flex items-center justify-center gap-2">
                  {data.cta_primary}{' '}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a
                href="#clients"
                data-testid="btn-watch-demo"
                className="group flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm text-white font-medium text-sm"
              >
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 text-white fill-white" />
                </div>
                {data.cta_secondary}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5 border-t border-white/10"
            >
              {(data.stats?.length ? data.stats : defaultHero.stats).map((stat, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span className="text-xl sm:text-2xl font-bold font-display text-white">
                    <NumberCounter end={Number(stat.value)} suffix={stat.suffix} />
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end lg:pl-12 lg:pr-2"
          >
            <HeroPhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

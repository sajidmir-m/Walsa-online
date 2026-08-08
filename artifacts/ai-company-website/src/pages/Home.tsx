import React, { lazy, Suspense, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';

// Above the fold — loaded immediately.
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import TrustedBy from '@/components/sections/TrustedBy';

// Below the fold — separate chunk, starts loading in parallel right away but
// doesn't block the first paint of the hero.
const HomeDeferred = lazy(() => import('@/pages/HomeDeferred'));

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add('dark');

    // Lenis smooth scrolling only on desktop pointers. On touch devices it
    // interferes with native scrolling and burns CPU, so let the browser scroll.
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      mouseMultiplier: 1,
    } as any);

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground font-sans overflow-x-hidden w-full selection:bg-primary/30 selection:text-white">
      <CustomCursor />
      <ScrollProgress />

      <Navbar />

      <main id="body">
        <Hero />
        <TrustedBy />
        <Suspense fallback={<div className="min-h-screen" />}>
          <HomeDeferred />
        </Suspense>
      </main>
    </div>
  );
}

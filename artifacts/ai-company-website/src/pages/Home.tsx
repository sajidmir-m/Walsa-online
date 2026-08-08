import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';

// Sections
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import TrustedBy from '@/components/sections/TrustedBy';
import Services from '@/components/sections/Services';
import AISolutions from '@/components/sections/AISolutions';
import Portfolio from '@/components/sections/Portfolio';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Process from '@/components/sections/Process';
import TechStack from '@/components/sections/TechStack';
import Industries from '@/components/sections/Industries';
import Training from '@/components/sections/Training';
import DigitalMarketing from '@/components/sections/DigitalMarketing';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

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
        <Services />
        <AISolutions />
        <Portfolio />
        <WhyChooseUs />
        <Process />
        <TechStack />
        <Industries />
        <Training />
        <DigitalMarketing />
        <Testimonials />
        <FAQ />
        <Blog />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

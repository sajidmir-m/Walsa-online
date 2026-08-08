import React from 'react';

// Everything below the fold on the home page. Split out of the main bundle so
// the hero paints fast; this chunk streams in right after in parallel.
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

export default function HomeDeferred() {
  return (
    <>
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
      <Footer />
    </>
  );
}

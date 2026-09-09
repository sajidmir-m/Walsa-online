import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useWorks, workCoverSrc } from '@/lib/useWorks';

export default function Portfolio() {
  const [, setLocation] = useLocation();
  const { featured, works } = useWorks();
  const cases = (featured.length ? featured : works).slice(0, 4);

  return (
    <section id="portfolio" className="py-16 md:py-32 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Results That <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00FFA3]">Speak</span>
            </h2>
            <p className="text-slate-400 text-lg">
              We don't just write code; we ship real products. These platforms are live in production today.
            </p>
          </div>
          <button
            onClick={() => setLocation('/work')}
            className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/5 transition-colors font-medium text-white self-start shrink-0"
          >
            View All Work →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group rounded-3xl bg-[#08111F] border border-white/5 overflow-hidden flex flex-col sm:h-[500px]"
            >
              <div className={`flex-1 bg-gradient-to-b ${item.color.split(' ')[0]} to-transparent relative p-8 flex flex-col items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <motion.a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${item.title}`}
                  className="w-full max-w-[80%] aspect-video bg-[#0F172A] rounded-t-xl border border-white/10 shadow-2xl relative overflow-hidden block"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="h-6 border-b border-white/5 flex items-center px-3 gap-1.5 bg-[#050816]">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="ml-2 text-[10px] text-slate-500 truncate">{item.domain}</span>
                  </div>
                  <img
                    src={workCoverSrc(item)}
                    alt={`${item.title} website screenshot`}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    className="w-full h-full object-cover object-top"
                  />
                </motion.a>
              </div>

              <div className="p-5 sm:p-8 bg-[#050816] z-10 border-t border-white/5">
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 uppercase tracking-wider w-fit">
                    {item.industry}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-bold hover:underline"
                  >
                    {item.domain}
                  </a>
                </div>
                <h3 className="text-2xl font-bold font-display mb-2 text-white">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

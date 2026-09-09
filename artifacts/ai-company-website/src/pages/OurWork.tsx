import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { WORK_CATEGORIES } from '@/data/works';
import { useWorks, workCoverSrc } from '@/lib/useWorks';

function ProjectVisual({
  url,
  title,
  color,
  imageUrl,
}: {
  url: string;
  title: string;
  color: string;
  imageUrl: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = workCoverSrc({ url, imageUrl });

  return (
    <div className={`h-44 sm:h-52 bg-gradient-to-br ${color} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
      {!failed && src && (
        <img
          src={src}
          alt={`${title} website screenshot`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08111F] via-transparent to-transparent" />
    </div>
  );
}

export default function OurWork() {
  const [, setLocation] = useLocation();
  const [active, setActive] = useState('All');
  const { works } = useWorks();

  const categories = useMemo(() => {
    const present = new Set(works.map((w) => w.category));
    return WORK_CATEGORIES.filter((c) => c === 'All' || present.has(c));
  }, [works]);

  const filtered = active === 'All' ? works : works.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#050816]/90 backdrop-blur-md border-b border-white/5 flex items-center px-5">
        <button
          onClick={() => setLocation('/')}
          className="flex items-center group cursor-pointer bg-transparent border-none p-0 mr-6"
          aria-label="Kasshit home"
        >
          <img
            src="/logo.png"
            alt="Kasshit"
            className="h-11 w-auto object-contain rounded-md transition-transform group-hover:scale-105 duration-300"
          />
        </button>

        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="hidden sm:block">Our Work</span>
        </div>

        <button
          onClick={() => setLocation('/')}
          className="ml-auto flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:block">Back to Home</span>
        </button>
      </header>

      <main className="pt-24 pb-20 px-5 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-4 leading-tight">
            Our <span className="bg-gradient-to-r from-primary to-[#00FFA3] text-transparent bg-clip-text">Work</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Real websites, live in production. Explore the platforms we have built for brands across e-commerce, travel, education, and more.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                active === cat
                  ? 'bg-primary border-primary text-white'
                  : 'bg-transparent border-white/10 text-slate-400 hover:text-white hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map((item, i) => (
            <motion.div
              key={item.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`group rounded-2xl bg-[#08111F] border border-white/5 ${item.border} transition-all overflow-hidden flex flex-col`}
            >
              <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${item.title}`}>
                <ProjectVisual url={item.url} title={item.title} color={item.color} imageUrl={item.imageUrl} />
              </a>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {item.industry}
                  </span>
                  <span className={`text-xs font-bold ${item.accent}`}>{item.domain}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display mb-2 text-white">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">{item.description}</p>

                <div className="flex flex-wrap items-center gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-white/5 text-xs text-slate-500 border border-white/5">
                      {tag}
                    </span>
                  ))}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`ml-auto inline-flex items-center gap-1.5 text-xs font-semibold ${item.accent} hover:underline`}
                  >
                    Visit site <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center text-slate-500 py-16 text-sm">No projects in this category yet.</div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 rounded-3xl bg-gradient-to-br from-primary/10 via-[#8B5CF6]/10 to-[#00FFA3]/10 border border-white/5 p-10 sm:p-16 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display mb-4 text-white">
            Ready to be our next success story?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Tell us about your challenge and we will design a solution built around your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setLocation('/')}
              className="px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
            >
              Start a Project
            </button>
            <button
              onClick={() => setLocation('/services')}
              className="px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
            >
              View Services
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useParams } from 'wouter';
import { ArrowRight, CheckCircle2, Megaphone } from 'lucide-react';
import ServicesLayout from '@/pages/ServicesLayout';
import { useMarketingService } from '@/lib/useMarketingServices';
import NotFound from '@/pages/not-found';

const accentStyles: Record<
  string,
  { badge: string; iconBg: string; icon: string; border: string; button: string; gradient: string }
> = {
  purple: {
    badge: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    iconBg: 'bg-purple-500/10',
    icon: 'text-purple-400',
    border: 'hover:border-purple-500/30',
    button: 'bg-purple-500 hover:bg-purple-500/90',
    gradient: 'from-purple-400 to-fuchsia-400',
  },
  fuchsia: {
    badge: 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400',
    iconBg: 'bg-fuchsia-500/10',
    icon: 'text-fuchsia-400',
    border: 'hover:border-fuchsia-500/30',
    button: 'bg-fuchsia-500 hover:bg-fuchsia-500/90',
    gradient: 'from-fuchsia-400 to-pink-400',
  },
  pink: {
    badge: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
    iconBg: 'bg-pink-500/10',
    icon: 'text-pink-400',
    border: 'hover:border-pink-500/30',
    button: 'bg-pink-500 hover:bg-pink-500/90',
    gradient: 'from-pink-400 to-rose-400',
  },
  rose: {
    badge: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    iconBg: 'bg-rose-500/10',
    icon: 'text-rose-400',
    border: 'hover:border-rose-500/30',
    button: 'bg-rose-500 hover:bg-rose-500/90',
    gradient: 'from-rose-400 to-orange-400',
  },
  emerald: {
    badge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    icon: 'text-emerald-400',
    border: 'hover:border-emerald-500/30',
    button: 'bg-emerald-500 hover:bg-emerald-500/90',
    gradient: 'from-emerald-400 to-teal-400',
  },
  cyan: {
    badge: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    icon: 'text-cyan-400',
    border: 'hover:border-cyan-500/30',
    button: 'bg-cyan-500 hover:bg-cyan-500/90',
    gradient: 'from-cyan-400 to-sky-400',
  },
  violet: {
    badge: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
    iconBg: 'bg-violet-500/10',
    icon: 'text-violet-400',
    border: 'hover:border-violet-500/30',
    button: 'bg-violet-500 hover:bg-violet-500/90',
    gradient: 'from-violet-400 to-purple-400',
  },
  blue: {
    badge: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    iconBg: 'bg-blue-500/10',
    icon: 'text-blue-400',
    border: 'hover:border-blue-500/30',
    button: 'bg-blue-500 hover:bg-blue-500/90',
    gradient: 'from-blue-400 to-indigo-400',
  },
  indigo: {
    badge: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
    iconBg: 'bg-indigo-500/10',
    icon: 'text-indigo-400',
    border: 'hover:border-indigo-500/30',
    button: 'bg-indigo-500 hover:bg-indigo-500/90',
    gradient: 'from-indigo-400 to-purple-400',
  },
};

export default function MarketingDetail() {
  const params = useParams<{ slug?: string }>();
  const [location, setLocation] = useLocation();
  const slug =
    params.slug ??
    (location.startsWith('/services/marketing/')
      ? location.slice('/services/marketing/'.length)
      : '');
  const { service, loading, all } = useMarketingService(slug);

  if (!loading && !service) {
    return <NotFound />;
  }

  if (!service) {
    return (
      <ServicesLayout>
        <div className="p-8 max-w-4xl mx-auto text-slate-400">Loading…</div>
      </ServicesLayout>
    );
  }

  const styles = accentStyles[service.accent] ?? accentStyles.purple;
  const Icon = service.icon;
  const others = all.filter((s) => s.slug !== service.slug);

  return (
    <ServicesLayout>
      <div className="p-5 sm:p-8 max-w-4xl mx-auto">
        <motion.div
          key={service.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => setLocation('/services/marketing')}
            className="text-sm text-slate-500 hover:text-white mb-6 bg-transparent border-none cursor-pointer inline-flex items-center gap-1"
          >
            ← All Marketing Solutions
          </button>

          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-6 ${styles.badge}`}
          >
            <Icon className="w-4 h-4" />
            Marketing Solution
          </div>

          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 leading-tight text-white">
            {service.title}
          </h1>
          <p
            className={`text-xl font-medium mb-4 bg-gradient-to-r ${styles.gradient} text-transparent bg-clip-text`}
          >
            {service.tagline}
          </p>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed mb-10">
            {service.description}
          </p>

          <div className="rounded-2xl bg-[#08111F] border border-white/5 p-6 sm:p-8 mb-10">
            <h2 className="text-xl font-bold font-display text-white mb-6">What&apos;s Included</h2>
            <ul className="space-y-3">
              {service.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${styles.icon}`} />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-[#08111F] border border-white/5 p-6 mb-12">
            <div className="flex items-start gap-3">
              <Megaphone className={`w-5 h-5 mt-0.5 shrink-0 ${styles.icon}`} />
              <p className="text-slate-400 text-sm leading-relaxed">
                Managed by <span className="text-white font-medium">Kasshit</span> — from planning
                to execution and reporting — so you can focus on running your business while we grow
                this part of your brand.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-16">
            <button
              className={`px-6 py-3 rounded-full text-white font-medium transition-colors flex items-center gap-2 ${styles.button}`}
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLocation('/services/marketing')}
              className="px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
            >
              View All Services
            </button>
          </div>

          <div>
            <h3 className="text-lg font-bold font-display text-white mb-4">Other Marketing Solutions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {others.map((other) => {
                const OtherIcon = other.icon;
                return (
                  <button
                    key={other.slug}
                    onClick={() => setLocation(`/services/marketing/${other.slug}`)}
                    className={`flex items-center gap-3 p-4 rounded-xl bg-[#08111F] border border-white/5 text-left transition-colors ${styles.border} bg-transparent cursor-pointer`}
                  >
                    <div className={`w-9 h-9 rounded-lg ${styles.iconBg} flex items-center justify-center shrink-0`}>
                      <OtherIcon className={`w-4 h-4 ${styles.icon}`} />
                    </div>
                    <span className="text-sm font-medium text-slate-300">{other.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </ServicesLayout>
  );
}

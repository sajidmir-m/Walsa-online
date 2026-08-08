import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Megaphone, ArrowRight, CheckCircle2 } from 'lucide-react';
import ServicesLayout from '@/pages/ServicesLayout';
import { useMarketingServices } from '@/lib/useMarketingServices';
import { usePageSection } from '@/lib/pageContent';

const defaultIntro = {
  badge: 'Marketing Solution',
  headline: 'Digital Marketing',
  headline_highlight: 'That Grows Brands',
  body: "Choose a service below to see exactly what's included — Social Media, Content Creation, SEO, Ads, Strategy, and more — each managed end-to-end by WALSA ONLINE.",
};

export default function MarketingService() {
  const [, setLocation] = useLocation();
  const { services: marketingServices } = useMarketingServices();
  const { data: intro } = usePageSection('marketing', 'intro', defaultIntro);

  return (
    <ServicesLayout>
      <div className="p-5 sm:p-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
            <Megaphone className="w-4 h-4" /> {intro.badge}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
            {intro.headline}
            <span className="block bg-gradient-to-r from-purple-400 to-fuchsia-400 text-transparent bg-clip-text">
              {intro.headline_highlight}
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">{intro.body}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {marketingServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.button
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                onClick={() => setLocation(`/services/marketing/${service.slug}`)}
                className="group text-left p-5 rounded-2xl bg-[#08111F] border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer bg-transparent"
                data-testid={`marketing-card-${service.slug}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-white font-semibold font-display">{service.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{service.tagline}</p>
                <ul className="space-y-1.5 mb-4">
                  {service.items.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-slate-500">
                      <CheckCircle2 className="w-3 h-3 text-purple-400/60 mt-0.5 shrink-0" />
                      <span className="line-clamp-1">{item}</span>
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-400">
                  View full details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="rounded-3xl bg-[#08111F] border border-purple-500/20 p-8 sm:p-10 mb-12">
          <h2 className="text-2xl font-bold font-display mb-4 text-white">
            Complete Management by WALSA ONLINE
          </h2>
          <p className="text-slate-400 leading-relaxed max-w-3xl">
            From content planning to shooting, editing, designing, posting, advertising, optimization,
            and performance monitoring — every aspect of your digital marketing is professionally managed
            by WALSA ONLINE, allowing you to focus on running your business while we focus on growing
            your brand.
          </p>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-purple-500/10 via-fuchsia-500/10 to-primary/10 border border-purple-500/10 p-10 text-center">
          <h2 className="text-3xl font-bold font-display mb-4 text-white">Ready to Accelerate Growth?</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            Get a free audit of your current marketing and a custom growth roadmap.
          </p>
          <button
            className="px-8 py-4 rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-500/90 transition-colors"
            data-testid="btn-marketing-cta"
          >
            Get My Free Audit
          </button>
        </div>
      </div>
    </ServicesLayout>
  );
}

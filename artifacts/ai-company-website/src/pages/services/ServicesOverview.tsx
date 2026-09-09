import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Brain, Code2, Smartphone, Paintbrush, Megaphone, Cloud, ArrowRight } from 'lucide-react';
import ServicesLayout, { serviceNav } from '@/pages/ServicesLayout';

const icons = [Brain, Code2, Smartphone, Paintbrush, Megaphone, Cloud];
const colors = [
  { bg: 'bg-blue-500/10', text: 'text-blue-400', hover: 'hover:border-blue-500/30' },
  { bg: 'bg-emerald-500/10', text: 'text-emerald-400', hover: 'hover:border-emerald-500/30' },
  { bg: 'bg-orange-500/10', text: 'text-orange-400', hover: 'hover:border-orange-500/30' },
  { bg: 'bg-pink-500/10', text: 'text-pink-400', hover: 'hover:border-pink-500/30' },
  { bg: 'bg-purple-500/10', text: 'text-purple-400', hover: 'hover:border-purple-500/30' },
  { bg: 'bg-cyan-500/10', text: 'text-cyan-400', hover: 'hover:border-cyan-500/30' },
];

const descriptions = [
  'AI Agents, Voice Agents, Chatbots, Automation, Integrations, Consulting',
  'Custom Websites, SaaS, E-Commerce, CRM, ERP, Web Apps',
  'iOS, Android, React Native, Flutter, Cross-Platform Apps',
  'UX Research, Wireframing, Prototyping, Branding, Design Systems',
  'SEO, Google & Meta Ads, Social Media, Email, WhatsApp, Analytics',
  'AWS, Azure, GCP, DevOps, Docker, Kubernetes, API Development',
];

export default function ServicesOverview() {
  const [, setLocation] = useLocation();
  return (
    <ServicesLayout>
      <div className="p-5 sm:p-8 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
            Everything You Need to
            <span className="block bg-gradient-to-r from-primary to-[#00FFA3] text-transparent bg-clip-text">Transform Digitally</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Kasshit provides complete digital transformation under one roof — from cutting-edge AI to cloud infrastructure, mobile apps, and growth marketing. Select a service to explore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceNav.map((service, i) => {
            const Icon = icons[i];
            const color = colors[i];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setLocation(service.slug)}
                className={`group rounded-2xl bg-[#08111F] border border-white/5 ${color.hover} p-6 cursor-pointer transition-all hover:-translate-y-1`}
                data-testid={`service-card-${service.slug.split('/').pop()}`}
              >
                <div className={`w-12 h-12 rounded-xl ${color.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${color.text}`} />
                </div>
                <h3 className="text-white font-bold text-lg font-display mb-2">{service.title}</h3>
                <p className="text-slate-500 text-sm mb-5 leading-relaxed">{descriptions[i]}</p>
                <div className={`flex items-center gap-2 text-sm font-medium ${color.text}`}>
                  Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </ServicesLayout>
  );
}

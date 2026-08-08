import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft, ExternalLink, Brain, Code2, Smartphone, Paintbrush, Megaphone, Cloud } from 'lucide-react';

const categories = ['All', 'AI', 'Software', 'Mobile', 'UI/UX', 'Marketing', 'Cloud'];

const projects = [
  {
    category: 'AI',
    industry: 'FinTech',
    title: 'AI-Powered Risk Assessment Engine',
    description: 'Rebuilt the core underwriting engine using real-time machine learning, reducing default rates while processing 10× more applications with the same team.',
    metric: '340% ROI Increase',
    metric2: '10× Throughput',
    color: 'from-blue-500/20 to-indigo-500/10',
    accent: 'text-blue-400',
    border: 'hover:border-blue-500/30',
    tags: ['LangChain', 'Python', 'FastAPI', 'ML'],
  },
  {
    category: 'AI',
    industry: 'E-Commerce',
    title: 'Predictive Supply Chain Automation',
    description: 'Developed an autonomous inventory management system that predicts demand spikes 30 days ahead and automates supplier ordering.',
    metric: '45% Cost Reduction',
    metric2: '30-Day Forecast',
    color: 'from-purple-500/20 to-violet-500/10',
    accent: 'text-purple-400',
    border: 'hover:border-purple-500/30',
    tags: ['Python', 'TensorFlow', 'n8n', 'AWS'],
  },
  {
    category: 'AI',
    industry: 'Healthcare',
    title: 'Patient Triage AI Assistant',
    description: 'Implemented an NLP chatbot for initial patient assessment, reducing average wait times by 60% and optimizing doctor schedules dynamically.',
    metric: '2M+ Patients Served',
    metric2: '60% Faster Triage',
    color: 'from-emerald-500/20 to-teal-500/10',
    accent: 'text-emerald-400',
    border: 'hover:border-emerald-500/30',
    tags: ['OpenAI', 'RAG', 'Node.js', 'PostgreSQL'],
  },
  {
    category: 'Software',
    industry: 'SaaS',
    title: 'Intelligent Analytics Dashboard',
    description: 'Transformed raw data streams into actionable insights with generative reports, custom anomaly detection, and real-time alerting.',
    metric: '12× Faster Reporting',
    metric2: '99.9% Uptime',
    color: 'from-orange-500/20 to-amber-500/10',
    accent: 'text-orange-400',
    border: 'hover:border-orange-500/30',
    tags: ['React', 'Next.js', 'D3.js', 'Redis'],
  },
  {
    category: 'Mobile',
    industry: 'Logistics',
    title: 'Fleet Management Mobile App',
    description: 'Built a cross-platform driver and dispatch app with real-time GPS tracking, route optimization, and push notification alerts.',
    metric: '35% Fuel Savings',
    metric2: '50K+ Downloads',
    color: 'from-cyan-500/20 to-sky-500/10',
    accent: 'text-cyan-400',
    border: 'hover:border-cyan-500/30',
    tags: ['React Native', 'Expo', 'Firebase', 'Maps API'],
  },
  {
    category: 'UI/UX',
    industry: 'EdTech',
    title: 'Learning Platform Redesign',
    description: 'Full UX overhaul of an online learning platform — from user research to final Figma deliverables — resulting in a dramatic engagement lift.',
    metric: '82% Engagement Lift',
    metric2: '4.9★ App Rating',
    color: 'from-pink-500/20 to-rose-500/10',
    accent: 'text-pink-400',
    border: 'hover:border-pink-500/30',
    tags: ['Figma', 'UX Research', 'Prototyping', 'Design System'],
  },
  {
    category: 'Marketing',
    industry: 'D2C Brand',
    title: 'Full-Funnel Growth Campaign',
    description: 'Ran integrated SEO, Meta Ads, and email automation campaigns that tripled monthly recurring revenue in under six months.',
    metric: '3× Revenue Growth',
    metric2: '220% ROAS',
    color: 'from-fuchsia-500/20 to-purple-500/10',
    accent: 'text-fuchsia-400',
    border: 'hover:border-fuchsia-500/30',
    tags: ['Meta Ads', 'Google Ads', 'SEO', 'Email Marketing'],
  },
  {
    category: 'Cloud',
    industry: 'FinServ',
    title: 'AWS Multi-Region Migration',
    description: 'Migrated a monolithic on-premise banking system to a multi-region AWS architecture with zero-downtime deployment and full CI/CD automation.',
    metric: '99.99% Availability',
    metric2: '60% Infra Cost Cut',
    color: 'from-teal-500/20 to-cyan-500/10',
    accent: 'text-teal-400',
    border: 'hover:border-teal-500/30',
    tags: ['AWS', 'Terraform', 'Docker', 'GitHub Actions'],
  },
];

export default function OurWork() {
  const [, setLocation] = useLocation();
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#050816]/90 backdrop-blur-md border-b border-white/5 flex items-center px-5">
        <button
          onClick={() => setLocation('/')}
          className="flex items-center group cursor-pointer bg-transparent border-none p-0 mr-6"
          aria-label="WALSA ONLINE home"
        >
          <img
            src="/logo.png"
            alt="WALSA ONLINE"
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
        {/* Hero text */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-4 leading-tight">
            Our <span className="bg-gradient-to-r from-primary to-[#00FFA3] text-transparent bg-clip-text">Work</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Real problems. Real results. A collection of our most impactful projects across AI, software, mobile, design, marketing, and cloud.
          </p>
        </motion.div>

        {/* Filter tabs */}
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

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6"
        >
          {filtered.map((item, i) => (
            <motion.div
              key={item.title}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`group rounded-2xl bg-[#08111F] border border-white/5 ${item.border} transition-all overflow-hidden flex flex-col`}
            >
              {/* Card visual */}
              <div className={`h-44 sm:h-52 bg-gradient-to-br ${item.color} relative flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
                {/* Mock browser window */}
                <div className="w-[80%] aspect-video bg-[#0F172A] rounded-t-lg border border-white/10 shadow-2xl overflow-hidden transform group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="h-5 border-b border-white/5 flex items-center px-2 gap-1 bg-[#050816]">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  </div>
                  <div className="p-3 flex gap-3 h-full">
                    <div className="w-1/4 h-full rounded bg-white/5" />
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="h-3 w-1/2 rounded bg-white/10" />
                      <div className="h-12 w-full rounded bg-white/5 mt-1" />
                      <div className="flex-1 w-full rounded bg-white/5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {item.industry}
                  </span>
                  <div className="flex flex-wrap gap-3">
                    <span className={`text-xs font-bold ${item.accent}`}>{item.metric}</span>
                    <span className="text-xs font-bold text-slate-500">{item.metric2}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display mb-2 text-white">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">{item.description}</p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-white/5 text-xs text-slate-500 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
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

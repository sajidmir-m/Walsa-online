import React from 'react';
import { motion } from 'framer-motion';
import { Paintbrush, Search, LayoutTemplate, PlaySquare, Monitor, Smartphone, Grid, Award, ArrowRight } from 'lucide-react';
import ServicesLayout from '@/pages/ServicesLayout';

const offerings = [
  { icon: Search, title: 'UX Research', desc: 'User interviews, usability testing, heatmaps, and journey mapping to uncover what your users actually need.' },
  { icon: LayoutTemplate, title: 'Wireframing', desc: 'Low-fidelity blueprints that align stakeholders before a single pixel is designed.' },
  { icon: PlaySquare, title: 'Prototyping', desc: 'Interactive, clickable prototypes that feel real — ideal for user testing and investor demos.' },
  { icon: Monitor, title: 'Web UI Design', desc: 'Pixel-perfect, responsive web interfaces designed in Figma with developer-ready handoffs.' },
  { icon: Smartphone, title: 'Mobile UI Design', desc: 'Native-feeling mobile screens optimized for iOS and Android human interface guidelines.' },
  { icon: Grid, title: 'Dashboard Design', desc: 'Data-rich dashboard layouts that make complex information immediately clear and actionable.' },
  { icon: Award, title: 'Branding & Logo Design', desc: 'Logo marks, typography systems, and brand identity packages that position you as premium.' },
  { icon: Paintbrush, title: 'Design Systems', desc: 'Scalable component libraries and token-based design systems that keep your product consistent.' },
];

const tools = ['Figma', 'FigJam', 'Framer', 'Principle', 'Maze', 'Hotjar', 'Lottie', 'Zeplin'];

export default function UIUXService() {
  return (
    <ServicesLayout>
      <div className="p-8 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-6">
            <Paintbrush className="w-4 h-4" /> UI/UX Design
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
            Interfaces That
            <span className="block bg-gradient-to-r from-pink-400 to-rose-400 text-transparent bg-clip-text">People Remember</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Great design is the difference between software that gets adopted and software that gets abandoned. We design digital experiences that are intuitive, beautiful, and conversion-focused.
          </p>
          <div className="flex gap-4 mt-8">
            <button className="px-6 py-3 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-500/90 transition-colors flex items-center gap-2" data-testid="btn-uiux-get-started">
              Start a Design Project <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors" data-testid="btn-uiux-portfolio">
              View Portfolio
            </button>
          </div>
        </motion.div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold font-display mb-8 text-white">Design Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {offerings.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex gap-4 p-5 rounded-2xl bg-[#08111F] border border-white/5 hover:border-pink-500/20 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center shrink-0 group-hover:bg-pink-500/20 transition-colors">
                  <item.icon className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold font-display mb-6 text-white">Our Design Tools</h2>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-[#08111F] border border-white/10 text-slate-300 text-sm font-medium hover:border-pink-500/40 transition-colors">{tool}</span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-pink-500/10 via-rose-500/10 to-primary/10 border border-pink-500/10 p-10 text-center">
          <h2 className="text-3xl font-bold font-display mb-4 text-white">Let's Design Something Extraordinary</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">Share your vision and we will craft an interface your users will love.</p>
          <button className="px-8 py-4 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-500/90 transition-colors" data-testid="btn-uiux-cta">
            Book a Free Consultation
          </button>
        </div>
      </div>
    </ServicesLayout>
  );
}

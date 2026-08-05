import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Apple, Layers, Zap, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import ServicesLayout from '@/pages/ServicesLayout';

const offerings = [
  { icon: Apple, title: 'iOS Applications', desc: 'Polished, App Store-ready iOS apps built with Swift and React Native for premium Apple experiences.' },
  { icon: Smartphone, title: 'Android Applications', desc: 'High-performance Android apps designed for the full range of devices and screen sizes.' },
  { icon: Layers, title: 'Cross-Platform Apps', desc: 'Single codebase, two platforms. Reach iOS and Android users simultaneously without doubling cost.' },
  { icon: Zap, title: 'Flutter Development', desc: "Google's UI toolkit for natively compiled, beautifully crafted apps from a single codebase." },
  { icon: Star, title: 'React Native Development', desc: 'JavaScript-powered native apps that leverage web development skills and rich community libraries.' },
  { icon: ShieldCheck, title: 'App Store Optimization', desc: 'Keyword research, creative assets, and review strategies to rank and convert in app stores.' },
];

const techStack = ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase', 'RevenueCat', 'App Store Connect', 'Google Play Console'];

export default function MobileService() {
  return (
    <ServicesLayout>
      <div className="p-8 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
            <Smartphone className="w-4 h-4" /> Mobile Development
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
            Apps Your Users
            <span className="block bg-gradient-to-r from-orange-400 to-red-400 text-transparent bg-clip-text">Will Love to Open</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            We craft beautiful, fast mobile applications for iOS and Android — from consumer apps to enterprise tools — that earn five-star reviews and drive retention.
          </p>
          <div className="flex gap-4 mt-8">
            <button className="px-6 py-3 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-500/90 transition-colors flex items-center gap-2" data-testid="btn-mobile-get-started">
              Start Your App <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors" data-testid="btn-mobile-portfolio">
              View Projects
            </button>
          </div>
        </motion.div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold font-display mb-8 text-white">Our Mobile Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {offerings.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex gap-4 p-5 rounded-2xl bg-[#08111F] border border-white/5 hover:border-orange-500/20 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-colors">
                  <item.icon className="w-5 h-5 text-orange-400" />
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
          <h2 className="text-2xl font-bold font-display mb-6 text-white">Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-[#08111F] border border-white/10 text-slate-300 text-sm font-medium hover:border-orange-500/40 transition-colors">{tech}</span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-orange-500/10 via-red-500/10 to-primary/10 border border-orange-500/10 p-10 text-center">
          <h2 className="text-3xl font-bold font-display mb-4 text-white">Ready to Launch Your App?</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">From idea to App Store — we handle the full journey.</p>
          <button className="px-8 py-4 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-500/90 transition-colors" data-testid="btn-mobile-cta">
            Book a Free Consultation
          </button>
        </div>
      </div>
    </ServicesLayout>
  );
}

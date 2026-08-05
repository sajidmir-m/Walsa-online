import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Search, Target, Share2, Mail, BarChart, Users, MessageCircle, ArrowRight } from 'lucide-react';
import ServicesLayout from '@/pages/ServicesLayout';

const offerings = [
  { icon: Search, title: 'SEO & Technical SEO', desc: 'On-page, off-page, and technical SEO strategies that move you up Google rankings and keep you there.' },
  { icon: Target, title: 'Google & Meta Ads', desc: 'Performance-driven paid campaigns with precise targeting, A/B testing, and relentless optimization.' },
  { icon: Share2, title: 'Social Media Management', desc: 'Content calendars, community management, and growth strategies across Instagram, LinkedIn, YouTube, and more.' },
  { icon: Mail, title: 'Email Marketing', desc: 'Automated drip campaigns, segmented newsletters, and lifecycle email flows that nurture leads into customers.' },
  { icon: MessageCircle, title: 'WhatsApp Marketing', desc: 'Broadcast campaigns and automated WhatsApp workflows to engage customers on the channel they use most.' },
  { icon: BarChart, title: 'Analytics & Reporting', desc: 'Custom dashboards tracking every touchpoint — from first click to conversion — with clear recommendations.' },
  { icon: Users, title: 'Lead Generation', desc: 'Inbound and outbound funnels designed to fill your pipeline with qualified prospects ready to buy.' },
  { icon: Megaphone, title: 'Content Marketing', desc: 'Blog posts, videos, and thought leadership content that builds authority and drives organic traffic.' },
];

const channels = ['Google Ads', 'Meta Ads', 'Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'WhatsApp', 'Email', 'SEO', 'Content'];

export default function MarketingService() {
  return (
    <ServicesLayout>
      <div className="p-8 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
            <Megaphone className="w-4 h-4" /> Digital Marketing
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
            Growth That Is
            <span className="block bg-gradient-to-r from-purple-400 to-fuchsia-400 text-transparent bg-clip-text">Data-Driven</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            We run marketing that works — full-funnel strategies combining SEO, paid ads, social media, and automation to bring in traffic, convert leads, and build your brand.
          </p>
          <div className="flex gap-4 mt-8">
            <button className="px-6 py-3 rounded-full bg-purple-500 text-white font-medium hover:bg-purple-500/90 transition-colors flex items-center gap-2" data-testid="btn-marketing-get-started">
              Grow My Brand <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors" data-testid="btn-marketing-audit">
              Free Marketing Audit
            </button>
          </div>
        </motion.div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold font-display mb-8 text-white">Our Marketing Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {offerings.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex gap-4 p-5 rounded-2xl bg-[#08111F] border border-white/5 hover:border-purple-500/20 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-colors">
                  <item.icon className="w-5 h-5 text-purple-400" />
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
          <h2 className="text-2xl font-bold font-display mb-6 text-white">Channels We Master</h2>
          <div className="flex flex-wrap gap-3">
            {channels.map((ch, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-[#08111F] border border-white/10 text-slate-300 text-sm font-medium hover:border-purple-500/40 transition-colors">{ch}</span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-purple-500/10 via-fuchsia-500/10 to-primary/10 border border-purple-500/10 p-10 text-center">
          <h2 className="text-3xl font-bold font-display mb-4 text-white">Ready to Accelerate Growth?</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">Get a free audit of your current marketing and a custom growth roadmap.</p>
          <button className="px-8 py-4 rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-500/90 transition-colors" data-testid="btn-marketing-cta">
            Get My Free Audit
          </button>
        </div>
      </div>
    </ServicesLayout>
  );
}

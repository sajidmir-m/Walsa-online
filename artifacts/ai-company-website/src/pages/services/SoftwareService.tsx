import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, ShoppingCart, Layout, Server, BarChart2, Shield, Layers, ArrowRight } from 'lucide-react';
import ServicesLayout from '@/pages/ServicesLayout';

const offerings = [
  { icon: Globe, title: 'Custom Websites', desc: 'Bespoke business and portfolio websites engineered for performance, accessibility, and brand impact.' },
  { icon: ShoppingCart, title: 'E-Commerce Platforms', desc: 'Feature-rich online stores with payment gateways, inventory management, and conversion optimization.' },
  { icon: Layout, title: 'Landing Pages', desc: 'High-converting landing pages designed and built to drive sign-ups, demos, and purchases.' },
  { icon: Server, title: 'SaaS Platforms', desc: 'Full-featured SaaS applications with subscription billing, multi-tenancy, and role-based access.' },
  { icon: BarChart2, title: 'Dashboards & Admin Panels', desc: 'Real-time analytics dashboards and internal admin tools tailored to your operations.' },
  { icon: Layers, title: 'CRM & ERP Systems', desc: 'Custom CRM and ERP solutions built around your workflows — not the other way around.' },
  { icon: Code2, title: 'Web Applications', desc: 'Complex, interactive web apps including PWAs, real-time collaboration tools, and workflow engines.' },
  { icon: Shield, title: 'API Development', desc: 'Robust REST and GraphQL APIs with authentication, rate limiting, and full documentation.' },
];

const techStack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'GraphQL', 'REST APIs', 'Redis', 'Supabase', 'Firebase', 'Stripe'];

export default function SoftwareService() {
  return (
    <ServicesLayout>
      <div className="p-5 sm:p-8 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <Code2 className="w-4 h-4" /> Software Development
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
            Software Built to
            <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">Scale With You</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            From custom websites to enterprise SaaS platforms, we engineer software that is fast, secure, and built to grow. Every line of code is a business decision.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button className="px-6 py-3 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-500/90 transition-colors flex items-center gap-2" data-testid="btn-software-get-started">
              Start a Project <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors" data-testid="btn-software-portfolio">
              View Portfolio
            </button>
          </div>
        </motion.div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold font-display mb-8 text-white">What We Build</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {offerings.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex gap-4 p-5 rounded-2xl bg-[#08111F] border border-white/5 hover:border-emerald-500/20 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <item.icon className="w-5 h-5 text-emerald-400" />
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
          <h2 className="text-2xl font-bold font-display mb-6 text-white">Our Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-[#08111F] border border-white/10 text-slate-300 text-sm font-medium hover:border-emerald-500/40 transition-colors">{tech}</span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-primary/10 border border-emerald-500/10 p-10 text-center">
          <h2 className="text-3xl font-bold font-display mb-4 text-white">Let's Build Something Great</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">Share your idea and we will turn it into software that stands out.</p>
          <button className="px-8 py-4 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-500/90 transition-colors" data-testid="btn-software-cta">
            Book a Free Consultation
          </button>
        </div>
      </div>
    </ServicesLayout>
  );
}

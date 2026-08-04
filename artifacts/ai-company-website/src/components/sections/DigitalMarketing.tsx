import React from 'react';
import { motion } from 'framer-motion';
import { Target, Search, Share2, Mail, BarChart, Users } from 'lucide-react';

const services = [
  { icon: Search, title: "SEO Optimization", desc: "Data-driven organic growth strategies to dominate search rankings." },
  { icon: Target, title: "Paid Advertising", desc: "High-converting Google & Meta ad campaigns with strict ROI focus." },
  { icon: Share2, title: "Social Media", desc: "Brand building and community management across all major platforms." },
  { icon: Mail, title: "Email Marketing", desc: "Automated nurture sequences and targeted newsletter campaigns." },
  { icon: BarChart, title: "Analytics & Data", desc: "Custom dashboards tracking every click, conversion, and dollar spent." },
  { icon: Users, title: "Lead Generation", desc: "B2B and B2C funnel optimization to fill your sales pipeline." }
];

export default function DigitalMarketing() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Grow Your Brand <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#00FFA3]">Online</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10">
              Stop guessing. Start growing. Our digital marketing strategies are powered by data analytics and AI to ensure every dollar you spend returns a multiple.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((svc, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <svc.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{svc.title}</h4>
                    <p className="text-sm text-slate-400">{svc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative bg-[#08111F] rounded-3xl border border-white/10 p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Total Revenue Generated</div>
                  <div className="text-4xl font-bold font-display text-white">$24.5M+</div>
                </div>
                <div className="px-4 py-2 bg-[#00FFA3]/10 text-[#00FFA3] rounded-full text-sm font-bold flex items-center gap-2">
                  <Target className="w-4 h-4" /> +340% YoY
                </div>
              </div>
              
              {/* Animated Growth Chart */}
              <div className="h-64 relative flex items-end gap-2">
                {[30, 45, 40, 60, 55, 80, 75, 95, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="flex-1 bg-gradient-to-t from-primary/20 to-primary rounded-t-md relative group"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-background text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      +{h}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

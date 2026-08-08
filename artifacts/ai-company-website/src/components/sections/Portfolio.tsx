import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

const cases = [
  {
    industry: "FinTech",
    title: "AI-Powered Risk Assessment",
    description: "Rebuilt the core underwriting engine using real-time machine learning, reducing default rates while processing 10x more applications.",
    metric: "340% ROI Increase",
    color: "from-blue-500/20"
  },
  {
    industry: "E-Commerce",
    title: "Predictive Supply Chain",
    description: "Developed an autonomous inventory management system that predicts demand spikes and automates supplier ordering.",
    metric: "45% Cost Reduction",
    color: "from-purple-500/20"
  },
  {
    industry: "Healthcare",
    title: "Patient Triage Assistant",
    description: "Implemented an NLP chatbot for initial patient assessment, reducing wait times and optimizing doctor schedules.",
    metric: "2M+ Patients Served",
    color: "from-emerald-500/20"
  },
  {
    industry: "SaaS",
    title: "Intelligent Analytics Dashboard",
    description: "Transformed raw data streams into actionable insights with generative reports and custom anomaly detection.",
    metric: "12x Faster Reporting",
    color: "from-orange-500/20"
  }
];

export default function Portfolio() {
  const [, setLocation] = useLocation();
  return (
    <section id="portfolio" className="py-32 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Results That <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#00FFA3]">Speak</span>
            </h2>
            <p className="text-slate-400 text-lg">
              We don't just write code; we solve complex business problems. Here are some of our most impactful transformations.
            </p>
          </div>
          <button
            onClick={() => setLocation('/work')}
            className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/5 transition-colors font-medium text-white self-start shrink-0"
          >
            View All Work →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group rounded-3xl bg-[#08111F] border border-white/5 overflow-hidden flex flex-col sm:h-[500px]"
            >
              <div className={`flex-1 bg-gradient-to-b ${item.color} to-transparent relative p-8 flex flex-col items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                {/* Mockup Placeholder Graphic */}
                <motion.div 
                  className="w-full max-w-[80%] aspect-video bg-[#0F172A] rounded-t-xl border border-white/10 shadow-2xl relative overflow-hidden"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="h-6 border-b border-white/5 flex items-center px-3 gap-1.5 bg-[#050816]">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                  <div className="p-4 flex gap-4 h-full">
                    <div className="w-1/3 h-full rounded bg-white/5" />
                    <div className="w-2/3 h-full flex flex-col gap-2">
                      <div className="h-4 w-1/2 rounded bg-white/10" />
                      <div className="h-20 w-full rounded bg-white/5 mt-2" />
                      <div className="flex-1 w-full rounded bg-white/5" />
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="p-8 bg-[#050816] z-10 border-t border-white/5">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 uppercase tracking-wider">
                    {item.industry}
                  </span>
                  <span className="text-primary font-bold">{item.metric}</span>
                </div>
                <h3 className="text-2xl font-bold font-display mb-2 text-white">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

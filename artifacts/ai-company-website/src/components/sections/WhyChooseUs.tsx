import React from 'react';
import { motion } from 'framer-motion';

const features = [
  { title: "500+ Projects Delivered", span: "col-span-1 md:col-span-2 row-span-1", bg: "bg-gradient-to-br from-primary/20 to-accent/20" },
  { title: "AI-First Approach", span: "col-span-1 row-span-2", bg: "bg-card" },
  { title: "10x Faster Development", span: "col-span-1 row-span-1", bg: "bg-card" },
  { title: "24/7 Support", span: "col-span-1 row-span-1", bg: "bg-card" },
  { title: "Award-Winning Design", span: "col-span-1 md:col-span-2 row-span-1", bg: "bg-card" },
  { title: "Certified Experts", span: "col-span-1 row-span-1", bg: "bg-card" },
  { title: "End-to-End Solutions", span: "col-span-1 row-span-1", bg: "bg-card" },
  { title: "Proven ROI", span: "col-span-1 md:col-span-2 row-span-1", bg: "bg-gradient-to-tr from-[#00FFA3]/20 to-primary/20" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-32 bg-[#08111F] relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-white">Why Choose Us</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We combine deep technical expertise with strategic business thinking to deliver unparalleled results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4 auto-rows-[160px]">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`rounded-3xl border border-white/10 p-5 md:p-8 flex items-center justify-center text-center overflow-hidden relative group ${feature.span} ${feature.bg}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl md:text-2xl font-bold font-display text-white relative z-10">
                {feature.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

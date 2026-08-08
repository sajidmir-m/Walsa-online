import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Map, PenTool, Code, TestTube, Rocket, TrendingUp } from 'lucide-react';

const steps = [
  { id: "01", title: "Discovery", icon: Search, desc: "We audit your business processes, identify AI opportunities, and define clear success metrics." },
  { id: "02", title: "Strategy", icon: Map, desc: "A comprehensive roadmap outlining architecture, data requirements, and integration paths." },
  { id: "03", title: "Design", icon: PenTool, desc: "UI/UX wireframes and system design for optimal user adoption and seamless workflows." },
  { id: "04", title: "Development", icon: Code, desc: "Agile engineering using modern stacks, custom models, and enterprise-grade security." },
  { id: "05", title: "Testing", icon: TestTube, desc: "Rigorous QA, load testing, and red-teaming to ensure flawless performance at scale." },
  { id: "06", title: "Launch", icon: Rocket, desc: "Smooth deployment, team training, and zero-downtime transition to the new system." },
  { id: "07", title: "Growth", icon: TrendingUp, desc: "Continuous monitoring, model fine-tuning, and marketing strategies to maximize ROI." }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-16 md:py-32 bg-background relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-12 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            How We <span className="text-primary">Work</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            A battle-tested methodology that takes you from ambiguity to deployment, reliably.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line Desktop */}
          <div className="hidden sm:block absolute top-12 left-0 right-0 h-1 bg-white/5">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-accent origin-left"
              style={{ scaleX: pathLength }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-start sm:items-center relative"
              >
                {/* Connecting Line Mobile */}
                <div className="sm:hidden absolute left-6 top-16 bottom-[-2rem] w-px bg-white/10" />

                <div className="w-12 h-12 rounded-full bg-[#050816] border-2 border-white/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10 group hover:border-primary transition-colors">
                  <step.icon className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
                
                <div className="pl-16 sm:pl-0 sm:text-center w-full">
                  <div className="text-primary font-mono text-sm font-bold mb-2">{step.id}</div>
                  <h3 className="text-xl font-bold font-display text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

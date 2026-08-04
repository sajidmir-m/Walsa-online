import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiPython, SiFastapi, SiSupabase, SiFirebase, SiFlutter, 
  SiDocker, SiKubernetes, SiLangchain, SiN8N
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';

const techs = [
  { icon: SiReact, name: "React" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiTailwindcss, name: "Tailwind" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiPython, name: "Python" },
  { icon: SiFastapi, name: "FastAPI" },
  { icon: SiSupabase, name: "Supabase" },
  { icon: SiFirebase, name: "Firebase" },
  { icon: SiFlutter, name: "Flutter" },
  { icon: FaAws, name: "AWS" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiKubernetes, name: "Kubernetes" },
  { icon: SiLangchain, name: "LangChain" },
  { icon: SiN8N, name: "n8n" }
];

export default function TechStack() {
  return (
    <section className="py-24 bg-[#08111F] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-white">Our Tech Ecosystem</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We build with the most powerful, scalable, and secure technologies available today.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {techs.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-colors cursor-pointer"
            >
              <tech.icon className="w-5 h-5 text-slate-300" />
              <span className="text-sm font-medium text-slate-300">{tech.name}</span>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10"
          >
            <span className="text-sm font-medium text-slate-300">LangChain</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10"
          >
            <span className="text-sm font-medium text-slate-300">n8n</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

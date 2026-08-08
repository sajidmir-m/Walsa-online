import React from 'react';
import { motion } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiFastapi,
  SiSupabase,
  SiFirebase,
  SiFlutter,
  SiDocker,
  SiKubernetes,
  SiLangchain,
  SiN8N,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import { usePageSection } from '@/lib/pageContent';

const iconByName: Record<string, React.ComponentType<{ className?: string }>> = {
  React: SiReact,
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
  Tailwind: SiTailwindcss,
  'Node.js': SiNodedotjs,
  Python: SiPython,
  FastAPI: SiFastapi,
  Supabase: SiSupabase,
  Firebase: SiFirebase,
  Flutter: SiFlutter,
  AWS: FaAws,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  LangChain: SiLangchain,
  n8n: SiN8N,
};

const defaultStack = {
  heading: 'Our Tech Ecosystem',
  subheading: 'We build with the most powerful, scalable, and secure technologies available today.',
  techs: [
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind',
    'Node.js',
    'Python',
    'FastAPI',
    'Supabase',
    'Firebase',
    'Flutter',
    'AWS',
    'Docker',
    'Kubernetes',
    'LangChain',
    'n8n',
  ],
};

export default function TechStack() {
  const { data } = usePageSection('technology', 'stack', defaultStack);
  const techs = data.techs?.length ? data.techs : defaultStack.techs;

  return (
    <section className="py-24 bg-[#08111F] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-white">{data.heading}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{data.subheading}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {techs.map((name, i) => {
            const Icon = iconByName[name];
            return (
              <motion.div
                key={`${name}-${i}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-colors cursor-pointer"
              >
                {Icon ? <Icon className="w-5 h-5 text-slate-300" /> : null}
                <span className="text-sm font-medium text-slate-300">{name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

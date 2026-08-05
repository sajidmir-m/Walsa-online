import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Brain, Code2, Smartphone, Paintbrush, Megaphone, Cloud } from 'lucide-react';

const services = [
  {
    title: 'Artificial Intelligence',
    icon: Brain,
    description: 'Custom LLMs, autonomous agents, and predictive models.',
    features: ['Custom AI Agents', 'Machine Learning Models', 'RAG Systems', 'Computer Vision'],
    color: 'from-blue-500 to-indigo-500',
    slug: '/services/ai'
  },
  {
    title: 'Software Development',
    icon: Code2,
    description: 'Scalable web applications and enterprise systems.',
    features: ['Full-stack Development', 'SaaS Platforms', 'API Integration', 'Legacy Modernization'],
    color: 'from-emerald-500 to-teal-500',
    slug: '/services/software'
  },
  {
    title: 'Mobile Development',
    icon: Smartphone,
    description: 'Native and cross-platform mobile experiences.',
    features: ['iOS & Android Apps', 'React Native / Flutter', 'App Store Optimization', 'Mobile UI/UX'],
    color: 'from-orange-500 to-red-500',
    slug: '/services/mobile'
  },
  {
    title: 'UI/UX Design',
    icon: Paintbrush,
    description: 'Award-worthy interfaces that convert visitors.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    color: 'from-pink-500 to-rose-500',
    slug: '/services/uiux'
  },
  {
    title: 'Digital Marketing',
    icon: Megaphone,
    description: 'Data-driven growth strategies and campaigns.',
    features: ['SEO / SEM', 'Performance Analytics', 'Content Strategy', 'Conversion Optimization'],
    color: 'from-purple-500 to-fuchsia-500',
    slug: '/services/marketing'
  },
  {
    title: 'Cloud & Infrastructure',
    icon: Cloud,
    description: 'Secure, high-availability cloud deployments.',
    features: ['AWS / Azure Migration', 'DevOps & CI/CD', 'Serverless Architecture', 'Security Audits'],
    color: 'from-cyan-500 to-blue-500',
    slug: '/services/cloud'
  }
];

export default function Services() {
  const [, setLocation] = useLocation();
  return (
    <section id="services" className="py-32 bg-background relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Services</span> That Scale
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            We provide end-to-end digital transformation. From foundational infrastructure to advanced AI integrations, we build systems designed for the future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-2xl bg-card border border-white/5 p-8 overflow-hidden hover:border-white/20 transition-colors"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 rounded-full`} />
              
              <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold font-display mb-3 text-white">{service.title}</h3>
              <p className="text-slate-400 mb-6 min-h-[48px]">{service.description}</p>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setLocation(service.slug)}
                className="inline-flex items-center gap-2 text-primary font-medium group/link bg-transparent border-none cursor-pointer p-0"
              >
                Explore Service
                <motion.span className="group-hover/link:translate-x-1 transition-transform">→</motion.span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

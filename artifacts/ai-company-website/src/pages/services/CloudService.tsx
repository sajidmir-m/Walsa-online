import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Server, GitBranch, Lock, RefreshCw, Box, Cpu, Globe, ArrowRight } from 'lucide-react';
import ServicesLayout from '@/pages/ServicesLayout';

const offerings = [
  { icon: Cloud, title: 'AWS & Azure', desc: 'Architecture, migration, and management of workloads on Amazon Web Services and Microsoft Azure.' },
  { icon: Globe, title: 'Google Cloud', desc: 'GCP infrastructure setup, BigQuery analytics, and Kubernetes Engine deployments on Google Cloud.' },
  { icon: GitBranch, title: 'DevOps & CI/CD', desc: 'Automated pipelines, infrastructure as code, and deployment workflows that ship faster and safer.' },
  { icon: Box, title: 'Docker & Kubernetes', desc: 'Container orchestration for scalable, portable microservices that run consistently across every environment.' },
  { icon: RefreshCw, title: 'API Development & Integration', desc: 'RESTful and GraphQL APIs, webhooks, and third-party integrations that connect your entire tech stack.' },
  { icon: Lock, title: 'Security & Compliance', desc: 'Vulnerability assessments, security hardening, and compliance frameworks (GDPR, ISO 27001, SOC 2).' },
  { icon: Server, title: 'Server Management', desc: 'Ongoing monitoring, patch management, auto-scaling, and disaster recovery for your infrastructure.' },
  { icon: Cpu, title: 'Serverless Architecture', desc: 'Cost-efficient, infinitely scalable serverless functions and event-driven systems on any major cloud.' },
];

const techStack = ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Jenkins', 'Nginx', 'Redis', 'PostgreSQL', 'MongoDB'];

export default function CloudService() {
  return (
    <ServicesLayout>
      <div className="p-5 sm:p-8 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            <Cloud className="w-4 h-4" /> Cloud & Infrastructure
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
            Infrastructure That
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">Never Sleeps</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            We design and manage cloud infrastructure that is secure, highly available, and built for scale — so your team can ship features instead of managing servers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button className="px-6 py-3 rounded-full bg-cyan-500 text-white font-medium hover:bg-cyan-500/90 transition-colors flex items-center gap-2" data-testid="btn-cloud-get-started">
              Get Cloud Assessment <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors" data-testid="btn-cloud-case-study">
              View Case Studies
            </button>
          </div>
        </motion.div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold font-display mb-8 text-white">Cloud Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {offerings.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex gap-4 p-5 rounded-2xl bg-[#08111F] border border-white/5 hover:border-cyan-500/20 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                  <item.icon className="w-5 h-5 text-cyan-400" />
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
              <span key={i} className="px-4 py-2 rounded-full bg-[#08111F] border border-white/10 text-slate-300 text-sm font-medium hover:border-cyan-500/40 transition-colors">{tech}</span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-primary/10 border border-cyan-500/10 p-10 text-center">
          <h2 className="text-3xl font-bold font-display mb-4 text-white">Ready to Modernize Your Infrastructure?</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">Get a free cloud architecture assessment and migration roadmap.</p>
          <button className="px-8 py-4 rounded-full bg-cyan-500 text-white font-semibold hover:bg-cyan-500/90 transition-colors" data-testid="btn-cloud-cta">
            Book a Free Assessment
          </button>
        </div>
      </div>
    </ServicesLayout>
  );
}

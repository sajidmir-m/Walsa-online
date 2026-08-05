import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Bot, Mic, MessageSquare, Users, Zap, Settings, TrendingUp, ArrowRight } from 'lucide-react';
import ServicesLayout from '@/pages/ServicesLayout';

const offerings = [
  { icon: Bot, title: 'AI Agents', desc: 'Autonomous agents that execute complex multi-step workflows, make decisions, and complete tasks independently.' },
  { icon: Mic, title: 'AI Voice Agents', desc: 'Natural voice interactions for customer support, sales calls, and receptionist duties — available 24/7.' },
  { icon: MessageSquare, title: 'AI Chatbots', desc: 'Intelligent conversational bots trained on your knowledge base to handle queries without human intervention.' },
  { icon: Users, title: 'AI Customer Support', desc: 'End-to-end AI support systems that resolve tickets, escalate intelligently, and learn from every interaction.' },
  { icon: TrendingUp, title: 'AI Sales Agents', desc: 'Automated outreach, lead qualification, and follow-up sequences that convert prospects into customers.' },
  { icon: Zap, title: 'AI Automation', desc: 'Connect your tools and automate repetitive workflows using intelligent orchestration and trigger-based flows.' },
  { icon: Settings, title: 'AI Integrations', desc: 'Embed AI capabilities into your existing software stack — CRM, ERP, helpdesk, and custom platforms.' },
  { icon: Brain, title: 'AI Consulting', desc: 'Strategic roadmaps, model selection, and architecture planning to guide your AI transformation journey.' },
];

const techStack = ['OpenAI GPT-4', 'Anthropic Claude', 'Google Gemini', 'LangChain', 'n8n', 'Groq', 'RAG Pipelines', 'Vector Databases', 'Python', 'FastAPI'];

export default function AIService() {
  return (
    <ServicesLayout>
      <div className="p-8 max-w-5xl mx-auto">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <Brain className="w-4 h-4" /> Artificial Intelligence
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight">
            Build Smarter with
            <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">Artificial Intelligence</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            We design and deploy production-grade AI systems — from autonomous agents to intelligent voice interfaces — that automate work, delight customers, and drive measurable growth.
          </p>
          <div className="flex gap-4 mt-8">
            <button className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors flex items-center gap-2" data-testid="btn-ai-get-started">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors" data-testid="btn-ai-case-study">
              View Case Studies
            </button>
          </div>
        </motion.div>

        {/* Offerings Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold font-display mb-8 text-white">What We Build</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {offerings.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex gap-4 p-5 rounded-2xl bg-[#08111F] border border-white/5 hover:border-blue-500/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                  <item.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold font-display mb-6 text-white">Technologies We Use</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-[#08111F] border border-white/10 text-slate-300 text-sm font-medium hover:border-blue-500/40 transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-primary/10 border border-blue-500/10 p-10 text-center">
          <h2 className="text-3xl font-bold font-display mb-4 text-white">Ready to Build Your AI Solution?</h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">Tell us about your challenge and we will design the right AI system for your business.</p>
          <button className="px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors" data-testid="btn-ai-cta">
            Book a Free Consultation
          </button>
        </div>
      </div>
    </ServicesLayout>
  );
}

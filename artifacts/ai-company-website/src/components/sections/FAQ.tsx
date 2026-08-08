import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const faqs = [
  { q: "How long does a typical AI integration take?", a: "Depending on complexity, standard integrations take 4-8 weeks. Custom enterprise deployments with on-premise models can take 3-6 months." },
  { q: "Do you own the code and models you build for us?", a: "No. Once the project is paid in full, you own 100% of the IP, code, and custom-trained models. We provide a full handover." },
  { q: "What kind of ROI can we expect from AI automation?", a: "While results vary by industry, our clients typically see a 30-50% reduction in operational costs and a 2-3x increase in processing speed within the first quarter." },
  { q: "Do you provide ongoing support?", a: "Yes. All our plans include maintenance, monitoring, and model fine-tuning to ensure performance doesn't degrade over time." },
  { q: "How do you handle data security and privacy?", a: "We build compliance-first (SOC2, HIPAA, GDPR). We offer on-premise deployments or secure private cloud environments so your data never trains public models." },
  { q: "Can you train our team to manage the system?", a: "Absolutely. We offer comprehensive training programs and documentation so your internal team can take over day-to-day operations." },
  { q: "What happens if we need to scale the system later?", a: "Everything we build uses modern, scalable architectures (Kubernetes, Serverless). Scaling is built into the foundation from day one." },
  { q: "Do you offer white-label services?", a: "Yes, we work with agencies and consultancies to provide white-labeled development and AI services." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-32 bg-[#08111F]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-lg">Clear answers to help you make an informed decision.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card border border-white/10 rounded-2xl overflow-hidden transition-colors hover:border-white/20">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-6 flex items-center justify-between text-left"
              >
                <span className="text-white font-medium pr-8">{faq.q}</span>
                <div className="shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                  {openIndex === i ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-white/5 mt-2">
                      <div className="pt-4">{faq.a}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      desc: "Perfect for small businesses starting their AI journey.",
      price: annual ? 799 : 999,
      features: ["Basic Chatbot Integration", "Standard Analytics Dashboard", "5 Automated Workflows", "Email Support", "1 Month Strategy Review"]
    },
    {
      name: "Professional",
      desc: "Comprehensive suite for growing companies.",
      price: annual ? 2399 : 2999,
      popular: true,
      features: ["Custom AI Voice Agent", "Advanced Predictive Analytics", "Unlimited Workflows", "Priority 24/7 Support", "Weekly Strategy Calls", "Custom App Development"]
    },
    {
      name: "Enterprise",
      desc: "Full-scale digital transformation.",
      price: "Custom",
      features: ["Dedicated Engineering Team", "On-Premise Model Deployment", "Bespoke System Architecture", "SLA Guarantees", "Executive Board Access", "End-to-End Migration"]
    }
  ];

  return (
    <section id="pricing" className="py-32 bg-background relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-white">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            Invest in technology that pays for itself. No hidden fees.
          </p>

          <div className="inline-flex items-center gap-3 p-1 bg-white/5 rounded-full border border-white/10">
            <button
              onClick={() => setAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${!annual ? 'bg-white text-background' : 'text-slate-400'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${annual ? 'bg-white text-background' : 'text-slate-400'}`}
            >
              Annually <span className="text-xs text-[#00FFA3] ml-1">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 flex flex-col ${
                plan.popular 
                  ? 'bg-gradient-to-b from-primary/20 to-[#08111F] border border-primary shadow-[0_0_30px_rgba(108,99,255,0.2)] md:-translate-y-4' 
                  : 'bg-card border border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold font-display text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-sm h-10 mb-6">{plan.desc}</p>

              <div className="mb-8">
                {typeof plan.price === 'number' ? (
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold font-display text-white">${plan.price}</span>
                    <span className="text-slate-400 text-sm mb-1">/mo</span>
                  </div>
                ) : (
                  <div className="text-4xl font-bold font-display text-white">{plan.price}</div>
                )}
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feat, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00FFA3] shrink-0" />
                    <span className="text-slate-300 text-sm">{feat}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-bold transition-all ${
                plan.popular 
                  ? 'bg-primary text-white hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(108,99,255,0.4)]' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}>
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

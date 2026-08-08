import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IS_MOBILE } from '@/lib/device';
import { Mic, MessageSquare, Workflow, Terminal, Send } from 'lucide-react';

/* Static bar heights used on mobile instead of the infinite height animation,
   which forces the browser to re-layout on every frame. */
const staticBarHeights = [35, 60, 45, 80, 55, 95, 70, 40, 85, 65, 50, 90, 60, 75, 45, 88, 55, 70, 40, 62];

const tabs = [
  { id: 'voice', label: 'AI Voice Agent', icon: Mic },
  { id: 'chat', label: 'AI Chatbot', icon: MessageSquare },
  { id: 'flow', label: 'Automation Flow', icon: Workflow },
];

export default function AISolutions() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <section id="solutions" className="py-16 md:py-32 bg-[#0F172A] relative overflow-hidden">
      {/* Dramatic lighting */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-white">AI Solutions Showcase</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Experience our intelligent systems in action. From voice synthesis to complex automated workflows.
          </p>
        </div>

        <div className="flex justify-center mb-8 sm:mb-12 relative z-10 px-4">
          <div className="inline-flex items-center p-1 sm:p-1.5 bg-background/50 backdrop-blur-md rounded-full border border-white/10 w-full sm:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-2.5 rounded-full flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon className="w-4 h-4 relative z-10 shrink-0" />
                <span className="relative z-10 hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-[#08111F] rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative z-10">
          <div className="h-10 sm:h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-[#050816]">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
            <div className="ml-3 text-xs font-mono text-slate-500 hidden sm:flex items-center gap-2">
              <Terminal className="w-3 h-3" /> demo-environment.sh
            </div>
          </div>
          
          <div className="p-4 sm:p-8 h-[320px] sm:h-[400px] flex flex-col justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'voice' && (
                <motion.div
                  key="voice"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex flex-col items-center justify-center w-full"
                >
                  <div className="w-32 h-32 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-8 relative">
                    <Mic className="w-10 h-10 text-primary" />
                    {!IS_MOBILE && (
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full bg-primary/20"
                      />
                    )}
                  </div>
                  <div className="flex items-end gap-1 mb-6 h-16">
                    {IS_MOBILE
                      ? staticBarHeights.map((h, i) => (
                          <div
                            key={i}
                            className="w-1.5 bg-gradient-to-t from-primary to-accent rounded-full"
                            style={{ height: `${h}%` }}
                          />
                        ))
                      : [...Array(20)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: ["20%", "100%", "20%"] }}
                            transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 bg-gradient-to-t from-primary to-accent rounded-full"
                            style={{ height: '20%' }}
                          />
                        ))}
                  </div>
                  <p className="text-slate-400 font-mono text-sm">Processing natural language input...</p>
                </motion.div>
              )}

              {activeTab === 'chat' && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex flex-col w-full h-full max-w-2xl mx-auto"
                >
                  <div className="flex-1 space-y-4 mb-4 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center">U</div>
                      <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 text-sm text-slate-300">
                        Can you analyze the Q3 revenue data and identify key growth areas?
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex gap-4 flex-row-reverse"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary border border-primary/30 flex-shrink-0 flex items-center justify-center">AI</div>
                      <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-tr-sm p-4 text-sm text-white">
                        I've analyzed the Q3 dataset. Revenue is up 24% overall. The key driver was the Enterprise segment, which grew 45%. I've generated a chart below...
                        <div className="mt-4 h-24 bg-background/50 rounded-lg border border-white/5 relative overflow-hidden flex items-end px-2 gap-2 pb-2">
                           {[40, 60, 45, 80, 55, 90, 100].map((h, i) => (
                             <motion.div
                               key={i}
                               initial={{ height: 0 }}
                               animate={{ height: `${h}%` }}
                               transition={{ delay: 1 + i * 0.1 }}
                               className="w-full bg-primary/50 rounded-t-sm"
                             />
                           ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <div className="h-12 rounded-full bg-white/5 border border-white/10 flex items-center px-4">
                    <span className="text-slate-500 text-sm flex-1 font-mono">Ask anything...</span>
                    <Send className="w-4 h-4 text-primary" />
                  </div>
                </motion.div>
              )}

              {activeTab === 'flow' && (
                <motion.div
                  key="flow"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="w-full h-full relative flex items-center justify-center"
                >
                  <div className="relative w-full max-w-[600px] h-[240px] sm:h-[300px] scale-[0.75] sm:scale-100 origin-center">
                    <motion.div className="absolute top-1/2 left-0 -translate-y-1/2 w-32 p-3 bg-card border border-white/10 rounded-xl z-10 shadow-lg text-center">
                      <div className="text-xs font-bold mb-1">Webhook</div>
                      <div className="text-[10px] text-slate-400">Trigger received</div>
                    </motion.div>
                    
                    <motion.div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 p-3 bg-card border border-primary/30 rounded-xl z-10 shadow-[0_0_15px_rgba(108,99,255,0.2)] text-center">
                      <div className="text-xs font-bold mb-1 text-primary">LLM Agent</div>
                      <div className="text-[10px] text-slate-400">Analyze Sentiment</div>
                    </motion.div>

                    <motion.div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-32 p-3 bg-card border border-white/10 rounded-xl z-10 shadow-lg text-center">
                      <div className="text-xs font-bold mb-1">Database</div>
                      <div className="text-[10px] text-slate-400">Store record</div>
                    </motion.div>

                    <motion.div className="absolute top-1/2 right-0 -translate-y-1/2 w-32 p-3 bg-card border border-[#00FFA3]/30 rounded-xl z-10 shadow-[0_0_15px_rgba(0,255,163,0.2)] text-center">
                      <div className="text-xs font-bold mb-1 text-[#00FFA3]">Slack</div>
                      <div className="text-[10px] text-slate-400">Send Notification</div>
                    </motion.div>

                    {/* SVG Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                      <motion.path
                        d="M 128 150 C 200 150, 200 75, 300 75"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      <motion.path
                        d="M 128 150 C 200 150, 200 225, 300 225"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      <motion.path
                        d="M 364 75 C 450 75, 450 150, 472 150"
                        fill="none"
                        stroke="rgba(108,99,255,0.3)"
                        strokeWidth="2"
                        initial={IS_MOBILE ? undefined : { pathLength: 0 }}
                        animate={IS_MOBILE ? undefined : { pathLength: 1 }}
                        transition={IS_MOBILE ? undefined : { duration: 2, repeat: Infinity }}
                      />
                    </svg>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

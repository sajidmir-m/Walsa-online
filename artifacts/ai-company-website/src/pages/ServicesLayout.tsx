import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Brain, Code2, Smartphone, Paintbrush, Megaphone, Cloud, ChevronRight, Home, Menu, X, ArrowLeft } from 'lucide-react';

export const serviceNav = [
  { title: 'Artificial Intelligence', slug: '/services/ai', icon: Brain, color: 'text-blue-400' },
  { title: 'Software Development', slug: '/services/software', icon: Code2, color: 'text-emerald-400' },
  { title: 'Mobile Development', slug: '/services/mobile', icon: Smartphone, color: 'text-orange-400' },
  { title: 'UI/UX Design', slug: '/services/uiux', icon: Paintbrush, color: 'text-pink-400' },
  { title: 'Digital Marketing', slug: '/services/marketing', icon: Megaphone, color: 'text-purple-400' },
  { title: 'Cloud & Infrastructure', slug: '/services/cloud', icon: Cloud, color: 'text-cyan-400' },
];

interface ServicesLayoutProps {
  children: React.ReactNode;
}

export default function ServicesLayout({ children }: ServicesLayoutProps) {
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#050816]/90 backdrop-blur-md border-b border-white/5 flex items-center px-6 gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          data-testid="btn-sidebar-toggle"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <button onClick={() => setLocation('/')} className="flex items-center gap-2 group cursor-pointer bg-transparent border-none p-0">
          <BrainCircuit className="w-7 h-7 text-primary transition-transform group-hover:scale-110 duration-300" />
          <span className="font-display font-bold text-lg tracking-tight text-white">WALSA<span className="text-primary"> ONLINE</span></span>
        </button>

        <div className="hidden md:flex items-center gap-1 ml-4 text-slate-500 text-sm">
          <ChevronRight className="w-4 h-4" />
          <span>Services</span>
          {location !== '/services' && (
            <>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{serviceNav.find(s => s.slug === location)?.title ?? ''}</span>
            </>
          )}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            data-testid="btn-back-home"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <a
            href="#"
            className="px-5 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
            data-testid="btn-get-started"
          >
            Get Started
          </a>
        </div>
      </header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || true) && (
            <motion.aside
              initial={false}
              className={`
                fixed md:sticky top-16 left-0 bottom-0 z-40 w-72 bg-[#08111F] border-r border-white/5
                flex flex-col overflow-y-auto
                transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
              `}
              style={{ height: 'calc(100vh - 4rem)' }}
            >
              <div className="p-4 border-b border-white/5">
                <h2 className="text-xs uppercase tracking-widest text-slate-500 font-semibold px-2">Our Services</h2>
              </div>

              <nav className="p-4 flex flex-col gap-1 flex-1">
                <button
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group w-full bg-transparent border-none text-left ${
                    location === '/services'
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => { setLocation('/services'); setSidebarOpen(false); }}
                  data-testid="nav-services-overview"
                >
                  <Home className="w-4 h-4 shrink-0" />
                  Overview
                </button>

                <div className="mt-3 mb-1 px-3">
                  <span className="text-xs text-slate-600 uppercase tracking-widest">Categories</span>
                </div>

                {serviceNav.map((service) => {
                  const isActive = location === service.slug;
                  return (
                    <button
                      key={service.slug}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group w-full bg-transparent border-none text-left ${
                        isActive
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => { setLocation(service.slug); setSidebarOpen(false); }}
                      data-testid={`nav-${service.slug.split('/').pop()}`}
                    >
                      <service.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : service.color}`} />
                      {service.title}
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </button>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-white/5">
                <div className="rounded-xl bg-gradient-to-br from-primary/20 to-[#8B5CF6]/20 border border-primary/10 p-4">
                  <p className="text-xs text-slate-300 mb-3">Ready to get started?</p>
                  <button className="w-full py-2 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors" data-testid="btn-sidebar-contact">
                    Contact Us
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

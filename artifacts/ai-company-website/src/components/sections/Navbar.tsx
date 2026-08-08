import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Brain,
  Code2,
  Smartphone,
  Paintbrush,
  Cloud,
  Search,
  Target,
  Share2,
  BarChart,
  Users,
  Megaphone,
  LineChart,
  MapPin,
} from 'lucide-react';

const technologyItems = [
  { name: 'Artificial Intelligence', href: '/services/ai', icon: Brain },
  { name: 'Software Development', href: '/services/software', icon: Code2 },
  { name: 'Mobile Development', href: '/services/mobile', icon: Smartphone },
  { name: 'UI/UX Design', href: '/services/uiux', icon: Paintbrush },
  { name: 'Cloud & Infrastructure', href: '/services/cloud', icon: Cloud },
];

const marketingItems = [
  { name: 'Social Media Management', href: '/services/marketing/social-media-management', icon: Share2 },
  { name: 'Content Creation', href: '/services/marketing/content-creation', icon: Megaphone },
  { name: 'Graphic Design', href: '/services/marketing/graphic-design', icon: Paintbrush },
  { name: 'Branding', href: '/services/marketing/branding', icon: Users },
  { name: 'Google Business Profile', href: '/services/marketing/google-business-profile', icon: MapPin },
  { name: 'Local SEO', href: '/services/marketing/local-seo', icon: Search },
  { name: 'Meta Advertising', href: '/services/marketing/meta-advertising', icon: Target },
  { name: 'Google Ads', href: '/services/marketing/google-ads', icon: BarChart },
  { name: 'Marketing Strategy', href: '/services/marketing/marketing-strategy', icon: LineChart },
];

const simpleLinks = [
  { name: 'Our Work', href: '/work', isRoute: true },
  { name: 'Clients', href: '/clients', isRoute: true },
  { name: 'About', href: '/about', isRoute: true },
  { name: 'Training', href: '#training', isRoute: false },
  { name: 'Contact', href: '#contact', isRoute: false },
];

type DropdownKey = 'tech' | 'marketing' | null;

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState<DropdownKey>(null);
  const [mobileDropdown, setMobileDropdown] = useState<DropdownKey>(null);
  const [, setLocation] = useLocation();
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDesktop = (key: DropdownKey) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setDesktopOpen(key);
  };

  const scheduleCloseDesktop = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setDesktopOpen(null);
      closeTimerRef.current = null;
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (mobileOpen) setMobileOpen(false);
      // Don't close desktop dropdown on tiny scroll — only close mobile drawer
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
        setMobileDropdown(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNav = (e: React.MouseEvent, href: string, isRoute?: boolean) => {
    e.preventDefault();
    setMobileOpen(false);
    setDesktopOpen(null);
    setMobileDropdown(null);
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (isRoute) {
      setLocation(href);
      return;
    }
    if (href.startsWith('/')) {
      setLocation(href);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const DropdownPanel = ({
    items,
  }: {
    items: typeof technologyItems;
  }) => (
    <div className="absolute top-full left-0 pt-2 z-50">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.15 }}
        className="w-72 rounded-2xl bg-[#08111F]/98 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden py-2"
      >
        {items.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => handleNav(e, item.href, true)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <item.icon className="w-4 h-4 text-primary shrink-0" />
            {item.name}
          </a>
        ))}
      </motion.div>
    </div>
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen ? 'glass py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-5 max-w-7xl flex items-center justify-between">
          <button
            onClick={(e) => handleNav(e as any, '/', true)}
            className="flex items-center group cursor-pointer bg-transparent border-none p-0"
            aria-label="WALSA ONLINE home"
          >
            <img
              src="/logo.jpg"
              alt="WALSA ONLINE"
              className="h-9 md:h-10 w-auto object-contain rounded-md transition-transform group-hover:scale-105 duration-300"
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Technology Solution */}
            <div
              className="relative"
              onMouseEnter={() => openDesktop('tech')}
              onMouseLeave={scheduleCloseDesktop}
            >
              <button
                className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0"
                onClick={() => openDesktop(desktopOpen === 'tech' ? null : 'tech')}
                aria-expanded={desktopOpen === 'tech'}
              >
                Technology Solution
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${desktopOpen === 'tech' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {desktopOpen === 'tech' && <DropdownPanel items={technologyItems} />}
              </AnimatePresence>
            </div>

            {/* Marketing Solution */}
            <div
              className="relative"
              onMouseEnter={() => openDesktop('marketing')}
              onMouseLeave={scheduleCloseDesktop}
            >
              <button
                className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0"
                onClick={() => openDesktop(desktopOpen === 'marketing' ? null : 'marketing')}
                aria-expanded={desktopOpen === 'marketing'}
              >
                Marketing Solution
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${desktopOpen === 'marketing' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {desktopOpen === 'marketing' && <DropdownPanel items={marketingItems} />}
              </AnimatePresence>
            </div>

            {simpleLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNav(e, link.href, link.isRoute)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleNav(e, '#contact')}
              className="group relative px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors overflow-hidden"
            >
              <span className="relative z-10 text-sm font-medium text-white">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>

          <button
            className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[60px] left-4 right-4 z-50 bg-[#08111F] border border-white/10 rounded-2xl shadow-2xl overflow-hidden lg:hidden max-h-[calc(100vh-80px)] overflow-y-auto"
            >
              <nav className="flex flex-col p-4 gap-1">
                {/* Technology accordion */}
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === 'tech' ? null : 'tech')}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 font-medium transition-colors text-base bg-transparent border-none cursor-pointer w-full text-left"
                >
                  Technology Solution
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdown === 'tech' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileDropdown === 'tech' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-2"
                    >
                      {technologyItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={(e) => handleNav(e, item.href, true)}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 text-sm"
                        >
                          <item.icon className="w-4 h-4 text-primary" />
                          {item.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Marketing accordion */}
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === 'marketing' ? null : 'marketing')}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 font-medium transition-colors text-base bg-transparent border-none cursor-pointer w-full text-left"
                >
                  Marketing Solution
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdown === 'marketing' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileDropdown === 'marketing' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-2"
                    >
                      {marketingItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={(e) => handleNav(e, item.href, true)}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 text-sm"
                        >
                          <item.icon className="w-4 h-4 text-primary" />
                          {item.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {simpleLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => handleNav(e, link.href, link.isRoute)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 font-medium transition-colors text-base"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>
              <div className="px-4 pb-4">
                <a
                  href="#contact"
                  onClick={(e) => handleNav(e, '#contact')}
                  className="block w-full text-center py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors"
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

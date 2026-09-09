import React from 'react';
import { SiX, SiGithub, SiYoutube, SiInstagram } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';
import { usePageSection } from '@/lib/pageContent';

const defaultFooter = {
  tagline:
    'Architecting the future of enterprise software. We blend artificial intelligence with world-class engineering to deliver unmatched digital experiences.',
};

export default function Footer() {
  const { data } = usePageSection('home', 'footer', defaultFooter);

  return (
    <footer className="bg-[#050816] pt-20 border-t border-white/10">
      <div className="container mx-auto px-6 max-w-7xl pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          <div className="lg:col-span-2">
            <a href="#" className="inline-flex items-center group mb-6">
              <img
                src="/logo.png"
                alt="KASSH.IT — Everyday. Reliable. Promised."
                className="h-16 sm:h-20 w-auto object-contain rounded-lg bg-white"
              />
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-8">
              {data.tagline}
            </p>
            <div className="flex items-center gap-4">
              {[FaLinkedinIn, SiX, SiGithub, SiYoutube, SiInstagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                { label: 'AI Development', href: '/services/ai' },
                { label: 'Custom Software', href: '/services/software' },
                { label: 'Mobile Apps', href: '/services/mobile' },
                { label: 'Cloud Architecture', href: '/services/cloud' },
                { label: 'UI/UX Design', href: '/services/uiux' },
                { label: 'Digital Marketing', href: '/services/marketing' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Our Clients', href: '/clients' },
                { label: 'Portfolio', href: '/work' },
                { label: 'Blog', href: '/#blog' },
                { label: 'Contact', href: '/#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Training</h4>
            <ul className="space-y-3">
              {['Bootcamps', 'Corporate Training', 'Online Courses', 'Certification', 'Hire Alumni'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-slate-400 hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20 py-6">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Kasshit. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-slate-500">
            Made with <span className="text-red-500">❤️</span> by Kasshit
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-sm text-slate-500 hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

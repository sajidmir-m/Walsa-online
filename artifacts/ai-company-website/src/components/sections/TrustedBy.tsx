import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiGoogle, SiMeta, SiStripe, SiVercel,
  SiGithub, SiFigma, SiNotion, SiShopify 
} from 'react-icons/si';
import { FaMicrosoft, FaAmazon, FaSlack } from 'react-icons/fa6';
import { SiOpenaigym } from 'react-icons/si';

const logos = [
  { icon: SiGoogle, name: 'Google' },
  { icon: FaMicrosoft, name: 'Microsoft' },
  { icon: FaAmazon, name: 'Amazon' },
  { icon: SiMeta, name: 'Meta' },
  { icon: SiStripe, name: 'Stripe' },
  { icon: SiOpenaigym, name: 'OpenAI' },
  { icon: SiVercel, name: 'Vercel' },
  { icon: SiGithub, name: 'GitHub' },
  { icon: SiFigma, name: 'Figma' },
  { icon: SiNotion, name: 'Notion' },
  { icon: FaSlack, name: 'Slack' },
  { icon: SiShopify, name: 'Shopify' },
];

export default function TrustedBy() {
  return (
    <section className="py-20 border-y border-white/5 bg-[#08111F] overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#08111F] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#08111F] to-transparent z-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl mb-12">
        <p className="text-center text-slate-400 text-sm font-medium tracking-wider uppercase">
          Trusted by innovative companies worldwide
        </p>
      </div>

      <div className="flex group w-full overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="flex flex-none min-w-full items-center justify-around gap-16 px-8 group-hover:[animation-play-state:paused]"
        >
          {[...logos, ...logos].map((Logo, index) => (
            <div key={index} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer">
              <Logo.icon className="w-8 h-8" />
              <span className="font-display font-bold text-xl tracking-tight hidden md:block">{Logo.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

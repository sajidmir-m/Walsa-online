import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { type Client } from '@/data/clients';
import { useClients } from '@/lib/useClients';
import { usePageSection } from '@/lib/pageContent';
import ClientDetailDialog from '@/components/ClientDetailDialog';
import ClientLogo from '@/components/ClientLogo';

const defaultIntro = {
  headline: 'Brands That',
  headline_highlight: 'Trust Us',
  body: 'Click any logo to see who they are, what we built together, and the results we delivered — across technology and marketing.',
};

export default function Clients() {
  const [, setLocation] = useLocation();
  const [selected, setSelected] = useState<Client | null>(null);
  const { clients } = useClients();
  const { data: intro } = usePageSection('clients', 'intro', defaultIntro);

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#050816]/90 backdrop-blur-md border-b border-white/5 flex items-center px-5">
        <button
          onClick={() => setLocation('/')}
          className="flex items-center group cursor-pointer bg-transparent border-none p-0 mr-6"
          aria-label="Kasshit home"
        >
          <img
            src="/logo.png"
            alt="Kasshit"
            className="h-11 w-auto object-contain rounded-md transition-transform group-hover:scale-105 duration-300"
          />
        </button>
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="hidden sm:block">Our Clients</span>
        </div>
        <button
          onClick={() => setLocation('/')}
          className="ml-auto flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:block">Back to Home</span>
        </button>
      </header>

      <main className="pt-28 pb-20 px-5 sm:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display mb-5 leading-tight">
            {intro.headline}{' '}
            <span className="bg-gradient-to-r from-primary to-[#00FFA3] text-transparent bg-clip-text">
              {intro.headline_highlight}
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">{intro.body}</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {clients.map((client, i) => (
            <motion.button
              key={client.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={() => setSelected(client)}
              className="group rounded-2xl bg-[#08111F] border border-white/5 hover:border-white/20 p-6 sm:p-8 flex flex-col items-center gap-4 cursor-pointer transition-all hover:-translate-y-1 text-left bg-transparent"
              data-testid={`client-card-${client.slug}`}
            >
              <ClientLogo
                client={client}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-lg group-hover:scale-110 transition-transform"
              />
              <div className="text-center">
                <h3 className="text-white font-semibold font-display text-sm sm:text-base mb-1">
                  {client.name}
                </h3>
                <span className="text-xs text-slate-500 uppercase tracking-wider">
                  {client.industry}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </main>

      <ClientDetailDialog
        client={selected}
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </div>
  );
}

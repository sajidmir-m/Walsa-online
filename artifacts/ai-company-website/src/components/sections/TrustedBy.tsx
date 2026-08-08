import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { type Client } from '@/data/clients';
import { useClients } from '@/lib/useClients';
import ClientDetailDialog from '@/components/ClientDetailDialog';
import ClientLogo from '@/components/ClientLogo';

export default function TrustedBy() {
  const [, setLocation] = useLocation();
  const [selected, setSelected] = useState<Client | null>(null);
  const { clients } = useClients();

  return (
    <section className="py-20 border-y border-white/5 bg-[#08111F] relative" id="clients">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-slate-400 text-sm font-medium tracking-wider uppercase mb-2">
              Our Clients
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Brands we build with
            </h2>
          </div>
          <button
            onClick={() => setLocation('/clients')}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors self-start sm:self-auto bg-transparent border-none cursor-pointer"
          >
            View All Clients →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {clients.map((client, i) => (
            <motion.button
              key={client.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              onClick={() => setSelected(client)}
              className="group rounded-xl bg-white/5 border border-white/5 hover:border-white/20 p-4 flex flex-col items-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5 bg-transparent"
              data-testid={`trusted-client-${client.slug}`}
              title={client.name}
            >
              <ClientLogo
                client={client}
                className="w-12 h-12 group-hover:scale-110 transition-transform shadow-md"
              />
              <span className="text-[11px] text-slate-400 group-hover:text-white transition-colors truncate w-full text-center">
                {client.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <ClientDetailDialog
        client={selected}
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </section>
  );
}

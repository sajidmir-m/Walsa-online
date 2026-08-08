import React, { useState } from 'react';
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
    <section className="py-20 border-y border-white/5 bg-[#08111F] relative overflow-hidden" id="clients">
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
      </div>

      {/* Auto-scrolling marquee — pauses on hover */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#08111F] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#08111F] to-transparent z-10 pointer-events-none" />

        <div className="trusted-marquee flex w-max">
          {[...clients, ...clients].map((client, i) => (
            <button
              key={`${client.slug}-${i}`}
              onClick={() => setSelected(client)}
              className="group w-44 sm:w-56 shrink-0 mx-2.5 sm:mx-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 p-6 sm:p-8 flex flex-col items-center gap-4 cursor-pointer transition-all hover:-translate-y-1"
              data-testid={`trusted-client-${client.slug}`}
              title={client.name}
            >
              <ClientLogo
                client={client}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl group-hover:scale-110 transition-transform shadow-lg"
              />
              <div className="text-center">
                <span className="block text-sm sm:text-base font-semibold text-white group-hover:text-primary transition-colors truncate w-full">
                  {client.name}
                </span>
                <span className="block text-[11px] text-slate-500 uppercase tracking-wider mt-1 truncate">
                  {client.industry}
                </span>
              </div>
            </button>
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

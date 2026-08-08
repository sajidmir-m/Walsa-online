import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { Client } from '@/data/clients';
import ClientLogo from '@/components/ClientLogo';

interface ClientDetailDialogProps {
  client: Client | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ClientDetailDialog({
  client,
  open,
  onOpenChange,
}: ClientDetailDialogProps) {
  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#08111F] border-white/10 text-white max-w-lg sm:max-w-xl">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <ClientLogo client={client} className="w-14 h-14 rounded-2xl shadow-lg" />
            <div>
              <DialogTitle className="text-xl font-display text-white">
                {client.name}
              </DialogTitle>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 uppercase tracking-wider">
                {client.industry}
              </span>
            </div>
          </div>
          <DialogDescription className="text-slate-400 text-sm leading-relaxed text-left">
            {client.summary}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Services Delivered</h4>
            <div className="flex flex-wrap gap-2">
              {client.services.map((service) => (
                <span
                  key={service}
                  className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Results</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {client.results.map((result) => (
                <div
                  key={result.label}
                  className="rounded-xl bg-white/5 border border-white/5 p-3 text-center"
                >
                  <div className="text-lg font-bold font-display text-white mb-0.5">
                    {result.value}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-tight">{result.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Case Study</h4>
            <p className="text-sm text-slate-400 leading-relaxed">{client.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

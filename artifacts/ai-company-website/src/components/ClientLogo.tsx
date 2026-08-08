import React, { useEffect, useState } from 'react';
import type { Client } from '@/data/clients';
import { cn } from '@/lib/utils';

interface ClientLogoProps {
  client: Client;
  className?: string;
  imgClassName?: string;
}

/** Renders client logo image; falls back to initials if the file is missing. */
export default function ClientLogo({ client, className, imgClassName }: ClientLogoProps) {
  const [failed, setFailed] = useState(false);

  // Retry when the logo URL changes (e.g. real Supabase data replacing the
  // static fallback after the initial fetch) — otherwise a 404 on the first
  // src would lock this component on initials forever.
  useEffect(() => {
    setFailed(false);
  }, [client.logoSrc]);

  if (failed || !client.logoSrc) {
    return (
      <div
        className={cn(
          `rounded-xl bg-gradient-to-br ${client.color} flex items-center justify-center`,
          className,
        )}
      >
        <span className="text-white font-bold font-display tracking-tight text-sm">
          {client.logoInitials}
        </span>
      </div>
    );
  }

  return (
    <div className={cn('rounded-xl overflow-hidden bg-white/5 shrink-0', className)}>
      <img
        src={client.logoSrc}
        alt={`${client.name} logo`}
        className={cn('w-full h-full object-contain', imgClassName)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

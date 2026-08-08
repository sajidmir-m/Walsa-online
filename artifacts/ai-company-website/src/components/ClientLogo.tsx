import React, { useState } from 'react';
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

  if (failed) {
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
        className={cn('w-full h-full object-cover', imgClassName)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

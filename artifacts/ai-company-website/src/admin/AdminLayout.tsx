import React from 'react';
import { Link, useLocation } from 'wouter';
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Users,
  Briefcase,
  Megaphone,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import { useAdminAuth } from '@/admin/AuthContext';

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/queries', label: 'Queries', icon: Inbox },
  { href: '/admin/pages', label: 'Pages', icon: FileText },
  { href: '/admin/work', label: 'Our Work', icon: Briefcase },
  { href: '/admin/clients', label: 'Clients', icon: Users },
  { href: '/admin/marketing', label: 'Marketing', icon: Megaphone },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { user, signOut } = useAdminAuth();
  const [open, setOpen] = React.useState(false);

  const handleLogout = async () => {
    await signOut();
    setLocation('/admin/login');
  };

  const isActive = (href: string, exact?: boolean) =>
    exact ? location === href : location === href || location.startsWith(href + '/');

  const Sidebar = (
    <aside className="w-64 shrink-0 border-r border-white/10 bg-[#050816] flex flex-col h-full">
      <div className="h-16 px-5 flex items-center gap-3 border-b border-white/10">
        <img src="/logo.png" alt="WALSA" className="h-10 w-auto rounded" />
        <div>
          <div className="text-white text-sm font-semibold">WALSA Admin</div>
          <div className="text-[11px] text-slate-500 truncate max-w-[140px]">{user?.email}</div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                active
                  ? 'bg-primary/15 text-primary'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5"
        >
          <ExternalLink className="w-4 h-4" />
          View Website
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-red-300 hover:bg-red-500/10 bg-transparent border-none cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#08111F] text-white flex">
      <div className="hidden lg:flex sticky top-0 h-screen">{Sidebar}</div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0">{Sidebar}</div>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 border-b border-white/10 bg-[#050816]/80 backdrop-blur sticky top-0 z-20 flex items-center px-4 sm:px-6 gap-3">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 border-none bg-transparent text-slate-300 cursor-pointer"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="text-sm text-slate-400">Content &amp; Leads Management</div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Leaf,
  LayoutDashboard,
  Tractor,
  Factory,
  Sparkles,
  MessageSquare,
  PlusCircle,
  Code2,
  ExternalLink,
} from 'lucide-react';

export default function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Overview',
      href: '/dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      label: 'Waste Listings (Supply)',
      href: '/dashboard/listings',
      icon: Tractor,
      badge: 'Supply',
    },
    {
      label: 'Industrial Demands',
      href: '/dashboard/demands',
      icon: Factory,
      badge: 'Demands',
    },
    {
      label: 'AI Matches',
      href: '/dashboard/matches',
      icon: Sparkles,
      badge: 'AI Active',
      highlight: true,
    },
    {
      label: 'Trade Messaging',
      href: '/dashboard/messages',
      icon: MessageSquare,
      badge: null,
    },
  ];

  return (
    <aside style={{
      width: 280,
      background: 'rgba(10, 18, 14, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 16px',
      minHeight: '100vh',
    }}>
      <div>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px 24px', borderBottom: '1px solid var(--border-subtle)', marginBottom: 20, textDecoration: 'none' }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(16, 185, 129, 0.3)',
          }}>
            <Leaf size={20} color="#042718" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
              MazaoLoop
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--primary-400)', fontWeight: 600 }}>
              AI Marketplace
            </div>
          </div>
        </Link>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          <Link
            href="/dashboard/listings/new"
            className="btn btn-primary btn-sm"
            style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
          >
            <PlusCircle size={16} />
            <span>List Crop Waste</span>
          </Link>
          <Link
            href="/dashboard/demands/new"
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
          >
            <Factory size={16} />
            <span>Post Buyer Demand</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 12px 8px' }}>
            Main Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'rgba(16, 185, 129, 0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(52, 211, 153, 0.3)' : '1px solid transparent',
                  color: isActive ? 'var(--primary-300)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.875rem',
                  transition: 'all 0.15s ease',
                  textDecoration: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon size={18} color={isActive ? 'var(--primary-400)' : 'currentColor'} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span style={{
                    fontSize: '0.6875rem',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-full)',
                    background: item.highlight ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                    color: item.highlight ? '#fcd34d' : 'var(--text-secondary)',
                    fontWeight: 600,
                  }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Studio Attribution in Sidebar */}
      <div>
        <a
          href="https://mikesth3tic.dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '12px 14px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary-400)', fontSize: '0.6875rem', fontWeight: 600, marginBottom: 2 }}>
              <Code2 size={13} /> mikesth3tic.dev
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              By Michael Ogutu Mokua
            </div>
          </div>
          <ExternalLink size={14} color="var(--text-muted)" />
        </a>
      </div>
    </aside>
  );
}

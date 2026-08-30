'use client';

import { useState } from 'react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Link from 'next/link';
import { Menu, X, Leaf, Bell, Search, Sparkles, PhoneCall } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
      {/* Desktop Sidebar */}
      <div className="desktop-sidebar" style={{ display: 'none' }}>
        <DashboardSidebar />
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top App Bar */}
        <header style={{
          height: 64,
          borderBottom: '1px solid var(--border-subtle)',
          background: 'rgba(10, 18, 14, 0.75)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                display: 'none',
                padding: 4,
              }}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Kenya Agricultural Circular Marketplace
              </span>
              <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>
                Nakuru / Kisumu Pilot
              </span>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link
              href="/dashboard/matches"
              className="btn btn-outline btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.75rem' }}
            >
              <Sparkles size={14} color="#fcd34d" />
              <span>3 AI Matches Waiting</span>
            </Link>

            <Link
              href="/"
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem' }}
            >
              Back to Home
            </Link>
          </div>
        </header>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
          }}>
            <div style={{ width: 280, height: '100%' }}>
              <DashboardSidebar />
            </div>
            <div style={{ flex: 1 }} onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* Dynamic Page Content */}
        <main style={{ flex: 1, padding: '32px 24px 64px', maxWidth: 1240, margin: '0 auto', width: '100%' }}>
          {children}
        </main>
      </div>

      <style jsx global>{`
        @media (min-width: 900px) {
          .desktop-sidebar {
            display: block !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        @media (max-width: 899px) {
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

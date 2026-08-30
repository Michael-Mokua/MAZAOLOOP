'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Leaf, Menu, X, ArrowRight, Sparkles, Globe } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(7, 13, 10, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(52, 211, 153, 0.12)',
      padding: '14px 24px',
    }}>
      <div style={{
        maxWidth: 1240,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)',
          }}>
            <Leaf size={22} color="#042718" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #ffffff 30%, #34d399 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                MazaoLoop
              </span>
              <a
                href="https://mikesth3tic.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="badge badge-primary"
                style={{ fontSize: '0.65rem', padding: '2px 6px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 3 }}
              >
                <span>mikesth3tic.dev</span>
              </a>
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>
              AI Crop Waste Circular Marketplace • By Michael Ogutu Mokua
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div style={{ display: 'none', alignItems: 'center', gap: 28 }} className="desktop-nav">
          <Link href="/#how-it-works" style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', fontWeight: 500, transition: 'color 0.2s' }}>
            How It Works
          </Link>
          <Link href="/#waste-types" style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', fontWeight: 500, transition: 'color 0.2s' }}>
            Waste Streams
          </Link>
          <Link href="/#climate-impact" style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', fontWeight: 500, transition: 'color 0.2s' }}>
            Climate Impact
          </Link>
          <Link href="/dashboard/listings" style={{ color: 'var(--text-primary)', fontSize: '0.9375rem', fontWeight: 600 }}>
            Supply Feed
          </Link>
          <Link href="/dashboard/demands" style={{ color: '#fcd34d', fontSize: '0.9375rem', fontWeight: 600 }}>
            Buyer Demands
          </Link>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/dashboard" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex' }}>
            Open Platform
          </Link>
          <Link href="/dashboard/listings/new" className="btn btn-primary btn-sm" style={{ display: 'inline-flex' }}>
            <span>List Waste</span>
            <ArrowRight size={14} />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'none',
              padding: 4,
            }}
            className="mobile-toggle"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          marginTop: 16,
          padding: '16px 8px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}>
          <Link href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', padding: '8px 0' }}>
            How It Works
          </Link>
          <Link href="/#waste-types" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', padding: '8px 0' }}>
            Supported Crop Residues
          </Link>
          <Link href="/#climate-impact" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', padding: '8px 0' }}>
            Climate &amp; Emissions Impact
          </Link>
          <Link href="/dashboard/listings" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--primary-300)', padding: '8px 0', fontWeight: 600 }}>
            Browse Supply Listings
          </Link>
          <Link href="/dashboard/demands" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fcd34d', padding: '8px 0', fontWeight: 600 }}>
            Browse Industrial Demands
          </Link>
          <Link href="/dashboard/matches" onClick={() => setMobileMenuOpen(false)} style={{ color: '#38bdf8', padding: '8px 0', fontWeight: 600 }}>
            AI Matching Engine
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
        }
        @media (max-width: 768px) {
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}

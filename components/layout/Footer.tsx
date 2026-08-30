import Link from 'next/link';
import { Leaf, ShieldCheck, Cpu, Globe2, Code2, Sparkles, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(52, 211, 153, 0.15)',
      background: 'linear-gradient(180deg, #070d0a 0%, #030604 100%)',
      padding: '64px 24px 36px',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 40,
          marginBottom: 48,
        }}>
          {/* Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Leaf size={20} color="#042718" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                MazaoLoop
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 16 }}>
              AI-powered agricultural byproduct &amp; waste marketplace turning discarded biomass into revenue for Kenyan farmers while feeding clean energy, bio-briquette, and feed manufacturers.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              fontSize: '0.75rem',
              color: 'var(--primary-300)',
            }}>
              <Code2 size={14} />
              <span>Created by Michael Ogutu Mokua • mikesth3tic.dev</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.9375rem', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Marketplace
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <li><Link href="/dashboard/listings" style={{ color: 'inherit', transition: 'color 0.2s' }}>Browse Waste Listings</Link></li>
              <li><Link href="/dashboard/demands" style={{ color: 'inherit' }}>Industrial Demand Feed</Link></li>
              <li><Link href="/dashboard/listings/new" style={{ color: 'inherit' }}>List Agricultural Waste</Link></li>
              <li><Link href="/dashboard/matches" style={{ color: 'inherit' }}>AI Matching Engine</Link></li>
              <li><Link href="/dashboard/messages" style={{ color: 'inherit' }}>Secure Trade Messaging</Link></li>
            </ul>
          </div>

          {/* Value Chains */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.9375rem', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Target Value Chains
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <li><span style={{ color: 'var(--text-primary)' }}>🌽 Maize Stalks &amp; Cobs</span> — Nakuru, Uasin Gishu, Trans-Nzoia</li>
              <li><span style={{ color: 'var(--text-primary)' }}>🎋 Sugarcane Bagasse</span> — Kisumu, Kakamega, Bungoma</li>
              <li><span style={{ color: 'var(--text-primary)' }}>☕ Coffee Husks &amp; Pulp</span> — Kiambu, Nyeri, Kirinyaga, Meru</li>
              <li><span style={{ color: 'var(--text-primary)' }}>⚡ Biogas &amp; Bio-Briquettes</span> — Clean cooking substitution</li>
            </ul>
          </div>

          {/* Software Studio info */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.9375rem', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Software Studio
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 14 }}>
              Engineered with modern full-stack web architecture, Supabase RLS, and high-speed Groq LPU inference.
            </p>
            <a
              href="https://mikesth3tic.dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#fff',
                textDecoration: 'none',
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Developed by</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#34d399', fontSize: '0.9375rem' }}>
                  mikesth3tic.dev
                </div>
              </div>
              <ExternalLink size={16} color="var(--text-muted)" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: 28,
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          fontSize: '0.8125rem',
          color: 'var(--text-muted)',
        }}>
          <div>
            © {new Date().getFullYear()} MazaoLoop. Built &amp; engineered by <a href="https://mikesth3tic.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-400)', fontWeight: 600, textDecoration: 'none' }}>Michael Ogutu Mokua</a> (mikesth3tic.dev).
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Cpu size={14} color="var(--primary-400)" />
              Llama 3.3 70B Engine
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={14} color="var(--accent-amber)" />
              Supabase RLS Protected
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Leaf, ArrowRight, Tractor, Factory, CheckCircle2 } from 'lucide-react';
import { KENYAN_COUNTIES } from '@/lib/constants';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'farmer' | 'buyer' | 'aggregator'>('farmer');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [county, setCounty] = useState('Nakuru');
  const [orgName, setOrgName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
    }}>
      <div className="glass-card" style={{
        maxWidth: 520,
        width: '100%',
        padding: '36px 32px',
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Leaf size={22} color="#042718" />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              MazaoLoop
            </span>
          </Link>
          <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: 4 }}>Create your account</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
            Join Kenya&apos;s circular cleantech crop waste marketplace
          </p>
        </div>

        {/* Role Selector */}
        <div style={{ marginBottom: 24 }}>
          <label className="form-label" style={{ marginBottom: 8 }}>I am joining as a:</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            <button
              type="button"
              onClick={() => setRole('farmer')}
              style={{
                padding: '12px 8px',
                borderRadius: 'var(--radius-md)',
                background: role === 'farmer' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: role === 'farmer' ? '2px solid var(--primary-400)' : '1px solid var(--border-subtle)',
                color: role === 'farmer' ? 'var(--primary-300)' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              Farmer (Supply)
            </button>
            <button
              type="button"
              onClick={() => setRole('buyer')}
              style={{
                padding: '12px 8px',
                borderRadius: 'var(--radius-md)',
                background: role === 'buyer' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: role === 'buyer' ? '2px solid #fcd34d' : '1px solid var(--border-subtle)',
                color: role === 'buyer' ? '#fcd34d' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              Off-taker (Buyer)
            </button>
            <button
              type="button"
              onClick={() => setRole('aggregator')}
              style={{
                padding: '12px 8px',
                borderRadius: 'var(--radius-md)',
                background: role === 'aggregator' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: role === 'aggregator' ? '2px solid #38bdf8' : '1px solid var(--border-subtle)',
                color: role === 'aggregator' ? '#38bdf8' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              Cooperative
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              className="form-input"
              required
              placeholder="e.g. Kiprono Cheruiyot"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="grid-2">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Phone Number (M-Pesa) *</label>
              <input
                type="tel"
                className="form-input"
                required
                placeholder="+254 7..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Primary County *</label>
              <select
                className="form-select"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
              >
                {KENYAN_COUNTIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Farm / Business / Cooperative Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Rongai Grain Growers / GreenFlame Ltd"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-md"
            disabled={loading}
            style={{ width: '100%', marginTop: 8 }}
          >
            <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--primary-400)', fontWeight: 600 }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

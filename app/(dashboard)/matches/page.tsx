'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_MATCHES } from '@/lib/mock-data';
import { WASTE_TYPES, USE_CASES } from '@/lib/constants';
import { formatWeight, formatDistance } from '@/lib/utils';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Cpu,
  RefreshCw,
  MapPin,
  Scale,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function MatchesPage() {
  const [matches, setMatches] = useState(MOCK_MATCHES);
  const [isMatching, setIsMatching] = useState(false);
  const [matchingStatusText, setMatchingStatusText] = useState('');

  const handleRunAiMatching = () => {
    setIsMatching(true);
    setMatchingStatusText('Phase 1: Running Haversine proximity & 10% volume threshold filter...');
    setTimeout(() => {
      setMatchingStatusText('Phase 2: Groq Llama 3.3 70B evaluating moisture suitability & transport logistics...');
      setTimeout(() => {
        setIsMatching(false);
        setMatchingStatusText('');
      }, 1200);
    }, 1000);
  };

  const handleAccept = (matchId: string) => {
    setMatches(prev => prev.map(m => m.id === matchId ? { ...m, status: 'accepted' } : m));
  };

  const handleReject = (matchId: string) => {
    setMatches(prev => prev.map(m => m.id === matchId ? { ...m, status: 'rejected' } : m));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Header & Re-scan Button */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span className="badge badge-amber">Groq Llama 3.3 70B Engine</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>KCIC Cleantech Innovation</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: 4 }}>
            AI Supply-Demand Match Center
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Automated pairing combining deterministic proximity rules with deep LLM reasoning.
          </p>
        </div>

        <button
          onClick={handleRunAiMatching}
          disabled={isMatching}
          className="btn btn-primary btn-md"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          <RefreshCw size={16} className={isMatching ? 'animate-spin' : ''} />
          <span>{isMatching ? 'Analyzing Marketplace...' : 'Run Live AI Re-Match'}</span>
        </button>
      </div>

      {/* Matching Status Banner */}
      {isMatching && (
        <div className="glass-card animate-fade-in" style={{
          padding: '16px 24px',
          border: '1px solid var(--border-focus)',
          background: 'rgba(16, 185, 129, 0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}>
          <div className="pulse-dot" />
          <div style={{ fontSize: '0.875rem', color: '#34d399', fontWeight: 600 }}>
            {matchingStatusText}
          </div>
        </div>
      )}

      {/* Hybrid Architecture Architecture Visualizer */}
      <div className="glass-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Cpu size={18} color="#fcd34d" />
          <h3 style={{ fontSize: '1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Hybrid 2-Tier AI Matching Architecture
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: 16,
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-emerald)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
              Tier 1: Deterministic Rules Filter
            </div>
            <ul style={{ listStyle: 'none', fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>• Waste Stream Exact Match (e.g. Maize Stalks)</li>
              <li>• Haversine Radial Distance ≤ 50km threshold</li>
              <li>• Minimum volume overlap ≥ 10% requirement</li>
              <li>• Temporal availability window verification</li>
            </ul>
          </div>

          <div style={{
            background: 'rgba(245, 158, 11, 0.05)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            borderRadius: 'var(--radius-md)',
            padding: 16,
          }}>
            <div style={{ fontSize: '0.75rem', color: '#fcd34d', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
              Tier 2: Groq Llama 3.3 70B Ranker
            </div>
            <ul style={{ listStyle: 'none', fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>• Conversion moisture suitability (Briquette vs Biogas)</li>
              <li>• Bulk transport route &amp; road access feasibility</li>
              <li>• Qualitative scoring (0–100) with written reasoning</li>
              <li>• Direct trade recommendation to both parties</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {matches.map((match) => {
          const wasteMeta = match.listing ? WASTE_TYPES[match.listing.waste_type] : null;
          const useCaseMeta = match.demand ? USE_CASES[match.demand.use_case] : null;

          return (
            <div key={match.id} className="glass-card" style={{ padding: 28 }}>
              {/* Top Bar: Waste Stream, Score Gauge & Status */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontSize: '2.4rem' }}>{wasteMeta?.emoji}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <h2 style={{ fontSize: '1.25rem', color: '#fff' }}>
                        {wasteMeta?.label}
                      </h2>
                      <span className={`badge ${match.status === 'accepted' ? 'badge-primary' : match.status === 'rejected' ? 'badge-subtle' : 'badge-amber'}`}>
                        {match.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      Haulage Distance: <strong style={{ color: '#fff' }}>{formatDistance(match.distance_km)}</strong>
                    </div>
                  </div>
                </div>

                {/* Score Gauge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      AI Match Score
                    </div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: match.match_score >= 90 ? 'var(--primary-300)' : '#fcd34d' }}>
                      {match.match_score >= 90 ? 'High Compatibility' : 'Moderate Match'}
                    </div>
                  </div>
                  <div className={`match-score-badge ${match.match_score >= 90 ? 'high' : 'medium'}`}>
                    {match.match_score}%
                  </div>
                </div>
              </div>

              {/* Side-by-Side Supply vs Demand Details */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 16,
                background: 'rgba(10, 18, 14, 0.7)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 18,
                marginBottom: 20,
              }}>
                {/* Farmer Side */}
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--primary-400)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
                    Supply (Farmer)
                  </div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#fff', marginBottom: 2 }}>
                    {formatWeight(match.listing?.quantity_kg || 0)} ({match.listing?.condition} condition)
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={13} color="var(--primary-400)" />
                    {match.listing?.location_name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    Farmer: {match.listing?.farmer?.full_name} ({match.listing?.farmer?.organization_name || 'Individual'})
                  </div>
                </div>

                {/* Buyer Side */}
                <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: 16 }}>
                  <div style={{ fontSize: '0.75rem', color: '#fcd34d', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
                    Demand (Off-taker)
                  </div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#fff', marginBottom: 2 }}>
                    {useCaseMeta?.label} Plant Target
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={13} color="#fcd34d" />
                    {match.demand?.location_name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    Off-taker: {match.demand?.buyer?.organization_name || match.demand?.buyer?.full_name}
                  </div>
                </div>
              </div>

              {/* LLM Written Reasoning */}
              <div style={{
                background: 'rgba(56, 189, 248, 0.05)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 18px',
                marginBottom: 20,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
                  <Sparkles size={14} /> Groq Llama 3.3 Inferred Reasoning
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  &quot;{match.match_reasoning}&quot;
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Created {new Date(match.created_at).toLocaleDateString()} • Ready for trade negotiation
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  {match.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleReject(match.id)}
                        className="btn btn-secondary btn-sm"
                        style={{ color: '#ef4444' }}
                      >
                        <XCircle size={14} />
                        <span>Decline</span>
                      </button>
                      <button
                        onClick={() => handleAccept(match.id)}
                        className="btn btn-primary btn-sm"
                      >
                        <CheckCircle2 size={14} />
                        <span>Accept Match</span>
                      </button>
                    </>
                  )}

                  <Link href="/dashboard/messages" className="btn btn-accent btn-sm">
                    <MessageSquare size={14} />
                    <span>Open Trade Chat &amp; Coordinate Logistics</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

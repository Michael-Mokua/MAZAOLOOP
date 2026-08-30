'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredListings, getStoredDemands, getStoredMatches } from '@/lib/data-store';
import { WasteListing, BuyerDemand, Match } from '@/lib/types';
import { WASTE_TYPES, USE_CASES } from '@/lib/constants';
import { formatWeight, formatDistance } from '@/lib/utils';
import {
  Tractor,
  Factory,
  Sparkles,
  ArrowRight,
  MapPin,
  TrendingUp,
  Flame,
  Recycle,
  CheckCircle2,
  Code2,
} from 'lucide-react';

export default function DashboardOverviewPage() {
  const [roleView, setRoleView] = useState<'farmer' | 'buyer'>('farmer');
  const [listings, setListings] = useState<WasteListing[]>([]);
  const [demands, setDemands] = useState<BuyerDemand[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    setListings(getStoredListings());
    setDemands(getStoredDemands());
    setMatches(getStoredMatches());
  }, []);

  const totalListedKg = listings.reduce((acc, item) => acc + (Number(item.quantity_kg) || 0), 0);
  const totalDemandKg = demands.reduce((acc, item) => acc + (Number(item.quantity_kg_max) || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* ─── Top Welcome & Role Switcher Bar ─────────────────────────── */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
        background: 'rgba(14, 23, 19, 0.6)',
        border: '1px solid var(--border-glass)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px 28px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span className="badge badge-primary">Circular Cleantech Marketplace</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Created by Michael Ogutu Mokua</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: 4 }}>
            Welcome to MazaoLoop, {roleView === 'farmer' ? 'Farmer View' : 'Industrial Buyer View'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {roleView === 'farmer'
              ? 'Your crop waste listings have active AI buyer matches ready for review.'
              : 'Explore standing feedstock orders sourcing from regional Kenyan farms.'}
          </p>
        </div>

        {/* View Toggle */}
        <div style={{
          display: 'flex',
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: 4,
        }}>
          <button
            onClick={() => setRoleView('farmer')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: roleView === 'farmer' ? 'var(--primary-600)' : 'transparent',
              color: roleView === 'farmer' ? '#fff' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <Tractor size={15} />
            <span>Farmer Mode</span>
          </button>
          <button
            onClick={() => setRoleView('buyer')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: roleView === 'buyer' ? 'var(--accent-amber)' : 'transparent',
              color: roleView === 'buyer' ? '#1a0f00' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <Factory size={15} />
            <span>Buyer Mode</span>
          </button>
        </div>
      </div>

      {/* ─── Metric KPI Cards ────────────────────────────────────────── */}
      <div className="grid-4">
        <div className="glass-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
              Active Supply Listed
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Tractor size={18} color="var(--primary-400)" />
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: 4 }}>
            {formatWeight(totalListedKg)}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-emerald)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <TrendingUp size={13} /> Across {listings.length} supply listings
          </div>
        </div>

        <div className="glass-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
              Industrial Demands
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Factory size={18} color="#fcd34d" />
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: 4 }}>
            {formatWeight(totalDemandKg)}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#fcd34d', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Flame size={13} /> {demands.length} active offtake orders
          </div>
        </div>

        <div className="glass-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
              AI Matches Found
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} color="#38bdf8" />
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: 4 }}>
            {matches.length} Matched
          </div>
          <div style={{ fontSize: '0.75rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: 4 }}>
            <CheckCircle2 size={13} /> Llama 3.3 70B proximity engine
          </div>
        </div>

        <div className="glass-card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
              CO₂e Diverted
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Recycle size={18} color="#c084fc" />
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: 4 }}>
            {((totalListedKg * 1.48) / 1000).toFixed(1)} Tons
          </div>
          <div style={{ fontSize: '0.75rem', color: '#c084fc', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Flame size={13} /> Burning emissions prevented
          </div>
        </div>
      </div>

      {/* ─── Top Match Spotlight ─────────────────────────────────────── */}
      {matches.length > 0 && (
        <div className="glass-card" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span className="badge badge-amber">Top AI Recommendation</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Groq Llama 3.3 70B Inferred</span>
              </div>
              <h2 style={{ fontSize: '1.35rem', color: '#fff' }}>
                High-Fit Match: {matches[0].listing?.location_name} ↔ {matches[0].demand?.location_name}
              </h2>
            </div>

            <Link href="/dashboard/matches" className="btn btn-primary btn-sm">
              <span>View All Matches</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{
            background: 'rgba(10, 18, 14, 0.8)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: 20,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div className="match-score-badge high">
                {matches[0].match_score}%
              </div>
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#34d399' }}>High Compatibility</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Distance: {formatDistance(matches[0].distance_km)}</div>
              </div>
            </div>

            <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: 20 }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>
                AI Match Reasoning
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                &quot;{matches[0].match_reasoning}&quot;
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <Link href="/dashboard/messages" className="btn btn-accent btn-sm">
                <span>Open Trade Chat</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ─── Two-Column Feeds ────────────────────────────────────────── */}
      <div className="grid-2">
        {/* Available Supply */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Tractor size={20} color="var(--primary-400)" />
              <h3 style={{ fontSize: '1.125rem', color: '#fff' }}>Available Waste Supply</h3>
            </div>
            <Link href="/dashboard/listings" style={{ fontSize: '0.8125rem', color: 'var(--primary-300)', fontWeight: 600 }}>
              View All ({listings.length}) →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {listings.length === 0 ? (
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                No active listings found.{' '}
                <Link href="/dashboard/listings/new" style={{ color: 'var(--primary-400)', textDecoration: 'underline' }}>
                  List your crop waste
                </Link>
              </div>
            ) : (
              listings.slice(0, 3).map((item) => {
                const wasteMeta = WASTE_TYPES[item.waste_type];
                return (
                  <div
                    key={item.id}
                    style={{
                      padding: 16,
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: '1.6rem' }}>{wasteMeta?.emoji}</span>
                      <div>
                        <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#fff' }}>
                          {formatWeight(item.quantity_kg)} — {wasteMeta?.label}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <MapPin size={12} />
                          {item.location_name}
                        </div>
                      </div>
                    </div>

                    <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>
                      {item.condition}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Industrial Demands */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Factory size={20} color="#fcd34d" />
              <h3 style={{ fontSize: '1.125rem', color: '#fff' }}>Industrial Demands</h3>
            </div>
            <Link href="/dashboard/demands" style={{ fontSize: '0.8125rem', color: '#fcd34d', fontWeight: 600 }}>
              View All ({demands.length}) →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {demands.length === 0 ? (
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                No standing demands posted.{' '}
                <Link href="/dashboard/demands/new" style={{ color: '#fcd34d', textDecoration: 'underline' }}>
                  Post a buyer demand
                </Link>
              </div>
            ) : (
              demands.map((item) => {
                const wasteMeta = WASTE_TYPES[item.waste_type];
                const useCaseMeta = USE_CASES[item.use_case];
                return (
                  <div
                    key={item.id}
                    style={{
                      padding: 16,
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: '1.6rem' }}>{wasteMeta?.emoji}</span>
                      <div>
                        <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#fff' }}>
                          {formatWeight(item.quantity_kg_min)}–{formatWeight(item.quantity_kg_max)} {wasteMeta?.label}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <MapPin size={12} />
                          {item.location_name}
                        </div>
                      </div>
                    </div>

                    <span className="badge badge-amber" style={{ fontSize: '0.6875rem' }}>
                      {useCaseMeta?.label || item.use_case}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

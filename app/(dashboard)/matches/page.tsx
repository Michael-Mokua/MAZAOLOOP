'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredMatches, updateMatchStatus } from '@/lib/data-store';
import { Match } from '@/lib/types';
import { formatDistance, formatWeight } from '@/lib/utils';
import {
  Sparkles,
  Tractor,
  Factory,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Bot
} from 'lucide-react';

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'accepted' | 'rejected'>('pending');

  useEffect(() => {
    setMatches(getStoredMatches());
  }, []);

  const filteredMatches = matches.filter(m => m.status === activeTab).sort((a, b) => b.match_score - a.match_score);

  const handleStatusUpdate = (matchId: string, newStatus: Match['status']) => {
    const updated = updateMatchStatus(matchId, newStatus);
    setMatches(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span className="badge badge-amber">Groq Llama 3.3 70B</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Proximity Engine</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: 4 }}>
            AI Match Recommendations
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Review calculated trade pairings between farm supply and industrial demand.
          </p>
        </div>

        <button className="btn btn-primary btn-md">
          <Sparkles size={16} />
          <span>Refresh AI Analysis</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 10, borderBottom: '1px solid var(--border-subtle)' }}>
        <button
          onClick={() => setActiveTab('pending')}
          style={{
            padding: '12px 20px',
            background: 'none',
            border: 'none',
            color: activeTab === 'pending' ? 'var(--primary-400)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'pending' ? '2px solid var(--primary-400)' : '2px solid transparent',
            fontWeight: 600,
            fontSize: '0.9375rem',
            cursor: 'pointer',
          }}
        >
          Pending Review ({matches.filter(m => m.status === 'pending').length})
        </button>
        <button
          onClick={() => setActiveTab('accepted')}
          style={{
            padding: '12px 20px',
            background: 'none',
            border: 'none',
            color: activeTab === 'accepted' ? '#34d399' : 'var(--text-secondary)',
            borderBottom: activeTab === 'accepted' ? '2px solid #34d399' : '2px solid transparent',
            fontWeight: 600,
            fontSize: '0.9375rem',
            cursor: 'pointer',
          }}
        >
          Accepted ({matches.filter(m => m.status === 'accepted').length})
        </button>
        <button
          onClick={() => setActiveTab('rejected')}
          style={{
            padding: '12px 20px',
            background: 'none',
            border: 'none',
            color: activeTab === 'rejected' ? '#ef4444' : 'var(--text-secondary)',
            borderBottom: activeTab === 'rejected' ? '2px solid #ef4444' : '2px solid transparent',
            fontWeight: 600,
            fontSize: '0.9375rem',
            cursor: 'pointer',
          }}
        >
          Rejected
        </button>
      </div>

      {/* Matches List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {filteredMatches.length === 0 ? (
          <div className="glass-card" style={{ padding: 48, textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, margin: '0 auto 16px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={32} color="#38bdf8" />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: 8 }}>No {activeTab} matches found</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              The Llama 3.3 70B model runs continuously as new supply and demand are posted.
            </p>
          </div>
        ) : (
          filteredMatches.map((match) => (
            <div key={match.id} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Top Score Bar */}
              <div style={{
                background: 'rgba(10, 18, 14, 0.8)',
                borderBottom: '1px solid var(--border-subtle)',
                padding: '16px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div className={`match-score-badge ${match.match_score > 85 ? 'high' : match.match_score > 70 ? 'medium' : 'low'}`}>
                    {match.match_score}%
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#fff' }}>AI Compatibility Score</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Logistics route: {formatDistance(match.distance_km)}</div>
                  </div>
                </div>

                {activeTab === 'pending' && (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => handleStatusUpdate(match.id, 'rejected')} className="btn btn-outline btn-sm" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                      <XCircle size={14} /> Ignore
                    </button>
                    <button onClick={() => handleStatusUpdate(match.id, 'accepted')} className="btn btn-primary btn-sm">
                      <CheckCircle2 size={14} /> Accept Match
                    </button>
                  </div>
                )}
                {activeTab === 'accepted' && (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <Link href={`/dashboard/messages?match=${match.id}`} className="btn btn-secondary btn-sm">
                      Open Chat
                    </Link>
                  </div>
                )}
              </div>

              <div className="grid-2" style={{ padding: 24, gap: 24, alignItems: 'center' }}>
                {/* Farmer Side */}
                <div style={{
                  padding: 16,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(16, 185, 129, 0.05)',
                  border: '1px solid rgba(16, 185, 129, 0.15)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color: 'var(--primary-400)' }}>
                    <Tractor size={18} />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase' }}>Supply Source</span>
                  </div>
                  {match.listing ? (
                    <>
                      <div style={{ fontSize: '1.125rem', color: '#fff', fontWeight: 600, marginBottom: 4 }}>
                        {formatWeight(match.listing.quantity_kg)} {match.listing.waste_type.replace('_', ' ')}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                        <MapPin size={12} /> {match.listing.location_name}
                      </div>
                      <div className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>{match.listing.condition}</div>
                    </>
                  ) : <div style={{ color: 'var(--text-muted)' }}>Listing data missing</div>}
                </div>

                {/* Buyer Side */}
                <div style={{
                  padding: 16,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(245, 158, 11, 0.05)',
                  border: '1px solid rgba(245, 158, 11, 0.15)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color: '#fcd34d' }}>
                    <Factory size={18} />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase' }}>Industrial Demand</span>
                  </div>
                  {match.demand ? (
                    <>
                      <div style={{ fontSize: '1.125rem', color: '#fff', fontWeight: 600, marginBottom: 4 }}>
                        Req: {formatWeight(match.demand.quantity_kg_min)} {match.demand.waste_type.replace('_', ' ')}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                        <MapPin size={12} /> {match.demand.location_name}
                      </div>
                      <div className="badge badge-amber" style={{ fontSize: '0.6875rem' }}>{match.demand.use_case}</div>
                    </>
                  ) : <div style={{ color: 'var(--text-muted)' }}>Demand data missing</div>}
                </div>
              </div>

              {/* AI Reasoning */}
              <div style={{ padding: '0 24px 24px' }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 16,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, color: '#38bdf8' }}>
                    <Bot size={14} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Llama 3.3 70B Reasoning</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                    &quot;{match.match_reasoning}&quot;
                  </p>
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

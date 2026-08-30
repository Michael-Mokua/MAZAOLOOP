'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredDemands } from '@/lib/data-store';
import { BuyerDemand } from '@/lib/types';
import { WASTE_TYPES, USE_CASES } from '@/lib/constants';
import { formatWeight, formatDate } from '@/lib/utils';
import {
  Factory,
  PlusCircle,
  MapPin,
  Calendar,
  Sparkles,
} from 'lucide-react';

export default function DemandsPage() {
  const [demands, setDemands] = useState<BuyerDemand[]>([]);
  const [selectedUseCase, setSelectedUseCase] = useState<string>('all');

  useEffect(() => {
    setDemands(getStoredDemands());
  }, []);

  const filteredDemands = demands.filter((item) => {
    return selectedUseCase === 'all' || item.use_case === selectedUseCase;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span className="badge badge-amber">Industrial Demand Feed</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Off-taker Contracts</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: 4 }}>
            Standing Agro-Industrial Demands
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Verified buyers sourcing bulk biomass, stalks, bagasse, and husks across Kenya.
          </p>
        </div>

        <Link href="/dashboard/demands/new" className="btn btn-accent btn-md">
          <PlusCircle size={16} />
          <span>Post Industrial Demand</span>
        </Link>
      </div>

      {/* Use Case Filter Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button
          onClick={() => setSelectedUseCase('all')}
          className={`btn btn-sm ${selectedUseCase === 'all' ? 'btn-primary' : 'btn-secondary'}`}
        >
          All Industrial Use Cases
        </button>
        {Object.entries(USE_CASES).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setSelectedUseCase(key)}
            className={`btn btn-sm ${selectedUseCase === key ? 'btn-primary' : 'btn-secondary'}`}
          >
            <span>{val.emoji}</span>
            <span>{val.label}</span>
          </button>
        ))}
      </div>

      {/* Demands Grid */}
      {filteredDemands.length === 0 ? (
        <div className="glass-card" style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: 12 }}>🏭</div>
          <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: 8 }}>No industrial demands match this category</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>Post your required feedstock specifications to source from regional farms.</p>
          <Link href="/dashboard/demands/new" className="btn btn-accent btn-md">
            <span>Post Buyer Demand</span>
          </Link>
        </div>
      ) : (
        <div className="grid-cards">
          {filteredDemands.map((demand) => {
            const wasteMeta = WASTE_TYPES[demand.waste_type];
            const useCaseMeta = USE_CASES[demand.use_case];
            return (
              <div key={demand.id} className="glass-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: '2rem' }}>{wasteMeta?.emoji}</span>
                      <div>
                        <h3 style={{ fontSize: '1.125rem', color: '#fff' }}>{wasteMeta?.label}</h3>
                        <div style={{ fontSize: '0.75rem', color: '#fcd34d', fontWeight: 600 }}>
                          Target: {formatWeight(demand.quantity_kg_min)}–{formatWeight(demand.quantity_kg_max)}
                        </div>
                      </div>
                    </div>

                    <span className="badge badge-amber" style={{ fontSize: '0.6875rem' }}>
                      {useCaseMeta?.label || demand.use_case}
                    </span>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: 18 }}>
                    {demand.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <MapPin size={14} color="var(--primary-400)" />
                      <span style={{ color: 'var(--text-primary)' }}>{demand.location_name} (Max radius {demand.max_distance_km}km)</span>
                    </div>
                    {demand.needed_by && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Calendar size={14} color="#fcd34d" />
                        <span>Target Delivery: {formatDate(demand.needed_by)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Link
                    href="/dashboard/matches"
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.75rem', display: 'inline-flex', gap: 4 }}
                  >
                    <Sparkles size={12} color="#fcd34d" />
                    <span>Scan Matching Supply</span>
                  </Link>

                  <Link
                    href="/dashboard/messages"
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem' }}
                  >
                    Submit Offer
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

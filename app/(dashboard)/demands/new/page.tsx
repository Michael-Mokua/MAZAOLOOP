'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WASTE_TYPES, KENYAN_COUNTIES, USE_CASES } from '@/lib/constants';
import { saveDemand } from '@/lib/data-store';
import { WasteType, WasteCondition, UseCase } from '@/lib/types';
import {
  Factory,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function NewDemandPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    waste_type: 'maize_stalks' as WasteType,
    quantity_kg_min: 5000,
    quantity_kg_max: 20000,
    preferred_condition: 'dried' as WasteCondition,
    use_case: 'briquettes' as UseCase,
    county: 'Nakuru',
    location_name: 'Nakuru Town Industrial Area',
    needed_by: new Date().toISOString().split('T')[0],
    max_distance_km: 60,
    description: 'Sourcing dry biomass for smokeless eco-briquette factory.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to real active store
    saveDemand({
      buyer_id: 'usr_b1',
      waste_type: formData.waste_type,
      quantity_kg_min: formData.quantity_kg_min,
      quantity_kg_max: formData.quantity_kg_max,
      preferred_condition: formData.preferred_condition,
      use_case: formData.use_case,
      description: formData.description,
      needed_by: formData.needed_by,
      latitude: -0.2833, // Defaulting to Nakuru for demo
      longitude: 36.0667,
      location_name: formData.location_name,
      max_distance_km: formData.max_distance_km,
      status: 'active',
    });

    setSubmitted(true);
    setTimeout(() => {
      router.push('/dashboard/matches');
    }, 1200);
  };

  return (
    <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span className="badge badge-amber">Industrial Buyer</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Continuous Feedstock Sourcing</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: 6 }}>
          Post Biomass Demand
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Publish your feedstock requirements to notify local farmers and trigger AI proximity matching.
        </p>
      </div>

      {submitted ? (
        <div className="glass-card" style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.2)', border: '2px solid var(--accent-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <CheckCircle2 size={36} color="var(--accent-amber)" />
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: 8 }}>Demand Successfully Published!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
            Running supply search within {formData.max_distance_km}km radius...
          </p>
          <div className="badge badge-amber" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
            <Sparkles size={16} /> Redirecting to Match Results...
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-card" style={{ padding: 32 }}>
          {/* Step 1: Waste Type */}
          <div className="form-group">
            <label className="form-label">Target Feedstock Type *</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
              {Object.entries(WASTE_TYPES).map(([key, item]) => {
                const isSelected = formData.waste_type === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFormData({ ...formData, waste_type: key as WasteType })}
                    style={{
                      padding: 16,
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '2px solid var(--accent-amber)' : '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ fontSize: '1.8rem' }}>{item.emoji}</span>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: isSelected ? '#fcd34d' : 'var(--text-primary)' }}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Scale & Process */}
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Required Tonnage (Min - Max kg) *</label>
              <div style={{ display: 'flex', gap: 12 }}>
                <input
                  type="number"
                  className="form-input"
                  min="100"
                  step="100"
                  placeholder="Min Kg"
                  required
                  value={formData.quantity_kg_min}
                  onChange={(e) => setFormData({ ...formData, quantity_kg_min: Number(e.target.value) })}
                />
                <input
                  type="number"
                  className="form-input"
                  min="100"
                  step="100"
                  placeholder="Max Kg"
                  required
                  value={formData.quantity_kg_max}
                  onChange={(e) => setFormData({ ...formData, quantity_kg_max: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Industrial Use Case *</label>
              <select
                className="form-select"
                value={formData.use_case}
                onChange={(e) => setFormData({ ...formData, use_case: e.target.value as UseCase })}
              >
                {Object.entries(USE_CASES).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Preferred Feedstock Condition *</label>
            <select
              className="form-select"
              value={formData.preferred_condition}
              onChange={(e) => setFormData({ ...formData, preferred_condition: e.target.value as WasteCondition })}
            >
              <option value="dried">Strictly Dried (&lt;15% moisture)</option>
              <option value="partially_dried">Partially Dried acceptable</option>
              <option value="fresh">Fresh Biomass only</option>
              <option value="mixed">Any / Mixed Condition</option>
            </select>
          </div>

          {/* Step 3: Location & Logistics */}
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Factory / Delivery Location *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Nakuru Town Industrial Area"
                required
                value={formData.location_name}
                onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Max Transport Radius (km) *</label>
              <input
                type="number"
                className="form-input"
                min="10"
                max="500"
                required
                value={formData.max_distance_km}
                onChange={(e) => setFormData({ ...formData, max_distance_km: Number(e.target.value) })}
              />
            </div>
          </div>

          {/* Step 4: Timing & Details */}
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Target Delivery Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.needed_by}
                onChange={(e) => setFormData({ ...formData, needed_by: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Logistics / Payment Notes</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. We provide transport. Payment on weighbridge."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-accent btn-lg" style={{ width: '100%', marginTop: 12 }}>
            <span>Publish Industrial Demand</span>
            <ArrowRight size={18} />
          </button>
        </form>
      )}
    </div>
  );
}

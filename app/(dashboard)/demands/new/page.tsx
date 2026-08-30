'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WASTE_TYPES, KENYAN_COUNTIES, USE_CASES } from '@/lib/constants';
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
    waste_type: 'maize_stalks',
    use_case: 'briquettes',
    quantity_kg_min: 5000,
    quantity_kg_max: 20000,
    preferred_condition: 'dried',
    max_distance_km: 60,
    county: 'Nakuru',
    sub_county: 'Nakuru Town Industrial Area',
    location_name: 'Nakuru Town Industrial Area, Nakuru',
    needed_by: '2026-09-30',
    description: 'Sourcing dry maize stalks/cobs for eco-briquette factory with low moisture requirements.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push('/dashboard/matches');
    }, 1500);
  };

  return (
    <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span className="badge badge-amber">Industrial Demand Post</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Off-take Feedstock</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: 6 }}>
          Post Biomass Feedstock Demand
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Define your required residue type, moisture specs, and maximum transport radius to automatically match with regional farms.
        </p>
      </div>

      {submitted ? (
        <div className="glass-card" style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.2)', border: '2px solid #fcd34d', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <CheckCircle2 size={36} color="#fcd34d" />
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: 8 }}>Demand Order Published!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
            Groq Llama 3.3 70B is ranking compatible smallholders within your {formData.max_distance_km}km haulage radius...
          </p>
          <div className="badge badge-primary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
            <Sparkles size={16} /> Opening Matches Hub...
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-card" style={{ padding: 32 }}>
          {/* Step 1: Waste Type */}
          <div className="form-group">
            <label className="form-label">Required Crop Waste Feedstock *</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
              {Object.entries(WASTE_TYPES).map(([key, item]) => {
                const isSelected = formData.waste_type === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFormData({ ...formData, waste_type: key })}
                    style={{
                      padding: 16,
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '2px solid #fcd34d' : '1px solid var(--border-subtle)',
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

          {/* Step 2: Use Case & Condition */}
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Industrial Use Case *</label>
              <select
                className="form-select"
                value={formData.use_case}
                onChange={(e) => setFormData({ ...formData, use_case: e.target.value })}
              >
                {Object.entries(USE_CASES).map(([key, val]) => (
                  <option key={key} value={key}>{val.emoji} {val.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Required Moisture Condition *</label>
              <select
                className="form-select"
                value={formData.preferred_condition}
                onChange={(e) => setFormData({ ...formData, preferred_condition: e.target.value })}
              >
                <option value="dried">Strictly Dried (&lt;15% Moisture)</option>
                <option value="partially_dried">Partially Dried Acceptable</option>
                <option value="fresh">Fresh Biomass Acceptable</option>
                <option value="any">Any Condition</option>
              </select>
            </div>
          </div>

          {/* Step 3: Volume Range */}
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Minimum Volume (kg) *</label>
              <input
                type="number"
                className="form-input"
                min="500"
                step="500"
                required
                value={formData.quantity_kg_min}
                onChange={(e) => setFormData({ ...formData, quantity_kg_min: Number(e.target.value) })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Maximum Volume Target (kg) *</label>
              <input
                type="number"
                className="form-input"
                min="1000"
                step="1000"
                required
                value={formData.quantity_kg_max}
                onChange={(e) => setFormData({ ...formData, quantity_kg_max: Number(e.target.value) })}
              />
            </div>
          </div>

          {/* Step 4: Max Haulage Radius & Location */}
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Processing Plant County *</label>
              <select
                className="form-select"
                value={formData.county}
                onChange={(e) => setFormData({ ...formData, county: e.target.value, location_name: `${formData.sub_county}, ${e.target.value} County` })}
              >
                {KENYAN_COUNTIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Maximum Haulage Distance (km) *</label>
              <input
                type="number"
                className="form-input"
                min="10"
                max="250"
                required
                value={formData.max_distance_km}
                onChange={(e) => setFormData({ ...formData, max_distance_km: Number(e.target.value) })}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Rule filter will exclude farms beyond {formData.max_distance_km}km.
              </span>
            </div>
          </div>

          {/* Step 5: Deadline & Specifications */}
          <div className="form-group">
            <label className="form-label">Special Off-taker Specifications</label>
            <input
              type="text"
              className="form-input"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-accent btn-lg" style={{ width: '100%' }}>
            <span>Post Demand &amp; Match Regional Farms</span>
            <ArrowRight size={18} />
          </button>
        </form>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WASTE_TYPES, KENYAN_COUNTIES } from '@/lib/constants';
import { saveListing } from '@/lib/data-store';
import { WasteType, WasteCondition } from '@/lib/types';
import {
  Tractor,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function NewListingPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    waste_type: 'maize_stalks' as WasteType,
    quantity_kg: 5000,
    condition: 'dried' as WasteCondition,
    county: 'Nakuru',
    sub_county: 'Rongai',
    location_name: 'Rongai Sub-County, Nakuru County',
    available_from: new Date().toISOString().split('T')[0],
    description: 'Post-harvest clean stalks baled and stacked, dry condition.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to real active store
    saveListing({
      farmer_id: 'usr_f1',
      waste_type: formData.waste_type,
      quantity_kg: formData.quantity_kg,
      condition: formData.condition,
      available_from: formData.available_from,
      available_until: null,
      latitude: -0.1742,
      longitude: 35.8644,
      location_name: formData.location_name,
      status: 'active',
      images: [],
      description: formData.description,
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
          <span className="badge badge-primary">Farmer Supply Creation</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AI-Automated Pairing</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: 6 }}>
          List Agricultural Crop Waste
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Post your agricultural residue to instantly trigger Groq Llama 3.3 70B matching with registered industrial buyers.
        </p>
      </div>

      {submitted ? (
        <div className="glass-card" style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', border: '2px solid var(--primary-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <CheckCircle2 size={36} color="var(--primary-400)" />
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: 8 }}>Listing Successfully Published!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
            Running AI proximity engine &amp; matching with active buyers in your county...
          </p>
          <div className="badge badge-amber" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
            <Sparkles size={16} /> Redirecting to AI Matches Hub...
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-card" style={{ padding: 32 }}>
          {/* Step 1: Waste Type */}
          <div className="form-group">
            <label className="form-label">Select Crop Waste Type *</label>
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
                      background: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '2px solid var(--primary-400)' : '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ fontSize: '1.8rem' }}>{item.emoji}</span>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: isSelected ? 'var(--primary-300)' : 'var(--text-primary)' }}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Quantity & Condition */}
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Estimated Quantity (Kilograms) *</label>
              <input
                type="number"
                className="form-input"
                min="100"
                step="100"
                required
                value={formData.quantity_kg}
                onChange={(e) => setFormData({ ...formData, quantity_kg: Number(e.target.value) })}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Approx {(formData.quantity_kg / 1000).toFixed(1)} metric tons
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">Moisture / Storage Condition *</label>
              <select
                className="form-select"
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value as WasteCondition })}
              >
                <option value="dried">Dried (Briquette Ready &lt;15% moisture)</option>
                <option value="partially_dried">Partially Dried (Sun-dried)</option>
                <option value="fresh">Fresh Harvest (Biogas / Compost ready)</option>
                <option value="mixed">Mixed Condition</option>
              </select>
            </div>
          </div>

          {/* Step 3: Location */}
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">County *</label>
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
              <label className="form-label">Sub-County / Area Name *</label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.sub_county}
                onChange={(e) => setFormData({ ...formData, sub_county: e.target.value, location_name: `${e.target.value}, ${formData.county} County` })}
              />
            </div>
          </div>

          {/* Step 4: Availability & Notes */}
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Available From Date *</label>
              <input
                type="date"
                className="form-input"
                required
                value={formData.available_from}
                onChange={(e) => setFormData({ ...formData, available_from: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Truck Access / Farm Notes</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 10-ton lorry access available"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div style={{
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 24,
          }}>
            <Sparkles size={20} color="#38bdf8" />
            <div style={{ fontSize: '0.8125rem', color: '#93c5fd', lineHeight: 1.4 }}>
              <strong>AI Matching Active:</strong> Upon publishing, the Groq Llama 3.3 70B model will scan registered buyers within a 50km radius and evaluate transport feasibility.
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            <span>Publish Waste Listing &amp; Find Buyers</span>
            <ArrowRight size={18} />
          </button>
        </form>
      )}
    </div>
  );
}

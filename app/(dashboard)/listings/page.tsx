'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredListings } from '@/lib/data-store';
import { WasteListing } from '@/lib/types';
import { WASTE_TYPES, KENYAN_COUNTIES } from '@/lib/constants';
import { formatWeight, formatDate } from '@/lib/utils';
import {
  Tractor,
  PlusCircle,
  Search,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function ListingsPage() {
  const [listings, setListings] = useState<WasteListing[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCounty, setSelectedCounty] = useState<string>('all');

  useEffect(() => {
    setListings(getStoredListings());
  }, []);

  const filteredListings = listings.filter((item) => {
    const matchesSearch = item.location_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || item.waste_type === selectedType;
    const matchesCounty = selectedCounty === 'all' || item.location_name.includes(selectedCounty);
    return matchesSearch && matchesType && matchesCounty;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span className="badge badge-primary">Supply Marketplace</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Farm Feedstocks</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: 4 }}>
            Browse Crop Waste Supply
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Direct listings from Kenyan smallholder farmers and agricultural cooperatives.
          </p>
        </div>

        <Link href="/dashboard/listings/new" className="btn btn-primary btn-md">
          <PlusCircle size={16} />
          <span>List Your Crop Waste</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ padding: 20, display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
        {/* Search */}
        <div style={{ flex: '1 1 240px', minWidth: 200, position: 'relative' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: 40 }}
            placeholder="Search by location, county, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Waste Type Select */}
        <div style={{ flex: '0 1 200px' }}>
          <select
            className="form-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Waste Streams</option>
            {Object.entries(WASTE_TYPES).map(([key, val]) => (
              <option key={key} value={key}>{val.emoji} {val.label}</option>
            ))}
          </select>
        </div>

        {/* County Select */}
        <div style={{ flex: '0 1 180px' }}>
          <select
            className="form-select"
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)}
          >
            <option value="all">All Counties</option>
            {KENYAN_COUNTIES.slice(0, 15).map((county) => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <div className="glass-card" style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: 12 }}>🌾</div>
          <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: 8 }}>No waste listings match your filters</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>Try resetting your search or publish a new crop waste listing.</p>
          <Link href="/dashboard/listings/new" className="btn btn-primary btn-md">
            <span>List Crop Waste</span>
          </Link>
        </div>
      ) : (
        <div className="grid-cards">
          {filteredListings.map((listing) => {
            const wasteMeta = WASTE_TYPES[listing.waste_type];
            return (
              <div key={listing.id} className="glass-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: '2rem' }}>{wasteMeta?.emoji}</span>
                      <div>
                        <h3 style={{ fontSize: '1.125rem', color: '#fff' }}>{wasteMeta?.label}</h3>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-emerald)', fontWeight: 600 }}>
                          {formatWeight(listing.quantity_kg)} Available
                        </div>
                      </div>
                    </div>

                    <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>
                      {listing.condition}
                    </span>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: 18 }}>
                    {listing.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <MapPin size={14} color="var(--primary-400)" />
                      <span style={{ color: 'var(--text-primary)' }}>{listing.location_name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Calendar size={14} color="#fcd34d" />
                      <span>Available: {formatDate(listing.available_from)}</span>
                    </div>
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
                    <span>Match with Buyers</span>
                  </Link>

                  <Link
                    href="/dashboard/messages"
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem' }}
                  >
                    Contact
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

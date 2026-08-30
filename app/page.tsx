'use client';

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { WASTE_TYPES } from '@/lib/constants';
import {
  ArrowRight,
  Sparkles,
  Flame,
  Recycle,
  TrendingUp,
  ShieldCheck,
  Zap,
  MapPin,
  Scale,
  Cpu,
  ChevronRight,
  CheckCircle2,
  Factory,
  Tractor,
  Layers,
  Code2,
  ExternalLink
} from 'lucide-react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'farmers' | 'buyers'>('farmers');
  const [selectedRadius, setSelectedRadius] = useState(30);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* ─── Hero Section ─────────────────────────────────────────── */}
      <section style={{
        padding: '70px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', textAlign: 'center' }}>
          {/* Top Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <a
              href="https://mikesth3tic.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="badge badge-primary"
              style={{ padding: '6px 14px', fontSize: '0.8125rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <Code2 size={14} />
              <span>Engineered by Michael Ogutu Mokua (mikesth3tic.dev)</span>
            </a>
            <span className="badge badge-amber" style={{ padding: '6px 14px', fontSize: '0.8125rem' }}>
              <Zap size={14} />
              Groq Llama 3.3 70B Engine
            </span>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: 960,
            margin: '0 auto 24px',
            letterSpacing: '-0.03em',
          }}>
            Turn Discarded <span style={{
              background: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Crop Waste</span> Into Tradeable Clean Revenue
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: 760,
            margin: '0 auto 36px',
            lineHeight: 1.6,
          }}>
            Kenya produces millions of tons of crop residue that gets burned or dumped. MazaoLoop connects smallholder farmers with bio-briquette, biogas, animal feed, and compost manufacturers through intelligent AI proximity matching &amp; verified trade logistics.
          </p>

          {/* CTA Group */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 56,
          }}>
            <Link href="/dashboard/listings/new" className="btn btn-primary btn-lg">
              <span>List Crop Waste (Farmer)</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/dashboard/demands/new" className="btn btn-accent btn-lg">
              <span>Post Buyer Demand (Industry)</span>
              <Factory size={18} />
            </Link>
            <Link href="/dashboard" className="btn btn-secondary btn-lg">
              <span>Explore Marketplace App</span>
            </Link>
          </div>

          {/* Realtime Impact Ticker */}
          <div className="glass-card" style={{
            maxWidth: 1060,
            margin: '0 auto',
            padding: '24px 32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 24,
            textAlign: 'left',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-emerald)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>
                <Flame size={16} />
                Open Burning Avoided
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.875rem', fontWeight: 800, color: '#fff' }}>
                4,200+ <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Tons CO₂e</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Black carbon mitigation</div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fcd34d', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>
                <Recycle size={16} />
                Biomass Monetized
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.875rem', fontWeight: 800, color: '#fff' }}>
                18,500+ <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Tons</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Maize stover, bagasse &amp; husks</div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>
                <TrendingUp size={16} />
                Farmer Income Created
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.875rem', fontWeight: 800, color: '#fff' }}>
                KES 34.2M+
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>New circular revenue line</div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#a78bfa', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>
                <Cpu size={16} />
                AI Match Accuracy
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.875rem', fontWeight: 800, color: '#fff' }}>
                94.8%
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Groq Llama 3.3 70B reasoning</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works (AI Matching Flow) ─────────────────────────── */}
      <section id="how-it-works" style={{ padding: '70px 24px', background: 'rgba(14, 23, 19, 0.4)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <span className="badge badge-primary" style={{ marginBottom: 12 }}>3-Step Circular Pipeline</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: 14 }}>
              How MazaoLoop Turns Waste Into Value
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 640, margin: '0 auto', fontSize: '1rem' }}>
              Unlike generic marketplaces for fresh crops, MazaoLoop is purpose-engineered for bulk agricultural byproducts with specialized logistics and moisture filtering.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
            {/* Step 1 */}
            <div className="glass-card" style={{ padding: 32, position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: 24,
                right: 24,
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                fontWeight: 900,
                color: 'rgba(52, 211, 153, 0.15)',
              }}>
                01
              </div>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
                <Tractor size={24} color="var(--primary-400)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 12, color: '#fff' }}>
                1. Farmers List Waste
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: 16 }}>
                Farmers post crop residue details (stalks, bagasse, husks), estimated volume (kg/tons), moisture condition, and farm GPS location.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', color: 'var(--text-emerald)' }}>
                <CheckCircle2 size={14} /> Zero upfront listing fees
              </div>
            </div>

            {/* Step 2 */}
            <div className="glass-card" style={{ padding: 32, position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: 24,
                right: 24,
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                fontWeight: 900,
                color: 'rgba(245, 158, 11, 0.15)',
              }}>
                02
              </div>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
                <Cpu size={24} color="#fbbf24" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 12, color: '#fff' }}>
                2. Hybrid AI Proximity Matching
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: 16 }}>
                Our 2-pass engine runs Haversine radial distance &amp; volume threshold rules, then triggers Groq Llama 3.3 70B to evaluate moisture suitability against specific industrial use cases.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', color: '#fcd34d' }}>
                <CheckCircle2 size={14} /> Sub-50km haulage optimization
              </div>
            </div>

            {/* Step 3 */}
            <div className="glass-card" style={{ padding: 32, position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: 24,
                right: 24,
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                fontWeight: 900,
                color: 'rgba(56, 189, 248, 0.15)',
              }}>
                03
              </div>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
                <Factory size={24} color="#38bdf8" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 12, color: '#fff' }}>
                3. Direct Trade &amp; Off-Take
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: 16 }}>
                Matched buyers (briquette factories, feed millers, biogas plants) accept trades, coordinate collection logistics, and execute transparent farm-gate or delivered payments.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', color: '#93c5fd' }}>
                <CheckCircle2 size={14} /> In-app messaging &amp; verified contacts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Waste Streams (MVP Focus) ─────────────────────────────── */}
      <section id="waste-types" style={{ padding: '70px 24px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <span className="badge badge-amber" style={{ marginBottom: 12 }}>Target Agricultural Feedstocks</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: 14 }}>
              High-Volume Waste Streams Supported
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 680, margin: '0 auto', fontSize: '1rem' }}>
              We strategically target Kenya&apos;s largest agro-industrial residue volumes with proven conversion pathways into clean energy, animal nutrition, and organic soil regenerators.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 24 }}>
            {Object.entries(WASTE_TYPES).map(([key, item]) => (
              <div key={key} className="glass-card" style={{ padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '2.5rem', marginBottom: 14 }}>{item.emoji}</div>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: 10 }}>{item.label}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 20 }}>
                    {item.description}
                  </p>
                </div>
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>
                    Primary Industrial Use
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {key.includes('maize') && (
                      <>
                        <span className="badge badge-primary">Bio-Briquettes</span>
                        <span className="badge badge-subtle">Cattle Stover Feed</span>
                      </>
                    )}
                    {key.includes('sugarcane') && (
                      <>
                        <span className="badge badge-primary">Biogas Digestion</span>
                        <span className="badge badge-amber">Boiler Fuel</span>
                      </>
                    )}
                    {key.includes('coffee') && (
                      <>
                        <span className="badge badge-primary">High-Calorie Briquettes</span>
                        <span className="badge badge-blue">Compost</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Two-Sided Value Proposition ─────────────────────────────── */}
      <section style={{ padding: '70px 24px', background: 'rgba(14, 23, 19, 0.4)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="badge badge-primary" style={{ marginBottom: 12 }}>Ecosystem Value</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}>
              Built for Every Player in the Value Chain
            </h2>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 36 }}>
            <button
              onClick={() => setActiveTab('farmers')}
              className={`btn ${activeTab === 'farmers' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '10px 24px' }}
            >
              <Tractor size={18} /> For Farmers &amp; Cooperatives
            </button>
            <button
              onClick={() => setActiveTab('buyers')}
              className={`btn ${activeTab === 'buyers' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '10px 24px' }}
            >
              <Factory size={18} /> For Commercial Buyers &amp; Processors
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'farmers' ? (
            <div className="grid-3">
              <div className="glass-card" style={{ padding: 28 }}>
                <div style={{ color: 'var(--primary-400)', marginBottom: 14 }}><TrendingUp size={28} /></div>
                <h4 style={{ color: '#fff', fontSize: '1.125rem', marginBottom: 8 }}>Diversified Income</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  Monetize residue that previously cost money to clear or burn. Gain transparent pricing benchmarks across your county.
                </p>
              </div>
              <div className="glass-card" style={{ padding: 28 }}>
                <div style={{ color: '#fcd34d', marginBottom: 14 }}><Zap size={28} /></div>
                <h4 style={{ color: '#fff', fontSize: '1.125rem', marginBottom: 8 }}>Instant AI Buyer Pairing</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  Post your waste in under 60 seconds. Our algorithm immediately finds verified off-takers searching in your area.
                </p>
              </div>
              <div className="glass-card" style={{ padding: 28 }}>
                <div style={{ color: '#38bdf8', marginBottom: 14 }}><Layers size={28} /></div>
                <h4 style={{ color: '#fff', fontSize: '1.125rem', marginBottom: 8 }}>Co-op Aggregation</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  Tools for cooperative managers to bundle smallholder residue into 20-ton industrial-scale lots for higher bargaining power.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid-3">
              <div className="glass-card" style={{ padding: 28 }}>
                <div style={{ color: '#38bdf8', marginBottom: 14 }}><ShieldCheck size={28} /></div>
                <h4 style={{ color: '#fff', fontSize: '1.125rem', marginBottom: 8 }}>Reliable Feedstock Supply</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  Replace erratic word-of-mouth sourcing with direct, predictable pipeline of dry biomass and sugarcane residue.
                </p>
              </div>
              <div className="glass-card" style={{ padding: 28 }}>
                <div style={{ color: 'var(--primary-400)', marginBottom: 14 }}><MapPin size={28} /></div>
                <h4 style={{ color: '#fff', fontSize: '1.125rem', marginBottom: 8 }}>Optimized Transport Costs</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  Proximity scoring strictly favors farms within your preferred radius (e.g. &lt;50km) to protect processing unit margins.
                </p>
              </div>
              <div className="glass-card" style={{ padding: 28 }}>
                <div style={{ color: '#fcd34d', marginBottom: 14 }}><Recycle size={28} /></div>
                <h4 style={{ color: '#fff', fontSize: '1.125rem', marginBottom: 8 }}>Traceable ESG Accounting</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  Track provenance of your clean energy feedstock for climate certifiers, carbon credits, and environmental audits.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── AI Proximity Engine Interactive Showcase ────────────────── */}
      <section style={{ padding: '70px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div className="glass-card" style={{
            padding: '48px 36px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 40,
            alignItems: 'center',
          }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: 14 }}>Logistics Optimization</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: 16, color: '#fff' }}>
                Precision Proximity &amp; Moisture Matching
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
                Hauling bulky crop waste over long distances kills profitability. MazaoLoop continuously evaluates Haversine radial distance and moisture suitability for specific conversion technologies.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary-400)' }} />
                  Automated Haversine distance calculation
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fcd34d' }} />
                  Llama 3.3 70B reasoning on briquette vs biogas moisture fit
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#38bdf8' }} />
                  Direct trade negotiation and farm-gate scheduling
                </div>
              </div>
            </div>

            {/* Live Interactive Engine Card */}
            <div style={{
              background: '#040705',
              border: '2px solid rgba(52, 211, 153, 0.3)',
              borderRadius: 24,
              padding: 24,
              boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(16, 185, 129, 0.15)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-emerald)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Live Radius Simulator
                </span>
                <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>Active Engine</span>
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: 6 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Max Haulage Radius:</span>
                  <strong style={{ color: '#fff' }}>{selectedRadius} km</strong>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={selectedRadius}
                  onChange={(e) => setSelectedRadius(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary-400)', cursor: 'pointer' }}
                />
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 'var(--radius-md)',
                padding: 16,
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>🌽 Maize Stalks (Rongai)</span>
                  <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>21.4 km</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Target: GreenFlame Briquettes (Nakuru Town)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: selectedRadius >= 22 ? 'var(--primary-300)' : '#ef4444' }}>
                  {selectedRadius >= 22 ? <CheckCircle2 size={14} /> : <span style={{ fontWeight: 'bold' }}>✕</span>}
                  {selectedRadius >= 22 ? 'Feasible Haulage Match (96% Compatibility)' : 'Exceeds transport radius cutoff'}
                </div>
              </div>

              <div style={{ marginTop: 18, textAlign: 'center' }}>
                <Link href="/dashboard/matches" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                  <span>Open Matching Center</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Call To Action ─────────────────────────────────────────── */}
      <section style={{
        padding: '80px 24px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(14, 23, 19, 0.4) 0%, #070d0a 100%)',
      }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 16, letterSpacing: '-0.03em' }}>
            Ready to Monetize Agricultural Waste?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: 36, lineHeight: 1.6 }}>
            Join the forward-thinking Kenyan farmers and bio-processors powering Kenya&apos;s circular economy.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
            <Link href="/dashboard" className="btn btn-primary btn-lg">
              <span>Open MazaoLoop Dashboard</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/dashboard/listings" className="btn btn-secondary btn-lg">
              <span>Browse Active Supply</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

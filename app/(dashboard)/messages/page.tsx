'use client';

import { useState } from 'react';
import { MOCK_MESSAGES, MOCK_MATCHES, MOCK_PROFILES } from '@/lib/mock-data';
import {
  MessageSquare,
  Send,
  PhoneCall,
  MapPin,
  Calendar,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function MessagesPage() {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [activeMatch, setActiveMatch] = useState(MOCK_MATCHES[0]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      match_id: activeMatch.id,
      sender_id: 'usr_f3',
      content: inputVal.trim(),
      created_at: new Date().toISOString(),
      sender: MOCK_PROFILES[2],
    };

    setMessages([...messages, newMsg]);
    setInputVal('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span className="badge badge-primary">Trade &amp; Logistics Exchange</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Counterparty Channel</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: 4 }}>
          Crop Waste Trade Messaging
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Negotiate farm-gate pricing, verify transport truck clearance, and schedule bulk loading.
        </p>
      </div>

      {/* Two-Pane Messaging Interface */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 320px) 1fr',
        gap: 20,
        minHeight: 560,
      }}>
        {/* Left Pane: Conversations / Matches */}
        <div className="glass-card" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
            Active Trade Deals
          </div>

          {MOCK_MATCHES.map((match) => {
            const isSelected = activeMatch.id === match.id;
            return (
              <button
                key={match.id}
                onClick={() => setActiveMatch(match)}
                style={{
                  padding: 14,
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  border: isSelected ? '1px solid var(--primary-400)' : '1px solid var(--border-subtle)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>
                    {match.demand?.buyer?.organization_name || 'Buyer'}
                  </span>
                  <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
                    {match.match_score}% Match
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  12.5T Maize Stalks • Rongai → Nakuru
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Pane: Active Thread */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Thread Header */}
          <div style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'rgba(10, 18, 14, 0.8)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3 style={{ fontSize: '1.0625rem', color: '#fff' }}>
                  {activeMatch.demand?.buyer?.organization_name}
                </h3>
                <span className="badge badge-amber" style={{ fontSize: '0.6875rem' }}>
                  Verified Off-taker
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={12} color="var(--primary-400)" />
                Nakuru Industrial Plant • 21.4 km distance
              </div>
            </div>

            {/* Direct Phone Call Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <a
                href="tel:+254701223344"
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', display: 'inline-flex', gap: 6, color: '#fcd34d' }}
              >
                <PhoneCall size={14} />
                <span>+254 701 223 344</span>
              </a>
            </div>
          </div>

          {/* Messages Feed */}
          <div style={{
            flex: 1,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            overflowY: 'auto',
            maxHeight: 400,
          }}>
            {messages.map((msg) => {
              const isMe = msg.sender_id === 'usr_f3';
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMe ? 'flex-end' : 'flex-start',
                    maxWidth: '75%',
                    alignSelf: isMe ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                    {msg.sender?.full_name || (isMe ? 'You' : 'Buyer')}
                  </div>
                  <div
                    style={{
                      padding: '12px 18px',
                      borderRadius: 16,
                      background: isMe
                        ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                        : 'rgba(255, 255, 255, 0.05)',
                      border: isMe ? 'none' : '1px solid var(--border-subtle)',
                      color: '#fff',
                      fontSize: '0.875rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSend} style={{
            padding: '16px 20px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'rgba(10, 18, 14, 0.95)',
            display: 'flex',
            gap: 12,
          }}>
            <input
              type="text"
              className="form-input"
              style={{ flex: 1 }}
              placeholder="Discuss loading time, pricing (KES/kg), or truck access..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-md">
              <Send size={16} />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

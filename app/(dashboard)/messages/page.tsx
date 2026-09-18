'use client';

import { useState, useEffect, useRef } from 'react';
import { getStoredMatches, getStoredMessages, saveMessage } from '@/lib/data-store';
import { Match, Message } from '@/lib/types';
import { formatDistance, formatDate } from '@/lib/utils';
import {
  Send,
  User,
  Factory,
  Tractor,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export default function MessagesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeMatchId, setActiveMatchId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  const currentUserId = 'usr_f1'; // Mocking current user as Farmer for demo perspective
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allMatches = getStoredMatches().filter(m => m.status === 'accepted');
    setMatches(allMatches);
    if (allMatches.length > 0 && !activeMatchId) {
      setActiveMatchId(allMatches[0].id);
    }
  }, []);

  useEffect(() => {
    if (activeMatchId) {
      setMessages(getStoredMessages(activeMatchId));
    } else {
      setMessages([]);
    }
  }, [activeMatchId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeMatchId) return;

    const saved = saveMessage({
      match_id: activeMatchId,
      sender_id: currentUserId,
      content: newMessage.trim(),
    });

    setMessages([...messages, saved]);
    setNewMessage('');
  };

  if (matches.length === 0) {
    return (
      <div className="glass-card" style={{ padding: 48, textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: 12 }}>No Active Chats</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          You need to accept an AI Match in the Matches tab before you can message the counterparty.
        </p>
      </div>
    );
  }

  const activeMatch = matches.find(m => m.id === activeMatchId);

  return (
    <div style={{ height: 'calc(100vh - 120px)', display: 'flex', gap: 20 }}>
      {/* Thread List Sidebar */}
      <div className="glass-card" style={{ width: 320, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: 20, borderBottom: '1px solid var(--border-subtle)', background: 'rgba(10, 18, 14, 0.4)' }}>
          <h2 style={{ fontSize: '1.125rem', color: '#fff', fontWeight: 600 }}>Trade Inboxes</h2>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {matches.map((match) => {
            const isBuyer = currentUserId === match.demand?.buyer_id;
            const otherPartyName = isBuyer ? match.listing?.farmer?.organization_name : match.demand?.buyer?.organization_name;
            const icon = isBuyer ? <Tractor size={16} /> : <Factory size={16} />;

            return (
              <button
                key={match.id}
                onClick={() => setActiveMatchId(match.id)}
                style={{
                  padding: 16,
                  border: 'none',
                  borderBottom: '1px solid var(--border-subtle)',
                  background: activeMatchId === match.id ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                  borderLeft: activeMatchId === match.id ? '3px solid var(--primary-500)' : '3px solid transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  transition: 'background 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: activeMatchId === match.id ? '#fff' : 'var(--text-primary)', fontWeight: 600, fontSize: '0.9375rem' }}>
                  {icon}
                  <span style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {otherPartyName || 'Unknown Partner'}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {match.listing?.waste_type.replace('_', ' ')} • {formatDistance(match.distance_km)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      {activeMatch && (
        <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Chat Header */}
          <div style={{ 
            padding: 20, 
            borderBottom: '1px solid var(--border-subtle)', 
            background: 'rgba(10, 18, 14, 0.4)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <h3 style={{ fontSize: '1.125rem', color: '#fff', fontWeight: 600 }}>
                  {currentUserId === activeMatch.demand?.buyer_id ? activeMatch.listing?.farmer?.organization_name : activeMatch.demand?.buyer?.organization_name}
                </h3>
                <span className="badge badge-primary" style={{ padding: '2px 6px', fontSize: '0.65rem' }}>
                  <ShieldCheck size={10} /> Verified
                </span>
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Negotiating: {activeMatch.listing?.quantity_kg}kg {activeMatch.listing?.waste_type.replace('_', ' ')}
              </div>
            </div>
            
            <div className="match-score-badge high">
              {activeMatch.match_score}% Match
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div style={{ flex: 1, padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {messages.map((msg) => {
              const isMine = msg.sender_id === currentUserId;
              return (
                <div key={msg.id} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isMine ? 'flex-end' : 'flex-start',
                }}>
                  <div style={{
                    maxWidth: '75%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: isMine ? 'var(--primary-700)' : 'rgba(255, 255, 255, 0.05)',
                    border: isMine ? '1px solid var(--primary-600)' : '1px solid var(--border-subtle)',
                    color: '#fff',
                    fontSize: '0.9375rem',
                    lineHeight: 1.5,
                  }}>
                    {msg.content}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={10} />
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ padding: 20, borderTop: '1px solid var(--border-subtle)', background: 'rgba(10, 18, 14, 0.4)' }}>
            <form onSubmit={handleSend} style={{ display: 'flex', gap: 12 }}>
              <input
                type="text"
                className="form-input"
                placeholder="Type your message to negotiate transport and pricing..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn btn-primary" disabled={!newMessage.trim()}>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

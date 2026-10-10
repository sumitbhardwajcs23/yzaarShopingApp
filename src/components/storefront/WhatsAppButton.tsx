'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const defaultPhone = '919820123456';

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = message.trim() || 'Hello Yzaaar Atelier Concierge, I would like to inquire about your bespoke collection.';
    const url = `https://wa.me/${defaultPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      {/* WhatsApp Dialog Box */}
      {isOpen && (
        <div
          style={{
            marginBottom: '12px',
            width: '320px',
            backgroundColor: '#121217',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            borderRadius: '12px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.85)',
            overflow: 'hidden',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: '#0E1E17',
              borderBottom: '1px solid #1B382B',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#07160E',
                }}
              >
                <MessageSquare size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.85rem', color: '#FAF9F6', margin: 0, fontWeight: 600 }}>
                  Yzaaar Atelier Concierge
                </h4>
                <p style={{ fontSize: '0.7rem', color: '#25D366', margin: 0, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#25D366' }} /> Online & Attentive
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ color: '#8A8A93', padding: '0.2rem' }}
              aria-label="Close WhatsApp chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '1rem', backgroundColor: '#141419' }}>
            <div
              style={{
                backgroundColor: '#1C1C24',
                padding: '0.8rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: '#D8D8E0',
                lineHeight: 1.4,
                marginBottom: '1rem',
                border: '1px solid #282834',
              }}
            >
              Namaste! Welcome to <strong>Yzaaar Haute Couture</strong>. How may our styling master assist you with bespoke sizing, custom fabrics, or express dispatch today?
            </div>

            <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.4rem' }}>
              <input
                type="text"
                placeholder="Type your inquiry..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  flex: 1,
                  backgroundColor: '#0E0E12',
                  border: '1px solid #2C2C38',
                  borderRadius: '6px',
                  padding: '0.55rem 0.8rem',
                  fontSize: '0.8rem',
                  color: '#FAF9F6',
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#25D366',
                  color: '#07160E',
                  borderRadius: '6px',
                  padding: '0.55rem 0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Send WhatsApp message"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#07160E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 24px rgba(37, 211, 102, 0.4), 0 0 15px rgba(212, 175, 55, 0.3)',
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare size={26} fill="#07160E" />
      </button>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, Sparkles, Gift } from 'lucide-react';

export default function PromotionalStrip() {
  const [copied, setCopied] = useState(false);
  const couponCode = 'YZAAR10';

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      style={{
        padding: '3.5rem 0',
        backgroundColor: '#0A0A0D',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #181822 0%, #121217 100%)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            borderRadius: '12px',
            padding: '2.5rem 3rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6), var(--gold-glow)',
          }}
        >
          {/* Left copy */}
          <div style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ECC86A', marginBottom: '0.6rem' }}>
              <Gift size={16} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                Private Atelier Privilege
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
                fontWeight: 600,
                color: '#FAF9F6',
                lineHeight: 1.25,
                marginBottom: '0.6rem',
              }}
            >
              Complimentary White-Glove Curation & 10% Welcome Privilege
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#A1A1AC', lineHeight: 1.6, margin: 0 }}>
              Apply privilege code at checkout. Includes hand-pressed garment carrier, bespoke wooden coat hangers, and insured express dispatch across India.
            </p>
          </div>

          {/* Right Coupon Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#0F0F13',
              border: '1px dashed #D4AF37',
              borderRadius: '8px',
              padding: '1.2rem 1.8rem',
              gap: '0.8rem',
            }}
          >
            <span style={{ fontSize: '0.72rem', color: '#8A8A93', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Privilege Code
            </span>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: '#ECC86A',
              }}
            >
              {couponCode}
            </div>
            <button
              onClick={handleCopy}
              className="btn btn-gold"
              style={{ padding: '0.55rem 1.2rem', fontSize: '0.72rem', gap: '0.4rem' }}
            >
              {copied ? (
                <>
                  <Check size={14} /> Code Copied!
                </>
              ) : (
                <>
                  <Copy size={14} /> Copy Privilege Code
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

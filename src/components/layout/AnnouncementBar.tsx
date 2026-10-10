'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div
      style={{
        backgroundColor: '#0F0F12',
        borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        fontSize: '0.72rem',
        letterSpacing: '0.08em',
        color: '#D4AF37',
        padding: '0.45rem 1rem',
        position: 'relative',
        zIndex: 50,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }} className="announcement-left">
          <ShieldCheck size={13} color="#D4AF37" />
          <span style={{ color: '#A1A1AA' }}>100% Handcrafted Atelier Authenticity Guaranteed</span>
        </div>

        <div
          style={{
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          <Sparkles size={13} color="#ECC86A" />
          <span>
            Complimentary White-Glove Delivery Across India on Orders Above ₹5,000 | Code: <strong style={{ color: '#FAF9F6' }}>YZAAR10</strong> for 10% Privilege
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', color: '#A1A1AA' }}>
          <a
            href="https://wa.me/919820123456?text=Hello%20Yzaaar%20Concierge"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#ECC86A' }}
          >
            <PhoneCall size={12} />
            <span>VIP Concierge</span>
          </a>
          <span style={{ color: '#333' }}>|</span>
          <Link href="/admin" style={{ color: '#8A8A93' }}>
            Staff Portal
          </Link>
        </div>
      </div>
    </div>
  );
}

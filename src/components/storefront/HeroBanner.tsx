'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Award, Compass } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function HeroBanner() {
  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#0A0A0C',
        backgroundImage: `
          radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.12) 0%, transparent 45%),
          radial-gradient(circle at 10% 70%, rgba(212, 175, 55, 0.08) 0%, transparent 40%)
        `,
        overflow: 'hidden',
        padding: '5rem 0 4rem',
        borderBottom: '1px solid #1E1E26',
      }}
    >
      {/* Decorative Golden Ambient Accent Rings */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          border: '1px solid rgba(212, 175, 55, 0.08)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '-5%',
          right: '0%',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          border: '1px solid rgba(212, 175, 55, 0.12)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '3.5rem',
          }}
        >
          {/* Left Editorial Copy */}
          <div style={{ maxWidth: '620px', zIndex: 2 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                padding: '0.35rem 0.9rem',
                borderRadius: '30px',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#E5C158',
                marginBottom: '1.6rem',
              }}
            >
              <Sparkles size={13} color="#E5C158" />
              <span>Haute Couture Autumn / Festive 2026</span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
                fontWeight: 600,
                lineHeight: 1.08,
                color: '#FAF9F6',
                marginBottom: '1.4rem',
                letterSpacing: '-0.02em',
              }}
            >
              The Art of <br />
              <span className="text-gold-gradient" style={{ fontStyle: 'italic', fontWeight: 700 }}>
                Sartorial Majesty.
              </span>
            </h1>

            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: '#B0B0BC',
                marginBottom: '2.4rem',
                fontWeight: 300,
              }}
            >
              Hand-tailored Italian silk velvet tuxedos, liquid gold evening gowns, and bespoke royal bandhgalas. Where centuries of heritage couture meet effortless digital exclusivity.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <Link href="/shop" className="btn btn-gold" style={{ padding: '1rem 2.2rem', fontSize: '0.85rem' }}>
                Explore The Atelier <ArrowRight size={16} />
              </Link>
              <Link
                href="/shop?category=tuxedos-suits"
                className="btn btn-outline-gold"
                style={{ padding: '1rem 2rem', fontSize: '0.85rem' }}
              >
                Bespoke Tuxedos
              </Link>
            </div>

            {/* Micro Pillars */}
            <div
              className="hero-pillars"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.2rem',
                marginTop: '3.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid #1C1C24',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: '#ECC86A',
                    display: 'block',
                  }}
                >
                  100%
                </span>
                <span style={{ fontSize: '0.72rem', color: '#8A8A93', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Hand-Canvassed
                </span>
              </div>

              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: '#ECC86A',
                    display: 'block',
                  }}
                >
                  24K Gold
                </span>
                <span style={{ fontSize: '0.72rem', color: '#8A8A93', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Gilt Filigree
                </span>
              </div>

              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: '#ECC86A',
                    display: 'block',
                  }}
                >
                  48 Hrs
                </span>
                <span style={{ fontSize: '0.72rem', color: '#8A8A93', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Express Dispatch
                </span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Showcase */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.9), var(--gold-glow)',
                backgroundColor: '#15151B',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80"
                alt="The Aurum Sovereign Velvet Tuxedo"
                style={{
                  width: '100%',
                  height: '540px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Floating Spotlight Card on Hero Image */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  backgroundColor: 'rgba(12, 12, 15, 0.92)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  borderRadius: '8px',
                  padding: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.7)',
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#E5C158',
                      display: 'block',
                      marginBottom: '0.2rem',
                    }}
                  >
                    Featured Icon
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: '#FAF9F6',
                      margin: 0,
                    }}
                  >
                    The Aurum Sovereign Tuxedo
                  </h3>
                  <span style={{ fontSize: '0.9rem', color: '#ECC86A', fontWeight: 700 }}>
                    {formatCurrency(48999)}
                  </span>
                </div>

                <Link
                  href="/shop/aurum-sovereign-velvet-tuxedo"
                  className="btn btn-gold"
                  style={{
                    padding: '0.65rem 1.2rem',
                    fontSize: '0.75rem',
                  }}
                >
                  View Piece
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

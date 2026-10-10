'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Category } from '@/lib/types';

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const featured = categories.filter((c) => c.featured).slice(0, 4);

  return (
    <section style={{ padding: '5.5rem 0 4rem', backgroundColor: '#0A0A0C' }}>
      <div className="container">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              display: 'block',
              marginBottom: '0.6rem',
            }}
          >
            Curated Atelier Disciplines
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 600,
              color: '#FAF9F6',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            Explore by Category
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#8A8A96', lineHeight: 1.6 }}>
            Each garment is produced in limited salon batches, honoring the timeless canons of Savile Row and Milanese couture.
          </p>
        </div>

        {/* Grid layout */}
        <div
          className="category-grid-2col"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.8rem',
          }}
        >
          {featured.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="luxury-card category-card"
              style={{
                position: 'relative',
                height: idx === 0 || idx === 3 ? '420px' : '360px',
                borderRadius: '10px',
                overflow: 'hidden',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem',
                border: '1px solid #202028',
              }}
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  filter: 'brightness(0.7)',
                }}
              />

              {/* Gradient Scrim */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10, 10, 12, 0.95) 15%, rgba(10, 10, 12, 0.3) 60%, transparent 100%)',
                  zIndex: 1,
                }}
              />

              {/* Text info */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.45rem',
                      fontWeight: 600,
                      color: '#FAF9F6',
                      margin: 0,
                    }}
                  >
                    {cat.name}
                  </h3>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(212, 175, 55, 0.2)',
                      border: '1px solid #D4AF37',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ECC86A',
                    }}
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <p style={{ fontSize: '0.8rem', color: '#B0B0BA', lineHeight: 1.4, margin: '0 0 0.8rem 0' }}>
                  {cat.description}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {cat.subCategories.slice(0, 3).map((sub) => (
                    <span
                      key={sub}
                      style={{
                        fontSize: '0.65rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '3px',
                        color: '#D8D8DF',
                      }}
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

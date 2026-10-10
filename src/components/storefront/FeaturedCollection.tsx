'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface FeaturedCollectionProps {
  products: Product[];
}

export default function FeaturedCollection({ products }: FeaturedCollectionProps) {
  const [activeTab, setActiveTab] = useState<'bestsellers' | 'new' | 'couture'>('bestsellers');

  const filtered = products.filter((p) => {
    if (activeTab === 'bestsellers') return p.isBestSeller;
    if (activeTab === 'new') return p.isNewArrival;
    if (activeTab === 'couture') return p.category.includes('Couture') || p.category.includes('Tuxedo');
    return true;
  });

  const displayList = filtered.length > 0 ? filtered.slice(0, 4) : products.slice(0, 4);

  return (
    <section style={{ padding: '5rem 0', backgroundColor: '#0D0D10', borderTop: '1px solid #1E1E26' }}>
      <div className="container">
        {/* Header with Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                display: 'block',
                marginBottom: '0.5rem',
              }}
            >
              The Master Collection
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
                fontWeight: 600,
                color: '#FAF9F6',
                margin: 0,
              }}
            >
              Iconic Atelier Creations
            </h2>
          </div>

          {/* Tab buttons */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#16161D',
              padding: '0.35rem',
              borderRadius: '6px',
              border: '1px solid #282834',
              gap: '0.3rem',
            }}
          >
            <button
              onClick={() => setActiveTab('bestsellers')}
              style={{
                padding: '0.6rem 1.2rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                color: activeTab === 'bestsellers' ? '#0A0A0B' : '#A1A1AA',
                background: activeTab === 'bestsellers' ? 'var(--gold-gradient)' : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab('new')}
              style={{
                padding: '0.6rem 1.2rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                color: activeTab === 'new' ? '#0A0A0B' : '#A1A1AA',
                background: activeTab === 'new' ? 'var(--gold-gradient)' : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab('couture')}
              style={{
                padding: '0.6rem 1.2rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                color: activeTab === 'couture' ? '#0A0A0B' : '#A1A1AA',
                background: activeTab === 'couture' ? 'var(--gold-gradient)' : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              Couture Edit
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {displayList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link href="/shop" className="btn btn-outline-gold" style={{ padding: '0.9rem 2.4rem' }}>
            View Full Atelier Catalogue <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

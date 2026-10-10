import React from 'react';
import HeroBanner from '@/components/storefront/HeroBanner';
import CategoryGrid from '@/components/storefront/CategoryGrid';
import FeaturedCollection from '@/components/storefront/FeaturedCollection';
import PromotionalStrip from '@/components/storefront/PromotionalStrip';
import { db } from '@/lib/db';
import { Star, Quote, Award } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const products = db.getProducts();
  const categories = db.getCategories();

  return (
    <div>
      {/* 1. Hero Showcase */}
      <HeroBanner />

      {/* 2. Curated Disciplines & Category Grid */}
      <CategoryGrid categories={categories} />

      {/* 3. Featured Masterpieces Collection (Best Sellers, New Arrivals, Couture) */}
      <FeaturedCollection products={products} />

      {/* 4. Promotional Privilege Strip */}
      <PromotionalStrip />

      {/* 5. Editorial Patron Testimonials & Press Reviews */}
      <section style={{ padding: '5.5rem 0 4rem', backgroundColor: '#09090C', borderTop: '1px solid #1C1C24' }}>
        <div className="container">
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
              Patron Accolades
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
              Worn by Leaders & Connoisseurs
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* Review 1 */}
            <div
              className="luxury-card"
              style={{
                padding: '2.4rem 2rem',
                backgroundColor: '#111116',
                border: '1px solid #242430',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '0.3rem', color: '#D4AF37', marginBottom: '1.2rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#D4AF37" />
                  ))}
                </div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#E8E8EE', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  &ldquo;The Aurum Sovereign Tuxedo is genuinely unrivaled. The gold filigree peak lapels captured the room effortlessly at our private gathering in London.&rdquo;
                </p>
              </div>
              <div style={{ borderTop: '1px solid #202028', paddingTop: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#FAF9F6', margin: 0, fontWeight: 600 }}>Raghav Singhania</h4>
                <span style={{ fontSize: '0.75rem', color: '#8A8A93' }}>Verified Atelier Patron · Mumbai</span>
              </div>
            </div>

            {/* Review 2 */}
            <div
              className="luxury-card"
              style={{
                padding: '2.4rem 2rem',
                backgroundColor: '#111116',
                border: '1px solid #242430',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '0.3rem', color: '#D4AF37', marginBottom: '1.2rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#D4AF37" />
                  ))}
                </div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#E8E8EE', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  &ldquo;Liquid gold lamé with the precision structuring of a tailored corset. Delivery arrived within 36 hours in a bespoke garment case with custom wooden hangers.&rdquo;
                </p>
              </div>
              <div style={{ borderTop: '1px solid #202028', paddingTop: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#FAF9F6', margin: 0, fontWeight: 600 }}>Ananya K.</h4>
                <span style={{ fontSize: '0.75rem', color: '#8A8A93' }}>Verified Atelier Patron · New Delhi</span>
              </div>
            </div>

            {/* Review 3 */}
            <div
              className="luxury-card"
              style={{
                padding: '2.4rem 2rem',
                backgroundColor: '#111116',
                border: '1px solid #242430',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '0.3rem', color: '#D4AF37', marginBottom: '1.2rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#D4AF37" />
                  ))}
                </div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#E8E8EE', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  &ldquo;The Goodyear-welted oxfords and Tuscan calfskin weekender represent artisanal mastery at its purest. Yzaaar proves Indian luxury can lead globally.&rdquo;
                </p>
              </div>
              <div style={{ borderTop: '1px solid #202028', paddingTop: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#FAF9F6', margin: 0, fontWeight: 600 }}>Vikramaditya Roy</h4>
                <span style={{ fontSize: '0.75rem', color: '#8A8A93' }}>Verified Atelier Patron · Bangalore</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

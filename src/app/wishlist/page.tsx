'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import ProductCard from '@/components/storefront/ProductCard';

export default function WishlistPage() {
  const { wishlistIds, clearWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWishlistProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          const matching = data.products.filter((p: Product) => wishlistIds.includes(p.id));
          setProducts(matching);
        }
      } catch (err) {
        console.error('Failed to load wishlist products:', err);
      } finally {
        setLoading(false);
      }
    }

    loadWishlistProducts();
  }, [wishlistIds]);

  return (
    <div style={{ backgroundColor: '#0A0A0C', padding: '3.5rem 0 6rem', minHeight: '80vh' }}>
      <div className="container">
        {/* Breadcrumb & Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.78rem', color: '#8A8A93', marginBottom: '0.6rem' }}>
              <Link href="/">Home</Link>
              <span>/</span>
              <span style={{ color: '#D4AF37' }}>Saved Masterpieces</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#FAF9F6', margin: 0 }}>
              Your Atelier Wishlist ({wishlistIds.length})
            </h1>
          </div>

          {wishlistIds.length > 0 && (
            <button
              onClick={clearWishlist}
              style={{ fontSize: '0.75rem', color: '#8A8A96', textDecoration: 'underline' }}
            >
              Clear Entire Wishlist
            </button>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: '#D4AF37' }}>
            Retrieving saved atelier pieces...
          </div>
        ) : products.length === 0 ? (
          <div
            style={{
              maxWidth: '520px',
              margin: '3rem auto',
              textAlign: 'center',
              backgroundColor: '#111116',
              border: '1px solid #202028',
              borderRadius: '10px',
              padding: '3.5rem 2rem',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D4AF37',
                margin: '0 auto 1.5rem',
              }}
            >
              <Heart size={32} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FAF9F6', margin: '0 0 0.8rem' }}>
              Your Wishlist is Empty
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#8A8A93', lineHeight: 1.6, marginBottom: '2rem' }}>
              Save your favourite gala evening gowns, bespoke dinner jackets, and Italian calfskin pieces to monitor limited salon availability.
            </p>
            <Link href="/shop" className="btn btn-gold" style={{ padding: '0.85rem 2rem', fontSize: '0.8rem' }}>
              Explore Atelier Pieces <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

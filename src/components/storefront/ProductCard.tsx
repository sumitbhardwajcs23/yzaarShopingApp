'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const primaryImg = product.images[0]?.url || '';
  const secondaryImg = product.images[1]?.url || primaryImg;
  const activeImage = isHovered ? secondaryImg : primaryImg;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.variants.length > 0) {
      const defaultVariant = product.variants[0];
      addToCart(product, defaultVariant, 1);
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 1500);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.basePrice
      ? Math.round(((product.compareAtPrice - product.basePrice) / product.compareAtPrice) * 100)
      : null;

  return (
    <div
      className="luxury-card product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#121215',
        border: '1px solid #202027',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Image container */}
      <Link
        href={`/shop/${product.slug}`}
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '135%', // 3:4 portrait luxury aspect ratio
          overflow: 'hidden',
          backgroundColor: '#181820',
          display: 'block',
        }}
      >
        <img
          src={activeImage}
          alt={product.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />

        {/* Badges Overlay */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            zIndex: 2,
          }}
        >
          {product.isBestSeller && (
            <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
              Bespoke Icon
            </span>
          )}
          {product.isNewArrival && (
            <span
              className="badge"
              style={{
                backgroundColor: 'rgba(10, 10, 12, 0.85)',
                color: '#FAF9F6',
                border: '1px solid #333',
                fontSize: '0.65rem',
              }}
            >
              Atelier New
            </span>
          )}
          {discountPercent && (
            <span
              className="badge"
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.2)',
                color: '#ECC86A',
                border: '1px solid #D4AF37',
                fontSize: '0.65rem',
              }}
            >
              {discountPercent}% Off
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(18, 18, 22, 0.85)',
            backdropFilter: 'blur(6px)',
            border: isFavorited ? '1px solid #D4AF37' : '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isFavorited ? '#D4AF37' : '#D8D8DF',
            transition: 'all 0.2s ease',
            zIndex: 2,
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={isFavorited ? '#D4AF37' : 'none'} />
        </button>

        {/* Quick Add To Bag overlay on hover */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 3,
          }}
        >
          <button
            onClick={handleQuickAdd}
            className="btn btn-gold"
            style={{
              width: '100%',
              padding: '0.65rem 1rem',
              fontSize: '0.75rem',
              gap: '0.5rem',
            }}
          >
            {addedAnimation ? (
              <>
                <Check size={14} /> Added to Bag
              </>
            ) : (
              <>
                <ShoppingBag size={14} /> Quick Add
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Content Details */}
      <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#91919B' }}>
            {product.subCategory || product.category}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#ECC86A', fontSize: '0.75rem' }}>
            <Star size={12} fill="#ECC86A" />
            <span>{product.rating}</span>
            <span style={{ color: '#666' }}>({product.reviewCount})</span>
          </div>
        </div>

        <Link href={`/shop/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.05rem',
              fontWeight: 600,
              color: '#FAF9F6',
              lineHeight: 1.35,
              marginBottom: '0.45rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#FAF9F6')}
          >
            {product.title}
          </h3>
        </Link>

        {product.tagline && (
          <p
            style={{
              fontSize: '0.75rem',
              color: '#8A8A94',
              lineHeight: 1.4,
              marginBottom: '0.75rem',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.tagline}
          </p>
        )}

        {/* Pricing */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#ECC86A',
            }}
          >
            {formatCurrency(product.basePrice)}
          </span>
          {product.compareAtPrice && (
            <span
              style={{
                fontSize: '0.82rem',
                color: '#696974',
                textDecoration: 'line-through',
              }}
            >
              {formatCurrency(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

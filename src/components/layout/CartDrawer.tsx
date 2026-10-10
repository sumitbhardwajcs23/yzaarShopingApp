'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';

export default function CartDrawer() {
  const { items, itemCount, subtotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 5000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountRemaining = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: '#111114',
          borderLeft: '1px solid rgba(212, 175, 55, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.8)',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          zIndex: 10,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.4rem 1.6rem',
            borderBottom: '1px solid #222228',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="#D4AF37" />
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#FAF9F6',
                margin: 0,
              }}
            >
              Your Atelier Bag ({itemCount})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              padding: '0.4rem',
              color: '#A1A1AA',
              borderRadius: '50%',
              transition: 'color 0.2s',
            }}
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div
          style={{
            padding: '1rem 1.6rem',
            backgroundColor: '#18181D',
            borderBottom: '1px solid #222228',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.4rem' }}>
            {amountRemaining > 0 ? (
              <span style={{ color: '#D4AF37' }}>
                Add <strong>{formatCurrency(amountRemaining)}</strong> more for Complimentary Delivery
              </span>
            ) : (
              <span style={{ color: '#2ECC71', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <ShieldCheck size={14} /> You have unlocked Complimentary Express Delivery!
              </span>
            )}
            <span style={{ color: '#A1A1AA' }}>{Math.round(progressPercent)}%</span>
          </div>
          <div
            style={{
              width: '100%',
              height: '5px',
              backgroundColor: '#2A2A33',
              borderRadius: '3px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'var(--gold-gradient)',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        {/* Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.2rem 1.6rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: '#8A8A93',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '1px solid #2B2B34',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D4AF37',
                }}
              >
                <ShoppingBag size={28} />
              </div>
              <p style={{ fontSize: '0.95rem' }}>Your shopping bag is currently empty.</p>
              <Link
                href="/shop"
                onClick={() => setIsCartOpen(false)}
                className="btn btn-outline-gold"
                style={{ fontSize: '0.75rem', padding: '0.65rem 1.4rem' }}
              >
                Explore The Collection
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #202026',
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '96px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    backgroundColor: '#1E1E24',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '0.92rem',
                        fontWeight: 600,
                        color: '#FAF9F6',
                        lineHeight: 1.3,
                        marginBottom: '0.25rem',
                      }}
                    >
                      {item.title}
                    </h4>
                    <div style={{ fontSize: '0.75rem', color: '#A1A1AA', display: 'flex', gap: '0.8rem' }}>
                      <span>Size: <strong>{item.size}</strong></span>
                      <span>Color: <strong>{item.color}</strong></span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    {/* Qty controls */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #33333F',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ padding: '0.25rem 0.5rem', color: '#A1A1AA' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ padding: '0.2rem 0.6rem', fontSize: '0.8rem', color: '#FAF9F6' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ padding: '0.25rem 0.5rem', color: '#A1A1AA' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <span style={{ fontWeight: 600, color: '#D4AF37', fontSize: '0.9rem' }}>
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ color: '#71717A', transition: 'color 0.2s' }}
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && (
          <div
            style={{
              padding: '1.4rem 1.6rem',
              backgroundColor: '#16161B',
              borderTop: '1px solid #2A2A33',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '0.85rem', color: '#A1A1AA' }}>Estimated Subtotal</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#ECC86A' }}>
                {formatCurrency(subtotal)}
              </span>
            </div>

            <p style={{ fontSize: '0.72rem', color: '#71717A', margin: 0 }}>
              Taxes calculated and privilege coupons applied at final checkout.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Link
                href="/cart"
                onClick={() => setIsCartOpen(false)}
                className="btn btn-gold"
                style={{ width: '100%', padding: '0.9rem' }}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsCartOpen(false)}
                className="btn btn-ghost"
                style={{ fontSize: '0.75rem', padding: '0.4rem', textAlign: 'center', textDecoration: 'underline' }}
              >
                Review Full Bag & Enter Coupons
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

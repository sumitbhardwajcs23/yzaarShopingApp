'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RefreshCw, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import YzaaarLogo from './YzaaarLogo';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#070709',
        borderTop: '1px solid rgba(212, 175, 55, 0.25)',
        color: '#A1A1AA',
        position: 'relative',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
      }}
    >
      <div className="container">
        {/* Trust Badges Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.8rem',
            paddingBottom: '3.5rem',
            marginBottom: '3.5rem',
            borderBottom: '1px solid #1A1A22',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D4AF37',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <div>
              <h5 style={{ color: '#FAF9F6', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>
                100% Authentic Atelier
              </h5>
              <p style={{ fontSize: '0.75rem', color: '#71717A', margin: 0 }}>
                Handcrafted by master couturiers
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D4AF37',
                flexShrink: 0,
              }}
            >
              <Truck size={22} />
            </div>
            <div>
              <h5 style={{ color: '#FAF9F6', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>
                White-Glove Express
              </h5>
              <p style={{ fontSize: '0.75rem', color: '#71717A', margin: 0 }}>
                Insured transit across 19,000+ pincodes
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D4AF37',
                flexShrink: 0,
              }}
            >
              <RefreshCw size={22} />
            </div>
            <div>
              <h5 style={{ color: '#FAF9F6', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>
                Bespoke Alteration & Returns
              </h5>
              <p style={{ fontSize: '0.75rem', color: '#71717A', margin: 0 }}>
                7-day seamless return & exchange window
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D4AF37',
                flexShrink: 0,
              }}
            >
              <FileText size={22} />
            </div>
            <div>
              <h5 style={{ color: '#FAF9F6', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>
                GST Compliant Billing
              </h5>
              <p style={{ fontSize: '0.75rem', color: '#71717A', margin: 0 }}>
                Downloadable B2B & B2C tax invoices
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '3.5rem',
          }}
        >
          {/* Brand Bio & Newsletter */}
          <div style={{ gridColumn: 'span 2' }}>
            <YzaaarLogo variant="light" size="md" />
            <p
              style={{
                fontSize: '0.84rem',
                lineHeight: 1.7,
                color: '#91919B',
                marginTop: '1.2rem',
                maxWidth: '420px',
              }}
            >
              Yzaaar redefines digital luxury. An exclusive house where heritage craftsmanship, bespoke Italian tailoring, and modern haute couture converge into an effortless online shopping experience.
            </p>

            {/* Newsletter */}
            <div style={{ marginTop: '1.8rem', maxWidth: '420px' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#ECC86A',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                Join the Atelier Circle
              </span>
              <p style={{ fontSize: '0.78rem', color: '#7C7C88', marginBottom: '0.8rem' }}>
                Receive invitations to private salon previews and a complimentary ₹2,000 welcoming privilege.
              </p>
              {subscribed ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#2ECC71',
                    fontSize: '0.85rem',
                    padding: '0.6rem 0',
                  }}
                >
                  <CheckCircle2 size={18} />
                  <span>Privilege Code <strong>YZAAR10</strong> activated for your account!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.4rem' }}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    style={{
                      flex: 1,
                      backgroundColor: '#141419',
                      border: '1px solid #2B2B36',
                      borderRadius: '4px',
                      padding: '0.65rem 0.9rem',
                      fontSize: '0.82rem',
                      color: '#FAF9F6',
                    }}
                  />
                  <button type="submit" className="btn btn-gold" style={{ padding: '0.65rem 1.1rem' }}>
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column: The Atelier */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#FAF9F6',
                marginBottom: '1.2rem',
              }}
            >
              The Atelier
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
              <li><Link href="/shop" style={{ transition: 'color 0.2s' }}>The Curated Collection</Link></li>
              <li><Link href="/shop?category=haute-couture">Haute Couture Evening</Link></li>
              <li><Link href="/shop?category=tuxedos-suits">Bespoke Tuxedos</Link></li>
              <li><Link href="/shop?category=womens-atelier">Women&apos;s Atelier</Link></li>
              <li><Link href="/shop?category=leather-goods">Handcrafted Leather</Link></li>
            </ul>
          </div>

          {/* Column: Client Services */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#FAF9F6',
                marginBottom: '1.2rem',
              }}
            >
              Client Care
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
              <li><Link href="/account?tab=orders">Track Your Consignment</Link></li>
              <li><Link href="/account?tab=support">Atelier Support & Tickets</Link></li>
              <li><a href="https://wa.me/919820123456" target="_blank" rel="noopener noreferrer">Order via WhatsApp</a></li>
              <li><Link href="/cart">Shopping Bag & Coupons</Link></li>
              <li><Link href="/wishlist">Your Curated Wishlist</Link></li>
            </ul>
          </div>

          {/* Column: Governance & Staff */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#FAF9F6',
                marginBottom: '1.2rem',
              }}
            >
              Management
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
              <li><Link href="/admin" style={{ color: '#ECC86A' }}>Admin Portal Login</Link></li>
              <li><Link href="/admin/products">Inventory & SKU Manager</Link></li>
              <li><Link href="/admin/orders">Order Fulfilment Pipeline</Link></li>
              <li><Link href="/admin/roles">Role Access Control</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div
          style={{
            borderTop: '1px solid #16161E',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.75rem',
            color: '#71717A',
          }}
        >
          <div>
            © 2026 Yzaaar Haute Couture Private Limited. All rights reserved. GST Registered.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Razorpay Secured (256-Bit SSL)</span>
            <span>Made with Precision Craftsmanship</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

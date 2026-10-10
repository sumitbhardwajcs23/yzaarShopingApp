'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageSquare,
  ShoppingBag,
  Heart,
  Share2,
  Check,
  MapPin,
  Ruler,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Product, ProductVariant } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from './ProductCard';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Active image & variant
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images[0]?.url || ''
  );
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Pincode checker state
  const [pincode, setPincode] = useState<string>('');
  const [pincodeStatus, setPincodeStatus] = useState<{
    checked: boolean;
    valid?: boolean;
    message?: string;
    deliveryDate?: string;
  }>({ checked: false });

  // Reviews state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, title: '', comment: '' });
  const [reviewsList, setReviewsList] = useState(product.reviews || []);

  const isFavorited = isInWishlist(product.id);

  const handleVariantSelect = (v: ProductVariant) => {
    setSelectedVariant(v);
    if (v.image) {
      setSelectedImage(v.image);
    }
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addToCart(product, selectedVariant, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    const text = `Hello Yzaaar Atelier! I would like to order:
• Item: ${product.title}
• Size: ${selectedVariant?.size || 'Standard'}
• Color: ${selectedVariant?.color || 'Standard'}
• Price: ${formatCurrency(selectedVariant?.price || product.basePrice)}
• Link: ${window.location.href}

Please assist me with instant dispatch.`;
    window.open(`https://wa.me/919820123456?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setPincodeStatus({
        checked: true,
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code.',
      });
      return;
    }

    // Estimated delivery 2-3 business days
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 3);
    const dateFormatted = estDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    });

    setPincodeStatus({
      checked: true,
      valid: true,
      message: `Delivery serviceable to PIN ${cleanPin}.`,
      deliveryDate: `Estimated delivery by ${dateFormatted}. Cash on Delivery & Express available.`,
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const submittedReview = {
      id: `rev_${Date.now()}`,
      userId: 'usr_guest',
      userName: newReview.name,
      rating: newReview.rating,
      title: newReview.title || 'Exceptional craftsmanship',
      comment: newReview.comment,
      verifiedPurchase: true,
      createdAt: new Date().toISOString(),
      status: 'approved' as const,
    };

    setReviewsList([submittedReview, ...reviewsList]);
    setReviewModalOpen(false);
    setNewReview({ name: '', rating: 5, title: '', comment: '' });
  };

  return (
    <div style={{ backgroundColor: '#0A0A0C', padding: '2.5rem 0 6rem', minHeight: '90vh' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.78rem', color: '#8A8A93', marginBottom: '2rem' }}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/shop">Atelier Catalog</Link>
          <span>/</span>
          <span style={{ color: '#D4AF37' }}>{product.category}</span>
          <span>/</span>
          <span style={{ color: '#FAF9F6' }}>{product.title}</span>
        </div>

        {/* Product Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3.5rem',
            marginBottom: '5rem',
          }}
          className="product-detail-layout"
        >
          {/* LEFT: Image Gallery */}
          <div>
            {/* Main Featured Image with Zoom View */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '130%',
                backgroundColor: '#141419',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #202028',
                marginBottom: '1rem',
              }}
            >
              <img
                src={selectedImage}
                alt={product.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
              />

              {/* Wishlist Floating Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(12, 12, 16, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: isFavorited ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isFavorited ? '#D4AF37' : '#D8D8DF',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
                aria-label="Wishlist toggle"
              >
                <Heart size={20} fill={isFavorited ? '#D4AF37' : 'none'} />
              </button>
            </div>

            {/* Thumbnail Row */}
            <div style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.url)}
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '100px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: selectedImage === img.url ? '2px solid #D4AF37' : '1px solid #242430',
                    backgroundColor: '#16161D',
                    flexShrink: 0,
                    cursor: 'pointer',
                  }}
                >
                  <img src={img.url} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Information & Purchase Panel */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.6rem' }}>
              <span className="badge badge-gold">{product.category}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#ECC86A', fontSize: '0.82rem' }}>
                <Star size={14} fill="#ECC86A" />
                <span>{product.rating}</span>
                <span style={{ color: '#71717A' }}>({reviewsList.length} verified reviews)</span>
              </div>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                fontWeight: 600,
                color: '#FAF9F6',
                lineHeight: 1.25,
                marginBottom: '0.6rem',
              }}
            >
              {product.title}
            </h1>

            {product.tagline && (
              <p style={{ fontSize: '0.95rem', color: '#A1A1AC', fontStyle: 'italic', marginBottom: '1.2rem' }}>
                {product.tagline}
              </p>
            )}

            {/* Pricing Section */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
                padding: '1rem 0',
                borderTop: '1px solid #1E1E26',
                borderBottom: '1px solid #1E1E26',
                marginBottom: '1.8rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#ECC86A',
                }}
              >
                {formatCurrency(selectedVariant?.price || product.basePrice)}
              </span>
              {product.compareAtPrice && (
                <span style={{ fontSize: '1.1rem', color: '#6A6A75', textDecoration: 'line-through' }}>
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
              <span style={{ fontSize: '0.75rem', color: '#8A8A93' }}>Inclusive of all luxury GST taxes</span>
            </div>

            {/* Variant Color Swatches */}
            <div style={{ marginBottom: '1.6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.82rem', color: '#FAF9F6', fontWeight: 600 }}>
                  Color Shade: <span style={{ color: '#D4AF37' }}>{selectedVariant?.color}</span>
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                {Array.from(new Set(product.variants.map((v) => v.color))).map((colorName) => {
                  const match = product.variants.find((v) => v.color === colorName);
                  const isSelected = selectedVariant?.color === colorName;
                  return (
                    <button
                      key={colorName}
                      onClick={() => match && handleVariantSelect(match)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.45rem 0.9rem',
                        borderRadius: '4px',
                        border: isSelected ? '1px solid #D4AF37' : '1px solid #282834',
                        backgroundColor: isSelected ? '#1B1B24' : '#121217',
                        color: isSelected ? '#FAF9F6' : '#A1A1AA',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                      }}
                    >
                      <span
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: match?.colorHex || '#D4AF37',
                          border: '1px solid #444',
                        }}
                      />
                      {colorName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Variant Size Selector with Size Guide modal trigger */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.82rem', color: '#FAF9F6', fontWeight: 600 }}>
                  Select Sizing: <span style={{ color: '#D4AF37' }}>{selectedVariant?.size}</span>
                </span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  style={{
                    fontSize: '0.75rem',
                    color: '#ECC86A',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    textDecoration: 'underline',
                  }}
                >
                  <Ruler size={13} /> Size Guide & Measurements
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  const isLowStock = v.stock > 0 && v.stock <= 3;
                  const isOutOfStock = v.stock === 0;

                  return (
                    <button
                      key={v.id}
                      disabled={isOutOfStock}
                      onClick={() => handleVariantSelect(v)}
                      style={{
                        position: 'relative',
                        minWidth: '58px',
                        padding: '0.65rem 0.9rem',
                        borderRadius: '4px',
                        border: isSelected ? '1px solid #D4AF37' : '1px solid #282834',
                        backgroundColor: isSelected ? 'rgba(212, 175, 55, 0.15)' : isOutOfStock ? '#18181F' : '#14141A',
                        color: isSelected ? '#ECC86A' : isOutOfStock ? '#555560' : '#FAF9F6',
                        fontWeight: 600,
                        fontSize: '0.82rem',
                        cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {v.size}
                      {isLowStock && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-6px',
                            backgroundColor: '#E05252',
                            color: '#FFF',
                            fontSize: '0.55rem',
                            padding: '1px 4px',
                            borderRadius: '3px',
                            fontWeight: 700,
                          }}
                        >
                          Only {v.stock} left
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions: Quantity, Add to Bag, WhatsApp Button */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {/* Quantity */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #33333F',
                    borderRadius: '4px',
                    backgroundColor: '#121217',
                  }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: '0.7rem 1rem', color: '#A1A1AA' }}
                  >
                    -
                  </button>
                  <span style={{ padding: '0.7rem 0.8rem', fontSize: '0.9rem', fontWeight: 600, color: '#FAF9F6' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedVariant?.stock || 5, quantity + 1))}
                    style={{ padding: '0.7rem 1rem', color: '#A1A1AA' }}
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Bag button */}
                <button
                  onClick={handleAddToCart}
                  className="btn btn-gold"
                  style={{ flex: 1, padding: '0.9rem 1.8rem', fontSize: '0.85rem' }}
                >
                  {addedSuccess ? (
                    <>
                      <Check size={18} /> Added to Atelier Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} /> Add to Atelier Bag
                    </>
                  )}
                </button>
              </div>

              {/* Order via WhatsApp */}
              <button
                onClick={handleWhatsAppOrder}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  padding: '0.85rem 1.4rem',
                  borderRadius: '4px',
                  backgroundColor: '#102A1E',
                  border: '1px solid #1E5C3E',
                  color: '#25D366',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                <MessageSquare size={17} /> Order Directly on WhatsApp Concierge
              </button>
            </div>

            {/* Pincode & Serviceability Checker */}
            <div
              style={{
                backgroundColor: '#121218',
                border: '1px solid #20202A',
                borderRadius: '8px',
                padding: '1.4rem',
                marginBottom: '2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', color: '#D4AF37' }}>
                <MapPin size={16} />
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, margin: 0, color: '#FAF9F6' }}>
                  Check Delivery & Cash on Delivery Availability
                </h4>
              </div>

              <form onSubmit={handleCheckPincode} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <input
                  type="text"
                  placeholder="Enter 6-digit PIN (e.g. 400001, 110001)"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  style={{
                    flex: 1,
                    backgroundColor: '#181822',
                    border: '1px solid #2C2C3A',
                    borderRadius: '4px',
                    padding: '0.55rem 0.8rem',
                    fontSize: '0.82rem',
                    color: '#FAF9F6',
                  }}
                />
                <button type="submit" className="btn btn-outline-gold" style={{ padding: '0.55rem 1rem', fontSize: '0.75rem' }}>
                  Verify
                </button>
              </form>

              {pincodeStatus.checked && (
                <div style={{ fontSize: '0.78rem', marginTop: '0.4rem', color: pincodeStatus.valid ? '#2ECC71' : '#E05252' }}>
                  <p style={{ margin: 0, fontWeight: 600 }}>{pincodeStatus.message}</p>
                  {pincodeStatus.deliveryDate && (
                    <p style={{ margin: '0.2rem 0 0', color: '#A1A1AA' }}>{pincodeStatus.deliveryDate}</p>
                  )}
                </div>
              )}
            </div>

            {/* Product Details Tabs / Accordion */}
            <div style={{ borderTop: '1px solid #1E1E26', paddingTop: '1.5rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D4AF37', marginBottom: '0.8rem' }}>
                Artisanal Description
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#B0B0BB', lineHeight: 1.7, marginBottom: '1.4rem' }}>
                {product.description}
              </p>

              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D4AF37', marginBottom: '0.8rem' }}>
                Hallmark Features
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.4rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {product.features.map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.82rem', color: '#D8D8DF' }}>
                    <Sparkles size={13} color="#ECC86A" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D4AF37', marginBottom: '0.6rem' }}>
                Fabric & Atelier Care
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#8A8A96', lineHeight: 1.6, margin: 0 }}>
                {product.fabricCare}
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div style={{ borderTop: '1px solid #1E1E26', paddingTop: '4rem', marginBottom: '5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4AF37' }}>
                Patron Reflections
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FAF9F6', margin: 0 }}>
                Verified Atelier Reviews ({reviewsList.length})
              </h2>
            </div>
            <button
              onClick={() => setReviewModalOpen(true)}
              className="btn btn-outline-gold"
              style={{ fontSize: '0.78rem', padding: '0.7rem 1.4rem' }}
            >
              Write a Review
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.6rem' }}>
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                style={{
                  backgroundColor: '#121217',
                  border: '1px solid #202028',
                  borderRadius: '8px',
                  padding: '1.6rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
                  <div style={{ display: 'flex', gap: '0.2rem', color: '#D4AF37' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#D4AF37" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#71717A' }}>
                    {new Date(rev.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <h4 style={{ fontSize: '0.92rem', color: '#FAF9F6', fontWeight: 600, margin: '0 0 0.5rem' }}>
                  {rev.title}
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#A1A1AB', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {rev.comment}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#FAF9F6' }}>{rev.userName}</span>
                  {rev.verifiedPurchase && (
                    <span style={{ fontSize: '0.65rem', color: '#2ECC71', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Check size={11} /> Verified Buyer
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Creations */}
        {relatedProducts.length > 0 && (
          <div style={{ borderTop: '1px solid #1E1E26', paddingTop: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4AF37' }}>
                Complete The Sartorial Ensemble
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FAF9F6', margin: 0 }}>
                Complementary Pieces
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal: Size Guide */}
      {sizeGuideOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(5px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#121217',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '10px',
              padding: '2rem',
              maxWidth: '560px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.9)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.4rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FAF9F6', margin: 0 }}>
                Yzaaar Atelier Bespoke Size Guide
              </h3>
              <button onClick={() => setSizeGuideOpen(false)} style={{ color: '#8A8A93' }}>
                &times;
              </button>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#A1A1AA', marginBottom: '1.4rem' }}>
              All measurements in inches. If you prefer made-to-measure tailoring, our concierge can dispatch a master tailor to your residence in Mumbai or Delhi.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', color: '#D8D8DF' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #D4AF37', color: '#D4AF37' }}>
                  <th style={{ padding: '0.6rem', textAlign: 'left' }}>Size</th>
                  <th style={{ padding: '0.6rem', textAlign: 'left' }}>Chest</th>
                  <th style={{ padding: '0.6rem', textAlign: 'left' }}>Waist</th>
                  <th style={{ padding: '0.6rem', textAlign: 'left' }}>Shoulder</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #202028' }}>
                  <td style={{ padding: '0.6rem', fontWeight: 600 }}>38R / S</td>
                  <td style={{ padding: '0.6rem' }}>38&quot; - 39&quot;</td>
                  <td style={{ padding: '0.6rem' }}>31&quot; - 32&quot;</td>
                  <td style={{ padding: '0.6rem' }}>17.5&quot;</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #202028' }}>
                  <td style={{ padding: '0.6rem', fontWeight: 600 }}>40R / M</td>
                  <td style={{ padding: '0.6rem' }}>40&quot; - 41&quot;</td>
                  <td style={{ padding: '0.6rem' }}>33&quot; - 34&quot;</td>
                  <td style={{ padding: '0.6rem' }}>18.2&quot;</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #202028' }}>
                  <td style={{ padding: '0.6rem', fontWeight: 600 }}>42R / L</td>
                  <td style={{ padding: '0.6rem' }}>42&quot; - 43&quot;</td>
                  <td style={{ padding: '0.6rem' }}>35&quot; - 36&quot;</td>
                  <td style={{ padding: '0.6rem' }}>18.8&quot;</td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginTop: '1.8rem', textAlign: 'right' }}>
              <button onClick={() => setSizeGuideOpen(false)} className="btn btn-gold" style={{ fontSize: '0.75rem' }}>
                Close Sizing Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Write Review */}
      {reviewModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(5px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#121217',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '10px',
              padding: '2rem',
              maxWidth: '480px',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#FAF9F6', margin: 0 }}>
                Write Patron Review
              </h3>
              <button onClick={() => setReviewModalOpen(false)} style={{ color: '#8A8A93' }}>
                &times;
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                  Rating (Stars)
                </label>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      style={{ color: star <= newReview.rating ? '#D4AF37' : '#444', fontSize: '1.2rem' }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maharani Radhika"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: '#1A1A24',
                    border: '1px solid #2C2C3A',
                    borderRadius: '4px',
                    padding: '0.6rem 0.8rem',
                    fontSize: '0.82rem',
                    color: '#FAF9F6',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                  Review Headline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Impeccable fit and drape"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: '#1A1A24',
                    border: '1px solid #2C2C3A',
                    borderRadius: '4px',
                    padding: '0.6rem 0.8rem',
                    fontSize: '0.82rem',
                    color: '#FAF9F6',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                  Your Review
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your thoughts on the fabrics, fit, or packaging..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: '#1A1A24',
                    border: '1px solid #2C2C3A',
                    borderRadius: '4px',
                    padding: '0.6rem 0.8rem',
                    fontSize: '0.82rem',
                    color: '#FAF9F6',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="btn btn-ghost"
                  style={{ fontSize: '0.75rem' }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold" style={{ fontSize: '0.75rem' }}>
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

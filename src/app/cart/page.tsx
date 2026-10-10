'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  CreditCard,
  Truck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency } from '@/lib/utils';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    itemCount,
    subtotal,
    tax,
    shippingFee,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const { user, isLoggedIn } = useAuth();

  // Coupon input
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; error?: boolean } | null>(null);

  // Checkout flow state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  // Address form
  const [shippingAddress, setShippingAddress] = useState({
    name: user?.name || 'Aryaman Birla',
    phone: user?.phone || '+91 98200 45678',
    street: user?.addresses[0]?.street || 'Tower 2, The Imperial Towers, Tardeo',
    apartment: user?.addresses[0]?.apartment || 'Apt 4201',
    city: user?.addresses[0]?.city || 'Mumbai',
    state: user?.addresses[0]?.state || 'Maharashtra',
    pincode: user?.addresses[0]?.pincode || '400034',
  });

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (res.success) {
      setCouponMessage({ text: res.message });
      setCouponCode('');
    } else {
      setCouponMessage({ text: res.message, error: true });
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderProcessing(true);

    try {
      // Simulate Razorpay Gateway or COD verification
      if (paymentMethod === 'razorpay') {
        await new Promise((res) => setTimeout(res, 1200)); // Simulating Razorpay Secure Sign
      } else {
        await new Promise((res) => setTimeout(res, 800));
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          customerName: shippingAddress.name,
          customerEmail: user?.email || 'patron@yzaaar.com',
          customerPhone: shippingAddress.phone,
          shippingAddress: {
            ...shippingAddress,
            id: `addr_${Date.now()}`,
            isDefault: true,
          },
          items,
          subtotal,
          tax,
          shippingFee,
          discount,
          total,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCompletedOrder(data.order);
        clearCart();
        setIsCheckingOut(false);

        // Fire celebration confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#FAF9F6', '#ECC86A', '#AA7C11'],
          });
        } catch (e) {
          // ignore
        }
      }
    } catch (err) {
      console.error('Order placement failed:', err);
    } finally {
      setOrderProcessing(false);
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (completedOrder) {
    return (
      <div style={{ backgroundColor: '#0A0A0C', padding: '5rem 0', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <div
            style={{
              backgroundColor: '#121217',
              border: '1px solid rgba(212, 175, 55, 0.45)',
              borderRadius: '12px',
              padding: '3rem 2.5rem',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8), var(--gold-glow)',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid #D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ECC86A',
                margin: '0 auto 1.5rem',
              }}
            >
              <CheckCircle2 size={38} />
            </div>

            <span
              style={{
                fontSize: '0.78rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                fontWeight: 600,
              }}
            >
              Sartorial Consignment Confirmed
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.4rem',
                color: '#FAF9F6',
                margin: '0.5rem 0 1rem',
              }}
            >
              Thank You, {completedOrder.customerName}
            </h1>

            <p style={{ fontSize: '0.92rem', color: '#B0B0BA', lineHeight: 1.6, marginBottom: '2rem' }}>
              Your order <strong style={{ color: '#ECC86A' }}>#{completedOrder.orderNumber}</strong> has been confirmed and registered in our master atelier queue. A confirmation has been transmitted to your email.
            </p>

            {/* Order snapshot summary */}
            <div
              style={{
                backgroundColor: '#16161D',
                border: '1px solid #242430',
                borderRadius: '8px',
                padding: '1.4rem',
                textAlign: 'left',
                marginBottom: '2rem',
                fontSize: '0.85rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#8A8A93' }}>Consignment Total:</span>
                <span style={{ color: '#ECC86A', fontWeight: 700 }}>{formatCurrency(completedOrder.total)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#8A8A93' }}>Payment Method:</span>
                <span style={{ color: '#FAF9F6', textTransform: 'uppercase', fontWeight: 600 }}>
                  {completedOrder.paymentMethod === 'razorpay' ? 'Razorpay (Paid Online)' : 'Cash on Delivery (Pending)'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8A8A93' }}>Delivery Destination:</span>
                <span style={{ color: '#FAF9F6' }}>
                  {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.pincode}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/account?tab=orders" className="btn btn-gold" style={{ padding: '0.85rem 1.8rem', fontSize: '0.8rem' }}>
                View in Order History & Tracking
              </Link>
              <Link href="/shop" className="btn btn-outline-gold" style={{ padding: '0.85rem 1.6rem', fontSize: '0.8rem' }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART SCREEN
  if (items.length === 0 && !isCheckingOut) {
    return (
      <div style={{ backgroundColor: '#0A0A0C', padding: '6rem 0', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '520px', textAlign: 'center' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#D4AF37',
              margin: '0 auto 1.8rem',
            }}
          >
            <ShoppingBag size={36} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FAF9F6', margin: '0 0 0.8rem' }}>
            Your Atelier Bag is Empty
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#8A8A93', lineHeight: 1.6, marginBottom: '2.2rem' }}>
            Discover our autumn gala evening wear, bespoke velvet dinner jackets, and handcrafted leather goods.
          </p>

          <Link href="/shop" className="btn btn-gold" style={{ padding: '0.9rem 2.2rem', fontSize: '0.82rem' }}>
            Explore The Collection <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0A0A0C', padding: '3.5rem 0 7rem', minHeight: '85vh' }}>
      <div className="container">
        {/* Breadcrumb & Title */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.78rem', color: '#8A8A93', marginBottom: '0.6rem' }}>
            <Link href="/">Home</Link>
            <span>/</span>
            <span style={{ color: '#D4AF37' }}>Atelier Bag & Checkout</span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              color: '#FAF9F6',
              margin: 0,
            }}
          >
            {isCheckingOut ? 'Bespoke Atelier Checkout' : `Shopping Bag (${itemCount} Items)`}
          </h1>
        </div>

        {/* 2-Column Cart Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: '3rem',
            alignItems: 'flex-start',
          }}
          className="cart-grid-layout"
        >
          {/* LEFT: Items List OR Checkout Form */}
          {!isCheckingOut ? (
            <div>
              {/* Free delivery meter */}
              <div
                style={{
                  backgroundColor: '#121217',
                  border: '1px solid #202028',
                  borderRadius: '8px',
                  padding: '1.2rem',
                  marginBottom: '1.8rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                  {subtotal >= 5000 ? (
                    <span style={{ color: '#2ECC71', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <ShieldCheck size={16} /> Unlocked Complimentary White-Glove Delivery
                    </span>
                  ) : (
                    <span style={{ color: '#ECC86A' }}>
                      Add <strong>{formatCurrency(5000 - subtotal)}</strong> more for Complimentary Delivery
                    </span>
                  )}
                  <span style={{ color: '#8A8A93' }}>{Math.min(100, Math.round((subtotal / 5000) * 100))}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#20202A', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${Math.min(100, (subtotal / 5000) * 100)}%`,
                      height: '100%',
                      background: 'var(--gold-gradient)',
                    }}
                  />
                </div>
              </div>

              {/* Items Table */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '1.5rem',
                      backgroundColor: '#121217',
                      border: '1px solid #202028',
                      borderRadius: '8px',
                      padding: '1.4rem',
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100px',
                        height: '125px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        backgroundColor: '#191922',
                        flexShrink: 0,
                      }}
                    >
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Link href={`/shop/${item.productSlug}`} style={{ textDecoration: 'none' }}>
                            <h3
                              style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '1.1rem',
                                color: '#FAF9F6',
                                fontWeight: 600,
                                margin: '0 0 0.3rem',
                              }}
                            >
                              {item.title}
                            </h3>
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{ color: '#71717A', transition: 'color 0.2s', padding: '0.2rem' }}
                            aria-label="Remove item"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#A1A1AC', marginTop: '0.2rem' }}>
                          <span>Size: <strong style={{ color: '#FAF9F6' }}>{item.size}</strong></span>
                          <span>Color: <strong style={{ color: '#FAF9F6' }}>{item.color}</strong></span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                        {/* Qty controls */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #33333F',
                            borderRadius: '4px',
                            backgroundColor: '#16161D',
                          }}
                        >
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            style={{ padding: '0.35rem 0.65rem', color: '#A1A1AA' }}
                          >
                            <Minus size={13} />
                          </button>
                          <span style={{ padding: '0.35rem 0.8rem', fontSize: '0.85rem', color: '#FAF9F6', fontWeight: 600 }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={{ padding: '0.35rem 0.65rem', color: '#A1A1AA' }}
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: '#ECC86A' }}>
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* CHECKOUT STEP FORM */
            <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Shipping Address */}
              <div
                style={{
                  backgroundColor: '#121217',
                  border: '1px solid #202028',
                  borderRadius: '8px',
                  padding: '1.8rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D4AF37', margin: 0 }}>
                    1. Consignment Shipping Destination
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    style={{ fontSize: '0.75rem', color: '#A1A1AA', textDecoration: 'underline' }}
                  >
                    Edit Bag Items
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                      Full Recipient Name
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.name}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                      style={{
                        width: '100%',
                        backgroundColor: '#181822',
                        border: '1px solid #2B2B38',
                        borderRadius: '4px',
                        padding: '0.65rem 0.8rem',
                        fontSize: '0.82rem',
                        color: '#FAF9F6',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                      Contact Phone (for Delivery OTP)
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      style={{
                        width: '100%',
                        backgroundColor: '#181822',
                        border: '1px solid #2B2B38',
                        borderRadius: '4px',
                        padding: '0.65rem 0.8rem',
                        fontSize: '0.82rem',
                        color: '#FAF9F6',
                      }}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                      Street Address & Building
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      style={{
                        width: '100%',
                        backgroundColor: '#181822',
                        border: '1px solid #2B2B38',
                        borderRadius: '4px',
                        padding: '0.65rem 0.8rem',
                        fontSize: '0.82rem',
                        color: '#FAF9F6',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      style={{
                        width: '100%',
                        backgroundColor: '#181822',
                        border: '1px solid #2B2B38',
                        borderRadius: '4px',
                        padding: '0.65rem 0.8rem',
                        fontSize: '0.82rem',
                        color: '#FAF9F6',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                      PIN Code
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.pincode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                      style={{
                        width: '100%',
                        backgroundColor: '#181822',
                        border: '1px solid #2B2B38',
                        borderRadius: '4px',
                        padding: '0.65rem 0.8rem',
                        fontSize: '0.82rem',
                        color: '#FAF9F6',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div
                style={{
                  backgroundColor: '#121217',
                  border: '1px solid #202028',
                  borderRadius: '8px',
                  padding: '1.8rem',
                }}
              >
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D4AF37', margin: '0 0 1.2rem' }}>
                  2. Select Payment Modality
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Razorpay Option */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1.2rem',
                      borderRadius: '6px',
                      border: paymentMethod === 'razorpay' ? '1px solid #D4AF37' : '1px solid #242430',
                      backgroundColor: paymentMethod === 'razorpay' ? '#191924' : '#14141A',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'razorpay'}
                        onChange={() => setPaymentMethod('razorpay')}
                        style={{ accentColor: '#D4AF37' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <CreditCard size={18} color="#ECC86A" />
                          <strong style={{ fontSize: '0.9rem', color: '#FAF9F6' }}>
                            Razorpay Online Checkout
                          </strong>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#8A8A96', margin: '0.2rem 0 0' }}>
                          UPI (GPay, PhonePe, Paytm), NetBanking, Credit/Debit Cards with 256-Bit SSL Encryption
                        </p>
                      </div>
                    </div>
                    <span className="badge badge-gold">Instant Dispatch</span>
                  </label>

                  {/* Cash on Delivery Option */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1.2rem',
                      borderRadius: '6px',
                      border: paymentMethod === 'cod' ? '1px solid #D4AF37' : '1px solid #242430',
                      backgroundColor: paymentMethod === 'cod' ? '#191924' : '#14141A',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        style={{ accentColor: '#D4AF37' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Truck size={18} color="#ECC86A" />
                          <strong style={{ fontSize: '0.9rem', color: '#FAF9F6' }}>
                            Cash on Delivery (COD)
                          </strong>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#8A8A96', margin: '0.2rem 0 0' }}>
                          Verified on dispatch. Pay courier upon physical arrival of your insured consignment.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Order Button */}
              <button
                type="submit"
                disabled={orderProcessing}
                className="btn btn-gold"
                style={{ padding: '1.1rem', fontSize: '0.9rem', width: '100%' }}
              >
                {orderProcessing ? (
                  <span>Securing Consignment & Verification...</span>
                ) : (
                  <span>
                    Authorize & Complete Consignment ({formatCurrency(total)}) <ArrowRight size={18} />
                  </span>
                )}
              </button>
            </form>
          )}

          {/* RIGHT: Order Summary Card */}
          <div
            style={{
              backgroundColor: '#121217',
              border: '1px solid #202028',
              borderRadius: '8px',
              padding: '1.8rem',
              height: 'fit-content',
            }}
          >
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FAF9F6', margin: '0 0 1.4rem' }}>
              Order Financial Summary
            </h3>

            {/* Privilege Coupon Input */}
            <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #202028' }}>
              <span style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.4rem' }}>
                Have an Atelier Privilege Code?
              </span>

              {appliedCoupon ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0.8rem',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid #D4AF37',
                    borderRadius: '4px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ECC86A', fontSize: '0.8rem' }}>
                    <Tag size={14} />
                    <span><strong>{appliedCoupon.code}</strong> Applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    style={{ fontSize: '0.72rem', color: '#E05252', textDecoration: 'underline' }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.4rem' }}>
                  <input
                    type="text"
                    placeholder="e.g. YZAAR10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
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
                    Apply
                  </button>
                </form>
              )}

              {couponMessage && (
                <p style={{ fontSize: '0.72rem', marginTop: '0.4rem', color: couponMessage.error ? '#E05252' : '#2ECC71' }}>
                  {couponMessage.text}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8A8A93' }}>Subtotal</span>
                <span style={{ color: '#FAF9F6', fontWeight: 600 }}>{formatCurrency(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2ECC71' }}>
                  <span>Privilege Discount</span>
                  <span>- {formatCurrency(discount)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8A8A93' }}>GST Tax (18% Luxury)</span>
                <span style={{ color: '#FAF9F6' }}>{formatCurrency(tax)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8A8A93' }}>White-Glove Shipping</span>
                <span style={{ color: shippingFee === 0 ? '#2ECC71' : '#FAF9F6' }}>
                  {shippingFee === 0 ? 'Complimentary' : formatCurrency(shippingFee)}
                </span>
              </div>

              {/* Total */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderTop: '1px solid #242430',
                  paddingTop: '1rem',
                  marginTop: '0.5rem',
                }}
              >
                <span style={{ fontSize: '1rem', fontWeight: 600, color: '#FAF9F6' }}>Total Payable</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: '#ECC86A' }}>
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* Checkout Action if in bag review step */}
            {!isCheckingOut && (
              <div style={{ marginTop: '1.8rem' }}>
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="btn btn-gold"
                  style={{ width: '100%', padding: '0.95rem' }}
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .cart-grid-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

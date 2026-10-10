'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  User as UserIcon,
  Package,
  MapPin,
  LifeBuoy,
  LogOut,
  FileText,
  Clock,
  CheckCircle2,
  Truck,
  Plus,
  Trash2,
  Shield,
  Send,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Order, SupportTicket } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';

function AccountDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoggedIn, logout, updateProfile, addAddress, removeAddress, setDefaultAddress } = useAuth();

  const initialTab = searchParams.get('tab') || 'orders';
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Address form modal
  const [newAddressModal, setNewAddressModal] = useState(false);
  const [addressForm, setAddressForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: '',
    apartment: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    isDefault: false,
  });

  // Profile edit
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');
  const [profileSaved, setProfileSaved] = useState(false);

  // Support Tickets
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'tkt_01',
      ticketNumber: 'TKT-9012',
      userId: user?.id || 'usr_01',
      userName: user?.name || 'Aryaman Birla',
      subject: 'Inquiry regarding Bespoke Lapel Alteration on Aurum Tuxedo',
      category: 'sizing',
      status: 'in_progress',
      priority: 'high',
      createdAt: '2026-10-09T14:00:00Z',
      messages: [
        {
          id: 'msg_1',
          sender: 'customer',
          text: 'Can the sleeve length be taken in by 0.5 inches upon delivery?',
          timestamp: '2026-10-09T14:00:00Z',
        },
        {
          id: 'msg_2',
          sender: 'support',
          text: 'Greetings Mr. Birla. Yes, our visiting tailor will accompany the consignment for immediate sleeve adjustment.',
          timestamp: '2026-10-09T14:45:00Z',
        },
      ],
    },
  ]);
  const [newTicketModal, setNewTicketModal] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState<'order' | 'shipping' | 'returns' | 'sizing' | 'general'>('sizing');
  const [ticketMessage, setTicketMessage] = useState('');

  // Selected Order for Invoice view
  const [invoiceModalOrder, setInvoiceModalOrder] = useState<Order | null>(null);

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) setActiveTab(tabFromUrl);
  }, [searchParams]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoadingOrders(false);
      }
    }
    fetchOrders();
  }, []);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileName, profilePhone);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.street || !addressForm.city || !addressForm.pincode) return;

    addAddress(addressForm);
    setNewAddressModal(false);
    setAddressForm({
      name: user?.name || '',
      phone: user?.phone || '',
      street: '',
      apartment: '',
      city: '',
      state: 'Maharashtra',
      pincode: '',
      isDefault: false,
    });
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;

    const newTicket: SupportTicket = {
      id: `tkt_${Date.now()}`,
      ticketNumber: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: user?.id || 'usr_01',
      userName: user?.name || 'Patron',
      subject: ticketSubject,
      category: ticketCategory,
      status: 'open',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: `msg_${Date.now()}`,
          sender: 'customer',
          text: ticketMessage,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    setTickets([newTicket, ...tickets]);
    setNewTicketModal(false);
    setTicketSubject('');
    setTicketMessage('');
  };

  return (
    <div style={{ backgroundColor: '#0A0A0C', padding: '3.5rem 0 6rem', minHeight: '85vh' }}>
      <div className="container">
        {/* Patron Banner */}
        <div
          style={{
            backgroundColor: '#121217',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            borderRadius: '12px',
            padding: '2rem 2.5rem',
            marginBottom: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid #D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ECC86A',
                fontSize: '1.4rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
              }}
            >
              {user ? user.name.charAt(0) : 'P'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#FAF9F6', margin: 0 }}>
                  {user?.name || 'Valued Patron'}
                </h1>
                <span className="badge badge-gold">Gold Circle Patron</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#8A8A93', margin: '0.2rem 0 0' }}>
                {user?.email || 'patron@yzaaar.com'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <Link href="/admin" className="btn btn-outline-gold" style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem', gap: '0.4rem' }}>
              <Shield size={14} /> Staff Portal
            </Link>
            <button
              onClick={() => {
                logout();
                router.push('/');
              }}
              className="btn btn-dark"
              style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem', color: '#E05252' }}
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Tabs & Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2.5rem' }} className="account-grid-layout">
          {/* Navigation Sidebar */}
          <aside
            style={{
              backgroundColor: '#111116',
              border: '1px solid #202028',
              borderRadius: '8px',
              padding: '1.2rem',
              height: 'fit-content',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <button
                onClick={() => setActiveTab('orders')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textAlign: 'left',
                  color: activeTab === 'orders' ? '#0A0A0B' : '#A1A1AA',
                  background: activeTab === 'orders' ? 'var(--gold-gradient)' : 'transparent',
                }}
              >
                <Package size={16} /> Order History & Tracking
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textAlign: 'left',
                  color: activeTab === 'addresses' ? '#0A0A0B' : '#A1A1AA',
                  background: activeTab === 'addresses' ? 'var(--gold-gradient)' : 'transparent',
                }}
              >
                <MapPin size={16} /> Saved Addresses ({user?.addresses.length || 0})
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textAlign: 'left',
                  color: activeTab === 'profile' ? '#0A0A0B' : '#A1A1AA',
                  background: activeTab === 'profile' ? 'var(--gold-gradient)' : 'transparent',
                }}
              >
                <UserIcon size={16} /> Patron Profile & Sizing
              </button>

              <button
                onClick={() => setActiveTab('support')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textAlign: 'left',
                  color: activeTab === 'support' ? '#0A0A0B' : '#A1A1AA',
                  background: activeTab === 'support' ? 'var(--gold-gradient)' : 'transparent',
                }}
              >
                <LifeBuoy size={16} /> Support & Concierge ({tickets.length})
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div>
            {/* TAB 1: ORDERS & TRACKING */}
            {activeTab === 'orders' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FAF9F6', margin: 0 }}>
                    Consignment History & Live Tracking
                  </h2>
                  <span style={{ fontSize: '0.8rem', color: '#8A8A93' }}>
                    Showing {orders.length} consignments
                  </span>
                </div>

                {loadingOrders ? (
                  <div style={{ padding: '3rem 0', color: '#D4AF37', textAlign: 'center' }}>
                    Loading your consignments...
                  </div>
                ) : orders.length === 0 ? (
                  <div
                    style={{
                      backgroundColor: '#121217',
                      border: '1px solid #202028',
                      borderRadius: '8px',
                      padding: '3rem',
                      textAlign: 'center',
                      color: '#8A8A93',
                    }}
                  >
                    No prior orders recorded. Explore our Haute Couture catalog to place your first consignment.
                  </div>
                ) : (
                  orders.map((ord) => (
                    <div
                      key={ord.id}
                      style={{
                        backgroundColor: '#121217',
                        border: '1px solid #202028',
                        borderRadius: '8px',
                        padding: '1.8rem',
                      }}
                    >
                      {/* Order top bar */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          paddingBottom: '1rem',
                          borderBottom: '1px solid #1E1E26',
                          marginBottom: '1.2rem',
                          gap: '1rem',
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: '#ECC86A' }}>
                              #{ord.orderNumber}
                            </span>
                            <span
                              className={`badge ${
                                ord.orderStatus === 'delivered'
                                  ? 'badge-success'
                                  : ord.orderStatus === 'cancelled'
                                  ? 'badge-danger'
                                  : 'badge-gold'
                              }`}
                            >
                              {ord.orderStatus.toUpperCase()}
                            </span>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: '#71717A' }}>
                            Placed on {formatDate(ord.createdAt)} via {ord.paymentMethod.toUpperCase()}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, color: '#FAF9F6' }}>
                            {formatCurrency(ord.total)}
                          </span>
                          <button
                            onClick={() => setInvoiceModalOrder(ord)}
                            className="btn btn-outline-gold"
                            style={{ padding: '0.45rem 0.9rem', fontSize: '0.72rem', gap: '0.35rem' }}
                          >
                            <FileText size={13} /> GST Invoice PDF
                          </button>
                        </div>
                      </div>

                      {/* Items inside order */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
                        {ord.items.map((item) => (
                          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{ width: '48px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                            <div style={{ flex: 1 }}>
                              <h4 style={{ fontSize: '0.88rem', color: '#FAF9F6', margin: '0 0 0.2rem' }}>{item.title}</h4>
                              <span style={{ fontSize: '0.75rem', color: '#8A8A93' }}>
                                Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                              </span>
                            </div>
                            <span style={{ fontSize: '0.85rem', color: '#ECC86A', fontWeight: 600 }}>
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Live Tracking Timeline */}
                      <div style={{ backgroundColor: '#16161D', borderRadius: '6px', padding: '1.2rem', border: '1px solid #242430' }}>
                        <span style={{ fontSize: '0.72rem', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.8rem', fontWeight: 600 }}>
                          Live Consignment Tracking Timeline
                        </span>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                          {ord.timeline.map((evt, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', fontSize: '0.78rem' }}>
                              <div
                                style={{
                                  width: '18px',
                                  height: '18px',
                                  borderRadius: '50%',
                                  backgroundColor: '#D4AF37',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#0A0A0B',
                                  fontSize: '0.6rem',
                                  flexShrink: 0,
                                  marginTop: '2px',
                                }}
                              >
                                ✓
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FAF9F6', fontWeight: 600 }}>
                                  <span style={{ textTransform: 'capitalize' }}>{evt.status.replace('_', ' ')}</span>
                                  <span style={{ color: '#71717A', fontWeight: 400 }}>{formatDate(evt.timestamp)}</span>
                                </div>
                                <p style={{ color: '#A1A1AA', margin: '0.1rem 0 0' }}>{evt.note}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 2: ADDRESSES */}
            {activeTab === 'addresses' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FAF9F6', margin: 0 }}>
                    Saved Delivery Destinations
                  </h2>
                  <button
                    onClick={() => setNewAddressModal(true)}
                    className="btn btn-gold"
                    style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem', gap: '0.4rem' }}
                  >
                    <Plus size={14} /> Add New Address
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {user?.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      style={{
                        backgroundColor: '#121217',
                        border: addr.isDefault ? '1px solid #D4AF37' : '1px solid #202028',
                        borderRadius: '8px',
                        padding: '1.6rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                          <h4 style={{ fontSize: '0.95rem', color: '#FAF9F6', margin: 0, fontWeight: 600 }}>
                            {addr.name}
                          </h4>
                          {addr.isDefault && <span className="badge badge-gold">Default</span>}
                        </div>

                        <p style={{ fontSize: '0.82rem', color: '#A1A1AB', lineHeight: 1.5, margin: 0 }}>
                          {addr.street} {addr.apartment && `, ${addr.apartment}`}
                          <br />
                          {addr.city}, {addr.state} — {addr.pincode}
                        </p>
                        <p style={{ fontSize: '0.78rem', color: '#71717A', marginTop: '0.6rem' }}>
                          Phone: {addr.phone}
                        </p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.4rem', borderTop: '1px solid #1E1E26', paddingTop: '0.8rem' }}>
                        {!addr.isDefault && (
                          <button
                            onClick={() => setDefaultAddress(addr.id)}
                            style={{ fontSize: '0.75rem', color: '#ECC86A', textDecoration: 'underline' }}
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => removeAddress(addr.id)}
                          style={{ fontSize: '0.75rem', color: '#E05252', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PROFILE & SIZING */}
            {activeTab === 'profile' && (
              <div
                style={{
                  backgroundColor: '#121217',
                  border: '1px solid #202028',
                  borderRadius: '8px',
                  padding: '2rem',
                  maxWidth: '560px',
                }}
              >
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FAF9F6', margin: '0 0 1.4rem' }}>
                  Patron Profile Details
                </h2>

                <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      style={{
                        width: '100%',
                        backgroundColor: '#181822',
                        border: '1px solid #2B2B38',
                        borderRadius: '4px',
                        padding: '0.65rem 0.8rem',
                        fontSize: '0.85rem',
                        color: '#FAF9F6',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                      Registered Email
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || ''}
                      style={{
                        width: '100%',
                        backgroundColor: '#101015',
                        border: '1px solid #22222E',
                        borderRadius: '4px',
                        padding: '0.65rem 0.8rem',
                        fontSize: '0.85rem',
                        color: '#71717A',
                        cursor: 'not-allowed',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      style={{
                        width: '100%',
                        backgroundColor: '#181822',
                        border: '1px solid #2B2B38',
                        borderRadius: '4px',
                        padding: '0.65rem 0.8rem',
                        fontSize: '0.85rem',
                        color: '#FAF9F6',
                      }}
                    />
                  </div>

                  <button type="submit" className="btn btn-gold" style={{ padding: '0.75rem', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                    Save Profile Changes
                  </button>

                  {profileSaved && (
                    <p style={{ color: '#2ECC71', fontSize: '0.8rem', margin: 0, textAlign: 'center' }}>
                      Patron preferences saved successfully.
                    </p>
                  )}
                </form>
              </div>
            )}

            {/* TAB 4: SUPPORT TICKETS */}
            {activeTab === 'support' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem' }}>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FAF9F6', margin: 0 }}>
                      Atelier Concierge & Tickets
                    </h2>
                    <span style={{ fontSize: '0.8rem', color: '#8A8A93' }}>
                      Direct line to master tailors and shipping directors
                    </span>
                  </div>

                  <button
                    onClick={() => setNewTicketModal(true)}
                    className="btn btn-gold"
                    style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem', gap: '0.4rem' }}
                  >
                    <Plus size={14} /> Raise Inquiry Ticket
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {tickets.map((tkt) => (
                    <div
                      key={tkt.id}
                      style={{
                        backgroundColor: '#121217',
                        border: '1px solid #202028',
                        borderRadius: '8px',
                        padding: '1.6rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.8rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span style={{ color: '#ECC86A', fontWeight: 600, fontSize: '0.85rem' }}>
                            #{tkt.ticketNumber}
                          </span>
                          <span className="badge badge-gold" style={{ textTransform: 'uppercase' }}>
                            {tkt.category}
                          </span>
                          <span className={`badge ${tkt.status === 'open' ? 'badge-dark' : 'badge-success'}`}>
                            {tkt.status.replace('_', ' ')}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#71717A' }}>
                          {formatDate(tkt.createdAt)}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '1.05rem', color: '#FAF9F6', fontWeight: 600, margin: '0 0 1rem' }}>
                        {tkt.subject}
                      </h4>

                      {/* Chat messages */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', backgroundColor: '#16161D', padding: '1rem', borderRadius: '6px', border: '1px solid #242430' }}>
                        {tkt.messages.map((m) => (
                          <div
                            key={m.id}
                            style={{
                              padding: '0.6rem 0.8rem',
                              borderRadius: '4px',
                              backgroundColor: m.sender === 'support' ? 'rgba(212, 175, 55, 0.12)' : '#1E1E26',
                              borderLeft: m.sender === 'support' ? '3px solid #D4AF37' : 'none',
                              fontSize: '0.8rem',
                            }}
                          >
                            <span style={{ fontSize: '0.7rem', color: m.sender === 'support' ? '#ECC86A' : '#8A8A93', display: 'block', marginBottom: '0.2rem', fontWeight: 600 }}>
                              {m.sender === 'support' ? 'Yzaaar Master Atelier' : user?.name || 'You'}
                            </span>
                            <p style={{ color: '#E8E8EE', margin: 0 }}>{m.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL: GST INVOICE DOWNLOAD & PREVIEW */}
      {invoiceModalOrder && (
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
              backgroundColor: '#FFFFFF',
              color: '#121212',
              borderRadius: '8px',
              padding: '2.5rem',
              maxWidth: '640px',
              width: '100%',
              boxShadow: '0 25px 60px rgba(0,0,0,0.9)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Invoice Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #D4AF37', paddingBottom: '1.2rem', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', margin: 0, color: '#0A0A0B', letterSpacing: '0.04em' }}>
                  YZAAAR HAUTE COUTURE
                </h2>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#997519', display: 'block' }}>
                  TAX INVOICE · FASHION LIVES ONLINE
                </span>
                <p style={{ fontSize: '0.75rem', color: '#666', margin: '0.4rem 0 0' }}>
                  GSTIN: 27AAACY9021A1Z9 | Boutique Atelier: Mumbai, Maharashtra
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>INVOICE: INV-{invoiceModalOrder.orderNumber}</span>
                <p style={{ fontSize: '0.75rem', color: '#666', margin: '0.2rem 0 0' }}>
                  Date: {formatDate(invoiceModalOrder.createdAt)}
                </p>
              </div>
            </div>

            {/* Bill To */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.8rem', fontSize: '0.8rem', color: '#333' }}>
              <div>
                <strong>Billed To:</strong>
                <p style={{ margin: '0.2rem 0' }}>{invoiceModalOrder.customerName}</p>
                <p style={{ margin: 0, color: '#666' }}>{invoiceModalOrder.shippingAddress.street}</p>
                <p style={{ margin: 0, color: '#666' }}>
                  {invoiceModalOrder.shippingAddress.city}, {invoiceModalOrder.shippingAddress.pincode}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong>Payment Modality:</strong>
                <p style={{ margin: '0.2rem 0', textTransform: 'uppercase' }}>{invoiceModalOrder.paymentMethod}</p>
                <span style={{ color: '#2ECC71', fontWeight: 600 }}>Payment Status: {invoiceModalOrder.paymentStatus.toUpperCase()}</span>
              </div>
            </div>

            {/* Items Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F6F5F2', borderBottom: '1px solid #DDD' }}>
                  <th style={{ padding: '0.6rem', textAlign: 'left' }}>Item Description</th>
                  <th style={{ padding: '0.6rem', textAlign: 'center' }}>Qty</th>
                  <th style={{ padding: '0.6rem', textAlign: 'right' }}>Unit Price</th>
                  <th style={{ padding: '0.6rem', textAlign: 'right' }}>Total (INR)</th>
                </tr>
              </thead>
              <tbody>
                {invoiceModalOrder.items.map((it) => (
                  <tr key={it.id} style={{ borderBottom: '1px solid #EEE' }}>
                    <td style={{ padding: '0.6rem' }}>
                      <strong>{it.title}</strong>
                      <div style={{ fontSize: '0.72rem', color: '#666' }}>Variant: {it.size} / {it.color}</div>
                    </td>
                    <td style={{ padding: '0.6rem', textAlign: 'center' }}>{it.quantity}</td>
                    <td style={{ padding: '0.6rem', textAlign: 'right' }}>{formatCurrency(it.price)}</td>
                    <td style={{ padding: '0.6rem', textAlign: 'right', fontWeight: 600 }}>
                      {formatCurrency(it.price * it.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total calculation */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
              <div style={{ width: '240px', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal:</span>
                  <span>{formatCurrency(invoiceModalOrder.subtotal)}</span>
                </div>
                {invoiceModalOrder.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2ECC71' }}>
                    <span>Privilege Discount:</span>
                    <span>- {formatCurrency(invoiceModalOrder.discount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>CGST (9%):</span>
                  <span>{formatCurrency(invoiceModalOrder.tax / 2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>SGST (9%):</span>
                  <span>{formatCurrency(invoiceModalOrder.tax / 2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #111', paddingTop: '0.4rem', fontWeight: 700, fontSize: '0.95rem' }}>
                  <span>Grand Total:</span>
                  <span style={{ color: '#AA7C11' }}>{formatCurrency(invoiceModalOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', borderTop: '1px solid #DDD', paddingTop: '1rem' }}>
              <button
                onClick={() => setInvoiceModalOrder(null)}
                style={{ padding: '0.6rem 1.2rem', backgroundColor: '#EEE', borderRadius: '4px', fontSize: '0.78rem', color: '#333' }}
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="btn btn-gold"
                style={{ padding: '0.6rem 1.4rem', fontSize: '0.78rem' }}
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD ADDRESS */}
      {newAddressModal && (
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
                Add New Delivery Address
              </h3>
              <button onClick={() => setNewAddressModal(false)} style={{ color: '#8A8A93' }}>
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateAddress} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.2rem' }}>
                  Recipient Name
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.name}
                  onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: '#181822',
                    border: '1px solid #2B2B38',
                    borderRadius: '4px',
                    padding: '0.6rem 0.8rem',
                    fontSize: '0.82rem',
                    color: '#FAF9F6',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.2rem' }}>
                  Street & Building
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: '#181822',
                    border: '1px solid #2B2B38',
                    borderRadius: '4px',
                    padding: '0.6rem 0.8rem',
                    fontSize: '0.82rem',
                    color: '#FAF9F6',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.2rem' }}>
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#181822',
                      border: '1px solid #2B2B38',
                      borderRadius: '4px',
                      padding: '0.6rem 0.8rem',
                      fontSize: '0.82rem',
                      color: '#FAF9F6',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.2rem' }}>
                    PIN Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={addressForm.pincode}
                    onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#181822',
                      border: '1px solid #2B2B38',
                      borderRadius: '4px',
                      padding: '0.6rem 0.8rem',
                      fontSize: '0.82rem',
                      color: '#FAF9F6',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.2rem' }}>
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  value={addressForm.phone}
                  onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: '#181822',
                    border: '1px solid #2B2B38',
                    borderRadius: '4px',
                    padding: '0.6rem 0.8rem',
                    fontSize: '0.82rem',
                    color: '#FAF9F6',
                  }}
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#ECC86A', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                  style={{ accentColor: '#D4AF37' }}
                />
                Make this my primary delivery destination
              </label>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '0.8rem' }}>
                <button
                  type="button"
                  onClick={() => setNewAddressModal(false)}
                  className="btn btn-ghost"
                  style={{ fontSize: '0.75rem' }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold" style={{ fontSize: '0.75rem' }}>
                  Save Destination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NEW TICKET */}
      {newTicketModal && (
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
                Submit Atelier Concierge Ticket
              </h3>
              <button onClick={() => setNewTicketModal(false)} style={{ color: '#8A8A93' }}>
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateTicket} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.2rem' }}>
                  Inquiry Category
                </label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value as any)}
                  style={{
                    width: '100%',
                    backgroundColor: '#181822',
                    border: '1px solid #2B2B38',
                    borderRadius: '4px',
                    padding: '0.6rem 0.8rem',
                    fontSize: '0.82rem',
                    color: '#FAF9F6',
                  }}
                >
                  <option value="sizing">Bespoke Sizing & Master Alterations</option>
                  <option value="order">Order Confirmation & Timeline</option>
                  <option value="shipping">Express White-Glove Shipping</option>
                  <option value="returns">Returns & Exchange Concierge</option>
                  <option value="general">General Atelier Inquiry</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.2rem' }}>
                  Subject / Summary
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Inquire about custom monogramming"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#181822',
                    border: '1px solid #2B2B38',
                    borderRadius: '4px',
                    padding: '0.6rem 0.8rem',
                    fontSize: '0.82rem',
                    color: '#FAF9F6',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.2rem' }}>
                  Detailed Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your request in detail..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#181822',
                    border: '1px solid #2B2B38',
                    borderRadius: '4px',
                    padding: '0.6rem 0.8rem',
                    fontSize: '0.82rem',
                    color: '#FAF9F6',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '0.8rem' }}>
                <button
                  type="button"
                  onClick={() => setNewTicketModal(false)}
                  className="btn btn-ghost"
                  style={{ fontSize: '0.75rem' }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold" style={{ fontSize: '0.75rem' }}>
                  Dispatch Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 860px) {
          .account-grid-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37' }}>
          Loading Patron Account...
        </div>
      }
    >
      <AccountDashboardContent />
    </Suspense>
  );
}

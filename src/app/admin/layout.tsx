'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  Boxes,
  Users,
  ShieldCheck,
  ExternalLink,
  LogOut,
  Bell,
  Menu,
  X,
} from 'lucide-react';
import YzaaarLogo from '@/components/layout/YzaaarLogo';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { adminUser, adminLogout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Executive Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Product Catalog', href: '/admin/products', icon: Package },
    { label: 'Add New Creation', href: '/admin/products/new', icon: PlusCircle },
    { label: 'Orders & Fulfilment', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Inventory & Stock', href: '/admin/inventory', icon: Boxes },
    { label: 'Team Roles & Audit Logs', href: '/admin/roles', icon: Users },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#09090C', color: '#FAF9F6' }}>
      {/* Sidebar Desktop */}
      <aside
        style={{
          width: '260px',
          backgroundColor: '#0F0F14',
          borderRight: '1px solid rgba(212, 175, 55, 0.22)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.8rem 1.2rem',
          flexShrink: 0,
        }}
        className="admin-desktop-sidebar"
      >
        <div>
          {/* Brand & Badge */}
          <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <YzaaarLogo variant="light" size="sm" />
            <div
              style={{
                marginTop: '0.6rem',
                display: 'inline-block',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid #D4AF37',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#ECC86A',
              }}
            >
              Master Admin Portal
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    color: isActive ? '#0A0A0B' : '#A1A1AB',
                    background: isActive ? 'var(--gold-gradient)' : 'transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon size={17} color={isActive ? '#0A0A0B' : '#ECC86A'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Storefront link */}
        <div style={{ borderTop: '1px solid #1E1E26', paddingTop: '1.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid #D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ECC86A',
                fontSize: '0.8rem',
                fontWeight: 700,
              }}
            >
              SA
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#FAF9F6', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {adminUser?.name || 'Super Admin'}
              </p>
              <span style={{ fontSize: '0.68rem', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {adminUser?.role?.replace('_', ' ') || 'Super Admin'}
              </span>
            </div>
          </div>

          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.78rem',
              color: '#8A8A96',
              padding: '0.4rem 0',
            }}
          >
            <ExternalLink size={14} /> View Live Storefront
          </Link>
        </div>
      </aside>

      {/* Main Content View */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Navbar */}
        <header
          style={{
            height: '68px',
            backgroundColor: '#0F0F14',
            borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.5rem',
          }}
          className="admin-header"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="admin-mobile-toggle"
              aria-label="Open admin navigation menu"
              style={{
                color: '#FAF9F6',
                padding: '0.5rem',
                borderRadius: '4px',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
              }}
            >
              <Menu size={20} />
            </button>
            <span style={{ fontSize: '0.82rem', color: '#8A8A93' }}>
              Atelier Management · <strong style={{ color: '#D4AF37' }}>Yzaaar Operations</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <Link
              href="/"
              className="btn btn-outline-gold"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.72rem', gap: '0.35rem' }}
            >
              <ExternalLink size={13} /> <span className="admin-storefront-text">Storefront</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-main-content" style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
          {children}
        </main>
      </div>

      {/* Mobile Slide-Out Drawer */}
      {mobileSidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileSidebarOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(6px)',
              animation: 'fadeIn 0.2s ease',
            }}
          />

          {/* Drawer Sidebar */}
          <aside
            style={{
              position: 'relative',
              width: '280px',
              maxWidth: '85vw',
              height: '100%',
              backgroundColor: '#0F0F14',
              borderRight: '1px solid rgba(212, 175, 55, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '1.5rem 1.2rem',
              zIndex: 10,
              boxShadow: '10px 0 30px rgba(0,0,0,0.8)',
              overflowY: 'auto',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.8rem' }}>
                <YzaaarLogo variant="light" size="sm" />
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  style={{ color: '#FAF9F6', padding: '0.4rem' }}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div
                style={{
                  marginBottom: '1.5rem',
                  display: 'inline-block',
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid #D4AF37',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#ECC86A',
                }}
              >
                Master Admin Portal
              </div>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        color: isActive ? '#0A0A0B' : '#A1A1AB',
                        background: isActive ? 'var(--gold-gradient)' : 'transparent',
                        transition: 'all 0.2s',
                      }}
                    >
                      <Icon size={18} color={isActive ? '#0A0A0B' : '#ECC86A'} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div style={{ borderTop: '1px solid #1E1E26', paddingTop: '1.2rem', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212, 175, 55, 0.15)',
                    border: '1px solid #D4AF37',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ECC86A',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  SA
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FAF9F6', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {adminUser?.name || 'Super Admin'}
                  </p>
                  <span style={{ fontSize: '0.65rem', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {adminUser?.role?.replace('_', ' ') || 'Super Admin'}
                  </span>
                </div>
              </div>

              <Link
                href="/"
                onClick={() => setMobileSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.78rem',
                  color: '#8A8A96',
                  padding: '0.4rem 0',
                }}
              >
                <ExternalLink size={14} /> View Live Storefront
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

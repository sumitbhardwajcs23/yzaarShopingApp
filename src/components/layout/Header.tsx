'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Shield,
  LogOut,
  Package,
} from 'lucide-react';
import YzaaarLogo from './YzaaarLogo';
import AnnouncementBar from './AnnouncementBar';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

export default function Header() {
  const router = useRouter();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isLoggedIn, logout, adminUser } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  // Scroll detection for sticky header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live instant search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        if (data.success) {
          setSearchResults(data.products.slice(0, 5));
        }
      } catch (err) {
        console.error('Search query failed:', err);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { label: 'Collection', href: '/shop' },
    { label: 'Haute Couture', href: '/shop?category=haute-couture' },
    { label: 'Tuxedos & Suits', href: '/shop?category=tuxedos-suits' },
    { label: "Women's Atelier", href: '/shop?category=womens-atelier' },
    { label: "Men's Luxury", href: '/shop?category=mens-luxury' },
    { label: 'Handcrafted Leather', href: '/shop?category=leather-goods' },
  ];

  return (
    <>
      <AnnouncementBar />

      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: isScrolled ? 'rgba(10, 10, 12, 0.96)' : 'rgba(10, 10, 12, 0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.18)',
          transition: 'all 0.3s ease',
          boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.6)' : 'none',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 'var(--header-height)',
              gap: '1.5rem',
            }}
          >
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              style={{
                color: '#FAF9F6',
                padding: '0.5rem',
              }}
              className="mobile-toggle"
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>

            {/* Brand Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <YzaaarLogo variant="light" size="md" />
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.8rem',
              }}
              className="desktop-nav"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#D8D8DF',
                    position: 'relative',
                    padding: '0.4rem 0',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ECC86A')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#D8D8DF')}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Action Icons & Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
              {/* Search Toggle / Input */}
              <div ref={searchRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  style={{
                    color: searchOpen ? '#D4AF37' : '#D8D8DF',
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 0.2s',
                  }}
                  aria-label="Search collection"
                >
                  <Search size={20} />
                </button>

                {/* Search Popup Dropdown */}
                {searchOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '120%',
                      width: '360px',
                      backgroundColor: '#131317',
                      border: '1px solid rgba(212, 175, 55, 0.35)',
                      borderRadius: '8px',
                      padding: '1rem',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.8)',
                      zIndex: 200,
                      animation: 'fadeIn 0.2s ease',
                    }}
                  >
                    <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="text"
                        placeholder="Search velvet, gowns, tuxedos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                        style={{
                          flex: 1,
                          backgroundColor: '#1E1E25',
                          border: '1px solid #33333F',
                          borderRadius: '4px',
                          padding: '0.55rem 0.8rem',
                          fontSize: '0.85rem',
                          color: '#FAF9F6',
                        }}
                      />
                      <button type="submit" className="btn btn-gold" style={{ padding: '0.5rem 0.9rem', fontSize: '0.75rem' }}>
                        Go
                      </button>
                    </form>

                    {/* Instant Search Results */}
                    {searchResults.length > 0 && (
                      <div style={{ marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <div style={{ fontSize: '0.7rem', color: '#8A8A93', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          Instant Atelier Matches
                        </div>
                        {searchResults.map((p) => (
                          <Link
                            key={p.id}
                            href={`/shop/${p.slug}`}
                            onClick={() => setSearchOpen(false)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              padding: '0.4rem',
                              borderRadius: '4px',
                              backgroundColor: '#17171C',
                              transition: 'background 0.2s',
                            }}
                          >
                            <img
                              src={p.images[0]?.url}
                              alt={p.title}
                              style={{ width: '38px', height: '46px', objectFit: 'cover', borderRadius: '3px' }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: '0.8rem', color: '#FAF9F6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>
                                {p.title}
                              </p>
                              <span style={{ fontSize: '0.72rem', color: '#D4AF37', fontWeight: 600 }}>
                                {formatCurrency(p.basePrice)}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                style={{
                  position: 'relative',
                  color: '#D8D8DF',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ECC86A')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#D8D8DF')}
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      background: 'var(--gold-gradient)',
                      color: '#0A0A0B',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                style={{
                  position: 'relative',
                  color: '#D8D8DF',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ECC86A')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#D8D8DF')}
                aria-label="Shopping Bag"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      background: 'var(--gold-gradient)',
                      color: '#0A0A0B',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Account Dropdown */}
              <div ref={accountRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: accountMenuOpen ? '#D4AF37' : '#D8D8DF',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                  }}
                  aria-label="Account Menu"
                >
                  <UserIcon size={17} />
                  <span style={{ display: 'none' }} className="user-name-label">
                    {user ? user.name.split(' ')[0] : 'Sign In'}
                  </span>
                  <ChevronDown size={13} />
                </button>

                {accountMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '120%',
                      width: '240px',
                      backgroundColor: '#131317',
                      border: '1px solid rgba(212, 175, 55, 0.35)',
                      borderRadius: '8px',
                      padding: '0.8rem',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.8)',
                      zIndex: 200,
                      animation: 'fadeIn 0.2s ease',
                    }}
                  >
                    {isLoggedIn && user ? (
                      <div>
                        <div style={{ padding: '0.4rem 0.6rem', borderBottom: '1px solid #222228', marginBottom: '0.4rem' }}>
                          <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: '#FAF9F6' }}>
                            {user.name}
                          </p>
                          <p style={{ margin: 0, fontSize: '0.72rem', color: '#8A8A93' }}>
                            {user.email}
                          </p>
                        </div>
                        <Link
                          href="/account"
                          onClick={() => setAccountMenuOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.5rem 0.6rem',
                            fontSize: '0.8rem',
                            color: '#D8D8DF',
                            borderRadius: '4px',
                          }}
                        >
                          <UserIcon size={15} color="#D4AF37" /> Patron Dashboard
                        </Link>
                        <Link
                          href="/account?tab=orders"
                          onClick={() => setAccountMenuOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.5rem 0.6rem',
                            fontSize: '0.8rem',
                            color: '#D8D8DF',
                            borderRadius: '4px',
                          }}
                        >
                          <Package size={15} color="#D4AF37" /> Order History & Tracking
                        </Link>
                        <Link
                          href="/admin"
                          onClick={() => setAccountMenuOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.5rem 0.6rem',
                            fontSize: '0.8rem',
                            color: '#ECC86A',
                            borderRadius: '4px',
                          }}
                        >
                          <Shield size={15} color="#ECC86A" /> Admin Control Portal
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setAccountMenuOpen(false);
                          }}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.5rem 0.6rem',
                            fontSize: '0.8rem',
                            color: '#E05252',
                            textAlign: 'left',
                            borderRadius: '4px',
                            marginTop: '0.3rem',
                            borderTop: '1px solid #222228',
                          }}
                        >
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div style={{ padding: '0.4rem 0.6rem', borderBottom: '1px solid #222228', marginBottom: '0.6rem' }}>
                          <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: '#FAF9F6' }}>
                            Welcome to Yzaaar
                          </p>
                          <p style={{ margin: 0, fontSize: '0.72rem', color: '#8A8A93' }}>
                            Access orders, addresses & VIP privileges
                          </p>
                        </div>
                        <Link
                          href="/account/login"
                          onClick={() => setAccountMenuOpen(false)}
                          className="btn btn-gold"
                          style={{ width: '100%', padding: '0.6rem', fontSize: '0.75rem', marginBottom: '0.4rem' }}
                        >
                          Patron Sign In
                        </Link>
                        <Link
                          href="/account/register"
                          onClick={() => setAccountMenuOpen(false)}
                          className="btn btn-outline-gold"
                          style={{ width: '100%', padding: '0.6rem', fontSize: '0.75rem' }}
                        >
                          Create Account
                        </Link>
                        <div style={{ marginTop: '0.6rem', borderTop: '1px solid #222228', paddingTop: '0.4rem' }}>
                          <Link
                            href="/admin"
                            onClick={() => setAccountMenuOpen(false)}
                            style={{ fontSize: '0.75rem', color: '#ECC86A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                          >
                            <Shield size={13} /> Staff Login
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer (placed outside header to escape backdrop-filter containing block) */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.82)',
              backdropFilter: 'blur(8px)',
              animation: 'fadeIn 0.2s ease',
            }}
          />

          {/* Drawer Sidebar */}
          <aside
            style={{
              position: 'relative',
              width: '300px',
              maxWidth: '85vw',
              height: '100%',
              backgroundColor: '#0F0F14',
              borderRight: '1px solid rgba(212, 175, 55, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '1.8rem 1.5rem',
              zIndex: 10,
              boxShadow: '10px 0 35px rgba(0,0,0,0.9)',
              animation: 'slideInLeft 0.25s ease-out',
              overflowY: 'auto',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <YzaaarLogo variant="light" size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: '#FAF9F6', padding: '0.4rem' }}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: '#FAF9F6',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '0.6rem 0',
                      borderBottom: '1px solid #1E1E26',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #1E1E26', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: '#ECC86A',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                <Shield size={16} /> Admin Portal
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

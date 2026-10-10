'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, ArrowRight, Lock, Mail, Sparkles } from 'lucide-react';
import YzaaarLogo from '@/components/layout/YzaaarLogo';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email, email.split('@')[0]);
      router.push('/account');
    }
  };

  const handleDemoFill = () => {
    setEmail('aryaman@yzaaarpatron.com');
    setPassword('hauteCouture2026');
    login('aryaman@yzaaarpatron.com', 'Aryaman Birla');
    router.push('/account');
  };

  return (
    <div style={{ backgroundColor: '#0A0A0C', padding: '4.5rem 0 6rem', minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '440px' }}>
        <div
          style={{
            backgroundColor: '#121217',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            borderRadius: '12px',
            padding: '2.5rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), var(--gold-glow)',
            textAlign: 'center',
          }}
        >
          <div style={{ marginBottom: '1.8rem' }}>
            <YzaaarLogo variant="light" size="sm" />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.6rem',
              color: '#FAF9F6',
              margin: '0 0 0.5rem',
            }}
          >
            Patron Sign In
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#8A8A96', marginBottom: '1.8rem' }}>
            Access your bespoke orders, saved addresses, and private concierge privileges.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  placeholder="patron@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#181822',
                    border: '1px solid #2B2B38',
                    borderRadius: '4px',
                    padding: '0.7rem 0.8rem 0.7rem 2.2rem',
                    fontSize: '0.85rem',
                    color: '#FAF9F6',
                  }}
                />
                <Mail size={15} color="#8A8A93" style={{ position: 'absolute', left: '10px', top: '13px' }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#181822',
                    border: '1px solid #2B2B38',
                    borderRadius: '4px',
                    padding: '0.7rem 0.8rem 0.7rem 2.2rem',
                    fontSize: '0.85rem',
                    color: '#FAF9F6',
                  }}
                />
                <Lock size={15} color="#8A8A93" style={{ position: 'absolute', left: '10px', top: '13px' }} />
              </div>
            </div>

            <button type="submit" className="btn btn-gold" style={{ padding: '0.85rem', fontSize: '0.82rem', marginTop: '0.5rem' }}>
              Enter Atelier <ArrowRight size={16} />
            </button>
          </form>

          {/* Demo Instant Autofill Button */}
          <div style={{ marginTop: '1.4rem', borderTop: '1px solid #202028', paddingTop: '1.2rem' }}>
            <button
              onClick={handleDemoFill}
              type="button"
              className="btn btn-outline-gold"
              style={{ width: '100%', padding: '0.65rem', fontSize: '0.75rem', gap: '0.4rem' }}
            >
              <Sparkles size={14} /> Quick Demo Patron Login
            </button>
          </div>

          <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#8A8A93' }}>
            New to Yzaaar?{' '}
            <Link href="/account/register" style={{ color: '#ECC86A', fontWeight: 600 }}>
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

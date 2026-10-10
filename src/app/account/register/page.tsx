'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail, User as UserIcon, Phone } from 'lucide-react';
import YzaaarLogo from '@/components/layout/YzaaarLogo';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      login(email, name);
      router.push('/account');
    }
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
            Create Atelier Account
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#8A8A96', marginBottom: '1.8rem' }}>
            Register to unlock bespoke sizing profiles, VIP previews & 10% welcome privilege.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Apte"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                <UserIcon size={15} color="#8A8A93" style={{ position: 'absolute', left: '10px', top: '13px' }} />
              </div>
            </div>

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
                Phone Number
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  placeholder="+91 98200 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                <Phone size={15} color="#8A8A93" style={{ position: 'absolute', left: '10px', top: '13px' }} />
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
                  placeholder="Create a strong password"
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
              Create Account <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#8A8A93' }}>
            Already an Atelier Patron?{' '}
            <Link href="/account/login" style={{ color: '#ECC86A', fontWeight: 600 }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

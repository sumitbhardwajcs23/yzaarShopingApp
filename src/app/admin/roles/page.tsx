'use client';

import React, { useState } from 'react';
import { ShieldCheck, Users, Lock, Key, Clock, UserCheck } from 'lucide-react';
import { AdminRole, AdminUser } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

export default function AdminRolesPage() {
  const { adminUser } = useAuth();

  const [staffList, setStaffList] = useState<AdminUser[]>([
    {
      id: 'adm_1',
      name: 'Aditya Singhania',
      email: 'aditya.director@yzaaar.com',
      role: 'super_admin',
    },
    {
      id: 'adm_2',
      name: 'Rohit Kulkarni',
      email: 'rohit.manager@yzaaar.com',
      role: 'manager',
    },
    {
      id: 'adm_3',
      name: 'Meera Sen',
      email: 'meera.inventory@yzaaar.com',
      role: 'inventory_staff',
    },
    {
      id: 'adm_4',
      name: 'Pooja Varma',
      email: 'pooja.support@yzaaar.com',
      role: 'support_staff',
    },
    {
      id: 'adm_5',
      name: 'Zubin Kapadia',
      email: 'zubin.editor@yzaaar.com',
      role: 'content_editor',
    },
  ]);

  const roleDescriptions: Record<AdminRole, string> = {
    super_admin: 'Full unrestricted governance: pricing, staff access, refunds, and financial reporting.',
    manager: 'Can approve returns, modify orders, and manage sales campaigns & coupons.',
    inventory_staff: 'Can adjust warehouse/salon stock, manage SKUs, and update dispatch physical tracking.',
    support_staff: 'Can view customer orders and resolve VIP concierge inquiries and tickets.',
    content_editor: 'Can manage homepage banners, product descriptions, and lookbook edits.',
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4AF37' }}>
          Security & Access Governance
        </span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FAF9F6', margin: '0.2rem 0 0' }}>
          Role-Based Access & Audit Logs
        </h1>
      </div>

      {/* Staff Roles Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3.5rem',
        }}
      >
        {staffList.map((staff) => (
          <div
            key={staff.id}
            style={{
              backgroundColor: '#121217',
              border: staff.role === 'super_admin' ? '1px solid #D4AF37' : '1px solid #202028',
              borderRadius: '8px',
              padding: '1.6rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(212, 175, 55, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ECC86A',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
              >
                {staff.name.charAt(0)}
              </div>
              <span className={`badge ${staff.role === 'super_admin' ? 'badge-gold' : 'badge-dark'}`}>
                {staff.role.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <h3 style={{ fontSize: '1rem', color: '#FAF9F6', margin: '0 0 0.2rem' }}>{staff.name}</h3>
            <p style={{ fontSize: '0.75rem', color: '#8A8A93', margin: '0 0 1rem' }}>{staff.email}</p>

            <div
              style={{
                backgroundColor: '#181820',
                border: '1px solid #242430',
                borderRadius: '4px',
                padding: '0.7rem',
                fontSize: '0.72rem',
                color: '#A1A1AB',
                lineHeight: 1.4,
              }}
            >
              <strong>Permissions:</strong> {roleDescriptions[staff.role]}
            </div>
          </div>
        ))}
      </div>

      {/* System Audit Trail */}
      <div
        style={{
          backgroundColor: '#121217',
          border: '1px solid #202028',
          borderRadius: '8px',
          padding: '2rem',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#FAF9F6', margin: '0 0 1.2rem' }}>
          Historical Atelier Security & Activity Trail
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {[
            {
              id: 'a1',
              actor: 'Aditya Singhania (Super Admin)',
              action: 'Catalog Initialized with 8 Haute Couture Masterpieces',
              ip: '103.21.124.9 (Mumbai Atelier)',
              time: 'October 10, 2026 · 09:30 AM',
            },
            {
              id: 'a2',
              actor: 'Razorpay Webhook (Automated Service)',
              action: 'Order #YZ-8891 payment signature verified & confirmed',
              ip: 'Razorpay Server Gateway',
              time: 'October 09, 2026 · 11:25 AM',
            },
            {
              id: 'a3',
              actor: 'Meera Sen (Inventory Staff)',
              action: 'Dispatched Consignment #YZ-8891 via Delhivery Luxury Express',
              ip: '103.21.124.9 (Mumbai Atelier)',
              time: 'October 09, 2026 · 09:30 AM',
            },
            {
              id: 'a4',
              actor: 'Rohit Kulkarni (Manager)',
              action: 'Generated B2C GST Invoice INV-8891 with CGST/SGST breakdown',
              ip: '103.21.124.9 (Mumbai Atelier)',
              time: 'October 09, 2026 · 09:20 AM',
            },
          ].map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.9rem 1.2rem',
                backgroundColor: '#16161D',
                borderLeft: '3px solid #D4AF37',
                borderRadius: '4px',
                fontSize: '0.8rem',
                gap: '0.6rem',
              }}
            >
              <div>
                <strong style={{ color: '#ECC86A' }}>{item.actor}</strong>
                <p style={{ color: '#FAF9F6', margin: '0.15rem 0 0' }}>{item.action}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ color: '#71717A', fontSize: '0.72rem', display: 'block' }}>{item.ip}</span>
                <span style={{ color: '#8A8A93', fontSize: '0.72rem' }}>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  Package,
  Plus,
  Clock,
  Shield,
  Eye,
} from 'lucide-react';
import { Order, Product, ActivityLog } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [ordRes, prodRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/products'),
        ]);
        const ordData = await ordRes.json();
        const prodData = await prodRes.json();

        if (ordData.success) setOrders(ordData.orders);
        if (prodData.success) setProducts(prodData.products);
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Compute metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const aov = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  // Find products with variants having stock <= 3
  const lowStockProducts = products.filter((p) =>
    p.variants.some((v) => v.stock > 0 && v.stock <= 3)
  );

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          status: newStatus,
          note: `Executive updated order status to ${newStatus.toUpperCase()}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? data.order : o))
        );
      }
    } catch (err) {
      console.error('Failed to patch order:', err);
    }
  };

  return (
    <div>
      {/* Page Title & Quick Actions */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          marginBottom: '2.5rem',
        }}
      >
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4AF37' }}>
            Executive Overview
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#FAF9F6', margin: '0.2rem 0 0' }}>
            Atelier Command Center
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <Link href="/admin/products/new" className="btn btn-gold" style={{ padding: '0.65rem 1.4rem', fontSize: '0.78rem', gap: '0.4rem' }}>
            <Plus size={15} /> Add New Creation
          </Link>
          <Link href="/admin/inventory" className="btn btn-outline-gold" style={{ padding: '0.65rem 1.2rem', fontSize: '0.78rem' }}>
            Audit Inventory
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        {/* Metric 1 */}
        <div
          style={{
            backgroundColor: '#121217',
            border: '1px solid #202028',
            borderRadius: '8px',
            padding: '1.6rem',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.78rem', color: '#8A8A93', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Total Gross Revenue
            </span>
            <div style={{ padding: '0.4rem', borderRadius: '4px', backgroundColor: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37' }}>
              <TrendingUp size={16} />
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: '#ECC86A' }}>
            {formatCurrency(totalRevenue)}
          </div>
          <span style={{ fontSize: '0.72rem', color: '#2ECC71', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.4rem' }}>
            +18.4% vs last cycle
          </span>
        </div>

        {/* Metric 2 */}
        <div
          style={{
            backgroundColor: '#121217',
            border: '1px solid #202028',
            borderRadius: '8px',
            padding: '1.6rem',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.78rem', color: '#8A8A93', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Total Consignments
            </span>
            <div style={{ padding: '0.4rem', borderRadius: '4px', backgroundColor: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37' }}>
              <ShoppingBag size={16} />
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: '#FAF9F6' }}>
            {totalOrdersCount}
          </div>
          <span style={{ fontSize: '0.72rem', color: '#A1A1AA', marginTop: '0.4rem', display: 'block' }}>
            Active across Razorpay & COD
          </span>
        </div>

        {/* Metric 3 */}
        <div
          style={{
            backgroundColor: '#121217',
            border: '1px solid #202028',
            borderRadius: '8px',
            padding: '1.6rem',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.78rem', color: '#8A8A93', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Average Order Value
            </span>
            <div style={{ padding: '0.4rem', borderRadius: '4px', backgroundColor: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37' }}>
              <DollarSign size={16} />
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: '#FAF9F6' }}>
            {formatCurrency(aov)}
          </div>
          <span style={{ fontSize: '0.72rem', color: '#2ECC71', marginTop: '0.4rem', display: 'block' }}>
            Top tier luxury benchmark
          </span>
        </div>

        {/* Metric 4 */}
        <div
          style={{
            backgroundColor: '#121217',
            border: '1px solid #202028',
            borderRadius: '8px',
            padding: '1.6rem',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.78rem', color: '#8A8A93', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Low Stock Alerts
            </span>
            <div style={{ padding: '0.4rem', borderRadius: '4px', backgroundColor: 'rgba(224, 82, 82, 0.1)', color: '#E05252' }}>
              <AlertTriangle size={16} />
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: '#E05252' }}>
            {lowStockProducts.length}
          </div>
          <Link href="/admin/inventory" style={{ fontSize: '0.72rem', color: '#ECC86A', textDecoration: 'underline', marginTop: '0.4rem', display: 'block' }}>
            Review Atelier stock shortages &rarr;
          </Link>
        </div>
      </div>

      {/* Recent Orders Pipeline Section */}
      <div
        style={{
          backgroundColor: '#121217',
          border: '1px solid #202028',
          borderRadius: '8px',
          padding: '2rem',
          marginBottom: '3rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#FAF9F6', margin: 0 }}>
              Recent Consignments Pipeline
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#8A8A93', margin: '0.2rem 0 0' }}>
              Real-time order statuses with instant status adjustment
            </p>
          </div>
          <Link href="/admin/orders" className="btn btn-outline-gold" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
            View All Consignments
          </Link>
        </div>

        {/* Orders Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', color: '#D8D8DF' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #242432', color: '#8A8A94', textAlign: 'left' }}>
                <th style={{ padding: '0.8rem 1rem' }}>Consignment #</th>
                <th style={{ padding: '0.8rem 1rem' }}>Patron</th>
                <th style={{ padding: '0.8rem 1rem' }}>Items Summary</th>
                <th style={{ padding: '0.8rem 1rem' }}>Total</th>
                <th style={{ padding: '0.8rem 1rem' }}>Payment</th>
                <th style={{ padding: '0.8rem 1rem' }}>Status</th>
                <th style={{ padding: '0.8rem 1rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((o) => (
                <tr key={o.id} style={{ borderBottom: '1px solid #1C1C24' }}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: '#ECC86A' }}>
                    #{o.orderNumber}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 600, color: '#FAF9F6' }}>{o.customerName}</div>
                    <div style={{ fontSize: '0.72rem', color: '#71717A' }}>{o.customerPhone}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ color: '#FAF9F6' }}>
                      {o.items[0]?.title} {o.items.length > 1 && `+ ${o.items.length - 1} more`}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 700, color: '#FAF9F6' }}>
                    {formatCurrency(o.total)}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span className="badge badge-gold" style={{ textTransform: 'uppercase' }}>
                      {o.paymentMethod}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span
                      className={`badge ${
                        o.orderStatus === 'delivered'
                          ? 'badge-success'
                          : o.orderStatus === 'cancelled'
                          ? 'badge-danger'
                          : 'badge-gold'
                      }`}
                    >
                      {o.orderStatus}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <select
                      value={o.orderStatus}
                      onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                      style={{
                        backgroundColor: '#1C1C26',
                        border: '1px solid #333342',
                        borderRadius: '4px',
                        padding: '0.4rem 0.6rem',
                        fontSize: '0.75rem',
                        color: '#FAF9F6',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="placed">Placed</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="packed">Packed</option>
                      <option value="shipped">Shipped</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Grid: Top Products & Activity Log */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="admin-bottom-grid">
        {/* Top Creations */}
        <div
          style={{
            backgroundColor: '#121217',
            border: '1px solid #202028',
            borderRadius: '8px',
            padding: '1.8rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#FAF9F6', margin: 0 }}>
              Top Atelier Creations
            </h3>
            <Link href="/admin/products" style={{ fontSize: '0.75rem', color: '#ECC86A' }}>
              View Catalog
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {products.slice(0, 4).map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.9rem',
                  padding: '0.6rem',
                  borderRadius: '6px',
                  backgroundColor: '#17171F',
                }}
              >
                <img
                  src={p.images[0]?.url}
                  alt={p.title}
                  style={{ width: '42px', height: '52px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '0.85rem', color: '#FAF9F6', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.title}
                  </h4>
                  <span style={{ fontSize: '0.72rem', color: '#8A8A93' }}>{p.category}</span>
                </div>
                <span style={{ fontWeight: 700, color: '#ECC86A', fontSize: '0.9rem' }}>
                  {formatCurrency(p.basePrice)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Activity Logs */}
        <div
          style={{
            backgroundColor: '#121217',
            border: '1px solid #202028',
            borderRadius: '8px',
            padding: '1.8rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#FAF9F6', margin: 0 }}>
              Administrative Audit Logs
            </h3>
            <Link href="/admin/roles" style={{ fontSize: '0.75rem', color: '#ECC86A' }}>
              Full Log
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {[
              {
                admin: 'Super Admin',
                action: 'Updated Velvet Dinner Jacket stock level',
                time: '12 minutes ago',
              },
              {
                admin: 'System',
                action: 'Payment verified via Razorpay webhook (#YZ-8891)',
                time: '1 hour ago',
              },
              {
                admin: 'Inventory Staff',
                action: 'Added new variant 42R / Sovereign Black',
                time: '3 hours ago',
              },
              {
                admin: 'Manager',
                action: 'Issued coupon code YZAAR10',
                time: 'Yesterday',
              },
            ].map((log, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.7rem 0.9rem',
                  borderRadius: '6px',
                  backgroundColor: '#17171F',
                  borderLeft: '3px solid #D4AF37',
                  fontSize: '0.8rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ECC86A', fontWeight: 600 }}>
                  <span>{log.admin}</span>
                  <span style={{ color: '#71717A', fontWeight: 400, fontSize: '0.72rem' }}>{log.time}</span>
                </div>
                <p style={{ color: '#D8D8DF', margin: '0.2rem 0 0' }}>{log.action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

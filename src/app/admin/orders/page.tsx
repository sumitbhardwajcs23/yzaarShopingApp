'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Truck, CheckCircle2, Clock, FileText, Search } from 'lucide-react';
import { Order, OrderStatus } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          status: newStatus,
          note: `Fulfilment team updated consignment status to ${newStatus.toUpperCase()}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
      }
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const filtered = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4AF37' }}>
            Fulfilment Logistics
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FAF9F6', margin: '0.2rem 0 0' }}>
            Consignment Pipeline ({orders.length})
          </h1>
        </div>

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {['all', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                border: statusFilter === st ? '1px solid #D4AF37' : '1px solid #282834',
                backgroundColor: statusFilter === st ? 'var(--gold-gradient)' : '#141419',
                color: statusFilter === st ? '#0A0A0B' : '#A1A1AA',
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List Table */}
      {loading ? (
        <div style={{ padding: '4rem 0', color: '#D4AF37', textAlign: 'center' }}>
          Loading consignments...
        </div>
      ) : (
        <div
          style={{
            backgroundColor: '#121217',
            border: '1px solid #202028',
            borderRadius: '8px',
            overflowX: 'auto',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', color: '#D8D8DF' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #242432', color: '#8A8A94', textAlign: 'left', backgroundColor: '#0E0E13' }}>
                <th style={{ padding: '1rem' }}>Order #</th>
                <th style={{ padding: '1rem' }}>Patron Destination</th>
                <th style={{ padding: '1rem' }}>Items Ordered</th>
                <th style={{ padding: '1rem' }}>Financials</th>
                <th style={{ padding: '1rem' }}>Payment Gateway</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Fulfilment Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} style={{ borderBottom: '1px solid #1C1C24' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#ECC86A' }}>#{o.orderNumber}</div>
                    <span style={{ fontSize: '0.72rem', color: '#71717A' }}>{formatDate(o.createdAt)}</span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 600, color: '#FAF9F6' }}>{o.customerName}</div>
                    <div style={{ fontSize: '0.72rem', color: '#8A8A93' }}>
                      {o.shippingAddress.city}, PIN {o.shippingAddress.pincode}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {o.items.map((it) => (
                      <div key={it.id} style={{ fontSize: '0.78rem', color: '#FAF9F6' }}>
                        {it.title} (Size: {it.size}, Qty: {it.quantity})
                      </div>
                    ))}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 700, color: '#FAF9F6' }}>
                    {formatCurrency(o.total)}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span className="badge badge-gold" style={{ textTransform: 'uppercase' }}>
                      {o.paymentMethod} ({o.paymentStatus})
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
                      {o.orderStatus.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <select
                      value={o.orderStatus}
                      onChange={(e) => handleUpdateStatus(o.id, e.target.value as OrderStatus)}
                      style={{
                        backgroundColor: '#181822',
                        border: '1px solid #333342',
                        borderRadius: '4px',
                        padding: '0.45rem 0.65rem',
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
                      <option value="returned">Returned</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

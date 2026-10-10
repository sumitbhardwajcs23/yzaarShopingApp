'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Plus, Trash2, Edit, Search, AlertCircle, Eye } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you wish to delete "${title}" from the atelier catalog?`)) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4AF37' }}>
            Catalog Management
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FAF9F6', margin: '0.2rem 0 0' }}>
            Haute Couture Catalog ({products.length})
          </h1>
        </div>

        <Link href="/admin/products/new" className="btn btn-gold" style={{ fontSize: '0.78rem', padding: '0.7rem 1.4rem', gap: '0.4rem' }}>
          <Plus size={15} /> Add New Creation
        </Link>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '1.8rem', maxWidth: '400px' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search products by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#14141A',
              border: '1px solid #282834',
              borderRadius: '6px',
              padding: '0.65rem 0.8rem 0.65rem 2.2rem',
              fontSize: '0.82rem',
              color: '#FAF9F6',
            }}
          />
          <Search size={16} color="#8A8A93" style={{ position: 'absolute', left: '10px', top: '12px' }} />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ padding: '4rem 0', color: '#D4AF37', textAlign: 'center' }}>
          Loading products...
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
                <th style={{ padding: '1rem' }}>Creation</th>
                <th style={{ padding: '1rem' }}>Category</th>
                <th style={{ padding: '1rem' }}>Base Price</th>
                <th style={{ padding: '1rem' }}>Variants</th>
                <th style={{ padding: '1rem' }}>Total Stock</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const totalStock = p.variants.reduce((sum, v) => sum + v.stock, 0);
                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid #1C1C24' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <img
                          src={p.images[0]?.url}
                          alt={p.title}
                          style={{ width: '44px', height: '54px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, color: '#FAF9F6' }}>{p.title}</div>
                          <span style={{ fontSize: '0.72rem', color: '#71717A' }}>SKU: {p.variants[0]?.sku || 'N/A'}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className="badge badge-gold">{p.category}</span>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 700, color: '#ECC86A' }}>
                      {formatCurrency(p.basePrice)}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {p.variants.length} Sizes/Colors
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ color: totalStock <= 5 ? '#E05252' : '#2ECC71', fontWeight: 600 }}>
                        {totalStock} units
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className="badge badge-success">ACTIVE</span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
                        <Link
                          href={`/shop/${p.slug}`}
                          target="_blank"
                          style={{ padding: '0.4rem', color: '#8A8A93' }}
                          title="View on Storefront"
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          style={{ padding: '0.4rem', color: '#E05252' }}
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

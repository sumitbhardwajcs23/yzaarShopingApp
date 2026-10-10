'use client';

import React, { useState, useEffect } from 'react';
import { Boxes, Plus, Minus, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error('Failed to load inventory:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleAdjustStock = async (productId: string, variantId: string, delta: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const updatedVariants = product.variants.map((v) => {
      if (v.id === variantId) {
        return {
          ...v,
          stock: Math.max(0, v.stock + delta),
        };
      }
      return v;
    });

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variants: updatedVariants }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === productId ? data.product : p))
        );
      }
    } catch (err) {
      console.error('Failed to update stock:', err);
    }
  };

  const totalInventoryUnits = products.reduce(
    (sum, p) => sum + p.variants.reduce((vSum, v) => vSum + v.stock, 0),
    0
  );

  const totalInventoryValuation = products.reduce(
    (sum, p) => sum + p.variants.reduce((vSum, v) => vSum + v.stock * v.price, 0),
    0
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4AF37' }}>
            Atelier Inventory & Logistics
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FAF9F6', margin: '0.2rem 0 0' }}>
            Real-Time Stock Audit
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.7rem', color: '#8A8A93', textTransform: 'uppercase' }}>Atelier Physical Units</span>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#FAF9F6' }}>{totalInventoryUnits} pieces</div>
          </div>
          <div style={{ width: '1px', height: '30px', backgroundColor: '#333' }} />
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.7rem', color: '#8A8A93', textTransform: 'uppercase' }}>Total Valuation</span>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#ECC86A' }}>
              {formatCurrency(totalInventoryValuation)}
            </div>
          </div>
        </div>
      </div>

      {/* Product Variant Stock Table */}
      {loading ? (
        <div style={{ padding: '4rem 0', color: '#D4AF37', textAlign: 'center' }}>
          Loading inventory status...
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                backgroundColor: '#121217',
                border: '1px solid #202028',
                borderRadius: '8px',
                padding: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                <img
                  src={p.images[0]?.url}
                  alt={p.title}
                  style={{ width: '42px', height: '52px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#FAF9F6', margin: 0 }}>
                    {p.title}
                  </h3>
                  <span style={{ fontSize: '0.72rem', color: '#8A8A93' }}>{p.category}</span>
                </div>
              </div>

              {/* Variant Rows */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {p.variants.map((v) => {
                  const isLow = v.stock > 0 && v.stock <= 3;
                  const isOut = v.stock === 0;

                  return (
                    <div
                      key={v.id}
                      style={{
                        backgroundColor: '#171720',
                        border: isOut ? '1px solid #E05252' : isLow ? '1px solid #D4AF37' : '1px solid #242430',
                        borderRadius: '6px',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, color: '#FAF9F6', fontSize: '0.85rem' }}>
                          Size: {v.size} ({v.color})
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#8A8A93' }}>SKU: {v.sku}</span>
                        <div style={{ marginTop: '0.2rem' }}>
                          {isOut ? (
                            <span style={{ fontSize: '0.7rem', color: '#E05252', fontWeight: 700 }}>
                              OUT OF STOCK
                            </span>
                          ) : isLow ? (
                            <span style={{ fontSize: '0.7rem', color: '#ECC86A', fontWeight: 600 }}>
                              LOW STOCK ({v.stock} remaining)
                            </span>
                          ) : (
                            <span style={{ fontSize: '0.7rem', color: '#2ECC71' }}>
                              Healthy ({v.stock} in salon)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Adjust buttons */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          backgroundColor: '#111116',
                          border: '1px solid #2A2A36',
                          borderRadius: '4px',
                          padding: '0.2rem',
                        }}
                      >
                        <button
                          onClick={() => handleAdjustStock(p.id, v.id, -1)}
                          style={{ padding: '0.3rem 0.5rem', color: '#A1A1AA' }}
                          title="Reduce Stock"
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#ECC86A', minWidth: '22px', textAlign: 'center' }}>
                          {v.stock}
                        </span>
                        <button
                          onClick={() => handleAdjustStock(p.id, v.id, 1)}
                          style={{ padding: '0.3rem 0.5rem', color: '#A1A1AA' }}
                          title="Add Stock"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

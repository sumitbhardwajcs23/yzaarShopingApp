'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Check, Sparkles } from 'lucide-react';
import { ProductVariant } from '@/lib/types';
import { slugify, generateId } from '@/lib/utils';

export default function AdminNewProductPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Haute Couture & Evening');
  const [subCategory, setSubCategory] = useState('');
  const [basePrice, setBasePrice] = useState<number>(35000);
  const [compareAtPrice, setCompareAtPrice] = useState<number>(42000);
  const [fabricCare, setFabricCare] = useState('100% Pure Italian Silk. Specialist Dry Clean Only.');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80'
  );
  const [features, setFeatures] = useState<string[]>([
    'Hand-canvassed construction with floating chest piece',
    'Finished with 24K gold filament accents',
    'Cupro breathable silk lining',
  ]);
  const [newFeatureText, setNewFeatureText] = useState('');

  // Variants state
  const [variants, setVariants] = useState<ProductVariant[]>([
    {
      id: generateId('var'),
      name: '38R / Sovereign Gold & Black',
      size: '38R',
      color: 'Sovereign Gold & Black',
      colorHex: '#D4AF37',
      sku: 'YZ-NEW-38',
      price: 35000,
      stock: 5,
    },
    {
      id: generateId('var'),
      name: '40R / Sovereign Gold & Black',
      size: '40R',
      color: 'Sovereign Gold & Black',
      colorHex: '#D4AF37',
      sku: 'YZ-NEW-40',
      price: 35000,
      stock: 8,
    },
  ]);

  const [saving, setSaving] = useState(false);

  const handleAddFeature = () => {
    if (newFeatureText.trim()) {
      setFeatures([...features, newFeatureText.trim()]);
      setNewFeatureText('');
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const handleAddVariant = () => {
    const newVar: ProductVariant = {
      id: generateId('var'),
      name: '42R / Sovereign Gold & Black',
      size: '42R',
      color: 'Sovereign Gold & Black',
      colorHex: '#D4AF37',
      sku: `YZ-NEW-${Math.floor(100 + Math.random() * 900)}`,
      price: basePrice,
      stock: 5,
    };
    setVariants([...variants, newVar]);
  };

  const handleRemoveVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setSaving(true);
    try {
      const slug = slugify(title);
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          tagline,
          description,
          category,
          subCategory,
          basePrice,
          compareAtPrice,
          fabricCare,
          features,
          images: [
            {
              id: 'img_main',
              url: imageUrl,
              alt: title,
              isPrimary: true,
            },
          ],
          variants,
          isFeatured: true,
          isNewArrival: true,
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push('/admin/products');
      }
    } catch (err) {
      console.error('Save product error:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '860px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/admin/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#8A8A93', marginBottom: '0.6rem' }}>
          <ArrowLeft size={14} /> Back to Catalog
        </Link>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FAF9F6', margin: 0 }}>
          Create New Atelier Creation
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Section 1: Basic Details */}
        <div style={{ backgroundColor: '#121217', border: '1px solid #202028', borderRadius: '8px', padding: '1.8rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D4AF37', margin: '0 0 1.2rem' }}>
            1. Title & Narrative
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                Garment Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. The Sovereign Silk Velvet Tuxedo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                Editorial Tagline
              </label>
              <input
                type="text"
                placeholder="e.g. Handcrafted Italian silk velvet with 24K gold braided peak lapels."
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                  Primary Discipline / Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#181822',
                    border: '1px solid #2B2B38',
                    borderRadius: '4px',
                    padding: '0.65rem 0.8rem',
                    fontSize: '0.85rem',
                    color: '#FAF9F6',
                  }}
                >
                  <option value="Haute Couture & Evening">Haute Couture & Evening</option>
                  <option value="Bespoke Tuxedos & Suits">Bespoke Tuxedos & Suits</option>
                  <option value="Women's Atelier">Women&apos;s Atelier</option>
                  <option value="Men's Luxury">Men&apos;s Luxury</option>
                  <option value="Handcrafted Leather">Handcrafted Leather</option>
                  <option value="Jewelry & Silk Accents">Jewelry & Silk Accents</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                  Sub-category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Velvet Tuxedos"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
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
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                Atelier Narrative & Description
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe the fabric origin, weaving technique, and sartorial silhouette..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
          </div>
        </div>

        {/* Section 2: Pricing & High-Res Image */}
        <div style={{ backgroundColor: '#121217', border: '1px solid #202028', borderRadius: '8px', padding: '1.8rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D4AF37', margin: '0 0 1.2rem' }}>
            2. Pricing & Visual Imagery
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
                Base Price (₹ INR)
              </label>
              <input
                type="number"
                required
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
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
                Compare At Price (₹ INR Strike-through)
              </label>
              <input
                type="number"
                value={compareAtPrice}
                onChange={(e) => setCompareAtPrice(Number(e.target.value))}
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
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: '#8A8A93', display: 'block', marginBottom: '0.3rem' }}>
              Primary Image URL (High Definition Unsplash / Atelier shoot)
            </label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
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
            {imageUrl && (
              <div style={{ marginTop: '0.8rem', width: '90px', height: '110px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #333' }}>
                <img src={imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Variants & SKUs */}
        <div style={{ backgroundColor: '#121217', border: '1px solid #202028', borderRadius: '8px', padding: '1.8rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D4AF37', margin: 0 }}>
              3. Sizing & Color Variants ({variants.length})
            </h3>
            <button
              type="button"
              onClick={handleAddVariant}
              className="btn btn-outline-gold"
              style={{ fontSize: '0.72rem', padding: '0.4rem 0.8rem', gap: '0.3rem' }}
            >
              <Plus size={13} /> Add Variant Row
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {variants.map((v, i) => (
              <div
                key={v.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 140px 120px 100px 80px 40px',
                  gap: '0.8rem',
                  alignItems: 'center',
                  backgroundColor: '#181822',
                  padding: '0.8rem',
                  borderRadius: '6px',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.65rem', color: '#8A8A93', display: 'block' }}>Size</span>
                  <input
                    type="text"
                    value={v.size}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[i].size = e.target.value;
                      setVariants(updated);
                    }}
                    style={{ width: '100%', backgroundColor: '#111', border: '1px solid #333', padding: '0.3rem 0.5rem', color: '#FFF', fontSize: '0.78rem' }}
                  />
                </div>

                <div>
                  <span style={{ fontSize: '0.65rem', color: '#8A8A93', display: 'block' }}>Color</span>
                  <input
                    type="text"
                    value={v.color}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[i].color = e.target.value;
                      setVariants(updated);
                    }}
                    style={{ width: '100%', backgroundColor: '#111', border: '1px solid #333', padding: '0.3rem 0.5rem', color: '#FFF', fontSize: '0.78rem' }}
                  />
                </div>

                <div>
                  <span style={{ fontSize: '0.65rem', color: '#8A8A93', display: 'block' }}>SKU</span>
                  <input
                    type="text"
                    value={v.sku}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[i].sku = e.target.value;
                      setVariants(updated);
                    }}
                    style={{ width: '100%', backgroundColor: '#111', border: '1px solid #333', padding: '0.3rem 0.5rem', color: '#FFF', fontSize: '0.78rem' }}
                  />
                </div>

                <div>
                  <span style={{ fontSize: '0.65rem', color: '#8A8A93', display: 'block' }}>Price (₹)</span>
                  <input
                    type="number"
                    value={v.price}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[i].price = Number(e.target.value);
                      setVariants(updated);
                    }}
                    style={{ width: '100%', backgroundColor: '#111', border: '1px solid #333', padding: '0.3rem 0.5rem', color: '#FFF', fontSize: '0.78rem' }}
                  />
                </div>

                <div>
                  <span style={{ fontSize: '0.65rem', color: '#8A8A93', display: 'block' }}>Stock</span>
                  <input
                    type="number"
                    value={v.stock}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[i].stock = Number(e.target.value);
                      setVariants(updated);
                    }}
                    style={{ width: '100%', backgroundColor: '#111', border: '1px solid #333', padding: '0.3rem 0.5rem', color: '#FFF', fontSize: '0.78rem' }}
                  />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => handleRemoveVariant(v.id)}
                    style={{ color: '#E05252', padding: '0.4rem', marginTop: '14px' }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <Link href="/admin/products" className="btn btn-ghost" style={{ fontSize: '0.8rem' }}>
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-gold"
            style={{ padding: '0.9rem 2.2rem', fontSize: '0.82rem' }}
          >
            {saving ? 'Publishing to Atelier...' : 'Publish Masterpiece to Storefront'}
          </button>
        </div>
      </form>
    </div>
  );
}

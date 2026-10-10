'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, SlidersHorizontal, ArrowUpDown, X, RotateCcw } from 'lucide-react';
import { Product, Category } from '@/lib/types';
import ProductCard from './ProductCard';
import { formatCurrency } from '@/lib/utils';

interface ShopCatalogClientProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function ShopCatalogClient({ initialProducts, categories }: ShopCatalogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL Query Params state
  const initialCat = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialSort = searchParams.get('sort') || 'popular';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedSort, setSelectedSort] = useState<string>(initialSort);
  const [maxPrice, setMaxPrice] = useState<number>(80000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  // Sync state if URL searchParams change
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
    setSearchQuery(searchParams.get('search') || '');
    setSelectedSort(searchParams.get('sort') || 'popular');
  }, [searchParams]);

  // Filtered & sorted products calculation
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      const catLower = selectedCategory.toLowerCase();
      list = list.filter((p) => {
        const catObj = categories.find((c) => c.slug === selectedCategory);
        const nameToMatch = catObj ? catObj.name.toLowerCase() : catLower;
        return (
          p.category.toLowerCase().includes(catLower) ||
          p.category.toLowerCase().includes(nameToMatch) ||
          p.subCategory?.toLowerCase().includes(catLower) ||
          p.tags.some((t) => t.toLowerCase().includes(catLower))
        );
      });
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Max price filter
    list = list.filter((p) => p.basePrice <= maxPrice);

    // In stock filter
    if (inStockOnly) {
      list = list.filter((p) => p.variants.some((v) => v.stock > 0));
    }

    // Rating filter
    if (minRating > 0) {
      list = list.filter((p) => p.rating >= minRating);
    }

    // Sort order
    switch (selectedSort) {
      case 'price-asc':
        list.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-desc':
        list.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
      default:
        list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
    }

    return list;
  }, [initialProducts, categories, selectedCategory, searchQuery, selectedSort, maxPrice, inStockOnly, minRating]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedSort('popular');
    setMaxPrice(80000);
    setInStockOnly(false);
    setMinRating(0);
    router.push('/shop');
  };

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      router.push('/shop');
    } else {
      router.push(`/shop?category=${slug}`);
    }
  };

  return (
    <div style={{ padding: '3rem 0 6rem', backgroundColor: '#0A0A0C', minHeight: '80vh' }}>
      <div className="container">
        {/* Breadcrumb & Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.78rem', color: '#8A8A93', marginBottom: '0.8rem' }}>
            <span onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>Home</span>
            <span>/</span>
            <span style={{ color: '#D4AF37' }}>Atelier Catalog</span>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span style={{ color: '#FAF9F6', textTransform: 'capitalize' }}>
                  {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                </span>
              </>
            )}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                  fontWeight: 600,
                  color: '#FAF9F6',
                  margin: 0,
                }}
              >
                {selectedCategory === 'all'
                  ? 'The Complete Haute Couture Collection'
                  : categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
              </h1>
              <p style={{ fontSize: '0.85rem', color: '#8A8A96', marginTop: '0.3rem' }}>
                Showing {filteredProducts.length} handcrafted creations
              </p>
            </div>

            {/* Mobile Filter Toggle & Sort selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="btn btn-dark mobile-filter-btn"
                style={{
                  padding: '0.65rem 1.1rem',
                  fontSize: '0.75rem',
                }}
              >
                <Filter size={15} color="#D4AF37" /> Filters
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#8A8A93' }}>Sort by:</span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  style={{
                    backgroundColor: '#141419',
                    border: '1px solid #2B2B36',
                    borderRadius: '4px',
                    padding: '0.55rem 0.9rem',
                    fontSize: '0.82rem',
                    color: '#FAF9F6',
                    cursor: 'pointer',
                  }}
                >
                  <option value="popular">Popularity & Icons</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Patron Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2.5rem' }} className="shop-layout">
          {/* Sidebar Filters */}
          <aside
            style={{
              backgroundColor: '#111116',
              border: '1px solid #202028',
              borderRadius: '8px',
              padding: '1.6rem',
              height: 'fit-content',
            }}
            className="desktop-filter-sidebar"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.6rem', borderBottom: '1px solid #202028', paddingBottom: '0.8rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FAF9F6', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <SlidersHorizontal size={16} color="#D4AF37" /> Refine Catalog
              </h3>
              <button
                onClick={handleResetFilters}
                style={{ fontSize: '0.72rem', color: '#ECC86A', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                title="Reset all filters"
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>

            {/* Categories */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4AF37', marginBottom: '0.9rem' }}>
                Categories
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <button
                  onClick={() => handleCategoryChange('all')}
                  style={{
                    textAlign: 'left',
                    fontSize: '0.82rem',
                    padding: '0.35rem 0.6rem',
                    borderRadius: '4px',
                    color: selectedCategory === 'all' ? '#FAF9F6' : '#8A8A96',
                    backgroundColor: selectedCategory === 'all' ? '#1C1C24' : 'transparent',
                    fontWeight: selectedCategory === 'all' ? 600 : 400,
                    borderLeft: selectedCategory === 'all' ? '2px solid #D4AF37' : 'none',
                  }}
                >
                  All Creations
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleCategoryChange(c.slug)}
                    style={{
                      textAlign: 'left',
                      fontSize: '0.82rem',
                      padding: '0.35rem 0.6rem',
                      borderRadius: '4px',
                      color: selectedCategory === c.slug ? '#FAF9F6' : '#8A8A96',
                      backgroundColor: selectedCategory === c.slug ? '#1C1C24' : 'transparent',
                      fontWeight: selectedCategory === c.slug ? 600 : 400,
                      borderLeft: selectedCategory === c.slug ? '2px solid #D4AF37' : 'none',
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div style={{ marginBottom: '2rem', borderTop: '1px solid #1E1E26', paddingTop: '1.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
                <h4 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4AF37', margin: 0 }}>
                  Price Range
                </h4>
                <span style={{ fontSize: '0.8rem', color: '#ECC86A', fontWeight: 600 }}>
                  Up to {formatCurrency(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="80000"
                step="2500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#D4AF37', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#71717A', marginTop: '0.4rem' }}>
                <span>₹5,000</span>
                <span>₹80,000+</span>
              </div>
            </div>

            {/* Availability */}
            <div style={{ marginBottom: '1.8rem', borderTop: '1px solid #1E1E26', paddingTop: '1.4rem' }}>
              <h4 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4AF37', marginBottom: '0.8rem' }}>
                Availability
              </h4>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.82rem', color: '#B0B0BA', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  style={{ accentColor: '#D4AF37', cursor: 'pointer' }}
                />
                In Atelier Stock Only
              </label>
            </div>

            {/* Rating Filter */}
            <div style={{ borderTop: '1px solid #1E1E26', paddingTop: '1.4rem' }}>
              <h4 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4AF37', marginBottom: '0.8rem' }}>
                Minimum Rating
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {[
                  { label: 'All Ratings', value: 0 },
                  { label: '4.5 ★ & Above', value: 4.5 },
                  { label: '4.8 ★ & Above (Icons)', value: 4.8 },
                ].map((item) => (
                  <label
                    key={item.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      fontSize: '0.82rem',
                      color: minRating === item.value ? '#FAF9F6' : '#8A8A96',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="ratingFilter"
                      checked={minRating === item.value}
                      onChange={() => setMinRating(item.value)}
                      style={{ accentColor: '#D4AF37' }}
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div>
            {/* Active Filter Chips */}
            {(selectedCategory !== 'all' || searchQuery || maxPrice < 80000 || inStockOnly || minRating > 0) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#8A8A93' }}>Active:</span>
                {selectedCategory !== 'all' && (
                  <span
                    style={{
                      backgroundColor: '#1E1E28',
                      border: '1px solid #D4AF37',
                      color: '#ECC86A',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => handleCategoryChange('all')} />
                  </span>
                )}
                {searchQuery && (
                  <span
                    style={{
                      backgroundColor: '#1E1E28',
                      border: '1px solid #D4AF37',
                      color: '#ECC86A',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    Query: &quot;{searchQuery}&quot;
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')} />
                  </span>
                )}
                {maxPrice < 80000 && (
                  <span
                    style={{
                      backgroundColor: '#1E1E28',
                      border: '1px solid #D4AF37',
                      color: '#ECC86A',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    &le; {formatCurrency(maxPrice)}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => setMaxPrice(80000)} />
                  </span>
                )}
                {inStockOnly && (
                  <span
                    style={{
                      backgroundColor: '#1E1E28',
                      border: '1px solid #D4AF37',
                      color: '#ECC86A',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    In Stock Only
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => setInStockOnly(false)} />
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  style={{ fontSize: '0.72rem', color: '#8A8A96', textDecoration: 'underline', marginLeft: '0.5rem' }}
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Empty state */}
            {filteredProducts.length === 0 ? (
              <div
                style={{
                  backgroundColor: '#111116',
                  border: '1px solid #202028',
                  borderRadius: '8px',
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.2rem',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D4AF37',
                  }}
                >
                  <Filter size={24} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FAF9F6', margin: 0 }}>
                  No Atelier Pieces Matched Your Criteria
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#8A8A93', maxWidth: '420px', margin: 0 }}>
                  Try relaxing your price filters or browsing another category discipline.
                </p>
                <button onClick={handleResetFilters} className="btn btn-gold" style={{ fontSize: '0.78rem' }}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className="shop-product-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '1.8rem',
                }}
              >
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {mobileFiltersOpen && (
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
            onClick={() => setMobileFiltersOpen(false)}
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
              width: '320px',
              maxWidth: '85vw',
              height: '100%',
              backgroundColor: '#111116',
              borderRight: '1px solid rgba(212, 175, 55, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '1.8rem 1.4rem',
              zIndex: 10,
              boxShadow: '10px 0 30px rgba(0,0,0,0.8)',
              overflowY: 'auto',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.8rem', borderBottom: '1px solid #202028', paddingBottom: '0.8rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FAF9F6', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <SlidersHorizontal size={16} color="#D4AF37" /> Refine Catalog
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  style={{ color: '#FAF9F6', padding: '0.4rem' }}
                  aria-label="Close filters"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Categories */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4AF37', marginBottom: '0.9rem' }}>
                  Categories
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <button
                    onClick={() => { handleCategoryChange('all'); setMobileFiltersOpen(false); }}
                    style={{
                      textAlign: 'left',
                      fontSize: '0.85rem',
                      padding: '0.45rem 0.6rem',
                      borderRadius: '4px',
                      color: selectedCategory === 'all' ? '#FAF9F6' : '#8A8A96',
                      backgroundColor: selectedCategory === 'all' ? '#1C1C24' : 'transparent',
                      fontWeight: selectedCategory === 'all' ? 600 : 400,
                      borderLeft: selectedCategory === 'all' ? '2px solid #D4AF37' : 'none',
                    }}
                  >
                    All Creations
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { handleCategoryChange(c.slug); setMobileFiltersOpen(false); }}
                      style={{
                        textAlign: 'left',
                        fontSize: '0.85rem',
                        padding: '0.45rem 0.6rem',
                        borderRadius: '4px',
                        color: selectedCategory === c.slug ? '#FAF9F6' : '#8A8A96',
                        backgroundColor: selectedCategory === c.slug ? '#1C1C24' : 'transparent',
                        fontWeight: selectedCategory === c.slug ? 600 : 400,
                        borderLeft: selectedCategory === c.slug ? '2px solid #D4AF37' : 'none',
                      }}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <h4 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#D4AF37', margin: 0 }}>
                    Max Price
                  </h4>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ECC86A' }}>
                    {formatCurrency(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="80000"
                  step="2500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#D4AF37', cursor: 'pointer' }}
                />
              </div>

              {/* In-Stock Toggle */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    style={{ accentColor: '#D4AF37', width: '16px', height: '16px' }}
                  />
                  <span style={{ fontSize: '0.85rem', color: '#FAF9F6' }}>In Stock Only</span>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', borderTop: '1px solid #202028', paddingTop: '1.2rem', marginTop: '1rem' }}>
              <button
                onClick={() => { handleResetFilters(); setMobileFiltersOpen(false); }}
                className="btn btn-ghost"
                style={{ flex: 1, fontSize: '0.75rem' }}
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="btn btn-gold"
                style={{ flex: 1, fontSize: '0.75rem' }}
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

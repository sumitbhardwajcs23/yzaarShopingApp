import React, { Suspense } from 'react';
import { db } from '@/lib/db';
import ShopCatalogClient from '@/components/storefront/ShopCatalogClient';

export const dynamic = 'force-dynamic';

export default function ShopPage() {
  const products = db.getProducts();
  const categories = db.getCategories();

  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37' }}>
          Loading Atelier Collection...
        </div>
      }
    >
      <ShopCatalogClient initialProducts={products} categories={categories} />
    </Suspense>
  );
}

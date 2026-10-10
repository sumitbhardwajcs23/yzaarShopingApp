import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { db } from '@/lib/db';
import ProductDetailClient from '@/components/storefront/ProductDetailClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = db.getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Creations Not Found — Yzaaar Haute Couture',
    };
  }

  return {
    title: `${product.title} — Yzaaar Atelier`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.title} | Yzaaar Haute Couture`,
      description: product.description.slice(0, 160),
      images: [
        {
          url: product.images[0]?.url || '',
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = db.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Related products from same category
  const allProducts = db.getProducts();
  const relatedProducts = allProducts.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.subCategory === product.subCategory)
  );

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Product } from '@/lib/types';
import { generateId, slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const sort = searchParams.get('sort') || undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const inStockOnly = searchParams.get('inStockOnly') === 'true';

    const products = db.getProducts({
      category,
      search,
      sort,
      minPrice,
      maxPrice,
      inStockOnly,
    });

    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const title = body.title || 'Untitled Haute Couture Piece';
    const slug = body.slug || slugify(title) + '-' + Math.floor(Math.random() * 1000);

    const newProduct: Product = {
      id: generateId('prod'),
      title,
      slug,
      tagline: body.tagline || '',
      description: body.description || '',
      features: body.features || [],
      fabricCare: body.fabricCare || 'Specialist dry clean only.',
      category: body.category || 'Haute Couture & Evening',
      subCategory: body.subCategory || '',
      tags: body.tags || ['Luxury', 'Couture'],
      basePrice: Number(body.basePrice) || 25000,
      compareAtPrice: body.compareAtPrice ? Number(body.compareAtPrice) : undefined,
      images: body.images?.length
        ? body.images
        : [
            {
              id: 'img_default',
              url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80',
              alt: title,
              isPrimary: true,
            },
          ],
      variants: body.variants?.length
        ? body.variants
        : [
            {
              id: generateId('var'),
              name: 'M / Default',
              size: 'M',
              color: 'Gold & Black',
              colorHex: '#D4AF37',
              sku: `YZ-${Math.floor(1000 + Math.random() * 9000)}`,
              price: Number(body.basePrice) || 25000,
              stock: 10,
            },
          ],
      isFeatured: Boolean(body.isFeatured),
      isBestSeller: Boolean(body.isBestSeller),
      isNewArrival: Boolean(body.isNewArrival ?? true),
      rating: 5.0,
      reviewCount: 0,
      reviews: [],
      status: body.status || 'active',
      createdAt: new Date().toISOString(),
    };

    const created = db.createProduct(newProduct);
    return NextResponse.json({ success: true, product: created }, { status: 201 });
  } catch (error) {
    console.error('API Error create product:', error);
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}

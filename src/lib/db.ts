import fs from 'fs';
import path from 'path';
import { Product, Category, Order, ActivityLog, Coupon, OrderStatus } from './types';
import initialProducts from '../data/initial-products.json';
import initialCategories from '../data/categories.json';

interface DatabaseSchema {
  products: Product[];
  categories: Category[];
  orders: Order[];
  coupons: Coupon[];
  activityLogs: ActivityLog[];
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'YZAAR10',
    discountPercent: 10,
    minOrderValue: 5000,
    description: '10% privilege on orders above ₹5,000',
  },
  {
    code: 'ROYAL2000',
    flatDiscount: 2000,
    minOrderValue: 20000,
    description: 'Flat ₹2,000 privilege on orders above ₹20,000',
  },
  {
    code: 'FREESHIP',
    freeShipping: true,
    minOrderValue: 0,
    description: 'Complimentary white-glove express courier delivery',
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_101',
    orderNumber: 'YZ-8891',
    customerName: 'Karan Mehra',
    customerEmail: 'karan.mehra@example.com',
    customerPhone: '+91 98201 12345',
    shippingAddress: {
      id: 'addr_1',
      name: 'Karan Mehra',
      street: '42, Altamount Road',
      apartment: 'Penthouse 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400026',
      phone: '+91 98201 12345',
      isDefault: true,
    },
    items: [
      {
        id: 'cart_1',
        productId: 'prod_aurum_tuxedo',
        productSlug: 'aurum-sovereign-velvet-tuxedo',
        variantId: 'var_1_40_blk',
        title: 'The Aurum Sovereign Velvet Tuxedo',
        size: '40R',
        color: 'Sovereign Black',
        price: 48999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80',
        maxStock: 6,
      },
    ],
    subtotal: 48999,
    tax: 8820,
    shippingFee: 0,
    discount: 4900,
    total: 52919,
    paymentMethod: 'razorpay',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    trackingNumber: 'DEL-992384729',
    courierPartner: 'Delhivery Luxury Express',
    createdAt: '2026-10-08T11:20:00Z',
    timeline: [
      { status: 'placed', timestamp: '2026-10-08T11:20:00Z', note: 'Order placed successfully via Razorpay' },
      { status: 'confirmed', timestamp: '2026-10-08T11:25:00Z', note: 'Payment verified & order confirmed' },
      { status: 'packed', timestamp: '2026-10-08T16:00:00Z', note: 'Garment pressed, inspected & packed in canvas hanger bag' },
      { status: 'shipped', timestamp: '2026-10-09T09:30:00Z', note: 'Dispatched via Delhivery Express. AWB: DEL-992384729' },
    ],
  },
  {
    id: 'ord_102',
    orderNumber: 'YZ-8892',
    customerName: 'Priya Singhania',
    customerEmail: 'priya.s@example.com',
    customerPhone: '+91 98110 56789',
    shippingAddress: {
      id: 'addr_2',
      name: 'Priya Singhania',
      street: '12, Golf Links',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110003',
      phone: '+91 98110 56789',
      isDefault: true,
    },
    items: [
      {
        id: 'cart_2',
        productId: 'prod_silk_scarf',
        productSlug: 'golden-zodiac-twill-silk-scarf',
        variantId: 'var_7_os',
        title: 'The Golden Zodiac Twill Silk Scarf (90cm)',
        size: '90x90cm',
        color: 'Gold & Noir',
        price: 9500,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1200&q=80',
        maxStock: 15,
      },
    ],
    subtotal: 19000,
    tax: 3420,
    shippingFee: 0,
    discount: 1900,
    total: 20520,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'confirmed',
    createdAt: '2026-10-09T18:45:00Z',
    timeline: [
      { status: 'placed', timestamp: '2026-10-09T18:45:00Z', note: 'Order placed via Cash on Delivery' },
      { status: 'confirmed', timestamp: '2026-10-09T18:50:00Z', note: 'Customer confirmed via WhatsApp OTP' },
    ],
  },
];

const INITIAL_LOGS: ActivityLog[] = [
  {
    id: 'log_1',
    adminName: 'Super Admin (Yzaaar Director)',
    action: 'Catalog Initialized',
    entity: '8 Haute Couture Masterpieces Created',
    timestamp: '2026-10-10T09:00:00Z',
  },
  {
    id: 'log_2',
    adminName: 'Inventory Staff',
    action: 'Stock Audit',
    entity: 'Aurum Sovereign Velvet Tuxedo count verified (15 units)',
    timestamp: '2026-10-10T10:15:00Z',
  },
];

function ensureDbFile(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      const initialDb: DatabaseSchema = {
        products: initialProducts as unknown as Product[],
        categories: initialCategories as unknown as Category[],
        orders: INITIAL_ORDERS,
        coupons: INITIAL_COUPONS,
        activityLogs: INITIAL_LOGS,
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
      return initialDb;
    }

    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data) as DatabaseSchema;
  } catch (error) {
    console.error('Error reading DB, returning defaults:', error);
    return {
      products: initialProducts as unknown as Product[],
      categories: initialCategories as unknown as Category[],
      orders: INITIAL_ORDERS,
      coupons: INITIAL_COUPONS,
      activityLogs: INITIAL_LOGS,
    };
  }
}

function saveDb(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving DB:', error);
  }
}

export const db = {
  // PRODUCTS
  getProducts(filters?: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    inStockOnly?: boolean;
  }): Product[] {
    const data = ensureDbFile();
    let result = [...data.products];

    if (filters?.category) {
      const cat = filters.category.toLowerCase();
      result = result.filter(
        (p) =>
          p.category.toLowerCase().includes(cat) ||
          p.subCategory?.toLowerCase().includes(cat) ||
          p.tags.some((t) => t.toLowerCase() === cat)
      );
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (filters?.minPrice !== undefined) {
      result = result.filter((p) => p.basePrice >= (filters.minPrice || 0));
    }

    if (filters?.maxPrice !== undefined) {
      result = result.filter((p) => p.basePrice <= (filters.maxPrice || Infinity));
    }

    if (filters?.inStockOnly) {
      result = result.filter((p) => p.variants.some((v) => v.stock > 0));
    }

    if (filters?.sort) {
      switch (filters.sort) {
        case 'price-asc':
          result.sort((a, b) => a.basePrice - b.basePrice);
          break;
        case 'price-desc':
          result.sort((a, b) => b.basePrice - a.basePrice);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'popular':
        default:
          result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
          break;
      }
    }

    return result;
  },

  getProductBySlug(slug: string): Product | undefined {
    const data = ensureDbFile();
    return data.products.find((p) => p.slug === slug);
  },

  getProductById(id: string): Product | undefined {
    const data = ensureDbFile();
    return data.products.find((p) => p.id === id);
  },

  createProduct(product: Product): Product {
    const data = ensureDbFile();
    data.products.unshift(product);
    data.activityLogs.unshift({
      id: `log_${Date.now()}`,
      adminName: 'Super Admin',
      action: 'Created Product',
      entity: product.title,
      timestamp: new Date().toISOString(),
    });
    saveDb(data);
    return product;
  },

  updateProduct(id: string, updates: Partial<Product>): Product | undefined {
    const data = ensureDbFile();
    const index = data.products.findIndex((p) => p.id === id);
    if (index === -1) return undefined;

    data.products[index] = { ...data.products[index], ...updates };
    data.activityLogs.unshift({
      id: `log_${Date.now()}`,
      adminName: 'Super Admin',
      action: 'Updated Product',
      entity: data.products[index].title,
      timestamp: new Date().toISOString(),
    });
    saveDb(data);
    return data.products[index];
  },

  deleteProduct(id: string): boolean {
    const data = ensureDbFile();
    const item = data.products.find((p) => p.id === id);
    if (!item) return false;

    data.products = data.products.filter((p) => p.id !== id);
    data.activityLogs.unshift({
      id: `log_${Date.now()}`,
      adminName: 'Super Admin',
      action: 'Deleted Product',
      entity: item.title,
      timestamp: new Date().toISOString(),
    });
    saveDb(data);
    return true;
  },

  // CATEGORIES
  getCategories(): Category[] {
    const data = ensureDbFile();
    return data.categories;
  },

  // ORDERS
  getOrders(): Order[] {
    const data = ensureDbFile();
    return data.orders;
  },

  createOrder(order: Order): Order {
    const data = ensureDbFile();
    data.orders.unshift(order);

    // Deduct stock for each purchased variant
    for (const item of order.items) {
      const prod = data.products.find((p) => p.id === item.productId);
      if (prod) {
        const variant = prod.variants.find((v) => v.id === item.variantId);
        if (variant) {
          variant.stock = Math.max(0, variant.stock - item.quantity);
        }
      }
    }

    data.activityLogs.unshift({
      id: `log_${Date.now()}`,
      adminName: 'System / Customer',
      action: 'New Order Placed',
      entity: `Order #${order.orderNumber} (₹${order.total.toLocaleString('en-IN')})`,
      timestamp: new Date().toISOString(),
    });

    saveDb(data);
    return order;
  },

  updateOrderStatus(orderId: string, status: OrderStatus, note: string): Order | undefined {
    const data = ensureDbFile();
    const order = data.orders.find((o) => o.id === orderId);
    if (!order) return undefined;

    order.orderStatus = status;
    order.timeline.push({
      status,
      timestamp: new Date().toISOString(),
      note,
    });

    // If cancelled or returned, restore stock
    if (status === 'cancelled' || status === 'returned') {
      for (const item of order.items) {
        const prod = data.products.find((p) => p.id === item.productId);
        if (prod) {
          const variant = prod.variants.find((v) => v.id === item.variantId);
          if (variant) {
            variant.stock += item.quantity;
          }
        }
      }
    }

    data.activityLogs.unshift({
      id: `log_${Date.now()}`,
      adminName: 'Staff',
      action: `Order Status -> ${status.toUpperCase()}`,
      entity: `Order #${order.orderNumber}`,
      timestamp: new Date().toISOString(),
    });

    saveDb(data);
    return order;
  },

  // COUPONS
  getCoupons(): Coupon[] {
    const data = ensureDbFile();
    return data.coupons;
  },

  validateCoupon(code: string): Coupon | undefined {
    const data = ensureDbFile();
    return data.coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
  },

  // ACTIVITY LOGS
  getActivityLogs(): ActivityLog[] {
    const data = ensureDbFile();
    return data.activityLogs;
  },
};

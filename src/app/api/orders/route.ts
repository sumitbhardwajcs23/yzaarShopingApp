import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Order } from '@/lib/types';
import { generateId } from '@/lib/utils';

export async function GET() {
  try {
    const orders = db.getOrders();
    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const orderNumber = `YZ-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: generateId('ord'),
      orderNumber,
      userId: body.userId,
      customerName: body.customerName || 'Valued Patron',
      customerEmail: body.customerEmail || '',
      customerPhone: body.customerPhone || '',
      shippingAddress: body.shippingAddress,
      items: body.items || [],
      subtotal: Number(body.subtotal) || 0,
      tax: Number(body.tax) || 0,
      shippingFee: Number(body.shippingFee) || 0,
      discount: Number(body.discount) || 0,
      total: Number(body.total) || 0,
      paymentMethod: body.paymentMethod || 'razorpay',
      paymentStatus: body.paymentMethod === 'razorpay' ? 'paid' : 'pending',
      orderStatus: 'confirmed',
      createdAt: new Date().toISOString(),
      timeline: [
        {
          status: 'placed',
          timestamp: new Date().toISOString(),
          note: `Order placed via ${body.paymentMethod === 'razorpay' ? 'Razorpay Secure Checkout' : 'Cash on Delivery'}`,
        },
        {
          status: 'confirmed',
          timestamp: new Date().toISOString(),
          note: 'Order confirmed and registered in Atelier Queue',
        },
      ],
    };

    const created = db.createOrder(newOrder);
    return NextResponse.json({ success: true, order: created }, { status: 201 });
  } catch (error) {
    console.error('API Error create order:', error);
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, status, note } = body;

    if (!orderId || !status) {
      return NextResponse.json({ success: false, error: 'Missing orderId or status' }, { status: 400 });
    }

    const updated = db.updateOrderStatus(orderId, status, note || `Status updated to ${status}`);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error('API Error patch order:', error);
    return NextResponse.json({ success: false, error: 'Failed to update order status' }, { status: 500 });
  }
}

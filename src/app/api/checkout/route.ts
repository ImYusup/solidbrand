// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";

const orders: Record<string, any> = {};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, error: "Keranjang kosong" }, { status: 400 });
    }

    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const orderId = `ORD-${day}${month}${year}-${hours}${minutes}${seconds}`; 
    const enrichedItems = items.map((item: any) => {
      const product = products.find(p => p.id === item.productId);
      return {
        productId: item.productId,
        quantity: item.quantity,
        title: product?.name || "Unknown Product",
        price: product?.discountPrice || product?.price || 0,
        image: product?.images?.[0] || undefined, // ← FIX: optional chain + fallback
      };
    });

    const subtotal = enrichedItems.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);
    orders[orderId] = { items: enrichedItems, subtotal };

    return NextResponse.json({ success: true, order_id: orderId });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order_id");

  if (!orderId || !orders[orderId]) {
    return NextResponse.json({ success: false, error: "Order tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json({ ...orders[orderId], order_id: orderId });
}
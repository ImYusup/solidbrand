// src/components/CartSidebar.tsx
"use client";
import { useCart, CartItem } from "@/lib/cart-store";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";

export default function CartSidebar() {
  const { items, removeItem, clearCart, showCart, setShowCart } = useCart();
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const router = useRouter();

  if (!showCart) return null;

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);

  const checkout = async () => {
    if (loadingCheckout || items.length === 0) return;
    setLoadingCheckout(true);

    try {
      // BUAT ORDER ID PENDEK: ORD-16112025-212045
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const orderId = `ORD-${day}${month}${year}-${hours}${minutes}${seconds}`;

      // ENRICH ITEMS DENGAN DATA PRODUK
      const enrichedItems = items.map((item: CartItem) => {
        const product = products.find(p => p.id === item.productId);
        const variant = product?.variants?.find(v => v.id === item.variantId);
        return {
          productId: item.productId,
          variantId: item.variantId || "",
          title: product?.name || item.title,
          color: variant?.color || "",   // ⬅ Tambah warna
          colorCode: variant?.colorCode || "",
          price: product?.discountPrice || product?.price || item.price,
          quantity: item.quantity,
          image: variant?.images?.[0] || product?.images?.[0] || item.image, // ⬅ Prioritaskan varian
        };
      });

      const subtotal = enrichedItems.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);

      // SIMPAN KE localStorage
      localStorage.setItem(`order_${orderId}`, JSON.stringify({
        order_id: orderId,
        items: enrichedItems,
        subtotal,
      }));

      console.log("Order disimpan di localStorage:", `order_${orderId}`);
      console.log("Redirect ke checkout...");

      // REDIRECT KE CHECKOUT
      router.push(`/checkout?order_id=${orderId}`);
    } catch (err) {
      console.error("Checkout gagal:", err);
      setLoadingCheckout(false);
    }
  };

  const total = items.reduce((sum: number, i: CartItem) => sum + i.price * i.quantity, 0);

  return (
    <aside className="fixed right-0 top-0 w-[320px] h-full bg-white shadow-lg p-4 z-50 overflow-y-auto">
      <button
        onClick={() => setShowCart(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        aria-label="Close cart"
      >
        ×
      </button>

      <h2 className="text-lg font-bold mb-4">Keranjang Belanja</h2>

      {items.length === 0 ? (
        <p className="text-gray-500">Keranjang masih kosong</p>
      ) : (
        <>
          <ul className="space-y-3">
            {items.map((item: CartItem) => (
              <li key={item.variantId || item.productId} className="flex gap-3 items-center">
                {item.image && (
                  <img
                    src={item.image}
                    className="w-12 h-12 object-cover rounded"
                    alt={item.title}
                  />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-gray-600">
                    {item.quantity} × {formatRupiah(item.price)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.variantId || item.productId)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t pt-4">
            <p className="font-bold">Total: {formatRupiah(total)}</p>

            <button
              onClick={checkout}
              disabled={loadingCheckout || items.length === 0}
              className={`mt-2 w-full py-2 rounded text-white transition-all ${loadingCheckout || items.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:opacity-90"
                }`}
            >
              {loadingCheckout ? "Memproses..." : "Checkout"}
            </button>

            <button
              onClick={clearCart}
              className="mt-2 w-full text-sm text-gray-500 hover:underline"
            >
              Kosongkan Keranjang
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
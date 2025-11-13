// src/components/CartSidebar.tsx
"use client";

import { useCart, CartItem } from "@/lib/cart-store";
import { useState } from "react";

export default function CartSidebar() {
  const { items, removeItem, clearCart, showCart, setShowCart } = useCart();
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  if (!showCart) return null;

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);

  const checkout = async () => {
    if (loadingCheckout) return;
    setLoadingCheckout(true);

    try {
      const payload = {
        items: items.map((i: CartItem) => ({
          productId: i.variantId,
          quantity: i.quantity,
        })),
        customer: {
          name: "Guest",
          email: "guest@example.com",
        },
      };

      console.log("🛒 Checkout payload:", payload);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("❌ Server error:", res.status, res.statusText);
        setLoadingCheckout(false);
        return;
      }

      const data = await res.json();
      console.log("✅ API response:", data);

      // ✅ Xendit flow
      if (data?.invoice_url) {
        console.log("💳 Redirecting to Xendit invoice:", data.invoice_url);
        window.location.href = data.invoice_url;
        return;
      }

      // ✅ Midtrans fallback
      if (data?.token && typeof window !== "undefined" && (window as any).snap) {
        // @ts-ignore
        window.snap.pay(data.token, {
          onSuccess: (result: any) => {
            console.log("✅ Success:", result);
            clearCart();
            setLoadingCheckout(false);
          },
          onPending: (result: any) => {
            console.log("⏳ Pending:", result);
            setLoadingCheckout(false);
          },
          onError: (err: any) => {
            console.error("❌ Error:", err);
            setLoadingCheckout(false);
          },
          onClose: () => {
            console.warn("❌ User closed the popup without finishing payment");
            setLoadingCheckout(false);
          },
        });
        return;
      }

      // ❌ Invalid response
      console.error("❌ Invalid response from API:", data);
      setLoadingCheckout(false);
    } catch (err) {
      console.error("❌ Checkout failed:", err);
      setLoadingCheckout(false);
    }
  };

  const total = items.reduce(
    (sum: number, i: CartItem) => sum + i.price * i.quantity,
    0
  );

  return (
    <aside className="fixed right-0 top-0 w-[320px] h-full bg-white shadow-lg p-4 z-50">
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
              <li key={item.variantId} className="flex gap-3 items-center">
                {item.image && (
                  <img
                    src={item.image}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × {formatRupiah(item.price)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.variantId)}
                  className="text-red-500 text-sm"
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
              disabled={loadingCheckout}
              className={`mt-2 w-full py-2 rounded text-white ${
                loadingCheckout
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

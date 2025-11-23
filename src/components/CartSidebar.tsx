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
    })
      .format(num)
      .replace("IDR", "Rp")
      .trim();

  const checkout = async () => {
    if (loadingCheckout || items.length === 0) return;
    setLoadingCheckout(true);

    try {
      const enrichedItems = items.map((item) => {
        const product = products.find(p => p.id === item.productId);
        const variant = product?.variants?.find(v => v.id === item.variantId);

        return {
          productId: item.productId,
          variantId: item.variantId || "",
          title: product?.name || item.title,
          color: variant?.color || item.color || "",
          price: variant?.price || product?.discountPrice || product?.price || item.price,
          quantity: item.quantity,
          image: variant?.images?.[0] || product?.images?.[0] || item.image,
          weight: (variant?.weight ?? product?.weight ?? 0),
        };
      });

      const subtotal = enrichedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

      // BERSIHIN SEMUA ORDER LAMA DULUAN
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith("order_")) localStorage.removeItem(key);
      });

      // BUAT ORDER BARU
      const orderId = `ORD-${Date.now()}`;
      localStorage.setItem(`order_${orderId}`, JSON.stringify({
        order_id: orderId,
        items: enrichedItems,
        subtotal,
      }));

      router.push(`/checkout?order_id=${orderId}`);
    } catch (err) {
      console.error("Checkout failed:", err);
    } finally {
      setLoadingCheckout(false); // PENTING! BIAR TOMBOL BALIK NORMAL
    }
  };

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <aside className="fixed right-0 top-0 w-80 md:w-96 h-full bg-white shadow-2xl z-50 overflow-y-auto">
      <div className="flex items-center justify-between p-5 border-b">
        <h2 className="text-xl font-bold">Shopping Cart ({itemCount})</h2>
        <button
          onClick={() => setShowCart(false)}
          className="text-2xl hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center"
          aria-label="Close cart"
        >
          ×
        </button>
      </div>

      <div className="p-5">
        {items.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <p className="text-sm text-gray-400 mt-2">Add some awesome items!</p>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {items.map((item) => {
                const product = products.find(p => p.id === item.productId);
                const variant = product?.variants?.find(v => v.id === item.variantId);

                return (
                  <li key={`${item.productId}-${item.variantId || "base"}`} className="flex gap-4 pb-4 border-b last:border-0">
                    {item.image && (
                      <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg shadow-sm" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm line-clamp-2">{item.title}</h4>
                      {variant?.color && (
                        <p className="text-xs text-gray-600 mt-1 flex items-center gap-2">
                          <span>Color:</span>
                          <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: variant.colorCode || "#ccc" }} />
                          <span>{variant.color}</span>
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm">
                          <span className="text-gray-600">Qty:</span> <strong>{item.quantity}</strong>
                        </p>
                        <p className="font-semibold">{formatRupiah(item.price * item.quantity)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="text-red-500 hover:text-red-700 text-xs self-start"
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Total</span>
                <span className="text-green-600">{formatRupiah(total)}</span>
              </div>

              <button
                onClick={checkout}  
                disabled={loadingCheckout || items.length === 0}
                className="w-full py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 disabled:opacity-50"
              >
                {loadingCheckout ? "Processing..." : "Proceed to Checkout"}
              </button>

              <button
                onClick={() => {
                  clearCart();
                  Object.keys(localStorage).forEach(key => {
                    if (key.startsWith("order_")) localStorage.removeItem(key);
                  });
                }}
                className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
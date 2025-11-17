// src/app/checkout/page.tsx
import { Suspense } from "react";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata = {
  title: "Checkout | SOLID Store",
  description: "Selesaikan pesanan Anda dengan aman dan cepat melalui halaman checkout SOLID.",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header / Breadcrumb */}
      <div className="w-full border-b bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-4 text-sm text-gray-600">
          <span className="text-gray-400">Home</span> /{" "}
          <span className="font-semibold">Checkout</span>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Checkout
        </h1>

        <Suspense fallback={<div className="text-gray-500">Loading checkout...</div>}>
          <CheckoutForm />
        </Suspense>
      </div>
    </div>
  );
}

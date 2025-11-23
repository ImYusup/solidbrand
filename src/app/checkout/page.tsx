// src/app/checkout/page.tsx
import CheckoutForm from "@/components/CheckoutForm";
import PayPalProvider from "@/components/PayPalProvider";
import { Suspense } from "react";

// Tambahin ini biar Next.js ga coba static render halaman checkout
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Checkout | SOLID Store",
  description: "Selesaikan pesanan Anda dengan aman dan cepat melalui halaman checkout SOLID.",
};

export default function CheckoutPage() {
  return (
    <PayPalProvider>
      <Suspense fallback={<CheckoutLoading />}>
        {/* Semua yang pake useSearchParams, cookies(), dll harus di-wrap Suspense */}
        <div className="min-h-screen bg-white">
          <div className="w-full border-b bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 py-4 text-sm text-gray-600">
              <span className="text-gray-400">Home</span> /{" "}
              <span className="font-semibold">Checkout</span>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>
            <CheckoutForm />
          </div>
        </div>
      </Suspense>
    </PayPalProvider>
  );
}

// Loading skeleton biar user gak bengong
function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Memuat checkout...</p>
      </div>
    </div>
  );
}
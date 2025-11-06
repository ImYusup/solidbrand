// src/app/checkout/page.tsx
import { Suspense } from "react";
import CheckoutForm from "@/components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<div>Loading checkout...</div>}>
        <CheckoutForm />
      </Suspense>
    </div>
  );
}
// src/components/PayPalProvider.tsx
"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PayPalProvider({ children }: { children: React.ReactNode }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
        currency: "USD",
        intent: "capture",
        components: "buttons",
        // Debug mode (hilangkan pas live)
        // "debug": true,
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}
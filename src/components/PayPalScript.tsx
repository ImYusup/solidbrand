// src/components/PayPalScript.tsx
"use client";

import Script from "next/script";

export default function PaypalScript() {
  return (
    <Script
      src={`https://www.paypal.com/sdk/js?client-id=${
        process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
      }&currency=USD&intent=capture&components=buttons,hosted-fields&enable-funding=card,paypal`}
      strategy="afterInteractive"
      onLoad={() => console.log("✅ PayPal SDK Loaded")}
      onError={(e) => console.error("❌ PayPal SDK Load Error", e)}
    />
  );
}

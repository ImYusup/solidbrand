// components/PaypalButton.tsx
"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PaypalButtonProps {
  amount: number; // in IDR
}

export default function PaypalButton({ amount }: PaypalButtonProps) {
  // manual convert IDR → USD
  const rate = 15500;
  const valueUSD = (amount / rate).toFixed(2);

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
        currency: "USD",
        intent: "capture",
        components: "buttons",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: valueUSD,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order?.capture();
          console.log("SUCCESS:", order);
          alert("PAYMENT SUCCESS");
        }}
        onError={(err) => {
          console.error("PayPal ERROR:", err);
        }}
      />
    </PayPalScriptProvider>
  );
}

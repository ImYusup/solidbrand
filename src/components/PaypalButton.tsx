// src/components/PaypalButton.tsx
"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";

interface PaypalButtonProps {
  amount: number;
  orderData: any;
  onPaid: (order: any) => void;
}

export default function PaypalButton({ amount, orderData, onPaid }: PaypalButtonProps) {
  const rate = 16000;
  const valueUSD = (amount / rate).toFixed(2);

  return (
    <PayPalButtons
      style={{ layout: "vertical", color: "gold", label: "paypal" }}
      createOrder={(data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: valueUSD,
              },
              description: `Order #${orderData.orderId} - SOLID Store`,
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        if (!actions.order) return;

        const captureDetails = await actions.order.capture();

        // Tambahin info PayPal ke order
        const paidOrder = {
          ...orderData,
          paymentMethod: "PayPal",                    // ini yang penting!
          paypalTransactionId: captureDetails.id,     // buat bukti
          paidAt: new Date().toISOString(),
          // Ongkir tetap 0 karena internasional
          shipping: { cost: 0, method: "International Shipping" },
        };

        // Simpen ke localStorage
        localStorage.setItem("latestOrder", JSON.stringify(paidOrder));

        // Trigger callback biar button CONFIRM ORDER jadi hijau
        onPaid(paidOrder);

        // LANGSUNG REDIRECT KE ORDER COMPLETE
        window.location.href = "/order-complete";
      }}
      onError={(err) => {
        console.error("PayPal ERROR:", err);
        alert("Pembayaran PayPal gagal. Silakan coba lagi atau pilih metode lain.");
      }}
    />
  );
}
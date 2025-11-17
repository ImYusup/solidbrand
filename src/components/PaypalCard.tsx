// src/components/PaypalCard.tsx
"use client";
import { useEffect, useRef } from "react";

interface PaypalCardProps {
  amount: number;
  currency?: "IDR" | "USD";
  onComplete: (payload: any) => void;
  onError?: (err: any) => void;
}

export default function PaypalCard({
  amount,
  currency = "IDR",
  onComplete,
  onError,
}: PaypalCardProps) {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!paypalRef.current || (window as any).paypalRendered) return;

    const win = window as any;
    if (!win.paypal) {
      onError?.(new Error("PayPal SDK gagal"));
      return;
    }

    win.paypal.Buttons({
      createOrder: async () => {
        const res = await fetch("/api/paypal/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, currency }),
        });
        const data = await res.json();
        return data.orderID;
      },
      onApprove: async (data: any) => {
        const res = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID: data.orderID }),
        });
        const result = await res.json();
        if (result.status === "COMPLETED") {
          onComplete({ orderID: data.orderID });
        } else {
          onError?.(new Error("Gagal capture"));
        }
      },
      onError: (err: any) => onError?.(err),
      style: {
        shape: "rect",
        color: "blue",
        layout: "vertical",
        label: "pay",
        height: 45,
      },
    })
      .render(paypalRef.current)
      .then(() => {
        (window as any).paypalRendered = true;
        console.log("PayPal Buttons JALAN DI localhost!");
      });
  }, [amount, currency, onComplete, onError]);

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border">
      <div className="text-sm font-medium text-gray-700">
        Pay with PayPal or Card
      </div>
      <div ref={paypalRef} className="min-h-12"></div>
      <div className="text-center text-xs text-gray-600">
        <span className="font-bold text-blue-600">PayPal</span> accepts all cards
      </div>
    </div>
  );
}
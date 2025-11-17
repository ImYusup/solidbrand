"use client";

import { useEffect } from "react";

export default function PaypalCardForm({ amount, onSuccess }: any) {
  useEffect(() => {
    const win = window as any;
    if (!win.paypal) return;

    const paypal = win.paypal;

    if (!paypal.HostedFields) {
      console.error("❌ HostedFields not available (Card Processing Not Enabled)");
      return;
    }

    paypal.HostedFields.render({
      createOrder: async () => {
        const res = await fetch("/api/paypal/create-order", {
          method: "POST",
          body: JSON.stringify({ amount }),
          headers: { "Content-Type": "application/json" },
        });

        const json = await res.json();
        return json.orderID;
      },

      styles: {
        input: {
          "font-size": "16px",
          "font-family": "Arial",
          "color": "#333",
        },
        ".invalid": { color: "red" },
        ":focus": { color: "black" },
      },

      fields: {
        number: { selector: "#card-number", placeholder: "Card Number" },
        cvv: { selector: "#cvv", placeholder: "CVV" },
        expirationDate: {
          selector: "#expiration-date",
          placeholder: "MM/YY",
        },
      },
    }).then((instance: any) => {
      document.getElementById("card-pay-btn")!.onclick = async () => {
        try {
          const cardResult = await instance.submit();
          onSuccess && onSuccess(cardResult);
        } catch (err) {
          console.error("❌ Card Payment Failed:", err);
        }
      };
    });
  }, []);

  return (
    <div className="space-y-3 w-full max-w-md p-4 border rounded">
      <div id="card-number" className="border p-3 rounded"></div>
      <div id="expiration-date" className="border p-3 rounded"></div>
      <div id="cvv" className="border p-3 rounded"></div>

      <button
        id="card-pay-btn"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded"
      >
        Pay with Card
      </button>
    </div>
  );
}

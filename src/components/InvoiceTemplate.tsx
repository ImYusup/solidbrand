// src/components/InvoiceTemplate.tsx
import React from "react";

interface InvoiceProps {
  order: any;
}

export default function InvoiceTemplate({ order }: InvoiceProps) {
  const phone = order?.billing?.phone || "";
  const isLocal = phone.startsWith("08") || phone.startsWith("628");

  const t = isLocal
    ? {
        invoice: "INVOICE",
        orderId: "Order ID:",
        date: "Tanggal:",
        name: "Nama:",
        phone: "HP:",
        item: "Item",
        price: "Harga",
        shipping: (method: string) => `Ongkir (${method})`,
        total: "TOTAL",
        transfer: (bank: any) =>
          bank ? `${bank.bank} - ${bank.account} a.n. ${bank.name}` : "QRIS/VA",
      }
    : {
        invoice: "INVOICE",
        orderId: "Order ID:",
        date: "Date:",
        name: "Name:",
        phone: "Phone:",
        item: "Item",
        price: "Price",
        shipping: (method: string) => `Shipping (${method})`,
        total: "TOTAL",
        transfer: (bank: any) =>
          bank ? `${bank.bank} - ${bank.account} under ${bank.name}` : "International Transfer / QR",
      };

  return (
    <div
      style={{
        position: "relative",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        width: "210mm",
        backgroundColor: "white",
      }}
    >
      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-20deg)",
          fontSize: "72px",
          fontWeight: "900",
          color: "rgba(30, 64, 175, 0.12)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        NOT PAID
      </div>

      {/* Header */}
      <h2 style={{ textAlign: "center", marginBottom: "2px" }}>{t.invoice}</h2>
      <div
        style={{
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "500",
          marginBottom: "8px",
        }}
      >
        www.solidbrand.id
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "12px 0" }} />

      <table style={{ width: "100%", marginBottom: "12px", borderCollapse: "collapse" }}>
        <tbody>
          <tr><td style={{ fontWeight: "bold" }}>{t.orderId}</td><td>{order.orderId}</td></tr>
          <tr><td style={{ fontWeight: "bold" }}>{t.date}</td><td>{order.date}</td></tr>
          <tr><td style={{ fontWeight: "bold" }}>{t.name}</td><td>{order.billing.firstName} {order.billing.lastName}</td></tr>
          <tr><td style={{ fontWeight: "bold" }}>{t.phone}</td><td>{order.billing.phone}</td></tr>
        </tbody>
      </table>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "10px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f3f4f6" }}>
            <th style={{ textAlign: "left", padding: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }}>{t.item}</th>
            <th style={{ textAlign: "right", padding: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }}>{t.price}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "8px", border: "1px solid #e5e7eb" }}>{order.product.name}</td>
            <td style={{ textAlign: "right", padding: "8px", border: "1px solid #e5e7eb" }}>
              Rp {order.price.toLocaleString()}
            </td>
          </tr>

          {order.shipping.cost > 0 && (
            <tr>
              <td style={{ padding: "8px", border: "1px solid #e5e7eb" }}>
                {t.shipping(order.shipping.method)}
              </td>
              <td style={{ textAlign: "right", padding: "8px", border: "1px solid #e5e7eb" }}>
                Rp {order.shipping.cost.toLocaleString()}
              </td>
            </tr>
          )}

          <tr style={{ backgroundColor: "#f3f4f6", fontWeight: "bold" }}>
            <td style={{ padding: "8px", border: "1px solid #e5e7eb" }}>{t.total}</td>
            <td style={{ textAlign: "right", padding: "8px", border: "1px solid #e5e7eb" }}>
              Rp {order.total.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Footer Left */}
      <p style={{ marginTop: "8px", fontSize: "11px", color: "#6b7280", textAlign: "left" }}>
        Transfer ke: {t.transfer(order.bank)}
      </p>
    </div>
  );
}


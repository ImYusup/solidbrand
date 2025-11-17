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
        qty: "Jumlah:",
        price: "Harga",
        shipping: (m: string) => `Ongkir (${m})`,
        total: "TOTAL",
        transfer: (b: any) => (b ? `${b.bank} - ${b.account} a.n. ${b.name}` : "QRIS/VA"),
        address: "Alamat:",
        status: "Status:",
      }
    : {
        invoice: "INVOICE",
        orderId: "Order ID:",
        date: "Date:",
        name: "Name:",
        phone: "Phone:",
        item: "Item",
        qty: "Qty:",
        price: "Price",
        shipping: (m: string) => `Shipping (${m})`,
        total: "TOTAL",
        transfer: (b: any) => (b ? `${b.bank} - ${b.account} under ${b.name}` : "International Transfer / QR"),
        address: "Address:",
        status: "Status:",
      };

  const fullName = `${order.billing.firstName || ""} ${order.billing.lastName || ""}`.trim();
  const address = `${order.billing.street || ""}${order.billing.city ? ", " + order.billing.city : ""}${order.billing.apartment ? ", " + order.billing.apartment : ""}`;

  // SUPPORT MULTI-ITEM
  const items = order?.items || [];
  const subtotal = order?.subtotal || 0;
  const shippingCost = order?.shipping?.cost || 0;
  const total = order?.total || 0;

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        fontSize: 14,
        width: "210mm",
        backgroundColor: "#ffffff",
        color: "#111827",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-20deg)",
          fontSize: 72,
          fontWeight: 900,
          color: "rgba(30,64,175,0.12)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        UNPAID
      </div>

      <h2 style={{ textAlign: "center", fontSize: 20, marginBottom: 2, fontWeight: "bold" }}>
        {t.invoice}
      </h2>
      <div style={{ textAlign: "center", fontSize: 14, fontWeight: 500, marginBottom: 8 }}>
        www.solidbrand.id
      </div>
      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "12px 0" }} />

      <table style={{ width: "100%", marginBottom: 12 }}>
        <tbody>
          <tr>
            <td style={{ fontWeight: "bold", width: 120 }}>{t.orderId}</td>
            <td>{order.orderId}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>{t.date}</td>
            <td>{order.date}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>{t.name}</td>
            <td>{fullName}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>{t.phone}</td>
            <td>{order.billing.phone}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>{t.address}</td>
            <td>{address}</td>
          </tr>
        </tbody>
      </table>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: 10,
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f3f4f6" }}>
            <th style={{ textAlign: "left", padding: "8px 12px", border: "1px solid #e5e7eb", fontSize: 12, width: "55%" }}>
              {t.item}
            </th>
            <th style={{ textAlign: "center", padding: "8px 12px", border: "1px solid #e5e7eb", fontSize: 12, width: "15%" }}>
              {t.qty}
            </th>
            <th style={{ textAlign: "right", padding: "8px 16px", border: "1px solid #e5e7eb", fontSize: 12, width: "30%" }}>
              {t.price}
            </th>
          </tr>
        </thead>
        <tbody>
          {/* LOOP SEMUA ITEM */}
          {items.map((item: any, i: number) => (
            <tr key={i}>
              <td style={{ padding: "8px 12px", border: "1px solid #e5e7eb", wordBreak: "break-word" }}>
                {item.title}
              </td>
              <td style={{ textAlign: "center", padding: "8px 12px", border: "1px solid #e5e7eb" }}>
                {item.quantity}
              </td>
              <td
                style={{
                  textAlign: "right",
                  padding: "8px 16px",
                  border: "1px solid #e5e7eb",
                  whiteSpace: "nowrap",
                }}
              >
                Rp {item.price.toLocaleString()}
              </td>
            </tr>
          ))}

          {/* ONGKIR */}
          {shippingCost > 0 && (
            <tr>
              <td style={{ padding: "8px 12px", border: "1px solid #e5e7eb" }}>
                {t.shipping(order.shipping.method)}
              </td>
              <td style={{ textAlign: "center", padding: "8px 12px", border: "1px solid #e5e7eb" }}>-</td>
              <td
                style={{
                  textAlign: "right",
                  padding: "8px 16px",
                  border: "1px solid #e5e7eb",
                  whiteSpace: "nowrap",
                }}
              >
                Rp {shippingCost.toLocaleString()}
              </td>
            </tr>
          )}

          {/* TOTAL */}
          <tr style={{ backgroundColor: "#f3f4f6", fontWeight: "bold" }}>
            <td style={{ padding: "8px 12px", border: "1px solid #e5e7eb" }}>{t.total}</td>
            <td style={{ border: "1px solid #e5e7eb" }}></td>
            <td
              style={{
                textAlign: "right",
                padding: "8px 16px",
                border: "1px solid #e5e7eb",
                whiteSpace: "nowrap",
              }}
            >
              Rp {total.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>

      <p style={{ marginTop: 8, fontSize: 12, color: "#374151" }}>
        <strong>{t.status}</strong> Belum Dibayar
      </p>
      <p style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>
        Transfer ke: {t.transfer(order.bank)}
      </p>
    </div>
  );
}
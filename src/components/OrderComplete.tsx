// src/components/OrderComplete.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { generateInvoicePDF } from "@/lib/generateInvoicePDF";
import InvoiceTemplate from "@/components/InvoiceTemplate";

export default function OrderComplete() {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = localStorage.getItem("latestOrder");
    if (data) {
      const parsed = JSON.parse(data);
      setOrder(parsed);
      setLoading(false);
    } else {
      router.push("/");
    }
  }, [router]);

  const normalizePhone = (p: string) => {
    if (!p) return "";
    p = p.replace(/[^0-9+]/g, "");
    if (p.startsWith("0")) return "62" + p.slice(1);
    if (p.startsWith("+")) return p.replace("+", "");
    return p;
  };

  const formatCurrency = (v: number | string | undefined) => {
    const n = typeof v === "number" ? v : Number(String(v || 0).replace(/[^0-9.-]/g, ""));
    return n ? n.toLocaleString("id-ID") : "0";
  };

  // === SUPPORT MULTI-ITEM ===
  const items = order?.items || [];
  const totalQty = items.reduce((sum: number, i: any) => sum + (i.quantity || 0), 0);
  const productList = items.map((i: any) => `${i.title} (x${i.quantity})`).join(", ");
  const productForWA = items.map((i: any) => `${i.title} x${i.quantity}`).join("\n");

  // === PAYMENT LOGIC – Support PayPal & Crypto ===
  const paymentDisplay = order?.paymentMethod === "PayPal"
    ? `PayPal${order.paypalTransactionId ? ` - ${order.paypalTransactionId}` : ""}`
    : order?.paymentMethod === "Crypto"
      ? `Crypto USDT${order.cryptoTxId ? ` - ${order.cryptoTxId.slice(0, 12)}...` : ""}`
      : order?.bank
        ? `${order.bank.bank} - ${order.bank.account} a.n. ${order.bank.name}`
        : order?.payment === "qris"
          ? "QRIS"
          : "Virtual Account / Others";

  const paymentForSheet = order?.paymentMethod === "PayPal"
    ? `PayPal - ${order.paypalTransactionId || "N/A"}`
    : order?.paymentMethod === "Crypto"
      ? `Crypto USDT - ${order.cryptoTxId || "Pending"}`
      : order?.bank
        ? `${order.bank.bank} - ${order.bank.account}`
        : order?.payment === "qris"
          ? "QRIS"
          : "VA";

  useEffect(() => {
    if (!order || !invoiceRef.current) return;

    const triggerAutomation = async () => {
      try {
        await new Promise((r) => setTimeout(r, 1000));

        const pdfBlob = await generateInvoicePDF(order, invoiceRef.current!);
        const form = new FormData();
        form.append("file", pdfBlob, `Invoice_${order.orderId}.pdf`);
        form.append("orderId", String(order.orderId));

        const uploadRes = await fetch("/api/upload-invoice", { method: "POST", body: form });
        const { invoiceUrl } = await uploadRes.json();
        if (!invoiceUrl) throw new Error("Upload gagal");

        const buyerPhone = normalizePhone(order.billing.phone);

        await fetch("/api/send-wa", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            buyerPhone,
            adminPhone: "6281289066999",
            orderId: order.orderId,
            orderDate: order.date,
            product: productForWA,
            total: order.total,
            quantity: totalQty,
            ongkir: 0,
            shipping: "International",
            bank: paymentForSheet,
            customer: `${order.billing.firstName} ${order.billing.lastName}`,
            wa: order.billing.phone,
            email: order.billing.email || "-",
            address: `${order.billing.street}, ${order.billing.city}`,
            status: "Belum Dibayar",
            pdfUrl: invoiceUrl,
          }),
        });

        await fetch("/api/send-sheet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: order.orderId,
            orderDate: order.date,
            product: productList,
            total: order.total,
            quantity: totalQty,
            ongkir: 0,
            shipping: "International",
            bank: paymentForSheet,
            customer: `${order.billing.firstName} ${order.billing.lastName}`,
            wa: order.billing.phone,
            email: order.billing.email || "-",
            address: `${order.billing.street}, ${order.billing.city}`,
            status: "Belum Dibayar",
            pdfUrl: invoiceUrl,
          }),
        });

        console.log("Semua proses sukses: Drive + WA + Sheet");
      } catch (err: any) {
        console.error("OrderComplete automation error:", err);
      }
    };

    const timer = setTimeout(triggerAutomation, 800);
    return () => clearTimeout(timer);
  }, [order]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!order) return null;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-md border p-6 md:p-8">
        <h1 className="text-3xl font-bold text-green-600 text-center mb-4">
          Order Received Successfully!
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Your invoice has been sent automatically to your WhatsApp.
        </p>

        <div className="space-y-2 text-gray-800 leading-relaxed">
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Name:</strong> {order.billing.firstName} {order.billing.lastName}</p>
          <p><strong>WhatsApp:</strong> {order.billing.phone}</p>
          <p><strong>Products:</strong> {productList || "No items"}</p>
          <p><strong>Total Items:</strong> {totalQty}</p>
          <p><strong>Subtotal:</strong> Rp {formatCurrency(order.subtotal || order.total)}</p>
          <p><strong>Total:</strong> Rp {formatCurrency(order.total)}</p>
          <p><strong>Address:</strong> {order.billing.street}{order.billing.apartment ? ", " + order.billing.apartment : ""}, {order.billing.city}, {order.billing.province || "International"}</p>
          
          <p>
            <strong>Payment Method:</strong>{" "}
            <span className="text-blue-600 font-medium">
              {paymentDisplay}
            </span>
          </p>

          {/* Notifikasi khusus PayPal & Crypto */}
          {(order.paymentMethod === "PayPal" || order.paymentMethod === "Crypto") && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 text-sm">
              <p className="font-medium text-blue-900">
                Payment received via {order.paymentMethod === "PayPal" ? "PayPal" : "Crypto USDT"}
              </p>
              <p className="text-gray-700 mt-1">
                International shipping cost will be calculated and confirmed via WhatsApp shortly.
              </p>
            </div>
          )}

          <p><strong>Status:</strong> <span className="text-orange-600 font-medium">Awaiting Confirmation</span></p>
        </div>

        <div className="text-center mt-6">
          <a
            href={`https://wa.me/6281289066999?text=${encodeURIComponent(
              `Hello,\nOrder ID: ${order.orderId}\nPayment: ${paymentDisplay}\n\nPlease confirm my payment and shipping cost.\nThank you!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg transition-all duration-200"
          >
            Contact Us on WhatsApp
          </a>
        </div>

        <div
          ref={invoiceRef}
          style={{
            position: "absolute",
            top: "-9999px",
            left: "-9999px",
            width: "210mm",
            background: "#ffffff",
            opacity: 1,
            zIndex: -1,
          }}
        >
          <InvoiceTemplate order={order} />
        </div>
      </div>
    </div>
  );
}
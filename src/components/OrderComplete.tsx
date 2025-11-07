// src/components/OrderComplete.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { generateInvoicePDF } from "@/lib/generateInvoicePDF";
import InvoiceTemplate from "./InvoiceTemplate";
import ReactDOMServer from "react-dom/server";

export default function OrderComplete() {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  useEffect(() => {
    if (!order || !iframeRef.current) return;

    const triggerAllActions = async () => {
      const iframe = iframeRef.current!;
      const doc = iframe.contentDocument!;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
            </style>
          </head>
          <body>
            <div id="invoice-root"></div>
          </body>
        </html>
      `);
      doc.close();

      setTimeout(async () => {
        const html = ReactDOMServer.renderToString(<InvoiceTemplate order={order} />);
        doc.getElementById("invoice-root")!.innerHTML = html;

        setTimeout(async () => {
          try {
            const pdfBlob = await generateInvoicePDF(order, doc.body);
            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `Invoice_${order.orderId}.pdf`;
            link.click();
            URL.revokeObjectURL(url);
          } catch (e) {
            console.error("PDF Error:", e);
          }

          const bankMap: Record<string, { bank: string; account: string; name: string }> = {
            bca_manual: { bank: "BCA", account: "7390 7480 13", name: "Yusup Juniadi" },
            bri_manual: { bank: "BRI", account: "7463 0100 7264 505", name: "Yusup Juniadi" },
            mandiri_manual: { bank: "Mandiri", account: "1560016268064", name: "Yusup Juniadi" },
            seabank_manual: { bank: "Sea Bank", account: "9013 5607 9886", name: "Yusup Juniadi" },
          };

          const bankInfo =
            bankMap[String(order.bank?.key)] ??
            (order.bank?.bank
              ? { bank: order.bank.bank, account: order.bank.account, name: order.bank.name }
              : null);

          const bankText = bankInfo
            ? `${bankInfo.bank} - ${bankInfo.account} a.n. ${bankInfo.name}`
            : "QRIS/VA";

          const buyerPhone = order.billing.phone.replace(/[^0-9]/g, "");
          const buyerWa = buyerPhone.startsWith("0") ? "62" + buyerPhone.slice(1) : buyerPhone;

          const buyerMessage = `*INVOICE ORDER ANDA*\n\n*Order ID:* ${order.orderId}\n*Produk:* ${order.product.name}\n*Total:* Rp ${order.total.toLocaleString()}\n*Ongkir:* ${order.shipping.cost > 0 ? `Rp ${order.shipping.cost.toLocaleString()} (${order.shipping.method})` : "-"}\n*Bank Tujuan:* ${bankText}\n\nSilakan transfer tepat sesuai nominal di atas.\nSetelah transfer, kirim bukti ke: wa.me/6281289066999`;

          const adminMessage = `*ORDER BARU!*\n\n*ID:* ${order.orderId}\n*Produk:* ${order.product.name}\n*Total:* Rp ${order.total.toLocaleString()}\n*Nama:* ${order.billing.firstName} ${order.billing.lastName}\n*HP:* ${order.billing.phone}\n*Email:* ${order.billing.email}\n*Alamat:* ${order.billing.street}, ${order.billing.city}\n*Bank:* ${bankText}`;

          // ✅ PREVIEW WHATSAPP MESSAGE DI CONSOLE
          console.log("📲 WhatsApp Buyer Message:\n", buyerMessage);
          console.log("📢 WhatsApp Admin Message:\n", adminMessage);

          // ✅ Kirim ke WA Buyer via backend
          await fetch("/api/send-wa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: buyerWa,
              message: buyerMessage,
            }),
          });

          // ✅ Kirim ke WA Admin via backend
          await fetch("/api/send-wa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: "6281289066999",
              message: adminMessage,
            }),
          });
        }, 300);
      }, 100);
    };

    const timer = setTimeout(triggerAllActions, 600);
    return () => clearTimeout(timer);
  }, [order]);

  if (loading) return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;
  if (!order) return null;

  return (
    <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "1rem" }}>
      <div style={{ backgroundColor: "white", borderRadius: "0.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb", padding: "1.5rem" }}>
        <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#16a34a", textAlign: "center", marginBottom: "1.5rem" }}>
          Order Berhasil!
        </h1>
        <p style={{ textAlign: "center", color: "#4b5563", marginBottom: "2rem" }}>
          Invoice otomatis terdownload & dikirim ke WhatsApp Anda.
        </p>
        <iframe
          ref={iframeRef}
          style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", border: "none" }}
          title="invoice"
        />
        <div style={{ textAlign: "center" }}>
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Total:</strong> Rp {order.total.toLocaleString()}</p>
          <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
            Invoice sudah dikirim ke WhatsApp Anda: {order.billing.phone}
          </p>
          <a
            href="/konfirmasi"
            style={{
              display: "inline-block",
              marginTop: "1.5rem",
              padding: "0.75rem 2rem",
              backgroundColor: "#16a34a",
              color: "white",
              fontWeight: "bold",
              borderRadius: "0.5rem",
              textDecoration: "none"
            }}
          >
            Konfirmasi Pembayaran
          </a>
        </div>
      </div>
    </div>
  );
}
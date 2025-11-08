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
      setOrder(JSON.parse(data));
      setLoading(false);
    } else {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (!order || !iframeRef.current) return;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument;
    if (!doc) return;

    // inject invoice html into iframe
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

    const renderAndDownloadPDF = async () => {
      try {
        const html = ReactDOMServer.renderToString(<InvoiceTemplate order={order} />);
        doc.getElementById("invoice-root")!.innerHTML = html;

        const pdfBlob = await generateInvoicePDF(order, doc.body);
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Invoice_${order.orderId}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
      } catch (e) {
        console.error("❌ PDF generation error:", e);
      }
    };

    const sendWhatsAppMessages = async () => {
      const bankMap: Record<string, { bank: string; account: string; name: string }> = {
        bca_manual: { bank: "BCA", account: "7390748013", name: "Yusup Juniadi" },
        bri_manual: { bank: "BRI", account: "746301007264505", name: "Yusup Juniadi" },
        mandiri_manual: { bank: "Mandiri", account: "1560016268064", name: "Yusup Juniadi" },
        seabank_manual: { bank: "Sea Bank", account: "901356079886", name: "Yusup Juniadi" },
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

      const orderDate = new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      const isLocal = buyerPhone.startsWith("08") || buyerPhone.startsWith("62");

      const buyerMessage = isLocal
        ? `*INVOICE ORDER ANDA*\n\n*Order ID:* ${order.orderId}\n*Produk:* ${order.product.name}\n*Total:* Rp ${order.total.toLocaleString()}\n*Ongkir:* ${order.shipping.cost > 0 ? `Rp ${order.shipping.cost.toLocaleString()} (${order.shipping.method})` : "-"}\n*Bank Tujuan:* ${bankText}\n\nSilakan transfer sesuai nominal di atas.\nSetelah transfer kirim bukti ke WhatsApp admin.`
        : `*YOUR ORDER INVOICE*\n\n*Order ID:* ${order.orderId}\n*Product:* ${order.product.name}\n*Total:* Rp ${order.total.toLocaleString()}\n*Shipping:* ${order.shipping.cost > 0 ? `Rp ${order.shipping.cost.toLocaleString()} (${order.shipping.method})` : "-"}\n*Bank:* ${bankText}`;

      const adminMessage = `*ORDER BARU TANGGAL ${orderDate}#*\n*ID:* ${order.orderId}\n*Produk:* ${order.product.name}\n*Total:* Rp ${order.total.toLocaleString()}\n*Nama:* ${order.billing.firstName} ${order.billing.lastName}\n*HP:* ${order.billing.phone}\n*Email:* ${order.billing.email}\n*Alamat:* ${order.billing.street}, ${order.billing.city}\n*Bank:* ${bankText}`;

      const sendWa = async (to: string, message: string) => {
        const res = await fetch("/api/send-wa", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to, message }),
        });

        const data = await res.json();
        if (!res.ok) console.error("❌ WhatsApp Send Error:", data);
        else console.log("✅ WhatsApp Sent:", { to });
      };

      await Promise.all([
        sendWa(buyerWa, buyerMessage),
        sendWa("6281289066999", adminMessage),
      ]);

      await renderAndDownloadPDF();
    };

    sendWhatsAppMessages();
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
        <iframe ref={iframeRef} style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", border: "none" }} />
      </div>
    </div>
  );
}
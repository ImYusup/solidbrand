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

  // ambil data order terakhir
  useEffect(() => {
    const data = localStorage.getItem("latestOrder");
    if (data) {
      setOrder(JSON.parse(data));
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

  useEffect(() => {
    if (!order || !invoiceRef.current) return;

    const triggerAutomation = async () => {
      try {
        // kasih waktu render penuh
        await new Promise((r) => setTimeout(r, 1000));

        // 1️⃣ Generate PDF
        const pdfBlob = await generateInvoicePDF(order, invoiceRef.current!);

        // 2️⃣ Upload ke Google Drive
        const form = new FormData();
        form.append("file", pdfBlob, `Invoice_${order.orderId}.pdf`);
        form.append("orderId", String(order.orderId));

        const uploadRes = await fetch("/api/upload-invoice", {
          method: "POST",
          body: form,
        });

        const { invoiceUrl } = await uploadRes.json();
        if (!invoiceUrl) throw new Error("Upload gagal");

        const qty = order.quantity ?? 1;
        const paymentDisplay = order.bank
          ? `${order.bank.bank} - ${order.bank.account} a.n. ${order.bank.name}`
          : "QRIS/VA";

        // untuk Sheet hanya prefix-nomor rekening
        const paymentForSheet = order.bank
          ? `${order.bank.bank} - ${order.bank.account}`
          : "QRIS/VA";

        const buyerPhone = normalizePhone(order.billing.phone);

        // 3️⃣ Kirim WhatsApp ke buyer & admin
        await fetch("/api/send-wa", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            buyerPhone,
            adminPhone: "6281289066999",
            orderId: order.orderId,
            orderDate: order.date,
            product: order.product.name,
            total: order.total,
            quantity: qty,
            ongkir: order.shippingCost || 0,
            shipping: order.shippingMethod || "-",
            bank: paymentDisplay,
            customer: `${order.billing.firstName} ${order.billing.lastName}`,
            wa: order.billing.phone,
            email: order.billing.email || "-",
            address: `${order.billing.street}, ${order.billing.city}`,
            status: "Belum Dibayar",
            pdfUrl: invoiceUrl,
          }),
        });

        // 4️⃣ Simpan ke Google Sheet
        await fetch("/api/send-sheet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: order.orderId,
            orderDate: order.date,
            product: order.product.name,
            total: order.total,
            quantity: qty,
            ongkir: order.shippingCost || 0,
            shipping: order.shippingMethod || "-",
            bank: paymentForSheet, // ✅ hanya nama bank + no rek
            customer: `${order.billing.firstName} ${order.billing.lastName}`,
            wa: order.billing.phone,
            email: order.billing.email || "-",
            address: `${order.billing.street}, ${order.billing.city}`,
            status: "Belum Dibayar",
            pdfUrl: invoiceUrl,
          }),
        });

        console.log("✅ Semua proses sukses: Drive + WA + Sheet");
      } catch (err) {
        console.error("❌ OrderComplete automation error:", err);
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
          Order Berhasil!
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Invoice otomatis dikirim ke WhatsApp Anda.
        </p>

        {/* Detail Order */}
        <div className="space-y-2 text-gray-800 leading-relaxed">
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Tanggal:</strong> {order.date}</p>
          <p><strong>Nama:</strong> {order.billing.firstName} {order.billing.lastName}</p>
          <p><strong>WhatsApp:</strong> {order.billing.phone}</p>
          <p><strong>Produk:</strong> {order.product.name}</p>
          <p><strong>Jumlah:</strong> {order.quantity ?? 1}</p>
          <p><strong>Total:</strong> Rp {formatCurrency(order.total)}</p>
          <p><strong>Alamat:</strong> {order.billing.street}, {order.billing.city}</p>
          <p>
            <strong>Metode Pembayaran:</strong>{" "}
            {order.bank
              ? `${order.bank.bank} - ${order.bank.account} a.n. ${order.bank.name}`
              : "QRIS/VA"}
          </p>
          <p><strong>Status:</strong> Belum Dibayar</p>
        </div>

        <div className="text-center mt-6">
          <a
            href={`https://wa.me/6281289066999?text=${encodeURIComponent(
              `Hi Admin,\n\nBerikut untuk lampiran bukti transfer dengan Order ID : ${order.orderId}\n\nTerima Kasih!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg transition-all duration-200"
          >
            Konfirmasi Pembayaran
          </a>
        </div>

        {/* elemen hidden buat PDF */}
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

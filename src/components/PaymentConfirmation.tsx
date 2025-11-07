// src/components/PaymentConfirmation.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentConfirmation() {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    orderId: "",
    billingEmail: "",
    billingName: "",
    bank: "BCA",
    transferDate: "",
    transferAmount: "",
    paymentProof: null as File | null,
    additionalNotes: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("latestOrder");
    if (data) {
      const parsed = JSON.parse(data);
      setOrder(parsed);
      setFormData((prev) => ({
        ...prev,
        orderId: parsed.orderId.toString(),
        billingEmail: parsed.billing.email,
        billingName: `${parsed.billing.firstName} ${parsed.billing.lastName}`,
        bank: parsed.bank?.bank || "BCA",
        transferAmount: parsed.total.toString(),
        transferDate: new Date().toISOString().split("T")[0],
      }));
    }
    setLoading(false);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file maksimal 5MB");
        return;
      }
      setFormData((prev) => ({ ...prev, paymentProof: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.paymentProof) {
      alert("Bukti pembayaran wajib diupload!");
      return;
    }

    const message = `
*KONFIRMASI PEMBAYARAN* %0A%0A
*Order ID:* ${formData.orderId}%0A
*Email:* ${formData.billingEmail}%0A
*Nama:* ${formData.billingName}%0A
*Bank:* ${formData.bank}%0A
*Tanggal Transfer:* ${formData.transferDate}%0A
*Nominal:* Rp ${Number(formData.transferAmount).toLocaleString()}%0A
*Bukti:* ${formData.paymentProof.name}%0A
*Catatan:* ${formData.additionalNotes || "-"}%0A%0A
`.trim();

    const waUrl = `https://wa.me/6281289066999?text=${message}`;
    window.open(waUrl, "_blank");

    localStorage.setItem(`confirmation_${formData.orderId}`, JSON.stringify({
      ...formData,
      paymentProof: formData.paymentProof.name,
      submittedAt: new Date().toLocaleString("id-ID"),
    }));

    alert("Konfirmasi berhasil dikirim ke WhatsApp!");
    router.push("/order-complete");
  };

  if (loading) return <div className="p-8 text-center">Loading order...</div>;
  if (!order) return <div className="p-8 text-center text-red-600">Order tidak ditemukan.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">Konfirmasi Pembayaran</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" name="orderId" value={formData.orderId} readOnly className="w-full px-4 py-2 border rounded-md bg-gray-50" />
          <input type="email" name="billingEmail" value={formData.billingEmail} readOnly className="w-full px-4 py-2 border rounded-md bg-gray-50" />
          <input type="text" name="billingName" value={formData.billingName} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />

          <select name="bank" value={formData.bank} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md">
            <option value="BCA">BCA</option>
            <option value="BRI">BRI</option>
            <option value="Mandiri">Mandiri</option>
            <option value="BNI">BNI</option>
            <option value="Sea Bank">Sea Bank</option>
          </select>

          <input type="date" name="transferDate" value={formData.transferDate} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
          <input type="number" name="transferAmount" value={formData.transferAmount} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />

          <input type="file" name="paymentProof" onChange={handleFileChange} required accept="image/*" className="w-full px-4 py-2 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          {formData.paymentProof && <p className="text-sm text-green-600 mt-1">File: {formData.paymentProof.name}</p>}

          <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} rows={3} className="w-full px-4 py-2 border rounded-md" placeholder="Contoh: Transfer dari rekening a.n. Budi" />

          <button type="submit" className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all">
            Kirim ke WhatsApp
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          Konfirmasi akan langsung masuk ke WhatsApp admin.
        </p>
      </div>
    </div>
  );
}
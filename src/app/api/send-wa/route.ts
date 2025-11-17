// src/app/api/send-wa/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      buyerPhone,
      adminPhone,
      orderId,
      orderDate,
      product,
      total,
      ongkir,
      shipping,
      bank,
      customer,
      wa,
      email,
      address,
      status,
      pdfUrl,
    } = data;

    const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
    const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

    if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
      return NextResponse.json({ error: "Missing WhatsApp credentials" }, { status: 500 });
    }

    const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

    // DETEKSI LOKAL
    const isLocal = buyerPhone.startsWith("628") || buyerPhone.startsWith("08");

    // PESAN ADMIN (selalu bahasa Indonesia)
    const adminMessage = `
ORDER ${orderId} (${orderDate}) — ORDER BARU MASUK!
🧩 Produk: ${product}
💰 Total: Rp ${total.toLocaleString("id-ID")}
📦 Ongkir: ${shipping} (+Rp ${ongkir.toLocaleString("id-ID")})
🏦 Bank: ${bank}
👤 Customer: ${customer}
📞 WA: ${wa}
📧 Email: ${email}
🏠 Alamat: ${address}
📄 Status: ${status}
📎 Invoice: ${pdfUrl}
`.trim();

    // PESAN BUYER — OTOMATIS BAHASA
    const buyerMessage = isLocal
      ? `
Order Berhasil! 
Invoice otomatis terkirim ke WhatsApp Anda.

Order ID: ${orderId}
Tanggal: ${orderDate}
Nama: ${customer}
WhatsApp: ${wa}
Produk: ${product}
Ongkir: ${shipping} (+Rp ${ongkir.toLocaleString("id-ID")})
Total: Rp ${total.toLocaleString("id-ID")}
Alamat: ${address}
Pembayaran: ${bank}
Status: ${status}

Silakan transfer & kirim bukti ke:
wa.me/${adminPhone}

Terima kasih! 
`.trim()
      : `
Order Successful! 
Your invoice has been sent to your WhatsApp.

Order ID: ${orderId}
Date: ${orderDate}
Name: ${customer}
WhatsApp: ${wa}
Product: ${product}
Shipping: ${shipping} (+Rp ${ongkir.toLocaleString("id-ID")})
Total: Rp ${total.toLocaleString("id-ID")}
Address: ${address}
Payment: ${bank}
Status: ${status}

Please transfer and send proof to:
wa.me/${adminPhone}

Thank you! 
`.trim();

    const sendTextMessage = async (to: string, message: string) => {
      const payload = {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: message },
      };
      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      console.log(`Text to ${to}:`, result);
      return result;
    };

    const sendDocument = async (to: string, documentUrl: string, filename: string) => {
      if (!documentUrl) {
        console.log(`No PDF URL, skipping document for ${to}`);
        return { skipped: true };
      }
      const payload = {
        messaging_product: "whatsapp",
        to,
        type: "document",
        document: { link: documentUrl, filename },
      };
      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      console.log(`PDF to ${to}:`, result);
      return result;
    };

    const [adminRes, buyerTextRes, buyerDocRes] = await Promise.all([
      sendTextMessage(adminPhone, adminMessage),
      sendTextMessage(buyerPhone, buyerMessage),
      sendDocument(buyerPhone, pdfUrl, `Invoice_${orderId}.pdf`),
    ]);

    console.log("WA SENDING COMPLETE:", { adminRes, buyerTextRes, buyerDocRes });

    return NextResponse.json({
      success: true,
      message: "WA sent to buyer & admin with PDF",
      adminRes,
      buyerTextRes,
      buyerDocRes,
      pdfUrl,
    });
  } catch (err: any) {
    console.error("send-wa error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
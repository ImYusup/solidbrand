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
      invoiceUrl, // ✅ rename biar konsisten
    } = data;

    const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
    const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

    if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
      return NextResponse.json({ error: "Missing WhatsApp credentials" }, { status: 500 });
    }

    const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

    // 🧾 Message to ADMIN
    const adminMessage = `
ORDER ${orderId} (${orderDate}) — ORDER BARU MASUK!
🧩 Produk: ${product}
💰 Total: Rp ${total.toLocaleString("id-ID")}
🚚 Ongkir: Rp ${ongkir} (${shipping})
🏦 Bank: ${bank}
👤 Customer: ${customer}
📞 WA: ${wa}
📧 Email: ${email}
🏠 Alamat: ${address}
📄 Status: ${status}

📎 PDF Invoice: ${invoiceUrl}

✅ Invoice terkirim ke buyer & tersimpan di Google Drive.
Data otomatis masuk Google Sheet "Transaksi".
    `.trim();

    // 🧾 Message to BUYER
    const buyerMessage = `
INVOICE ORDER ANDA
Order ID: ${orderId}
Produk: ${product}
Total: Rp ${total.toLocaleString("id-ID")}
Ongkir: Rp ${ongkir} (${shipping})
Bank Tujuan: ${bank}
Status: ${status}

File PDF invoice Anda 👇
${invoiceUrl}

Silakan kirim bukti transfer ke admin: wa.me/${adminPhone}
Terima kasih & semoga sehat selalu 💪
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
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("📩 WA Sent:", to, result);
      return result;
    };

    const [adminRes, buyerRes] = await Promise.all([
      sendTextMessage(adminPhone, adminMessage),
      sendTextMessage(buyerPhone, buyerMessage),
    ]);

    return NextResponse.json({ success: true, adminRes, buyerRes });
  } catch (err: any) {
    console.error("❌ send-wa error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

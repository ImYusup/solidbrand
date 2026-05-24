// src/app/api/send-wa/route.ts

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

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

    const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;
    const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID!;

    const url = `https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/messages`;

    // =========================
    // PHONE NORMALIZE
    // =========================
    const normalizePhone = (phone: string) => {
      let clean = phone.replace(/\D/g, "");
      if (clean.startsWith("0")) clean = "62" + clean.slice(1);
      return clean;
    };

    const buyerWA = normalizePhone(buyerPhone);
    const adminWA = normalizePhone(adminPhone);

    // =========================
    // DETEKSI REGION
    // =========================
    const isLocal = buyerWA.startsWith("62");

    // =========================
    // FORMAT CURRENCY
    // =========================
    const formatIDR = (val: any) =>
      Number(
        String(val)
          .replace(/Rp/gi, "")
          .replace(/\./g, "")
          .replace(/,/g, "")
          .replace(/\s/g, "")
      );

    const totalNumber = formatIDR(total);
    const ongkirNumber = formatIDR(ongkir);

    // =========================
    // ADMIN MESSAGE
    // =========================
    const adminMessage = `
ORDER ${orderId} (${orderDate}) — ORDER BARU MASUK!

🧩 Produk: ${product}
💰 Total: Rp ${totalNumber.toLocaleString("id-ID")}
📦 Ongkir: ${shipping} (+Rp ${ongkirNumber.toLocaleString("id-ID")})
🏦 Bank: ${bank}
👤 Customer: ${customer}
📞 WA: ${wa}
📧 Email: ${email}
🏠 Alamat: ${address}
📄 Status: ${status}

📎 Invoice:
${pdfUrl}
`.trim();

    // =========================
    // BUYER TEMPLATE (SESSION FREE / NEW NUMBER SAFE)
    // =========================
    const sendBuyerTemplate = async () => {
      const payload = {
        messaging_product: "whatsapp",
        to: buyerWA,
        type: "template",
        template: {
          name: isLocal ? "order_invoice_id" : "order_invoice_eg",
          language: {
            code: isLocal ? "id" : "en",
          },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: customer },
                { type: "text", text: orderId },
                {
                  type: "text",
                  text: `Rp ${totalNumber.toLocaleString("id-ID")}`,
                },
              ],
            },
          ],
        },
      };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      return res.json();
    };

    // =========================
    // BUYER SESSION MESSAGE (ORDER STATUS)
    // =========================
    const sendBuyerSessionMessage = async () => {
      const message = isLocal
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

      return fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: buyerWA,
          type: "text",
          text: { body: message },
        }),
      }).then((r) => r.json());
    };

    // =========================
    // ADMIN SEND
    // =========================
    const sendAdmin = async () => {
      return fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: adminWA,
          type: "text",
          text: { body: adminMessage },
        }),
      }).then((r) => r.json());
    };

    // =========================
    // PDF SEND
    // =========================
    const sendPDF = async () => {
      if (!pdfUrl) return { skipped: true };

      let directUrl = pdfUrl;

      if (pdfUrl.includes("drive.google.com")) {
        const match = pdfUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
        const fileId = match?.[1];

        if (fileId) {
          directUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
        }
      }

      const pdfRes = await fetch(directUrl);
      if (!pdfRes.ok) throw new Error("PDF download failed");

      const pdfBuffer = Buffer.from(await pdfRes.arrayBuffer());

      const formData = new FormData();
      formData.append("messaging_product", "whatsapp");
      formData.append(
        "file",
        new File([pdfBuffer], `Invoice_${orderId}.pdf`, {
          type: "application/pdf",
        })
      );

      const uploadRes = await fetch(
        `https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/media`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();

      if (!uploadData.id) {
        throw new Error(JSON.stringify(uploadData));
      }

      const mediaId = uploadData.id;

      return fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: buyerWA,
          type: "document",
          document: {
            id: mediaId,
            filename: `Invoice_${orderId}.pdf`,
            caption: `Invoice ${orderId}\nTotal: Rp ${totalNumber.toLocaleString("id-ID")}\nThank You!`,
          },
        }),
      }).then((r) => r.json());
    };

    // =========================
    // FLOW FINAL
    // =========================

    const adminRes = await sendAdmin();

    const templateRes = await sendBuyerTemplate();

    await new Promise((r) => setTimeout(r, 1500));

    const sessionRes = await sendBuyerSessionMessage();

    await new Promise((r) => setTimeout(r, 1500));

    const pdfRes = await sendPDF();

    return NextResponse.json({
      success: true,
      adminRes,
      templateRes,
      sessionRes,
      pdfRes,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
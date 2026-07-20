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
      customer,
      wa,
      address,
      status,
      pdfUrl,
    } = data;

    console.log("========== SEND WA ==========");
    console.log({
      buyerPhone,
      adminPhone,
      orderId,
      pdfUrl,
    });
    console.log("=============================");

    const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;
    const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID!;

    if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
      return NextResponse.json({ error: "Missing WhatsApp credentials" }, { status: 500 });
    }

    const url = `https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/messages`;

    const normalizePhone = (phone: string): string => {
      let clean = phone.replace(/\D/g, "");
      if (clean.startsWith("0")) clean = "62" + clean.slice(1);
      return clean;
    };

    const buyerWA = normalizePhone(buyerPhone);
    const adminWA = normalizePhone(adminPhone);
    const waForLink = normalizePhone(wa || buyerPhone);

    // =========================
    // LOCAL / INTERNATIONAL DETECTION
    // =========================
    const isLocal = buyerWA.startsWith("62");

    const templateName = isLocal ? "lokal_order" : "asing_order";
    const languageCode = "en";

    const formatIDR = (val: any) => {
      const num = Number(String(val || 0).replace(/Rp/gi, "").replace(/[^0-9]/g, ""));
      return isNaN(num) ? 0 : num;
    };

    const totalNumber = formatIDR(total);

    console.log("PDF URL:", pdfUrl);

    // =========================
    // SEND TEXT MESSAGE
    // =========================
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
      console.log("TEXT RESULT:", result);
      return result;
    };

    // =========================
    // ADMIN TEMPLATE
    // =========================
    const sendAdminTemplate = async () => {
      const payload = {
        messaging_product: "whatsapp",
        to: adminWA,
        type: "template",
        template: {
          name: "admin_new_order",
          language: { code: "en" },
          components: [{
            type: "body",
            parameters: [
              { type: "text", text: orderId },
              { type: "text", text: orderDate },
              { type: "text", text: customer },
              { type: "text", text: product },
              { type: "text", text: totalNumber.toLocaleString("id-ID") },
              { type: "text", text: address },
              { type: "text", text: status },
              { type: "text", text: waForLink },
            ]
          }]
        }
      };

      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      console.log("ADMIN TEMPLATE RESULT:", result);
      return result;
    };

    // =========================
    // BUYER TEMPLATE
    // =========================
    const sendBuyerTemplate = async () => {
      const payload = {
        messaging_product: "whatsapp",
        to: buyerWA,
        type: "template",
        template: {
          name: templateName,
          language: { code: languageCode },
          components: [{
            type: "body",
            parameters: [
              { type: "text", text: customer },
              { type: "text", text: orderId },
              { type: "text", text: orderDate },
              { type: "text", text: customer },
              { type: "text", text: product },
              { type: "text", text: totalNumber.toLocaleString("id-ID") },
              { type: "text", text: address },
              { type: "text", text: status },
              {
                type: "text",
                text: pdfUrl || "-",
              }
            ]
          }]
        }
      };

      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      console.log(`BUYER TEMPLATE (${isLocal ? 'LOCAL' : 'INTERNATIONAL'}) RESULT:`, result);
      return result;
    };

    // =========================
    // FINAL FLOW - NEW ORDER
    // =========================
    console.log("🚀 Starting WA flow - New Order");

    // 1. Admin
    console.log("📨 SEND TEMPLATE → ADMIN");
    await sendAdminTemplate();

    if (pdfUrl) {
      await new Promise(r => setTimeout(r, 1000));
      await sendTextMessage(adminWA, `📎 Invoice Baru\nOrder ID: ${orderId}\n${pdfUrl}`);
    }

    // 2. Buyer Template
    console.log("📨 SEND TEMPLATE → BUYER");

    await new Promise((r) => setTimeout(r, 1500));

    await sendBuyerTemplate();

    return NextResponse.json({
      success: true,
      pdfUrl,
    });

  } catch (err: any) {
    console.error("SEND WA ERROR:", err);
    return NextResponse.json({ error: err?.message || "UNKNOWN_ERROR" }, { status: 500 });
  }

}
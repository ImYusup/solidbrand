// src/app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID!;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN!;

/**
 * =========================================================
 *  ✅ VERIFY WEBHOOK (GET)
 * =========================================================
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    console.log("🔍 WEBHOOK VERIFY:", { mode, token });

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ WEBHOOK VERIFIED SUCCESS");
      return new Response(challenge, { status: 200 });
    }

    return new Response("Verification failed", { status: 403 });
  } catch (err) {
    console.error("GET webhook error:", err);
    return new Response("Error", { status: 500 });
  }
}

/**
 * =========================================================
 *  ✅ HANDLE INCOMING WEBHOOK (POST)
 * =========================================================
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📩 WEBHOOK RECEIVED");

    const value = body?.entry?.[0]?.changes?.[0]?.value;

    if (!value) {
      return NextResponse.json({ ok: true });
    }

    // === 1. DELIVERY STATUS ===
    if (value?.statuses?.length) {
      const s = value.statuses[0];
      console.log(`📦 STATUS: ${s.status} | Recipient: ${s.recipient_id}`);
      if (s.errors?.length) {
        console.error("❌ ERROR:", JSON.stringify(s.errors, null, 2));
      }
      return NextResponse.json({ ok: true });
    }

    const msg = value?.messages?.[0];
    if (!msg) return NextResponse.json({ ok: true });

    const from = msg.from;
    const type = msg.type;

    // === 2. HANDLE BUTTON CLICK (Invoice PDF) ===
    let buttonTitle = "";
    let payload = "";

    if (msg.interactive?.button_reply) {
      buttonTitle = msg.interactive.button_reply.title || "";
      payload = msg.interactive.button_reply.id || "";
    } else if (msg.button) {
      buttonTitle = msg.button.text || "";
      payload = msg.button.payload || "";
    }

    console.log("Button clicked:", { title: buttonTitle, payload, from });

    if (buttonTitle === "Invoice PDF" || buttonTitle.toLowerCase().includes("invoice pdf")) {
      console.log("🖱️ BUYER KLIK INVOICE PDF!");

      // Ambil order terbaru buyer ini (kamu harus punya logic ini)
      // Untuk sementara, kita pakai dummy atau kirim request dengan orderId kosong dulu
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-wa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerPhone: from,
          adminPhone: "6281289066999",
          orderId: "LATEST",   // atau logic ambil order terbaru
          pdfUrl: "",
          sendPdf: true,
        }),
      });

      return NextResponse.json({ ok: true, pdfTriggered: true });
    }

    // === 3. Text Message (Auto Reply) ===
    if (type === "text") {
      const text = msg.text?.body || "";
      console.log(`💬 TEXT FROM ${from}: ${text}`);

      // Optional: Auto reply
      // await sendAutoReply(from, text);
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("🔥 WEBHOOK ERROR:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID!;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN!;

/**
 * ✅ Verifikasi Webhook (GET)
 * Meta akan mengirimkan ?hub.mode, ?hub.verify_token, ?hub.challenge
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    console.log("🔍 VERIFY REQUEST:", { mode, token, challenge });

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ WEBHOOK VERIFIED SUCCESS");
      return new Response(challenge, { status: 200 });
    } else {
      console.warn("❌ Verification failed");
      return new Response("Verification failed", { status: 403 });
    }
  } catch (err) {
    console.error("🔥 GET webhook error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

/**
 * ✅ Handle pesan masuk (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("📩 Incoming webhook:", JSON.stringify(body, null, 2));

    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];

    if (!message) {
      console.log("⚠️ No message found in webhook payload");
      return NextResponse.json({ status: "No message" });
    }

    const from = message.from;
    const type = message.type;

    if (type === "text") {
      const text = message.text?.body;
      console.log(`💬 Text from ${from}: ${text}`);

      // ✅ Kirim balasan ke WhatsApp
      const res = await fetch(
        `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: from,
            type: "text",
            text: {
              body: `Halo ${from}! Terima kasih sudah menghubungi kami 🙌`,
            },
          }),
        }
      );

      const data = await res.json();
      console.log("📤 Reply sent:", data);
    }

    return NextResponse.json({ status: "OK" });
  } catch (err) {
    console.error("🔥 POST webhook error:", err);
    return NextResponse.json({ status: "Error", message: String(err) }, { status: 500 });
  }
}

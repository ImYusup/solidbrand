// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID!;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN!;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  } else {
    return new Response("Verification failed", { status: 403 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("📩 Incoming webhook:", JSON.stringify(body, null, 2));

  const entry = body.entry?.[0];
  const changes = entry?.changes?.[0];
  const message = changes?.value?.messages?.[0];

  if (!message) return NextResponse.json({ status: "No message" });

  const from = message.from;
  const type = message.type;

  if (type === "text") {
    const text = message.text?.body;
    console.log(`📨 Text from ${from}: ${text}`);

    // ✅ Kirim balasan ke WhatsApp
    await fetch(`https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: from,
        type: "text",
        text: { body: "Halo! Terima kasih sudah menghubungi kami 🙌" },
      }),
    });
  }

  return NextResponse.json({ status: "OK" });
}
// src/app/api/send-wa/route.ts
import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID!;

export async function POST(req: NextRequest) {
  try {
    const { to, message } = await req.json();

    if (!to || !message) {
      return NextResponse.json({ error: "Missing 'to' or 'message'" }, { status: 400 });
    }

    const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

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

    // ✅ Log response for debugging
    console.log("📡 WhatsApp API Response:", result);

    if (res.ok) {
      return NextResponse.json({ success: true, result });
    } else {
      return NextResponse.json({ success: false, error: result }, { status: res.status });
    }
  } catch (err: any) {
    console.error("❌ send-wa error:", err);
    return NextResponse.json({ error: "Internal Server Error", detail: err.message }, { status: 500 });
  }
}
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

    console.log("🔍 WEBHOOK VERIFY REQUEST:", { mode, token, challenge });

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ WEBHOOK VERIFIED SUCCESS");
      return new Response(challenge, { status: 200 });
    }

    console.warn("❌ WEBHOOK VERIFICATION FAILED");
    return new Response("Verification failed", { status: 403 });
  } catch (err) {
    console.error("🔥 GET webhook error:", err);
    return new Response("Internal Server Error", { status: 500 });
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
    console.log("📩 Incoming webhook:", JSON.stringify(body, null, 2));

    const entry = body.entry?.[0];
    const change = entry?.changes?.[0];
    const messages = change?.value?.messages?.[0];

    if (!messages) {
      console.log("⚠️ No message found in payload");
      return NextResponse.json({ status: "no_message" });
    }

    const from = messages.from;
    const type = messages.type;

    // ================================
    //  📨 Text Message Received
    // ================================
    if (type === "text") {
      const text = messages.text?.body;
      console.log(`💬 TEXT FROM ${from}:`, text);

      // 🔥 SEND AUTO REPLY
      const reply = await fetch(
        `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
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
              body: `Halo! Terima kasih sudah menghubungi kami 🙌\nPesanmu: "${text}"`,
            },
          }),
        }
      );

      const replyResult = await reply.json();
      console.log("📤 Reply sent:", replyResult);
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("🔥 POST webhook error:", err);
    return NextResponse.json(
      { status: "error", message: String(err) },
      { status: 500 }
    );
  }
}

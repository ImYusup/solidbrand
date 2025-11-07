// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = "yusup-bot-verification";

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
  return NextResponse.json({ status: "OK" });
}
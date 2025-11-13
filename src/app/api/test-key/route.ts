// src/app/api/test-key/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  try {
    const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (!key) throw new Error("No private key found in env");

    crypto.createPrivateKey({ key, format: "pem" });

    return NextResponse.json({ success: true, message: "✅ Private key valid" });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
}

// src/app/api/paypal/capture-order/route.ts
import { NextResponse } from "next/server";

const MODE = (process.env.PAYPAL_MODE || "sandbox").toLowerCase();
const PAYPAL = MODE === "live"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

async function getToken() {
  const client = process.env.PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_CLIENT_SECRET!;

  const basic = Buffer.from(`${client}:${secret}`).toString("base64");

  const res = await fetch(`${PAYPAL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const j = await res.json();
  return j.access_token;
}

export async function POST(req: Request) {
  const { orderID } = await req.json();

  const token = await getToken();

  const res = await fetch(`${PAYPAL}/v2/checkout/orders/${orderID}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return NextResponse.json({ data });
}

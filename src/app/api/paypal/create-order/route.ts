// src/app/api/paypal/create-order/route.ts
import { NextResponse } from "next/server";
export const runtime = "nodejs";

const MODE = (process.env.PAYPAL_MODE || "sandbox").toLowerCase();
const PAYPAL = MODE === "live"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

function getCred() {
  return MODE === "live"
    ? {
        clientId: process.env.PAYPAL_CLIENT_ID!,
        clientSecret: process.env.PAYPAL_CLIENT_SECRET!,
      }
    : {
        clientId: process.env.PAYPAL_SANDBOX_CLIENT_ID!,
        clientSecret: process.env.PAYPAL_SANDBOX_CLIENT_SECRET!,
      };
}

async function getToken() {
  const { clientId, clientSecret } = getCred();
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(`${PAYPAL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const json = await res.json();
  return json.access_token;
}

export async function POST(req: Request) {
  try {
    const { amount, currency = "USD" } = await req.json();

    const token = await getToken();

    const orderRes = await fetch(`${PAYPAL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: { value: amount, currency_code: currency },
          },
        ],
      }),
    });

    const data = await orderRes.json();

    if (!orderRes.ok) {
      return NextResponse.json({ error: data }, { status: 500 });
    }

    return NextResponse.json({ orderID: data.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

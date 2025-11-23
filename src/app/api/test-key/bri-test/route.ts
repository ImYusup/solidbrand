// src/app/api/bri-test/route.ts
import { NextResponse } from "next/server";
import { getBriToken } from "@/utils/getBriToken";

export async function GET() {
  try {
    const token = await getBriToken();
    return NextResponse.json({ success: true, token });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

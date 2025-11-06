// app/api/shipping/city/[provinceId]/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_KEY = "p26fMbua8cec38f853fecb50BTmJIFKj";

export async function GET(req: NextRequest, context: { params: { provinceId: string } }) {
  const provinceId = context.params.provinceId;

  if (!provinceId || isNaN(Number(provinceId))) {
    return NextResponse.json({ success: false, error: "Invalid Province ID" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://rajaongkir.komerce.id/api/v1/destination/city/${provinceId}`,
      {
        headers: { key: API_KEY },
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("RajaOngkir City Error:", err);
      return NextResponse.json({ success: false, error: "API Error" }, { status: 500 });
    }

    const data = await response.json();

    if (data.meta?.code !== 200 || !data.data) {
      return NextResponse.json({ success: false, error: "No cities" }, { status: 400 });
    }

    const cities = data.data.map((c: any) => ({
      id: c.id,
      name: c.name,
    }));

    return NextResponse.json({ success: true, cities });
  } catch (error: any) {
    console.error("Server Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
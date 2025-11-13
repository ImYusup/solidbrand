// src/app/api/send-sheet/route.ts
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      orderId,
      orderDate,
      product,
      total,
      ongkir,
      shipping,
      bank,
      customer,
      wa,
      email,
      address,
      status,
      quantity,
    } = data;

    if (!orderId || !customer || !product) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (orderId/customer/product)" },
        { status: 400 }
      );
    }

    // Env
    const SHEET_ID = process.env.SHEET_ID;
    const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

    if (!SHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      return NextResponse.json(
        { success: false, error: "Missing SHEET_ID / GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY env vars" },
        { status: 500 }
      );
    }

    // Auth
    const auth = new google.auth.JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const sheetName = "transaksi";

    // Get number of existing rows (biar nambah di bawah tanpa ngerusak dropdown)
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${sheetName}!A:A`,
    });
    const nextRow = (existing.data.values?.length ?? 1) + 1;

    // Normalize
    const qty = Number.isFinite(Number(quantity)) ? Number(quantity) : 1;
    const statusBayar = status?.trim() || "Belum Dibayar"; // harus sama persis dg dropdown
    const statusKirim = "Belum Diproses"; // sesuai dropdown default

    const values = [
      [
        orderId,
        orderDate || "",
        wa || "",
        customer,
        product,
        qty,
        total ?? "",
        bank ?? "",
        address || "",
        statusBayar,
        statusKirim,
        "JNEXXX",
        new Date().toLocaleString("id-ID"),
      ],
    ];

    // Append values (pakai USER_ENTERED agar dropdown tetap hidup)
    const appendRes = await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${sheetName}!A${nextRow}:N${nextRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });

    // Reformat: non-bold, align left
    try {
      const meta = await sheets.spreadsheets.get({
        spreadsheetId: SHEET_ID,
        includeGridData: false,
      });

      const sheet = meta.data.sheets?.find((s) => s.properties?.title === sheetName);
      if (sheet?.properties?.sheetId != null) {
        const sheetId = sheet.properties.sheetId;

        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SHEET_ID,
          requestBody: {
            requests: [
              {
                repeatCell: {
                  range: {
                    sheetId,
                    startRowIndex: nextRow - 1,
                    endRowIndex: nextRow,
                    startColumnIndex: 0,
                    endColumnIndex: 14,
                  },
                  cell: {
                    userEnteredFormat: {
                      horizontalAlignment: "LEFT",
                      textFormat: { bold: false },
                    },
                  },
                  fields: "userEnteredFormat(horizontalAlignment,textFormat.bold)",
                },
              },
            ],
          },
        });
      }
    } catch (fmtErr) {
      console.warn("⚠️ send-sheet: formatting step failed:", fmtErr);
    }

    return NextResponse.json({
      success: true,
      message: "✅ Data berhasil ditambahkan ke Google Sheet (dropdown preserved)",
      response: appendRes.data,
    });
  } catch (err: any) {
    console.error("❌ send-sheet error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Sheet error" },
      { status: 500 }
    );
  }
}

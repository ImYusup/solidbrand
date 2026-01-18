// src/app/api/upload-paid-invoice/route.ts
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const orderId = formData.get("orderId") as string | null;

    if (!file || !orderId) {
      return NextResponse.json({ success: false, error: "Missing file or orderId" }, { status: 400 });
    }

    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON!);
    const token = JSON.parse(process.env.GOOGLE_TOKEN_JSON!);
    const { client_secret, client_id, redirect_uris } = credentials.installed;

    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials(token);

    const drive = google.drive({ version: "v3", auth: oAuth2Client });

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const folderId = process.env.GOOGLE_FOLDER_INVOICE_PAID || null;

    const uploadRes = await drive.files.create({
      requestBody: {
        name: `Invoice_PAID_${orderId}.pdf`,
        mimeType: "application/pdf",
        ...(folderId ? { parents: [folderId] } : {}),
      },
      media: { mimeType: "application/pdf", body: stream },
      fields: "id, name, webContentLink",
    });

    await drive.permissions.create({
      fileId: uploadRes.data.id!,
      requestBody: { role: "reader", type: "anyone" },
    });

    return NextResponse.json({
      success: true,
      invoiceUrl: uploadRes.data.webContentLink,
    });
  } catch (err: any) {
    console.error("❌ upload-paid-invoice error:", err);
    return NextResponse.json({ success: false, error: err.message || "Upload failed" }, { status: 500 });
  }
}
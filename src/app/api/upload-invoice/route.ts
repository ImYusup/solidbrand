// src/app/api/upload-invoice/route.ts
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";
import fs from "fs";
import { getGoogleAuthFiles } from "@/lib/googleAuth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const orderId = formData.get("orderId") as string | null;

    if (!file || !orderId) {
      return NextResponse.json(
        { success: false, error: "Missing file or orderId" },
        { status: 400 }
      );
    }

    /**
     * 🔐 LOAD GOOGLE AUTH FILES (FROM VERCEL ENV → /tmp)
     */
    const { credentialsPath, tokenPath } = getGoogleAuthFiles();

    const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf-8"));
    const token = JSON.parse(fs.readFileSync(tokenPath, "utf-8"));

    const { client_secret, client_id, redirect_uris } =
      credentials.installed;

    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    oAuth2Client.setCredentials(token);

    const drive = google.drive({
      version: "v3",
      auth: oAuth2Client,
    });

    /**
     * 📄 PREPARE PDF STREAM
     */
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const folderId = process.env.GOOGLE_FOLDER_INVOICE_UNPAID || undefined;

    /**
     * ⬆️ UPLOAD PDF
     */
    const uploadRes = await drive.files.create({
      requestBody: {
        name: `Invoice_${orderId}.pdf`,
        mimeType: "application/pdf",
        ...(folderId ? { parents: [folderId] } : {}),
      },
      media: {
        mimeType: "application/pdf",
        body: stream,
      },
      fields: "id, name",
    });

    const fileId = uploadRes.data.id!;
    
    /**
     * 🌍 SET PUBLIC ACCESS (WA CAN DOWNLOAD)
     */
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const directDownloadUrl = `https://drive.google.com/uc?id=${fileId}&export=download`;

    console.log("PDF uploaded:", {
      fileId,
      directDownloadUrl,
    });

    return NextResponse.json({
      success: true,
      invoiceUrl: directDownloadUrl,
      fileId,
    });
  } catch (err: any) {
    console.error("upload-invoice error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}

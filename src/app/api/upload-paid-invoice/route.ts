// src/app/api/upload-paid-invoice/route.ts
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";
import jsPDF from "jspdf";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orderId,
      billing = {},
      items = [],
      subtotal = 0,
      shipping = { cost: 0, method: "N/A" },
      total = 0,
      bank = {},
      date,
    } = body;

    if (!orderId) {
      return NextResponse.json({ success: false, error: "Missing orderId" }, { status: 400 });
    }

    console.log("[upload-paid-invoice] Data:", { orderId, total });

    const pdf = new jsPDF("p", "mm", "a4");
    let y = 20;

    pdf.setFontSize(20);
    pdf.text("INVOICE PAID", 105, y, { align: "center" });
    y += 15;

    pdf.setFontSize(12);
    pdf.text(`www.solidbrand.id`, 105, y, { align: "center" });
    y += 10;

    pdf.line(10, y, 200, y);
    y += 10;

    pdf.text(`Order ID: ${orderId}`, 10, y);
    y += 8;
    pdf.text(`Tanggal: ${date || "N/A"}`, 10, y);
    y += 8;
    pdf.text(`Nama: ${billing.firstName || ""} ${billing.lastName || ""}`, 10, y);
    y += 8;
    pdf.text(`HP: ${billing.phone || "N/A"}`, 10, y);
    y += 8;
    pdf.text(`Alamat: ${billing.street || ""}`, 10, y);
    y += 15;

    pdf.setFontSize(14);
    pdf.text("Item", 10, y);
    pdf.text("Qty", 100, y);
    pdf.text("Harga", 140, y);
    y += 8;

    items.forEach((item: any) => {
      pdf.text(item.title || "N/A", 10, y);
      pdf.text(item.quantity?.toString() || "1", 100, y);
      pdf.text(`Rp ${Number(item.price || 0).toLocaleString()}`, 140, y);
      y += 8;
    });

    y += 5;
    pdf.text("TOTAL", 10, y);
    pdf.text(`Rp ${Number(total).toLocaleString()}`, 140, y);

    y += 15;
    pdf.text("Status: Dibayar", 10, y);
    y += 8;
    pdf.text(`Transfer ke: ${bank.bank || "N/A"} - ${bank.account || "N/A"} a.n. ${bank.name || "N/A"}`, 10, y);

    const pdfBlob = pdf.output("blob");

    // Upload ke Drive
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON!);
    const token = JSON.parse(process.env.GOOGLE_TOKEN_JSON!);
    const { client_secret, client_id, redirect_uris } = credentials.installed;

    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials(token);

    const drive = google.drive({ version: "v3", auth: oAuth2Client });

    const buffer = Buffer.from(await pdfBlob.arrayBuffer());
    const stream = Readable.from(buffer);

    const folderId = process.env.GOOGLE_FOLDER_INVOICE_PAID;

    const uploadRes = await drive.files.create({
      requestBody: {
        name: `Invoice_PAID_${orderId}.pdf`,
        mimeType: "application/pdf",
        parents: folderId ? [folderId] : undefined,
      },
      media: { mimeType: "application/pdf", body: stream },
      fields: "id, name, webContentLink",
    });

    await drive.permissions.create({
      fileId: uploadRes.data.id!,
      requestBody: { role: "reader", type: "anyone" },
    });

    const invoiceUrl = uploadRes.data.webContentLink;

    return NextResponse.json({
      success: true,
      invoiceUrl,
    });
  } catch (err: any) {
    console.error("[upload-paid-invoice] ERROR:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
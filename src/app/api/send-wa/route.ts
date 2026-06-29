// src/app/api/send-wa/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      buyerPhone,
      adminPhone,
      orderId,
      orderDate,
      product,
      total,
      customer,
      wa,
      address,
      status,
      pdfUrl,
    } = data;

    const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;
    const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID!;

    if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
      return NextResponse.json({ error: "Missing WhatsApp credentials" }, { status: 500 });
    }

    const url = `https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/messages`;

    const normalizePhone = (phone: string): string => {
      let clean = phone.replace(/\D/g, "");
      if (clean.startsWith("0")) clean = "62" + clean.slice(1);
      return clean;
    };

    const buyerWA = normalizePhone(buyerPhone);
    const adminWA = normalizePhone(adminPhone);
    const waForLink = normalizePhone(wa || buyerPhone);

    // =========================
    // LOCAL / INTERNATIONAL DETECTION
    // =========================
    const isLocal = buyerWA.startsWith("62");

    const templateName = isLocal ? "invoice_order_xx" : "invoice_order_en";
    const languageCode = "en"; // keduanya pakai English di Meta

    const formatIDR = (val: any) => {
      const num = Number(String(val || 0).replace(/Rp/gi, "").replace(/[^0-9]/g, ""));
      return isNaN(num) ? 0 : num;
    };

    const totalNumber = formatIDR(total);

    // =========================
    // LANGUAGE MESSAGES
    // =========================

    type Lang = "id" | "en";

    const MESSAGES = {
      id: {
        pdfCaption: (
          orderId: string,
          total: number
        ) =>
          `✅ Invoice ${orderId} - SolidBrand
Total: Rp ${total.toLocaleString("id-ID")}
Terima kasih telah berbelanja di SolidBrand 🙏`,

        failed: (
          orderId: string,
          pdfUrl: string
        ) =>
          `📄 Invoice ${orderId}

PDF gagal dikirim via WhatsApp.
Silakan download manual:
${pdfUrl}`,
      },

      en: {
        pdfCaption: (
          orderId: string,
          total: number
        ) =>
          `✅ Invoice ${orderId} - SolidBrand
Total: Rp ${total.toLocaleString("en-US")}
Thank you for shopping at SolidBrand 🙏`,

        failed: (
          orderId: string,
          pdfUrl: string
        ) =>
          `📄 Invoice ${orderId}

Failed to send PDF via WhatsApp.
Please download here:
${pdfUrl}`,
      },
    } satisfies Record<
      Lang,
      {
        pdfCaption: (
          orderId: string,
          total: number
        ) => string;

        failed: (
          orderId: string,
          pdfUrl: string
        ) => string;
      }
    >;

    // =========================
    // SEND TEXT MESSAGE
    // =========================
    const sendTextMessage = async (to: string, message: string) => {
      const payload = {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: message },
      };
      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      console.log("TEXT RESULT:", result);
      return result;
    };

    // =========================
    // ADMIN TEMPLATE
    // =========================
    const sendAdminTemplate = async () => {
      const payload = {
        messaging_product: "whatsapp",
        to: adminWA,
        type: "template",
        template: {
          name: "admin_new_order",
          language: { code: "en" },
          components: [{
            type: "body",
            parameters: [
              { type: "text", text: orderId },
              { type: "text", text: orderDate },
              { type: "text", text: customer },
              { type: "text", text: product },
              { type: "text", text: totalNumber.toLocaleString("id-ID") },
              { type: "text", text: address },
              { type: "text", text: status },
              { type: "text", text: waForLink },
            ]
          }]
        }
      };

      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      console.log("ADMIN TEMPLATE RESULT:", result);
      return result;
    };

    // =========================
    // BUYER TEMPLATE
    // =========================
    const sendBuyerTemplate = async () => {
      const payload = {
        messaging_product: "whatsapp",
        to: buyerWA,
        type: "template",
        template: {
          name: templateName,
          language: { code: languageCode },
          components: [{
            type: "body",
            parameters: [
              { type: "text", text: customer },
              { type: "text", text: orderId },
              { type: "text", text: orderDate },
              { type: "text", text: customer },
              { type: "text", text: product },
              { type: "text", text: totalNumber.toLocaleString("id-ID") },
              { type: "text", text: address },
              { type: "text", text: status },
            ]
          }]
        }
      };

      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      console.log(`BUYER TEMPLATE (${isLocal ? 'LOCAL' : 'INTERNATIONAL'}) RESULT:`, result);
      return result;
    };

    // =========================
    // SEND PDF
    // =========================
    const sendPDF = async () => {
      if (!pdfUrl) return null;

      let directUrl = pdfUrl;

      if (
        pdfUrl.includes(
          "drive.google.com"
        )
      ) {
        const fileId =
          pdfUrl.match(
            /\/d\/([a-zA-Z0-9_-]+)/
          )?.[1] ||
          pdfUrl.match(
            /[?&]id=([a-zA-Z0-9_-]+)/
          )?.[1];

        if (fileId) {
          directUrl =
            `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
        }
      }

      const pdfRes =
        await fetch(directUrl);

      if (!pdfRes.ok) {
        throw new Error(
          "PDF_DOWNLOAD_FAILED"
        );
      }

      const pdfBuffer =
        Buffer.from(
          await pdfRes.arrayBuffer()
        );

      const form =
        new FormData();

      form.append(
        "messaging_product",
        "whatsapp"
      );

      form.append(
        "file",
        new File(
          [pdfBuffer],
          `Invoice_${orderId}.pdf`,
          {
            type:
              "application/pdf",
          }
        )
      );

      const uploadRes =
        await fetch(
          `https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/media`,
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${ACCESS_TOKEN}`,
            },

            body: form,
          }
        );

      const upload =
        await uploadRes.json();

      if (!upload.id) {
        throw new Error(
          JSON.stringify(upload)
        );
      }

      const lang: Lang =
        isLocal
          ? "id"
          : "en";

      const sendRes =
        await fetch(url, {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${ACCESS_TOKEN}`,

            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({
              messaging_product:
                "whatsapp",

              to:
                buyerWA,

              type:
                "document",

              document: {
                id:
                  upload.id,

                filename:
                  `Invoice_${orderId}.pdf`,

                caption:
                  MESSAGES[
                    lang
                  ].pdfCaption(
                    orderId,
                    totalNumber
                  ),
              },
            }),
        });

      const result =
        await sendRes.json();

      if (
        !sendRes.ok ||
        !result.messages
      ) {
        throw new Error(
          result?.error
            ?.message ||
          "SEND_DOCUMENT_FAILED"
        );
      }

      return result;
    };

    // =========================
    // FINAL FLOW
    // =========================

    console.log(
      "🚀 Starting WA flow"
    );

    await sendAdminTemplate();

    if (pdfUrl) {
      await new Promise(
        r =>
          setTimeout(
            r,
            1500
          )
      );

      await sendTextMessage(
        adminWA,

        `📎 Invoice Order ${orderId}
${pdfUrl}`
      );
    }

    await sendBuyerTemplate();

    await new Promise(
      r =>
        setTimeout(
          r,
          12000
        )
    );

    let pdfResult = null;

    try {

      pdfResult =
        await sendPDF();

      console.log(
        "✅ PDF SENT"
      );

    } catch (
    err: any
    ) {

      console.error(
        err
      );

      if (
        pdfUrl
      ) {

        const lang: Lang =
          isLocal
            ? "id"
            : "en";

        await sendTextMessage(
          buyerWA,

          MESSAGES[
            lang
          ].failed(
            orderId,
            pdfUrl
          )
        );
      }
    }

    return NextResponse.json({
      success: true,
      pdfSent: !!pdfResult,
    });

  } catch (err: any) {

    console.error(
      "SEND WA ERROR:",
      err
    );

    return NextResponse.json(
      {
        error:
          err?.message ||
          "UNKNOWN_ERROR",
      },
      {
        status: 500,
      }
    );

  }

}
// src/app/api/send-wa/route.ts

import { NextRequest, NextResponse } from "next/server";

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
      ongkir,
      shipping,
      bank,
      customer,
      wa,
      email,
      address,
      status,
      pdfUrl,
    } = data;

    const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
    const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

    if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
      return NextResponse.json(
        { error: "Missing WhatsApp credentials" },
        { status: 500 }
      );
    }

    const url = `https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/messages`;

    // =========================
    // NORMALIZE PHONE
    // =========================
    const normalizePhone = (phone: string) => {
      let clean = phone.replace(/\D/g, "");

      if (clean.startsWith("08")) {
        clean = "62" + clean.slice(1);
      }

      return clean;
    };

    const buyerWA = normalizePhone(buyerPhone);
    const adminWA = normalizePhone(adminPhone);

    const parseCurrency = (value: any) => {
      if (!value) return 0;

      return Number(
        String(value)
          .replace(/Rp/gi, "")
          .replace(/\./g, "")
          .replace(/,/g, "")
          .replace(/\s/g, "")
          .trim()
      );
    };

    const totalNumber = parseCurrency(total);
    const ongkirNumber = parseCurrency(ongkir);

    // =========================
    // DETEKSI LOCAL / GLOBAL
    // =========================
    const isLocal =
      buyerWA.startsWith("62");

    // =========================
    // TEMPLATE CONFIG
    // =========================
    const templateName = isLocal
      ? "order_invoice_id"
      : "order_invoice_eg";

    const languageCode = "en";

    // =========================
    // ADMIN MESSAGE
    // =========================
    const adminMessage = `
ORDER ${orderId} (${orderDate}) — ORDER BARU MASUK!

🧩 Produk: ${product}
💰 Total: Rp ${totalNumber.toLocaleString("id-ID")}
📦 Ongkir: ${shipping} (+Rp ${ongkirNumber.toLocaleString("id-ID")})
🏦 Bank: ${bank}
👤 Customer: ${customer}
📞 WA: ${wa}
📧 Email: ${email}
🏠 Alamat: ${address}
📄 Status: ${status}

📎 Invoice:
${pdfUrl}
`.trim();

    // =========================
    // SEND ADMIN TEXT
    // =========================
    const sendTextMessage = async (
      to: string,
      message: string
    ) => {
      const payload = {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: {
          body: message,
        },
      };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      console.log(`Text to ${to}:`, result);

      return result;
    };

    // =========================
    // SEND BUYER TEMPLATE
    // =========================
    const sendTemplateMessage = async () => {
      const payload = {
        messaging_product: "whatsapp",
        to: buyerWA,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: languageCode,
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: customer,
                },
                {
                  type: "text",
                  text: orderId,
                },
                {
                  type: "text",
                  text: `Rp ${totalNumber.toLocaleString("id-ID")}`,
                },
              ],
            },
          ],
        },
      };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      console.log(`Template to ${buyerWA}:`, result);

      if (result.error) {
        throw new Error(
          `Template WA gagal: ${JSON.stringify(result.error)}`
        );
      }

      return result;
    };

    // =========================
    // SEND PDF DOCUMENT
    // =========================
    const sendDocument = async (
      to: string,
      pdfUrl: string,
      orderId: string
    ) => {
      if (!pdfUrl) {
        console.log(`No PDF URL, skipping document`);
        return { skipped: true };
      }

      try {
        let directUrl = pdfUrl;

        // =========================
        // GOOGLE DRIVE FIX
        // =========================
        if (pdfUrl.includes("drive.google.com")) {
          let fileId = null;

          const match1 = pdfUrl.match(
            /\/d\/([a-zA-Z0-9_-]+)/
          );

          const match2 = pdfUrl.match(
            /[?&]id=([a-zA-Z0-9_-]+)/
          );

          if (match1?.[1]) {
            fileId = match1[1];
          } else if (match2?.[1]) {
            fileId = match2[1];
          }

          if (!fileId) {
            throw new Error(
              `Tidak bisa extract Google Drive file ID`
            );
          }

          directUrl =
            `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
        }

        // =========================
        // DOWNLOAD PDF
        // =========================
        const pdfRes = await fetch(directUrl, {
          method: "GET",
          redirect: "follow",
          headers: {
            "User-Agent": "Mozilla/5.0",
          },
        });

        if (!pdfRes.ok) {
          throw new Error(
            `Gagal download PDF: ${pdfRes.status}`
          );
        }

        console.log("DIRECT URL:", directUrl);
        console.log("PDF STATUS:", pdfRes.status);
        console.log(
          "CONTENT TYPE:",
          pdfRes.headers.get("content-type")
        );

        const pdfBuffer = await pdfRes.arrayBuffer();

        // =========================
        // UPLOAD MEDIA META
        // =========================
        const formData = new FormData();

        formData.append(
          "messaging_product",
          "whatsapp"
        );

        formData.append(
          "file",
          new Blob([pdfBuffer], {
            type: "application/pdf",
          }),
          `Invoice_${orderId}.pdf`
        );

        const uploadRes = await fetch(
          `https://graph.facebook.com/v23.0/${PHONE_NUMBER_ID}/media`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: formData,
          }
        );

        const uploadData = await uploadRes.json();

        if (uploadData.error || !uploadData.id) {
          throw new Error(
            `Upload PDF gagal: ${JSON.stringify(uploadData)}`
          );
        }

        const mediaId = uploadData.id;

        console.log(
          `Media ID berhasil untuk ${to}:`,
          mediaId
        );

        // =========================
        // SEND DOCUMENT
        // =========================
        const payload = {
          messaging_product: "whatsapp",
          to,
          type: "document",
          document: {
            id: mediaId,
            filename: `Invoice_${orderId}.pdf`,
            caption:
              `Invoice ${orderId}\n` +
              `Total: Rp ${totalNumber.toLocaleString("id-ID")}\n\n` +
              `Thank you!\nSolidBrand`,
          },
        };

        const res = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await res.json();

        console.log(`PDF to ${to}:`, result);

        if (result.error) {
          throw new Error(
            `Kirim PDF gagal: ${JSON.stringify(result.error)}`
          );
        }

        return result;
      } catch (err: any) {
        console.error(
          `Error kirim PDF ke ${to}:`,
          err
        );

        return {
          error: err.message,
        };
      }
    };

    // =========================
    // EXECUTION FLOW
    // =========================

    // 1. ADMIN
    const adminRes = await sendTextMessage(
      adminWA,
      adminMessage
    );

    // 2. BUYER TEMPLATE
    const buyerTemplateRes =
      await sendTemplateMessage();

    // 3. DELAY
    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );

    // 4. BUYER PDF
    const buyerDocRes = await sendDocument(
      buyerWA,
      pdfUrl,
      orderId
    );

    console.log("WA SENDING COMPLETE:", {
      adminRes,
      buyerTemplateRes,
      buyerDocRes,
    });

    return NextResponse.json({
      success: true,
      message:
        "WA template & PDF sent successfully",
      adminRes,
      buyerTemplateRes,
      buyerDocRes,
      pdfUrl,
    });
  } catch (err: any) {
    console.error("send-wa error:", err);

    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
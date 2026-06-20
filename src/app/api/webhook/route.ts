// src/app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID!;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN!;

/**
 * =========================================================
 *  ✅ VERIFY WEBHOOK (GET)
 * =========================================================
 */
export async function GET(req: NextRequest) {
  try {

    const { searchParams } =
      new URL(req.url);

    const mode =
      searchParams.get("hub.mode");

    const token =
      searchParams.get(
        "hub.verify_token"
      );

    const challenge =
      searchParams.get(
        "hub.challenge"
      );

    console.log("======== VERIFY ========");

    console.log({
      mode,
      token,
      challenge,
      ENV_VERIFY:
        process.env.VERIFY_TOKEN
    });

    console.log(
      "MATCH:",
      token === process.env.VERIFY_TOKEN
    );

    if (
      mode === "subscribe" &&
      token === process.env.VERIFY_TOKEN
    ) {

      console.log(
        "✅ VERIFIED"
      );

      return new Response(
        challenge,
        {
          status: 200,
        }
      );

    }

    console.log(
      "❌ INVALID"
    );

    return new Response(
      "Verification failed",
      {
        status: 403,
      }
    );

  } catch (e) {

    console.error(e);

    return new Response(
      "ERROR",
      {
        status: 500,
      }
    );

  }
}

/**
 * =========================================================
 *  ✅ HANDLE INCOMING WEBHOOK (POST)
 * =========================================================
 */
export async function POST(
  req: NextRequest
) {
  try {

    console.log(
      "🔥 WEBHOOK HIT"
    );

    const body =
      await req.json();

    console.log(
      "🔥 BODY RECEIVED"
    );

    console.log(
      JSON.stringify(
        body,
        null,
        2
      )
    );

    const value =
      body
        ?.entry?.[0]
        ?.changes?.[0]
        ?.value;

    if (!value) {
      return NextResponse.json({
        ok: true,
      });
    }

    // ==================
    // DELIVERY STATUS
    // ==================

    if (value?.statuses?.length) {

      const s =
        value.statuses[0];

      console.log(
        "\n========================"
      );

      console.log(
        "📦 DELIVERY UPDATE"
      );

      console.log(
        "STATUS:",
        s.status
      );

      console.log(
        "MESSAGE ID:",
        s.id
      );

      console.log(
        "RECIPIENT:",
        s.recipient_id
      );

      console.log(
        "TIMESTAMP:",
        s.timestamp
      );

      console.log(
        "CONVERSATION:",
        s?.conversation?.id
      );

      console.log(
        "CATEGORY:",
        s?.conversation
          ?.origin
          ?.type
      );

      console.log(
        "PRICING:",
        s?.pricing
      );

      if (
        s.errors?.length
      ) {

        console.log(
          "❌ ERRORS:"
        );

        console.log(
          JSON.stringify(
            s.errors,
            null,
            2
          )
        );

      }

      if (
        s.status ===
        "failed"
      ) {

        console.log(
          "🚨 MESSAGE FAILED"
        );

      }

      if (
        s.status ===
        "sent"
      ) {

        console.log(
          "📤 SENT TO WHATSAPP"
        );

      }

      if (
        s.status ===
        "delivered"
      ) {

        console.log(
          "✅ DELIVERED"
        );

      }

      if (
        s.status ===
        "read"
      ) {

        console.log(
          "👀 READ"
        );

      }

      console.log(
        "========================\n"
      );

      return NextResponse.json({
        ok: true,
      });

    }

    const msg =
      value
        ?.messages?.[0];

    if (!msg) {

      return NextResponse.json({
        ok: true,
      });

    }

    const from =
      msg.from;

    const type =
      msg.type;

    // ==================
    // BUTTON CLICK
    // ==================

    let button =
      "";

    let payload =
      "";

    if (
      msg?.button
    ) {

      button =
        msg.button.text;

      payload =
        msg.button.payload;

    }

    if (
      msg
        ?.interactive
        ?.button_reply
    ) {

      button =
        msg
          .interactive
          .button_reply
          .title;

      payload =
        msg
          .interactive
          .button_reply
          .id;

    }

    if (
      button ===
      "Invoice PDF"
    ) {

      const clean =
        payload
          .replace(
            "invoice:",
            ""
          );

      const [
        orderId,
        ...rest
      ] =
        clean.split(
          "|"
        );

      const pdfUrl =
        rest.join(
          "|"
        );

      console.log(
        "SEND PDF:",
        orderId
      );

      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-wa`,
        {
          method:
            "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              {
                buyerPhone:
                  from,

                adminPhone:
                  "6281289066999",

                orderId,

                orderDate:
                  "-",

                customer:
                  "-",

                wa:
                  from,

                product:
                  "-",

                total:
                  "0",

                address:
                  "-",

                status:
                  "-",

                pdfUrl,

                sendPdf:
                  true,
              }
            ),
        }
      );

      return NextResponse.json({
        ok: true,
        pdfTriggered:
          true,
      });

    }

    // ==================
    // TEXT MESSAGE
    // ==================

    if (
      type ===
      "text"
    ) {

      console.log(
        "TEXT:",
        msg.text?.body
      );

    }

    return NextResponse.json({
      ok: true,
    });

  }

  catch (
  err
  ) {

    console.error(
      err
    );

    return NextResponse.json(
      {
        ok: false,
      },
      {
        status:
          500,
      }
    );

  }

}
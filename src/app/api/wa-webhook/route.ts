// src/app/api/wa-webhook/route.ts

import {
    NextRequest,
    NextResponse,
} from "next/server";

const VERIFY_TOKEN =
    process.env.VERIFY_TOKEN ||
    "solidbrand-verify-2025";

export async function GET(
    req: NextRequest
) {

    const url =
        new URL(req.url);

    const mode =
        url.searchParams.get(
            "hub.mode"
        );

    const token =
        url.searchParams.get(
            "hub.verify_token"
        );

    const challenge =
        url.searchParams.get(
            "hub.challenge"
        );

    if (
        mode === "subscribe" &&
        token === VERIFY_TOKEN
    ) {

        return new Response(
            challenge,
            {
                status: 200,
            }
        );

    }

    return new Response(
        "Forbidden",
        {
            status: 403,
        }
    );

}

export async function POST(
    req: NextRequest
) {

    try {

        const body =
            await req.json();

        console.log(
            "=== WA WEBHOOK ==="
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

        // =====================
        // DELIVERY STATUS
        // =====================

        if (
            value?.statuses?.length
        ) {

            const s =
                value.statuses[0];

            console.log(
                "================"
            );

            console.log(
                "WA STATUS"
            );

            console.log(
                "MESSAGE:",
                s?.id
            );

            console.log(
                "STATUS:",
                s?.status
            );

            console.log(
                "RECIPIENT:",
                s?.recipient_id
            );

            console.log(
                "ERROR:",
                JSON.stringify(
                    s?.errors ||
                    [],
                    null,
                    2
                )
            );

            console.log(
                "================"
            );

            return NextResponse.json({
                ok: true,
            });

        }
        
        // =====================
        // MESSAGE
        // =====================

        const msg =
            value
                ?.messages?.[0];

        if (!msg) {

            return NextResponse.json({
                ok: true,
            });

        }

        console.log(
            "=== MESSAGE ==="
        );

        console.log(
            JSON.stringify(
                msg,
                null,
                2
            )
        );

        const from =
            msg?.from;

        let buttonText =
            "";

        let payload =
            "";

        // TEMPLATE BUTTON
        if (
            msg?.button
        ) {

            buttonText =
                msg.button.text ||
                "";

            payload =
                msg.button.payload ||
                "";

        }

        // INTERACTIVE BUTTON
        if (
            msg
                ?.interactive
                ?.button_reply
        ) {

            buttonText =
                msg
                    .interactive
                    .button_reply
                    .title ||
                "";

            payload =
                msg
                    .interactive
                    .button_reply
                    .id ||
                "";

        }

        console.log(
            "FROM:",
            from
        );

        console.log(
            "BUTTON:",
            buttonText
        );

        console.log(
            "PAYLOAD:",
            payload
        );

        if (
            buttonText !==
            "Invoice PDF"
        ) {

            return NextResponse.json({
                ok: true,
                ignored: true,
            });

        }

        if (
            !payload
        ) {

            return NextResponse.json(
                {
                    ok: false,
                    error:
                        "PAYLOAD_NOT_FOUND",
                },
                {
                    status: 400,
                }
            );

        }

        const clean =
            String(
                payload
            )
                .replace(
                    "invoice:",
                    ""
                )
                .trim();

        const parts =
            clean.split(
                "|"
            );

        const orderId =
            parts[0]
                ?.trim();

        const pdfUrl =
            parts
                .slice(1)
                .join("|")
                .trim();

        if (
            !orderId
        ) {

            return NextResponse.json(
                {
                    ok: false,
                    error:
                        "ORDER_ID_NOT_FOUND",
                },
                {
                    status: 400,
                }
            );

        }

        if (
            !pdfUrl
        ) {

            return NextResponse.json(
                {
                    ok: false,
                    error:
                        "PDF_URL_NOT_FOUND",
                },
                {
                    status: 400,
                }
            );

        }

        console.log(
            "TRIGGER PDF:",
            orderId
        );

        const endpoint =
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-wa`;

        const send =
            await fetch(
                endpoint,
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

        const result =
            await send.json();

        console.log(
            "=== SEND WA RESULT ==="
        );

        console.log(
            JSON.stringify(
                result,
                null,
                2
            )
        );

        return NextResponse.json({

            ok:
                send.ok,

            orderId,

            pdfTriggered:
                true,

            pdfSent:
                result
                    ?.pdfSent ||
                false,

            response:
                result,

        });

    }

    catch (
    err: any
    ) {

        console.error(
            "WEBHOOK ERROR:",
            err
        );

        return NextResponse.json(
            {
                ok: false,
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
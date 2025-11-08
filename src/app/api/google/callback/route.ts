// src/app/api/google/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
    }

    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
    const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!;

    // Step 1 — Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return NextResponse.json({ error: tokenData }, { status: 500 });
    }

    const { access_token, refresh_token, expires_in } = tokenData;

    console.log("✅ Google Connected");
    console.log("Access Token:", access_token);
    console.log("Refresh Token:", refresh_token);
    console.log("Expires In:", expires_in);

    // Step 2 — Optional: Store refresh token somewhere persistent (DB, Firestore, Supabase, etc.)
    // For now, we return it plainly so we can see it works.
    return NextResponse.json({
      success: true,
      message: "Google OAuth Success",
      access_token,
      refresh_token,
      expires_in,
    });
  } catch (err: any) {
    console.error("❌ Google OAuth Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

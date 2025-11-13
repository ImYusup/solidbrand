// src/app/api/upload-invoice/test/route.ts
import { google } from "googleapis";

export async function GET() {
  try {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const drive = google.drive({ version: "v3", auth });
    const res = await drive.files.list({ pageSize: 1 });

    return Response.json({ success: true, files: res.data.files });
  } catch (err: any) {
    console.error("DRIVE TEST ERROR:", err);
    return Response.json({ success: false, error: err.message });
  }
}

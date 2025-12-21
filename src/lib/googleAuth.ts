// src/lib/googleAuth.ts
import fs from "fs";
import path from "path";

function writeJsonFromEnv(envKey: string, filename: string) {
  const base64 = process.env[envKey];
  if (!base64) {
    throw new Error(`${envKey} is not set`);
  }

  const json = Buffer.from(base64, "base64").toString("utf-8");
  const filePath = path.join("/tmp", filename);

  // overwrite aman (Vercel reuse container kadang)
  fs.writeFileSync(filePath, json, { encoding: "utf-8" });

  return filePath;
}

export function getGoogleAuthFiles() {
  return {
    credentialsPath: writeJsonFromEnv(
      "GOOGLE_CREDENTIALS_JSON_BASE64",
      "credentials.json"
    ),
    tokenPath: writeJsonFromEnv(
      "GOOGLE_TOKEN_JSON_BASE64",
      "token.json"
    ),
  };
}

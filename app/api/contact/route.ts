import { mkdir, open } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";

const MAX_BODY_BYTES = 4096;
const MAX_STORE_BYTES = 20 * 1024 * 1024;

async function readBody(request: Request): Promise<string | null> {
  const reader = request.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
    return new TextDecoder("utf-8", { fatal: true }).decode(Buffer.concat(chunks, size));
  } finally {
    reader.releaseLock();
  }
}

function bad(detail: string, status: number) {
  return NextResponse.json({ detail }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) return bad("Request origin is not allowed.", 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return bad("Content-Type must be application/json.", 415);
  const length = request.headers.get("content-length");
  if (length && (!/^\d+$/.test(length) || Number(length) > MAX_BODY_BYTES)) return bad("Request body exceeds the 4 KiB limit.", 413);

  let body: unknown;
  try {
    const text = await readBody(request);
    if (text === null) return bad("Request body exceeds the 4 KiB limit.", 413);
    body = JSON.parse(text);
  } catch {
    return bad("Request body must be valid UTF-8 JSON.", 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return bad("Request must be a JSON object.", 400);
  const input = body as Record<string, unknown>;
  if (Object.keys(input).some((key) => !["name", "email", "organization", "message"].includes(key))) return bad("Unexpected contact field.", 400);
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const organization = typeof input.organization === "string" ? input.organization.trim() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";
  if (name.length < 2 || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || organization.length > 120 || message.length < 20 || message.length > 4000) {
    return bad("Enter a valid name, email, and message between 20 and 4000 characters.", 422);
  }

  const configuredPath = process.env.CONTACT_STORE_PATH;
  if (!configuredPath || !path.isAbsolute(configuredPath)) return bad("The website inquiry inbox is not configured.", 503);
  const storePath = path.resolve(configuredPath);
  const publicPath = path.resolve(process.cwd(), "public") + path.sep;
  if (storePath.toLowerCase().startsWith(publicPath.toLowerCase())) return bad("The website inquiry inbox is misconfigured.", 503);

  let file;
  try {
    await mkdir(path.dirname(storePath), { recursive: true, mode: 0o700 });
    file = await open(storePath, "a", 0o600);
    const record = `${JSON.stringify({ received_at: new Date().toISOString(), name, email, organization, message })}\n`;
    if ((await file.stat()).size + Buffer.byteLength(record, "utf8") > MAX_STORE_BYTES) return bad("The website inquiry inbox needs maintenance.", 507);
    await file.chmod(0o600);
    await file.writeFile(record, "utf8");
    return NextResponse.json({ accepted: true }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch {
    return bad("The website could not save this inquiry.", 503);
  } finally {
    await file?.close();
  }
}

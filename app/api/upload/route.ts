import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidSession } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

const MAX_IMAGE = 10 * 1024 * 1024;
const MAX_VIDEO = 100 * 1024 * 1024;
const imageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const videoTypes = new Set(["video/mp4", "video/webm", "video/quicktime"]);

export async function POST(request: Request) {
  const token = (await cookies()).get("admin_session")?.value;
  if (!isValidSession(token)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "No file provided." }, { status: 400 });

    const isImage = imageTypes.has(file.type);
    const isVideo = videoTypes.has(file.type);
    if (!isImage && !isVideo) return NextResponse.json({ error: "Unsupported file type." }, { status: 415 });
    const limit = isImage ? MAX_IMAGE : MAX_VIDEO;
    if (file.size > limit) return NextResponse.json({ error: `File is too large. Maximum is ${isImage ? "10MB" : "100MB"}.` }, { status: 413 });

    const ext = path.extname(file.name).toLowerCase() || (isImage ? ".jpg" : ".mp4");
    const safeName = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${ext}`;
    const folder = isImage ? "images" : "videos";
    const dir = path.join(process.cwd(), "public", "uploads", folder);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, safeName), Buffer.from(await file.arrayBuffer()));

    return NextResponse.json({ url: `/uploads/${folder}/${safeName}`, type: isImage ? "image" : "video" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}

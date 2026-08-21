import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidSession } from "@/lib/auth";
import db from "@/lib/db";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = db.prepare("SELECT * FROM project_media WHERE project_id = ? ORDER BY sort_order ASC, id ASC").all(Number(id));
  return NextResponse.json(rows);
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const token = (await cookies()).get("admin_session")?.value;
  if (!isValidSession(token)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  if (!body.url || !["image", "video"].includes(body.type)) return NextResponse.json({ error: "Valid media url and type are required." }, { status: 400 });
  const result = db.prepare("INSERT INTO project_media (project_id,type,url,alt,sort_order) VALUES (?,?,?,?,?)").run(Number(id), body.type, body.url, body.alt || "", Number(body.sortOrder || 0));
  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}

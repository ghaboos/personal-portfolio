import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidSession } from "@/lib/auth";
import { deleteStoredMedia } from "@/lib/media-storage";
import db from "@/lib/db";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string; mediaId: string }> }) {
  const token = (await cookies()).get("admin_session")?.value;
  if (!isValidSession(token)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { id, mediaId } = await params;
  const media = db.prepare("SELECT * FROM project_media WHERE id = ? AND project_id = ?").get(Number(mediaId), Number(id)) as { id:number; url:string } | undefined;
  if (!media) return NextResponse.json({ error: "Media not found." }, { status: 404 });
  try { await deleteStoredMedia(media.url); } catch (error) { console.error("Storage delete failed", error); return NextResponse.json({ error: "Could not delete stored media." }, { status: 502 }); }
  db.prepare("DELETE FROM project_media WHERE id = ?").run(media.id);
  return NextResponse.json({ success: true });
}

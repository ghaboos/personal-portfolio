import { NextResponse } from "next/server";
import db from "@/lib/db";
import { updateProject, deleteProject } from "@/lib/projects";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const projectId = Number(id);
    if (!Number.isInteger(projectId)) return NextResponse.json({ error: "Invalid project id." }, { status: 400 });
    const body = await request.json();
    const result = updateProject(projectId, body);
    if (!result || result.changes === 0) return NextResponse.json({ error: "Project not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Could not update project." }, { status: 500 }); }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const projectId = Number(id);
    if (!Number.isInteger(projectId)) return NextResponse.json({ error: "Invalid project id." }, { status: 400 });
    const result = deleteProject(projectId);
    if (result.changes === 0) return NextResponse.json({ error: "Project not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Could not delete project." }, { status: 500 }); }
}

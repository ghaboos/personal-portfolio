import { NextResponse } from "next/server";
import { projects } from "@/data/projects";

export async function GET() {
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.title || !body.description) {
    return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
  }
  return NextResponse.json({
    message: "Project payload accepted. Database persistence will be enabled in the backend phase.",
    project: body,
  }, { status: 201 });
}

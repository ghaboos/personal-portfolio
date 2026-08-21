import { NextResponse } from "next/server";
import { getProjects, createProject } from "@/lib/projects";

export async function GET() {
  return NextResponse.json(getProjects());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.description) return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
    const slug = createProject({
      title: body.title,
      type: body.type || "",
      year: body.year || "",
      description: body.description,
      longDescription: body.longDescription || "",
      tags: body.tags || [],
      github: body.github || undefined,
      demo: body.demo || undefined,
      image: body.image || undefined,
      slug: body.slug,
    });
    return NextResponse.json({ slug }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not create project." }, { status: 500 });
  }
}

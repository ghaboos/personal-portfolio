import db from "./db";
import type { Project } from "@/data/projects";

export function getProjects(): Project[] {
  const rows = db.prepare("SELECT * FROM projects ORDER BY created_at DESC").all() as any[];
  return rows.map((row) => ({ ...row, longDescription: row.long_description, tags: JSON.parse(row.tags || "[]") }));
}

export function createProject(input: Omit<Project, "slug"> & { slug?: string }) {
  const slug = input.slug || input.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  db.prepare(`INSERT INTO projects (slug,title,type,year,description,long_description,tags,github,demo,image) VALUES (@slug,@title,@type,@year,@description,@longDescription,@tags,@github,@demo,@image)`).run({ ...input, slug, longDescription: input.longDescription || "", tags: JSON.stringify(input.tags || []), github: input.github || null, demo: input.demo || null, image: input.image || null });
  return slug;
}

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

export function updateProject(id: number, input: Partial<Project>) {
  const map: Record<string,string> = { title:"title", type:"type", year:"year", description:"description", longDescription:"long_description", github:"github", demo:"demo", image:"image", slug:"slug" };
  const entries = Object.entries(input).filter(([key]) => map[key]);
  if (!entries.length) return;
  const set = entries.map(([key]) => `${map[key]}=@${key}`).join(", ");
  const values: Record<string, unknown> = { id };
  for (const [key,value] of entries) values[key] = key === "longDescription" ? value : value;
  return db.prepare(`UPDATE projects SET ${set}, updated_at=CURRENT_TIMESTAMP WHERE id=@id`).run(values);
}

export function deleteProject(id: number) {
  return db.prepare("DELETE FROM projects WHERE id=?").run(id);
}

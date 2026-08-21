"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

const data: Record<string, { title: string; type: string; description: string; stack: string[] }> = {
  dyolmeh: { title: "Dyolmeh", type: "Full-Stack Platform", description: "A cinematic personal platform for media, games, creative work and community. Built to become a living archive rather than a static website.", stack: ["Next.js", "TypeScript", "SQLite", "TMDB API"] },
  cinevault: { title: "CineVault", type: "Desktop Application", description: "A personal media archive with collections, folders, metadata and a focused dark interface.", stack: ["Python", "PySide6", "SQLite", "SQLAlchemy"] },
  "creative-work": { title: "Creative Work", type: "Visual / Video", description: "A space for visual experiments, editing, motion and other creative work.", stack: ["Photoshop", "Video", "Motion", "Design"] },
};

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = data[slug] ?? data.dyolmeh;
  return (
    <main className="projectDetail">
      <nav className="projectNav"><Link href="/projects" className="back">← Projects</Link><span>{project.type}</span><span>2026</span></nav>
      <section className="detailHero"><motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}><div className="sectionLabel">Project / {slug}</div><h1>{project.title}<span>.</span></h1><p>{project.description}</p></motion.div></section>
      <section className="detailGrid"><div><div className="sectionLabel">01 — Overview</div><h2>Built with intent.</h2></div><div><p className="detailText">{project.description}</p><div className="stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div></div></section>
      <div className="detailVisual"><span>PROJECT VISUAL</span></div>
      <footer className="footer"><Link href="/projects">← Back to all projects</Link></footer>
    </main>
  );
}

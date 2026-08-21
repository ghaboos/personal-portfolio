"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  { slug: "dyolmeh", number: "01", title: "Dyolmeh", type: "Full-Stack Platform", year: "2026", description: "A cinematic personal platform for media, games, creative work and community.", tags: ["Next.js", "TypeScript", "SQLite"] },
  { slug: "cinevault", number: "02", title: "CineVault", type: "Desktop Application", year: "2026", description: "A personal media archive designed around collections, folders and a beautiful dark UI.", tags: ["Python", "PySide6", "SQLite"] },
  { slug: "creative-work", number: "03", title: "Creative Work", type: "Visual / Video", year: "2026", description: "A growing collection of visual experiments, editing work and creative projects.", tags: ["Photoshop", "Video", "Design"] },
];

export default function ProjectsPage() {
  return (
    <main className="projectsPage">
      <nav className="projectNav"><Link href="/" className="back">← D.</Link><span>SELECTED WORK</span><span>2026</span></nav>
      <header className="projectsHeader"><div className="sectionLabel">Portfolio / 02</div><h1>Selected<br /><em>work.</em></h1><p>Projects, experiments and things built from curiosity.</p></header>
      <section className="projectList">
        {projects.map((project, index) => (
          <Link href={`/projects/${project.slug}`} key={project.slug} className="projectLink">
            <motion.article className="projectRow" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}>
              <span className="projectNumber">{project.number}</span>
              <div className="projectVisual"><div className="visualGlow" /><span>{project.title}</span></div>
              <div className="projectInfo"><span className="projectType">{project.type}</span><h2>{project.title}</h2><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
              <div className="projectYear">{project.year} <b>↗</b></div>
            </motion.article>
          </Link>
        ))}
      </section>
    </main>
  );
}

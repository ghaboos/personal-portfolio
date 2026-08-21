"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return <main className="projectsPage">
    <nav className="projectNav"><Link href="/" className="back">← D.</Link><span>SELECTED WORK</span><span>2026</span></nav>
    <header className="projectsHeader"><div className="sectionLabel">Portfolio / 02</div><h1>Selected<br/><em>work.</em></h1><p>Projects, experiments and things built from curiosity.</p></header>
    <section className="projectList">{projects.map((project,index)=><Link href={`/projects/${project.slug}`} key={project.slug} className="projectLink"><motion.article className="projectRow" initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.08}}><span className="projectNumber">0{index+1}</span><div className="projectVisual"><div className="visualGlow"/><span>{project.title}</span></div><div className="projectInfo"><span className="projectType">{project.type}</span><h2>{project.title}</h2><p>{project.description}</p><div className="tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div><div className="projectYear">{project.year}<b>↗</b></div></motion.article></Link>)}</section>
  </main>;
}

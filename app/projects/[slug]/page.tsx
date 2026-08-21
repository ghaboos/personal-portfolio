"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { projects } from "@/data/projects";

type Media={id:number;type:"image"|"video";url:string;alt:string};

export default function ProjectPage(){
 const {slug}=useParams<{slug:string}>(); const project=projects.find(item=>item.slug===slug)??projects[0]; const [media,setMedia]=useState<Media[]>([]);
 useEffect(()=>{fetch(`/api/projects/${encodeURIComponent(slug)}/media`).then(r=>r.ok?r.json():[]).then(setMedia)},[slug]);
 return <main className="projectDetail"><nav className="projectNav"><Link href="/projects" className="back">← Projects</Link><span>{project.type}</span><span>{project.year}</span></nav>
  <section className="detailHero"><motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:.8}}><div className="sectionLabel">Project / {project.slug}</div><h1>{project.title}<span>.</span></h1><p>{project.description}</p></motion.div></section>
  <section className="detailGrid"><div><div className="sectionLabel">01 — Overview</div><h2>Built with intent.</h2></div><div><p className="detailText">{project.longDescription}</p><div className="stack">{project.tags.map(item=><span key={item}>{item}</span>)}</div><div className="detailLinks">{project.github&&<a href={project.github}>GitHub ↗</a>}{project.demo&&<a href={project.demo}>Live Demo ↗</a>}</div></div></section>
  {media.length>0&&<section className="mediaGallery"><div className="sectionLabel">02 — Media</div><div className="mediaMasonry">{media.map(item=>item.type==="video"?<video key={item.id} src={item.url} controls playsInline/>:<img key={item.id} src={item.url} alt={item.alt||project.title}/> )}</div></section>}
  {media.length===0&&<div className="detailVisual">{project.image?<img src={project.image} alt={project.title}/>:<span>{project.title.toUpperCase()} / VISUAL</span>}</div>}
  <footer className="footer"><Link href="/projects">← Back to all projects</Link></footer></main>;
}

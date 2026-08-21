"use client";

import { useEffect, useState } from "react";

type Project = { id:number; title:string; type:string; year:string; description:string; github?:string|null; demo?:string|null };

export default function AdminProjects(){
 const [projects,setProjects]=useState<Project[]>([]); const [loading,setLoading]=useState(true); const [message,setMessage]=useState("");
 async function load(){ const r=await fetch("/api/projects",{cache:"no-store"}); if(r.ok)setProjects(await r.json()); setLoading(false); }
 useEffect(()=>{load()},[]);
 async function remove(id:number){ if(!confirm("Delete this project?"))return; const r=await fetch(`/api/projects/${id}`,{method:"DELETE"}); if(r.ok){setMessage("Project deleted ✓");load()}else setMessage("Delete failed.") }
 return <section className="adminProjects"><div className="adminProjectsTop"><div><div className="sectionLabel">Library</div><h2>Your projects.</h2></div><span>{projects.length} PROJECTS</span></div>{loading?<p className="formStatus">Loading...</p>:projects.length===0?<p className="formStatus">No projects yet.</p>:projects.map(p=><article className="adminProject" key={p.id}><div><span>{p.type} · {p.year}</span><h3>{p.title}</h3><p>{p.description}</p></div><div className="adminActions"><a href={`/projects/${p.slug}`}>View ↗</a><button onClick={()=>remove(p.id)}>Delete</button></div></article>)}{message&&<p className="formStatus">{message}</p>}</section>
}

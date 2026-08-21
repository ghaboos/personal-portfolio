"use client";
import { useEffect, useRef, useState } from "react";

type Project={id:number;title:string;type:string;year:string};
type Media={id:number;project_id:number;type:"image"|"video";url:string;alt:string;sort_order:number};
type Upload={id:string;file:File;progress:number;status:"queued"|"uploading"|"done"|"error"};

export default function ProjectEditor(){
 const [projects,setProjects]=useState<Project[]>([]),[selected,setSelected]=useState<number|null>(null),[media,setMedia]=useState<Media[]>([]),[uploads,setUploads]=useState<Upload[]>([]),[message,setMessage]=useState("");
 const inputRef=useRef<HTMLInputElement>(null); const [dragging,setDragging]=useState(false);
 async function load(){const r=await fetch("/api/projects",{cache:"no-store"});if(r.ok){const p=await r.json();setProjects(p);if(selected===null&&p[0])setSelected(p[0].id)}}
 async function loadMedia(id:number){const r=await fetch(`/api/projects/${id}/media`,{cache:"no-store"});setMedia(r.ok?await r.json():[])}
 useEffect(()=>{load()},[]);useEffect(()=>{if(selected)loadMedia(selected)},[selected]);
 function addFiles(files:FileList|File[]|null){if(!files||!selected)return;const next=Array.from(files).filter(f=>f.type.startsWith("image/")||f.type.startsWith("video/"));setUploads(u=>[...u,...next.map(file=>({id:crypto.randomUUID(),file,progress:0,status:"queued" as const}))]);}
 useEffect(()=>{const queued=uploads.find(x=>x.status==="queued");if(!queued||!selected)return;uploadOne(queued)},[uploads,selected]);
 function uploadOne(item:Upload){setUploads(u=>u.map(x=>x.id===item.id?{...x,status:"uploading"}:x));const xhr=new XMLHttpRequest();xhr.open("POST","/api/upload");xhr.upload.onprogress=e=>{if(e.lengthComputable)setUploads(u=>u.map(x=>x.id===item.id?{...x,progress:Math.round(e.loaded/e.total*100)}:x))};xhr.onload=async()=>{if(xhr.status>=200&&xhr.status<300){const data=JSON.parse(xhr.responseText);await fetch(`/api/projects/${selected}/media`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:data.url,type:data.type,alt:item.file.name,sortOrder:media.length})});setUploads(u=>u.map(x=>x.id===item.id?{...x,progress:100,status:"done"}:x));if(selected)loadMedia(selected)}else setUploads(u=>u.map(x=>x.id===item.id?{...x,status:"error"}:x))};xhr.onerror=()=>setUploads(u=>u.map(x=>x.id===item.id?{...x,status:"error"}:x));const form=new FormData();form.append("file",item.file);xhr.send(form)}
 async function remove(id:number){const r=await fetch(`/api/projects/${selected}/media/${id}`,{method:"DELETE"});if(r.ok&&selected)loadMedia(selected)}
 async function reorder(next:Media[]){setMedia(next);if(!selected)return;const r=await fetch(`/api/projects/${selected}/media/reorder`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({ids:next.map(x=>x.id)})});setMessage(r.ok?"Order saved ✓":"Could not save order.")}
 function drop(index:number){const dragged=dragIndex.current;if(dragged===null||dragged===index)return;const next=[...media];const [item]=next.splice(dragged,1);next.splice(index,0,item);dragIndex.current=null;reorder(next)}
 const dragIndex=useRef<number|null>(null);
 return <section className="editor"><div className="sectionLabel">Project Editor</div><h2>Build your showcase.</h2><div className="editorSelect"><select value={selected??""} onChange={e=>setSelected(Number(e.target.value))}><option value="" disabled>Select project</option>{projects.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select></div>
 {selected&&<><div className={`dropZone ${dragging?"isDragging":""}`} onDragOver={e=>{e.preventDefault();setDragging(true)}} onDragLeave={()=>setDragging(false)} onDrop={e=>{e.preventDefault();setDragging(false);addFiles(e.dataTransfer.files)}} onClick={()=>inputRef.current?.click()}><strong>Drop media here</strong><span>or click to browse · multiple files supported</span><input ref={inputRef} hidden multiple type="file" accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime" onChange={e=>addFiles(e.target.files)}/></div>
 <div className="uploadQueue">{uploads.filter(x=>x.status!=="done").map(x=><div className="uploadRow" key={x.id}><span>{x.file.name}</span><div className="progress"><i style={{width:`${x.progress}%`}}/></div><b>{x.status==="error"?"Failed":`${x.progress}%`}</b></div>)}</div>
 <div className="editorMedia">{media.map((item,index)=><article className="mediaItem" draggable onDragStart={()=>dragIndex.current=index} onDragOver={e=>e.preventDefault()} onDrop={()=>drop(index)} key={item.id}>{item.type==="video"?<video src={item.url} muted/>:<img src={item.url} alt={item.alt}/>}<div className="mediaMeta"><span>{item.type.toUpperCase()}</span><button onClick={()=>remove(item.id)}>Delete</button></div></article>)}</div></>}{message&&<p className="formStatus">{message}</p>}</section>
}

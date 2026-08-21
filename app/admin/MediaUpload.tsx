"use client";

import { useState } from "react";

export default function MediaUpload(){
 const [image,setImage]=useState(""); const [video,setVideo]=useState(""); const [busy,setBusy]=useState(false); const [error,setError]=useState("");
 async function upload(file:File,type:"image"|"video"){
  setBusy(true);setError("");
  const body=new FormData();body.append("file",file);
  const r=await fetch("/api/upload",{method:"POST",body}); const data=await r.json();
  if(!r.ok){setError(data.error||"Upload failed.");}else if(type==="image")setImage(data.url);else setVideo(data.url);
  setBusy(false);
 }
 return <section className="mediaUpload"><div className="sectionLabel">Media</div><h2>Project media.</h2><div className="uploadGrid">
  <label className="dropZone"><span>IMAGE</span><strong>{busy?"Uploading...":"Choose image"}</strong><small>JPG · PNG · WEBP · GIF · max 10MB</small><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={e=>e.target.files?.[0]&&upload(e.target.files[0],"image")}/>{image&&<img src={image} alt="Uploaded project"/>}</label>
  <label className="dropZone"><span>VIDEO</span><strong>{busy?"Uploading...":"Choose video"}</strong><small>MP4 · WEBM · MOV · max 100MB</small><input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={e=>e.target.files?.[0]&&upload(e.target.files[0],"video")}/>{video&&<video src={video} controls/>}</label>
 </div>{error&&<p className="formStatus">{error}</p>}</section>
}

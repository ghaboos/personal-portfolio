import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidSession } from "@/lib/auth";
import { getStorageConfig, storageConfigured } from "@/lib/storage";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";
const MAX_IMAGE=10*1024*1024, MAX_VIDEO=100*1024*1024;
const imageTypes=new Set(["image/jpeg","image/png","image/webp","image/gif"]);
const videoTypes=new Set(["video/mp4","video/webm","video/quicktime"]);

export async function POST(request:Request){
 const token=(await cookies()).get("admin_session")?.value;
 if(!isValidSession(token))return NextResponse.json({error:"Unauthorized."},{status:401});
 try{
  const form=await request.formData(),file=form.get("file");
  if(!(file instanceof File))return NextResponse.json({error:"No file provided."},{status:400});
  const isImage=imageTypes.has(file.type),isVideo=videoTypes.has(file.type);
  if(!isImage&&!isVideo)return NextResponse.json({error:"Unsupported file type."},{status:415});
  if(file.size>(isImage?MAX_IMAGE:MAX_VIDEO))return NextResponse.json({error:`File is too large. Maximum is ${isImage?"10MB":"100MB"}.`},{status:413});
  const ext=path.extname(file.name).toLowerCase()||(isImage?".jpg":".mp4");
  const name=`${Date.now()}-${crypto.randomBytes(8).toString("hex")}${ext}`;
  const folder=isImage?"images":"videos",bytes=Buffer.from(await file.arrayBuffer());
  if(storageConfigured()){
   const c=getStorageConfig(),client=new S3Client({region:"auto",endpoint:c.endpoint,credentials:{accessKeyId:c.accessKeyId,secretAccessKey:c.secretAccessKey}});
   const key=`portfolio/${folder}/${name}`;
   await client.send(new PutObjectCommand({Bucket:c.bucket,Key:key,Body:bytes,ContentType:file.type,CacheControl:"public, max-age=31536000, immutable"}));
   return NextResponse.json({url:`${c.publicUrl.replace(/\/$/,"")}/${key}`,type:isImage?"image":"video",storage:"r2"},{status:201});
  }
  const dir=path.join(process.cwd(),"public","uploads",folder);await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,name),bytes);
  return NextResponse.json({url:`/uploads/${folder}/${name}`,type:isImage?"image":"video",storage:"local"},{status:201});
 }catch(error){console.error(error);return NextResponse.json({error:"Upload failed."},{status:500});}
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidSession } from "@/lib/auth";
import db from "@/lib/db";
export async function DELETE(_:Request,{params}:{params:Promise<{id:string;mediaId:string}>}){const token=(await cookies()).get("admin_session")?.value;if(!isValidSession(token))return NextResponse.json({error:"Unauthorized."},{status:401});const {id,mediaId}=await params;const r=db.prepare("DELETE FROM project_media WHERE id=? AND project_id=?").run(Number(mediaId),Number(id));return r.changes?NextResponse.json({success:true}):NextResponse.json({error:"Media not found."},{status:404})}

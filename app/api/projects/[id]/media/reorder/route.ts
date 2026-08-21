import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidSession } from "@/lib/auth";
import db from "@/lib/db";
export async function PUT(request:Request,{params}:{params:Promise<{id:string}>}){const token=(await cookies()).get("admin_session")?.value;if(!isValidSession(token))return NextResponse.json({error:"Unauthorized."},{status:401});const {id}=await params;const {ids}=await request.json();if(!Array.isArray(ids))return NextResponse.json({error:"Invalid order."},{status:400});const update=db.prepare("UPDATE project_media SET sort_order=? WHERE id=? AND project_id=?");const tx=db.transaction((items:number[])=>items.forEach((mediaId,index)=>update.run(index,mediaId,Number(id))));tx(ids);return NextResponse.json({success:true})}

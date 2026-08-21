import { NextResponse } from "next/server";
import { updateProject, deleteProject } from "@/lib/projects";
import { cookies } from "next/headers";
import { isValidSession } from "@/lib/auth";

async function authorized(){ return isValidSession((await cookies()).get("admin_session")?.value); }

export async function PATCH(request: Request,{params}:{params:Promise<{id:string}>}){
 if(!await authorized())return NextResponse.json({error:"Unauthorized"},{status:401});
 try{const id=Number((await params).id); if(!Number.isInteger(id))return NextResponse.json({error:"Invalid id"},{status:400}); const result=updateProject(id,await request.json()); if(!result||result.changes===0)return NextResponse.json({error:"Not found"},{status:404}); return NextResponse.json({success:true});}catch{return NextResponse.json({error:"Update failed"},{status:500})}
}
export async function DELETE(_:Request,{params}:{params:Promise<{id:string}>}){
 if(!await authorized())return NextResponse.json({error:"Unauthorized"},{status:401});
 try{const id=Number((await params).id); if(!Number.isInteger(id))return NextResponse.json({error:"Invalid id"},{status:400}); const result=deleteProject(id); if(result.changes===0)return NextResponse.json({error:"Not found"},{status:404}); return NextResponse.json({success:true});}catch{return NextResponse.json({error:"Delete failed"},{status:500})}
}

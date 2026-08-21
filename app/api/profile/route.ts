import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidSession } from "@/lib/auth";
import db from "@/lib/db";

function ensure(){db.exec(`CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY CHECK(id=1), name TEXT NOT NULL, role TEXT DEFAULT '', bio TEXT DEFAULT '', avatar TEXT DEFAULT '', skills TEXT DEFAULT '[]', github TEXT DEFAULT '', instagram TEXT DEFAULT '', linkedin TEXT DEFAULT '', email TEXT DEFAULT '', updated_at TEXT DEFAULT CURRENT_TIMESTAMP)`);}
export async function GET(){ensure();let row=db.prepare("SELECT * FROM profile WHERE id=1").get();if(!row){db.prepare("INSERT INTO profile(id,name) VALUES(1,?)").run("Danial");row=db.prepare("SELECT * FROM profile WHERE id=1").get()}return NextResponse.json(row)}
export async function PUT(req:Request){const token=(await cookies()).get("admin_session")?.value;if(!isValidSession(token))return NextResponse.json({error:"Unauthorized."},{status:401});ensure();const b=await req.json();db.prepare("UPDATE profile SET name=?,role=?,bio=?,avatar=?,skills=?,github=?,instagram=?,linkedin=?,email=?,updated_at=CURRENT_TIMESTAMP WHERE id=1").run(b.name||"",b.role||"",b.bio||"",b.avatar||"",JSON.stringify(Array.isArray(b.skills)?b.skills:[]),b.github||"",b.instagram||"",b.linkedin||"",b.email||"");return NextResponse.json({ok:true})}

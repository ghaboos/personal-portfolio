import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidSession } from "@/lib/auth";
import db from "@/lib/db";
const defaults={hero:{enabled:true,order:1,kicker:"Creative Developer",titlePrefix:"I'm",title:"Danial.",subtitle:"I build digital experiences, creative tools and products with a cinematic eye for detail."},about:{enabled:true,order:2,title:"More than a portfolio."},skills:{enabled:true,order:3,title:"Tools I work with."},experience:{enabled:true,order:4,title:"Experience."},projects:{enabled:true,order:5,title:"Things I've built.",limit:6},contact:{enabled:true,order:6,title:"Let's make something."},footer:{enabled:true,order:7,text:"Built with curiosity."}};
function ensure(){db.exec(`CREATE TABLE IF NOT EXISTS homepage (id INTEGER PRIMARY KEY CHECK(id=1), config TEXT NOT NULL)`);const row=db.prepare("SELECT id FROM homepage WHERE id=1").get();if(!row)db.prepare("INSERT INTO homepage(id,config) VALUES(1,?)").run(JSON.stringify(defaults));}
export async function GET(){ensure();const row:any=db.prepare("SELECT config FROM homepage WHERE id=1").get();return NextResponse.json(JSON.parse(row.config));}
export async function PUT(req:Request){const token=(await cookies()).get("admin_session")?.value;if(!isValidSession(token))return NextResponse.json({error:"Unauthorized."},{status:401});ensure();const config=await req.json();db.prepare("UPDATE homepage SET config=? WHERE id=1").run(JSON.stringify(config));return NextResponse.json({ok:true});}

import crypto from "crypto";
const ADMIN_PASSWORD=process.env.ADMIN_PASSWORD,SESSION_SECRET=process.env.SESSION_SECRET;
export function isAuthConfigured(){return Boolean(ADMIN_PASSWORD&&SESSION_SECRET)}
export function verifyPassword(password:string){if(!ADMIN_PASSWORD)return false;const a=Buffer.from(password),b=Buffer.from(ADMIN_PASSWORD);return a.length===b.length&&crypto.timingSafeEqual(a,b)}
export function createSessionToken(){if(!SESSION_SECRET)throw new Error("SESSION_SECRET is not configured");const expires=Date.now()+1000*60*60*24*7,payload=String(expires),signature=crypto.createHmac("sha256",SESSION_SECRET).update(payload).digest("hex");return `${payload}.${signature}`}
export function isValidSession(token?:string){if(!token||!SESSION_SECRET)return false;const [expires,signature]=token.split(".");if(!expires||!signature||Number(expires)<Date.now())return false;const expected=crypto.createHmac("sha256",SESSION_SECRET).update(expires).digest("hex");const a=Buffer.from(signature),b=Buffer.from(expected);return a.length===b.length&&crypto.timingSafeEqual(a,b)}

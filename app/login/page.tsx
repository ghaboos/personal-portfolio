"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    const data = await response.json();
    if (response.ok) router.push("/admin"); else setError(data.error || "Login failed.");
    setLoading(false);
  }

  return <main className="loginPage"><div className="loginCard"><div className="sectionLabel">Private Area</div><h1>Welcome<br/><em>back.</em></h1><form onSubmit={login}><label><span>Admin password</span><input type="password" autoFocus value={password} onChange={e => setPassword(e.target.value)} /></label><button disabled={loading}>{loading ? "Checking..." : "Enter →"}</button>{error&&<p>{error}</p>}</form></div></main>;
}

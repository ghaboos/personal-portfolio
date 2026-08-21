"use client";

import { useState } from "react";

export default function AdminForm() {
  const [form, setForm] = useState({ title: "", type: "", year: "2026", description: "", github: "", demo: "" });
  const [status, setStatus] = useState("");
  const update = (key: string, value: string) => setForm((v) => ({ ...v, [key]: value }));

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("Saving...");
    const response = await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setStatus(response.ok ? "Project payload saved ✓" : "Something went wrong.");
  }

  return <form className="adminForm" onSubmit={submit}>
    {(["title", "type", "year", "description", "github", "demo"] as const).map((key) => <label key={key}><span>{key}</span>{key === "description" ? <textarea required value={form[key]} onChange={(e) => update(key, e.target.value)} /> : <input required={key === "title"} value={form[key]} onChange={(e) => update(key, e.target.value)} />}</label>)}
    <button type="submit">Save project →</button>
    {status && <p className="formStatus">{status}</p>}
  </form>;
}

"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ title: "", type: "", year: "2026", description: "", github: "", demo: "" });
  const update = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <main className="adminPage">
      <nav className="projectNav"><Link href="/" className="back">← D.</Link><span>PROJECT MANAGER</span><span>PRIVATE AREA</span></nav>
      <section className="adminHeader"><div className="sectionLabel">Portfolio / Admin</div><h1>Add a<br /><em>project.</em></h1><p>Create the content first. Image upload and database persistence will be connected in the next backend phase.</p></section>
      <form className="adminForm" onSubmit={(e) => { e.preventDefault(); setSaved(true); }}>
        {([['title','Project title'],['type','Project type'],['year','Year'],['description','Short description'],['github','GitHub URL'],['demo','Live demo URL']] as const).map(([key,label]) => (
          <label key={key}><span>{label}</span>{key === 'description' ? <textarea value={form[key]} onChange={e => update(key,e.target.value)} placeholder={label} /> : <input value={form[key]} onChange={e => update(key,e.target.value)} placeholder={label} />}</label>
        ))}
        <button type="submit">{saved ? "Saved ✓" : "Save project →"}</button>
      </form>
    </main>
  );
}

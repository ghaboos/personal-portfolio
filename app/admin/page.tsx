import Link from "next/link";
import AdminForm from "./AdminForm";

export default function AdminPage() {
  return <main className="adminPage">
    <nav className="projectNav"><Link href="/" className="back">← D.</Link><span>PROJECT MANAGER</span><span>PRIVATE AREA</span></nav>
    <section className="adminHeader"><div className="sectionLabel">Portfolio / Admin</div><h1>Add a<br/><em>project.</em></h1><p>Create and submit project information from one clean interface.</p></section>
    <AdminForm />
  </main>;
}

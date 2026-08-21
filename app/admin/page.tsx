import Link from "next/link";
import AdminProjects from "./AdminProjects";
import ProjectEditor from "./ProjectEditor";
import AdminForm from "./AdminForm";
export default function AdminPage(){return <main className="adminPage"><nav className="projectNav"><Link href="/" className="back">← D.</Link><span>PROJECT MANAGER</span><span>PRIVATE AREA</span></nav><section className="adminHeader"><div className="sectionLabel">Portfolio / Admin</div><h1>Control<br/><em>room.</em></h1><p>Manage projects and cinematic media from one private workspace.</p></section><AdminProjects/><ProjectEditor/><section className="adminCreate"><div className="sectionLabel">New Project</div><h2>Add a project.</h2><AdminForm/></section></main>}

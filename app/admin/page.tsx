import Link from "next/link";
import Dashboard from "./Dashboard";
import ProjectEditor from "./ProjectEditor";
import AdminForm from "./AdminForm";

export default function AdminPage(){return <><Dashboard/><div className="adminTools"><ProjectEditor/><section className="adminCreate" id="new"><div className="sectionLabel">New Project</div><h2>Add a project.</h2><AdminForm/></section></div></>}

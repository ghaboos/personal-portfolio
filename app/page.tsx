"use client";

import { motion } from "framer-motion";

const projects = [
  { title: "Dyolmeh", text: "A cinematic personal platform for media, games, creative work and community." },
  { title: "CineVault", text: "A personal offline media archive built around movies, series and collections." },
  { title: "Creative Work", text: "Video, visual design, experiments and other work worth putting on display." },
  { title: "More Coming", text: "This space is ready for the next project you build." },
];

export default function Home() {
  return (
    <main className="site">
      <nav className="nav">
        <div className="logo">D.</div>
        <div className="navLinks">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero">
        <motion.div className="heroInner" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
          <span className="kicker">Creative Developer · Builder · Explorer</span>
          <h1 className="title">I build <span className="gradient">things.</span></h1>
          <p className="subtitle">A personal space for my projects, skills, experiments and everything I create on the way.</p>
          <div className="actions">
            <a className="button" href="#projects">Explore my work</a>
            <a className="button secondary" href="#contact">Let&apos;s talk</a>
          </div>
        </motion.div>
      </section>

      <section className="section" id="about">
        <div className="sectionLabel">01 — About</div>
        <h2 className="sectionTitle">More than a portfolio.</h2>
        <p className="subtitle" style={{ margin: 0 }}>This site will grow with me. Projects, code, design, video, experiments and the skills I pick up along the way will all live here.</p>
      </section>

      <section className="section" id="projects">
        <div className="sectionLabel">02 — Selected Work</div>
        <h2 className="sectionTitle">Things I&apos;ve built.</h2>
        <div className="grid">
          {projects.map((project, index) => (
            <motion.article className="card" key={project.title} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}>
              <div className="sectionLabel">0{index + 1}</div>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section" id="skills">
        <div className="sectionLabel">03 — Skills</div>
        <h2 className="sectionTitle">Tools I work with.</h2>
        <div className="grid">
          {['Next.js / React', 'TypeScript / JavaScript', 'Python', 'UI / Motion / Creative'].map((skill) => (
            <div className="card" key={skill}><h3 style={{ marginTop: 40 }}>{skill}</h3></div>
          ))}
        </div>
      </section>

      <section className="section" id="contact">
        <div className="sectionLabel">04 — Contact</div>
        <h2 className="sectionTitle">Let&apos;s make something.</h2>
        <p className="subtitle" style={{ margin: 0 }}>Contact links, GitHub, social profiles and future project links will live here.</p>
      </section>

      <footer className="footer">© 2026 Danial. Built with curiosity.</footer>
    </main>
  );
}

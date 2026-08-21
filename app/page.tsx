"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const projects = [
  { title: "Dyolmeh", text: "A cinematic personal platform for media, games, creative work and community." },
  { title: "CineVault", text: "A personal offline media archive built around movies, series and collections." },
  { title: "Creative Work", text: "Video, visual design, experiments and other work worth putting on display." },
  { title: "More Coming", text: "This space is ready for the next project you build." },
];

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 35 });
  const springY = useSpring(y, { stiffness: 500, damping: 35 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => { x.set(event.clientX); y.set(event.clientY); setVisible(true); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="cursor"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    />
  );
}

function MagneticButton({ children, href, secondary = false }: { children: React.ReactNode; href: string; secondary?: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 18 });
  const sy = useSpring(y, { stiffness: 300, damping: 18 });

  return (
    <motion.a
      className={`button ${secondary ? "secondary" : ""}`}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.18);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.a>
  );
}

export default function Home() {
  return (
    <main className="site">
      <Cursor />
      <div className="noise" />

      <nav className="nav">
        <motion.div className="logo" initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}>D.</motion.div>
        <div className="navLinks">
          <a href="#about">About</a><a href="#projects">Projects</a><a href="#skills">Skills</a><a href="#contact">Contact</a>
        </div>
        <span className="status"><i /> Available</span>
      </nav>

      <section className="hero">
        <motion.div className="heroGlow" initial={{ scale: .7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.4 }} />
        <motion.div className="heroInner" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: "easeOut" }}>
          <span className="kicker">Creative Developer · Builder · Explorer</span>
          <h1 className="title">I build <span className="gradient">things.</span></h1>
          <p className="subtitle">A personal space for my projects, skills, experiments and everything I create on the way.</p>
          <div className="actions"><MagneticButton href="#projects">Explore my work ↗</MagneticButton><MagneticButton href="#contact" secondary>Let&apos;s talk</MagneticButton></div>
        </motion.div>
        <div className="scrollHint">SCROLL <span>↓</span></div>
      </section>

      <section className="section" id="about"><div className="sectionLabel">01 — About</div><h2 className="sectionTitle">More than a portfolio.</h2><p className="subtitle" style={{ margin: 0 }}>This site will grow with me. Projects, code, design, video, experiments and the skills I pick up along the way will all live here.</p></section>

      <section className="section" id="projects"><div className="sectionLabel">02 — Selected Work</div><h2 className="sectionTitle">Things I&apos;ve built.</h2><div className="grid">{projects.map((project, index) => <motion.article className="card" key={project.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: index * .1 }} whileHover={{ y: -10 }}><div className="sectionLabel">0{index + 1}</div><h3>{project.title}</h3><p>{project.text}</p><span className="cardArrow">↗</span></motion.article>)}</div></section>

      <section className="section" id="skills"><div className="sectionLabel">03 — Skills</div><h2 className="sectionTitle">Tools I work with.</h2><div className="grid">{['Next.js / React', 'TypeScript / JavaScript', 'Python', 'UI / Motion / Creative'].map((skill) => <motion.div className="card skillCard" key={skill} whileHover={{ scale: 1.02 }}><h3>{skill}</h3><span>01</span></motion.div>)}</div></section>

      <section className="section contact" id="contact"><div className="sectionLabel">04 — Contact</div><h2 className="sectionTitle">Let&apos;s make something.</h2><p className="subtitle" style={{ margin: 0 }}>Contact links, GitHub, social profiles and future project links will live here.</p></section>
      <footer className="footer">© 2026 Danial. Built with curiosity.</footer>
    </main>
  );
}

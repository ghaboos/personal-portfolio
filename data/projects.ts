export type Project = {
  slug: string;
  title: string;
  type: string;
  year: string;
  description: string;
  longDescription: string;
  tags: string[];
  github?: string;
  demo?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "dyolmeh",
    title: "Dyolmeh",
    type: "Full-Stack Platform",
    year: "2026",
    description: "A cinematic personal platform for media, games, creative work and community.",
    longDescription: "A living digital archive designed to bring together movies, series, anime, games, creative work and community features in one polished experience.",
    tags: ["Next.js", "TypeScript", "SQLite", "TMDB API"],
    github: "https://github.com/ghaboos",
  },
  {
    slug: "cinevault",
    title: "CineVault",
    type: "Desktop Application",
    year: "2026",
    description: "A personal media archive designed around collections, folders and a beautiful dark UI.",
    longDescription: "A desktop media library focused on organizing films, series, anime and collections with a fast local database and a cinematic interface.",
    tags: ["Python", "PySide6", "SQLite", "SQLAlchemy"],
    github: "https://github.com/ghaboos",
  },
  {
    slug: "creative-work",
    title: "Creative Work",
    type: "Visual / Video",
    year: "2026",
    description: "A growing collection of visual experiments, editing work and creative projects.",
    longDescription: "A flexible space for visual design, photo editing, video experiments and future creative projects.",
    tags: ["Photoshop", "Video", "Motion", "Design"],
  },
];

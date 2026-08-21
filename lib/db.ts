import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "portfolio.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    type TEXT,
    year TEXT,
    description TEXT NOT NULL,
    long_description TEXT,
    tags TEXT DEFAULT '[]',
    github TEXT,
    demo TEXT,
    image TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;

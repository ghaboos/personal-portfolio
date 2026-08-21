import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.join(process.cwd(), "data");
fs.mkdirSync(dataDir, { recursive: true });
const db = new Database(path.join(dataDir, "portfolio.db"));
db.pragma("journal_mode = WAL");

db.exec(`CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  type TEXT DEFAULT '',
  year TEXT DEFAULT '',
  description TEXT NOT NULL,
  long_description TEXT DEFAULT '',
  tags TEXT DEFAULT '[]',
  github TEXT,
  demo TEXT,
  image TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
)`);

export default db;

import { open } from "sqlite";
import sqlite3 from "sqlite3";

export const connectDb = async () => {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS issues (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT
    )
  `);

  return db;
};

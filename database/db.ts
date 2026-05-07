import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Шлях до файлу бази даних в тій же папці, що і цей файл (або в підпапці)
const dbDir = __dirname;
const dbPath = path.join(dbDir, "bot.db");

const db = new Database(dbPath);

export function initDB() {
    // Таблиця users: telegram_id (PRIMARY KEY), age, weight, height, sex, activity_level, bmr, tdee
    db.prepare(`
        CREATE TABLE IF NOT EXISTS users (
            telegram_id INTEGER PRIMARY KEY,
            age INTEGER,
            weight REAL,
            height REAL,
            sex TEXT,
            activity_level TEXT,
            bmr REAL,
            tdee REAL
        )
    `).run();

    // Таблиця meals: id (PRIMARY KEY), user_id, raw_text, calories_estimated, timestamp, notes
    db.prepare(`
        CREATE TABLE IF NOT EXISTS meals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            raw_text TEXT,
            calories_estimated REAL DEFAULT 0,
            ai_response_json TEXT,
            confidence REAL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            notes TEXT,
            FOREIGN KEY (user_id) REFERENCES users(telegram_id)
        )
    `).run();

    console.log("✅ База даних ініціалізована");
}

export default db;

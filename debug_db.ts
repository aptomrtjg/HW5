import db from "./database/db";

async function debugDB() {
    console.log("--- Users ---");
    const users = db.prepare("SELECT * FROM users").all();
    console.log(users);

    console.log("\n--- Last 5 Meals ---");
    const meals = db.prepare("SELECT * FROM meals ORDER BY timestamp DESC LIMIT 5").all();
    console.log(meals);

    console.log("\n--- Time Check ---");
    const time = db.prepare("SELECT datetime('now') as utc, datetime('now', 'localtime') as local").get();
    console.log(time);
}

debugDB();

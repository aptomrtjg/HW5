import * as dotenv from "dotenv";
import fs from "fs";

console.log("--- Checking .env file directly ---");
try {
    const content = fs.readFileSync(".env", "utf8");
    console.log("File content:\n" + content);
} catch (e) {
    console.log("Error reading file:", e);
}

console.log("\n--- Running dotenv.config() ---");
const result = dotenv.config();
console.log("Dotenv result:", result.parsed ? "Success (keys: " + Object.keys(result.parsed).join(", ") + ")" : "Failed: " + result.error);

console.log("\n--- Current Environment Variables ---");
console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 8) + "..." : "NOT SET");
console.log("BOT_TOKEN:", process.env.BOT_TOKEN ? "SET" : "NOT SET");

import * as dotenv from "dotenv";
dotenv.config({ override: true });

async function checkRaw() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
    const body = {
        contents: [{ parts: [{ text: "Hi" }] }]
    };

    console.log("Requesting URL (hidden key)...");
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Full Response Body:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Fetch Error:", e);
    }
}

checkRaw();

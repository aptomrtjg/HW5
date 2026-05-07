import * as dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({ override: true });

async function diagnose() {
    const key = process.env.GEMINI_API_KEY;
    console.log("--- DIAGNOSIS START ---");
    console.log("API Key starts with:", key ? key.substring(0, 10) + "..." : "NONE");

    if (!key) return;

    const modelsToTest = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-pro",
        "gemini-pro"
    ];

    const versions = ["v1", "v1beta"];

    for (const modelName of modelsToTest) {
        for (const ver of versions) {
            console.log(`Testing: ${modelName} | Version: ${ver}...`);
            try {
                const genAI = new GoogleGenerativeAI(key);
                const model = genAI.getGenerativeModel({ model: modelName }, { apiVersion: ver as any });
                const result = await model.generateContent("Say 'OK'");
                console.log(`✅ SUCCESS: ${modelName} (${ver}) -> "${result.response.text().trim()}"`);
                return; // Stop at first success
            } catch (e: any) {
                console.log(`❌ FAILED: ${modelName} (${ver}) -> ${e.message.substring(0, 100)}...`);
            }
        }
    }
    console.log("--- DIAGNOSIS END: NO WORKING CONFIG FOUND ---");
}

diagnose();

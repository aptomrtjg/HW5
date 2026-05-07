import * as dotenv from "dotenv";
dotenv.config({ override: true });

async function listAll() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return;

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
    try {
        const response = await fetch(url);
        const data: any = await response.json();
        console.log("Status:", response.status);
        if (data.models) {
            console.log("Total models:", data.models.length);
            data.models.forEach((m: any) => {
                if (m.name.includes("gemini")) {
                    console.log(` - ${m.name} (Methods: ${m.supportedGenerationMethods.join(", ")})`);
                }
            });
        } else {
            console.log("Response:", JSON.stringify(data, null, 2));
        }
    } catch (e) {
        console.error(e);
    }
}

listAll();

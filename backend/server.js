require('dotenv').config({ path: '.env.local' });
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error("API Key is missing! Check your .env file.");
    process.exit(1);
}

app.post("/chat", async (req, res) => {
    const { userMessage } = req.body;

    if (!userMessage) {
        return res.status(400).json({ error: "Message is required" });
    }

    const prompt = `
        You are a mental health assistant. Your goal is to provide soft, empathetic, and supportive responses.
        Always respond with a calm and understanding tone, and offer sound advice for coping with stress, anxiety, or other emotions.
        Encourage mindfulness, self-care, and positive thinking.
        If the user expresses any distress, offer reassurance and gently suggest helpful resources or strategies for managing their feelings.

        User's message: ${userMessage}
    `;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            { contents: [{ role: "user", parts: [{ text: prompt }] }] },
            { headers: { "Content-Type": "application/json" } }
        );

        const aiResponse = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
        res.json({ aiResponse });
    } catch (error) {
        console.error("Error from Gemini API:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch AI response" });
    }
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));

require('dotenv').config({ path: '.env.local' });
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

let userData = {}; 

if (!GEMINI_API_KEY) {
    console.error("API Key is missing! Check your .env file.");
    process.exit(1);
}

app.post("/save-data", (req, res) => {
  const { name, answers } = req.body;
  userData = { name, answers }; 
  res.status(200).json({ message: "Data saved successfully!" });
});

app.post("/chat", async (req, res) => {
  const { userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  const prompt = `
    You are a mental health assistant. Respond with soft, empathetic, and supportive replies. Focus on offering calm advice for stress, anxiety, and emotional well-being. Encourage mindfulness, self-care, and positive thinking. If the user expresses distress, gently suggest helpful strategies or resources.

    Keep responses short (2-10 lines) to avoid overwhelming the user.
    Avoid repetitive greetings or using the user’s name too often.
    Offer reassurance and coping strategies based on the user's feelings without overloading with information.
    Also you can ask questions to the user depending on the context to get more information and give better suggestions!
    Context:
    User's message: ${userMessage}
    User's feelings:

    Mood: ${userData.answers[1]}
    Stress: ${userData.answers[2]}
    Sleep: ${userData.answers[3]}
    Isolation: ${userData.answers[4]}
    Overwhelmed: ${userData.answers[5]}
    Concentration: ${userData.answers[6]}
    Fatigue: ${userData.answers[7]}
    Life changes: ${userData.answers[8]}
    Support system: ${userData.answers[9]}
    Want to talk: ${userData.answers[10]}

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

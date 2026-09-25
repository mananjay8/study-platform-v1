const express = require("express");
const path = require("path");

const app = express();app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    next();
});

const PORT = process.env.PORT || 10000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(express.json({ limit: "1mb" }));

// Website files
app.use(express.static(__dirname));


// Health check
app.get("/health", (req, res) => {
    res.json({
        ok: true,
        message: "Study AI server is running"
    });
});


// AI Chat
app.post("/api/chat", async (req, res) => {

    try {

        if (!GEMINI_API_KEY) {

            return res.status(500).json({
                error: "GEMINI_API_KEY is not configured on the server."
            });

        }


        const userMessage = req.body.message;

        if (!userMessage || !userMessage.trim()) {

            return res.status(400).json({
                error: "Message is required."
            });

        }


        const prompt = `
You are Study AI, an educational AI assistant.

Your job is to help students understand subjects clearly.

Rules:
- Explain concepts step by step.
- Use simple language.
- Support Hindi, English and Hinglish.
- When solving numerical problems, show the complete working.
- For exam preparation, give exam-oriented answers.
- Do not invent facts when you are uncertain.
- If the user asks for a quiz, create useful questions with one clearly correct answer unless the question genuinely requires another format.

Student's request:

${userMessage}
`;


        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": GEMINI_API_KEY
                },

                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            console.error("Gemini error:", data);

            return res.status(response.status).json({
                error: data?.error?.message || "Gemini API request failed."
            });
        }


        const answer =
            data?.candidates?.[0]?.content?.parts
                ?.map(part => part.text || "")
                .join("")
                .trim();


        if (!answer) {

            return res.status(500).json({
                error: "AI returned an empty response."
            });
        }


        res.json({
            answer: answer
        });


    } catch (error) {

        console.error("Server error:", error);

        res.status(500).json({
            error: "Server error. Please try again."
        });
    }
});


// Start server
app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `Study AI server running on port ${PORT}`
    );

});

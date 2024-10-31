const express = require("express");
const OpenAI = require("openai");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const completion = await openai.completions.create({
      model: "gpt-4o",
      messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
              role: "user",
              content: ${prompt},
          },
      ],
  });

    const html_code = completion.choices[0].text.trim();
    res.json({ html_code });
  } catch (error) {
    console.error("Error generating website:", error);
    res.status(500).json({ error: "Error generating website code" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

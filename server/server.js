import express from "express";
import OpenAI from "openai";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public'))); // Corrected path

console.log("Loaded API Key:", process.env.OPENAI_API_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/generate", async (req, res) => {
  const prompt = req.query.prompt;

  console.log("Received request with prompt:", prompt);

  if (!prompt) {
    res.status(400).json({ error: "Prompt is required" });
    return;
  }

  try {
    console.log("Setting up SSE headers...");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    console.log("Sending request to OpenAI API...");
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a website developer that generates HTML, CSS, and JavaScript code based on the user's prompt. Always include all 3 file types no matter what. Do not output explainations, just the code. Output as much as you can. Make sure you always reference the files as index.html, styles.css, and script.js."
        },
        { role: "user", content: prompt },
      ],
      stream: true,  // Ensure streaming is enabled
    });

    console.log("Processing streaming response...");
    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        console.log("Streaming content:", content);
        res.write(`data: ${content}\n\n`);
      }
      
      if (chunk.choices[0]?.finish_reason === "stop") {
        console.log("Finished streaming content");
        res.write(`data: [DONE]\n\n`);
        break;
      }
    }

    res.end();
    console.log("Response ended successfully.");
  } catch (error) {
    // Comprehensive error logging
    console.error("An error occurred during generation:");

    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Error response data:", error.response.data);
    } else {
      console.error("Error message:", error.message);
    }

    res.status(500).json({ error: "Error generating website code" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

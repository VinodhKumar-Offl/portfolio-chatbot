import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config(); // Load .env file

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.get('/health', (req, res) => res.send('Backend is alive!'));

app.post("/api/chatbot", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Question is required" });

  // Ensure env variables are loaded
  const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;
  if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
    return res.status(500).json({ reply: "AWS credentials not found in environment." });
  }

  AWS.config.update({
    region: AWS_REGION || "us-east-1",
    credentials: new AWS.Credentials(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY),
  });

  const lex = new AWS.LexRuntimeV2();

  const params = {
    botId: "MTZZIS1GIN",
    botAliasId: "TSTALIASID",
    localeId: "en_US",
    sessionId: "vinodh-chat-session",
    text: question,
  };

  try {
    const response = await lex.recognizeText(params).promise();
    const reply = response.messages?.[0]?.content || "Sorry, I couldn't find an answer.";
    res.json({ reply });
  } catch (err) {
    console.error("Lex error:", err);
    res.status(500).json({ reply: "⚠️ Something went wrong connecting to the assistant." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Wide open CORS for local development to eliminate any connection issues
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",
});

let portfolioContext = "";

async function loadPortfolioData() {
  try {
    console.log("Loading portfolio data into context...");

    const resumePath = path.join(__dirname, "..", "frontend", "public", "VinodhKumar_Resume.pdf");
    const pdfLoader = new PDFLoader(resumePath);
    const pdfDocs = await pdfLoader.load();
    const resumeText = pdfDocs.map(doc => doc.pageContent).join("\n\n");

    const kbPath = path.join(__dirname, "..", "knowledge-base", "vinodh_canonical_profile_kb.txt");
    const kbText = fs.readFileSync(kbPath, "utf8");

    portfolioContext = `
RESUME CONTENT:
${resumeText}

CANONICAL PROFILE KNOWLEDGE BASE:
${kbText}
`;
    console.log("Portfolio data loaded successfully. Ready for queries.");
  } catch (error) {
    console.error("Error loading portfolio data:", error);
  }
}

loadPortfolioData();

app.get('/', (req, res) => {
  console.log("Root endpoint hit");
  res.send('Cloud & AI Engineer Backend is running!');
});

app.get('/health', (req, res) => {
  console.log("Health check hit");
  res.send('Backend is alive!');
});

app.post("/api/chatbot", async (req, res) => {
  console.log("Chatbot request received:", req.body);
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Question is required" });

  if (!portfolioContext) {
    console.log("Context not yet loaded");
    return res.status(503).json({ reply: "I'm still reading my resume. Please try again in a few seconds!" });
  }

  try {
    const systemPrompt = `You are a professional AI assistant for Vinodh Kumar R's portfolio.
Use the following context to answer the user's question accurately.
If the answer is not in the context, politely say you don't know and suggest contacting Vinodh.
Be concise, professional, and emphasize his Cloud and AI engineering expertise.
For general cloud platform questions, present AWS as his primary cloud focus and use specific AWS work from the context. Keep Oracle-specific work accurately identified as OCI.
For portfolio chatbot questions, distinguish its earlier AWS Lex and Amazon Bedrock version from the current Gemini and LangChain version.
Format multi-part answers as a short introduction followed by 2-4 Markdown bullet points. Give each bullet a brief bold heading and one clear sentence. Use blank lines around the list. Avoid generic closing invitations unless the user asks how to get in touch.

CONTEXT:
${portfolioContext}`;

    const response = await model.invoke([
      ["system", systemPrompt],
      ["human", question],
    ]);

    console.log("Gemini response generated successfully");
    res.json({
      reply: response.content,
    });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({
      reply: "I encountered an error processing your request. Please try again.",
    });
  }
});

const PORT = process.env.PORT || 6000;
// Listen on 0.0.0.0 to accept all connections
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Local access: http://localhost:${PORT}`);
  console.log(`Network access: http://127.0.0.1:${PORT}`);
});

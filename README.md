# Vinodh Kumar Portfolio

A personal portfolio for Vinodh Kumar R, an AWS-focused Cloud and AI Engineer currently working as an Associate Advanced Services Engineer at Oracle after Deloitte Cyber - Enterprise Security experience. The site highlights Oracle SQL fine-tuning and telemetry analytics, Deloitte AWS data engineering and Bedrock RAG work, additional OCI validation, projects, certifications, awards, and teaching. The current site assistant uses Gemini through LangChain.

## Highlights

- Animated React portfolio with Framer Motion page reveals, hover states, timeline motion, and an enhanced profile hero.
- Resume download served from `frontend/public/VinodhKumar_Resume.pdf`.
- Project showcase for the AI portfolio chatbot, trash classification, drowsiness detection, and face recognition.
- Instructor and mentorship section covering guest lectures, Zoho preparation, alumni guidance, hackathon jury work, tutoring, and Udemy learning direction.
- Certifications and badge carousel covering AWS, Google Cloud, Azure, Prisma Cloud, Snyk, IBM, and HackerRank credentials.
- Contact form with validation and Google Apps Script submission.
- Express backend endpoint that connects the chatbot UI to Gemini through LangChain using resume and profile context.

## Tech Stack

**Frontend:** React, Tailwind CSS, Framer Motion, React Icons  
**Backend:** Node.js, Express, LangChain, Gemini  
**Cloud & Security:** AWS, GCP, Azure, OCI, Prisma Cloud, Snyk, Qualys, Security Lake, OCSF  
**AI & Data:** Qwen3, LoRA/PEFT, GGUF, Amazon Bedrock, OpenSearch, RAG, AWS Glue, Athena, TensorFlow, Keras  
**Tools:** Terraform, Lambda, EventBridge, Git, GitHub, Jira, Postman, Figma

## Project Structure

```text
portfolio-chatbot/
├── backend/              # Express API for chatbot requests
├── frontend/             # React portfolio application
│   ├── public/           # Static files, resume, icons, manifest
│   └── src/              # Pages, components, styles, assets
└── README.md
```

## Getting Started

Install and run the frontend:

```bash
cd frontend
npm install
npm start
```

Run the chatbot backend in a second terminal:

```bash
cd backend
npm install
npm start
```

The frontend runs at `http://localhost:3000` and the backend defaults to `http://localhost:5001`. Check the backend at `http://localhost:5001/health`.

## Backend Environment

Create `backend/.env` for the chatbot service:

```env
GOOGLE_API_KEY=your_google_api_key
GEMINI_MODEL=gemini-3.5-flash-lite
PORT=5001
```

The backend loads the current resume and canonical profile knowledge base, then sends questions and context to Gemini. An earlier portfolio chatbot used AWS Lex and Amazon Bedrock; the enterprise Bedrock RAG work described in the portfolio is separate Deloitte experience.

### Render backend and Netlify frontend

Create a Render Node web service from the repository root (leave Root Directory blank). Set Build Command to `cd backend && npm ci --legacy-peer-deps` and Start Command to `cd backend && npm start`. The backend lockfile requires `--legacy-peer-deps` with npm 11 because of a LangChain peer dependency conflict. Add `GOOGLE_API_KEY` as a secret environment variable and set `GEMINI_MODEL` to the Gemini model available to that key. Render supplies `PORT` automatically. The service health endpoint is `/health`.

The frontend reads `REACT_APP_CHATBOT_API_URL` from `frontend/.env.production` when Netlify builds it and from `frontend/.env.development` during local development. Production uses `https://portfolio-chatbot-updated.onrender.com/api/chatbot`; local development uses `http://localhost:5001/api/chatbot`. If a Netlify environment variable with the same name is set, keep its value aligned with the production URL before rebuilding.

## Build

```bash
cd frontend
npm run build
```

The production-ready frontend output is generated in `frontend/build`.

## Portfolio Focus

Vinodh's portfolio emphasizes AWS Security Lake, Glue, Lambda, Athena, and Bedrock work, alongside Oracle SQL fine-tuning, telemetry analytics, and additional OCI validation. The downloadable resume is `frontend/public/VinodhKumar_Resume.pdf`.

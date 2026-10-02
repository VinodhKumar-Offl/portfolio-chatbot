import { motion } from "framer-motion";
import StoryGuide from "../components/StoryGuide";

const chapters = [
  {
    label: "Validate",
    title: "Cloud traffic and policy checks",
    text: "I build tooling that checks cloud traffic against security rules, enriches flows with rule metadata, and produces clear accepted/rejected reports.",
  },
  {
    label: "Analyze",
    title: "Telemetry to decisions",
    text: "I turn infrastructure, database, network, storage, and application telemetry into analytics, APIs, forecasting, and risk-scored vulnerability views.",
  },
  {
    label: "Automate",
    title: "Security workflows and dashboards",
    text: "I automate security ingestion, policy migration, patching workflows, cloud dashboards, and serverless pipelines across AWS, GCP, OCI, and Azure exposure.",
  },
  {
    label: "Explain",
    title: "GenAI assistants for technical teams",
    text: "I use Bedrock, Knowledge Bases, RAG, Guardrails, Lex, and prompt optimization to answer questions from trusted context and summarize technical findings.",
  },
  {
    label: "Communicate",
    title: "Teaching and stakeholder clarity",
    text: "I also mentor, teach programming concepts, and explain technical topics clearly, which helps when projects need documentation, demos, or handover.",
  },
];

const About = () => {
  return (
    <section className="portfolio-section">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          className="premium-panel rounded-[2rem] p-6 sm:p-8"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">
            How I Can Help
          </p>
          <h2 className="text-3xl font-black leading-tight sm:text-4xl">
            From messy cloud data to decisions teams can use.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-300">
            I start with the operational problem, connect the right data sources,
            and build a clear path from raw signals to action. That can mean a
            validation tool, an analytics dashboard, or an assistant grounded in
            trusted context. I care about making the result reliable and easy to use.
          </p>
          <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-relaxed text-cyan-50">
            What I bring: clear problem framing, Python automation, thoughtful
            integrations, and tools that technical teams can maintain.
          </div>
        </motion.div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {chapters.map((chapter) => (
            <motion.article
              key={chapter.label}
              className="mission-card relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5"
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -4, borderColor: "rgba(103,232,249,0.45)" }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
                {chapter.label}
              </p>
              <h3 className="mt-3 text-lg font-bold text-white">{chapter.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{chapter.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <div className="mt-5">
        <StoryGuide
          chapter="Career Story"
          title="A path from ML projects to enterprise cloud and AI systems."
          message="The journey starts with AI/ML projects, moves into AWS data engineering and Bedrock RAG work at Deloitte, and continues at Oracle with SQL model fine-tuning and telemetry analytics. OCI validation adds another practical cloud engineering example."
        />
      </div>
    </section>
  );
};

export default About;

import { motion } from "framer-motion";
import StoryGuide from "../components/StoryGuide";

const badgeColors = {
  "Web Technologies": "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
  "DevOps & Automation": "border-amber-300/20 bg-amber-300/10 text-amber-100",
  "Programming Languages": "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  Databases: "border-red-300/20 bg-red-300/10 text-red-100",
  "Cloud Platforms": "border-sky-300/20 bg-sky-300/10 text-sky-100",
  "Cloud & Cloud Security": "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
  "AI/ML & GenAI": "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  "Data & Analytics": "border-blue-300/20 bg-blue-300/10 text-blue-100",
  "Version Control": "border-slate-300/20 bg-white/[0.06] text-slate-100",
  "Soft Skills": "border-slate-300/20 bg-white/[0.06] text-slate-100",
};

const skillGroups = [
  {
    title: "Cloud Platforms",
    skills: ["AWS · primary focus", "OCI", "GCP", "Microsoft Azure"],
  },
  {
    title: "Cloud & Cloud Security",
    skills: [
      "Prisma Cloud",
      "Snyk",
      "Qualys",
      "AWS Security Hub",
      "AWS Inspector",
      "AWS Security Lake",
      "AWS Config",
      "OCSF",
      "Microsegmentation NSG",
    ],
  },
  {
    title: "AI/ML & GenAI",
    skills: [
      "Amazon Bedrock",
      "Bedrock Knowledge Bases",
      "OpenSearch",
      "RAG Pipelines",
      "Qwen3",
      "LoRA/PEFT",
      "PyTorch",
      "Hugging Face Transformers",
      "GGUF/Ollama",
      "Prompt Engineering",
      "TensorFlow",
      "Keras",
      "Scikit-learn",
    ],
  },
  {
    title: "Data & Analytics",
    skills: ["AWS Glue", "Athena", "Security Lake", "BigQuery", "ETL Workflows", "Telemetry Parsing", "Forecasting", "Risk Scoring"],
  },
  {
    title: "Programming Languages",
    skills: ["Python", "SQL", "Bash", "JavaScript", "Java", "TypeScript"],
  },
  {
    title: "Web Technologies",
    skills: ["ReactJS", "Tailwind CSS", "REST APIs", "FastAPI", "JavaScript", "TypeScript"],
  },
  {
    title: "DevOps & Automation",
    skills: ["Terraform", "Lambda", "EventBridge", "GCP Pub/Sub", "Cloud Functions", "Docker", "Git/GitHub"],
  },
  {
    title: "Databases",
    skills: ["Oracle DB", "MySQL", "MongoDB", "DynamoDB", "Neo4j"],
  },
  {
    title: "Version Control",
    skills: ["Git", "GitHub"],
  },
  {
    title: "Soft Skills",
    skills: ["Problem Solving", "Teamwork", "Adaptability", "Communication"],
  },
];

const SkillSection = ({ title, skills }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 18 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.42, ease: "easeOut" }}
    whileHover={{ y: -3 }}
  >
    <article className="mission-card relative h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/62 p-4 shadow-[0_18px_55px_rgba(2,6,23,0.2)] transition-all duration-300 hover:border-cyan-300/45 hover:shadow-[0_18px_60px_rgba(8,145,178,0.15)]">
      <h3 className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-white sm:text-base">
        {title}
      </h3>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            className={`cursor-default rounded-full border px-2.5 py-1 text-xs transition-all duration-200 ${
              badgeColors[title] || "border-white/15 bg-white/[0.06] text-white"
            }`}
            whileHover={{ y: -2 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </article>
  </motion.div>
);

const Skills = () => {
  return (
    <section className="portfolio-section">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
          Capabilities
        </p>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          What I can deliver for a team or project
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          AWS is the primary platform in my stack, supported by OCI, GCP, and Azure
          experience. The tools below connect cloud automation, AI, data, and security.
        </p>
      </motion.div>

      <div className="mb-5">
        <StoryGuide
          chapter="Engineering Stack"
          title="The stack is selected around delivery, not decoration."
          message="My AWS work includes Glue and Lambda ingestion, OCSF-normalized Security Lake data, Athena analytics, and Bedrock RAG. At Oracle, I work on SQL model fine-tuning and telemetry analytics, with OCI validation as another cloud example."
          align="right"
        />
      </div>

      <motion.div
        className="grid grid-cols-1 gap-3.5 sm:gap-4 md:grid-cols-2 xl:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {skillGroups.map((group) => (
          <SkillSection key={group.title} {...group} />
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;

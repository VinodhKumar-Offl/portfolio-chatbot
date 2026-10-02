import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import { FaBriefcase, FaChevronDown, FaUserGraduate } from "react-icons/fa";

const experienceData = [
  {
    company: "Oracle",
    role: "Associate Advanced Services Engineer",
    duration: "May 2026 - Present",
    location: "Bengaluru, Karnataka",
    status: "Current",
    accent: "from-red-400 to-orange-300",
    stack: [
      "Python",
      "Qwen3-1.7B",
      "LoRA/PEFT",
      "Oracle SQL",
      "GGUF",
      "OCI",
      "VCN Flow Logs",
      "Microsegmentation NSG",
      "AIX",
      "Oracle DB",
      "Analytics",
      "Forecasting",
      "APIs",
      "Risk Scoring",
    ],
    project: [
      "Fine-tuned Qwen3-1.7B with LoRA/PEFT using 5,000 Oracle SQL training and evaluation examples covering execution plans, schemas, indexes, joins, subqueries, and rewrite safety.",
      "Merged and quantized the model to Ollama-compatible GGUF. SQL rewrites were checked for Oracle syntax and estimated plan cost; 40% of evaluated rewrites had a lower estimated plan cost than the originals.",
      "Developed a Python telemetry analytics platform with parsers for AIX, Oracle Database, network, storage, and application data, plus ingestion pipelines, forecasting, REST APIs, and risk-scored vulnerability recommendations.",
      "Built a Python-based network validation tool to analyze OCI VCN flow logs against Microsegmentation NSG rules, enriching flows with NSG/rule metadata and generating accepted/rejected compliance reports.",
      "Implemented CIDR/IP, protocol, and port-range matching logic to accurately validate network traffic against security policies and improve flow-rule verification accuracy.",
      "Automated large-scale file organization and telemetry processing workflows using Python utilities, improving operational efficiency and reducing manual analysis effort.",
    ],
    impact: "Fine-tuning Oracle SQL models and building telemetry analytics, vulnerability assessment, and OCI validation tools.",
  },
  {
    company: "Deloitte",
    role: "Analyst - Cyber Enterprise Security (Cloud Security Engineer)",
    duration: "Oct 2024 - Apr 2026",
    location: "Bengaluru, Karnataka",
    status: "Completed",
    accent: "from-emerald-300 to-cyan-300",
    stack: [
      "AWS",
      "Prisma Cloud",
      "AquaSec",
      "Morpheus",
      "Amazon Bedrock",
      "RAG",
      "AWS Security Lake",
      "AWS Glue",
      "OCSF",
      "Athena",
      "Lambda",
      "ReactJS",
      "Tailwind CSS",
      "Terraform",
      "GCP",
    ],
    project: [
      "Built AWS Glue and Lambda pipelines to ingest findings from AWS Config, Inspector, Prisma Cloud, and Qualys; normalized events to OCSF and stored them in Security Lake for Athena analytics.",
      "Implemented enterprise RAG using Amazon Bedrock Knowledge Bases and OpenSearch vector search for knowledge retrieval.",
      "Built a GCP security data pipeline with Pub/Sub, Cloud Functions, and BigQuery, and supported Terraform deployments, VPCs, subnets, and Cloud NAT.",
      "Automated Windows EC2 vulnerability remediation using AWS Systems Manager runbooks.",
      "Debugged and executed the NVIDIA Morpheus lateral movement detection pipeline, resolving ControlMessage handling issues and validating outputs across dummy and original datasets.",
      "Extended threat alert summarization with Retrieval-Augmented Generation, optimized prompt templates, and addressed context-length issues to improve contextual threat detection accuracy.",
      "Performed AquaSec-to-Prisma Cloud policy research, gap analysis, control translation, rule configuration, CIS alignment, and functional/regression testing for assurance and runtime policies.",
      "Developed custom Bash checks to cover non-native Prisma Cloud policy requirements and improve detection coverage across enterprise security standards.",
      "Built a ReactJS and Tailwind CSS cloud security dashboard for centralized asset, ITSM, and vulnerability visibility backed by AWS Athena queries.",
      "Additionally automated Parquet conversion and EventBridge ingestion, and configured ALB, ACM, Route 53, and Cognito for application delivery.",
    ],
    impact: "Delivered cloud security automation, detection enrichment, policy migration, dashboards, and GenAI workflows across AWS, GCP, Prisma Cloud, and Bedrock.",
  },
];

const internshipData = [
  {
    company: "CodeWents (Internship)",
    role: "Software Developer Intern",
    duration: "Jun 2024 - Jul 2024",
    location: "Coimbatore, TN",
    stack: ["REST API", "Python-Flask", "Sphinx", "Git", "GitHub"],
    project:
      "Developed scalable software solutions using REST API and Python-Flask. Created clear documentation with Sphinx, managed work with Jira, and maintained code quality through Git and GitHub.",
  },
  {
    company: "Lets Grow More (Internship)",
    role: "Data Science Intern",
    duration: "Feb 2023 - Mar 2023",
    location: "Coimbatore, TN",
    stack: ["Python"],
    project:
      "Implemented data science projects across machine learning and computer vision, including Iris flower classification, image-to-pencil sketch transformation, and stock market prediction using time series forecasting.",
  },
  {
    company: "Prime Solutions (Internship)",
    role: "Web Developer Intern",
    duration: "Jul 2022 - Aug 2022",
    location: "Coimbatore, TN",
    stack: ["HTML", "CSS", "JavaScript", "MySQL"],
    project:
      "Worked on front-end development using HTML, CSS, and JavaScript to create dynamic, responsive web pages. Managed MySQL databases for smooth data storage and retrieval.",
  },
  {
    company: "Mr. Intelligence Inc (Internship)",
    role: "Software Developer Intern",
    duration: "Dec 2021 - Jan 2022",
    location: "Coimbatore, TN",
    stack: ["Flutter"],
    project:
      "Developed and designed user interfaces using Flutter, focusing on responsive, visually polished applications and hands-on work with Flutter widgets to improve user experience.",
  },
];

const AccordionItem = ({ exp, index = 0, compact = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: compact ? -3 : -6 }}
      viewport={{ once: true }}
      className="relative cursor-pointer"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {!compact && (
        <div className="absolute -left-[2.05rem] top-7 hidden h-4 w-4 rounded-full border-2 border-slate-950 bg-cyan-300 shadow-[0_0_0_6px_rgba(34,211,238,0.12)] lg:block" />
      )}
      <GlassCard className={`group relative max-w-none overflow-hidden border border-white/10 bg-slate-950/55 transition-all duration-300 hover:border-cyan-300/60 hover:shadow-[0_24px_70px_rgba(8,145,178,0.18)] backdrop-blur-md ${compact ? "p-5" : ""}`}>
        <div className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${exp.accent || "from-cyan-300 to-blue-500"}`} />
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-300/10 blur-2xl opacity-50 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${exp.accent || "from-cyan-300 to-blue-500"} text-xl font-black text-slate-950 shadow-lg`}>
              {exp.company.charAt(0)}
            </div>

            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-mono text-slate-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className={`${compact ? "text-xl" : "text-2xl"} font-bold text-white`}>{exp.role}</h4>
                {exp.status && (
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                    {exp.status}
                  </span>
                )}
              </div>

              <p className="text-sm text-cyan-300 mb-2">
                {exp.company} <span className="text-gray-500">/</span>{" "}
                <span className="text-gray-400">{exp.duration}</span>
                {exp.location && (
                  <>
                    <span className="text-gray-500"> / </span>
                    <span className="text-gray-400">{exp.location}</span>
                  </>
                )}
              </p>

              <p className="max-w-3xl text-sm leading-relaxed text-slate-300">
                {exp.impact}
              </p>
            </div>
          </div>

          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-9 w-9 items-center justify-center self-end rounded-full border border-cyan-300/25 bg-cyan-300/10 text-sm text-cyan-200 sm:self-start"
            aria-hidden="true"
          >
            <FaChevronDown />
          </motion.span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {exp.stack.slice(0, isOpen ? exp.stack.length : 5).map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 bg-white/10 text-white rounded-full border border-white/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="mt-5 border-t border-white/10 pt-5 text-gray-300 leading-relaxed">
                {Array.isArray(exp.project) ? (
                  <ul className="space-y-3">
                    {exp.project.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{exp.project}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.article>
  );
};

const ExperienceSection = ({ title, icon: Icon, data, gridCols = 1, timeline = false }) => (
  <div className="mb-12 sm:mb-16 max-w-7xl mx-auto">
    <motion.h3
      className="text-2xl sm:text-3xl font-bold mb-7 sm:mb-9 text-center flex items-center justify-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Icon className="text-cyan-400" />
      {title}
    </motion.h3>

    <div className={`${timeline ? "relative grid gap-5 lg:ml-8 lg:border-l lg:border-cyan-300/20 lg:pl-8" : `grid gap-5 ${gridCols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}`}>
      {data.map((exp, index) => (
        <AccordionItem
          key={`${exp.company}-${exp.role}`}
          exp={exp}
          index={index}
          compact={!timeline}
        />
      ))}
    </div>
  </div>
);

const Experience = () => (
  <section className="portfolio-section">
    <motion.div
      className="mb-10 sm:mb-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
        Experience Timeline
      </p>
      <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-300 via-cyan-300 to-emerald-300">
        Oracle AI and telemetry, Deloitte cloud data engineering
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-slate-300">
        From AWS data pipelines and enterprise RAG to Oracle SQL fine-tuning and telemetry analytics.
      </p>
    </motion.div>

    <ExperienceSection
      title="Professional Experience"
      icon={FaBriefcase}
      data={experienceData}
      gridCols={1}
      timeline
    />

    <ExperienceSection
      title="Internships"
      icon={FaUserGraduate}
      data={internshipData}
      gridCols={2}
    />
  </section>
);

export default Experience;

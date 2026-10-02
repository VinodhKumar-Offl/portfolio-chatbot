import { motion } from "framer-motion";
import { FaArrowUpRightFromSquare, FaBrain, FaEye, FaRecycle, FaRobot } from "react-icons/fa6";
import StoryGuide from "../components/StoryGuide";

import portfolioImg from "../assets/new image.jpg";
import trashClassificationImg from "../assets/project-1.jpg";
import drowsinessDetectionImg from "../assets/project-2.png";
import faceRecognitionImg from "../assets/project-3.jpg";

const projects = [
  {
    title: "Portfolio with ChatBot",
    eyebrow: "Current Portfolio Assistant",
    icon: FaRobot,
    description:
      "Built an earlier portfolio assistant with AWS Lex and Amazon Bedrock. The current version uses Gemini to answer questions from the resume and curated profile context.",
    outcome:
      "Useful pattern for internal knowledge assistants, portfolio assistants, support copilots, and controlled Q&A systems.",
    techStack: [
      "Gemini",
      "LangChain",
      "Express",
      "ReactJS",
      "NodeJS",
      "Tailwind CSS",
      "PDF context",
    ],
    image: portfolioImg,
    link: "https://vinodhkumar.netlify.app",
    cta: "View Live",
  },
  {
    title: "Trash Classification",
    eyebrow: "Computer Vision",
    icon: FaRecycle,
    description:
      "Developed a computer vision classifier that identifies waste categories and supports better disposal decisions.",
    outcome:
      "Shows practical image classification, Flask delivery, model integration, and measurable accuracy reporting.",
    techStack: [
      "HTML",
      "CSS",
      "Flask (Python)",
      "Machine Learning (Keras, TensorFlow)",
      "OpenCV",
      "NumPy",
    ],
    image: trashClassificationImg,
    link: "https://github.com/VinodhKumar-Offl/Trashnet",
    cta: "View GitHub",
  },
  {
    title: "Driver Drowsiness Detection",
    eyebrow: "Safety AI",
    icon: FaEye,
    description:
      "Implemented a real-time computer vision workflow using facial landmarks and driver alertness signals.",
    outcome:
      "Shows how I approach safety-focused detection, signal thresholds, and real-time visual processing.",
    techStack: [
      "Python",
      "OpenCV",
      "dlib",
      "NumPy",
      "Machine Learning (Classification, Regression trees)",
    ],
    image: drowsinessDetectionImg,
    link: "https://github.com/VinodhKumar-Offl/Driver-Drowsiness-detection",
    cta: "View GitHub",
  },
  {
    title: "Face Recognition",
    eyebrow: "Recognition Pipeline",
    icon: FaBrain,
    description:
      "Built a facial recognition workflow using landmark detection, feature extraction, and classical ML tooling.",
    outcome:
      "Shows the AI/ML foundation behind my later cloud security automation and GenAI assistant work.",
    techStack: ["Python", "OpenCV", "NumPy", "dlib", "face_recognition", "scikit-learn"],
    image: faceRecognitionImg,
    link: "https://github.com/VinodhKumar-Offl/Face-Recognition",
    cta: "View GitHub",
  },
];

const Projects = () => {
  return (
    <section className="portfolio-section">
      <motion.div
        className="mb-8 text-center sm:mb-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
          Proof of Work
        </p>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Practical builds that show how I think and deliver
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          The portfolio assistant evolved from AWS Lex and Bedrock to the current Gemini version, followed by
          computer vision projects that show model and application foundations.
        </p>
      </motion.div>

      <div className="mb-5">
        <StoryGuide
          chapter="Project Context"
          title="The pattern: build, explain, and make it usable."
          message="The portfolio assistant started with AWS Lex and Amazon Bedrock. Its current version uses Gemini, LangChain, and resume context. Enterprise Bedrock RAG work at Deloitte is a separate experience."
        />
      </div>

      <motion.div
        className="grid gap-5 lg:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {projects.map((project, index) => {
          const Icon = project.icon;

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ delay: index * 0.06, duration: 0.45, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-[1.75rem] no-underline"
              >
                <article className="mission-card relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/65 shadow-[0_24px_70px_rgba(2,6,23,0.22)] transition-all duration-300 group-hover:border-cyan-300/45 group-hover:shadow-[0_28px_90px_rgba(8,145,178,0.2)]">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-300 via-cyan-300 to-emerald-300 opacity-80" />
                  <div className="grid h-full sm:grid-cols-[0.62fr_1.38fr]">
                    <div
                      className={`relative overflow-hidden bg-slate-950 ${
                        project.title === "Portfolio with ChatBot"
                          ? "h-28 sm:h-32 lg:h-36"
                          : "h-32 sm:h-40 lg:h-44"
                      }`}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`h-full w-full transition duration-500 group-hover:scale-[1.03] ${
                          project.title === "Portfolio with ChatBot"
                            ? "object-cover object-top"
                            : "object-contain object-center p-2"
                        }`}
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                    </div>

                    <div className="flex flex-col p-5 sm:p-6">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
                          {project.eyebrow}
                        </span>
                        <Icon className="shrink-0 text-xl text-emerald-300" />
                      </div>
                      <h3 className="text-2xl font-black text-white">{project.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        {project.description}
                      </p>
                      <p className="mt-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-sm leading-relaxed text-cyan-50">
                        {project.outcome}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.techStack.map((tech, techIdx) => (
                          <motion.span
                            key={techIdx}
                            className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-slate-100"
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.2 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-cyan-200 transition-colors group-hover:text-cyan-100">
                        {project.cta}
                        <FaArrowUpRightFromSquare className="text-xs" />
                      </span>
                    </div>
                  </div>
                </article>
              </a>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Projects;

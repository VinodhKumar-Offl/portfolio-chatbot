import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBrain,
  FaCloud,
  FaCode,
  FaDownload,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import profile from "../assets/profile.jpeg";

const highlights = [
  { value: "02 yrs", label: "Engineering delivery" },
  { value: "AWS", label: "Primary cloud platform" },
  { value: "RAG + LLM", label: "Applied AI systems" },
  { value: "Python", label: "Automation and analytics" },
];

const focusAreas = [
  {
    icon: FaCloud,
    number: "01",
    title: "AWS cloud engineering",
    text: "AWS architecture, security data pipelines, and automation, with OCI network validation experience.",
  },
  {
    icon: FaBrain,
    number: "02",
    title: "Applied AI",
    text: "Bedrock RAG assistants and Qwen3 SQL fine-tuning grounded in real operational data.",
  },
  {
    icon: FaCode,
    number: "03",
    title: "Data and automation",
    text: "Python pipelines, telemetry analytics, APIs, and dashboards that make complex systems clear.",
  },
];

const Home = () => (
  <section className="portfolio-section home-editorial">
    <div className="home-editorial-grid">
      <motion.div
        className="home-editorial-copy"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <p className="home-kicker"><span /> Vinodh Kumar R · AWS Cloud & AI Engineer</p>
        <h1>I build <em>AWS cloud systems & AI agents.</em></h1>
        <p className="home-lede">
          I turn cloud complexity into practical tools, with AWS at the center:
          Security Lake pipelines, Bedrock assistants, automation, and analytics.
          At Oracle, I fine-tune SQL models and build telemetry analytics tools,
          alongside OCI validation work.
        </p>

        <div className="home-actions">
          <a href="#projects" className="primary-action">Explore my work <FaArrowRight aria-hidden="true" /></a>
          <a href="#contact" className="secondary-action">Let's talk</a>
          <a href="/VinodhKumar_Resume.pdf" download className="home-resume-link"><FaDownload aria-hidden="true" /> Resume</a>
        </div>

        <div className="home-profile-links" aria-label="Professional profiles">
          <a href="https://www.linkedin.com/in/vinodhkumar-r/" target="_blank" rel="noopener noreferrer"><FaLinkedin aria-hidden="true" /> LinkedIn</a>
          <a href="https://github.com/VinodhKumar-Offl" target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true" /> GitHub</a>
          <a href="https://topmate.io/vinodh_kumar_r10/" target="_blank" rel="noopener noreferrer">Topmate <FaArrowRight aria-hidden="true" /></a>
        </div>
      </motion.div>

      <motion.div
        className="home-portrait"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12 }}
      >
        <img src={profile} alt="Vinodh Kumar R" />
        <div className="home-portrait-caption">
          <span>Currently at Oracle</span>
          <strong>Cloud, data, and AI in practice.</strong>
        </div>
      </motion.div>
    </div>

    <div className="home-highlights" aria-label="Professional highlights">
      {highlights.map(({ value, label }) => (
        <div key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>

    <div className="home-focus-heading">
      <p className="home-kicker"><span /> What I work on</p>
      <h2>Ideas made useful.</h2>
      <p>Three connected areas shape the work, from infrastructure through intelligent applications.</p>
    </div>
    <div className="home-focus-grid">
      {focusAreas.map(({ icon: Icon, number, title, text }) => (
        <article className="home-focus-card" key={title}>
          <div className="home-focus-top"><span>{number}</span><Icon aria-hidden="true" /></div>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  </section>
);

export default Home;

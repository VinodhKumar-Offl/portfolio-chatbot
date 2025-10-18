import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../components/GlassCard";
import { FaBriefcase, FaUserGraduate } from "react-icons/fa";
import { useState } from "react";

// Full-time experience data
const experienceData = [
  {
    company: "Deloitte",
    role: "Analyst (Cyber - Enterprise Security)",
    duration: "Oct 2024 – Present",
    stack: [
      "AWS", "Prisma Cloud", "ReactJS", "ViteJS", "Tailwind CSS","Qualys","GCP"
    ],
    project:
      "Worked in Developing AVTR (Automating Vulnerability Testing & Remediation), an tool for automating cloud vulnerability detection and suppression. Integrated AWS services and Prisma Cloud for security automation.",
  },
];

// Internship data
const internshipData = [
  {
    company: "CodeWents (Internship)",
    role: "Software Developer Intern",
    duration: "Jun 2024 – Jul 2024",
    stack: ["REST API", "Python-Flask", "Sphinx", "Git", "GitHub"],
    project:
      "Developed scalable APIs with Python-Flask, documented with Sphinx, and managed via GitHub & Jira.",
  },
  {
    company: "Lets Grow More (Internship)",
    role: "Data Science Intern",
    duration: "Feb 2023 – Mar 2023",
    stack: ["Python"],
    project:
      "Built ML projects including Iris classification, image-to-pencil sketch, and stock market prediction using time series analysis.",
  },
  {
    company: "Prime Solutions (Internship)",
    role: "Web Developer Intern",
    duration: "Jul 2022 – Aug 2022",
    stack: ["HTML", "CSS", "JavaScript", "MySQL"],
    project:
      "Created dynamic, responsive web pages and managed MySQL databases for web app backend.",
  },
  {
    company: "Mr. Intelligence Inc (Internship)",
    role: "Software Developer Intern",
    duration: "Dec 2021 – Jan 2022",
    stack: ["Flutter"],
    project:
      "Built UI-rich applications using Flutter, focusing on responsive layouts and smooth UX using custom widgets.",
  },
];

// Accordion Item Component — whole card clickable
const AccordionItem = ({ exp }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      className="mb-4 cursor-pointer"
      onClick={handleToggle}  // Click anywhere on the card toggles details
    >
      <GlassCard
        className="transition-all duration-300 border border-white/10 hover:border-cyan-400 hover:shadow-[0_0_25px_4px_rgba(0,255,255,0.2)] backdrop-blur-md"
      >
        {/* Header: Role, Company & Duration, Toggle Arrow */}
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-xl font-semibold">{exp.role}</h4>
            <p className="text-sm text-cyan-300 mb-1">
              {exp.company} — <span className="text-gray-400">{exp.duration}</span>
            </p>
          </div>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-cyan-400 select-none"
            aria-hidden="true"
          >
            ▼
          </motion.span>
        </div>

        {/* Collapsible Details Section */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <p className="mt-2 text-gray-300 leading-relaxed">{exp.project}</p>
              {exp.client && (
                <p className="mt-2 text-sm text-gray-400">
                  <strong className="text-cyan-400">Client:</strong> {exp.client}
                </p>
              )}
              {exp.roleDetail && (
                <p className="text-sm text-gray-400">
                  <strong className="text-cyan-400">Role:</strong> {exp.roleDetail}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 bg-white/10 text-white rounded-full border border-white/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
};

// Section component with optional 2-column grid for internships
const ExperienceSection = ({ title, icon: Icon, data, gridCols = 1 }) => (
  <div className="mb-20 max-w-6xl mx-auto">
    <motion.h3
      className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Icon className="text-cyan-400" />
      {title}
    </motion.h3>

    <div className={`grid gap-8 ${gridCols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
      {data.map((exp, index) => (
        <AccordionItem key={index} exp={exp} />
      ))}
    </div>
  </div>
);

// Main Experience component
const Experience = () => (
  <div className="max-w-6xl mx-auto px-4 py-16 text-white">
    {/* Professional Experience (single column) */}
    <ExperienceSection
      title="Professional Experience"
      icon={FaBriefcase}
      data={experienceData}
      gridCols={1}
    />

    {/* Internships (two columns) */}
    <ExperienceSection
      title="Internships"
      icon={FaUserGraduate}
      data={internshipData}
      gridCols={2}
    />
  </div>
);

export default Experience;

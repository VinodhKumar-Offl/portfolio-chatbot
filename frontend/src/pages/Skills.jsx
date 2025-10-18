import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";

const badgeColors = {
  "Web Technologies": "bg-cyan-600 hover:bg-cyan-700",
  Cloud: "bg-indigo-600 hover:bg-indigo-700",
  Tools: "bg-amber-600 hover:bg-amber-700",
  Languages: "bg-emerald-600 hover:bg-emerald-700",
  Databases: "bg-rose-600 hover:bg-rose-700",
  "Cloud & Cloud Security": "bg-violet-600 hover:bg-violet-700",
  "Version Control": "bg-sky-600 hover:bg-sky-700",
  "Soft Skills": "bg-slate-600 hover:bg-slate-700",
};

const SkillSection = ({ title, skills }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <GlassCard
      className="min-h-[250px] flex flex-col justify-between
                 border border-transparent hover:border-cyan-400
                 transition-all duration-300
                 hover:shadow-[0_0_25px_4px_rgba(0,255,255,0.5)]"
    >
      <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            className={`px-4 py-2 rounded-full text-white text-sm shadow
                        cursor-default transition-all duration-200
                        ${badgeColors[title] || "bg-white/10 hover:bg-white/20"}`}
            whileHover={{ scale: 1.08 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </GlassCard>
  </motion.div>
);

const Skills = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 text-white">
      <motion.h2
        className="text-4xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Skills
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <SkillSection
          title="Web Technologies"
          skills={["React.js", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "Vite"]}
        />
        <SkillSection
          title="Tools"
          skills={["Jira", "Postman", "Figma", "VS Code", "Android Studio", "Draw.io"]}
        />
        <SkillSection
          title="Languages"
          skills={["Java", "JavaScript", "Python", "TypeScript"]}
        />
        <SkillSection
          title="Databases"
          skills={["MySQL", "MongoDB", "DynamoDB", "Neo4j"]}
        />
        <SkillSection
          title="Cloud & Cloud Security"
          skills={["Prisma Cloud", "AWS", "GCP"]}
        />
        <SkillSection
          title="Version Control"
          skills={["Git", "GitHub"]}
        />
        <SkillSection
          title="Soft Skills"
          skills={["Problem Solving", "Teamwork", "Adaptability", "Communication"]}
        />
      </motion.div>
    </section>
  );
};

export default Skills;

import { motion } from "framer-motion";
import { FaSchool, FaUniversity } from "react-icons/fa";

const education = [
  {
    icon: FaSchool,
    level: "SSLC",
    institution: "Vimal Jyothi Convent Matric Higher Secondary School",
    location: "Coimbatore, Tamil Nadu",
    score: "94%",
    year: "2018",
  },
  {
    icon: FaSchool,
    level: "HSC",
    institution: "Mani Higher Secondary School",
    location: "Coimbatore, Tamil Nadu",
    score: "86%",
    year: "2020",
  },
  {
    icon: FaUniversity,
    level: "Bachelor's Degree - Computer Science",
    institution: "SNS College Of Technology",
    location: "Coimbatore, Tamil Nadu",
    score: "CGPA 9.37",
    year: "2020 - 2024",
  },
];

const Education = () => {
  return (
    <section className="portfolio-section">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        viewport={{ once: true }}
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
          Education
        </p>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Academic foundation behind the engineering work
        </h2>
      </motion.div>

      <div className="relative mx-auto max-w-5xl">
        <div className="absolute left-6 top-3 hidden h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-cyan-300 via-emerald-300 to-red-300 sm:block" />
        <div className="grid gap-4">
          {education.map(({ icon: Icon, level, institution, location, score, year }, index) => (
            <motion.article
              key={level}
              className="relative rounded-[1.5rem] border border-white/10 bg-slate-950/65 p-5 shadow-[0_18px_55px_rgba(2,6,23,0.2)] sm:ml-16"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -4, borderColor: "rgba(103,232,249,0.45)" }}
            >
              <div className="absolute -left-[4.55rem] top-5 hidden h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950 shadow-[0_0_0_8px_rgba(34,211,238,0.12)] sm:flex">
                <Icon />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">
                      {year}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-mono text-slate-300">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white">{level}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {institution}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{location}</p>
                </div>
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-left sm:text-right">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
                    Score
                  </p>
                  <p className="mt-1 text-lg font-black text-white">{score}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

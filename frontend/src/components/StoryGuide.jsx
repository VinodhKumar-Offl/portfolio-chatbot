import { motion } from "framer-motion";
import profile from "../assets/profile.jpeg";

const StoryGuide = ({ chapter, title, message, align = "left" }) => {
  const reverse = align === "right";

  return (
    <motion.div
      className={`mission-card story-guide relative overflow-hidden rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/72 p-4 sm:p-5 ${
        reverse ? "md:flex-row-reverse" : ""
      } flex flex-col gap-4 md:flex-row md:items-center`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-[1.35rem] sm:h-32 sm:w-32 sm:rounded-[1.75rem]">
        <img
          src={profile}
          alt="Vinodh Kumar R"
          className="h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-300">
          {chapter}
        </p>
        <h3 className="mt-2 text-lg font-black text-white sm:text-xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
          {message}
        </p>
      </div>
    </motion.div>
  );
};

export default StoryGuide;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

import leaderAward from "../assets/leader.jpeg";
import allRounder from "../assets/all-rounder-optimized.jpg";
import maniMagan from "../assets/mani magan.jpeg";
import state3 from "../assets/state3.jpg";

const awards = [
  {
    title: "Leader of Today Award",
    image: leaderAward,
  },
  {
    title: "All Rounder Performer Award",
    image: allRounder,
  },
  {
    title: "Mani Magan Award",
    image: maniMagan,
  },
  {
    title: "State III and District I in English Proficiency Test",
    image: state3,
  },
];

const Awards = () => {
  const [modalImage, setModalImage] = useState(null);

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
          Recognition
        </p>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Awards and achievements from academics and leadership
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {awards.map((award, idx) => (
          <motion.article
            key={award.title}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setModalImage(award)}
            className="group cursor-pointer overflow-hidden rounded-[1.25rem] border border-white/10 bg-slate-950/65 p-2 shadow-[0_18px_55px_rgba(2,6,23,0.2)] transition-all duration-300 hover:border-cyan-300/45 sm:rounded-[1.5rem] sm:p-3"
          >
            <div className="overflow-hidden rounded-[1.1rem] border border-white/10 bg-slate-900">
              <img
                src={award.image}
                alt={award.title}
                className="h-32 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-44 lg:h-48"
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-2 text-center sm:p-3">
              <h3 className="text-sm font-black leading-snug text-white sm:text-lg">
                {award.title}
              </h3>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <AnimatePresence>
        {modalImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/82 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImage(null)}
          >
            <motion.div
              className="relative max-w-4xl rounded-[1.5rem] border border-cyan-300/25 bg-slate-950 p-4 shadow-[0_30px_120px_rgba(8,145,178,0.24)]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={modalImage.image}
                alt={modalImage.title}
                className="max-h-[78vh] max-w-[90vw] rounded-xl object-contain"
                loading="lazy"
                decoding="async"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
              <p className="mt-4 text-center text-lg font-semibold text-cyan-200">
                {modalImage.title}
              </p>
              <button
                onClick={() => setModalImage(null)}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-white transition hover:border-red-300/50"
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Awards;

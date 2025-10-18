import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../components/GlassCard";

// 📸 Award images
import leaderAward from "../assets/leader.jpeg";
import allRounder from "../assets/all rounder.png";
import maniMagan from "../assets/mani magan.jpeg";
import state3 from "../assets/state3.jpg"; // Update path if needed

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
  }
];

const Awards = () => {
  const [modalImage, setModalImage] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 text-white">
      {/* 🌈 Gradient Heading with Glow */}
      <motion.h2
        className="text-4xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Awards & Achievements
      </motion.h2>

      {/* 🧊 Award Cards Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
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
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <GlassCard
              className="relative flex flex-col items-center text-center gap-6 p-6 border border-white/20
                         hover:border-cyan-400 hover:shadow-[0_0_30px_5px_rgba(0,255,255,0.4)]
                         transition-all duration-500 cursor-pointer w-full max-w-[300px] mx-auto
                         rounded-2xl bg-gradient-to-b from-white/10 to-white/5"
            >
              <motion.img
                src={award.image}
                alt={award.title}
                className="w-[240px] h-[240px] object-cover rounded-lg border border-white/30 shadow-lg mb-4"
                whileHover={{ scale: 1.1, rotate: 2 }}
                transition={{ duration: 0.4 }}
                onClick={() => setModalImage(award)}
              />
              <h3 className="text-xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-[0_2px_8px_rgba(0,255,255,0.6)]">
                {award.title}
              </h3>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* 🖼️ Modal with Enhanced Award Display */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImage(null)}
          >
            <motion.div
              className="relative p-4 rounded-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
            >
              <motion.img
                src={modalImage.image}
                alt={modalImage.title}
                className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl border-4 border-cyan-400 shadow-xl"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.4 }}
              />

              {/* Award title below image */}
              <p className="text-center text-lg font-semibold text-cyan-300 mt-4">
                {modalImage.title}
              </p>

              {/* Close button */}
              <button
                onClick={() => setModalImage(null)}
                className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm"
                aria-label="Close modal"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Awards;

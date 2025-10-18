import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../components/GlassCard";
import { FaUserGraduate } from "react-icons/fa";

// Timeline data
const education = [
  {
    level: "SSLC",
    institution: "Vimal Jyothi Convent Matric Higher Secondary School",
    location: "Coimbatore, Tamil Nadu",
    score: "94%",
    year: "2018",
  },
  {
    level: "HSC",
    institution: "Mani Higher Secondary School",
    location: "Coimbatore, Tamil Nadu",
    score: "86%",
    year: "2020",
  },
  {
    level: "UG - CSE",
    institution: "SNS College Of Technology",
    location: "Coimbatore, Tamil Nadu",
    score: "93%",
    year: "2024",
  },
];

const Education = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealedIndices, setRevealedIndices] = useState([0]);
  const containerRef = useRef(null);

  // Reset animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveIndex(0);
          setRevealedIndices([0]);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // Progress animation on scroll
  useEffect(() => {
    if (activeIndex < education.length - 1) {
      const timer = setTimeout(() => {
        const next = activeIndex + 1;
        setActiveIndex(next);
        setRevealedIndices((old) => [...old, next]);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  const iconY = activeIndex * 220;

  const cardVariants = {
    hidden: { opacity: 0, x: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={containerRef}
      className="max-w-4xl mx-auto px-4 py-10 -mt-24 text-white"
    >
      {/* Heading */}
      <motion.h2
        className="text-4xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Education Timeline
      </motion.h2>

      {/* Timeline Container */}
      <div className="relative h-[540px] sm:h-auto">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-cyan-700 opacity-50"></div>

        {/* Floating Icon */}
        <motion.div
          className="absolute left-[18px] top-0 text-cyan-400 z-10"
          animate={{ y: iconY }}
          transition={{ type: "spring", stiffness: 50, damping: 12 }}
        >
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
            <FaUserGraduate size={30} />
          </motion.div>
        </motion.div>

        {/* Timeline Items */}
        <div className="pl-14 sm:pl-16 space-y-20">
          {education.map((edu, idx) => {
            const isVisible = revealedIndices.includes(idx);
            return (
              <AnimatePresence key={idx}>
                {isVisible && (
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="relative"
                  >
                    {/* Dot */}
                    <div className="absolute left-[-50px] top-4 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_12px_4px_rgba(0,255,255,0.4)]"></div>

                    <GlassCard className="transition-all duration-300 border border-cyan-400 shadow-[0_0_25px_4px_rgba(0,255,255,0.3)] bg-white/10 backdrop-blur-md">
                      <h3 className="text-xl font-semibold text-cyan-300">{edu.level}</h3>
                      <p className="text-sm text-cyan-400">
                        {edu.institution} —{" "}
                        <span className="text-gray-400">{edu.location}</span>
                      </p>
                      <p className="text-gray-300 mt-2">
                        <strong>Score:</strong> {edu.score} |{" "}
                        <strong>Year:</strong> {edu.year}
                      </p>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Education;

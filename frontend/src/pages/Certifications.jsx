import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// ✅ Import badge images
import awsAiEarly from "../assets/aws-certified-ai-practitioner-early-adopter.png";
import awsAi from "../assets/aws-certified-ai-practitioner.png";
import awsCloud from "../assets/aws-cloud-practitioner.png";
import awsMlSpecialty from "../assets/aws-certified-machine-learning-specialty.png";
import awsMlAssociate from "../assets/aws-certified-machine-learning-engineer-associate.png";
import pccse from "../assets/prisma-certified-cloud-security-engineer.png";
import ibmDesign from "../assets/ibm.png";
import javaGold from "../assets/java_5_star.png";

// ✅ Badge image data
const badgeImages = [
  { src: awsAiEarly, alt: "AWS AI Practitioner (Early Adopter)" },
  { src: awsAi, alt: "AWS AI Practitioner" },
  { src: awsCloud, alt: "AWS Cloud Practitioner" },
  { src: awsMlSpecialty, alt: "AWS ML Specialty" },
  { src: awsMlAssociate, alt: "AWS ML Associate" },
  { src: pccse, alt: "PCCSE" },
  { src: ibmDesign, alt: "IBM Enterprise Design Thinking Practitioner" },
  { src: javaGold, alt: "Hackerrank Java Gold Badge" },
];

const Certifications = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null); // clicked badge index

  // Auto-cycle through badges unless user is hovering
  useEffect(() => {
    if (hoveredIndex !== null) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % badgeImages.length);
    }, 1000);
    return () => clearInterval(timer);
  }, [hoveredIndex]);

  const previewBadge = selectedIndex !== null ? badgeImages[selectedIndex] : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-14 text-white">
      {/* Title */}
      <motion.h2
        className="text-4xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Certifications & Badges
      </motion.h2>

      {/* Preview card (shown only when selected) */}
      {previewBadge && (
        <motion.div
          key={selectedIndex}
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="p-6 bg-white/10 border border-cyan-400 rounded-3xl shadow-[0_0_40px_rgba(0,255,255,0.7)] flex flex-col items-center">
            <img
              src={previewBadge.src}
              alt={previewBadge.alt}
              className="h-48 w-auto object-contain mb-4"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/200x200?text=Missing";
              }}
            />
            <h3 className="text-xl font-semibold text-center max-w-xs">{previewBadge.alt}</h3>
            <button
              onClick={() => setSelectedIndex(null)}
              className="mt-4 px-4 py-1 text-sm text-white bg-cyan-600 hover:bg-cyan-700 rounded-full"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}

      {/* Badge Carousel */}
      <div className="flex flex-wrap justify-center items-center gap-8">
        {badgeImages.map((badge, index) => {
          const isActive =
            hoveredIndex !== null ? hoveredIndex === index : activeIndex === index;

          return (
            <motion.div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedIndex(index)}
              className={`p-3 rounded-2xl bg-white/10 transition-all duration-500 ease-in-out cursor-pointer ${
                isActive
                  ? "z-10 border-4 border-cyan-400 shadow-[0_0_35px_rgba(0,255,255,0.6)] scale-[1.4]"
                  : "opacity-40 scale-90"
              }`}
              animate={
                isActive
                  ? {
                      y: [0, -8, 0], // floating
                    }
                  : { y: 0 }
              }
              transition={{
                duration: 1.2,
                repeat: isActive ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              <img
                src={badge.src}
                alt={badge.alt}
                className={`object-contain ${isActive ? "h-28 md:h-32" : "h-20 md:h-24"} w-auto`}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/100x100?text=Missing";
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Certifications;

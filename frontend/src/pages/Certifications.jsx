import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import awsAiEarly from "../assets/aws-certified-ai-practitioner-early-adopter.png";
import awsAi from "../assets/aws-certified-ai-practitioner.png";
import awsCloud from "../assets/aws-cloud-practitioner.png";
import awsMlSpecialty from "../assets/aws-certified-machine-learning-specialty.png";
import awsMlAssociate from "../assets/aws-certified-machine-learning-engineer-associate.png";
import googleCloudEngineer from "../assets/associate-cloud-engineer-certification.png";
import googleCloudLeader from "../assets/cloud-digital-leader-certification.png";
import pccse from "../assets/prisma-certified-cloud-security-engineer.png";
import ibmDesign from "../assets/ibm.png";
import javaGold from "../assets/java_5_star.png";
import azureAdmin from "../assets/azure badge.jpeg";
import ociAiFoundations from "../assets/oci-ai-foundations-associate-training-2242794648662742_m.webp";

const featuredCertifications = [
  "AWS Certified Machine Learning - Specialty",
  "AWS Certified AI Practitioner",
  "Oracle Cloud Infrastructure 2025 AI Foundations Associate",
  "Snyk Certified Implementation Professional",
  "Google Associate Cloud Engineer",
  "Microsoft Certified: Azure Administrator Associate",
  "Prisma Certified Cloud Security Engineer (PCCSE)",
];

const badgeImages = [
  { src: awsAiEarly, alt: "AWS AI Practitioner (Early Adopter)" },
  { src: awsAi, alt: "AWS Certified AI Practitioner - 2025" },
  { src: awsCloud, alt: "AWS Cloud Practitioner" },
  { src: awsMlSpecialty, alt: "AWS Certified Machine Learning Specialty - 2025" },
  { src: awsMlAssociate, alt: "AWS ML Associate" },
  { src: googleCloudLeader, alt: "Google Cloud Digital Leader" },
  { src: googleCloudEngineer, alt: "Google Cloud Associate Cloud Engineer" },
  { src: azureAdmin, alt: "Microsoft Certified: Azure Administrator Associate" },
  { src: ociAiFoundations, alt: "Oracle Cloud Infrastructure 2025 AI Foundations Associate" },
  { src: pccse, alt: "Prisma Certified Cloud Security Engineer (PCCSE) - 2024" },
  { src: ibmDesign, alt: "IBM Enterprise Design Thinking Practitioner" },
  { src: javaGold, alt: "Hackerrank Java Gold Badge" },
];

const Certifications = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

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
    <section className="portfolio-section">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
          Certifications
        </p>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Certifications across cloud, AI, security, and programming
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Credentials across AWS, OCI, Google Cloud, Azure, AI, and security.
          Select a badge below to view it in detail.
        </p>
      </motion.div>

      <div className="mb-8 sm:mb-10">
        <h3 className="mb-4 text-xl font-bold text-white">Featured certifications</h3>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCertifications.map((certification) => (
            <li key={certification} className="mission-card rounded-2xl border border-white/10 p-4 text-sm font-semibold text-slate-200">
              {certification}
            </li>
          ))}
        </ul>
      </div>

      <h3 className="mb-5 text-center text-xl font-bold text-white">Credential badge gallery</h3>
      {previewBadge && (
        <motion.div
          key={selectedIndex}
          className="mb-8 flex justify-center sm:mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col items-center rounded-[1.75rem] border border-cyan-300/25 bg-slate-950/85 p-6 shadow-[0_28px_90px_rgba(8,145,178,0.22)]">
            <img
              src={previewBadge.src}
              alt={previewBadge.alt}
              className="mb-4 h-48 w-auto object-contain"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/200x200?text=Missing";
              }}
            />
            <h3 className="max-w-xs text-center text-xl font-bold text-white">{previewBadge.alt}</h3>
            <button
              onClick={() => setSelectedIndex(null)}
              className="mt-4 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/15"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
        {badgeImages.map((badge, index) => {
          const isActive =
            hoveredIndex !== null ? hoveredIndex === index : activeIndex === index;

          return (
            <motion.div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedIndex(index)}
              className={`cursor-pointer rounded-2xl border bg-slate-950/65 p-3 transition-all duration-500 ease-in-out ${
                isActive
                  ? "z-10 scale-105 border-cyan-300/55 shadow-[0_20px_60px_rgba(8,145,178,0.2)]"
                  : "scale-95 border-white/10 opacity-70"
              }`}
              animate={
                isActive
                  ? {
                      y: [0, -6, 0],
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
                className={`object-contain ${isActive ? "h-24 md:h-28" : "h-20 md:h-24"} w-auto`}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/100x100?text=Missing";
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Certifications;

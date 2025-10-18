import { motion } from "framer-motion";
// Remove GlassCard import since we're not using it now

// Import or add your project images here:
import trashClassificationImg from "../assets/project-1.jpg";
import drowsinessDetectionImg from "../assets/project-2.png";
import faceRecognitionImg from "../assets/project-3.jpg";

const projects = [
  {
    title: "Trash Classification",
    description:
      "Led the development and deployment of an AI-powered trash classification system, achieving a classification accuracy of 95% and reducing incorrect waste disposal by 30%.",
    techStack: [
      "HTML",
      "CSS",
      "Flask (Python)",
      "Machine Learning (Keras, TensorFlow)",
      "OpenCV",
      "NumPy",
    ],
    image: trashClassificationImg,
    link: "https://github.com/VinodhKumar-Offl/Trashnet",
  },
  {
    title: "Driver Drowsiness Detection",
    description:
      "Developed and implemented a driver drowsiness detection system, reducing drowsy driving incidents by 20%.",
    techStack: [
      "Python",
      "OpenCV",
      "dlib",
      "NumPy",
      "Machine Learning (Classification, Regression trees)",
    ],
    image: drowsinessDetectionImg,
    link: "https://github.com/VinodhKumar-Offl/Driver-Drowsiness-detection",
  },
  {
    title: "Face Recognition",
    description:
      "Contributed to the development of a facial recognition solution using the Adam Hechtay library featuring 68 landmarks.",
    techStack: ["Python", "OpenCV", "NumPy", "dlib", "face_recognition", "scikit-learn"],
    image: faceRecognitionImg,
    link: "https://github.com/VinodhKumar-Offl/Face-Recognition",
  },
];

const Projects = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-white">
      {/* Animated Heading */}
      <motion.h2
        className="text-4xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>

      {/* Animated Cards with stagger */}
      <motion.div
        className="space-y-8"
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
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 25px rgba(0,255,255,0.5)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Make entire card clickable */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl no-underline"
            >
              <div
                className="flex flex-col sm:flex-row gap-6 items-center p-6 
                           bg-white/10 border border-transparent rounded-xl 
                           hover:border-cyan-400 hover:shadow-[0_0_25px_4px_rgba(0,255,255,0.5)] 
                           transition-all duration-300 cursor-pointer"
              >
                <motion.div
                  className="w-full sm:w-48 h-40 rounded-lg overflow-hidden flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </motion.div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-gray-300 mt-2">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.techStack.map((tech, techIdx) => (
                      <motion.span
                        key={techIdx}
                        className="text-xs px-3 py-1 bg-white/10 text-white rounded-full border border-white/20"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(255, 255, 255, 0.15)",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  {/* You can keep or remove this link since the whole card is clickable */}
                  <span className="text-cyan-400 text-sm underline mt-4 inline-block cursor-pointer hover:text-cyan-300 transition-colors duration-200">
                    View on GitHub
                  </span>
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;

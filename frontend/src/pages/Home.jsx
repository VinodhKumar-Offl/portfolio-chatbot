import GlassCard from "../components/GlassCard";
import profile from "../assets/new image.jpg";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa"; // Import download icon

const Home = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12 text-white">
      
      {/* Left Section */}
      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard className="p-8 md:p-10 backdrop-blur-md rounded-2xl">
          <h1 className="text-4xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            Hi, I'm <span className="text-cyan-400">Vinodh Kumar</span>
          </h1>
          <h2 className="text-lg md:text-xl text-gray-300 mb-3 font-medium">
            Analyst @ Deloitte
          </h2>
          <p className="text-gray-400 mb-6 text-sm md:text-base leading-relaxed">
            AWS Developer • Full Stack Web Developer • Tutor • Career Guidance Expert
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-4">
            <a href="#contact">
              <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition rounded-full font-semibold text-white shadow-md">
                Hire Me
              </button>
            </a>

            <a
              href="https://topmate.io/vinodh_kumar_r10/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-6 py-2 bg-white/10 border border-cyan-500 text-cyan-300 hover:bg-cyan-500 hover:text-white transition rounded-full font-semibold shadow-md">
                Connect on Topmate
              </button>
            </a>
          </div>

          {/* Download Resume Button */}
          <a
            href="/VinodhKumar_Resume.pdf" // Replace with your actual path
            download
            className="inline-flex items-center gap-2 px-5 py-2 border-2 border-white/20 text-white hover:text-cyan-400 hover:border-cyan-400 transition rounded-full font-semibold"
          >
            <FaDownload className="text-cyan-400" />
            Download Resume
          </a>
        </GlassCard>
      </motion.div>

      {/* Right Section - Profile Image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative p-1 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full shadow-xl">
          <motion.img
            src={profile}
            alt="Vinodh"
            className="rounded-full w-72 h-72 object-cover border-4 border-white/10"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Home;

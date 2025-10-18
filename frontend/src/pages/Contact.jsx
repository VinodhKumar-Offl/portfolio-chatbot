import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import {
  FaGithub,
  FaLinkedin,
  FaHackerrank,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { SiLeetcode, SiX } from "react-icons/si";

const socialLinks = [
  {
    href: "https://github.com/VinodhKumar-Offl",
    label: "GitHub",
    icon: FaGithub,
  },
  {
    href: "https://www.linkedin.com/in/vinodhkumar-r/",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  {
    href: "https://leetcode.com/u/VinodhKumar_VK/",
    label: "LeetCode",
    icon: SiLeetcode,
  },
  {
    href: "https://www.hackerrank.com/profile/vinodh_r_cse_201",
    label: "HackerRank",
    icon: FaHackerrank,
  },
  {
    href: "https://www.instagram.com/vinodhkumar__vk/",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "https://x.com/VkVinodhkumar",
    label: "X (Twitter)",
    icon: SiX,
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbxb_mTZZAgmt2w8qkgLrsMAmGwVQg8C1t1CVVHU_XKiNjwLVLwp5M4hXmWBrus1y1G9/exec";

  const isGibberish = (text) => {
    const vowelCount = (text.match(/[aeiou]/gi) || []).length;
    const consonantCluster = /[^aeiou\s]{5,}/i;
    const repeatedChars = /(.)\1{3,}/;
    const words = text.trim().split(/\s+/);
    const dictionaryWords = words.filter(
      (word) =>
        word.length > 2 &&
        /^[a-z]+$/i.test(word) &&
        !consonantCluster.test(word)
    );

    return (
      vowelCount < 5 ||
      consonantCluster.test(text) ||
      repeatedChars.test(text) ||
      dictionaryWords.length < 3
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.name.trim().length < 2) {
      setResponseMsg("❌ Name must be at least 2 characters.");
      return;
    }

    if (!emailRegex.test(formData.email) || formData.email.length < 6) {
      setResponseMsg("❌ Enter a valid email address.");
      return;
    }

    if (formData.message.trim().length < 10) {
      setResponseMsg("❌ Message must be at least 10 characters.");
      return;
    }

    if (isGibberish(formData.message)) {
      setResponseMsg("❌ Please enter a meaningful message.");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("message", formData.message);

    try {
      setLoading(true);
      await fetch(scriptURL, {
        method: "POST",
        body: form,
      });
      setResponseMsg("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setResponseMsg("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setResponseMsg(""), 5000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-white">
      <motion.h2
        className="text-4xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Let’s Connect
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <GlassCard className="bg-gradient-to-br from-cyan-800/20 to-cyan-500/10 backdrop-blur-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.input
              type="text"
              placeholder="Your name"
              className="w-full p-3 bg-white/10 rounded-lg text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
              value={formData.name}
              required
              whileFocus={{ scale: 1.02 }}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <motion.input
              type="email"
              placeholder="Your email"
              className="w-full p-3 bg-white/10 rounded-lg text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
              value={formData.email}
              required
              whileFocus={{ scale: 1.02 }}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <motion.textarea
              placeholder="Your message"
              rows="5"
              className="w-full p-3 bg-white/10 rounded-lg text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
              value={formData.message}
              whileFocus={{ scale: 1.02 }}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            ></motion.textarea>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 010 16v4l3.5-3.5L12 20v-4a8 8 0 01-8-8z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                "Commit Changes"
              )}
            </motion.button>

            {responseMsg && (
              <motion.p
                className={`mt-3 font-medium text-center ${
                  responseMsg.startsWith("✅")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {responseMsg}
              </motion.p>
            )}
          </form>
        </GlassCard>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="bg-gradient-to-br from-purple-700/20 to-fuchsia-500/10 backdrop-blur-lg">
            <h3 className="text-xl font-semibold mb-4 text-purple-300">Reach Me</h3>
            <div className="space-y-3 text-white/80">
              <p className="flex items-center gap-3">
                <a
                  href="mailto:vinodhkumar142002@gmail.com"
                  className="flex items-center gap-3 hover:text-purple-400 transition-colors"
                  aria-label="Send email"
                >
                  <FaEnvelope className="text-purple-400" />
                  vinodhkumar142002@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-3">
                <a
                  href="tel:+919944438823"
                  className="flex items-center gap-3 hover:text-purple-400 transition-colors"
                  aria-label="Call phone number"
                >
                  <FaPhone className="text-purple-400" style={{ transform: "scaleX(-1)" }} />
                  +91-9944438823
                </a>
              </p>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="bg-gradient-to-br from-cyan-700/20 to-sky-500/10 backdrop-blur-lg">
            <h3 className="text-xl font-semibold mb-4 text-cyan-300">Socials</h3>
            <motion.div
              className="flex gap-6 text-2xl text-white/80"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.12,
                  },
                },
              }}
            >
              {socialLinks.map(({ href, label, icon: Icon }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="hover:text-cyan-400 transition-colors duration-300"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.3, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

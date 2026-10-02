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
  FaPaperPlane,
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

  const [errors, setErrors] = useState({});
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbxb_mTZZAgmt2w8qkgLrsMAmGwVQg8C1t1CVVHU_XKiNjwLVLwp5M4hXmWBrus1y1G9/exec";

  const isGibberish = (text) => {
    const normalized = text.trim().toLowerCase();
    const letters = normalized.match(/[a-z]/g) || [];
    const vowelCount = normalized.match(/[aeiou]/g)?.length || 0;
    const consonantCluster = /[bcdfghjklmnpqrstvwxyz]{7,}/i;
    const repeatedChars = /(.)\1{3,}/;
    const hasReadableWord = normalized
      .split(/\s+/)
      .some((word) => /[a-z]{2,}/.test(word) && !consonantCluster.test(word));

    return (
      letters.length < 4 ||
      vowelCount === 0 ||
      repeatedChars.test(normalized) ||
      consonantCluster.test(normalized) ||
      !hasReadableWord
    );
  };

  const inputClass = (field) =>
    `w-full rounded-2xl border bg-white/[0.06] p-3 text-white outline-none transition placeholder:text-slate-400 focus:ring-2 ${
      errors[field]
        ? "border-red-300/80 ring-2 ring-red-300/20 focus:border-red-300 focus:ring-red-300/30"
        : "border-white/10 focus:border-cyan-300/60 focus:ring-cyan-300/20"
    }`;

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    if (responseMsg && responseMsg !== "Message sent successfully.") {
      setResponseMsg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nextErrors = {};

    if (formData.name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters.";
    } else if (isGibberish(formData.name)) {
      nextErrors.name = "Please enter a meaningful name.";
    }

    if (!emailRegex.test(formData.email) || formData.email.length < 6) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (formData.message.trim().length < 10) {
      nextErrors.message = "Message must be at least 10 characters.";
    } else if (isGibberish(formData.message)) {
      nextErrors.message = "Please enter a meaningful message.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setResponseMsg("Please fix the highlighted fields.");
      return;
    }

    setErrors({});
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
      setResponseMsg("Message sent successfully.");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      setResponseMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setResponseMsg(""), 5000);
    }
  };

  return (
    <section className="portfolio-section pb-24 sm:pb-28">
      <motion.h2
        className="mb-3 text-center text-3xl font-extrabold text-white sm:text-4xl"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Start a project conversation
      </motion.h2>
      <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-slate-400 sm:mb-10 sm:text-base">
        Share the problem, role, or project you have in mind. I am best suited for
        AWS cloud automation, Bedrock assistants, security data pipelines,
        dashboards, and Python utilities.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <GlassCard className="max-w-none border border-cyan-300/15 bg-slate-950/70 backdrop-blur-lg">
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div>
              <motion.input
                type="text"
                placeholder="Your name"
                className={inputClass("name")}
                value={formData.name}
                required
                aria-invalid={Boolean(errors.name)}
                onChange={(e) => handleFieldChange("name", e.target.value)}
              />
              {errors.name && (
                <p className="mt-2 text-sm font-medium text-red-300">{errors.name}</p>
              )}
            </div>
            <div>
              <motion.input
                type="email"
                placeholder="Your email"
                className={inputClass("email")}
                value={formData.email}
                required
                aria-invalid={Boolean(errors.email)}
                onChange={(e) => handleFieldChange("email", e.target.value)}
              />
              {errors.email && (
                <p className="mt-2 text-sm font-medium text-red-300">{errors.email}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <motion.textarea
                placeholder="Tell me about the project, role, or problem"
                rows="5"
                className={inputClass("message")}
                value={formData.message}
                aria-invalid={Boolean(errors.message)}
                onChange={(e) => handleFieldChange("message", e.target.value)}
              ></motion.textarea>
              {errors.message && (
                <p className="mt-2 text-sm font-medium text-red-300">{errors.message}</p>
              )}
            </div>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 font-bold text-slate-950 shadow-[0_18px_40px_rgba(34,211,238,0.18)] transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
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
                <>
                  <FaPaperPlane />
                  Send Project Note
                </>
              )}
            </motion.button>

            {responseMsg && (
              <motion.p
                className={`font-medium text-center sm:col-span-2 ${
                  responseMsg === "Message sent successfully."
                    ? "text-emerald-300"
                    : "text-red-300"
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

      <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="max-w-none border border-emerald-300/15 bg-slate-950/65 backdrop-blur-lg">
            <h3 className="mb-4 text-xl font-bold text-emerald-200">Direct Channels</h3>
            <div className="space-y-3 text-slate-300">
              <p className="flex items-center gap-3">
                <a
                  href="mailto:vinodhkumar142002@gmail.com"
                  className="flex items-center gap-3 transition-colors hover:text-emerald-200"
                  aria-label="Send email"
                >
                  <FaEnvelope className="text-emerald-300" />
                  vinodhkumar142002@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-3">
                <a
                  href="tel:+919944438823"
                  className="flex items-center gap-3 transition-colors hover:text-emerald-200"
                  aria-label="Call phone number"
                >
                  <FaPhone className="text-emerald-300" style={{ transform: "scaleX(-1)" }} />
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
          <GlassCard className="max-w-none border border-cyan-300/15 bg-slate-950/65 backdrop-blur-lg">
            <h3 className="mb-4 text-xl font-bold text-cyan-200">Profiles</h3>
            <motion.div
              className="profile-link-grid"
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
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="profile-link"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                  <span aria-hidden="true" className="profile-link-arrow">↗</span>
                </motion.a>
              ))}
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

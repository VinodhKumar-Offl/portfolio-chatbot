import { motion } from "framer-motion";

const GlassCard = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full max-w-3xl mx-auto p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20"
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;

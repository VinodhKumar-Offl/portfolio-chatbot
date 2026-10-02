import { motion } from "framer-motion";

const GlassCard = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`w-full max-w-3xl mx-auto p-6 bg-slate-950/58 backdrop-blur-xl rounded-2xl shadow-[0_18px_55px_rgba(2,6,23,0.28)] border border-white/10 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;

import GlassCard from "../components/GlassCard";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-white">
      <GlassCard>
        <h2 className="text-4xl font-extrabold mb-6 text-center tracking-wide">About Me</h2>
        <p className="text-gray-300 text-lg leading-relaxed space-y-4">
          <span className="block mb-4">
            👋 I'm <strong className="text-cyan-400">Vinodh Kumar</strong>, currently working as an <strong>Analyst at Deloitte</strong>. I specialize in <strong>cloud security</strong> and <strong>full-stack development</strong>, focusing on building secure, scalable, and high-impact solutions.
          </span>

          <span className="block mb-4">
            🚀 I’m passionate about solving real-world challenges with clean, efficient code. Whether it’s building from scratch or improving existing systems, I love creating tech that makes a difference.
          </span>

          <span className="block mb-4">
            🤝 I thrive in collaborative environments and constantly explore new technologies to stay ahead in a rapidly evolving field.
          </span>

          <span className="block">
            ✨ Connect with me to know more — I'd be excited to bring my skills and energy to your projects and contribute to building something impactful.
          </span>
        </p>
      </GlassCard>
    </div>
  );
};

export default About;

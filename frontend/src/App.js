import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications";
import Awards from "./pages/Awards";
import Contact from "./pages/Contact";

import Chatbot from "./components/Chatbot";  // Floating chatbot

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1f1f1f] text-white font-sans scroll-smooth relative">
      <Navbar />

      {/* Wrapper with top padding for fixed navbar and reduced vertical spacing */}
      <div className="pt-20 space-y-12 px-4">
        <section id="home"><Home /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="experience"><Experience /></section>
        <section id="education"><Education /></section>
        <section id="projects"><Projects /></section>
        <section id="certifications"><Certifications /></section>
        <section id="awards"><Awards /></section>
        <section id="contact"><Contact /></section>
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;

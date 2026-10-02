import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WelcomeIntro from "./components/WelcomeIntro";

import Home from "./pages/Home";

const About = lazy(() => import("./pages/About"));
const Skills = lazy(() => import("./pages/Skills"));
const Experience = lazy(() => import("./pages/Experience"));
const Projects = lazy(() => import("./pages/Projects"));
const Instructor = lazy(() => import("./pages/Instructor"));
const Education = lazy(() => import("./pages/Education"));
const Certifications = lazy(() => import("./pages/Certifications"));
const Awards = lazy(() => import("./pages/Awards"));
const Contact = lazy(() => import("./pages/Contact"));
const Chatbot = lazy(() => import("./components/Chatbot"));

const SectionLoader = () => (
  <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
    <div className="h-36 animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.04]" />
  </div>
);

const LazySection = ({ id, children, minHeight = "min-h-[280px]" }) => {
  const sectionRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(id === "home");

  useEffect(() => {
    if (shouldRender) return undefined;

    const element = sectionRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "900px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [id, shouldRender]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`scroll-mt-24 ${shouldRender ? "" : minHeight}`}
    >
      {shouldRender ? (
        <Suspense fallback={<SectionLoader />}>{children}</Suspense>
      ) : null}
    </section>
  );
};

const DeferredChatbot = () => {
  const [showAssistant, setShowAssistant] = useState(false);

  useEffect(() => {
    const idleCallback = window.requestIdleCallback || ((callback) => setTimeout(callback, 1600));
    const cancelIdleCallback = window.cancelIdleCallback || clearTimeout;
    const handle = idleCallback(() => setShowAssistant(true), { timeout: 2500 });

    return () => cancelIdleCallback(handle);
  }, []);

  if (!showAssistant) return null;

  return (
    <Suspense fallback={null}>
      <Chatbot />
    </Suspense>
  );
};

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <div className={`cloud-shell theme-${theme} min-h-screen bg-slate-950 text-white font-sans scroll-smooth relative overflow-hidden`}>
      <Navbar theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} />

      <div className="relative z-10 pt-20">
        <section id="home" className="scroll-mt-24"><Home /></section>
        <LazySection id="about"><About /></LazySection>
        <LazySection id="skills"><Skills /></LazySection>
        <LazySection id="experience"><Experience /></LazySection>
        <LazySection id="projects"><Projects /></LazySection>
        <LazySection id="instructor" minHeight="min-h-[360px]"><Instructor /></LazySection>
        <LazySection id="education"><Education /></LazySection>
        <LazySection id="certifications"><Certifications /></LazySection>
        <LazySection id="awards"><Awards /></LazySection>
        <LazySection id="contact"><Contact /></LazySection>
      </div>

      <Footer />
      <DeferredChatbot />
      <WelcomeIntro />
    </div>
  );
}

export default App;

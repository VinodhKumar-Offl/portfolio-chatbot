import { useState, useEffect } from "react";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "Services" },
  { id: "skills", label: "Capabilities" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Proof" },
  { id: "instructor", label: "Teaching" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
];

const Navbar = ({ theme, onToggleTheme }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll tracking for active link highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      let current = "home";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && scrollPos >= element.offsetTop) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Reset overflow and close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        document.body.style.overflow = "auto";
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/78 shadow-[0_16px_50px_rgba(2,6,23,0.45)] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3 select-none">
        {/* Brand */}
        <span className="flex min-w-0 items-center gap-3 font-sans text-sm font-black tracking-wide text-cyan-100 sm:text-lg">
          <span className="h-3 w-3 shrink-0 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.95)]" />
          <span className="sm:hidden">VINODH</span>
          <span className="hidden sm:inline 2xl:hidden">VINODH KUMAR R</span>
          <span className="hidden 2xl:inline">VINODH KUMAR R / AWS CLOUD & AI ENGINEER</span>
        </span>

        {/* Desktop navigation */}
        <div className="hidden xl:flex gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`rounded-full px-2.5 py-1.5 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                activeSection === id
                  ? "bg-cyan-300 text-slate-950"
                  : "text-slate-300 hover:text-cyan-200"
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="theme-toggle flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-cyan-100 transition-colors hover:border-cyan-300/50"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <button
            type="button"
            className="xl:hidden text-2xl text-cyan-400 z-50 cursor-pointer hover:text-cyan-300 transition-colors duration-200"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Backdrop overlay when menu is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-2xl xl:hidden"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu overlay"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") setMenuOpen(false);
          }}
        />
      )}

      {/* Mobile Drawer with subtle gradient */}
      <div
        className={`fixed right-0 top-0 z-[90] h-dvh w-[82vw] max-w-sm overflow-y-auto
          border-l border-cyan-300/30 bg-slate-950 shadow-[0_0_80px_rgba(8,145,178,0.28)]
          transform transition-transform duration-300 xl:hidden
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-modal="true"
        role="dialog"
        aria-label="Mobile navigation menu"
      >
        {/* Close icon */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-slate-950/95 px-5 py-4 backdrop-blur-xl">
          <span className="text-sm font-black tracking-[0.18em] text-cyan-100">
            MENU
          </span>
          <FaTimes
            className="text-cyan-400 text-2xl cursor-pointer hover:text-cyan-300 transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") setMenuOpen(false);
            }}
          />
        </div>

        {/* Nav links */}
        <ul className="flex flex-col gap-2 p-5 text-base font-medium text-white">
          {sections.map(({ id, label }) => (
            <li key={id} className="w-full">
              <a
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`block w-full rounded-2xl border px-4 py-3 transition-colors duration-200 ${
                  activeSection === id
                    ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
                    : "border-white/10 bg-white/[0.04] text-slate-200 hover:border-cyan-300/30 hover:text-cyan-100"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

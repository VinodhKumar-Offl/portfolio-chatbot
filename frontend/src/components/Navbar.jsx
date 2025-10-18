import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
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
      if (window.innerWidth >= 768) {
        document.body.style.overflow = "auto";
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/60 border-b border-cyan-600/30 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center select-none">
        {/* Brand */}
        <span className="text-cyan-400 text-xl font-extrabold tracking-wide font-sans">
          Vinodh Kumar
        </span>

        {/* Desktop navigation */}
        <div className="hidden md:flex gap-6">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="relative text-white font-medium tracking-wide transition-colors duration-300 hover:text-cyan-400 py-1"
            >
              <span
                className={`relative z-10 ${
                  activeSection === id ? "text-cyan-400 font-semibold" : ""
                }`}
              >
                {label}
              </span>
              <span
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded scale-x-0 origin-left transition-transform duration-300 ${
                  activeSection === id ? "scale-x-100" : ""
                }`}
              />
            </a>
          ))}
        </div>

        {/* Hamburger icon for mobile */}
        <div
          className="md:hidden text-2xl text-cyan-400 z-50 cursor-pointer hover:text-cyan-300 transition-colors duration-200"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setMenuOpen(true);
          }}
        >
          <FaBars />
        </div>
      </div>

      {/* Backdrop overlay when menu is open */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-3xl z-40"
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
        className={`md:hidden fixed top-0 right-0 w-3/5 max-w-xs h-full 
          bg-gradient-to-b from-cyan-900 to-blue-900 border-l-2 border-cyan-400
          shadow-lg z-50 transform transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-modal="true"
        role="dialog"
        aria-label="Mobile navigation menu"
      >
        {/* Close icon */}
        <div className="flex justify-end px-4 pt-4">
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
        <ul className="flex flex-col items-start pl-6 pt-6 gap-4 text-base font-medium text-white">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`block px-2 py-1 rounded cursor-pointer transition-colors duration-200 ${
                  activeSection === id
                    ? "text-cyan-400 font-semibold"
                    : "hover:text-cyan-400"
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

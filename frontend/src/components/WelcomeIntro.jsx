import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import profile from "../assets/profile.jpeg";

const WelcomeIntro = () => {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const skipRef = useRef(null);

  useEffect(() => {
    if (!visible) return undefined;

    skipRef.current?.focus();
    const timer = window.setTimeout(() => setVisible(false), 4200);
    const onKeyDown = (event) => {
      if (event.key === "Escape") setVisible(false);
      if (event.key === "Tab") {
        event.preventDefault();
        skipRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="welcome-intro"
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to Vinodh's portfolio"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.45 } }}
        >
          <div className="welcome-intro-orbit welcome-intro-orbit-one" aria-hidden="true" />
          <div className="welcome-intro-orbit welcome-intro-orbit-two" aria-hidden="true" />
          <div className="welcome-intro-content">
            <motion.div
              className="welcome-intro-portrait"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.78, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease: "easeOut" }}
            >
              <img src={profile} alt="Vinodh Kumar R" />
            </motion.div>
            <motion.p
              className="welcome-intro-kicker"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.4, duration: reduceMotion ? 0 : 0.55 }}
            >
              Welcome to my portfolio
            </motion.p>
            <motion.h2
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.65, duration: reduceMotion ? 0 : 0.6 }}
            >
              Hi, I'm <span>Vinodh.</span>
            </motion.h2>
            <motion.p
              className="welcome-intro-subtitle"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.95, duration: reduceMotion ? 0 : 0.55 }}
            >
              AWS cloud engineering · Applied AI · Useful tools
            </motion.p>
            <motion.button
              ref={skipRef}
              type="button"
              className="welcome-intro-button"
              onClick={() => setVisible(false)}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 1.15, duration: reduceMotion ? 0 : 0.45 }}
            >
              Explore portfolio <span aria-hidden="true">↗</span>
            </motion.button>
          </div>
          <div className="welcome-intro-progress" aria-hidden="true" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeIntro;

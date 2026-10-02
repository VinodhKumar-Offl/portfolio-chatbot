import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaCode,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaImage,
  FaLaptopCode,
  FaMicrophoneAlt,
  FaShieldAlt,
  FaUsers,
  FaVideo,
} from "react-icons/fa";
import StoryGuide from "../components/StoryGuide";
import alumniGuidanceImg from "../assets/alumini career guidance.jpeg";
import cProgrammingVideo from "../assets/c programming.ad66e35a6fd6233abdf7.mp4";
import juryImg from "../assets/jury.jpeg";
import tutorImgOne from "../assets/tutor1.jpeg";
import tutorImgTwo from "../assets/tutor2.jpeg";
import zohoSessionImg from "../assets/zoho session.jpeg";

const highlights = [
  { value: "100+", label: "Students mentored" },
  { value: "3 yrs", label: "Part-time tutoring" },
  { value: "C / Cloud", label: "Technical sessions" },
  { value: "Career", label: "Guidance and mentoring" },
];

const sessions = [
  {
    icon: FaMicrophoneAlt,
    type: "Guest Lecture",
    title: "Guest Lecturer - C Programming",
    place: "Dr. N.G.P Institute of Technology",
    text: "Delivered a 3-hour interactive session covering C programming basics to intermediate concepts with quizzes.",
    media: [
      {
        type: "video",
        src: cProgrammingVideo,
        label: "C programming guest lecture recording",
      },
    ],
  },
  {
    icon: FaCode,
    type: "Placement Prep",
    title: "Zoho Round 1 Preparation Session",
    place: "Codex",
    text: "Conducted a focused preparation session explaining Zoho round 1 strategy, problem-solving patterns, and practice direction.",
    media: [{ type: "image", src: zohoSessionImg, label: "Zoho preparation session" }],
  },
  {
    icon: FaShieldAlt,
    type: "Career Guidance",
    title: "Alumni Career Guidance",
    place: "SNS College of Technology",
    text: "Mentored students on career paths in cloud, cybersecurity, software engineering, and practical skill-building.",
    media: [{ type: "image", src: alumniGuidanceImg, label: "Alumni career guidance" }],
  },
  {
    icon: FaUsers,
    type: "Evaluation",
    title: "Cybersecurity Hackathon Jury",
    place: "SNS College of Technology",
    text: "Evaluated student-built cybersecurity solutions and reviewed ideas for technical clarity, usefulness, and execution.",
    media: [{ type: "image", src: juryImg, label: "Cybersecurity hackathon jury" }],
  },
];

const teachingTracks = [
  {
    icon: FaGraduationCap,
    title: "Part-time Tutor",
    meta: "Murugan Tuition Center / 3 Years",
    text: "Taught Computer Science and Chemistry for Classes 6-12, helping students build fundamentals through repeated practice and clear explanations.",
    images: [
      { src: tutorImgOne, alt: "Part-time tutoring session" },
      { src: tutorImgTwo, alt: "Student mentoring and tutoring" },
    ],
  },
  {
    icon: FaLaptopCode,
    title: "Udemy Learning Track",
    meta: "Cloud, cybersecurity, and programming guidance",
    text: "Extending the same mentoring style into structured online learning, with practical topics around programming, cloud, security, and career preparation.",
    cta: "View Udemy Profile",
    href: "https://www.udemy.com/user/vinodh-kumarr/",
  },
];

const AutoPlayVideo = ({ src, label }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.muted = true;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.55 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <figure className="overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/80">
      <video
        ref={videoRef}
        className="aspect-video w-full bg-black object-cover"
        controls
        muted
        loop
        preload="none"
        playsInline
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support this video format.
      </video>
      <figcaption className="border-t border-white/10 p-3 text-xs text-slate-300">
        <span>{label} / Autoplays muted. Use controls for sound.</span>
      </figcaption>
    </figure>
  );
};

const MediaSlot = ({ item }) => {
  const type = item.type || "image";
  const Icon = type === "video" ? FaVideo : FaImage;

  if (item.src && type === "image") {
    return (
      <figure className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70">
        <img
          src={item.src}
          alt={item.label}
          className="h-44 w-full bg-slate-950 object-contain transition duration-500 hover:scale-[1.02] sm:h-48"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </figure>
    );
  }

  if (item.src && type === "video") {
    return <AutoPlayVideo src={item.src} label={item.label} />;
  }

  return (
    <div className="flex aspect-video min-h-24 items-center justify-center rounded-2xl border border-dashed border-cyan-300/25 bg-gradient-to-br from-cyan-300/10 via-slate-950 to-emerald-300/10 px-3 text-center">
      <div>
        <Icon className="mx-auto mb-2 text-xl text-cyan-300" />
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
          {item.label || (type === "video" ? "Video" : "Image")}
        </p>
      </div>
    </div>
  );
};

const Instructor = () => {
  return (
    <section className="portfolio-section">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
          Mentorship & Teaching
        </p>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          I teach technical concepts and support students beyond project work.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Alongside cloud security and GenAI engineering, I mentor students, deliver
          technical sessions, support career guidance, and teach programming fundamentals.
        </p>
      </motion.div>

      <div className="mb-5">
        <StoryGuide
          chapter="Mentorship"
          title="Teaching adds communication strength to the technical profile."
          message="C programming sessions, Zoho preparation, career guidance, hackathon judging, Udemy learning, and tutoring show communication strength alongside my core cloud security, GenAI, and analytics work."
          align="right"
        />
      </div>

      <div className="grid gap-5">
        <motion.div
          className="premium-panel rounded-[2rem] border-cyan-300/15 p-5 sm:p-6"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <div className="mb-5 flex flex-col gap-3 text-cyan-200 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950">
                <FaChalkboardTeacher />
              </span>
              <div>
                <h3 className="text-xl font-black text-white">Teaching Signal</h3>
                <p className="text-sm text-slate-400">Sessions, students, and guidance</p>
              </div>
            </div>
            <span className="w-fit rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              Communication strength
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/[0.055] p-4"
              >
                <p className="text-2xl font-black text-white">{item.value}</p>
                <p className="mt-1 text-xs leading-snug text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {sessions.map(({ icon: Icon, type, title, place, text, media }) => (
            <motion.article
              key={title}
              className="mission-card relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5"
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -4, borderColor: "rgba(103,232,249,0.45)" }}
            >
              <Icon className="mb-4 text-2xl text-emerald-300" />
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
                {type}
              </p>
              <h3 className="mt-3 text-lg font-bold text-white">{title}</h3>
              <p className="mt-1 text-sm text-slate-500">{place}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{text}</p>
              <div className="mt-4 grid gap-3">
                {media.map((item) => (
                  <MediaSlot key={`${title}-${item.label}`} item={item} />
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="mt-6 grid gap-4 md:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {teachingTracks.map(({ icon: Icon, title, meta, text, images, cta, href }) => (
          <motion.article
            key={title}
            className="mission-card premium-panel relative overflow-hidden rounded-[1.75rem] p-5"
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -4, borderColor: "rgba(52,211,153,0.42)" }}
          >
            <Icon className="mb-4 text-2xl text-cyan-300" />
            <h3 className="text-xl font-black text-white">{title}</h3>
            <p className="mt-1 text-sm text-emerald-200">{meta}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{text}</p>
            {images && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {images.map((image) => (
                  <figure
                    key={image.src}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-52 w-full bg-slate-950 object-contain transition duration-500 hover:scale-[1.02] sm:h-56"
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                ))}
              </div>
            )}
            {href && (
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/15"
              >
                {cta}
                <FaExternalLinkAlt className="text-xs" />
              </a>
            )}
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Instructor;

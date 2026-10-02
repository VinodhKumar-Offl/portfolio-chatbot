import { useEffect, useState, useRef } from "react";
import {
  FaCompressAlt,
  FaEnvelope,
  FaExpandAlt,
  FaMinus,
  FaPaperPlane,
  FaRedo,
  FaTimes,
} from "react-icons/fa";
import profile from "../assets/profile.jpeg";

const starterPrompts = [
  "What has Vinodh built on AWS?",
  "What is Vinodh building at Oracle?",
  "How has Vinodh used AI and LLMs?",
  "What is his cloud security experience?",
];

const chatbotApiUrl = process.env.REACT_APP_CHATBOT_API_URL || "http://localhost:5001/api/chatbot";

const renderInline = (text) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={index} className="font-semibold text-cyan-100">{part.slice(2, -2)}</strong>
      : part
  );

const ChatMessageText = ({ text }) => {
  const lines = String(text)
    .replace(/([^\n])\s+\*\s+(?=\*\*)/g, "$1\n* ")
    .split(/\n/);
  const blocks = [];

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    const numbered = trimmed.match(/^\d+[.)]\s+(.+)$/);
    const heading = trimmed.match(/^#{1,3}\s+(.+)$/);
    const type = bullet ? "ul" : numbered ? "ol" : heading ? "heading" : "paragraph";
    const content = bullet?.[1] || numbered?.[1] || heading?.[1] || trimmed;
    const previous = blocks[blocks.length - 1];

    if ((type === "ul" || type === "ol") && previous?.type === type) {
      previous.items.push(content);
    } else {
      blocks.push(type === "ul" || type === "ol"
        ? { type, items: [content] }
        : { type, content });
    }
  });

  return (
    <div className="min-w-0 space-y-3 break-words text-sm leading-relaxed sm:text-[15px]">
      {blocks.map((block, index) => {
        if (block.type === "ul" || block.type === "ol") {
          const List = block.type;
          return (
            <List key={index} className={`space-y-2 pl-5 ${block.type === "ul" ? "list-disc" : "list-decimal"}`}>
              {block.items.map((item, itemIndex) => <li key={itemIndex} className="pl-1">{renderInline(item)}</li>)}
            </List>
          );
        }
        if (block.type === "heading") {
          return <h3 key={index} className="font-bold text-white">{renderInline(block.content)}</h3>;
        }
        return <p key={index}>{renderInline(block.content)}</p>;
      })}
    </div>
  );
};

const getChatSessionId = () => {
  const key = "vinodh-chat-session-id";
  const existingSessionId = window.sessionStorage.getItem(key);
  if (existingSessionId) return existingSessionId;

  const newSessionId =
    window.crypto?.randomUUID?.() ||
    `portfolio-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  window.sessionStorage.setItem(key, newSessionId);
  return newSessionId;
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [windowState, setWindowState] = useState("default");
  const [showInitialNotification, setShowInitialNotification] = useState(false);
  const [showMinimizeNotification, setShowMinimizeNotification] = useState(false);
  const [hasNewReply, setHasNewReply] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const notificationTimer = setTimeout(() => setShowInitialNotification(true), 2000);
    const notificationDismissTimer = setTimeout(() => {
      setShowInitialNotification(false);
    }, 6500);

    return () => {
      clearTimeout(notificationTimer);
      clearTimeout(notificationDismissTimer);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setChat([
        {
          from: "bot",
          text: "Hi, I'm Vinodh's portfolio assistant. Explore his AWS work, Oracle projects, and applied AI experience.",
        },
      ]);
      setShowInput(true);
      setShowCloseConfirm(false);
      setWindowState("default");
      setHasNewReply(false);
    } else {
      setShowInput(false);
      setInput("");
      setLoading(false);
      setShowCloseConfirm(false);
      setWindowState("default");
      setShowMinimizeNotification(false);
    }
  }, [open]);

  useEffect(() => {
    if (showCloseConfirm && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showCloseConfirm]);

  useEffect(() => {
    if (windowState === "minimized" && chat.some((msg) => msg.from === "user")) {
      setShowMinimizeNotification(true);
      const timer = setTimeout(() => {
        setShowMinimizeNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowMinimizeNotification(false);
    }
  }, [windowState, chat]);

  const openChat = () => {
    setOpen(true);
    setHasNewReply(false);
  };

  const requestCloseChat = () => {
    if (chat.length === 1 && chat[0].from === "bot") {
      confirmClose();
    } else {
      setShowCloseConfirm(true);
    }
  };

  const cancelClose = () => setShowCloseConfirm(false);

  const confirmClose = () => {
    setOpen(false);
    setChat([]);
    setShowCloseConfirm(false);
  };

  const toggleWindowState = () => {
    if (windowState === "minimized") {
      setWindowState("default");
      setHasNewReply(false);
    } else if (windowState === "default") {
      setWindowState("maximized");
    } else {
      setWindowState("minimized");
    }
  };

  const sendQuestion = async (question) => {
    if (!question.trim()) return;

    setChat((prev) => [...prev, { from: "user", text: question }]);
    setInput("");
    setLoading(true);
    setHasNewReply(false);

    try {
      const response = await fetch(chatbotApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, sessionId: getChatSessionId() }),
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      setChat((prev) => [
        ...prev,
        { from: "bot", text: data.reply || "Sorry, I couldn't find an answer." },
      ]);

      if (windowState === "minimized") {
        setHasNewReply(true);
      }
    } catch (error) {
      console.error("Chatbot API error:", error);
      setChat((prev) => [
        ...prev,
        { from: "bot", text: "I could not reach the assistant service right now. Please try again in a moment or contact Vinodh directly." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setChat([
      {
        from: "bot",
        text: "Fresh conversation started. Ask about Vinodh's AWS work, Oracle projects, or AI experience.",
      },
    ]);
    setInput("");
    setShowInput(true);
    setShowCloseConfirm(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading && input.trim()) {
      e.preventDefault();
      sendQuestion(input);
    }
  };

  return (
    <>
      {showInitialNotification && (
        <div className="fixed bottom-28 right-4 sm:right-6 rounded-2xl border border-cyan-300/25 bg-slate-950/90 px-4 py-3 text-sm font-semibold text-cyan-100 shadow-[0_18px_60px_rgba(8,145,178,0.28)] backdrop-blur-xl z-60 animate-fade-in-up">
          Portfolio assistant is ready.
        </div>
      )}

      {showMinimizeNotification && (
        <div className="fixed bottom-28 right-4 sm:right-6 rounded-2xl border border-cyan-300/25 bg-slate-950/90 px-4 py-3 text-sm font-semibold text-cyan-100 shadow-[0_18px_60px_rgba(8,145,178,0.28)] backdrop-blur-xl z-60 animate-fade-in-up">
          Assistant minimized. Open it to continue.
        </div>
      )}

      {hasNewReply && windowState === "minimized" && (
        <div className="fixed bottom-36 right-4 sm:right-6 rounded-2xl border border-emerald-300/25 bg-slate-950/90 px-4 py-3 text-sm font-semibold text-emerald-100 shadow-[0_18px_60px_rgba(16,185,129,0.22)] backdrop-blur-xl z-60 animate-fade-in-up">
          New assistant reply available.
        </div>
      )}

      <button
        onClick={open ? requestCloseChat : openChat}
        className={`chat-launcher fixed bottom-5 right-4 sm:bottom-6 sm:right-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-cyan-200/40 bg-slate-950 z-50 transition-transform duration-300 ease-out hover:-translate-y-1
          ${hasNewReply ? "animate-bounce ring-2 ring-emerald-100" : ""}
        `}
        aria-label="Toggle Chatbot"
      >
        <img
          src={profile}
          alt="Vinodh Portfolio Assistant"
          className="h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-cyan-300/5" />
        {hasNewReply && (
          <span className="absolute right-1 top-1 h-3.5 w-3.5 rounded-full border-2 border-slate-950 bg-red-500" />
        )}
      </button>

      {open && (
        <div
          className={`chat-window fixed flex flex-col overflow-hidden border border-cyan-300/20 bg-slate-950/90 text-white backdrop-blur-2xl transition-all duration-500 ease-in-out z-50 animate-fade-in-slide-up
            ${windowState === "minimized"
              ? "bottom-24 right-4 h-[64px] w-[calc(100vw-2rem)] rounded-2xl sm:right-6 sm:w-[340px]"
              : windowState === "maximized"
              ? "inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] rounded-2xl sm:inset-4 sm:h-[calc(100%-2rem)] sm:w-[calc(100%-2rem)]"
              : "bottom-24 right-3 h-[min(620px,calc(100vh-7rem))] w-[calc(100vw-1.5rem)] rounded-2xl sm:right-6 sm:w-[420px]"
            }`}
        >
          <div className="chat-header flex items-center justify-between border-b border-white/10 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="relative flex h-11 w-11 shrink-0 overflow-hidden rounded-2xl border border-cyan-300/30 bg-slate-950 shadow-[0_12px_32px_rgba(34,211,238,0.22)]">
                <img
                  src={profile}
                  alt="Vinodh Portfolio Assistant"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-base font-black text-white">Vinodh Portfolio Assistant</p>
                <p className="truncate text-xs text-cyan-100/80">Cloud / AI / Projects</p>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={toggleWindowState}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-gray-200 transition-colors hover:border-cyan-300/50 hover:text-white"
                aria-label="Toggle Size"
                disabled={showCloseConfirm}
              >
                {windowState === "maximized" ? <FaCompressAlt /> : windowState === "minimized" ? <FaExpandAlt /> : <FaMinus />}
              </button>
              <button
                onClick={requestCloseChat}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-gray-200 transition-colors hover:border-red-300/50 hover:text-white"
                aria-label="Close Chat"
                disabled={showCloseConfirm}
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {windowState !== "minimized" && (
            <div className="border-b border-white/10 p-4">
              <button
                onClick={() => window.open("mailto:vinodhkumar142002@gmail.com")}
                className="mx-auto flex w-full max-w-xs items-center justify-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-5 py-2.5 text-center text-sm font-bold text-emerald-100 shadow-md transition-all duration-200 hover:border-emerald-200/60 hover:bg-emerald-300/15"
              >
                <FaEnvelope />
                Contact Vinodh
              </button>
            </div>
          )}

          {windowState !== "minimized" && (
            <div className={`custom-scrollbar relative flex-1 space-y-4 p-4 sm:p-5 ${showCloseConfirm ? 'overflow-hidden' : 'overflow-y-auto'}`}>
              {chat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`animate-fade-in-up flex gap-3 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.from === "bot" && (
                    <img
                      src={profile}
                      alt="Vinodh Portfolio Assistant"
                      className="mt-1 h-9 w-9 shrink-0 rounded-full border border-cyan-300/25 object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <div
                    className={`rounded-2xl border p-4 shadow-lg backdrop-blur-sm ${msg.from === "user"
                      ? "max-w-[86%] border-cyan-200/25 bg-cyan-300/15 text-cyan-50"
                      : "min-w-0 max-w-[calc(100%-3rem)] border-white/10 bg-white/[0.06] text-slate-100"
                      }`}
                  >
                    {msg.from === "bot" ? <ChatMessageText text={msg.text} /> : <p className="break-words text-sm leading-relaxed sm:text-[15px]">{msg.text}</p>}
                  </div>
                </div>
              ))}

              {chat.length === 1 && !loading && (
                <div className="grid gap-2">
                  {starterPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendQuestion(prompt)}
                      className="rounded-2xl border border-cyan-300/15 bg-cyan-300/5 px-4 py-3 text-left text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/45 hover:bg-cyan-300/10"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {loading && (
                <div className="mr-auto flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-gray-200 animate-pulse">
                  <img
                    src={profile}
                    alt="Vinodh Portfolio Assistant"
                    className="h-8 w-8 rounded-full border border-cyan-300/25 object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                  <span>Reading portfolio context...</span>
                </div>
              )}

              {showCloseConfirm && (
                <div
                  ref={modalRef}
                  tabIndex={-1}
                  className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-2xl bg-black/75 p-6 backdrop-blur-md"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="confirm-close-title"
                >
                  <p id="confirm-close-title" className="mb-5 text-center text-lg font-semibold text-white">
                    Close this assistant thread? <br />
                    Your questions and answers will be cleared.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={confirmClose}
                      className="rounded-full bg-red-500 px-5 py-2.5 font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-400"
                      autoFocus
                    >
                      Close
                    </button>
                    <button
                      onClick={cancelClose}
                      className="rounded-full border border-white/15 bg-white/10 px-5 py-2.5 font-semibold text-white shadow-md transition-all duration-200 hover:bg-white/15"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {windowState !== "minimized" && showInput && !showCloseConfirm && (
            <div className="flex gap-3 border-t border-white/10 bg-slate-950/80 p-3 sm:p-4 backdrop-blur-md">
              <input
                type="text"
                className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none backdrop-blur-sm transition-all duration-200 placeholder:text-gray-400 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20"
                placeholder="Ask about Vinodh's work..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                autoFocus
              />
              <button
                onClick={() => sendQuestion(input)}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-slate-950 shadow-[0_12px_32px_rgba(34,211,238,0.18)] transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
                disabled={loading || !input.trim()}
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </div>
          )}

          {windowState !== "minimized" && !showCloseConfirm && (
            <div className="flex justify-between border-t border-white/10 bg-slate-950/80 px-4 py-2 text-sm text-gray-300">
              <button onClick={handleClear} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                <FaRedo className="text-xs text-cyan-300" />
                Clear thread
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;

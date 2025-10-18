import { useEffect, useState, useRef } from "react";

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
    const openTimer = setTimeout(() => {
      setShowInitialNotification(false);
      setOpen(true);
    }, 3500);
    return () => {
      clearTimeout(notificationTimer);
      clearTimeout(openTimer);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setChat([
        {
          from: "bot",
          text: "👋 Hi there! I'm Vinodh's assistant. You can ask about my experience, projects, or certifications!",
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
      const response = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
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
        { from: "bot", text: "⚠️ Something went wrong connecting to the assistant." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setChat([{ from: "bot", text: "👋 How can I assist you about Vinodh?" }]);
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
        <div className="fixed bottom-28 right-6 bg-gradient-to-r from-cyan-500/80 to-indigo-500/80 text-white rounded-lg px-4 py-2 shadow-lg z-60 animate-fade-in-up">
          Chatbot opening soon...
        </div>
      )}

      {showMinimizeNotification && (
        <div className="fixed bottom-28 right-6 bg-gradient-to-r from-cyan-500/80 to-indigo-500/80 text-white rounded-lg px-4 py-2 shadow-lg z-60 animate-fade-in-up">
          Chat minimized! Click 💬 to continue.
        </div>
      )}

      {hasNewReply && windowState === "minimized" && (
        <div className="fixed bottom-36 right-6 bg-gradient-to-r from-green-500/80 to-blue-600/80 text-white rounded-lg px-4 py-2 shadow-lg z-60 animate-fade-in-up">
          1 new reply received. Click 💬 to view.
        </div>
      )}

      <button
        onClick={open ? requestCloseChat : openChat}
        className={`fixed bottom-6 right-6 text-white rounded-full w-16 h-16 shadow-xl flex items-center justify-center text-2xl z-50 transition-transform duration-300 ease-out
          ${hasNewReply ? "animate-bounce ring-2 ring-cyan-400" : "bg-gradient-to-br from-cyan-400 to-indigo-600"}
        `}
        aria-label="Toggle Chatbot"
      >
        💬
        {hasNewReply && (
          <span className="absolute top-1 right-1 bg-red-600 w-3.5 h-3.5 rounded-full border-2 border-white" />
        )}
      </button>

      {open && (
        <div
          className={`fixed bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-2xl text-white shadow-2xl border border-white/20 transition-all duration-500 ease-in-out flex flex-col z-50 animate-fade-in-slide-up
            ${windowState === "minimized"
              ? "bottom-24 right-6 w-[320px] h-[64px] rounded-2xl"
              : windowState === "maximized"
              ? "inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] rounded-2xl"
              : "bottom-24 right-6 w-[400px] h-[600px] rounded-2xl"
            }`}
        >
          <div className="p-4 border-b border-white/10 flex justify-between items-center font-semibold text-lg bg-gradient-to-r from-cyan-900/50 to-indigo-900/50 backdrop-blur-md rounded-t-2xl">
            Chat with Vinodh
            <div className="flex gap-3">
              <button
                onClick={toggleWindowState}
                className="text-gray-200 hover:text-white transition-colors"
                aria-label="Toggle Size"
                disabled={showCloseConfirm}
              >
                {windowState === "maximized" ? "🗕" : windowState === "minimized" ? "🗖" : "🗖"}
              </button>
              <button
                onClick={requestCloseChat}
                className="text-gray-200 hover:text-white transition-colors"
                aria-label="Close Chat"
                disabled={showCloseConfirm}
              >
                ✕
              </button>
            </div>
          </div>

          {windowState !== "minimized" && (
            <div className="p-4 border-b border-white/10">
              <button
                onClick={() => window.open("mailto:vinodhkumar142002@gmail.com")}
                className="max-w-xs mx-auto w-full bg-gradient-to-r from-cyan-500 to-indigo-500 hover:scale-105 hover:brightness-125 rounded-lg px-6 py-2.5 text-center font-semibold text-white shadow-md transition-all duration-200"
              >
                Hire Me
              </button>
            </div>
          )}

          {windowState !== "minimized" && (
            <div className={`flex-1 p-5 space-y-4 custom-scrollbar relative ${showCloseConfirm ? 'overflow-hidden' : 'overflow-y-auto'}`}>
              {chat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl shadow-lg backdrop-blur-sm border border-white/10 animate-fade-in-up ${msg.from === "user"
                    ? "bg-gradient-to-r from-cyan-500/60 to-indigo-500/60 text-white self-end ml-auto max-w-[80%]"
                    : "bg-gradient-to-r from-gray-700/60 to-gray-600/60 text-white self-start mr-auto max-w-[80%]"
                    }`}
                >
                  <p className="text-base leading-relaxed">{msg.text}</p>
                </div>
              ))}

              {loading && (
                <div className="text-sm text-center text-gray-200 animate-pulse">Typing...</div>
              )}

              {showCloseConfirm && (
                <div
                  ref={modalRef}
                  tabIndex={-1}
                  className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center rounded-2xl p-6 z-50"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="confirm-close-title"
                >
                  <p id="confirm-close-title" className="mb-5 text-center text-lg font-semibold text-white">
                    Are you sure you want to close the chat? <br />
                    Your questions and answers will be lost.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={confirmClose}
                      className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-700 rounded-lg hover:brightness-125 font-semibold text-white shadow-md transition-all duration-200"
                      autoFocus
                    >
                      Yes, Close
                    </button>
                    <button
                      onClick={cancelClose}
                      className="px-5 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg hover:brightness-125 font-semibold text-white shadow-md transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {windowState !== "minimized" && showInput && !showCloseConfirm && (
            <div className="p-4 border-t border-white/10 flex gap-3 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-md">
              <input
                type="text"
                className="flex-1 rounded-lg px-4 py-2.5 bg-gray-800/50 text-white outline-none placeholder:text-gray-300 border border-white/20 backdrop-blur-sm focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
                placeholder="Ask me anything about Vinodh..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                autoFocus
              />
              <button
                onClick={() => sendQuestion(input)}
                className="bg-gradient-to-br from-cyan-500 to-indigo-500 px-5 py-2.5 rounded-lg hover:brightness-125 hover:scale-105 disabled:opacity-50 text-white font-semibold shadow-md transition-all duration-200"
                disabled={loading || !input.trim()}
              >
                Send
              </button>
            </div>
          )}

          {windowState !== "minimized" && !showCloseConfirm && (
            <div className="flex justify-between px-4 py-2 text-sm border-t border-white/10 bg-gradient-to-r from-gray-900/50 to-gray-800/50 text-gray-200 rounded-b-2xl">
              <button onClick={handleClear} className="hover:text-white transition-colors">
                🧹 Clear
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;

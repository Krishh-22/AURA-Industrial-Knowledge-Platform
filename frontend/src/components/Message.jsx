import { FaUserCircle, FaRobot, FaCopy, FaCheck } from "react-icons/fa";
import { useState } from "react";

function Message({ role, text }) {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`flex items-start gap-3 mb-6 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <FaRobot className="text-cyan-400 text-2xl mt-1" />
      )}

      <div
        className={`relative max-w-3xl rounded-2xl px-5 py-4 shadow-lg ${
          isUser
            ? "bg-cyan-500 text-white"
            : "bg-slate-800 text-slate-100"
        }`}
      >
        <p className="whitespace-pre-wrap">{text}</p>

        {!isUser && (
          <button
            onClick={copyText}
            className="absolute top-3 right-3 text-slate-400 hover:text-cyan-400 transition"
            title="Copy response"
          >
            {copied ? <FaCheck /> : <FaCopy />}
          </button>
        )}
      </div>

      {isUser && (
        <FaUserCircle className="text-white text-2xl mt-1" />
      )}
    </div>
  );
}

export default Message;
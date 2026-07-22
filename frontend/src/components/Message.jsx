import { FaUserCircle, FaRobot } from "react-icons/fa";

function Message({ role, text }) {
  const isUser = role === "user";

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
        className={`max-w-2xl rounded-2xl px-5 py-3 shadow-lg ${
          isUser
            ? "bg-cyan-500 text-white"
            : "bg-slate-800 text-slate-100"
        }`}
      >
        {text}
      </div>

      {isUser && (
        <FaUserCircle className="text-white text-2xl mt-1" />
      )}
    </div>
  );
}

export default Message;
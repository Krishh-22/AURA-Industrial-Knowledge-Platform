import { useState } from "react";

function ChatInput({ onSend, loading }) {
  const [question, setQuestion] = useState("");

  const handleSend = () => {
    if (!question.trim()) return;

    onSend(question);
    setQuestion("");
  };

  return (
    <div className="flex gap-3">

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        placeholder="Ask anything about the uploaded PDF..."
        className="flex-1 bg-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-cyan-500 px-6 rounded-xl hover:bg-cyan-600 transition disabled:opacity-60"
      >
        Send
      </button>

    </div>
  );
}

export default ChatInput;
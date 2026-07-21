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
        placeholder="Ask anything about the uploaded PDF..."
        className="flex-1 bg-slate-800 rounded-xl px-4 py-3 outline-none"
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-cyan-500 px-6 rounded-xl hover:bg-cyan-600 transition"
      >

        Send

      </button>

    </div>

  );

}

export default ChatInput;
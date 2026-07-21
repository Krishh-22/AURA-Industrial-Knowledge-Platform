import Message from "./Message";

function ChatWindow({ messages, loading }) {
  return (
    <div className="flex-1 overflow-y-auto p-6">

      {messages.length === 0 ? (
        <div className="h-full flex flex-col justify-center items-center text-center">

          <h2 className="text-4xl font-bold text-cyan-400">
            Welcome to AURA
          </h2>

          <p className="mt-4 text-slate-400 max-w-xl">
            Upload an industrial document and start asking questions.
            AURA will answer using only the uploaded PDF.
          </p>

        </div>
      ) : (
        messages.map((msg, index) => (
          <Message
            key={index}
            role={msg.role}
            text={msg.text}
          />
        ))
      )}

      {loading && (
        <div className="text-slate-400 mt-4 animate-pulse">
          🤖 AURA is thinking...
        </div>
      )}

    </div>
  );
}

export default ChatWindow;
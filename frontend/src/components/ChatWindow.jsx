import { useEffect, useRef } from "react";
import Message from "./Message";
import Loader from "./Loader";

function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto p-6">

      {messages.length === 0 ? (
        <div className="h-full flex flex-col justify-center items-center text-center">

          <h2 className="text-4xl font-bold text-cyan-400">
            Welcome to AURA
          </h2>

          <p className="mt-4 text-slate-400 max-w-xl">
            Upload an industrial document and start asking questions.
          </p>

        </div>
      ) : (
        <>
          {messages.map((msg, index) => (
            <Message
              key={index}
              role={msg.role}
              text={msg.text}
            />
          ))}

          {loading && (
            <div className="text-cyan-400 animate-pulse">
              <Loader />
            </div>
          )}

          <div ref={bottomRef}></div>
        </>
      )}

    </div>
  );
}

export default ChatWindow;
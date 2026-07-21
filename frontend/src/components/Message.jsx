function Message({ role, text }) {

  const isUser = role === "user";

  return (

    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-5`}
    >

      <div
        className={`max-w-xl rounded-2xl px-5 py-3 ${
          isUser
            ? "bg-cyan-500 text-white"
            : "bg-slate-800 text-slate-100"
        }`}
      >

        {text}

      </div>

    </div>

  );

}

export default Message;
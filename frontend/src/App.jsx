import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import api from "./services/api";

function App() {

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  // Upload PDF
  const uploadPDF = async () => {

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {

      setLoading(true);

      const res = await api.post("/upload", formData);

      setMessage(res.data.message || "PDF uploaded successfully.");

    } catch (err) {

      console.error(err);
      setMessage("Upload failed.");

    } finally {

      setLoading(false);

    }

  };

  // Ask AI
  const askQuestion = async (question) => {

    const updatedMessages = [
      ...messages,
      { role: "user", text: question },
    ];

    setMessages(updatedMessages);

    try {

      setLoading(true);

      const res = await api.post("/ask", {
        question,
      });

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          text: res.data.answer,
        },
      ]);

    } catch (err) {

      console.error(err);

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          text: "Something went wrong.",
        },
      ]);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="h-screen flex bg-slate-950 text-white">

      <Sidebar
        file={file}
        setFile={setFile}
        uploadPDF={uploadPDF}
        loading={loading}
        message={message}
      />

      <div className="flex-1 flex flex-col">

        <ChatWindow
          messages={messages}
          loading={loading}
        />

        <div className="border-t border-slate-800 p-5">

          <ChatInput
            onSend={askQuestion}
            loading={loading}
          />

        </div>

      </div>

    </div>

  );

}

export default App;
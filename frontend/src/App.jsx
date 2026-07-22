import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import api from "./services/api";
import Header from "./components/Header";
import jsPDF from "jspdf";

function App() {

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [summary, setSummary] = useState("");

  // Upload PDF
  const uploadPDF = async () => {

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {

      setLoading(true);

      const res = await api.post("/upload", formData);

      console.log("Upload Response:", res.data);

      setMessage(res.data.message || "PDF uploaded successfully.");
      setSummary(res.data.summary || "");

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

  const downloadChat = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica");
    doc.setFontSize(18);
    doc.text("AURA Chat Conversation", 15, 20);

    let y = 35;

    messages.forEach((msg) => {
      const role = msg.role === "user" ? "User" : "AURA";

      const lines = doc.splitTextToSize(
        `${role}: ${msg.text}`,
        170
      );

      doc.text(lines, 15, y);

      y += lines.length * 7 + 5;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("AURA_Conversation.pdf");
  };

  return (

    <div className="h-screen flex bg-slate-950 text-white">

      <Sidebar
        file={file}
        setFile={setFile}
        uploadPDF={uploadPDF}
        loading={loading}
        message={message}
        summary={summary}
      />

      <div className="flex-1 flex flex-col">
          <Header downloadChat={downloadChat} />

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
import { FaFilePdf, FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";

function Sidebar({
  file,
  setFile,
  uploadPDF,
  loading,
  message,
  summary,
}) {

  const [dragActive, setDragActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      alert("Please drop a PDF file.");
    }
  };

  return (
    <div className="w-80 bg-slate-900 border-r border-slate-700 p-6 flex flex-col">

      <h1 className="text-3xl font-bold text-cyan-400">
        AURA
      </h1>

      <p className="text-slate-400 mt-2">
        Industrial Knowledge Platform
      </p>

      <div className="mt-10">

        <label className="block">

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
              ${
                dragActive
                  ? "border-cyan-300 bg-cyan-500/10 scale-105"
                  : "border-cyan-500 hover:bg-slate-800"
              }
            `}
          >

            <FaCloudUploadAlt
              className={`mx-auto text-5xl mb-4 transition ${
                dragActive
                  ? "text-cyan-300 scale-110"
                  : "text-cyan-400"
              }`}
            />

            <p className="font-semibold text-white">
              {dragActive ? "Drop PDF Here" : "Upload PDF"}
            </p>

            <p className="text-sm text-slate-400 mt-2">
              {dragActive
                ? "Release to upload"
                : "Drag & Drop or Click to choose"}
            </p>

            <input
              type="file"
              accept=".pdf"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />

          </div>

        </label>

      </div>

      {file && (

        <div className="mt-8 bg-slate-800 rounded-xl p-4">

          <div className="flex items-center gap-3">

            <FaFilePdf className="text-red-500 text-2xl"/>

            <div>

              <p className="font-semibold text-sm">

                {file.name}

              </p>

              <p className="text-xs text-slate-400">

                {(file.size / 1024).toFixed(1)} KB

              </p>

            </div>

          </div>

          <button
            onClick={uploadPDF}
            disabled={loading}
            className="mt-5 w-full bg-cyan-500 hover:bg-cyan-600 rounded-lg py-3 font-semibold transition"
          >

            {loading ? "Uploading..." : "Upload PDF"}

          </button>

        </div>

      )}

      {message && (

        <div className="mt-5 text-sm text-green-400">

          {message}

        </div>

      )}

      {summary && (

        <div className="mt-6 bg-slate-800 rounded-xl p-4 max-h-64 overflow-y-auto">

          <h3 className="text-cyan-400 font-semibold mb-3">
            Document Summary
          </h3>

          <div className="text-sm text-slate-300 whitespace-pre-wrap">
            {summary}
          </div>

        </div>

      )}

      <div className="mt-auto">

        <hr className="border-slate-700 my-5"/>

        <p className="text-xs text-slate-500">

          Built with FastAPI • Gemini • ChromaDB • React

        </p>

      </div>

    </div>
  );
}

export default Sidebar;
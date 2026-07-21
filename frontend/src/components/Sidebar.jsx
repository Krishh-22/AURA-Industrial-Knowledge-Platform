import { FaFilePdf, FaCloudUploadAlt } from "react-icons/fa";

function Sidebar({
  file,
  setFile,
  uploadPDF,
  loading,
  message,
}) {
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

          <div className="border-2 border-dashed border-cyan-500 rounded-xl p-8 text-center cursor-pointer hover:bg-slate-800 transition">

            <FaCloudUploadAlt
              className="mx-auto text-5xl text-cyan-400 mb-4"
            />

            <p className="font-semibold">
              Upload PDF
            </p>

            <p className="text-sm text-slate-400 mt-2">
              Click to choose file
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
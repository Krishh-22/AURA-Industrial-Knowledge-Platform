import { FaRobot } from "react-icons/fa";

function Header({ downloadChat }) {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6">

      <div className="flex items-center gap-3">
        <FaRobot className="text-cyan-400 text-2xl" />
        <div>
          <h1 className="font-bold text-lg">AURA AI Assistant</h1>
          <p className="text-xs text-slate-400">
            Industrial Knowledge Platform
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
            onClick={downloadChat}
            className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
            Download Chat
        </button>

        <span className="text-green-400 text-sm">
            ● Online
        </span>
      </div>

    </header>
  );
}

export default Header;
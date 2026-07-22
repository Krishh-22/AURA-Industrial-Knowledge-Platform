import { FaRobot } from "react-icons/fa";

function Header() {
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

      <span className="text-green-400 text-sm">
        ● Online
      </span>

    </header>
  );
}

export default Header;
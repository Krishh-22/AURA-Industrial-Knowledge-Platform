function Loader() {
  return (
    <div className="flex items-center gap-2 text-cyan-400 animate-pulse">
      <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
      <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
      <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
      <span>AURA is thinking...</span>
    </div>
  );
}

export default Loader;
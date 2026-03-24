function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 relative overflow-hidden selection:bg-indigo-600 selection:text-white">
      {/* Decorative gradient orbs for a modern, full background */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 md:opacity-40 pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-slate-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 md:opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 md:opacity-40 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {children}
      </div>
    </div>
  );
}

export default Layout;

function Layout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
      <div className="pointer-events-none absolute -left-24 -top-20 h-80 w-80 rounded-full bg-indigo-200/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-24 h-72 w-72 rounded-full bg-cyan-200/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-200/45 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}

export default Layout;

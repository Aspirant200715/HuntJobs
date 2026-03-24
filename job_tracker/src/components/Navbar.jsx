import { Link, useLocation } from "react-router-dom";

function Navbar({ userName }) {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Applications", path: "/applications" },
    { name: "Add Job", path: "/applications/new" },
    { name: "Analytics", path: "/analytics" },
    { name: "Accounts", path: "/login" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-700/30 bg-[#1b2340]/95 px-6 py-3 shadow-md shadow-slate-900/35 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3">
        <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-indigo-200 via-cyan-300 to-sky-400 bg-clip-text text-transparent md:text-[2.1rem]">
          HuntJobs
        </h1>

        <div className="flex items-center gap-2 md:gap-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-2xl px-4 py-2 text-sm font-extrabold transition-all duration-200 md:px-5 ${
                location.pathname === item.path
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/40"
                  : "text-slate-200 hover:bg-slate-800/80 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex justify-end">
          {userName && (
            <span className="rounded-full border border-indigo-500/35 bg-indigo-500/20 px-4 py-2 text-xs font-extrabold text-indigo-100 shadow-sm md:text-sm">
              {userName}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

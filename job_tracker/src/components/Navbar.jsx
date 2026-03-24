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
    <nav className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 text-slate-100 px-8 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
      {/* Logo */}
      <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
        HuntJobs
      </h1>

      {/* Links */}
      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
              location.pathname === item.path
                ? "bg-indigo-600 text-white shadow-md transform hover:-translate-y-0.5"
                : "text-slate-300 hover:bg-slate-800 hover:text-white hover:shadow-sm"
            }`}
          >
            {item.name}
          </Link>
        ))}

        {userName && (
          <span className="text-sm text-indigo-100 bg-indigo-900/50 border border-indigo-700/50 px-4 py-1.5 rounded-full shadow-sm font-bold tracking-wide">
            {userName}
          </span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

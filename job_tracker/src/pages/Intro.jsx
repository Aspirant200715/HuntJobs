import { useNavigate } from "react-router-dom";

function Intro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] flex items-center justify-center">
      <div className="bg-slate-200/60 backdrop-blur-xl p-10 md:p-16 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-300/60 max-w-3xl text-center relative overflow-hidden transition-all duration-500 hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-400/30 via-slate-200/20 to-indigo-300/30 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 mb-6 tracking-tight">
            Welcome to HuntJobs
          </h1>
          <p className="text-xl text-slate-700 mb-10 leading-relaxed font-medium">
            Track applications, monitor interview progress, and stay focused on
            the opportunities that matter most.
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="inline-flex items-center justify-center bg-gradient-to-r from-slate-800 to-indigo-900 hover:from-slate-900 hover:to-indigo-950 text-white font-extrabold text-lg px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Intro;

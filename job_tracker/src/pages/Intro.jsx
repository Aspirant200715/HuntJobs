import { useNavigate } from "react-router-dom";

function Intro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] flex items-center justify-center">
      <div className="w-full max-w-5xl rounded-3xl border border-indigo-200/70 bg-gradient-to-br from-indigo-100/65 via-white/70 to-cyan-100/60 p-8 shadow-xl shadow-indigo-100/70 backdrop-blur-xl md:p-10">
        <div className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">
              Job Application Management
            </p>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
              Welcome to HuntJobs
            </h1>
            <p className="mb-8 max-w-2xl text-base leading-7 text-slate-700 md:text-lg">
              Manage applications, monitor your pipeline, and make smarter moves
              with a clean dashboard built for consistent job hunting.
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="app-btn-primary px-8 py-3"
            >
              Get Started
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                text: "Track every opportunity",
                tone: "from-indigo-50 to-indigo-100/70 border-indigo-200",
              },
              {
                text: "See progress instantly",
                tone: "from-cyan-50 to-cyan-100/70 border-cyan-200",
              },
              {
                text: "Stay consistent and focused",
                tone: "from-violet-50 to-violet-100/70 border-violet-200",
              },
            ].map((item) => (
              <div
                key={item.text}
                className={`rounded-xl border bg-gradient-to-r px-4 py-3 shadow-sm backdrop-blur ${item.tone}`}
              >
                <p className="text-sm font-semibold text-slate-800">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;

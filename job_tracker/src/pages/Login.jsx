import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin, accounts = [], onDeleteAccount, currentUserName }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }

    onLogin(trimmedName);
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center">
      <div className="w-full max-w-lg rounded-3xl border border-indigo-200/70 bg-gradient-to-b from-white/85 to-indigo-50/65 p-8 shadow-xl shadow-indigo-100/60 backdrop-blur-xl md:p-10">
        <h1 className="text-3xl font-black text-slate-900 mb-2">
          Manage Accounts
        </h1>
        <p className="mb-8 text-sm font-medium leading-6 text-slate-700">
          Add a new account or continue with a saved one.
        </p>

        {accounts.length > 0 && (
          <div className="mb-8 rounded-2xl border border-indigo-200/70 bg-white/75 p-4 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">
              Saved Accounts
            </h2>
            <div className="space-y-2.5">
              {accounts.map((account) => (
                <div
                  key={account}
                  className="flex items-center justify-between rounded-xl border border-slate-300 bg-slate-50/90 px-4 py-3 shadow-sm"
                >
                  <span className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-200 text-xs font-bold text-indigo-800">
                      {account.charAt(0).toUpperCase()}
                    </span>
                    {account}
                    {currentUserName === account && (
                      <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                        Active
                      </span>
                    )}
                  </span>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onLogin(account);
                        navigate("/dashboard", { replace: true });
                      }}
                      className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-indigo-700"
                    >
                      Use
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteAccount(account)}
                      className="rounded-md bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700 transition hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="mb-2 block text-sm font-semibold text-slate-700"
              htmlFor="name"
            >
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (error) {
                  setError("");
                }
              }}
              placeholder="e.g. Soham"
              className="app-input bg-white"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" className="app-btn-primary w-full">
            Add Account & Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

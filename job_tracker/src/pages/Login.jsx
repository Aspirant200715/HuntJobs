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
      <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 w-full max-w-lg relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-50 rounded-full blur-3xl opacity-60 pointer-events-none -ml-10 -mb-10"></div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 relative z-10">
          Manage Accounts
        </h1>
        <p className="text-gray-600 mb-8 relative z-10 font-medium text-lg">
          Add a new account or continue with a saved one.
        </p>

        {accounts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              Saved Accounts
            </h2>
            <div className="space-y-2">
              {accounts.map((account) => (
                <div
                  key={account}
                  className="flex items-center justify-between border border-gray-200 bg-white hover:bg-gray-50 rounded-xl px-5 py-3.5 transition-all duration-200 shadow-sm"
                >
                  <span className="text-base font-semibold text-gray-800">
                    {account}
                    {currentUserName === account && (
                      <span className="ml-2 text-xs text-green-600 font-medium">
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
                      className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md shadow-sm transition-colors"
                    >
                      Use
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteAccount(account)}
                      className="text-xs font-semibold bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-md transition-colors"
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
              className="block text-sm font-medium text-gray-700 mb-2"
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
              className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all shadow-sm font-medium text-lg"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            Add Account & Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

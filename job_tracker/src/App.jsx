import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import AddApplication from "./pages/AddApplication";
import EditApplication from "./pages/EditApplication";
import Analytics from "./pages/Analytics";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";

const ACTIVE_USER_KEY = "huntjobs_user_name";
const ACCOUNTS_KEY = "huntjobs_accounts";

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const [userName, setUserName] = useState("");
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const savedName = localStorage.getItem(ACTIVE_USER_KEY) || "";
    const savedAccounts = JSON.parse(
      localStorage.getItem(ACCOUNTS_KEY) || "[]",
    );

    if (Array.isArray(savedAccounts)) {
      const mergedAccounts = savedName
        ? Array.from(new Set([...savedAccounts, savedName]))
        : savedAccounts;
      setAccounts(mergedAccounts);
    }

    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }, [accounts]);

  const handleLogin = (name) => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }

    setUserName(trimmedName);
    localStorage.setItem(ACTIVE_USER_KEY, trimmedName);
    setAccounts((prev) =>
      prev.includes(trimmedName) ? prev : [...prev, trimmedName],
    );
  };

  const handleDeleteAccount = (accountName) => {
    setAccounts((prev) => prev.filter((name) => name !== accountName));

    if (accountName === userName) {
      setUserName("");
      localStorage.removeItem(ACTIVE_USER_KEY);
    }
  };

  const isAuthenticated = userName.trim().length > 0;

  return (
    <Router>
      {isAuthenticated && <Navbar userName={userName} />}
      <ToastContainer position="top-right" autoClose={2000} />
      <Layout>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route
            path="/login"
            element={
              <Login
                onLogin={handleLogin}
                accounts={accounts}
                onDeleteAccount={handleDeleteAccount}
                currentUserName={userName}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard userName={userName} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Applications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications/new"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AddApplication />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <EditApplication />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

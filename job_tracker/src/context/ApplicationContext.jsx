import { createContext, useState } from "react";
import { useEffect } from "react";
import { fetchJobs } from "../services/api";

export const ApplicationContext = createContext();

const APPLICATIONS_STORAGE_KEY = "huntjobs_applications";

const getStoredApplications = () => {
  try {
    const stored = localStorage.getItem(APPLICATIONS_STORAGE_KEY);

    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState(
    () => getStoredApplications() || [],
  );

  useEffect(() => {
    const hasStoredApplications = Array.isArray(getStoredApplications());

    if (hasStoredApplications) {
      return;
    }

    const loadJobs = async () => {
      const data = await fetchJobs();
      setApplications(data);
    };

    loadJobs();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      APPLICATIONS_STORAGE_KEY,
      JSON.stringify(applications),
    );
  }, [applications]);

  const addApplication = (newApp) => {
    setApplications((prev) => [
      ...prev,
      { ...newApp, id: Date.now(), bookmarked: false },
    ]);
  };

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  const updateApplication = (updatedApp) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === updatedApp.id ? updatedApp : app)),
    );
  };

  const toggleBookmark = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, bookmarked: !app.bookmarked } : app,
      ),
    );
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        deleteApplication,
        updateApplication,
        toggleBookmark,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

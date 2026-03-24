import useApplications from "../hooks/useApplications";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { FaTrash, FaBookmark, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { getCompanyDomain } from "../utils/helpers";
import { motion } from "framer-motion";

function Applications() {
  const { applications, deleteApplication, toggleBookmark } = useApplications();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [statusFilter, setStatusFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  let filteredApplications = applications
    .filter(
      (app) =>
        app.company?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        app.role?.toLowerCase().includes(debouncedSearch.toLowerCase()),
    )
    .filter((app) => (statusFilter ? app.status === statusFilter : true))
    .filter((app) => (platformFilter ? app.platform === platformFilter : true));


  if (sortOption === "date") {
    filteredApplications.sort(
      (a, b) => new Date(b.appliedDate) - new Date(a.appliedDate),
    );
  }

  if (sortOption === "salary") {
    filteredApplications.sort((a, b) => (b.salary || 0) - (a.salary || 0));
  }

  if (sortOption === "company") {
    filteredApplications.sort((a, b) => a.company.localeCompare(b.company));
  }

  return (
    <div>
      <h1 className="app-page-title">Your Applications</h1>
      <p className="app-page-subtitle mb-6">
        Search, filter, and manage your tracked opportunities.
      </p>


      <input
        className="app-input mb-6"
        placeholder="Search by company or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


      <div className="mb-8 flex flex-wrap gap-4">
        <select
          className="app-select"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>

        <select
          className="app-select"
          onChange={(e) => setPlatformFilter(e.target.value)}
        >
          <option value="">All Platforms</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Naukri">Naukri</option>
          <option value="Referral">Referral</option>
          <option value="Company Site">Company Site</option>
        </select>

        <select
          className="app-select"
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="date">Applied Date</option>
          <option value="salary">Salary</option>
          <option value="company">Company Name</option>
        </select>
      </div>


      {filteredApplications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-700">
            No Applications Found
          </h2>
          <p className="mb-4 text-slate-500">
            Start tracking your job applications to see them here.
          </p>

          <button
            onClick={() => navigate("/applications/new")}
            className="app-btn-primary"
          >
            + Add Your First Job
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredApplications.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="app-card relative p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://logo.clearbit.com/${getCompanyDomain(app.company)}`}
                    alt="logo"
                    className="w-10 h-10 rounded-lg shadow-sm"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${app.company}&background=random`;
                    }}
                  />

                  <h3 className="text-lg font-bold text-slate-900 capitalize">
                    {app.company}
                  </h3>
                </div>

                <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                  {app.status}
                </span>
              </div>

              <p className="mt-3 text-base font-medium text-slate-700">
                {app.role}
              </p>

              <div className="mt-2 space-y-1 text-sm text-slate-500">
                <p>Platform: {app.platform}</p>
                <p>Salary: ₹{app.salary}</p>
                <p>Applied: {app.appliedDate}</p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                <button
                  className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100"
                  onClick={() => {
                    deleteApplication(app.id);
                    toast.error("Application deleted");
                  }}
                >
                  <FaTrash /> Delete
                </button>

                <button
                  className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-100"
                  onClick={() => toggleBookmark(app.id)}
                >
                  <FaBookmark />
                  {app.bookmarked ? "Saved" : "Save"}
                </button>

                <button
                  className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                  onClick={() => navigate(`/applications/${app.id}`)}
                >
                  <FaEdit /> Edit
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;

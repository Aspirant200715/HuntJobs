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

  // Sorting
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
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        Your Applications
      </h1>

      {/* 🔍 SEARCH */}
      <input
        className="w-full border border-gray-300 bg-white rounded-xl px-5 py-3.5 mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all text-gray-900 font-medium text-lg placeholder-gray-400"
        placeholder="Search by company or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🎯 FILTERS */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select
          className="border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 text-gray-800 font-medium cursor-pointer hover:bg-gray-50 transition-all"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>

        <select
          className="border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 text-gray-800 font-medium cursor-pointer hover:bg-gray-50 transition-all"
          onChange={(e) => setPlatformFilter(e.target.value)}
        >
          <option value="">All Platforms</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Naukri">Naukri</option>
          <option value="Referral">Referral</option>
          <option value="Company Site">Company Site</option>
        </select>

        <select
          className="border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 text-gray-800 font-medium cursor-pointer hover:bg-gray-50 transition-all"
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="date">Applied Date</option>
          <option value="salary">Salary</option>
          <option value="company">Company Name</option>
        </select>
      </div>

      {/* 🧾 CARDS */}
      {filteredApplications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-3">
            No Applications Found
          </h2>
          <p className="text-gray-500 mb-4">
            Start tracking your job applications to see them here.
          </p>

          <button
            onClick={() => navigate("/applications/new")}
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
          >
            + Add Your First Job
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredApplications.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative"
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

                  <h3 className="text-xl font-bold text-gray-900 capitalize">
                    {app.company}
                  </h3>
                </div>

                <span className="text-xs font-bold px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-100 uppercase tracking-wide">
                  {app.status}
                </span>
              </div>

              <p className="text-gray-700 font-medium mt-3 text-lg">
                {app.role}
              </p>

              <div className="text-sm text-gray-500 mt-2">
                <p>Platform: {app.platform}</p>
                <p>Salary: ₹{app.salary}</p>
                <p>Applied: {app.appliedDate}</p>
              </div>

              <div className="flex gap-3 mt-6 items-center border-t border-gray-100 pt-4">
                <button
                  className="flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors"
                  onClick={() => {
                    deleteApplication(app.id);
                    toast.error("Application deleted");
                  }}
                >
                  <FaTrash /> Delete
                </button>

                <button
                  className="flex items-center gap-1.5 text-sm font-semibold text-yellow-600 hover:text-yellow-800 bg-yellow-50 hover:bg-yellow-100 px-3 py-2 rounded-lg transition-colors"
                  onClick={() => toggleBookmark(app.id)}
                >
                  <FaBookmark />
                  {app.bookmarked ? "Saved" : "Save"}
                </button>

                <button
                  className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
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

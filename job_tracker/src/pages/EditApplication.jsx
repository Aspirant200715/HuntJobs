import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useApplications from "../hooks/useApplications";
import { useEffect } from "react";
import { toast } from "react-toastify";

function EditApplication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { applications, updateApplication } = useApplications();

  const { register, handleSubmit, setValue } = useForm();

  const application = applications.find((app) => app.id === Number(id));

  useEffect(() => {
    if (application) {
      Object.keys(application).forEach((key) => {
        setValue(key, application[key]);
      });
    }
  }, [application, setValue]);

  const onSubmit = (data) => {
    updateApplication({ ...data, id: application.id });
    toast.success("Application updated!");
    navigate("/applications");
  };

  if (!application) {
    return <p className="text-center mt-10">Application not found</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/60 relative">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Edit Application
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Company */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Company
          </label>
          <input
            className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 mt-1.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all font-medium"
            {...register("company")}
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Role
          </label>
          <input
            className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 mt-1.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all font-medium"
            {...register("role")}
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Location
          </label>
          <input
            className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 mt-1.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all font-medium"
            {...register("location")}
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Salary
          </label>
          <input
            className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 mt-1.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all font-medium"
            {...register("salary")}
          />
        </div>

        {/* Platform */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Platform
          </label>
          <input
            className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 mt-1.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all font-medium"
            {...register("platform")}
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Status
          </label>
          <select
            className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 mt-1.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all font-medium cursor-pointer"
            {...register("status")}
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>
        </div>

        {/* Applied Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Applied Date
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 mt-1.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all font-medium"
            {...register("appliedDate")}
          />
        </div>

        {/* Interview Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Interview Date
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 mt-1.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all font-medium"
            {...register("interviewDate")}
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Notes
          </label>
          <textarea
            className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 mt-1.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all font-medium min-h-[100px]"
            {...register("notes")}
          />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
          >
            Update Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditApplication;

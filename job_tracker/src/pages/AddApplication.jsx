import { useForm } from "react-hook-form";
import useApplications from "../hooks/useApplications";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  company: yup.string().required("Company is required"),
  role: yup.string().required("Role is required"),
  appliedDate: yup.string().required("Applied date is required"),
});

function AddApplication() {
  const { addApplication } = useApplications();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    addApplication(data);
    toast.success("Application added!");
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white/60 relative">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Add Job Application
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
          <p className="text-red-500 text-sm mt-1">{errors.company?.message}</p>
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
          <p className="text-red-500 text-sm mt-1">{errors.role?.message}</p>
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
          <p className="text-red-500 text-sm mt-1">
            {errors.appliedDate?.message}
          </p>
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
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
          >
            Add Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddApplication;

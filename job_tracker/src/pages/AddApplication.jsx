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
    <div className="app-card mx-auto max-w-2xl p-8">
      <h1 className="app-page-title mb-8">Add Job Application</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Company
          </label>
          <input className="app-input mt-1.5" {...register("company")} />
          <p className="text-red-500 text-sm mt-1">{errors.company?.message}</p>
        </div>

  
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Role
          </label>
          <input className="app-input mt-1.5" {...register("role")} />
          <p className="text-red-500 text-sm mt-1">{errors.role?.message}</p>
        </div>

  
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Location
          </label>
          <input className="app-input mt-1.5" {...register("location")} />
        </div>


        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Salary
          </label>
          <input className="app-input mt-1.5" {...register("salary")} />
        </div>

 
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Platform
          </label>
          <input className="app-input mt-1.5" {...register("platform")} />
        </div>


        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Status
          </label>
          <select className="app-input mt-1.5" {...register("status")}>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>
        </div>

   
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Applied Date
          </label>
          <input
            type="date"
            className="app-input mt-1.5"
            {...register("appliedDate")}
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.appliedDate?.message}
          </p>
        </div>

   
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Interview Date
          </label>
          <input
            type="date"
            className="app-input mt-1.5"
            {...register("interviewDate")}
          />
        </div>


        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Notes
          </label>
          <textarea
            className="app-input mt-1.5 min-h-[100px]"
            {...register("notes")}
          />
        </div>


        <div className="pt-4">
          <button type="submit" className="app-btn-primary w-full">
            Add Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddApplication;

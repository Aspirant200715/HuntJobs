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
    <div className="app-card mx-auto max-w-2xl p-8">
      <h1 className="app-page-title mb-8">Edit Application</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
 
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Company
          </label>
          <input className="app-input mt-1.5" {...register("company")} />
        </div>


        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Role
          </label>
          <input className="app-input mt-1.5" {...register("role")} />
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
            Update Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditApplication;

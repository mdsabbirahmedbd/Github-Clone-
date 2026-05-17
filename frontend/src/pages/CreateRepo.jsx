import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { VscLock } from "react-icons/vsc";
import { GoGlobe } from "react-icons/go";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const securetyMenu = [
                {
                  value: false,
                  icon: <GoGlobe size={18} />,
                  label: "Public",
                  desc: "Anyone on the internet can see this repository.",
                },
                {
                  value: true,
                  icon: <VscLock size={18} />,
                  label: "Private",
                  desc: "You choose who can see and commit to this repository.",
                },
              ]

const CreateRepo = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const languages = [ "JavaScript","TypeScript","Python","Java","C++","Go","Rust","Ruby","PHP",];

  const {register,handleSubmit,watch,setValue,formState: { errors }} = useForm({
    defaultValues: {
      name: "",
      description: "",
      language: "JavaScript",
      vesivelity: false,
    },
  });

  const visibility = watch("vesivelity");

  const onSubmit = async (data) => {
    setError("");
 
    setLoading(true);

    try {
      const repoData = {
         name: data.name,
         description: data.description,
         vesivelity: data.vesivelity,
      };

      const res = await axiosSecure.post("/repos/create", repoData);

      if (res.data.success) {
        toast.success("create repositiory successfully");
        navigate('/dashboard/reposetup',{state:data.name});
      }else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] pt-8">
        <Toaster />
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-white text-2xl font-semibold mb-1">
          Create a new repository
        </h1>

        <p className="text-[#8b949e] text-sm mb-6">
          A repository contains all project files, including the revision
          history.
        </p>

        <div className="border-t border-[#30363d] pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Repo Name */}
            <div>
              <label className="block text-[#e6edf3] text-sm font-medium mb-1">
                Repository name{" "}
                <span className="text-red-400">*</span>
              </label>

              <input
                {...register("name", {
                  required: "Repository name is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                })}
                onChange={(e) =>
                  setValue(
                    "name",
                    e.target.value.replace(/\s/g, "-")
                  )
                }
                placeholder="my-awesome-project"
                className="w-full bg-[#0d1117] border border-[#30363d]
                  text-[#e6edf3] px-3 py-2 rounded-md text-sm
                  focus:outline-none focus:border-[#58a6ff]
                  placeholder-[#768390]"
              />

              {errors.name && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-[#e6edf3] text-sm font-medium mb-1">
                Description{" "}
                <span className="text-[#8b949e] font-normal">
                  (optional)
                </span>
              </label>

              <input
                {...register("description")}
                placeholder="Short description..."
                className="w-full bg-[#0d1117] border border-[#30363d]
                  text-[#e6edf3] px-3 py-2 rounded-md text-sm
                  focus:outline-none focus:border-[#58a6ff]
                  placeholder-[#768390]"
              />
            </div>

            {/* Language */}
            <div>
              <label className="block text-[#e6edf3] text-sm font-medium mb-1">
                Primary Language
              </label>

              <select
                {...register("language")}
                className="w-full bg-[#0d1117] border border-[#30363d]
                  text-[#e6edf3] px-3 py-2 rounded-md text-sm
                  focus:outline-none focus:border-[#58a6ff]"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Visibility */}
            <div className="space-y-3">
              <label className="block text-[#e6edf3] text-sm font-medium">
                Visibility
              </label>

              {securetyMenu.map((opt) => (
                <label
                  key={opt.label}
                  className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    visibility === opt.value
                      ? "border-[#58a6ff] bg-[#1c2128]"
                      : "border-[#30363d] hover:border-[#8b949e]"
                  }`}
                >
                  <input
                    type="radio"
                    className="mt-0.5"
                    checked={visibility === opt.value}
                    onChange={() =>
                    setValue("vesivelity", opt.value)
                    }
                  />

                  <span className="text-[#8b949e] mt-0.5">
                    {opt.icon}
                  </span>

                  <div>
                    <p className="text-[#e6edf3] text-sm font-medium">
                      {opt.label}
                    </p>

                    <p className="text-[#8b949e] text-xs">
                      {opt.desc}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div
                className="bg-red-900/30 border border-red-700
                text-red-400 text-sm px-3 py-2 rounded-md"
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="border-t border-[#30363d] pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#238636] hover:bg-[#2ea043]
                  disabled:opacity-50 text-white font-semibold
                  px-6 py-2 rounded-md text-sm transition-colors"
              >
                {loading ? "Creating..." : "Create repository"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRepo;
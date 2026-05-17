import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoCheck, GoLink, GoPencil, GoX } from "react-icons/go";
import { VscLoading } from "react-icons/vsc";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const EditModal = ({ post, onClose, onUpdate}) => {
  const axiosSecure = useAxiosSecure();
  const [saving, setSaving] = useState(false);

  const {register,handleSubmit,formState: { errors },} = useForm({defaultValues: {
      title:post.title,
      description: post.description,
      link:post.link || "",
    },
  });

  const onSubmit = async (form) => {
    setSaving(true);
    try {
      const res = await axiosSecure.patch(`/social/update/${post._id}`, {
        title:form.title,
        description:form.description,
        link:  form.link || null,
      });

      if (res.data.success) {
        onUpdate(res.data.updatePost);
        onClose();
      }
    } catch (err) {
      console.log("Update error:", err.message);
    } finally {
      setSaving(false);
    }
  };
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"onClick={onClose}/>

  
      <div className="relative w-full max-w-lg bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl z-10">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#30363d]">
          <div className="flex items-center gap-2">
            <GoPencil size={15} className="text-[#58a6ff]" />
            <h3 className="text-[#e6edf3] font-semibold text-sm">Edit Post</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#8b949e] hover:text-[#e6edf3] p-1 rounded-md hover:bg-[#21262d] transition-colors"
          >
            <GoX size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-[#8b949e] text-xs font-medium mb-1.5 uppercase tracking-wide">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              className={`w-full bg-[#0d1117] border text-[#e6edf3] text-sm px-3 py-2.5 rounded-lg
                focus:outline-none focus:ring-1 placeholder-[#484f58] transition-colors
                ${errors.title
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-[#30363d] focus:border-[#58a6ff] focus:ring-[#58a6ff]/30"
                }`}
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-[#8b949e] text-xs font-medium mb-1.5 uppercase tracking-wide">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-sm
                px-3 py-2.5 rounded-lg focus:outline-none focus:border-[#58a6ff]
                focus:ring-1 focus:ring-[#58a6ff]/30 transition-colors resize-none
                placeholder-[#484f58]"
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-[#8b949e] text-xs font-medium mb-1.5 uppercase tracking-wide">
              Link
            </label>
            <div className="relative">
              <GoLink size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#484f58]" />
              <input
                {...register("link")}
                placeholder="https://..."
                className="w-full bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-sm
                  pl-8 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-[#58a6ff]
                  focus:ring-1 focus:ring-[#58a6ff]/30 transition-colors placeholder-[#484f58]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-[#8b949e] hover:text-[#e6edf3] text-sm px-4 py-2 rounded-lg
                hover:bg-[#21262d] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043]
                disabled:opacity-60 text-white text-sm font-semibold px-5 py-2
                rounded-lg transition-colors"
            >
              {saving ? (
                <><VscLoading size={13} className="animate-spin" /> Saving...</>
              ) : (
                <><GoCheck size={13} /> Save Changes</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal
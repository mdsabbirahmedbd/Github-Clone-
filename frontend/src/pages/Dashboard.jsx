import { useState } from "react";
import {  useForm } from "react-hook-form";
import {GoNote, GoLink,  GoCheck, GoX, GoPlus,} from "react-icons/go";
import { VscLoading } from "react-icons/vsc";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import PostCard from "../components/DashboardCompo/PostCard";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";




// loading view 
const PostSkeleton = () => (
  <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 animate-pulse">
    <div className="h-5 bg-[#21262d] rounded w-48 mb-3" />
    <div className="space-y-2 mb-4">
      <div className="h-3 bg-[#21262d] rounded w-full" />
      <div className="h-3 bg-[#21262d] rounded w-4/5" />
      <div className="h-3 bg-[#21262d] rounded w-3/5" />
    </div>
    <div className="h-3 bg-[#21262d] rounded w-28" />
  </div>
);


const Dashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [submitting, setSubmitting]  = useState(false);
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const username = user?.user_metadata?.user_name || user?.user_metadata?.name;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
   
  const { data: posts = [], isLoading,refetch } = useQuery({
    queryKey: ["social"],
    queryFn: async () => {
      const res = await axiosSecure.get('/social/get');
      return res.data?.posts || [];
    },
  });

  

  


  const onSubmit = async (form) => {
    setSubmitting(true);
    setSuccess(false);
    try {
      const res = await axiosSecure.post("/social/create", {
        title:form.title,
        description:form.description || "",
        link: form.link ,
      });

      if (res.data.success) {
        toast.success("post created successfully");
        refetch();
        reset();
        setSuccess(true);
      }
    } catch (err) {
      console.log("Post error:", err.message);
    } finally {
      setSubmitting(false);
    }
  };




  const handleDelete = () => {refetch();};
  const handleUpdate = () => {refetch();};

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Toaster />

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[#e6edf3] text-2xl font-semibold mb-1">
              Hey, <span className="text-[#58a6ff]">{username}</span> 👋
            </h1>
            <p className="text-[#8b949e] text-sm">
              {posts.length} post{posts.length !== 1 ? "s" : ""} published
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043]
              text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            {showForm ? <GoX size={14} /> : <GoPlus size={14} />}
            {showForm ? "Close" : "New Post"}
          </button>
        </div>

        {/* ── Create Form ── */}
        {showForm && (
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-5">
              <GoNote size={15} className="text-[#58a6ff]" />
              <h2 className="text-[#e6edf3] font-semibold text-sm">New Post</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* Title */}
              <div>
                <label className="block text-[#8b949e] text-xs font-medium mb-1.5 uppercase tracking-wide">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  {...register("title", {
                    required: "Title is required",
                    minLength: { value: 3, message: "Min 3 characters" },
                  })}
                  placeholder="What's on your mind?"
                  className={`w-full bg-[#0d1117] border text-[#e6edf3] text-sm
                    px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1
                    placeholder-[#484f58] transition-colors
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
                  {...register("description", {
                    minLength: { value: 5, message: "Min 5 characters" },
                  })}
                  rows={4}
                  placeholder="Write something..."
                  className={`w-full bg-[#0d1117] border text-[#e6edf3] text-sm
                    px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1
                    placeholder-[#484f58] transition-colors resize-none
                    ${errors.description
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-[#30363d] focus:border-[#58a6ff] focus:ring-[#58a6ff]/30"
                    }`}
                />
                {errors.description && (
                  <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Link */}
              <div>
                <label className="block text-[#8b949e] text-xs font-medium mb-1.5 uppercase tracking-wide">
                  Link{" "}
                  <span className="normal-case font-normal text-[#484f58]">
                    (optional)
                  </span>
                </label>
                <div className="relative">
                  <GoLink
                    size={13}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#484f58]"
                  />
                  <input
                    {...register("link", {
                      pattern: {
                        value: /^(https?:\/\/).+/,
                        message: "Must start with http:// or https://",
                      },
                    })}
                    placeholder="https://github.com/..."
                    className={`w-full bg-[#0d1117] border text-[#e6edf3] text-sm
                      pl-9 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-1
                      placeholder-[#484f58] transition-colors
                      ${errors.link
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-[#30363d] focus:border-[#58a6ff] focus:ring-[#58a6ff]/30"
                      }`}
                  />
                </div>
                {errors.link && (
                  <p className="text-red-400 text-xs mt-1">{errors.link.message}</p>
                )}
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  {success && (
                    <span className="flex items-center gap-1.5 text-green-400 text-sm">
                      <GoCheck size={13} />
                      Published!
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="text-[#8b949e] hover:text-[#e6edf3] text-sm px-4 py-2
                      rounded-lg hover:bg-[#21262d] transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043]
                      disabled:opacity-60 disabled:cursor-not-allowed text-white
                      text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
                  >
                    {submitting ? (
                      <><VscLoading size={13} className="animate-spin" /> Posting...</>
                    ) : (
                      <><GoNote size={13} /> Publish</>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ── Posts List ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#e6edf3] font-semibold text-sm">All Posts</h2>
            {!isLoading && posts.length > 0 && (
              <span className="text-black text-xs  bg-white px-2 py-0.5 rounded-full">
                {posts.length}
              </span>
            )}
          </div>

          {/* Loading */}
          {isLoading && ( <div className="space-y-4">{[1, 2, 3].map((i) => <PostSkeleton key={i} />)}</div>)}

          {/* Empty state */}
          {!isLoading && posts.length === 0 && (
            <div className="text-center py-16 border border-dashed border-[#30363d] rounded-xl">
              <GoNote size={32} className="text-[#30363d] mx-auto mb-3" />
              <p className="text-[#8b949e] text-sm font-medium">No posts yet</p>
              <p className="text-[#484f58] text-xs mt-1">
                Create your first post above!
              </p>
            </div>
          )}

          {/* Posts */}
          {!isLoading && posts.length > 0 && (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
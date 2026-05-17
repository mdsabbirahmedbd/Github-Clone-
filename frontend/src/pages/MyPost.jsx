import { GoNote } from "react-icons/go";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import PostCard from "../components/DashboardCompo/PostCard";


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

const MyPost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
    const username = user?.user_metadata?.user_name || user?.user_metadata?.name;

  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["social", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/social/get?email=${user?.email}`);
      return res.data?.posts || [];
    },
  });


  const handleDelete = () => {
    refetch();
  };
  const handleUpdate = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="max-w-3xl mx-auto px-4 py-8">

        {username && <h1 className="text-[#e6edf3] text-2xl font-semibold mb-4">{username}'s posts</h1>}
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
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
          )}

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

export default MyPost;

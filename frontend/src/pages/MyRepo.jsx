import { useQuery } from "@tanstack/react-query";
import { GoRepo, GoPlus, GoPencil, GoTrash } from "react-icons/go";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import RepoCard from "../components/DashboardCompo/RepoCard";

const RepoSkeleton = () => (
  <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 animate-pulse">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-4 h-4 bg-[#21262d] rounded" />
      <div className="h-4 bg-[#21262d] rounded w-36" />
      <div className="h-4 bg-[#21262d] rounded w-14 ml-1" />
    </div>
    <div className="h-3 bg-[#21262d] rounded w-3/4 mb-4 ml-6" />
    <div className="flex gap-4 ml-6">
      <div className="h-3 bg-[#21262d] rounded w-20" />
      <div className="h-3 bg-[#21262d] rounded w-24" />
    </div>
  </div>
);

const MyRepo = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const uid = user?.id;

  const username = user?.user_metadata?.user_name || user?.user_metadata?.name;

  const { data: repos = [], isLoading } = useQuery({
    queryKey: ["repos", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/repos/myrepo");
      return res.data?.repos || [];
    },
    enabled: !!user?.email,
  });


  const publicCount = repos.filter((r) => !r.vesivelity).length;
  const privateCount = repos.filter((r) => r.vesivelity).length;

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[#e6edf3] text-xl font-semibold mb-1">
              {username}'s repositories
            </h1>
            <div className="flex items-center gap-3 text-xs text-[#8b949e]">
              <span>
                <span className="text-[#e6edf3] font-medium">
                  {repos.length}
                </span>{" "}
                total
              </span>
              <span>
                <span className="text-[#e6edf3] font-medium">
                  {publicCount}
                </span>{" "}
                public
              </span>
              <span>
                <span className="text-[#e6edf3] font-medium">
                  {privateCount}
                </span>{" "}
                private
              </span>
            </div>

            <Link
              to="/dashboard/reposetup"
              className="text-xs my-5 text-green-400 underline "
            >
              View Setup
            </Link>
          </div>

          {/* New Repo button */}
          <Link
            to="/dashboard/create-repo"
            className="flex items-center gap-2 bg-[#238636] hover:bg-[#2ea043]
              text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <GoPlus size={16} />
            New Repository
          </Link>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <RepoSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && repos.length === 0 && (
          <div className="text-center py-20 border border-dashed border-[#30363d] rounded-xl">
            <GoRepo size={36} className="text-[#30363d] mx-auto mb-3" />
            <p className="text-[#8b949e] text-xl font-medium mb-2">
              No Repositories Yet
            </p>
          </div>
        )}

        {/* Repo list */}
        {!isLoading && repos.length > 0 && (
          <div className="space-y-3">
            {repos.map((repo) => (
              <div
                key={repo._id}
                onClick={() =>
                  navigate(`/dashboard/repoviwer/${repo.name}`, {
                    state: { uid },
                  })
                }
                className="cursor-pointer"
              >
                <RepoCard
                  repo={repo}
                  actions={
                    <div onClick={(e) => e.stopPropagation()}>
                      <button
                        className="p-1.5 text-[#8b949e] hover:text-[#58a6ff]
              hover:bg-[#58a6ff]/10 rounded-md transition-colors"
                      >
                        <GoPencil size={13} />
                      </button>
                      <button
                        className="p-1.5 text-[#8b949e] hover:text-red-400
              hover:bg-red-400/10 rounded-md transition-colors"
                      >
                        <GoTrash size={13} />
                      </button>
                    </div>
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRepo;

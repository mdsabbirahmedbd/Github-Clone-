import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GoSearch } from "react-icons/go";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import RepoCard from "../components/DashboardCompo/RepoCard";
import { useNavigate } from "react-router";


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

const Repository = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const {
    data: allRepos = [],
    isLoading: loadingAll
  } = useQuery({
    queryKey: ["repos", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/repos?search=${search}`);
      return res.data?.repos || [];
    },
  });

  const handleFollowToggle = async (ownerId, isFollowing) => {
      if (isFollowing) {
        await axiosSecure.patch(`/users/unfollow/${ownerId}`);
      } else {
        await axiosSecure.patch(`/users/follow/${ownerId}`);
      }
  };

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[#e6edf3] text-xl font-semibold mb-1">
            Explore Repositories
          </h1>

          <p className="text-[#8b949e] text-sm">
            Browse all public repositories from the community
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <GoSearch
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8b949e]"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search repositories..."
            className="w-full bg-[#161b22] border border-[#30363d]
            text-[#e6edf3] text-sm pl-10 pr-10 py-2.5 rounded-lg
            focus:outline-none focus:border-[#58a6ff]
            focus:ring-1 focus:ring-[#58a6ff]/30
            placeholder-[#484f58] transition-colors"
          />
        </div>

        {/* Loading */}
        {loadingAll && (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <RepoSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loadingAll && allRepos.length === 0 && (
          <div className="text-center py-20 border border-dashed border-[#30363d] rounded-xl">
            <p className="text-[#8b949e] text-sm">
              No repositories found
            </p>
          </div>
        )}

        {/* Repo list */}
        {!loadingAll && allRepos.length > 0 && (
          <div className="space-y-3">
            {allRepos.map((repo) => (
           <div  onClick={()=> navigate(`/dashboard/repoviwer/${repo.name}`, { state: {uid : repo.owner.uid },})}>
               <RepoCard
                key={repo._id}
                repo={repo}
                onFollowToggle={handleFollowToggle}
              />
           </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Repository;
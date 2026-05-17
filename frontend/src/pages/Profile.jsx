import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  GoRepo, GoNote, GoLink, GoPerson,
  GoOrganization, GoCalendar,
} from "react-icons/go";
import { Link, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import RepoCard from "../components/DashboardCompo/RepoCard";

// ── Skeleton ──────────────────────────────────────
const CardSkeleton = () => (
  <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 animate-pulse">
    <div className="h-4 bg-[#21262d] rounded w-40 mb-3" />
    <div className="space-y-2 mb-3">
      <div className="h-3 bg-[#21262d] rounded w-full" />
      <div className="h-3 bg-[#21262d] rounded w-4/5" />
    </div>
    <div className="h-3 bg-[#21262d] rounded w-24" />
  </div>
);

// ── Avatar ────────────────────────────────────────
const AvatarBox = ({ user, DBuser }) => {
  const name   = user?.user_metadata?.name || DBuser?.username || "U";


  return ( 
  <div className="w-full aspect-square rounded-full bg-gradient-to-br
      from-purple-600 to-blue-600 flex items-center justify-center
      text-white text-5xl font-bold border-2 border-[#30363d]">
      {name[0].toUpperCase()}
    </div>
    )

};


const Stat = ({ count, label }) => (
  <span className="text-[#8b949e] text-sm">
    <span className="text-[#e6edf3] font-semibold">{count}</span> {label}
  </span>
);


const Tab = ({ icon, label, count, active, onClick }) => (
  <button onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 text-sm border-b-2
      transition-colors whitespace-nowrap
      ${active
        ? "border-[#f78166] text-[#e6edf3] font-medium"
        : "border-transparent text-[#8b949e] hover:text-[#e6edf3]"
      }`}
  >
    {icon}
    {label}
    {count > 0 && (
      <span className="bg-[#21262d] text-[#e6edf3] text-xs px-2 py-0.5 rounded-full">
        {count}
      </span>
    )}
  </button>
);


const PostCard = ({ post }) => (
  <div className="bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff]/40
    rounded-xl p-5 transition-all">
    <h3 className="text-[#e6edf3] font-semibold text-sm mb-2 line-clamp-1">
      {post.title}
    </h3>
    {post.description && (
      <p className="text-[#8b949e] text-xs leading-relaxed mb-3 line-clamp-3">
        {post.description}
      </p>
    )}
    {post.link && (
      <a href={post.link} target="_blank" rel="noreferrer"
        className="flex items-center gap-1.5 text-[#58a6ff] text-xs hover:underline truncate"
        onClick={(e) => e.stopPropagation()}>
        <GoLink size={11} />
        {post.link.replace(/^https?:\/\//, "")}
      </a>
    )}
  </div>
);


const Profile = () => {
  const { user, DBuser }  = useAuth();
  const axiosSecure       = useAxiosSecure();
  const navigate          = useNavigate();
  const [tab, setTab]     = useState("repos");

  const username = DBuser?.username || user?.user_metadata?.name || "User";
  const joinDate = DBuser?.createdAt
    ? new Date(DBuser.createdAt).toLocaleDateString("en-US", {
        month: "long", year: "numeric",
      })
    : null;

  // ─── Repos ────────────────────────────────────
  const { data: repos = [], isLoading: loadingRepos } = useQuery({
    queryKey: ["repos", "mine", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/repos/myrepo");
      return res.data?.repos || [];
    },
    enabled: !!user?.email,
  });

  // ─── Posts ────────────────────────────────────
  const { data: posts = [], isLoading: loadingPosts } = useQuery({
    queryKey: ["social", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/social/get?email=${user?.email}`);
      return res.data?.posts || [];
    },
    enabled: !!user?.email,
  });

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">

          {/* ── Sidebar ── */}
          <aside className="w-full md:w-64 shrink-0">

            {/* Avatar */}
            <div className="w-48 md:w-full mx-auto mb-4">
              <AvatarBox user={user} DBuser={DBuser} />
            </div>

            {/* Name */}
            <div className="mb-4">
              <h1 className="text-[#e6edf3] text-xl font-bold">
                {user?.user_metadata?.name || username}
              </h1>
              <p className="text-[#8b949e]">{username}</p>
            </div>

            {/* Follow stats */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 mb-5">
              <Stat count={DBuser?.following?.length     || 0} label="following" />
              <Stat count={DBuser?.followedUsers?.length || 0} label="followers" />
            </div>

            {/* Info */}
            <div className="space-y-2 text-sm text-[#8b949e] mb-5">
              {DBuser?.email && (
                <div className="flex items-center gap-2">
                  <GoPerson size={14} />
                  <span className="truncate">{DBuser.email}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <GoOrganization size={14} />
                <span>{repos.length} repositories</span>
              </div>
              {joinDate && (
                <div className="flex items-center gap-2">
                  <GoCalendar size={14} />
                  <span>Joined {joinDate}</span>
                </div>
              )}
            </div>

  
          </aside>

          {/* ── Main ── */}
          <main className="flex-1 min-w-0">

            {/* Tabs */}
            <div className="flex border-b border-[#21262d] mb-6 overflow-x-auto">
              <Tab
                icon={<GoRepo size={14} />}
                label="Repositories"
                count={repos.length}
                active={tab === "repos"}
                onClick={() => setTab("repos")}
              />
              <Tab
                icon={<GoNote size={14} />}
                label="Posts"
                count={posts.length}
                active={tab === "posts"}
                onClick={() => setTab("posts")}
              />
            </div>

            {/* ── Repos ── */}
            {tab === "repos" && (
              <>
                {loadingRepos && (
                  <div className="space-y-3">
                    {[1,2,3].map(i => <CardSkeleton key={i} />)}
                  </div>
                )}
                {!loadingRepos && repos.length === 0 && (
                  <div className="text-center py-16 border border-dashed border-[#30363d] rounded-xl">
                    <GoRepo size={32} className="text-[#30363d] mx-auto mb-3" />
                    <p className="text-[#8b949e] text-sm mb-3">No repositories yet</p>
                    <Link to="/dashboard/create-repo"
                      className="text-[#58a6ff] text-sm hover:underline">
                      Create your first repo →
                    </Link>
                  </div>
                )}
                {!loadingRepos && repos.length > 0 && (
                  <div className="space-y-3">
                    {repos.map((repo) => (
                      <div key={repo._id}
                        onClick={() => navigate(`/dashboard/repoviwer/${repo.name}`, {
                          state: { uid: user?.id },
                        })}
                        className="cursor-pointer">
                        <RepoCard repo={repo} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ── Posts ── */}
            {tab === "posts" && (
              <>
                {loadingPosts && (
                  <div className="space-y-3">
                    {[1,2,3].map(i => <CardSkeleton key={i} />)}
                  </div>
                )}
                {!loadingPosts && posts.length === 0 && (
                  <div className="text-center py-16 border border-dashed border-[#30363d] rounded-xl">
                    <GoNote size={32} className="text-[#30363d] mx-auto mb-3" />
                    <p className="text-[#8b949e] text-sm mb-3">No posts yet</p>
                    <Link to="/dashboard"
                      className="text-[#58a6ff] text-sm hover:underline">
                      Write your first post →
                    </Link>
                  </div>
                )}
                {!loadingPosts && posts.length > 0 && (
                  <div className="space-y-3">
                    {posts.map((post) => (
                      <PostCard key={post._id} post={post} />
                    ))}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
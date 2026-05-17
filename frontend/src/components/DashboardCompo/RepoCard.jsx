import { useEffect, useState } from "react";
import {
  GoRepo,
  GoLock,
  GoGlobe,
  GoClock,
  GoPersonAdd,
} from "react-icons/go";

import {
  VscSourceControl,
  VscLoading,
} from "react-icons/vsc";

import useAuth from "../../Hooks/useAuth";

const RepoCard = ({ repo, actions, onFollowToggle }) => {
  const { DBuser } = useAuth();

  const ownerId = repo.owner?._id;


  const isMyRepo = DBuser?._id?.toString() === ownerId?.toString();



const [isFollowing, setIsFollowing] = useState(false);




  const [loading, setLoading] = useState(false);

  // ── Follow Handler ─────────────────
  const handleFollow = async (e) => {
    e.stopPropagation();

    if (!ownerId || isMyRepo) return;
    setIsFollowing((prev) => !prev);
    setLoading(true);

    try {
    await onFollowToggle(ownerId, isFollowing);
  } catch (error) {
    setIsFollowing((prev) => !prev);
    console.log(error);
  } finally {
    setLoading(false);
  }
  };
  
useEffect(() => {
  if (!DBuser?.following || !ownerId) return;
  const following = DBuser.following.some(
    (id) => id.toString() === ownerId.toString()
  );
  setIsFollowing(following);
}, [DBuser, ownerId]);
  return (
    <div
      className="bg-[#161b22] border border-[#30363d]
      hover:border-[#58a6ff]/40 rounded-xl p-5
      transition-all duration-200 group"
    >

      {/* Top */}
      <div className="flex items-start justify-between gap-3 mb-2">

        {/* Left */}
        <div className="flex items-center gap-2 min-w-0">

          <GoRepo
            size={16}
            className="text-[#8b949e] shrink-0"
          />

          <h1
            className="text-[#58a6ff] font-semibold
            text-sm hover:underline truncate"
          >
            {repo.name}
          </h1>

          <span
            className="flex items-center gap-1 text-[10px]
            px-1.5 py-0.5 border border-[#30363d]
            rounded-full text-[#8b949e] shrink-0"
          >
            {repo.vesivelity ? (
              <>
                <GoLock size={9} /> Private
              </>
            ) : (
              <>
                <GoGlobe size={9} /> Public
              </>
            )}
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 shrink-0">

          {!isMyRepo && ownerId && (
            <button
              onClick={handleFollow}
              disabled={loading}
              className={`flex items-center gap-1.5 text-xs
                px-3 py-1 rounded-md border
                transition-colors disabled:opacity-60
                ${
                  isFollowing
                    ? "border-[#30363d] text-[#8b949e] hover:border-red-500/50 hover:text-red-400 hover:bg-red-400/10"
                    : "border-[#238636] text-[#3fb950] hover:bg-[#238636]/20"
                }`}
            >
              {loading ? (
                <VscLoading
                  size={11}
                  className="animate-spin"
                />
              ) : (
                <GoPersonAdd size={11} />
              )}

              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}

          {actions && (
            <div
              className="flex items-center gap-1
              opacity-0 group-hover:opacity-100
              transition-opacity"
            >
              {actions}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {repo.description && (
        <p
          className="text-[#8b949e] text-xs
          leading-relaxed mb-3 line-clamp-2 ml-6"
        >
          {repo.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center gap-4 ml-6 mt-3">

        <span
          className="flex items-center gap-1
          text-[#8b949e] text-xs"
        >
          <GoClock size={11} />
          Updated
        </span>

        {repo.owner?.email && (
          <span
            className="flex items-center gap-1
            text-[#484f58] text-xs ml-auto"
          >
            <VscSourceControl size={11} />
            {repo.owner.email}
          </span>
        )}
      </div>
    </div>
  );
};

export default RepoCard;
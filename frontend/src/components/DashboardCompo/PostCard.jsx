import { useState } from "react";
import { GoLink, GoPencil, GoTrash } from "react-icons/go";
import { VscLoading } from "react-icons/vsc";
import EditModal from "./EditModal";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const PostCard = ({ post, onDelete, onUpdate }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [deleting, setDeleting]     = useState(false);
  const [editOpen, setEditOpen]     = useState(false);



  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await axiosSecure.delete(`/social/delete/${post._id}`);
      if (res.data.success) onDelete(post._id);
    } catch (err) {
      console.log("Delete error:", err.message);
    } finally {
      setDeleting(false);
    }
  };
 
  const isOwner = post.ownerUID === user.id ;
   

  return (
    <>
      <div className="group bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff]/40
        rounded-xl p-5 transition-all duration-200">

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-[#e6edf3] font-semibold text-base leading-snug flex-1 line-clamp-1">
            {post.title}
          </h3>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            {
              isOwner && (
               <>
                 <button
              onClick={() => setEditOpen(true)}
              className="p-1.5 text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#58a6ff]/10
                rounded-md transition-colors"
              title="Edit"
            >
              <GoPencil size={13} />
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="p-1.5 text-[#8b949e] hover:text-red-400 hover:bg-red-400/10
                rounded-md transition-colors"
              title="Delete"
            >
              {deleting ? <VscLoading size={13} className="animate-spin" />: <GoTrash size={13} />}
            </button>
               </>
              )
            }
          </div>
        </div>

        {/* Description */}
        {post.description && (
          <p className="text-[#8b949e] text-sm leading-relaxed mb-4 line-clamp-3">
            {post.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between gap-2">
          {post.link ? (
            <a
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[#58a6ff] text-xs hover:underline
                truncate max-w-[220px]"
            >
              <GoLink size={11} />
              <span className="truncate">
                {post.link}
              </span>
            </a>
          ) : (
            <span />
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editOpen && (
        <EditModal
          post={post}
          axiosSecure={axiosSecure}
          onClose={() => setEditOpen(false)}
          onUpdate={(updated) => {
            onUpdate(updated);
            setEditOpen(false);
          }}
        />
      )}

    </>
  );
};

export default PostCard